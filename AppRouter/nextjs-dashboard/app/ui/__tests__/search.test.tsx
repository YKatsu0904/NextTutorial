import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '@/app/ui/search';

// next/navigation のモック
const mockReplace = jest.fn();
const mockUseSearchParams = jest.fn();
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// use-debounce のモック (debounce を即時実行するように)
jest.mock('use-debounce', () => ({
  useDebouncedCallback: (callback: any) => callback,
}));


describe('Search Component', () => {
  const placeholderText = 'Search invoices...';

  beforeEach(() => {
    // 各テストの前にモックをリセット
    mockReplace.mockClear();
    // useSearchParams のデフォルトの戻り値を設定
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    // usePathname のデフォルトの戻り値を設定
    mockUsePathname.mockReturnValue('/dashboard/invoices');
  });

  it('renders the search input and icon', () => {
    render(<Search placeholder={placeholderText} />);

    // input 要素が存在するか確認
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();

    // MagnifyingGlassIcon が存在するか確認 (SVG なので title や testid がないと特定しにくい)
    // ここでは input の兄弟要素として SVG が存在するかどうかで簡易的に確認
    const svgElement = inputElement.nextElementSibling;
    expect(svgElement?.tagName.toLowerCase()).toBe('svg');
  });

  it('displays the correct placeholder', () => {
    render(<Search placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('updates the URL query parameter on input change', async () => {
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    const testQuery = 'test query';

    fireEvent.change(inputElement, { target: { value: testQuery } });

    // debounce (今回はモックで即時実行) 後の URL 更新を待機する必要はないが、
    // 実際の debounce をテストする場合は waitFor が必要になる可能性がある
    // await waitFor(() => {
    //   expect(mockReplace).toHaveBeenCalledTimes(1);
    // });

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // URLSearchParams.toString() はスペースを + にエンコードするため、期待値もそれに合わせる
    const expectedParams = new URLSearchParams({ page: '1', query: testQuery });
    expect(mockReplace).toHaveBeenCalledWith(`/dashboard/invoices?${expectedParams.toString()}`);
  });

  it('removes the query parameter if the input is cleared', async () => {
     // 初期クエリを設定
     mockUseSearchParams.mockReturnValue(new URLSearchParams('query=initial'));

    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);

    // defaultValue が設定されていることを確認
    expect(inputElement).toHaveValue('initial');

    // 入力をクリア
    fireEvent.change(inputElement, { target: { value: '' } });

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // クエリパラメータが削除され、page=1 のみが残ることを確認
    expect(mockReplace).toHaveBeenCalledWith('/dashboard/invoices?page=1');
  });

   it('sets the default value from search params', () => {
    const initialQuery = 'initial search';
    mockUseSearchParams.mockReturnValue(new URLSearchParams(`query=${initialQuery}`));
    render(<Search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toHaveValue(initialQuery);
  });
});
