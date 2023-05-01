<?php


$filename = $_FILES["file_to_upload"]["name"];
$filetemplocation = $_FILES["file_to_upload"]["tmp_name"]; 
$url  = 'assets/photo/';

$files = glob($url.'/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file)) {
    unlink($file); // delete file
  }
}
 
if (!$filetemplocation) { 
    echo "ERROR: No file has been selected";
    exit();
}
 
if(move_uploaded_file($filetemplocation, "$url/$filename")){
    echo "$filename upload is complete";
} else {
    echo "A server was unable to move the file $filename";
}

?>
