<?php

	define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
	global $_model;
	
	$_sql = "SELECT 
									pm_username 
						 FROM 
									pm_user 
						WHERE 
									pm_username = '{$_POST['username']}' 
						LIMIT 
									1";
	
	echo is_object($_model::one($_sql));
	
	
	
?>