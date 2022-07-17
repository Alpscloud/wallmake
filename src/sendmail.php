<?php
$recipient_email    = array('winde100kg@gmail.com'); //recepient
$from_email         = "no-reply@diamands.com.ua"; //from email using site domain.


// if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
// 		die('Sorry Request must be Ajax POST'); //exit script
// }

function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

if($_POST){

		$project_name = filter_var($_POST["project_name"], FILTER_SANITIZE_STRING);
		$subject = filter_var($_POST["form_subject"], FILTER_SANITIZE_STRING);
		$page = filter_var($_POST["page"], FILTER_SANITIZE_STRING);

		$send_email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL); //capture sender name
		$phone_number = filter_var($_POST["tel"], FILTER_SANITIZE_NUMBER_INT);

		$brand = filter_var($_POST["brand"], FILTER_SANITIZE_STRING);
		$weight = filter_var($_POST["weight"], FILTER_SANITIZE_STRING);
		$type = filter_var($_POST["type"], FILTER_SANITIZE_STRING);
		$purity = filter_var($_POST["purity"], FILTER_SANITIZE_STRING);
		$standart = filter_var($_POST["standart"], FILTER_SANITIZE_STRING);

		$description = filter_var($_POST["description"], FILTER_SANITIZE_STRING); //capture message

		$document = (filter_var($_POST["sertificate"], FILTER_SANITIZE_STRING)) ? 'Да' : 'Нет';

		$attachments = $_FILES['fileFF'];
		
		
		$file_count = count($attachments['name']); //count total files attached
		$boundary = md5("sanwebe.com"); 
		
		//construct a message body to be sent to recipient
		$message_body .=  "Сайт: $project_name\n";
		$message_body .=  "Тема письма: $subject\n";
		$message_body .=  "$page\n";

		if ($send_email) {
			$message_body .=  "Email: $send_email\n";
		}

		if ($phone_number) {
			$message_body .=  "Телефон: $phone_number\n";
		}

		if ($brand) {
			$message_body .=  "Бренд: $brand\n";
		}

		if ($weight) {
			$message_body .=  "Вес: $weight\n";
		}

		if ($type) {
			$message_body .=  "Вес: $type\n";
		}

		if ($purity) {
			$message_body .=  "Чистота: $purity\n";
		}

		if ($standart) {
			$message_body .=  "Проба: $standart\n";
		}

		if ($description) {
			$message_body .=  "Описание / Сообщение: $description\n";
		}

		if ($document) {
			$message_body .=  "Документы: $document\n";
		}

		
		if($file_count > 0){ //if attachment exists
				//header
			$headers = "MIME-Version: 1.0\r\n"; 
			$headers .= "From:".$from_email."\r\n"; 
			$headers .= "Reply-To: ".$recipient_email[0]."" . "\r\n";
			$headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 

			//message text
			$body = "--$boundary\r\n";
			$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
			$body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
			$body .= chunk_split(base64_encode($message_body)); 

				//attachments
			for ($x = 0; $x < $file_count; $x++){       
				if(!empty($attachments['name'][$x])){

								if($attachments['error'][$x]>0) //exit script and output error if we encounter any
								{
									$mymsg = array( 
										1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini", 
										2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form", 
										3=>"The uploaded file was only partially uploaded", 
										4=>"No file was uploaded", 
										6=>"Missing a temporary folder" ); 
									print  json_encode( array('type'=>'error',$mymsg[$attachments['error'][$x]]) ); 
									exit;
								}
								
								//get file info
								$file_name = $attachments['name'][$x];
								$file_size = $attachments['size'][$x];
								$file_type = $attachments['type'][$x];
								
								//read file 
								$handle = fopen($attachments['tmp_name'][$x], "r");
								$content = fread($handle, $file_size);
								fclose($handle);
								$encoded_content = chunk_split(base64_encode($content)); //split into smaller chunks (RFC 2045)
								
								$body .= "--$boundary\r\n";
								$body .="Content-Type: $file_type; name=".$file_name."\r\n";
								$body .="Content-Disposition: attachment; filename=".$file_name."\r\n";
								$body .="Content-Transfer-Encoding: base64\r\n";
								$body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n"; 
								$body .= $encoded_content; 
							}
						}

		}else{ 
		//send plain email otherwise
		$headers = "From:".$from_email."\r\n".
		"Reply-To: ".$recipient_email[0]. "\n" .
		"X-Mailer: PHP/" . phpversion();
		$body = $message_body;

		}


		foreach ($recipient_email as $mail) {															// Открываем цикл перебором всех адресов в массиве
			mail($mail, $subject, $body, $headers);     // На каждый адрес отправляем свою копию письма
		}




}