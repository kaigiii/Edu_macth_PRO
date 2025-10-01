# Edu Match Pro Backend CLI

教育配對平台後端管理工具，提供便捷的命令列介面來管理專案。

## 安裝與使用

### 基本使用
```bash
# 啟動虛擬環境
source .venv/bin/activate

# 查看所有可用命令
python cli.py --help

# 查看專案狀態
python cli.py status
```

## 可用命令

### 🔧 環境管理
```bash
# 檢查環境變數設定
python cli.py check-env

# 顯示專案狀態
python cli.py status
```

### 🗄️ 資料庫管理
```bash
# 執行資料庫遷移
python cli.py migrate

# 遷移到特定版本
python cli.py migrate --revision 292edf065a1e

# 創建新的遷移檔案
python cli.py create-migration "add new feature"

# 重置資料庫（危險操作）
python cli.py migrate-reset
```

### 🧪 測試與開發
```bash
# 執行所有測試
python cli.py test

# 啟動開發伺服器
python cli.py run

# 啟動開發伺服器（自動重載）
python cli.py run --reload

# 指定主機和埠號
python cli.py run --host 0.0.0.0 --port 8080
```

### 📊 資料管理
```bash
# 匯入教育資料
python cli.py ingest-data

# 匯入指定檔案
python cli.py ingest-data --file data/custom.csv
```

### 🧹 維護
```bash
# 清理快取和臨時檔案
python cli.py clean
```

### 📚 文件
```bash
# 顯示 API 文件網址
python cli.py docs
```

## 常用工作流程

### 開發新功能
```bash
# 1. 檢查環境
python cli.py check-env

# 2. 創建資料庫遷移
python cli.py create-migration "add user profile"

# 3. 執行遷移
python cli.py migrate

# 4. 運行測試
python cli.py test

# 5. 啟動開發伺服器
python cli.py run --reload
```

### 部署前檢查
```bash
# 1. 檢查專案狀態
python cli.py status

# 2. 執行所有測試
python cli.py test

# 3. 清理快取
python cli.py clean
```

### 資料庫重置
```bash
# 重置到初始狀態
python cli.py migrate-reset

# 重新匯入資料
python cli.py ingest-data
```

## 環境變數

確保 `.env` 檔案包含以下變數：
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
TEST_DATABASE_URL=postgresql+asyncpg://user:password@localhost/test_dbname
SECRET_KEY=your-secret-key-here
```

## 故障排除

### 常見問題
1. **環境變數未設定**：使用 `python cli.py check-env` 檢查
2. **資料庫連線失敗**：檢查 `DATABASE_URL` 設定
3. **測試失敗**：使用 `python cli.py clean` 清理快取
4. **遷移失敗**：檢查資料庫連線和遷移檔案

### 除錯模式
```bash
# 詳細測試輸出
python cli.py test --verbose

# 檢查遷移狀態
alembic current
alembic history
```

## 進階用法

### 自訂環境
```bash
# 使用不同的環境變數檔案
python cli.py check-env --env .env.production
```

### 批次操作
```bash
# 清理 + 測試 + 啟動
python cli.py clean && python cli.py test && python cli.py run
```

## 注意事項

- 使用 `migrate-reset` 前請備份重要資料
- 生產環境請勿使用 `--reload` 選項
- 定期執行 `clean` 命令保持專案整潔
