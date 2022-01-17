<?php

    $mId = $_POST['mId'];
    // $mId ='fd000010';

    //conn
    require_once 'server.php';

    $db = mysqli_connect($serverName, $userName, $password, $databaseName);
    if (mysqli_connect_errno()) {
    printf("Connect failed:") . mysqli_connect_error();
    exit();
    }
    mysqli_set_charset($db, "utf8");
    //conn end

    $q = mysqli_query($db,"SELECT * FROM mygroup NATURAL JOIN joingroup  WHERE mygroup.groupId= joingroup.groupId AND joingroup.mId='$mId'");
    if($q){

        $times = $q->num_rows;
        
        $record_arr = array();
        for( $i = 0 ; $i<$times ; $i++ ){
            $row = mysqli_fetch_array($q);
            $record=$row[1];
            array_push($record_arr, $record);
        }
        // print_r($record_arr);

        $arr = array(
            'status' => true,
            'msg' =>"Successfully show group list.",
            'grouplist' => $record_arr,
        );
    }else{
        echo "No Group!";
        $arr = array(
            'status' => false,
            'msg' =>"Failed.",
        );
    }     

    print_r(json_encode($arr));
?>

