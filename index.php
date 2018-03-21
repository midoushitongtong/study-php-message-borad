<?php




	define('IN_TG', true);
	define('SCRIPT', 'index');
	include dirname(__FILE__).'/init.inc.php';

	Page::_page("SELECT pm_id FROM pm_message", PAGE_SIZE);


?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>233</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="short icon" href="images/text.png">

	<!--[if lt ie 9]>
		<script src="js/html5shiv.min.js"></script>
		<script src="js/respond.min.js"></script>
	<![endif]-->	

</head>
<body>





<nav class="navbar navbar-default">
	<section class="container">
		
		<div class="navbar-header">
			<a href="index.php" class="navbar-brand">留言板</a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>

		<div class="collapse navbar-collapse" id="navbar-collapse">
			<nav class="nav navbar-nav">
				<li><a href="#"><span class="glyphicon glyphicon-home"></span> 此处什么都没有留下~~</a></li>
			</nav>

			<?php
				if (isset($_COOKIE['username'])) {
			?>
			
			<form class="navbar-form navbar-right register-login" style="display: none">
				<button type="button" class="btn btn-info register_a">注册</button>
				<button type="button" class="btn btn-info login_a">登录</button>
			</form>
			<div class="navbar-text navbar-right cookie-username">
				<span class="glyphicon glyphicon-user"></span> <?php echo $_COOKIE['username']?><span class="logout" style="font-weight: bold; cursor: pointer;"> 退出</span>
			</div>			
		

			<?php
			
			} else {
			
			?>
			
			<form class="navbar-form navbar-right register-login">
				<button type="button" class="btn btn-info register_a">注册</button>
				<button type="button" class="btn btn-info login_a">登录</button>
			</form>
			<div class="navbar-text navbar-right cookie-username"></div>
			
			<?php
			
			}
			
			?>
		</div>

	</section>
</nav>

<section class="container message">
	
	<div class="row">

		<div class="col-md-3 message-insert">
			<aside class="list-group">
				<li class="list-group-item"><button type="button" class="btn btn-info" id="message_container" style="width: 100%">查看全部</button></li>
				<li class="list-group-item"><button type="button" class="btn btn-info message-modal-a" style="width: 100%">发表留言</button></li>
				<li class="list-group-item">
					<div class="input-group">
						<input type="text" name="search" maxlength="39" class="form-control">
						<div class="input-group-btn">
							<button type="button" class="btn btn-info" id="search"><span class="glyphicon glyphicon-search"></span></button>
						</div>
					</div>
				</li>
			</aside>
		</div>

		<div class="col-md-9 message-content">
			<div class="message-index">
				<span class="loading"></span>
			</div>
			<div class="page">
				<?php 
					Page::_paging(1);
				?>
			</div>
			<input type="hidden" name="pagenum" value="<?php echo $_pagenum?>">
			<input type="hidden" name="pagesize" value="<?php echo $_pagesize?>">
		</div>
		
	</div>
	
</section>

<div class="modal fade" id="message-modal" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">发表留言</h4>
			</div>
			<div class="modal-body">
				<form action="" id="message">
					<div class="input-group">
						<input type="text" name="title" class="form-control" placeholder="标题">
						<div class="input-group-addon"><span class="glyphicon glyphicon-subtitles"></span></div>
					</div>
					<div class="input-group">
						<textarea name="content" class="content"></textarea>
					</div>
					<!-- <div class="input-group register-group" style="max-width: 266px">
						<input type="text" class="form-control code-text" maxlength="4" name="code" style="max-width: 129px">
						<img src="config/code.php" class="code" alt=""> 
						<span class="glyphicon glyphicon-ok code-glyphicon" style="right: -26px"></span>
					</div> -->
					<div class="content-length">你还能输入<span class="content-length-val" style="color: #5bc0de"> 233 </span>个字</div>
					<div class="error-content-length" style="display: none">已超出<span class="error-content-length-val" style="color: #f60"> 233 </span>个字</div>
					<div class="error error_message"></div>
					<button type="button" class="btn btn-info insert-btn">发表</button>
				</form>
			</div>
			<div class="modal-footer">
				<span class="text-info">这里啥也没有</span>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="registerModal" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4>
					<button class="close" data-dismiss="modal">&times;</button>
					注册
				</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="container-fluid">
						<form id="form-register">

							<div class="input-group auto register-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
								<input type="text" class="form-control" name="username" placeholder="用户名" autocomplete="false">
							</div>
							<div class="error auto error-username"></div>

							<div class="input-group auto register-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input type="password" class="form-control" name="password" placeholder="密码">
							</div>
							<div class="error auto error-password">
								
							</div>
							<div class="input-group auto register-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input type="password" class="form-control" name="notpassword" placeholder="确认密码">
							</div>
							<div class="error auto error-notpassword"></div>

							<div class="input-group auto register-group login-email">
								<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
								<input type="text" name="email" class="form-control email-text" id="uemail" placeholder="请输入常用邮箱"/>
								<ul class="autoul"></ul>
							</div>
							<div class="error auto error-email"></div>

							<div class="input-group register-group auto">
								<div class="btn-group" data-toggle="buttons">
									<label for="" class="btn btn-info check-sex active">
										<input type="radio" name="sex" value="男" checked>男
									</label>
									<label for="" class="btn btn-info check-sex">
										<input type="radio" name="sex" value="女">女
									</label>
								</div>
							</div>
							<div class="error auto error-sex"></div>

							<div class="input-group register-group auto">
								<input type="text" class="form-control code-text" maxlength="4" name="code">
								<img src="config/code.php" class="code" alt="">
								<span class="glyphicon glyphicon-ok code-glyphicon"></span>
							</div>
							<div class="input-group auto register-group">
								<button type="button" class="btn btn-primary register-btn" style="min-width: 123px; margin-bottom: 6px;" data-loading-text="loading...">提交</button>
							</div>

						</form>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<p><a href="#" class="text-primary login-center">已有账号 ？请登录</a></p>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="loginModal" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title">
				<button class="close" data-dismiss="modal">&times;</button>
					<h4>登录</h4>
				</div>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="container-fluid">
						<form id="form-login">

							<div class="error error-login auto"></div>

							<div class="input-group auto login-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
								<input type="text" class="form-control" name="username" placeholder="昵称">
							</div>

							<div class="input-group auto login-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input type="password" class="form-control" name="password" placeholder="密码">
							</div>

							<div class="input-group register-group auto">
								<input type="text" class="form-control code-text" maxlength="4" name="code">
								<img src="config/code.php" class="code" alt="">
								<span class="glyphicon glyphicon-ok code-glyphicon"></span>
							</div>

							<div class="input-group auto login-group">
								<button type="button" class="btn btn-primary btn-md auto login-btn" style="min-width: 123px;">登录</button>
							</div>

						</form>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<p><a href="#" class="text-primary register-center">还没有账号 ？请注册</a></p>
			</div>
		</div>
	</div>
</div>

<div class="progress progress-striped active loading-parent">
	<div class="progress-bar progress-bar-primary loading-children">loading...</div>
</div>


	
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/index.js"></script>
<script src="js/register.js"></script>
<script src="js/login.js"></script>
</body>
</html>
