#!/usr/bin/env python3
"""
Edu Match Pro Backend CLI Tool
教育配對平台後端管理工具
"""

import asyncio
import os
import sys
import subprocess
from pathlib import Path
from typing import Optional

import click
from dotenv import load_dotenv

# 載入環境變數
load_dotenv()

# 設定專案根目錄
PROJECT_ROOT = Path(__file__).parent
os.chdir(PROJECT_ROOT)

@click.group()
@click.version_option(version="1.0.0")
def cli():
    """Edu Match Pro Backend CLI - 教育配對平台後端管理工具"""
    pass

@cli.command()
@click.option('--env', default='.env', help='環境變數檔案路徑')
def check_env(env: str):
    """檢查環境變數設定"""
    click.echo("🔍 檢查環境變數...")
    
    required_vars = [
        'DATABASE_URL',
        'TEST_DATABASE_URL', 
        'SECRET_KEY'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        click.echo(f"❌ 缺少必要的環境變數: {', '.join(missing_vars)}")
        click.echo(f"請檢查 {env} 檔案")
        sys.exit(1)
    else:
        click.echo("✅ 環境變數設定正確")

@cli.command()
@click.option('--revision', default='head', help='遷移到指定版本')
def migrate(revision: str):
    """執行資料庫遷移"""
    click.echo(f"🔄 執行資料庫遷移到 {revision}...")
    
    try:
        result = subprocess.run(
            ['alembic', 'upgrade', revision],
            check=True,
            capture_output=True,
            text=True
        )
        click.echo("✅ 資料庫遷移完成")
        if result.stdout:
            click.echo(result.stdout)
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 遷移失敗: {e}")
        if e.stderr:
            click.echo(e.stderr)
        sys.exit(1)

@cli.command()
def migrate_reset():
    """重置資料庫遷移（危險操作）"""
    if not click.confirm("⚠️  這將刪除所有資料庫資料，確定繼續嗎？"):
        click.echo("操作已取消")
        return
    
    click.echo("🔄 重置資料庫...")
    try:
        # 刪除所有表
        subprocess.run(['alembic', 'downgrade', 'base'], check=True)
        # 重新遷移
        subprocess.run(['alembic', 'upgrade', 'head'], check=True)
        click.echo("✅ 資料庫重置完成")
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 重置失敗: {e}")
        sys.exit(1)

@cli.command()
def test():
    """執行測試"""
    click.echo("🧪 執行測試...")
    
    try:
        result = subprocess.run(
            ['pytest', '-v', '--tb=short'],
            check=True,
            env={**os.environ, 'PYTHONPATH': str(PROJECT_ROOT)}
        )
        click.echo("✅ 所有測試通過")
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 測試失敗 (退出碼: {e.returncode})")
        sys.exit(1)

@cli.command()
@click.option('--host', default='127.0.0.1', help='伺服器主機')
@click.option('--port', default=8000, help='伺服器埠號')
@click.option('--reload', is_flag=True, help='開發模式（自動重載）')
def run(host: str, port: int, reload: bool):
    """啟動開發伺服器"""
    click.echo(f"🚀 啟動伺服器在 http://{host}:{port}")
    
    cmd = ['uvicorn', 'main:app', '--host', host, '--port', str(port)]
    if reload:
        cmd.append('--reload')
        click.echo("🔄 開發模式：檔案變更時自動重載")
    
    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        click.echo("\n👋 伺服器已停止")
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 伺服器啟動失敗: {e}")
        sys.exit(1)

@cli.command()
@click.option('--file', default='data/edu_B_1_4.csv', help='CSV 檔案路徑')
def ingest_data(file: str):
    """匯入教育資料"""
    click.echo(f"📊 匯入資料從 {file}...")
    
    if not os.path.exists(file):
        click.echo(f"❌ 檔案不存在: {file}")
        sys.exit(1)
    
    try:
        result = subprocess.run(
            ['python', 'scripts/ingest_school_tables.py'],
            check=True,
            capture_output=True,
            text=True,
            env={**os.environ, 'PYTHONPATH': str(PROJECT_ROOT)}
        )
        click.echo("✅ 資料匯入完成")
        if result.stdout:
            click.echo(result.stdout)
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 資料匯入失敗: {e}")
        if e.stderr:
            click.echo(e.stderr)
        sys.exit(1)

@cli.command()
def clean():
    """清理快取和臨時檔案"""
    click.echo("🧹 清理快取檔案...")
    
    # 刪除 Python 快取
    subprocess.run(['find', '.', '-name', '__pycache__', '-type', 'd', '-exec', 'rm', '-rf', '{}', '+'], 
                   capture_output=True)
    
    # 刪除 .pyc 檔案
    subprocess.run(['find', '.', '-name', '*.pyc', '-delete'], capture_output=True)
    
    # 刪除 .DS_Store
    subprocess.run(['find', '.', '-name', '.DS_Store', '-delete'], capture_output=True)
    
    click.echo("✅ 清理完成")

@cli.command()
def status():
    """顯示專案狀態"""
    click.echo("📊 專案狀態")
    click.echo("=" * 50)
    
    # 檢查環境變數
    click.echo("🔧 環境變數:")
    for var in ['DATABASE_URL', 'TEST_DATABASE_URL', 'SECRET_KEY']:
        value = os.getenv(var)
        if value:
            if 'SECRET_KEY' in var:
                click.echo(f"  {var}: {'*' * 8}...")
            else:
                click.echo(f"  {var}: {value[:50]}...")
        else:
            click.echo(f"  {var}: ❌ 未設定")
    
    # 檢查資料庫遷移狀態
    click.echo("\n🗄️  資料庫遷移:")
    try:
        result = subprocess.run(['alembic', 'current'], capture_output=True, text=True)
        if result.returncode == 0:
            click.echo(f"  當前版本: {result.stdout.strip()}")
        else:
            click.echo("  ❌ 無法取得遷移狀態")
    except Exception as e:
        click.echo(f"  ❌ 錯誤: {e}")
    
    # 檢查測試狀態
    click.echo("\n🧪 測試狀態:")
    try:
        result = subprocess.run(['pytest', '--collect-only', '-q'], 
                               capture_output=True, text=True,
                               env={**os.environ, 'PYTHONPATH': str(PROJECT_ROOT)})
        if result.returncode == 0:
            test_count = len([line for line in result.stdout.split('\n') if 'test_' in line])
            click.echo(f"  測試數量: {test_count}")
        else:
            click.echo("  ❌ 無法取得測試狀態")
    except Exception as e:
        click.echo(f"  ❌ 錯誤: {e}")

@cli.command()
@click.option('--name', prompt='遷移名稱', help='新遷移的名稱')
def create_migration(name: str):
    """創建新的資料庫遷移"""
    click.echo(f"📝 創建遷移: {name}")
    
    try:
        result = subprocess.run(
            ['alembic', 'revision', '--autogenerate', '-m', name],
            check=True,
            capture_output=True,
            text=True
        )
        click.echo("✅ 遷移檔案已創建")
        if result.stdout:
            click.echo(result.stdout)
    except subprocess.CalledProcessError as e:
        click.echo(f"❌ 創建遷移失敗: {e}")
        if e.stderr:
            click.echo(e.stderr)
        sys.exit(1)

@cli.command()
def docs():
    """顯示 API 文件網址"""
    click.echo("📚 API 文件")
    click.echo("=" * 50)
    click.echo("啟動伺服器後，可訪問以下網址：")
    click.echo("  📖 Swagger UI: http://localhost:8000/docs")
    click.echo("  📋 ReDoc: http://localhost:8000/redoc")
    click.echo("  🔧 OpenAPI JSON: http://localhost:8000/openapi.json")

if __name__ == '__main__':
    cli()
