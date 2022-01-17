<?php

try{
$acc = $_POST['account'];
$pwd = $_POST['password'];

require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");

$result = mysqli_query($db, "SELECT * FROM member");
$num_rows = mysqli_num_rows($result)+1;
$id ="fd";
for ( $i=0 ; $i<6-strlen($num_rows) ; $i++ ) {
    $id .="0";
}
$id.=strval($num_rows);

$ins = "INSERT INTO member (mId,account,password,nickName) VALUES ('$id','$acc','$pwd','$acc')";


$qq = mysqli_query($db,$ins);
if(!$qq){
    $arr = array(
        'status' => false,
        'msg' => $db->error,
    );
    // echo $db->error;
}else{
    $arr = array(
        'status' => true,
        'mId' => $id ,
    );
}
$db->close();
}catch(Exception $e){
    print_r($e->getMessage());
}

print_r(json_encode($arr));
// echo json_encode($arr);
// header("location:LoginAndRegister.html");
?>