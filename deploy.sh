#!/bin/bash

# FunWords 部署脚本
# 用于部署到 Vercel

echo "🚀 开始部署 FunWords 到 Vercel..."

# 检查文件是否存在
echo "📁 检查项目文件..."
files=("index.html" "style.css" "script.js" "manifest.json" "sw.js" "vercel.json" "package.json" "README.md")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ 缺少 $file"
        exit 1
    fi
done

# 检查 Vercel CLI 是否安装
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查是否已登录
echo "🔐 检查 Vercel 登录状态..."
vercel whoami || {
    echo "请先登录 Vercel:"
    vercel login
}

# 部署到预览环境
echo "🎯 部署到预览环境..."
vercel

# 询问是否部署到生产环境
read -p "是否部署到生产环境？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 部署到生产环境..."
    vercel --prod
    echo "✅ 部署完成！"
else
    echo "📋 预览部署完成，请检查预览链接"
fi