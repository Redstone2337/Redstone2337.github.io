// 造物协会档案库 全站通用交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 1. 折叠面板交互（详情页）
    const foldHeads = document.querySelectorAll('.fold-head');
    foldHeads.forEach(head => {
        head.addEventListener('click', () => {
            head.parentElement.classList.toggle('active');
        });
    });

    // 2. 角色立绘 显示/隐藏 切换（详情页）
    const avatarBtn = document.getElementById('avatarBtn');
    const avatarBox = document.getElementById('avatarBox');
    if (avatarBtn && avatarBox) {
        avatarBtn.addEventListener('click', () => {
            avatarBox.style.display = avatarBox.style.display === 'block' ? 'none' : 'block';
        });
    }

    // 3. 快捷生成角色详情页代码（导航页）
    const generatorForm = document.getElementById('generatorForm');
    if (generatorForm) {
        generatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 获取表单输入值
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

            // 转换主题色为RGB（用于阴影）
            const accentRgb = hexToRgb(accentColor).join(',');
            // 拼接基础信息HTML
            let detailsHtml = '';
            for (const [label, value] of Object.entries(details)) {
                detailsHtml += `<p><span class="highlight">${label}：</span> ${value}</p>`;
            }

            // 生成详情页HTML模板（自动复用公共CSS/JS）
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
        <button class="avatar-btn" id="avatarBtn">查看/隐藏角色立绘</button>
        <div class="avatar-box" id="avatarBox">
            <img src="${avatarImgUrl}" alt="${unitName}立绘">
        </div>
        <div class="detail-title">
            <h1>${unitCode} · ${unitName}档案</h1>
            <p>造物协会 · ${unitRace}</p>
        </div>
        <div class="fold active">
            <div class="fold-head">基础信息</div>
            <div class="fold-content">
                <div class="info-grid">
                    ${detailsHtml}
                </div>
            </div>
        </div>
        <div class="fold">
            <div class="fold-head">背景经历</div>
            <div class="fold-content">
                ${bio.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
            </div>
        </div>
        <script src="js/common.js"></script>
    </div>
</body>
</html>`;
            // 输出代码到文本框
            document.getElementById('codeOutput').value = htmlTemplate;
        });
    }

    // 辅助函数：16进制颜色转RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [255, 215, 0];
    }
});
