<?php 




//模型基类
class Model {
	
	//查找单个模型
	static public function one($_sql) {
		$_db = DB::getDB();
		$_result = $_db->query($_sql);
		$_object = $_result->fetch_object();
		DB::unDB($_result, $_db);
		return $_object;
	}

	//查找多个模型
	static public function all($_sql) {
	$_db = DB::getDB();
	$_result = $_db->query($_sql);
		$_html = array();
	while ($_objects = $_result->fetch_object()) {
			$_objects->pm_content = nl2br($_objects->pm_content);
			$_objects->pm_content = Tool::_title($_objects->pm_content, 666);
			if (substr_count($_objects->pm_content, 'br') >= 6) {
				$_objects->pm_content = str_replace('<br', '', $_objects->pm_content);
				$_objects->pm_content = str_replace('/>', '', $_objects->pm_content);
			}
	  $_html[] = $_objects;
	}
  DB::unDB($_result, $_db);
	  return json_encode(Tool::htmlString($_html));
	}
	
	//增删修模型
	static public function aud($_sql) {
		$_db = DB::getDB();
		$_result = $_db->query($_sql);
		$_affected_rows = $_db->affected_rows;
		DB::unDB($_result, $_db);
		return $_affected_rows;
	}
	
}



?>