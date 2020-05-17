<?php

$name = $_POST['name'];
$mailFrom = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];


$email_from = 'Website';

$email_body = "Name: $name.\n".
"Email: $email".
"Subject: $subject".
"Message: $message";


$mailto = "kapilpant157@gmail.com";
$headers ="From: ".$mailFrom;
$headers ="Reply=To: $mailFrom";

mail($mailto, $subject, $txt, $headers);

header("Location: index.html");

?>
