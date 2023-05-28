<?php
// Start a session (if one has not already been started)
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// 确定随机种子
$seed = floor(time() / 2); // 以2秒为单位

// 使用相同的随机种子生成验证码和干扰线
mt_srand($seed);

$code = rand(1000, 9999);
// 存储验证码到session中
$_SESSION['captcha'] = $code;

// 创建图片并在上面添加验证码
$image = imagecreate(70, 30);
if (!$image) {
    header('HTTP/1.1 500 Internal Server Error');
    exit;
}
$bg_color = imagecolorallocate($image, 255, 255, 255);
$font_color = imagecolorallocate($image, 0, 0, 0);
imagestring($image, 5, 10, 5, $code, $font_color);

// 禁用缓存
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// 输出图片
header('Content-Type: image/png');
imagepng($image);

// 释放内存
imagedestroy($image);
