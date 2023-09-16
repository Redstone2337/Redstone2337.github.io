<?php
// 一言的API接口
$url = "https://v1.hitokoto.cn/";

// 发送HTTP请求，获取一言内容
$response = file_get_contents($url);

// 解析JSON格式的响应数据
$data = json_decode($response, true);

// 输出一言内容
echo $data['hitokoto'];
?>
