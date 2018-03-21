<?php 




	class DB {
		
		//获取对象句柄
		static public function getDB() {
			//连接数据库
			$_mysqli = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_NAME);
			if (mysqli_connect_errno()) {
				echo '数据库连接失败 错误信息 '.mysqli_connect_error();
				exit;
			}
			$_mysqli->set_charset('utf8');
			return $_mysqli;
		}
		
		//清理
		static public function unDB(&$_result, &$_db) {
			if (is_object($_result)) {
				$_result->free();
				$_result = null;
			}
			if (is_object($_db)) {
				$_db->close();
				$_db = null;
			}
		}
		
	}


?>