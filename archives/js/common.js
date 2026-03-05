// 造物协会档案库 全站通用脚本
// 1. 折叠面板切换（导航页+详情页通用）
function toggleFold(el) {
    el.parentElement.classList.toggle('active');
}
// 2. 详情页立绘显示/隐藏切换
function toggleAvatar() {
    const avatarBox = document.getElementById('avatarBox');
    avatarBox.style.display = avatarBox.style.display === 'block' ? 'none' : 'block';
}
// 3. 导航页快捷生成角色详情页HTML代码
document.addEventListener('DOMContentLoaded', function() {
    const generatorForm = document.getElementById('generatorForm');
    if (generatorForm) {
        generatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 获取表单值
            const fileName = document.getElementById('fileName').value;
            const unitCode = document.getElementById('unitCode').value;
            const unitName = document.getElementById('unitName').value;
            const accentColor = document.getElementById('accentColor').value;
            const avatarUrl = document.getElementById('avatarUrl').value;
            const unitRace = document.getElementById('unitRace').value;
            const unitStatus = document.getElementById('unitStatus').value;
            const details = JSON.parse(document.getElementById('details').value);
            const bio = document.getElementById('bio').value;
            const avatarImgUrl = document.getElementById('avatarImgUrl').value;
            
            // 解析颜色为RGB（用于阴影）
            const hexToRgb = (hex) => {
                const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
                return `${r},${g},${b}`;
            };
            const accentRgb = hexToRgb(accentColor);

            // 拼接基础信息HTML
            let detailsHtml = '';
            for (const [label, value] of Object.entries(details)) {
                detailsHtml += `<p><span class="highlight">${label}：</span> ${value}</p>`;
            }
            // 生成详情页代码（自动引入公共CSS/JS，仅需改专属色）
            const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${unitCode} · ${unitName}档案</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        :root {
            --accent-color: ${accentColor};
            --accent-rgb: ${accentRgb};
        }
        .tips {border-left-color: ${accentColor}; color: ${accentColor}88;}
    </style>
</head>
<body>
    <div class="wrap">
        <a class="back" href="index.html">← 返回档案导航</a>
        <div class="tips">
            <strong>TIPS：</strong>${unitCode}为造物协会改造实验体，${unitStatus === 'Active' ? '现役作战单位，高危级' : '收容管控单位，限制级'}，档案信息禁止外泄。
        </div>
        <button class="avatar-btn" onclick="toggleAvatar()">查看/隐藏角色立绘</button>
        <div class="avatar-box" id="avatarBox">
            <img src="${avatarImgUrl}" alt="${unitName}立绘">
        </div>
        <div class="detail-title">
            <h1>${unitCode} · ${unitName}档案</h1>
            <p>造物协会 · ${unitRace}</p>
        </div>
        <div class="fold active" onclick="toggleFold(this)">
            <div class="fold-head">基础信息</div>
            <div class="fold-content">
                <div class="info-grid">${detailsHtml}</div>
            </div>
        </div>
        <div class="fold" onclick="toggleFold(this)">
            <div class="fold-head">背景经历</div>
            <div class="fold-content">
                ${bio.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
            </div>
        </div>
    </div>
    <script src="js/common.js"></script>
</body>
</html>`;
            // 输出代码到文本框
            document.getElementById('codeOutput').value = htmlTemplate;
        });
    }
    // 初始化折叠面板点击事件（详情页）
    document.querySelectorAll('.fold-head').forEach(head => {
        head.addEventListener('click', () => toggleFold(head.parentElement));
    });
});
