
$(function () {




















	var fm_login = $('#form-login');
	fm_login.find('input[name=code]').on('keyup', check_code_fn);




	check_code = false;

	$('.code').click(function () {
		var src = 'config/code.php?tm=' + Math.random();
		for (var i = 0; i < $('.code').size(); i++) {
			$('.code').get(i).src = src;
		}
		check_code = false;
		if ($('.code-glyphicon').hasClass('glyphicon-remove') == false) {
			$('.code-glyphicon').hide();
		}
		$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').css('color', '#d9534f').slideDown(130);
	});

	function check_code_fn() {

		if (fm_login.find('input[name=code]').val().length == 4) {

			ajax_code();

			$(this).on('keyup', ajax_code);	

		} else {
			return check_code = false;
		}

	}
	
	
	
	






	function get_message() {
		$('.message-index').html('<span class="loading"></span>');
		var jqXHR_getmessage = $.ajax({
										type : 'POST',
										url : 'interface/get_message.php',
										data : {
											pagenum : $('input[name=pagenum]').val(),
											pagesize : $('input[name=pagesize]').val()
										}
									});
		jqXHR_getmessage.done(function (response, status, xhr) {
			var json = JSON.parse(response);
			var html = '';

			$('.message-index').html('');

			$.each(json, function (index, value) {
				html += '<div class="panel panel-info"><input type="hidden" name="id" value="' + value.pm_id + '"><div class="panel-heading"><div class="panel-title">' + value.pm_title +' <em>' + value.pm_post_user + ' 发表于 ' + value.pm_post_time + '</em></div></div><div class="panel-body">' + value.pm_content + '</div>';
				if (getCookie('username') == value.pm_post_user) {
					html += '<div class="panel-footer"><a href="javascript:void(0)" class="content_delete">删除</a></div></div>';

				} else {
					html += '</div>';
				}
			});
			
			$('.message-index').prepend(html).fadeIn();
			$('.content_delete').click(function () {
				$(this).parent().parent().hide(666);
				var id = $(this).parent().parent().find('input[name="id"]').val();
				$.ajax({
					url : 'interface/delete_message.php',
					type : 'POST',
					data : {
						id : id
					},
					success : function (response, status, xhr) {

					}
				});
			});
			$('.page').show();

		});
	}
	function ajax_code() {

		var jqXHR_check_code = $.ajax({
			type : 'POST',
			url : 'interface/check_code.php',
			data : {
				code : fm_login.find('input[name=code]').val()
			}
		});

		jqXHR_check_code.done(function (response, status, xhr) {
			if (response == 1) {
				if ($('.code-glyphicon').hasClass('glyphicon-ok') == false) {
					$('.code-glyphicon').hide();
				}
				$('.code-glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok').css('color', '#5cb85c').slideDown(233);
				return check_code = true;
			} else {
				if ($('.code-glyphicon').hasClass('glyphicon-ok') == true) {
					$('.code-glyphicon').hide();
				}
				$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').css('color', '#d9534f').slideDown(233);
				return check_code = false;
			}
		});
	}

	
	
	
	
	
	
	$('.login-btn').click(function () {
		
		var flag = true;

		if (check_code == false) {
			if ($('.code-glyphicon').hasClass('glyphicon-ok') == true) {
				$('.code-glyphicon').hide();
			}
			$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').css('color', '#d9534f').slideDown(130);
			return check_code = false;
			flag = false;
		}

		if (flag == true) {

			$(this).button('loading');
			$('.loading-children').html('loading...').css('background-color', '#337ab7');
			$('#loginModal').css('z-index', 1039);
			$('.loading-parent').fadeIn(233);
			
			jqXHR_login = $.ajax({
				type : 'POST',
				url : 'interface/login.php',
				data : fm_login.serialize()
			});

			jqXHR_login.done(function (response, status, xhr) {
				if (response == 1) {
					$('.loading-children').html('登陆成功').css('background-color', '#5cb85c');
					setCookie('username', fm_login.find('input[name=username]').val(), setCookieDate(23));
					get_message();
					setTimeout(function () {
						$('.loading-parent').fadeOut(233);
						$('#loginModal').css('z-index', 1050).modal('hide');
						$('.login-btn').button('reset');
						$('#form-login').get(0).reset();

						var src = 'config/code.php?tm=' + Math.random();
						for (var i = 0; i < $('.code').size(); i++) {
							$('.code').get(i).src = src;
						}
						check_code = false;
						
						$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').slideUp(233);
						setTimeout(function () {

							$('.register-login').slideUp(233, function () {

								
								$('.cookie-username').html(
									'<span class="glyphicon glyphicon-user"></span> ' + getCookie('username') + '<span class="logout" style="font-weight: bold; cursor: pointer;"> 退出</span>'
								).slideDown(233);

								$('.logout').click(function () {
									unsetCookie('username');
									get_message();

									setTimeout(function () {
										$('.cookie-username').slideUp(233, function () {
											$('.register-login').slideDown(233);
										});
									}, 233);
								});

							});

						}, 300);

					}, 2333);
				} else {
					$('.loading-parent').fadeOut(233);
					$('#loginModal').css('z-index', 1050);
					$('.login-btn').button('reset');
					$('.error-login').html('用户名不存在或密码错误').slideDown(233);
					var src = 'config/code.php?tm=' + Math.random();
					for (var i = 0; i < $('.code').size(); i++) {
						$('.code').get(i).src = src;
					}
					check_code = false;
					fm_login.find('input[name=code]').val('');
					$('.code-glyphicon').hide();
				}

			});

		}

	});

	$('.logout').click(function () {
		unsetCookie('username');
		get_message();
		setTimeout(function () {
			$('.cookie-username').slideUp(233, function () {
				$('.register-login').slideDown(233);
			});
		}, 233);
	});

});