<?php

//connect
session_start();
$acc = $_POST['account'];
$pwd = $_POST['password'];


////////////////////////////////////////////////////////////////////////////////
require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");

//////////////////////////////////////////////////////////////////////////////////
$q = mysqli_query($db,"SELECT * FROM member WHERE account='$acc' AND password='$pwd'");

if($q){
    $row = mysqli_fetch_array($q);
    if(empty($row)){
        $arr = array(
            'status' => false,
            'msg' => "" ,
        );
    // }else if ($pwd == $row['password']){
    //     $arr = array(
    //         'status' => true,
    //         'mId' => $row['mId'] ,
    //     );
    //     print_r($arr);
    //     // $_SESSION['id'] = $row['mId'];
    //     // echo $_SESSION['id'];
    //     // setcookie("id",$row['mId']);

    //     // echo "<script> sessionStorage.setItem('id',". "'" . $row['mId'] . "'" . "));</script>";
    //     // header("location:home.html");
        
    } else{
        $arr = array(
            'status' => true,
            'mId' => $row['mId'] ,
        );
        // header("location:LoginAndRegister.html");
    }
}
else{
    $arr = array(
        'status' => false,
        'msg' => $db->error,
    );
    
    // header("location:LoginAndRegister.html");
}
print_r(json_encode($arr));
?>