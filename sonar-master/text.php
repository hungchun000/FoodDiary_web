<?php
include_once "db_conn.php";
$goal="a";
$joingroup="b";
$member="c";
$mygroup="d";
$query = ("insert into fooddiary values(?,?,?,?)");
    $stmt = $db->prepare($query);
    $result = $stmt->execute( array($goal,$joingroup,$member,$mygroup ));
?>