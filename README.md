# HubSpot Deal-Contact Association Extension

取引（Deals）にコンタクトを関連付ける際、その取引に紐づいている会社のコンタクトのみを選択可能にするHubSpot UI Extensionです。

## 🚀 機能

- **制限付きコンタクト選択**: 取引に紐づく会社のコンタクトのみ表示
- **直感的なUI**: 取引レコード画面での簡単な操作
- **リアルタイム更新**: 関連付け後の即座な画面反映
- **エラーハンドリング**: 分かりやすいエラーメッセージ

## 📋 前提条件

- HubSpot Developer Account
- Node.js 16.x以上
- HubSpot CLI (`npm install -g @hubspot/cli`)
- Private App の作成と適切な権限設定

### 必要な権限
- `crm.objects.deals.read`
- `crm.objects.contacts.read`
- `crm.objects.companies.read`
- `crm.associations.read`
- `crm.associations.write`

## 🛠️ セットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/tsbs-1/hubspot-deal-contact-association.git
cd hubspot-deal-contact-association
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境設定
```bash
# 環境ファイルをコピー
cp .env.example .env

# .envファイルを編集してHubSpotの認証情報を設定
vim .env
```

### 4. HubSpot CLIの認証
```bash
hs auth
```

### 5. 開発サーバーの起動
```bash
npm start
```

## 🏗️ プロジェクト構造

```
.
├── src/
│   ├── app/
│   │   ├── app.functions/           # Serverless Functions
│   │   ├── extensions/              # UI Extensions
│   │   └── app.json                 # App configuration
│   ├── components/                  # React Components
│   ├── hooks/                       # Custom Hooks
│   ├── services/                    # API Services
│   ├── utils/                       # Utility functions
│   └── constants/                   # Constants
├── tests/                           # Test files
├── docs/                           # Documentation
└── package.json
```

## 🧪 テスト

```bash
# 全テスト実行
npm test

# テスト監視モード
npm run test:watch

# リンター実行
npm run lint
```

## 🚀 デプロイ

### 開発環境
```bash
npm run build
npm run upload
```

### 本番環境
```bash
npm run deploy
```

## 📚 使用方法

1. HubSpotで取引レコードを開く
2. 「コンタクト関連付け」タブを選択
3. 関連付け可能なコンタクト一覧から選択
4. 「関連付け」ボタンをクリック

## 🔗 参考リンク

- [HubSpot UI Extensions Documentation](https://developers.hubspot.com/docs/platform/ui-extensions)
- [HubSpot CRM API Documentation](https://developers.hubspot.com/docs/api/crm)
- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/cms/cli)
