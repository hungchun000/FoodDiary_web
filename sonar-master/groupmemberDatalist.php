<?php


    // $mId = $_POST['mId'];
     $gname = $_POST['groupName'];

    // $mId = 'fd000001';
    
    // $gname = '海大203';
    // $gname = '幸福一家人';

    //conn
    require_once 'server.php';

    $db = mysqli_connect($serverName, $userName, $password, $databaseName);
    if (mysqli_connect_errno()) {
    printf("Connect failed:") . mysqli_connect_error();
    exit();
    }
    mysqli_set_charset($db, "utf8");
    //conn end
    //////////////////////////////////////////
    //Countgroupmember
    $q5 = mysqli_query($db,"SELECT COUNT(mId) FROM joingroup NATURAL JOIN mygroup WHERE mygroup.gName='$gname' GROUP BY mygroup.groupId");
    $row3 = mysqli_fetch_array($q5);
    // print_r($row3);
    // echo $row3[0];
    $countmem = $row3[0];
    // echo $countmem;
    //




    //natural join on 
    // $q = mysqli_query($db,"SELECT groupId,account,nickName,gender,age,weight,userName FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member NATURAL JOIN goal WHERE mygroup.gName='$gname' AND joingroup.mId=member.mId AND member.mId=goal.mId AND  mygroup.groupId= joingroup.groupId  ");

    // $q = mysqli_query($db,"SELECT groupId,gName FROM mygroup NATURAL JOIN joingroup WHERE gName='$gname' ");         //success get groupId
    // $q = mysqli_query($db,"SELECT groupId,gName,mId FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member  WHERE gName='$gname' "); //success get groupId
    // $q = mysqli_query($db,"SELECT groupId,gName,mId,account,nickName,gender,age,weight,userName FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member  WHERE gName='$gname' ");   //success get groupmemberData(3)
    // $q = mysqli_query($db,"SELECT groupId,gName,mId,account,nickName,gender,age,weight,userName,number,target FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member NATURAL JOIN goal WHERE gName='$gname' AND (EXISTS) ");   //success get groupmemberData
    $q2 = mysqli_query($db,"SELECT groupId,gName,member.mId,account,nickName,gender,age,weight,GROUP_CONCAT(goal.target SEPARATOR ',')AS target FROM mygroup NATURAL JOIN joingroup NATURAL JOIN member LEFT OUTER JOIN goal ON member.mId=goal.mId WHERE gName='$gname' GROUP BY member.mId");   //success get groupmemberData
    // $q2 = mysqli_query($db,"SELECT mId, GROUP_CONCAT(target SEPARATOR ',')AS target FROM goal GROUP BY mId  ");         //success get groupId



    // //get groupId
    // $row = mysqli_fetch_array($q);
    // $gIdd = $row['groupId'];
    // var_dump($gIdd);
    // print_r($gIdd);

    if($q2){

        $times = $q2->num_rows;
        ///targetArray
        


        // $target_arr = array();

        // for( $j = 0 ; $j<5 ; $j++ ){
        //     $row2 = mysqli_fetch_array($q);
        //     if(empty($row2['target'])
        //     {
        //         $record2=array("target"=>"");
        //     }
        //     $record2=array("gName"=>$row2[10]);
        //     array_push($target_arr, $record2);
        //     print_r($row2);
        // }

        /////
        $record_arr = array();

        for( $i = 0 ; $i<$times ; $i++ ){
            $row = mysqli_fetch_array($q2);
            
            // $record=array("mId"=>$row[2],"account"=>$row[3],"nickName"=>$row[4],"gender"=>$row[5],"age"=>$row[6],"weight"=>$row[7],"target"=>$row[8],);
            $record=array("account"=>$row[3],"nickname"=>$row[4]);
            array_push($record_arr, $record);
            // print_r($row);
        }
        // print_r($record_arr);

        $arr = array(
            'status' => true,
            'msg' =>"Successfully show group list.",
            'memberData' => $record_arr,
            'memberCount'  => $countmem,
        );
    }else{
        echo "Failed!";
        echo $db->error;
        $arr = array(
            'status' => false,
            'msg' =>"Failed.",
        );
    }     

    print_r(json_encode($arr));
    //如 {"mId":"fd000002","account":"98981111","nickName":"fd000002","gender":"M","age":"33","weight":"45.00","target":"\u559d\u6c343000 cc,\u559d\u6c342000 cc"},
?>
