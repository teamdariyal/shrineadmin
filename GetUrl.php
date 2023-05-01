<?php
  
header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
  header("Access-Control-Allow-Methods: POST");
  
  
  
  //header("Access-Control-Allow-Methods: OPTIONS,POST,GET");
  
  header("Content-Type: application/json; charset=UTF-8");
  //header("Content-Type: application/json");
 
  function msg($success,$status,$message,$extra = []){
        return array_merge([
            'success' => $success,
            'status' => $status,
            'message' => $message
        ],$extra);};

		
		$json = file_get_contents('php://input');

		$dataRow = json_decode($json);

     // $boothName = $dataRow->boothName;
      $folderFile = $dataRow->folderFile;
      $file = $dataRow->file;
    
    //     $boothName = "F2Booth";
    //   $folderFile = "Video1";
    //   $file = "mp4";
      
       $baseurl = "https://pixelsmega.com/Shrine/ShaneWarne/Adminpanel/";
       $video_array = glob("assets/".$folderFile."/*.".$file);
       $url = $baseurl.$video_array[0];
       //$data = [ $url];
          
       
       echo json_encode($url);

?>

