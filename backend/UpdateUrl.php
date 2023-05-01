<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
 include_once './classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS


// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $link = trim($data->link);


        try{

                $insert_query = "UPDATE info 
SET link = :link
ORDER BY id DESC
LIMIT 1";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':link', $link,PDO::PARAM_STR);
                // $insert_stmt->bindValue(':about', $about,PDO::PARAM_STR);
                $insert_stmt->execute();
        
        		if( $insert_stmt->execute()){
                  $returnData = msg(1,201,'Link Updated',["link"=>$link] );
                }
        else{
         $returnData = msg(1,201,'Update Link Faild!',["link"=>$link]);
        
        }
              

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    
endif;

echo json_encode($returnData);
?>