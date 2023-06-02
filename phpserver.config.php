<?php
return [
    'router' => function ($uri) {
        // 如果请求的文件存在，直接返回文件路径
        if (file_exists($uri)) {
            return $uri;
        }

        // 否则，返回 404.html 页面的路径
        return '404.html';
    },
];
