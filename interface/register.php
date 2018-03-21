<?php

	define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
	global $_model;
	
	$_uniqid = Tool::mysqlString(sha1(uniqid(rand(),true)));
	$_username = Tool::mysqlString($_POST['username']);

	$_sql = "INSERT INTO pm_user (
									pm_username,
									pm_password,
									pm_email,
									pm_sex,
									pm_uniqid,
									pm_last_ip,
									pm_reg_time
								 ) 
				          VALUES (
									'$_username',
									sha1('{$_POST['password']}'),
							        '{$_POST['email']}',
								    '{$_POST['sex']}',
								    '{$_uniqid}',
								    '{$_SERVER['REMOTE_ADDR']}',
									NOW()
								 )";
	
	$_object = $_model::aud($_sql);
	
	echo $_object;
	
	$_sql = "SELECT 
									pm_username,
									pm_uniqid
						 FROM
									pm_user
						WHERE
									pm_username = '{$_username}'
						LIMIT
									1
					";
	
	$_object_uniqid = $_model::one($_sql);
	setcookie('uniqid', $_object_uniqid->pm_uniqid, time() + 1987200);

	
	
?>