<?php

$groupname = $_POST['groupName'];

// echo $groupId
// $groupId = 'gp000001';

// $mId = $_POST['mId'];
// $mId ='fd000012';


///conn
require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");
////////////////////////////////////////////////////////
///conn end

//搜尋群組名稱是否存在
$q = mysqli_query($db,"SELECT gName FROM mygroup WHERE gName='$groupname'");
if(mysqli_num_rows($q) == 1){
    

    //get groupName
    $row = mysqli_fetch_array($q);
    $gn = $row['gName'];
    // print_r($gn);
    

    //group exists//////
    $arr = array(
        'status' => true,
        'groupName' => $gn,
        'msg' => 'group exists' ,
    );
    

}else{
    //group does not exist
    // echo "group does not exist!";
    $arr = array(
        'status' => false,
        'msg' => "group does not exist!" ,
    );  

}

print_r(json_encode($arr));
// echo json_encode($arr);
// header("location:LoginAndRegister.html");
?>