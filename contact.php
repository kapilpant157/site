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


$to = "kapilpant157@gmail.com";
$headers ="From: ".$mailFrom;
$headers ="Reply=To: $mailFrom";

mail($too, $subject, $txt, $headers);

header("Location: index.htmlmailsent");

?>
