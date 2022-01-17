<?php
$mId = $_POST['mId'];
$loadtimes = $_POST['loadTimes'];
// $mId = 'fd000002';
// $loadtimes = '1';

require_once 'server.php';

$db = mysqli_connect($serverName, $userName, $password, $databaseName);
if (mysqli_connect_errno()) {
printf("Connect failed:") . mysqli_connect_error();
exit();
}
mysqli_set_charset($db, "utf8");

$q = mysqli_query($db,"SELECT * FROM food NATURAL JOIN record  WHERE food.mId='$mId'");

$loadtimes = intval($loadtimes);


if($q){
    $times = $q->num_rows;
    if($times <= 0 ){
        // echo "Can't show post.";

        $arr = array(
            'status' => false,
            'msg' => "Can't show post." ,
        );       
    } else{
        if( $times <= ($loadtimes-1)*8 ){
            // echo "沒有此頁";
            $arr = array(
                'status' => false,
                'msg' => "沒有此頁." ,
            );
        }else{
            $record_arr = array();
            for( $i = 0 ; $i<$times ; $i++ ){
                $row = mysqli_fetch_array($q);
                if($i < ($loadtimes-1)*8){
                    continue;
                }else if($i >= $loadtimes*8){
                    break;
                }else{
                    $record=array("foodName"=>$row[1],"shopName"=>$row[2],"mealTime"=>$row[10],"foodCount"=>$row[9], "foodCost"=>$row[4],"foodCal"=>$row[3], "foodPoint"=>$row[5], "foodNote"=>$row[7], "foodImg"=>$row[6], "mealDate"=>$row[8]);
                    array_push($record_arr, $record);
                }
            }

            // echo "Successfully";
            $arr = array(
                'status' => true,
                'msg' =>"Successfully show home page.",
                'recordPost' => $record_arr,
            );
            // echo json_encode($arr);
        }
    }
}
else{
    $arr = array(
        'status' => false,
        'msg' => $db->error,
    );
}
// echo json_encode($arr);
// print_r($arr);
print_r(json_encode($arr));
?>