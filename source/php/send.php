<?php

$sendto   = "kostikovmu@ya.ru"; // почта, на которую будет приходить письмо
$usertext = $_POST['text'];   // сохраняем в переменную данные полученные из поля c именем
$usercontact = $_POST['contact']; // сохраняем в переменную данные полученные из поля c адресом электронной почты

// Формирование заголовка письма
$subject  = "Cообщение с сайта";
$headers  = "From: \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта</h2>\r\n";
$msg .= "<p><strong>С сайта:</strong> kostikovmu.ru</p>\r\n";
$msg .= "<p><strong>Контакт:</strong> ".$usercontact."</p>\r\n";
$msg .= "<p><strong>Сообщение:</strong> ".$usertext."</p>\r\n";

$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
    echo 1;
} else {
    echo 0;
}

?>