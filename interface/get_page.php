<?php




  define('IN_TG', true);
  define('SCRIPT', 'index');
  require substr(dirname(__FILE__), 0, -9).'/init.inc.php';
  
  Page::_page("SELECT pm_id FROM pm_message", $_POST['pagesize']);
  
  echo Page::_paging(1);
  
  
  
?>