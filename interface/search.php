<?php




	define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
	global $_model;

	$_value = Tool::mysqlString($_POST['search']);
	if ($_value == '') {
		echo 0;
		exit;
	}

	$_sql = "SELECT 
									pm_id, 
									pm_title, 
									pm_content, 
									pm_post_user, 
									pm_post_time 
						 FROM 
									pm_message 
						WHERE 
									pm_title 
						 			LIKE '%$_value%' 
							 OR 
									pm_content 
									LIKE '%$_value%'
					";
  
  echo $_model::all($_sql);
   
  
  
?>