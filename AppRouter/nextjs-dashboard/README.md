## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## テスト

このプロジェクトでは、コンポーネントテストに Jest と React Testing Library を使用しています。

テストを実行するには、次のコマンドを使用します。

```bash
pnpm test
```

### UI コンポーネントテスト

#### `app/ui/button.tsx` (`app/ui/__tests__/button.test.tsx`)

- **子要素が正しくレンダリングされるか:** Button コンポーネントの子要素として渡されたテキストや要素が適切にレンダリングされるかを確認します。
- **デフォルトクラスが適用されるか:** 標準的な外観のために、デフォルトの Tailwind CSS クラスがボタンに適用されているかを確認します。
- **disabled 状態のスタイルが適用されるか:** `disabled` プロパティがボタンに渡されたときに、適切なクラスと `disabled` 属性が適用されるかを確認します。