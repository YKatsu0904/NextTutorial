## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## テスト

このプロジェクトでは、コンポーネントテストに Jest と React Testing Library を使用しています。テストを実行するには、次のコマンドを使用します。

```bash
pnpm test
```

### UI コンポーネントテスト

#### `app/ui/button.tsx` (`app/ui/__tests__/button.test.tsx`)

- **子要素が正しくレンダリングされるか:** Button コンポーネントの子要素として渡されたテキストや要素が適切にレンダリングされるかを確認します。
- **デフォルトクラスが適用されるか:** 標準的な外観のために、デフォルトの Tailwind CSS クラスがボタンに適用されているかを確認します。
- **disabled 状態のスタイルが適用されるか:** `disabled` プロパティがボタンに渡されたときに、適切なクラスと `disabled` 属性が適用されるかを確認します。

#### `app/ui/acme-logo.tsx` (`app/ui/__tests__/acme-logo.test.tsx`)

- **ロゴが正しくレンダリングされるか:** AcmeLogo コンポーネントがテキスト "Acme" と SVG アイコンを適切にレンダリングするかを確認します。

#### `app/ui/search.tsx` (`app/ui/__tests__/search.test.tsx`)

- **入力とアイコンがレンダリングされるか:** 検索入力フィールドと虫眼鏡アイコンが正しく表示されるかを確認します。
- **プレースホルダーが正しく表示されるか:** 指定されたプレースホルダーテキストが入力フィールドに表示されるかを確認します。
- **入力変更時に URL クエリパラメータが更新されるか:** 入力フィールドに入力すると、URL の `query` パラメータが更新され、`page` パラメータが `1` に設定されるかを確認します (debounce はモック化して即時実行)。
- **入力クリア時にクエリパラメータが削除されるか:** 入力フィールドをクリアすると、URL から `query` パラメータが削除されるかを確認します。
- **検索パラメータからデフォルト値が設定されるか:** URL の検索パラメータに `query` が存在する場合、入力フィールドの初期値として設定されるかを確認します。