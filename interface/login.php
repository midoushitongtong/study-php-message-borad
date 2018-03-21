<?php

  define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
	global $_model;
	
	$_password = sha1($_POST['password']);
	
	$_sql = "SELECT 
					pm_username,
					pm_password,
					pm_uniqid
		       FROM 
					pm_user 
	          WHERE 
					pm_username = '{$_POST['username']}' 
		        AND 
					pm_password = '{$_password}' 
		      LIMIT
				    1
			";
	
	usleep(666666);
	$_object = $_model::one($_sql);
	setcookie('uniqid', $_object->pm_uniqid, time() + 1987200);
	echo is_object($_object);
	
	
	
?>