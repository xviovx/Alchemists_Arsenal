<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = 'pharoahkyle@gmail.com';
$subject = 'New message from the app help form';
$body = "Name: $name\nEmail: $email\nMessage:\n$message";

if (mail($to, $subject, $body)) {
  http_response_code(200);
} else {
  http_response_code(500);
}

?>
