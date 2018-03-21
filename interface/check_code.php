<?php




	session_start();
	
	if (!empty($_POST['code'])) {
		if ($_POST['code'] == $_SESSION['code']) {
			echo 1;
		} else {
			echo 0;
		}
	}
	
	
	
?>