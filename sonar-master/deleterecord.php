<?php
$mId = $_POST['mId'];
$shopname = $_POST['shopName'];
$foodname = $_POST['foodName'];
$date = $_POST['mealDate'];

// $mId = 'fd000002';
// $shopname = '珍煮丹';
// $foodname = '黑糖珍珠鮮奶';
// $date = '20220107';


require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");
/////////////////////

//!!!!
// $q = mysqli_query($db,"DELETE FROM food WHERE mid='$mId' AND  shopName='$shopname' AND  foodName='$foodname' ");
////還需要Date
$q = mysqli_query($db,"DELETE FROM record WHERE mid='$mId' AND  shopName='$shopname' AND  foodName='$foodname' AND mealDate='$date' ");
if($q){
    
        $arr = array(
            'status' => true,
            'msg' => "Delete Successed" ,
        );       
    } 
else{
    echo $db->error;
    $arr = array(
        'status' => false,
        'msg' => $db->error,
        // 'msg' =>"Delete Failed!",
    );
}
// print($arr);
print_r(json_encode($arr));
?>