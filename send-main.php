<?php
var_dump($_POST);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {
  require __DIR__ . '/vendor/autoload.php';

  function sendMail($to, $body, $nameFile, $pathFile) {
    $mail = new \PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = "esdipochta@gmail.com";
    $mail->Password = "1987kira1954";
    $mail->SMTPSecure = 'ssl';
    $mail->Port = '465';

    $mail->setFrom('esdipochta@gmail.com', 'INTEGRO Technologies');
    $mail->addAddress($to);
    //$mail->AddBCC($toCopy);
    $mail->addAttachment($pathFile, $nameFile);
    $mail->Subject = 'Заявка с сайта INTEGROTECH';
    $mail->Body = $body;
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    return $mail->send();
  }

  /*$secret = '6Ld4qpIUAAAAAPUli3H51jHF5aLAvcqP6Mf-LFNa';
  $response = $_POST['g-recaptcha-response'];
  $url = 'https://www.google.com/recaptcha/api/siteverify';

  $data = [
    'secret' => $secret,
    'response' => $response
  ];

  $options = [
    'http' => [
      'method' => 'POST',
      'content' => http_build_query($data)
    ]
  ];

  $context = stream_context_create($options);
  $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
  $captchaSuccess = json_decode($verify);*/

  $name = trim($_POST['name']);
  $phone = trim($_POST['phone']);
  $email = trim($_POST['email']);
  //$subject = trim($_POST['subject']);
  $comment = trim($_POST['comment']);


  $body = '<table style="border: 1px solid #ddd; background: #f9f9f9; border-collapse: collapse; width: 100%;">
  <thead>
 
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Имя или компания</td>
      <td style="padding: 8px; border: 1px solid #ddd;">' . $name .  '</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Email</td>
      <td style="padding: 8px; border: 1px solid #ddd;">' . $email .  '</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Телефон</td>
      <td style="padding: 8px; border: 1px solid #ddd;">' . $phone .  '</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">Комментарий</td>
      <td style="padding: 8px; border: 1px solid #ddd;">'. nl2br($comment) . '</td>
    </tr>
  </tbody>
</table>';
  $body .= "<p style='font-size: 10px; color: #666;'>";
  $body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "<br>";
  $body .= $_SERVER['HTTP_USER_AGENT'] . "<br>";
  $body .= $_SERVER['HTTP_REFERER'];
  $body .= "</p>";

  //$file = "attachment/" . basename($_FILES['attachment']['name']);

  // перемещаем загруженный файл в новое место
  //move_uploaded_file($_FILES['attachment']['tmp_name'], $file);

  // если сообщение отправлено
  if (sendMail('sergey_bobkov@inbox.ru', $body, $_FILES['attachment']['name'], $_FILES['attachment']['tmp_name'])) {
    echo $message = '<div class="alert alert-success">Сообщение успешно отправлено</div>';
    // удаляем файл

  } else {
    echo $message = '<div class="alert alert-danger">Что то пошло не так</div>';
  }

  /*if ($captchaSuccess->success == false) {
    echo 'false';
  } else if ($captchaSuccess->success == true) {

  }*/

}



