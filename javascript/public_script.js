/*
 * Copyright © 2020. Spectrollay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// 路径检测
const currentURL = window.location.href;
const currentPagePath = window.location.pathname;
let hostPath = window.location.origin;
const parts = currentPagePath.split('/').filter(Boolean);
let rootPath = '/' + (parts.length > 0 ? parts[0] : '');
const slashCount = (currentPagePath.match(/\//g) || []).length;

// 日志管理器
window.logManager = {
    log: function (message, level = 'info') {
        const isLocalEnv = hostPath.includes('localhost') || rootPath.includes('_test');
        const formattedMessage = `[${level.toUpperCase()}]: ${message}`;
        const logFunction = console[level] || console.log;
        if (level === 'error') {
            logFunction.call(console, formattedMessage);
            console.trace(); // 输出堆栈追踪
        } else if (isLocalEnv) {
            logFunction.call(console, formattedMessage);
            console.trace(); // 在测试和开发环境中也输出
        }
    }
};

// 检测浏览器是否处于夜间模式
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('no-dark-mode'); // 覆盖夜间模式下的样式
}

// 响应式设计动画
document.addEventListener('DOMContentLoaded', function () {
    const mainScrollView = document.querySelector('.main_scroll_view.with_sidebar');
    if (mainScrollView) {
        window.addEventListener('resize', function () {
            mainScrollView.classList.add('animate');
        });
    }
});

// 点击顶栏回到顶部
document.addEventListener('DOMContentLoaded', function () {
    const headerLogo = document.querySelector('.header_logo');
    if (headerLogo) {
        headerLogo.addEventListener('click', scrollToTop);
    }
});

// 跳转判定
let isNavigating = false;

function ifNavigating(way, url) {
    if (isNavigating) {
        return; // 防止重复点击
    }
    isNavigating = true; // 设置状态,正在跳转
    if (way === 'direct') {
        window.location.href = url;
    } else if (way === 'open') {
        setTimeout(function () {
            window.open(url);
            setTimeout(function () {
                isNavigating = false; // 重置状态,允许下一次点击
            }, 100);
        }, 100);
    } else if (way === 'delayed_open') {
        setTimeout(function () {
            window.open(url);
            setTimeout(function () {
                isNavigating = false; // 重置状态,允许下一次点击
            }, 100);
        }, 1500);
    } else if (way === 'jump') {
        setTimeout(function () {
            window.location.href = url;
            setTimeout(function () {
                isNavigating = false; // 重置状态,允许下一次点击
            }, 100);
        }, 600);
    }
}

logManager.log("浏览器UA: " + navigator.userAgent)
logManager.log("完整路径: " + currentURL);
logManager.log("来源: " + hostPath);
logManager.log("根路径: " + rootPath);
logManager.log("当前路径: " + currentPagePath);
logManager.log("当前位于" + (slashCount - 1) + "级页面");

if (hostPath.includes('file:///')) {
    logManager.log("当前运行在本地文件");
} else if (hostPath.includes('localhost')) {
    logManager.log("当前运行在本地服务器");
} else {
    logManager.log("当前运行在" + hostPath);
    // 禁用右键菜单
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
    // 禁用长按菜单
    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
    });
}
if (rootPath.includes('_test')) {
    document.body.classList.add('test');
    logManager.log("当前为开发环境");
} else {
    logManager.log("当前为发布环境");
}

// 输出错误日志
window.addEventListener('error', function (event) {
    logManager.log("错误: " + event.message, 'error');
});

document.addEventListener('DOMContentLoaded', function () {
    logManager.log("页面加载完成!");
});

const startTime = new Date().getTime();
window.addEventListener('load', function () {
    const endTime = new Date().getTime();
    let loadTime = endTime - startTime;
    logManager.log("页面加载耗时: " + loadTime + "ms");
});

// ==================== 音效系统 (修复版) ====================

// 音效设置 - 使用相对路径
const soundPaths = {
    click: './sounds/click.ogg',
    button: './sounds/button.ogg',
    pop: './sounds/pop.ogg',
    hide: './sounds/hide.ogg',
    open: './sounds/drawer_open.ogg',
    close: './sounds/drawer_close.ogg',
    toast: './sounds/toast.ogg'
};

// 音效播放器对象
const soundPlayers = {};

// 初始化音效播放器
function initSoundPlayers() {
    Object.keys(soundPaths).forEach(type => {
        try {
            soundPlayers[type] = {
                audio: new Audio(soundPaths[type]),
                isPlaying: false,
                isLoaded: false
            };
            
            // 设置预加载
            soundPlayers[type].audio.preload = 'auto';
            
            // 加载音效
            soundPlayers[type].audio.load();
            
            // 监听加载完成
            soundPlayers[type].audio.addEventListener('canplaythrough', function() {
                soundPlayers[type].isLoaded = true;
                logManager.log(`${type}音效加载完成`);
            });
            
            // 监听播放结束
            soundPlayers[type].audio.addEventListener('ended', function() {
                soundPlayers[type].isPlaying = false;
            });
            
            // 监听加载错误
            soundPlayers[type].audio.addEventListener('error', function(e) {
                logManager.log(`${type}音效加载失败: ${e.message}`, 'error');
            });
            
        } catch (error) {
            logManager.log(`初始化${type}音效失败: ${error.message}`, 'error');
        }
    });
    logManager.log("音效播放器初始化完成");
}

// 播放音效
function playSound(type) {
    // 如果音效类型不存在，使用click音效作为默认
    if (!soundPaths[type]) {
        logManager.log(`音效类型 ${type} 未定义，使用click音效代替`, 'warn');
        type = 'click';
    }
    
    // 如果播放器未初始化，立即初始化
    if (!soundPlayers[type]) {
        try {
            soundPlayers[type] = {
                audio: new Audio(soundPaths[type]),
                isPlaying: false,
                isLoaded: false
            };
            soundPlayers[type].audio.preload = 'auto';
            soundPlayers[type].audio.load();
            logManager.log(`${type}音效动态初始化`);
        } catch (error) {
            logManager.log(`动态初始化${type}音效失败: ${error.message}`, 'error');
            return;
        }
    }
    
    const player = soundPlayers[type];
    
    // 如果音效正在播放，重置并重新播放
    if (player.isPlaying) {
        player.audio.currentTime = 0;
    } else {
        player.isPlaying = true;
    }
    
    // 播放音效
    const playPromise = player.audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                logManager.log(`${type}音效播放成功`);
            })
            .catch(error => {
                player.isPlaying = false;
                // 如果不是用户交互导致的错误，记录日志
                if (!error.message.includes('user gesture')) {
                    logManager.log(`${type}音效播放失败: ${error.message}`, 'error');
                }
            });
    }
}

// 简化的按钮音效播放
function playSoundType(button) {
    playSound('click'); // 统一使用click音效
}

// 页面加载时初始化音效系统
document.addEventListener('DOMContentLoaded', initSoundPlayers);

// ==================== 链接跳转系统 (修复版) ====================

// 打开链接函数 - 修复版
function openLink(url, target = '_blank') {
    try {
        logManager.log(`尝试打开链接: ${url}`);
        
        // 播放点击音效
        playSound('click');
        
        // 延迟一小段时间确保音效开始播放
        setTimeout(() => {
            try {
                // 检查URL是否有效
                if (!url || typeof url !== 'string') {
                    logManager.log('链接地址无效', 'error');
                    return;
                }
                
                // 如果是相对路径，转换为完整URL
                let fullUrl = url;
                if (url.startsWith('./') || url.startsWith('../') || url.startsWith('/')) {
                    // 使用当前页面的基础URL
                    const baseUrl = window.location.origin;
                    fullUrl = new URL(url, baseUrl).href;
                } else if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                    // 如果不是标准协议，添加https://
                    fullUrl = 'https://' + url;
                }
                
                // 打开链接
                window.open(fullUrl, target);
                logManager.log(`链接已打开: ${fullUrl}`);
                
            } catch (error) {
                logManager.log(`打开链接失败: ${error.message}`, 'error');
                // 尝试直接设置location作为备选方案
                try {
                    window.location.href = url;
                } catch (fallbackError) {
                    logManager.log(`备选跳转也失败: ${fallbackError.message}`, 'error');
                }
            }
        }, 50); // 50ms延迟确保音效播放
    } catch (error) {
        logManager.log(`openLink函数执行出错: ${error.message}`, 'error');
    }
}

// 延时打开链接
function delayedOpenLink(url, delay = 1500, target = '_blank') {
    playSound('click');
    setTimeout(() => {
        openLink(url, target);
    }, delay);
}

// 直接跳转（在当前窗口打开）
function redirectTo(url) {
    playSound('click');
    setTimeout(() => {
        try {
            window.location.href = url;
            logManager.log(`跳转到: ${url}`);
        } catch (error) {
            logManager.log(`跳转失败: ${error.message}`, 'error');
        }
    }, 50);
}

// 启动应用（用于深度链接）
function launchApplication(deeplink) {
    playSound('click');
    setTimeout(() => {
        try {
            window.location.assign(deeplink);
            logManager.log(`启动应用: ${deeplink}`);
        } catch (error) {
            logManager.log(`启动应用失败: ${error.message}`, 'error');
        }
    }, 50);
}

// ==================== 页面导航功能 ====================

// 点击返回按钮事件
function clickedBack() {
    logManager.log("点击返回");
    playSound('click');
    setTimeout(function () {
        if (window.history.length <= 1) {
            logManager.log("关闭窗口");
            try {
                window.close();
            } catch (error) {
                logManager.log("无法关闭窗口，浏览器可能限制了此操作", 'warn');
            }
        } else {
            logManager.log("返回上一级页面");
            window.history.back();
        }
    }, 600);
}

// 滚动到网页顶部
function scrollToTop() {
    try {
        const mainScrollContainer = document.querySelector('.primary_scroll_container') || 
                                   document.querySelector('.main_scroll_view') ||
                                   document.documentElement;
        
        mainScrollContainer.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
        logManager.log("成功执行回到顶部操作");
    } catch (error) {
        logManager.log(`回到顶部失败: ${error.message}`, 'error');
    }
}

// 跳转到网页顶部（无动画）
function toTop() {
    try {
        const mainScrollContainer = document.querySelector('.primary_scroll_container') || 
                                   document.querySelector('.main_scroll_view') ||
                                   document.documentElement;
        
        mainScrollContainer.scrollTo({
            top: 0, 
            behavior: 'instant'
        });
        logManager.log("立即跳转到顶部");
    } catch (error) {
        logManager.log(`跳转到顶部失败: ${error.message}`, 'error');
    }
}

// ==================== 工具函数 ====================

// 显示提示消息
function showMessage(message, duration = 3000) {
    try {
        const popArea = document.getElementById('pop_area');
        if (popArea) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'pop_message';
            messageDiv.textContent = message;
            popArea.appendChild(messageDiv);
            
            setTimeout(() => {
                if (messageDiv.parentNode === popArea) {
                    popArea.removeChild(messageDiv);
                }
            }, duration);
            
            logManager.log(`显示消息: ${message}`);
        }
    } catch (error) {
        logManager.log(`显示消息失败: ${error.message}`, 'error');
    }
}

// 全局暴露函数
window.openLink = openLink;
window.delayedOpenLink = delayedOpenLink;
window.redirectTo = redirectTo;
window.launchApplication = launchApplication;
window.clickedBack = clickedBack;
window.scrollToTop = scrollToTop;
window.toTop = toTop;
window.showMessage = showMessage;