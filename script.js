// 全局状态管理
const AppState = {
    currentPage: 'home',
    currentLevel: 1,
    currentWordIndex: 0,
    words: [],
    favorites: [],
    wrongWords: [],
    testScore: 0,
    testCurrent: 1,
    testTotal: 10,
    achievements: [],
    studyStats: {
        totalWords: 0,
        streakDays: 0,
        accuracyRate: 0,
        wordsToday: 0,
        lastStudyDate: null
    }
};

// 示例单词数据
const sampleWords = [
    {
        id: 1,
        word: "abandon",
        phonetic: "[əˈbændən]",
        meaning: "放弃，抛弃",
        example: "He abandoned his wife and children.",
        image: "https://picsum.photos/seed/abandon/100/100.jpg"
    },
    {
        id: 2,
        word: "ability",
        phonetic: "[əˈbɪləti]",
        meaning: "能力，才能",
        example: "She has the ability to speak three languages.",
        image: "https://picsum.photos/seed/ability/100/100.jpg"
    },
    {
        id: 3,
        word: "absent",
        phonetic: "[ˈæbsənt]",
        meaning: "缺席的，不在的",
        example: "Why were you absent from class yesterday?",
        image: "https://picsum.photos/seed/absent/100/100.jpg"
    },
    {
        id: 4,
        word: "absolute",
        phonetic: "[ˈæbsəluːt]",
        meaning: "绝对的，完全的",
        example: "I have absolute confidence in you.",
        image: "https://picsum.photos/seed/absolute/100/100.jpg"
    },
    {
        id: 5,
        word: "academic",
        phonetic: "[ˌækəˈdemɪk]",
        meaning: "学术的，教育的",
        example: "She has excellent academic qualifications.",
        image: "https://picsum.photos/seed/academic/100/100.jpg"
    },
    {
        id: 6,
        word: "accept",
        phonetic: "[əkˈsept]",
        meaning: "接受，同意",
        example: "I accept your apology.",
        image: "https://picsum.photos/seed/accept/100/100.jpg"
    },
    {
        id: 7,
        word: "access",
        phonetic: "[ˈækses]",
        meaning: "进入，使用权",
        example: "Students have access to the library.",
        image: "https://picsum.photos/seed/access/100/100.jpg"
    },
    {
        id: 8,
        word: "accident",
        phonetic: "[ˈæksɪdənt]",
        meaning: "事故，意外",
        example: "There was a car accident on the highway.",
        image: "https://picsum.photos/seed/accident/100/100.jpg"
    },
    {
        id: 9,
        word: "accompany",
        phonetic: "[əˈkʌmpəni]",
        meaning: "陪伴，伴随",
        example: "She accompanied me to the hospital.",
        image: "https://picsum.photos/seed/accompany/100/100.jpg"
    },
    {
        id: 10,
        word: "accomplish",
        phonetic: "[əˈkʌmplɪʃ]",
        meaning: "完成，实现",
        example: "We accomplished our goal ahead of schedule.",
        image: "https://picsum.photos/seed/accomplish/100/100.jpg"
    },
    {
        id: 11,
        word: "account",
        phonetic: "[əˈkaʊnt]",
        meaning: "账户，说明",
        example: "I need to deposit money into my account.",
        image: "https://picsum.photos/seed/account/100/100.jpg"
    },
    {
        id: 12,
        word: "accurate",
        phonetic: "[ˈækjərət]",
        meaning: "准确的，精确的",
        example: "The information in the report is accurate.",
        image: "https://picsum.photos/seed/accurate/100/100.jpg"
    },
    {
        id: 13,
        word: "achieve",
        phonetic: "[əˈtʃiːv]",
        meaning: "实现，达到",
        example: "She worked hard to achieve her dreams.",
        image: "https://picsum.photos/seed/achieve/100/100.jpg"
    },
    {
        id: 14,
        word: "acquire",
        phonetic: "[əˈkwaɪər]",
        meaning: "获得，取得",
        example: "He acquired the company last year.",
        image: "https://picsum.photos/seed/acquire/100/100.jpg"
    },
    {
        id: 15,
        word: "activity",
        phonetic: "[ækˈtɪvəti]",
        meaning: "活动，行为",
        example: "The school offers many after-school activities.",
        image: "https://picsum.photos/seed/activity/100/100.jpg"
    }
];

// 成就定义
const achievementDefinitions = [
    { id: 1, name: "初学者", icon: "🌱", description: "学习第一个单词", condition: (stats) => stats.totalWords >= 1 },
    { id: 2, name: "十词达人", icon: "🎯", description: "学习10个单词", condition: (stats) => stats.totalWords >= 10 },
    { id: 3, name: "百日坚持", icon: "🔥", description: "连续学习7天", condition: (stats) => stats.streakDays >= 7 },
    { id: 4, name: "完美主义者", icon: "⭐", description: "正确率达到90%", condition: (stats) => stats.accuracyRate >= 90 },
    { id: 5, name: "收藏家", icon: "💎", description: "收藏10个单词", condition: () => AppState.favorites.length >= 10 },
    { id: 6, name: "每日一练", icon: "📅", description: "单日学习20个单词", condition: (stats) => stats.wordsToday >= 20 }
];

// 初始化应用
function initApp() {
    loadFromStorage();
    initializeWords();
    updateDashboard();
    updateAchievements();
    updateStudyCalendar();
}

// 从本地存储加载数据
function loadFromStorage() {
    const saved = localStorage.getItem('funwords_data');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(AppState, data);
    }
}

// 保存数据到本地存储
function saveToStorage() {
    localStorage.setItem('funwords_data', JSON.stringify(AppState));
}

// 初始化单词数据
function initializeWords() {
    if (AppState.words.length === 0) {
        AppState.words = [...sampleWords];
    }
}

// 页面导航
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    AppState.currentPage = pageId;
}

function goHome() {
    showPage('home-page');
    updateDashboard();
}

// 更新仪表板
function updateDashboard() {
    document.getElementById('total-words').textContent = AppState.studyStats.totalWords;
    document.getElementById('streak-days').textContent = AppState.studyStats.streakDays;
    document.getElementById('accuracy-rate').textContent = Math.round(AppState.studyStats.accuracyRate) + '%';
    document.getElementById('words-today').textContent = AppState.studyStats.wordsToday;
    
    // 更新进度条
    const progress = (AppState.studyStats.wordsToday / 20) * 100;
    document.getElementById('daily-progress').style.width = progress + '%';
    
    // 更新成就预览
    updateBadgesPreview();
}

// 更新成就预览
function updateBadgesPreview() {
    const previewContainer = document.getElementById('badges-preview');
    previewContainer.innerHTML = '';
    
    const unlockedAchievements = AppState.achievements.slice(0, 3);
    unlockedAchievements.forEach(achievement => {
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = achievement.icon;
        badge.title = achievement.name;
        previewContainer.appendChild(badge);
    });
}

// 开始学习
function startLearning() {
    AppState.currentLevel = 1;
    AppState.currentWordIndex = 0;
    showPage('learning-page');
    loadCurrentWord();
    updateLevelInfo();
}

// 加载当前单词
function loadCurrentWord() {
    const word = AppState.words[AppState.currentWordIndex];
    if (!word) return;
    
    document.getElementById('word-text').textContent = word.word;
    document.getElementById('word-phonetic').textContent = word.phonetic;
    document.getElementById('word-meaning').textContent = word.meaning;
    document.getElementById('word-example').textContent = word.example;
    document.getElementById('word-image').querySelector('img').src = word.image;
    
    // 重置卡片状态
    const card = document.getElementById('word-card');
    card.classList.remove('flipped');
}

// 翻转卡片
function flipCard() {
    const card = document.getElementById('word-card');
    card.classList.toggle('flipped');
}

// 播放音频
function playAudio(event) {
    event.stopPropagation();
    const word = AppState.words[AppState.currentWordIndex];
    if (word) {
        // 使用Web Speech API播放发音
        const utterance = new SpeechSynthesisUtterance(word.word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

// 切换收藏
function toggleFavorite() {
    const word = AppState.words[AppState.currentWordIndex];
    if (!word) return;
    
    const index = AppState.favorites.findIndex(fav => fav.id === word.id);
    if (index === -1) {
        AppState.favorites.push(word);
        showNotification('已收藏单词: ' + word.word);
    } else {
        AppState.favorites.splice(index, 1);
        showNotification('已取消收藏: ' + word.word);
    }
    
    saveToStorage();
    checkAchievements();
}

// 上一个单词
function previousWord() {
    if (AppState.currentWordIndex > 0) {
        AppState.currentWordIndex--;
        loadCurrentWord();
        updateLevelInfo();
    }
}

// 下一个单词
function nextWord() {
    if (AppState.currentWordIndex < AppState.words.length - 1) {
        AppState.currentWordIndex++;
        
        // 更新学习统计
        AppState.studyStats.totalWords++;
        AppState.studyStats.wordsToday++;
        updateStudyStreak();
        
        loadCurrentWord();
        updateLevelInfo();
        saveToStorage();
        checkAchievements();
        
        // 检查是否完成关卡
        if (AppState.currentWordIndex % 10 === 0) {
            AppState.currentLevel++;
            showNotification(`恭喜完成第${AppState.currentLevel - 1}关！`);
        }
    } else {
        showNotification('恭喜完成所有单词！');
        goHome();
    }
}

// 更新关卡信息
function updateLevelInfo() {
    document.getElementById('current-level').textContent = AppState.currentLevel;
    document.getElementById('level-progress').textContent = (AppState.currentWordIndex % 10) + 1;
}

// 开始测试
function startTest() {
    AppState.testScore = 0;
    AppState.testCurrent = 1;
    AppState.testTotal = Math.min(10, AppState.words.length);
    showPage('test-page');
    loadTestQuestion();
    updateTestInfo();
}

// 加载测试题目
function loadTestQuestion() {
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    
    const word = AppState.words[AppState.testCurrent - 1];
    if (!word) return;
    
    // 随机选择题型
    const questionTypes = ['multiple-choice', 'fill-blank', 'spelling'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    switch (questionType) {
        case 'multiple-choice':
            createMultipleChoiceQuestion(word, container);
            break;
        case 'fill-blank':
            createFillBlankQuestion(word, container);
            break;
        case 'spelling':
            createSpellingQuestion(word, container);
            break;
    }
}

// 创建选择题
function createMultipleChoiceQuestion(word, container) {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <div class="question-text">选择单词 "${word.word}" 的正确释义：</div>
        <div class="options-grid">
            ${generateOptions(word).map(option => `
                <button class="option-btn" onclick="selectOption(this, '${option}', '${word.meaning}')">${option}</button>
            `).join('')}
        </div>
    `;
    container.appendChild(questionDiv);
}

// 生成选项
function generateOptions(correctWord) {
    const options = [correctWord.meaning];
    const otherWords = AppState.words.filter(w => w.id !== correctWord.id);
    
    while (options.length < 4 && otherWords.length > 0) {
        const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        if (!options.includes(randomWord.meaning)) {
            options.push(randomWord.meaning);
        }
        otherWords.splice(randomWord, 1);
    }
    
    return options.sort(() => Math.random() - 0.5);
}

// 创建填空题
function createFillBlankQuestion(word, container) {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <div class="question-text">填空：${word.example.replace(word.word, '_____')}</div>
        <div class="options-grid">
            ${generateBlankOptions(word).map(option => `
                <button class="option-btn" onclick="selectOption(this, '${option}', '${word.word}')">${option}</button>
            `).join('')}
        </div>
    `;
    container.appendChild(questionDiv);
}

// 生成填空选项
function generateBlankOptions(correctWord) {
    const options = [correctWord.word];
    const otherWords = AppState.words.filter(w => w.id !== correctWord.id);
    
    while (options.length < 4 && otherWords.length > 0) {
        const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        if (!options.includes(randomWord.word)) {
            options.push(randomWord.word);
        }
        otherWords.splice(randomWord, 1);
    }
    
    return options.sort(() => Math.random() - 0.5);
}

// 创建拼写题
function createSpellingQuestion(word, container) {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <div class="question-text">听音拼写："${word.meaning}"</div>
        <div class="spelling-input">
            <input type="text" id="spelling-answer" placeholder="请输入单词拼写" style="padding: 1rem; font-size: 1.2rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; width: 100%; max-width: 300px;">
            <button class="btn btn-primary" onclick="checkSpelling('${word.word}')" style="margin-top: 1rem;">提交答案</button>
        </div>
        <button class="btn btn-secondary" onclick="playSpellingAudio('${word.word}')" style="margin-top: 1rem;">🔊 播放发音</button>
    `;
    container.appendChild(questionDiv);
}

// 选择选项
function selectOption(button, selected, correct) {
    // 禁用所有选项
    const options = button.parentElement.querySelectorAll('.option-btn');
    options.forEach(opt => opt.disabled = true);
    
    if (selected === correct) {
        button.classList.add('correct');
        AppState.testScore += 10;
        showNotification('正确！+10分', 'success');
    } else {
        button.classList.add('incorrect');
        // 显示正确答案
        options.forEach(opt => {
            if (opt.textContent === correct) {
                opt.classList.add('correct');
            }
        });
        showNotification(`错误！正确答案是: ${correct}`, 'error');
    }
    
    // 显示下一题按钮
    document.getElementById('next-question-btn').style.display = 'inline-block';
    updateTestInfo();
}

// 检查拼写
function checkSpelling(correctWord) {
    const input = document.getElementById('spelling-answer');
    const userAnswer = input.value.toLowerCase().trim();
    
    if (userAnswer === correctWord.toLowerCase()) {
        input.style.borderColor = '#4ADE80';
        input.style.backgroundColor = '#F0FDF4';
        AppState.testScore += 10;
        showNotification('正确！+10分', 'success');
    } else {
        input.style.borderColor = '#F87171';
        input.style.backgroundColor = '#FEF2F2';
        showNotification(`错误！正确答案是: ${correctWord}`, 'error');
    }
    
    input.disabled = true;
    document.getElementById('next-question-btn').style.display = 'inline-block';
    updateTestInfo();
}

// 播放拼写音频
function playSpellingAudio(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 下一题
function nextQuestion() {
    if (AppState.testCurrent < AppState.testTotal) {
        AppState.testCurrent++;
        loadTestQuestion();
        updateTestInfo();
        document.getElementById('next-question-btn').style.display = 'none';
    } else {
        finishTest();
    }
}

// 完成测试
function finishTest() {
    const accuracy = (AppState.testScore / (AppState.testTotal * 10)) * 100;
    showNotification(`测试完成！得分: ${AppState.testScore}/${AppState.testTotal * 10} (${Math.round(accuracy)}%)`);
    
    // 更新学习统计
    const totalTests = parseInt(localStorage.getItem('total_tests') || '0') + 1;
    const totalScore = parseInt(localStorage.getItem('total_score') || '0') + AppState.testScore;
    
    localStorage.setItem('total_tests', totalTests);
    localStorage.setItem('total_score', totalScore);
    
    AppState.studyStats.accuracyRate = (totalScore / (totalTests * AppState.testTotal * 10)) * 100;
    
    saveToStorage();
    checkAchievements();
    
    setTimeout(() => goHome(), 2000);
}

// 更新测试信息
function updateTestInfo() {
    document.getElementById('test-current').textContent = AppState.testCurrent;
    document.getElementById('test-total').textContent = AppState.testTotal;
    document.getElementById('test-score').textContent = AppState.testScore;
}

// 显示成就页面
function showAchievements() {
    showPage('achievements-page');
    updateAchievementsWall();
    updateStudyCalendar();
    updateStatsChart();
}

// 更新成就墙
function updateAchievementsWall() {
    const container = document.getElementById('badges-wall');
    container.innerHTML = '';
    
    achievementDefinitions.forEach(achievement => {
        const isUnlocked = AppState.achievements.some(a => a.id === achievement.id);
        const badge = document.createElement('div');
        badge.className = `badge ${isUnlocked ? '' : 'locked'}`;
        badge.textContent = achievement.icon;
        badge.title = `${achievement.name}: ${achievement.description}`;
        container.appendChild(badge);
    });
}

// 更新学习日历
function updateStudyCalendar() {
    const calendar = document.getElementById('study-calendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    
    // 获取当前月份的天数
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 添加星期标题
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        calendar.appendChild(dayHeader);
    });
    
    // 添加日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // 检查是否是今天
        if (day === now.getDate()) {
            dayElement.classList.add('today');
        }
        
        // 检查是否有学习记录
        const studyKey = `study_${year}_${month}_${day}`;
        if (localStorage.getItem(studyKey)) {
            dayElement.classList.add('has-study');
        }
        
        calendar.appendChild(dayElement);
    }
}

// 更新统计图表
function updateStatsChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const last7Days = [];
    const wordsPerDay = [];
    
    // 获取最近7天的数据
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = `study_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
        const studyData = JSON.parse(localStorage.getItem(key) || '{"words": 0}');
        
        last7Days.push(`${date.getMonth() + 1}/${date.getDate()}`);
        wordsPerDay.push(studyData.words || 0);
    }
    
    // 简单的条形图
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const barWidth = canvas.width / 7;
    const maxWords = Math.max(...wordsPerDay, 1);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    wordsPerDay.forEach((words, index) => {
        const barHeight = (words / maxWords) * (canvas.height - 40);
        const x = index * barWidth + barWidth * 0.1;
        const y = canvas.height - barHeight - 20;
        
        // 绘制条形
        ctx.fillStyle = '#3BAFDA';
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
        
        // 绘制标签
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(last7Days[index], x + barWidth * 0.4, canvas.height - 5);
        
        // 绘制数值
        ctx.fillText(words, x + barWidth * 0.4, y - 5);
    });
}

// 检查成就
function checkAchievements() {
    achievementDefinitions.forEach(achievement => {
        const hasAchievement = AppState.achievements.some(a => a.id === achievement.id);
        if (!hasAchievement && achievement.condition(AppState.studyStats)) {
            AppState.achievements.push(achievement);
            showNotification(`🎉 获得新成就: ${achievement.name}!`, 'achievement');
        }
    });
    
    saveToStorage();
}

// 更新学习连续天数
function updateStudyStreak() {
    const today = new Date().toDateString();
    const lastStudy = AppState.studyStats.lastStudyDate;
    
    if (lastStudy !== today) {
        // 检查是否是连续学习
        if (lastStudy) {
            const lastDate = new Date(lastStudy);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                AppState.studyStats.streakDays++;
            } else if (diffDays > 1) {
                AppState.studyStats.streakDays = 1;
            }
        } else {
            AppState.studyStats.streakDays = 1;
        }
        
        AppState.studyStats.lastStudyDate = today;
        
        // 保存今日学习记录
        const studyKey = `study_${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}`;
        const todayData = JSON.parse(localStorage.getItem(studyKey) || '{"words": 0}');
        todayData.words = AppState.studyStats.wordsToday;
        localStorage.setItem(studyKey, JSON.stringify(todayData));
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4ADE80';
            break;
        case 'error':
            notification.style.backgroundColor = '#F87171';
            break;
        case 'achievement':
            notification.style.backgroundColor = '#FACC15';
            notification.style.color = '#854D0E';
            break;
        default:
            notification.style.backgroundColor = '#3BAFDA';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp);

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (AppState.currentPage === 'learning-page') {
                previousWord();
            }
            break;
        case 'ArrowRight':
            if (AppState.currentPage === 'learning-page') {
                nextWord();
            }
            break;
        case ' ':
            if (AppState.currentPage === 'learning-page') {
                e.preventDefault();
                flipCard();
            }
            break;
        case 'Escape':
            goHome();
            break;
    }
});

// 注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// PWA安装提示
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // 显示安装提示
    setTimeout(() => {
        if (confirm('是否将FunWords添加到主屏幕？')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        }
    }, 3000);
});