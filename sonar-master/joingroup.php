<?php

$mId = $_POST['mId'];
$gname = $_POST['groupName'];
// $mId ='fd000012';
// $gname = '海大203';

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
$q = mysqli_query($db,"SELECT groupId FROM mygroup WHERE gName='$gname'");
if(mysqli_num_rows($q) == 1){
    //group exists//////
    $arr = array(
        'status' => true,
        'msg' => 'group exists' ,
    );

    //get groupId
    $row = mysqli_fetch_array($q);
    $gIdd = $row['groupId'];
    // print_r($gIdd);
    
    //check member
    $qq = mysqli_query($db,"SELECT * FROM joingroup WHERE groupId='$gIdd' AND mId='$mId' ");
    if(mysqli_num_rows($qq)<1){
        
        $qqq = mysqli_query($db,"INSERT INTO joingroup (groupId,mId) VALUES ('$gIdd','$mId')"); //joinGroup
        if($qqq){
            //join success
            // echo "join success!";
            $arr = array(
                'status' => true,
                'msg' => "join success!" ,
            ); 
        }else{
            //join failed
            // echo "join failed!";
            $arr = array(
                'status' => false,
                'msg' => "join failed!" ,
            ); 
        }

     }else{
        //member already in the group
        // echo "member already in the group";
        ///msg info
        $arr = array(
            'status' => false,
            'msg' => 'member already exists' ,
        );
    }

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