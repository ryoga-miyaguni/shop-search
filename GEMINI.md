# gemini.md
 
## プロジェクト概要
 
このプロジェクトは、Next.js を使用したグルメ検索サイトです。
ホットペッパー API を活用して、エリアやキーワードから飲食店を検索できるサービスを提供します。
Tech Jam ハンズオンチュートリアルの一環として、新卒・若手エンジニア向けに作成されました。
 
### 主な機能
 
- エリア・キーワードによる飲食店検索
- 店舗詳細情報の表示（営業時間、アクセス、予算など）
- お気に入り店舗の保存機能
- レスポンシブデザイン対応
- 無限スクロールによる検索結果の読み込み
 
## 技術スタック
 
- **フレームワーク**: Next.js 15.0.2 (App Router)
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS
- **UI コンポーネント**: shadcn/ui
- **外部 API**: ホットペッパー グルメサーチ API
- **状態管理**: React Hooks (useState, useEffect)
- **データ保存**: localStorage（お気に入り機能）
- **パッケージマネージャー**: npm/pnpm
 
## プロジェクト構造
 
\`\`\`
app/
├── api/
│ └── shops/
│ └── route.ts # ホットペッパー API ラッパー
├── search/
│ └── page.tsx # 検索ページ
├── shops/
│ └── [id]/
│ └── page.tsx # 店舗詳細ページ
├── components/
│ ├── SearchForm.tsx # 検索フォームコンポーネント
│ ├── ShopCard.tsx # 店舗カードコンポーネント
│ ├── ShopList.tsx # 店舗リストコンポーネント
│ └── FavoriteButton.tsx # お気に入りボタン
├── types/
│ └── index.ts # 型定義ファイル
├── lib/
│ └── utils.ts # ユーティリティ関数
└── layout.tsx # ルートレイアウト
 
## 開発規約
 
### 命名規則
 
- **コンポーネント**: PascalCase (例: SearchForm)
- **関数**: camelCase (例: handleSearch)
- **ファイル名**: kebab-case (例: search-form.tsx)
- **定数**: UPPER_SNAKE_CASE (例: API_BASE_URL)
- **型定義**: PascalCase + 接尾辞 (例: ShopData, SearchParams)
 
### コーディング規約
 
- React Hooks は `use` プレフィックスを付ける
- API コール関数は `fetch` または `get/post` プレフィックス
- すべてのコンポーネントに TypeScript の型定義を追加
- エラーハンドリングを必ず実装
- Loading/Error 状態を適切に表示
 
### Git コミット規約
 
- feat: 新機能の追加
- fix: バグ修正
- docs: ドキュメントの変更
- style: コードスタイルの変更
- refactor: リファクタリング
- test: テストの追加・修正
- chore: ビルドプロセスや補助ツールの変更
 
## API 関連
 
### 環境変数
NEXT_PUBLIC_API_HOST=http://localhost:3000
HOTPEPPER_API_KEY=xxxxx # 外部に公開しない
 
### API エンドポイント
 
- `/api/shops` - 店舗検索
  - Query Parameters:
    - `keyword`: 検索キーワード
    - `large_area`: エリアコード
    - `start`: 取得開始位置
    - `count`: 取得件数
 
## 重要な注意事項
 
1. **API キーの管理**
 
   - ホットペッパー API キーは `.env` ファイルに保存
   - 絶対に GitHub にコミットしない
   - サーバーサイドでのみ使用（ラッパー API 経由）
 
2. **CORS 対策**
 
   - 外部 API への直接アクセスは避ける
   - Next.js の API Routes を使用してプロキシ
 
3. **レート制限**
 
   - ホットペッパー API のレート制限に注意し、過剰なリクエストを避ける
 
4. **エラーハンドリング**
 
   - API エラー時のフォールバック表示
   - ネットワークエラーの適切な処理
   - ユーザーフレンドリーなエラーメッセージ

## セキュリティとガードレール
 
### 禁止事項
 
以下の操作は絶対に行わないでください
 
1. **本番環境への直接デプロイ**
 
   - 本番環境のデータベースへの直接接続
   - 本番サーバーへの SSH 接続
   - 本番環境の設定ファイル編集
 
2. **機密情報の取り扱い**
 
   - API キーやパスワードのハードコーディング
   - 個人情報を含むファイルの処理
   - 暗号化されていないデータの送信
 
3. **破壊的な操作**
   - データベースの DROP 操作
   - git push --force の実行
   - node_modules や .git ディレクトリの削除
 
### 推奨される安全な操作
 
- コマンド実行時には必ずユーザーに確認を求める
- 初めに実装計画を示し、ユーザーの承認を得る
- 環境変数を使用して機密情報を管理