<?php

$EmailFrom = $_POST['email'];
$EmailTo = "contacto@redpenboutique.com.mx";
$Subject = "RedPen New Message";
$Name = $_POST['name'];

$Subject = "RedPen New Message";
$Email = $_POST['email']; 
$Message = $_POST['message'] . "\n\n" . 'Regards, ' . $_POST['name'] . '.';

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";

$Body .= "Subject: ";
$Body .= "RedPen New Message";
$Body .= "\n";

$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";

$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";


// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");
if ($success) {
// header("Location: /thanks.html");
 exit;
} else {
 header("Location: /error.html");
 exit;
}