<?php 
	
	header("Content-type=text/html;charset=utf8");

	$link = mysql_connect("localhost", "root", "123456");
	if(!$link){
		echo "数据库连接失败";
		mysql_close($link);
		exit();
	}

	mysql_set_charset("utf8");

	mysql_select_db("tmall");

	$type = $_GET["type"];
	
	if($type == "isHasUser"){
		$userName = $_POST["username"];
		$sql = "select * from users where userName = '{$userName}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo "y";
		}else{
			echo "n";
		}
	}else if($type == "register"){
		$userName = $_POST["username"];
		$password = $_POST["password"];
		$vipName = $_POST["vipName"];
		if($vipName){
			$sql = "insert into users(userName, password, vipName) value ('{$userName}', '{$password}', '{$vipName}')";
			$res = mysql_query($sql);

			if($res){
				echo "y";
			}else{
				echo "n";
			}
		}
	}else if("login"){
		$userName = $_POST["username"];
		$password = $_POST["password"];
		$sql = "select password from users where userName = '$userName'";

		$res = mysql_query($sql);

		$row = mysql_fetch_assoc($res);
		if($row["password"] == $password){
			echo "y";
		}else{
			echo "n";
		}
	}
 ?>