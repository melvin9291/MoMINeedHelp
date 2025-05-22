# AI 台灣媽媽個人助理 - 開發指南 (React Native Expo on Windows)

本專案旨在打造一款結合實用個人助理功能與「台灣媽媽」溫暖人設的聊天機器人應用程式。本文件將引導您如何在 Windows 環境下，使用 Visual Studio Code (VSCode) 和 React Native (Expo) 框架進行開發。

**專案基於 MCP (Model-Content-Persona) 框架設計：**

* **Model (模型層):** 採用大型語言模型 (LLM) 作為核心，處理自然語言理解與生成。
* **Content (內容層):** 包含「台灣媽媽」的知識庫、用戶數據及外部資訊。
* **Persona (人設層):** 定義「台灣媽媽」的語氣、行為模式與互動風格。

## 目錄

1.  [環境安裝](#1-環境安裝)
    * [1.1. Node.js 與 npm/yarn](#11-nodejs-與-npmyarn)
    * [1.2. Visual Studio Code (VSCode)](#12-visual-studio-code-vscode)
    * [1.3. Git 版本控制](#13-git-版本控制)
    * [1.4. Expo CLI](#14-expo-cli)
    * [1.5. Android Studio (用於 Android 模擬器) 或實體手機](#15-android-studio-用於-android-模擬器-或實體手機)
    * [1.6. (選擇性) iOS 相關](#16-選擇性-ios-相關)
2.  [專案初始化與設定](#2-專案初始化與設定)
    * [2.1. 建立新的 Expo 專案](#21-建立新的-expo-專案)
    * [2.2. 專案結構概覽](#22-專案結構概覽)
    * [2.3. 安裝必要套件](#23-安裝必要套件)
3.  [系統開發 (MCP 框架實作)](#3-系統開發-mcp-框架實作)
    * [3.1. Model 層 - LLM 整合](#31-model-層---llm-整合)
    * [3.2. Content 層 - 內容管理](#32-content-層---內容管理)
        * [3.2.1. 角色知識庫](#321-角色知識庫)
        * [3.2.2. 用戶數據管理](#322-用戶數據管理)
        * [3.2.3. 外部 API 串接](#323-外部-api-串接)
    * [3.3. Persona 層 - 人設 구현](#33-persona-層---人設 구현)
    * [3.4. UI/UX 設計與實作](#34-uiux-設計與實作)
        * [3.4.1. 聊天介面](#341-聊天介面)
        * [3.4.2. 行程管理介面](#342-行程管理介面)
        * [3.4.3. 設定與其他介面](#343-設定與其他介面)
    * [3.5. 核心功能實作](#35-核心功能實作)
        * [3.5.1. 聊天與陪伴](#351-聊天與陪伴)
        * [3.5.2. 行程與提醒](#352-行程與提醒)
        * [3.5.3. 生活知識問答](#353-生活知識問答)
        * [3.5.4. 記憶管理](#354-記憶管理)
4.  [結果呈現與測試](#4-結果呈現與測試)
    * [4.1. 在模擬器/實體裝置上運行](#41-在模擬器實體裝置上運行)
    * [4.2. 功能測試](#42-功能測試)
    * [4.3. 效能調校](#43-效能調校)
    * [4.4. (選擇性) 建置獨立應用程式 (Standalone App)](#44-選擇性-建置獨立應用程式-standalone-app)
5.  [貢獻指南](#5-貢獻指南)
6.  [授權條款](#6-授權條款)

---

## 1. 環境安裝

### 1.1. Node.js 與 npm/yarn

React Native 及 Expo 開發高度依賴 Node.js。

* **安裝 Node.js:**
    1.  前往 [Node.js 官方網站](https://nodejs.org/) 下載 LTS (長期支援) 版本。
    2.  執行安裝程式，依照預設選項完成安裝。npm (Node Package Manager) 會一併安裝。
* **驗證安裝:** 開啟命令提示字元 (CMD) 或 PowerShell，輸入以下指令：
    ```bash
    node -v
    npm -v
    ```
    若成功顯示版本號，則表示安裝成功。
* **(選擇性) 安裝 Yarn:** Yarn 是另一個流行的 JavaScript 套件管理器。
    ```bash
    npm install --global yarn
    yarn --version
    ```

### 1.2. Visual Studio Code (VSCode)

推薦使用 VSCode 作為主要的程式碼編輯器。

* **安裝 VSCode:**
    1.  前往 [VSCode 官方網站](https://code.visualstudio.com/) 下載適用於 Windows 的安裝程式。
    2.  執行安裝程式，依照預設選項完成安裝。
* **推薦擴充功能 (Extensions):**
    * `ESLint`: JavaScript/TypeScript 程式碼檢查。
    * `Prettier - Code formatter`: 程式碼格式化工具。
    * `React Native Tools`: 提供 React Native 開發輔助。
    * `Expo Tools` (若有): 輔助 Expo 專案開發。
    * `GitLens — Git supercharged`: 增強 Git 版本控制功能。

### 1.3. Git 版本控制

Git 是進行版本控制的必要工具。

* **安裝 Git:**
    1.  前往 [Git 官方網站](https://git-scm.com/download/win) 下載適用於 Windows 的安裝程式。
    2.  執行安裝程式，依照預設選項完成安裝 (建議在 "Adjusting your PATH environment" 步驟選擇 "Git from the command line and also from 3rd-party software")。
* **驗證安裝:**
    ```bash
    git --version
    ```

### 1.4. Expo CLI

Expo CLI 是建立和運行 Expo 專案的命令列工具。

* **安裝 Expo CLI:**
    ```bash
    npm install --global expo-cli
    # 或者使用 yarn
    # yarn global add expo-cli
    ```
* **驗證安裝:**
    ```bash
    expo --version
    ```
* **登入 Expo 帳號 (建議):**
    ```bash
    expo login
    ```
    若無帳號，請先至 [Expo 官網](https://expo.dev/) 註冊。

### 1.5. Android Studio (用於 Android 模擬器) 或實體手機

您需要在 Android 模擬器或實體 Android 手機上測試您的應用程式。

* **選項一：Android Studio 與模擬器 (AVD):**
    1.  前往 [Android Studio 官方網站](https://developer.android.com/studio) 下載並安裝 Android Studio。
    2.  安裝過程中，請確保勾選安裝 "Android Virtual Device"。
    3.  開啟 Android Studio，透過 "AVD Manager" (通常在 Tools > AVD Manager) 建立一個 Android 虛擬裝置 (模擬器)。建議選擇較新的 Android 版本及帶有 Google Play Services 的映像檔。
* **選項二：實體 Android 手機:**
    1.  在您的 Android 手機上啟用「開發者選項」和「USB 偵錯」。
        * 通常路徑為：設定 > 關於手機 > 版本號碼 (連續點擊多次直到出現「您現在是開發人員」的提示)。
        * 然後返回設定，找到「開發人員選項」，開啟並啟用「USB 偵錯」。
    2.  安裝手機對應的 USB 驅動程式 (若電腦無法自動辨識)。
    3.  在手機上安裝 `Expo Go` 應用程式 (可從 Google Play 商店下載)。

### 1.6. (選擇性) iOS 相關

在 Windows 上直接開發和測試 iOS 應用程式較為複雜，通常需要 macOS 環境。

* **Expo Go for iOS:** 若您有 iPhone 或 iPad，可以在裝置上安裝 `Expo Go` 應用程式，透過掃描 QR Code 的方式在實體 iOS 裝置上預覽和測試 (需與開發電腦在同一個區域網路)。
* **macOS 虛擬機/雙系統/雲端 Mac 服務:** 若需進行 iOS 平台的完整建置與模擬器測試，則需要 macOS 環境。

## 2. 專案初始化與設定

### 2.1. 建立新的 Expo 專案

1.  開啟命令提示字元或 PowerShell，導覽至您想建立專案的目錄。
2.  執行以下指令建立新專案 (將 `AiMamaAssistant` 替換為您的專案名稱)：
    ```bash
    expo init AiMamaAssistant
    ```
3.  選擇一個模板，建議初學者選擇 `blank` (JavaScript) 或 `blank (TypeScript)` (若熟悉 TypeScript)。
4.  Expo CLI 會下載必要的檔案並安裝依賴套件。
5.  進入專案目錄：
    ```bash
    cd AiMamaAssistant
    ```

### 2.2. 專案結構概覽 (以 `blank` 模板為例)


AiMamaAssistant/
├── .expo/                # Expo 設定與快取
├── .git/                 # Git 版本控制資料夾
├── assets/               # 靜態資源 (圖片、字型等)
│   ├── icon.png
│   └── splash.png
├── node_modules/         # 專案依賴套件
├── .gitignore            # Git 忽略檔案設定
├── App.js                # 應用程式進入點 (或 App.tsx for TypeScript)
├── app.json              # Expo 專案設定檔
├── babel.config.js       # Babel 編譯設定
└── package.json          # 專案資訊與依賴套件列表


### 2.3. 安裝必要套件

根據您的專案需求，可能需要安裝以下套件：

* **導航 (Navigation):**
    ```bash
    npm install @react-navigation/native @react-navigation/stack
    # 或 yarn add @react-navigation/native @react-navigation/stack
    expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
    ```
* **狀態管理 (State Management):** (例如 Redux, Zustand, Context API)
    * Redux: `npm install redux react-redux`
    * Zustand: `npm install zustand`
* **API 請求 (HTTP Client):**
    * Axios: `npm install axios`
* **本地儲存 (Local Storage):**
    * AsyncStorage: `npm install @react-native-async-storage/async-storage`
* **日期時間處理:**
    * Moment.js 或 date-fns: `npm install moment` 或 `npm install date-fns`
* **UI 元件庫 (選擇性):**
    * React Native Paper: `npm install react-native-paper`
    * React Native Elements: `npm install react-native-elements`

**範例：安裝導航套件**

```bash
# 使用 npm
npm install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

# 或者使用 yarn
yarn add @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
