import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // jest-dom のマッチャーをインポート
import { Button } from '@/app/ui/button'; // 名前付きインポートに変更

describe('Button Component', () => {
  it('renders children correctly', () => {
    const buttonText = 'Click Me';
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);
  });

  it('applies default classes', () => {
    render(<Button>Default</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Default' });
    expect(buttonElement).toHaveClass('flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50');
    // 個別のクラスチェックも可能
    // expect(buttonElement).toHaveClass('flex');
    // expect(buttonElement).toHaveClass('h-10');
  });

  // disabled 状態のテストを追加
  it('applies disabled styles when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Disabled' });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('aria-disabled:cursor-not-allowed aria-disabled:opacity-50');
  });
});
