# Yue 的 Blog 使用手冊

這份文件將教您如何管理您的 Pelican 部落格，包含新增文章、修改內容以及預覽網站。

## 1. 快速開始

在開始之前，請確保您已經啟動了虛擬環境：

```powershell
.\venv\Scripts\Activate.ps1
```

## 2. 如何新增文章

所有的文章都存放在 `content/` 資料夾中。要新增文章，只需建立一個新的 `.md` (Markdown) 檔案即可。

### 文章格式範本

請複製以下格式到您的新檔案中（例如 `content/my-new-post.md`）：

```markdown
Title: 您的文章標題
Date: 2025-11-23 10:00
Category: 刷題記錄
Tags: tag1, tag2
Slug: my-new-post-slug
Summary: 這是文章的簡短摘要，會顯示在列表頁。

# 這裡是標題

這裡是內文。您可以使用 **Markdown** 語法來撰寫。

## 程式碼範例

```python
print("Hello World")
```
```

### 欄位說明 (Metadata)

*   **Title**: 文章標題。
*   **Date**: 發布時間 (格式：YYYY-MM-DD HH:MM)。
*   **Category**: 文章分類（**重要！請看下方分類對照**）。
*   **Tags**: 標籤，用逗號分隔。
*   **Slug**: 網址的名稱 (例如 `my-new-post`)，請用英文。
*   **Summary**: 文章摘要。

## 3. 分類與選單對照

為了讓文章出現在正確的選單中，請務必在 `Category:` 欄位填寫正確的名稱：

| 選單名稱 | 對應的 Category 寫法 | 適用內容 |
| :--- | :--- | :--- |
| **刷題記錄** | `刷題記錄` | APCS, CPE, LeetCode, 演算法題解 |
| **有趣的程式** | `有趣的程式` | Python 教學, C++ 語法, 技術分享 |
| **好文推薦** | `好文推薦` | 學習筆記, 讀書心得, 轉載文章 |
| **廢文專區** | `廢文專區` | 日常閒聊, 測試文章 |

**注意**：如果您填寫了其他的 Category，它雖然會生成頁面，但不會出現在頂部選單中（除非您去修改 `pelicanconf.py`）。

## 4. 如何修改文章

1.  進入 `content/` 資料夾。
2.  用文字編輯器 (如 VS Code) 打開您想修改的 `.md` 檔案。
3.  修改內容或 Metadata (如標題、日期)。
4.  存檔。

## 5. 生成與預覽網站

當您新增或修改文章後，需要重新生成網站才能看到變更。

### 步驟一：生成網站

在終端機執行：

```powershell
.\venv\Scripts\pelican content -o output -s pelicanconf.py
```

### 步驟二：啟動預覽伺服器

如果您還沒啟動伺服器，請執行：

```powershell
.\venv\Scripts\pelican --listen
```

然後打開瀏覽器訪問：[http://localhost:8000](http://localhost:8000)

---

## 進階設定

*   **修改選單**：編輯 `pelicanconf.py` 中的 `MENUITEMS` 變數。
*   **修改樣式**：編輯 `themes/mytheme/static/css/main.css`。

---

## 6. 部署到 GitHub Pages

您可以將部落格部署到 GitHub Pages，讓全世界都能訪問您的網站！

### 步驟一：建立 GitHub Repository

1.  前往 [GitHub](https://github.com) 並登入。
2.  點擊右上角的 `+` → `New repository`。
3.  Repository 名稱填寫：`<您的使用者名稱>.github.io`（例如：`peteryue.github.io`）。
4.  設定為 **Public**。
5.  點擊 `Create repository`。

### 步驟二：修改發布設定

編輯 `publishconf.py`，將 `SITEURL` 改為您的 GitHub Pages 網址：

```python
SITEURL = 'https://<您的使用者名稱>.github.io'
```

### 步驟三：建立 GitHub Actions 自動部署

在專案根目錄建立 `.github/workflows/deploy.yml` 檔案（內容已自動生成）。

這個檔案會讓 GitHub 在您每次 push 程式碼時，自動生成網站並部署到 GitHub Pages。

### 步驟四：上傳程式碼到 GitHub

在專案根目錄執行以下指令：

```powershell
# 初始化 Git（如果還沒做過）
git init

# 新增所有檔案
git add .

# 提交變更
git commit -m "Initial commit"

# 連結到您的 GitHub Repository
git remote add origin https://github.com/<您的使用者名稱>/<您的使用者名稱>.github.io.git

# 推送到 GitHub
git push -u origin main
```

### 步驟五：啟用 GitHub Pages

1.  前往您的 GitHub Repository 頁面。
2.  點擊 `Settings` → `Pages`。
3.  在 `Source` 選擇 `GitHub Actions`。

完成後，等待幾分鐘，您的網站就會上線了！網址是：`https://<您的使用者名稱>.github.io`

### 之後如何更新網站？

每次新增或修改文章後：

```powershell
git add .
git commit -m "新增文章"
git push
```

GitHub Actions 會自動幫您重新生成並部署網站！

---

## 7. 使用自訂網域（選用）

如果您想使用自己的網域（例如 `blog.yue-lai.com`）而不是 GitHub 提供的網址：

### DNS 設定

前往您的網域服務商（如 Cloudflare、GoDaddy 等），新增以下 DNS 記錄：

**CNAME 記錄：**
- **Name/Host**: `blog`（或您想要的子網域）
- **Value/Target**: `tingyuelai.github.io`
- **TTL**: Auto 或 3600

### GitHub Pages 設定

1. 前往 GitHub Repository → Settings → Pages
2. 在 "Custom domain" 欄位輸入：`blog.yue-lai.com`
3. 點擊 Save
4. 等待 DNS 檢查完成（可能需要幾分鐘到幾小時）
5. 勾選 "Enforce HTTPS"（DNS 生效後）

**注意**：CNAME 檔案已經自動設定好了，每次部署都會包含在內。
