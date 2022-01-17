<?php
    $serverName = "127.0.0.1";
    $userName = "root";
    $password = "";
    $databaseName = "fooddiary";

    $db = mysqli_connect($serverName, $userName, $password, $databaseName);
    if (mysqli_connect_errno()) {
    printf("Connect failed:") . mysqli_connect_error();
    exit();
    }
    mysqli_set_charset($db, "utf8"); //設定編碼
    // mysqli_select_db($db, "test");//連線狀態中更換資料庫
    // $mid = "11112111";
    // $one = "21";
    // $two = "2";
    // $thr = "3";
    // $four = '"m"';
    // $age = "3";
    // $weight = "10";

    //update
    // $del = "UPDATE member SET age=23,weight=56.8 WHERE mid='fd000001' ";
    // $qqq = mysqli_query($db,$del);
    // if($qqq){
    //     echo "oh";
    // }
    // else echo $db->error;

    // $del = "UPDATE member SET age=200 WHERE mid=11112111";
    // $qqq = mysqli_query($db,$del);
    // if($qqq){
    //     echo "oh";
    // }
    // else echo $db->error;

    //delete
    // $del = "DELETE FROM member WHERE mid=11112111";
    // $qqq = mysqli_query($db,$del);
    // if($qqq){
    //     echo "oh";
    // }
    // else echo $db->error;


    $mId ='fd000001' ;
    $shopname ='可不可' ;
    $foodname ='珍珠鮮奶茶' ;
    $mealtime ='n' ;
    $foodcount ='2';
    $foodcal ='600' ;
    $foodcost ='110';
    $foodpoint ='4' ;
    $foodimg ='' ;
    $mealdate = '20220116' ;
    $foodnote ='好喝' ;
    //insert
    // $ins = "INSERT INTO member (mId,account,password,nickName,gender) VALUES ($mid,$one,$two,$thr,$four)";
    // $qq = mysqli_query($db,$ins);
    // if($qq){
    //     echo "no";
    // }
    // else echo $db->error;
    ////////try myself
    // $ins = "INSERT INTO food (mId,shopName,foodName,foodCal,foodCost,foodPoint,foodImg,foodNote) VALUES ('$mId','$shopname','$foodname','$foodcal','$foodcost','$foodpoint','$foodimg','$foodnote')";
    // $qq = mysqli_query($db,$ins);

    // $ins2 = "INSERT INTO record (mId,shopName,foodName,mealDate,foodCount,mealTime) VALUES ('$mId','$shopname','$foodname','$mealdate','$foodcount','$mealtime')";
    // $qqq = mysqli_query($db,$ins2);
    // if($qq){
    //     echo "ohhh";
    // }
    // else echo $db->error;

    //select
    // // Sql = "SELECT * FROM 資料表1 INNER JOIN 資料表2 ON 資料表1.class = 資料表2.class"
    // // $q = mysqli_query($db,"SELECT * FROM food JOIN record ON food.mId=record.mId WHERE food.mId='fd000001'");
    // // $q = mysqli_query($db,"SELECT * FROM food JOIN record ON food.mId=record.mId AND food.foodName=record.foodName AND food.shopName=record.shopName WHERE food.mId='fd000001'");
    // $q = mysqli_query($db,"SELECT * FROM food NATURAL JOIN record  WHERE food.mId='fd000001'");
    // // echo $q;
    // //var_dump($q);       //無論何種型態都印出來
    // if($q){
    //     echo "yes";
    //     // $row = mysqli_fetch_array($q);
    //     //Join
    //     //Array ( [0] => fd000001 [mId] => fd000001 [1] => 珍珠鮮奶 [foodName] => 珍珠鮮奶 [2] => 天好茶 [shopName] => 天好茶 [3] => 500 [foodCal] => 500 [4] => 55 [foodCost] => 55 [5] => 3 [foodPoint] => 3 [6] => [foodImg] => [7] => Nope [foodNote] => Nope [8] => fd000001 [9] => 珍珠鮮奶 [10] => 天好茶 [11] => 2022-01-13 [mealDate] => 2022-01-13 [12] => 1 [foodCount] => 1 [13] => 0 [mealTime] => 0 ) 
    //     //NATURAL JOIN
    //     //Array ( [0] => fd000001 [mId] => fd000001 [1] => 珍珠鮮奶 [foodName] => 珍珠鮮奶 [2] => 天好茶 [shopName] => 天好茶 [3] => 500 [foodCal] => 500 [4] => 55 [foodCost] => 55 [5] => 3 [foodPoint] => 3 [6] => [foodImg] => [7] => Nope [foodNote] => Nope [8] => 2022-01-13 [mealDate] => 2022-01-13 [9] => 1 [foodCount] => 1 [10] => 0 [mealTime] => 0 ) 

    //     $arr=array();
    //     for($i=0;$i<$q->num_rows;$i++){
    //         $row = mysqli_fetch_array($q);
    //         // print_r($row);
    //         $log=array("mId"=>"$row[0]","foodName"=>"$row[1]","shopName"=>"$row[2]","foodCal"=>"$row[3]","foodCost"=>"$row[4]","foodPoint"=>"$row[5]","foodImg"=>"$row[6]","foodNote"=>"$row[7]","mealDate"=>"$row[8]","foodCount"=>"$row[9]","mealTime"=>"$row[10]");
    //         $arr[$i]=$log;
    //     }
    //     print_r($arr);
    //     // echo $row['foodName'];
    // }
    // else echo "no";
    // //end Select




    $db->close();
//mysqli_close()//斷掉連接
?>