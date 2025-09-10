# FunWords - 趣味背单词

一个面向高中生的轻量化单词学习应用，支持PWA，可离线使用。

## 🌟 功能特色

- 🎯 **游戏化学习** - 闯关模式、成就系统、积分奖励
- 📚 **多样化题型** - 选择题、填空题、拼写题
- 📊 **数据可视化** - 学习日历、进度统计、成就墙
- 🎨 **精美设计** - 现代化UI、流畅动画、响应式布局
- 📱 **PWA支持** - 可安装到主屏幕，支持离线使用
- 🔒 **隐私保护** - 数据本地存储，无需注册
- ⚡ **极速加载** - 轻量化设计，秒开应用

## 🚀 快速开始

### 本地运行

1. 克隆项目
   ```bash
   git clone https://github.com/your-username/funwords.git
   cd funwords
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 `http://localhost:5173`

### 直接使用

直接下载 `index.html`、`style.css`、`script.js` 文件，在浏览器中打开 `index.html` 即可使用。

## 📦 部署到Vercel

### 方法一：通过Vercel Dashboard

1. 将代码推送到GitHub仓库
2. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project"
4. 选择你的GitHub仓库
5. 点击 "Deploy"

### 方法二：通过Vercel CLI

1. 安装Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. 登录Vercel
   ```bash
   vercel login
   ```

3. 部署项目
   ```bash
   vercel
   ```

4. 部署到生产环境
   ```bash
   vercel --prod
   ```

### 自动部署

配置完成后，每次推送到GitHub主分支都会自动部署。

## 🛠️ 技术栈

- **前端框架**: 纯HTML/CSS/JavaScript
- **构建工具**: Vite
- **样式**: 原生CSS + CSS动画
- **数据存储**: localStorage
- **PWA**: Service Worker + Web App Manifest
- **部署平台**: Vercel

## 📁 项目结构

```
funwords/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 主要逻辑
├── manifest.json       # PWA配置
├── sw.js              # Service Worker
├── vercel.json        # Vercel配置
├── package.json       # 项目配置
└── README.md          # 说明文档
```

## 🎮 使用说明

### 基本功能

1. **开始学习** - 查看单词卡片，点击翻转查看释义
2. **开始测试** - 进行多种题型的测试
3. **查看成就** - 查看学习统计和成就徽章

### 快捷键

- `←` / `→` - 上一个/下一个单词
- `空格` - 翻转卡片
- `ESC` - 返回首页

### 数据管理

- 所有数据存储在浏览器本地
- 支持收藏单词和错题本功能
- 自动保存学习进度

## 🔧 自定义配置

### 添加新单词

在 `script.js` 中的 `sampleWords` 数组添加新单词：

```javascript
{
    id: 16,
    word: "new-word",
    phonetic: "[音标]",
    meaning: "释义",
    example: "例句",
    image: "图片URL"
}
```

### 修改样式

编辑 `style.css` 文件，主要配色方案：

- 主色：`#3BAFDA` (湖蓝)
- 辅助色：`#FF9F45` (橙色)
- 背景色：`#F9FAFB` (浅灰)

## 📱 PWA功能

### 安装应用

1. 在浏览器中打开应用
2. 浏览器会显示安装提示
3. 点击"添加到主屏幕"
4. 应用图标会出现在桌面

### 离线使用

- 首次访问后会缓存所有资源
- 断网状态下仍可正常使用
- 数据会同步到本地存储

## 🎯 成就系统

- 🌱 **初学者** - 学习第一个单词
- 🎯 **十词达人** - 学习10个单词
- 🔥 **百日坚持** - 连续学习7天
- ⭐ **完美主义者** - 正确率达到90%
- 💎 **收藏家** - 收藏10个单词
- 📅 **每日一练** - 单日学习20个单词

## 📊 数据统计

- 学习日历显示每日学习记录
- 统计图表展示学习进度
- 成就墙展示获得的徽章
- 实时计算正确率和连续天数

## 🔒 隐私保护

- 所有数据存储在用户本地
- 不上传任何个人信息
- 无需注册账号即可使用
- 支持数据导入导出

## 🚀 性能优化

- 代码压缩和混淆
- 图片懒加载
- Service Worker缓存
- 响应式图片处理

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📞 联系我们

- 项目地址：[GitHub Repository](https://github.com/your-username/funwords)
- 问题反馈：[Issues](https://github.com/your-username/funwords/issues)
- 邮箱：your-email@example.com

## 🎉 致谢

感谢所有为这个项目做出贡献的开发者！

---

**开始你的单词学习之旅吧！** 🚀