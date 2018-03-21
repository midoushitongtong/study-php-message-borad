<?php 




class Tool {
	
	static public function htmlString($_data) {
		$_string = $_data;
		if (is_array($_data)) {
			foreach ($_data as $_key => $_value) {
				$_string[$_key] = Tool::htmlString($_value);
			}
		} else if (is_object($_data)) {
			foreach ($_data as $_key => $_value) {
				$_string->$_key = Tool::htmlString($_value);
			}
		} else {
			$_string = htmlspecialchars($_data);
		}
		return $_string;
	}
	
	static public function mysqlString($_data) {
		$_db = DB::getDB();
		$_result = mysqli_real_escape_string($_db, $_data);
		DB::unDB($_result, $_db);
		return !GPC ? $_result : $_data;
	}
	
	static public function _title($_data, $_length) {
		$_string = $_data;
		if (mb_strlen($_data, 'utf-8') > $_length) {
			$_string = mb_substr($_data, 0, $_length, 'utf-8').'...';
		}
		return $_string;
	}
	
}



?>