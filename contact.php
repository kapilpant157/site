<?php
if(isset($_POST['submit'])){
$name = $_POST['name'];
$mailFrom = $_POST['mail'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$mailTo = "kapilpant157@gmail.com";
$headers ="From: ".$mailFrom;
$txt = "You have a message from ".$name;".\n\n".$message;
 
mail($mailTo, $subject, $txt, $headers);
header("Location: index.htmlmailsent");
} 
?>
