<?php
// 开始会话
session_start();

// 检查用户是否已登录
if (isset($_SESSION['username'])) {
    // 如果用户已登录，则返回用户名
    echo $_SESSION['username'];
} else {
    // 如果用户未登录，则返回空字符串
    echo '';
}
