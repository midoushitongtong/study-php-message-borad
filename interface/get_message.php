<?php




  define('IN_TG', true);
  require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
  global $_model;
  
  $_pagenum = $_POST['pagenum'];
  $_pagesize = $_POST['pagesize'];
  $_sql = "SELECT 
                  pm_id,
								  pm_title,
								  pm_content,
								  pm_post_user,
								  pm_post_time 
						 FROM 
								  pm_message 
				 ORDER BY 
								  pm_post_time 
						 			DESC 
						LIMIT 
									$_pagenum, $_pagesize
  				";
  echo $_model::all($_sql);
	
	
	
?>