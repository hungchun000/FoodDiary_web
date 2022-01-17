<?php
    //default value
    $mId = $_POST['mId'];
    // $mId ='fd000001';

    //conn
    require_once 'server.php';

    $db = mysqli_connect($serverName, $userName, $password, $databaseName);
    if (mysqli_connect_errno()) {
    printf("Connect failed:") . mysqli_connect_error();
    exit();
    }
    mysqli_set_charset($db, "utf8");
    //conn end

    // $q = mysqli_query($db,"SELECT * FROM member WHERE member.mId='$mId'");

    ////
    // $q2 = mysqli_query($db,"SELECT groupId,gName,member.mId,account,nickName,gender,age,weight,GROUP_CONCAT(goal.target SEPARATOR ',')AS target FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member LEFT OUTER JOIN goal ON member.mId=goal.mId WHERE gName='$gname' GROUP BY member.mId");   //success get groupmemberData

    $q = mysqli_query($db,"SELECT account,nickName,gender,age,weight,GROUP_CONCAT(goal.target SEPARATOR '&')AS target,password FROM member LEFT OUTER JOIN goal ON member.mId=goal.mId WHERE member.mId='$mId'");
    ///

    if($q){
        $row = mysqli_fetch_array($q);
        // $record=array("account"=>$row[1],"password"=>"********","nickName"=>$row[3],"gender"=>$row[4],"age"=>$row[5],"weight"=>$row[6]);
        // $record=array("account"=>$row[1],"password"=>"********","nickName"=>$row[3],"gender"=>$row[4],"age"=>$row[5],"weight"=>$row[6]);
        
        // print_r($record);

        $arr = array(
            'status' => true,
            'msg' =>"Success",
            // 'data' => $record,
            "account"=>$row[0],"password"=>"$row[6]","name"=>$row[1],"gender"=>$row[2],"age"=>$row[3],"weight"=>$row[4],"goal"=>$row[5],
        );
    }else{
        // echo "failed!";
        $arr = array(
            'status' => false,
            'msg' =>"Failed.",
        );
    }     
    // print_r(($arr));

    print_r(json_encode($arr));

?>