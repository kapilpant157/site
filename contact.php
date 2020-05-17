<?php

$name = $_POST['$name'];
$email = $_POST['$email'];
$subject = $_POST['$subject'];
$message = $_POST['$message'];

if (empty($name) || empty($email) || empty($subject) ||empty($message)) {
	echo "Pleage fill data in the fields";

}
else{
	mail("Kapilpant157@gmail.com", "Message form website", $message , "From: $name < $email>");
	echo "<script type= 'text/javascript'> alert('your message is sent ');
	window.history.log(-1);
	</script>";
}


?>
