<?php




	define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
	global $_model;
	
	!isset($_POST['id']) ? exit() : $_id = $_POST['id'];

	
	$_sql = "DELETE FROM pm_message WHERE pm_id = '{$_id}'";

	echo $_model->aud($_sql);
	


?>