<?php

$name = $_POST['name'];
$mailFrom = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$email_from = 'Website';
$email_body = "Name: $name.\n".
"Email: $$email".
"Subject: $subject".
"Message: $message";
$txt = "You have a message from ".$name;".\n\n".$message;
$mailTo = "kapilpant157@gmail.com";
$headers ="From: ".$mailFrom;
mail($mailTo, $subject, $txt, $headers);

header("Location: index.htmlmailsent");

?>
