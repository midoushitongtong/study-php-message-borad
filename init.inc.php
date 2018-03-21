<?php
	
	
	
	
	if(!defined('IN_TG')){
		exit('Access Defined!');
	}
  define('ROOT_PATH', dirname(__FILE__));
  require ROOT_PATH.'/config/profile.php';

  function __autoload($_className) {
		if (substr($_className, -5) == 'Model') {
			require ROOT_PATH.'/model/'.$_className.'.class.php';
		} else {
			require ROOT_PATH.'/includes/'.$_className.'.class.php';
		}
	}
  
  
	
  $_model = new Model();
  
  
  
?>