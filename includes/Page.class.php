<?php 




class Page {
	
	static public function _page($_sql, $_size){
		global $_page, $_pagesize, $_pagenum, $_pageabsolute;
		if (isset($_GET['page'])) {
			$_page = @$_GET['page'];
			if(empty($_page) || $_page <= 0 || !is_numeric($_page)){
				$_page = 1;
			}
		} else {
			$_page = 1;
		}
		$_pagesize = $_size;
		$_pagenum = ($_page - 1) * $_pagesize;
		$_db = DB::getDB();
		$_result = $_num = $_db->query($_sql)->num_rows;
		DB::unDB($_result, $_db);
		//数据库为0条数据的情况下默认第一页
		if ($_num == 0) {
			$_pageabsolute = 1;
		} else {
			$_pageabsolute = ceil($_num / $_pagesize);
		}
		if ($_page > $_pageabsolute) {
			$_page = $_pageabsolute;
		}
	}
	
	static public function _paging($_type) {
		global $_page, $_pageabsolute, $_num, $_id;
		if ($_type == 1) {
			echo '<ul class="pagination">';
			for ($i = 0; $i < $_pageabsolute; $i ++) {
				if ($_page == ($i + 1)) {
					echo '<li class="active"><a href="'.SCRIPT.'.php?'.$_id.'page='.($i+1).'">'.($i+1).'</a></li>';
				} else {
					echo '<li><a href="'.SCRIPT.'.php?'.$_id.'page='.($i+1).'">'.($i+1).'</a></li>';
				}
			}
			echo '</ul>';
		}
	}
	
}



?>