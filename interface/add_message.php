<?php




  define('IN_TG', true);
	require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
  global $_model;
  
  $_sql = "SELECT 
                  pm_username,
                  pm_uniqid 
             FROM 
                  pm_user 
            WHERE 
                  pm_username = '{$_COOKIE['username']}'
          ";
  
  $_userobject = $_model->one($_sql);
  //验证唯一身份
  if ($_userobject->pm_uniqid != $_COOKIE['uniqid']) {
  	echo 0;
  	exit;
  }
  
  $_html = array();
  $_html['title'] = Tool::mysqlString($_POST['title']);
  $_html['content'] = Tool::mysqlString($_POST['content']);
  $_html['username'] = $_COOKIE['username'];
   
  $_sql = "INSERT INTO pm_message (
                                    pm_title,
                                    pm_content,
                                    pm_post_user,
                                    pm_post_time
                                  )
                           VALUES (
                                    '{$_html['title']}',
                                    '{$_html['content']}',
                                    '{$_html['username']}',
                                    NOW()
                                  )
           ";
  
  echo $_model::aud($_sql);



?>