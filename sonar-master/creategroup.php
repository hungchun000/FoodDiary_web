<?php
//createGroup
//同時新增自己到Group

$mId = $_POST['mId'];
$gname = $_POST['groupName'];

// $mId ='fd000010';
// $gname = '海大212';

///connect
require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");

///////////////////////////////////////////////////////////////////////////
$q = mysqli_query($db,"SELECT gName FROM mygroup WHERE gName='$gname'");
if(mysqli_num_rows($q)<1)
{
    //groupId
    $result = mysqli_query($db, "SELECT * FROM mygroup");
    $num_rows = mysqli_num_rows($result)+1;
    $id ="gp";
    for ( $i=0 ; $i<6-strlen($num_rows) ; $i++ ) {
       $id .="0";
    }
    $id.=strval($num_rows);
    
    $ins = "INSERT INTO mygroup (groupId,gName) VALUES ('$id','$gname')";
    $qq = mysqli_query($db,$ins);
    $ins2 = "INSERT INTO joingroup (groupId,mId) VALUES ('$id','$mId')";
    $qqq = mysqli_query($db,$ins2);
    if($qqq)
    {
        $arr = array(
            'status' => true,
            'msg' => "success" ,
            
        );
    }
}else{
    echo "groupName已存在";
    $arr = array(
        'status' => false,
        'msg' => 'groupName 已被創建，請重新命名!' ,
    );

}

print_r(json_encode($arr));
// echo json_encode($arr);
// header("location:LoginAndRegister.html");
?>