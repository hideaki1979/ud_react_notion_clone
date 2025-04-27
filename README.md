# Notionクローンアプリ（Udemy講座にて実装）

## 📝 概要

このアプリケーションは、人気のメモ・ドキュメント管理ツールである「Notion」の機能を模倣したクローンアプリです。ノートの作成、編集、整理ができるシンプルで使いやすいインターフェースを提供します。
※本アプリはUdemy講座で実装したアプリとなります。

## 🛠️ 技術スタック

<p align="left">
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>
  </a>
  <a href="https://supabase.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" alt="supabase" width="40" height="40"/>
  </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>
  </a>
</p>

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Supabase
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **スタイリング**: Tailwind CSS, Shadcn/ui
- **エディタ**: BlockNote

## 🚀 環境構築手順

### 前提条件

- Node.js (v22)
- npm または yarn
- Supabaseアカウント

### インストール手順

1. リポジトリをクローンする:

```bash
git clone https://github.com/yourusername/notion-clone.git
cd notion-clone
```

2. 依存関係をインストールする:

```bash
npm install
# または
yarn install
```

3. 環境変数を設定する:
   - `.env.example` ファイルを `.env` にコピーして必要な値を設定します:

```bash
cp .env.example .env
```

4. `.env` ファイルを編集して以下の値を設定します:

```
VITE_SUPABASE_URL=""
VITE_SUPABASE_API_KEY=""
```

5. Supabaseプロジェクトを設定する:
   - Supabaseダッシュボードで新しいプロジェクトを作成します
   - 必要なテーブルやスキーマをセットアップします
   - プロジェクトのURLとAPIキーを`.env`ファイルに設定します

6. 開発サーバーを起動する:

```bash
npm run dev
# または
yarn dev
```

7. ブラウザで http://localhost:xxxx にアクセスしてアプリケーションを確認します。

## 📋 機能

- 📄 ドキュメントの作成・編集・削除
- 📂 階層構造でのノート管理
- 📝 リッチテキストエディタ
- 🔄 リアルタイム更新
- 🔒 ユーザー認証
- 📱 レスポンシブデザイン

## 📜 ライセンス

MIT
