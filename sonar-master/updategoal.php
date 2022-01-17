<?php

$mId = $_POST['mId'];
$goalarr = $_POST['goal'];

//  $mId ='fd000003' ;
//  $goalarr = ['星期一','星期4','星期三','星期四','星期五'];

//////////////////////////////////////////
require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");
///////////////////////////////////////////

// print_r($goalarr[0]);
$len = count($goalarr);

$i=0;
for( $i=0 ; $i<$len ; $i++ )
{
    $k=$i+1;
    $q = mysqli_query($db, "SELECT * FROM goal WHERE mId='$mId' AND number='$k' ");
    if(mysqli_num_rows($q)==1)
    {
        //update
        $qu = mysqli_query($db,"UPDATE goal SET target='$goalarr[$i]' WHERE mid='$mId' AND number='$k' ");
        // print_r($goalarr[$i]);
        if($qu)
        {
            // echo "update success!";
            // echo $i;
            $arr = array(
           'status' => true,
            );
       
        }else{
            // echo "failed";
            // echo $i;
            // echo $db->error;
            $arr = array(
                'status' => false,
                'msg' => $db->error,
            );
        }

    }else{
        //insert
        // $ins = "INSERT INTO goal (mId,number,target) VALUES ('$mId','$k','$goalarr[i]')";
        $qi = mysqli_query($db,"INSERT INTO goal (mId,number,target) VALUES ('$mId','$k','$goalarr[$i]') ");
        if($qi)
        {
            // echo "insert success!";
            // echo $i;
            $arr = array(
           'status' => true,
            );
       
        }else{
            // echo "failed";
            // echo $i;
            // echo $db->error;
            $arr = array(
                'status' => false,
                'msg' => $db->error,
            );
        }

    }
}

// print($arr);
print_r(json_encode($arr));

?>