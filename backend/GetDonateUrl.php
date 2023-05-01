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
            // $returnData = {
            // 'name'=>'ShaneWarne',
            // 'about'=> 'CricketPLayer'
            // };

        try {

                $insert_query = "SELECT `link` FROM `info` ORDER BY `id` DESC LIMIT 1";
                $insert_stmt = $conn->prepare($insert_query);
                $insert_stmt->execute();
                $returnData = $insert_stmt->fetch();

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    
endif;

echo json_encode($returnData);

?>