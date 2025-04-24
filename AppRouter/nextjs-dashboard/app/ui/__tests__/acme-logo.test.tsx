// filepath: c:\github\NextTutorial\AppRouter\nextjs-dashboard\app\ui\__tests__\acme-logo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AcmeLogo from '@/app/ui/acme-logo'; // デフォルトインポート

describe('AcmeLogo Component', () => {
  it('renders the logo correctly', () => {
    render(<AcmeLogo />);

    // ロゴのテキストが存在するか確認
    const logoText = screen.getByText('Acme');
    expect(logoText).toBeInTheDocument();

    // ロゴのSVGアイコンが存在するか確認 (より堅牢なテスト)
    const svgIcon = document.querySelector('svg'); // SVG要素を取得
    expect(svgIcon).toBeInTheDocument();

  });
});
