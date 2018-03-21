
$(function () {


	
	$('.message-modal-a').click(function () {
		$('body').removeClass('modalshow');
		if (getCookie('username')) {
			$('#message-modal').modal('show');
		} else {
			$('#loginModal').modal('show');
		}
	});

	check_title = false;

	$('#message').find('input[name=title]').on('keyup', check_title_fn);
	$('#message').find('input[name=title]').on('blur', check_title_fn);
	function check_title_fn() {
		if ($.trim($('#message').find('input[name=title]').val()).length >= 2 && $.trim($('#message').find('input[name=title]').val()).length <= 20) {
			check_title = true;
			$('.error_message').html('').slideUp('fast');
		} else {
			check_title = false;
			$('.error_message').html('标题必须介于2~20位').slideDown('fast');
		}
	};

	check_length = true;

	$('#message').find('textarea[name=content]').on('keyup', function () {
		var content_length_val = $('.content-length-val');
		var error_length_val = $('.error-content-length-val');
		var max_length = 233;
		var now_length = $(this).val().length;
		var length = max_length - now_length;
		if (length < 0) {
			$('.content-length').slideUp();
			$('.error-content-length').slideDown();
			error_length_val.html(Math.abs(length));
			check_length = false;
		} else {
			$('.content-length').slideDown();
			$('.error-content-length').slideUp();
			check_length = true;
			content_length_val.html(length);
		}
	});


	
	
	function get_page_list() {
		var jqXHR_page = $.ajax({
								type : 'POST',
								url : 'interface/get_page.php',
								data : {
									pagesize : $('input[name=pagesize]').val()
								}
							});
		jqXHR_page.done(function (response, status, xhr) {
			var html = response;		
			$('.page').html(html);
			var page = $('.pagination').find('li');
			page.click(function (e) {
				page.removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
				var pagesize = $('input[name=pagesize]').val();
				var _this = ($(this).index() + 1 - 1) * pagesize;
				get_content(_this, true);	
			});
		});
	}
	get_page_list();
	
	function get_content(pagenum, page_status, page_one = 0) {
		$('.message-index').html('<span class="loading"></span>');
		var jqXHR_getmessage = $.ajax({
										type : 'POST',
										url : 'interface/get_message.php',
										data : {
											pagenum : pagenum,
											pagesize : $('input[name="pagesize"]').val()
										}
									});
		jqXHR_getmessage.done(function (response, status, xhr) {
			var json = JSON.parse(response);
			var html = '';
		$.each(json, function (index, value) {
				html += '<div class="panel panel-info a-fadeinB"><input type="hidden" name="id" value="' + value.pm_id + '"><div class="panel-heading"><div class="panel-title">' + value.pm_title +' <em>' + value.pm_post_user + ' 发表于 ' + value.pm_post_time + '</em></div></div><div class="panel-body">' + value.pm_content + '</div>';
				if (getCookie('username') == value.pm_post_user) {
					html += '<div class="panel-footer"><a href="javascript:void(0)" class="content_delete">删除</a></div></div>';
				} else {
					html += '</div>';
				}
			});
			$('.message-index').html('').prepend(html).fadeIn();
			$('.content_delete').click(function () {
				$(this).parent().parent().hide(666, function () {
					$(this).remove();
				});
				var id = $(this).parent().parent().find('input[name="id"]').val();
				$.ajax({
					url : 'interface/delete_message.php',
					type : 'POST',
					data : {
						id : id
					}
				});
				get_page_list();
				if ($('.panel-info').size() -1 == 0) get_content(0, true);
			});
			if (page_status == true) {
				$('.page').show();
			} else {
				$('.page').hide();
			}
			if (page_one == 1) {
				$('.page .pagination li').removeClass('active');
				$('.page .pagination li').eq(0).addClass('active');
			}
		});	
	}
	
	function get_content_search() {
		$('.message-index').html('<span class="loading"></span>');
			var jqXHR_search = $.ajax({
				type : 'POST',
				url : 'interface/search.php',
				data : {
					search : $.trim($('input[name="search"]').val())
				}
			});
			jqXHR_search.done(function (response, status, xhr) {
				if (response == 0 || response == '[]') {
					$('.message-index').html('<span class="alert alert-info no-search">没有找到包含 <span class="text-primary">' + $('input[name=search]').val() + '</span> 的内容</span>');
					$('.page').hide();
				} else {
					var json = JSON.parse(response);
					var html = '';
					$.each(json, function (index, value) {
						html += '<div class="panel panel-info a-fadeinB"><input type="hidden" name="id" value="' + value.pm_id + '"><div class="panel-heading"><div class="panel-title">' + value.pm_title +' <em>' + value.pm_post_user + ' 发表于 ' + value.pm_post_time + '</em></div></div><div class="panel-body">' + value.pm_content + '</div>';
						if (getCookie('username') == value.pm_post_user) {
							html += '<div class="panel-footer"><a href="javascript:void()" class="content_delete">删除</a></div></div>';
						} else {
							html += '</div>';
						}
					});


					
					$('.message-index').html('').prepend(html).fadeIn();
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
						get_page_list();
					});
				$('.page').hide();
			}
		});
	}

	function getUrlParam(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return r[2]; return null;
	}
	encodeURI(getUrlParam('search'));

	$('#message_container').click(function () {
		get_content(0, true);
	});

	get_content(0, true);
	
	$('input[name=search]').on('keyup', function (e) {
		if (e.keyCode == 13) {
			get_content_search();
		}
	});

	$('#search').click(function () {
		get_content_search();
	});

	if (getUrlParam('search') != null) {
		var jqXHR_search = $.ajax({
			type : 'POST',
			url : 'interface/search.php',
			data : {
				search : decodeURI(getUrlParam('search'))
			}
		});
		jqXHR_search.done(function (response, status, xhr) {
			var json = JSON.parse(response);
			var html = '';
			$('.message-index').html('');
			$.each(json, function (index, value) {
				html += '<div class="panel panel-info a-fadeinB"><input type="hidden" name="id" value="' + value.pm_id + '"><div class="panel-heading"><div class="panel-title">' + value.pm_title +' <em>' + value.pm_post_user + ' 发表于 ' + value.pm_post_time + '</em></div></div><div class="panel-body">' + value.pm_content + '</div>';
				if (getCookie('username') == value.pm_post_user) {
					html += '<div class="panel-footer"><a href="javascript:void()" class="content_delete">删除</a></div></div>';
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
				var jqXHR_page = $.ajax({
										type : 'POST',
										url : 'interface/get_page.php',
										data : {
											pagesize : $('input[name=pagesize]').val()
										}
									});
				jqXHR_page.done(function (response, status, xhr) {
					var html = response;
					$('.page').html(html);
				});
			});
			$('.page').hide();
		});
	} else {
		get_content(0, true);
	}

	
	
	

	var check_code = false;
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

	$('#message').find('input[name=code]').on('keyup', check_code_fn);
	function check_code_fn() {

		if ($('#message').find('input[name=code]').val().length == 4) {

			ajax_code();

			$(this).on('keyup', ajax_code);

		} else {
			return check_code = false;
		}

	}
	
	function ajax_code() {

				var jqXHR_check_code = $.ajax({
					type : 'POST',
					url : 'interface/check_config/code.php',
					data : {
						code : $('#message').find('input[name=code]').val()
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

	$('.insert-btn').click(function () {
		var flag = true;

		if (check_title == false) {
			flag = false;
			$('.error_message').html('标题必须介于2~20位').slideDown('fast');
		}

		if ($.trim($('#message').find('textarea[name=content]').val()) == '') {
			flag = false;
			$('.error_message').html('请输入留言内容').slideDown('fast');
		}

		if (check_length == false) {
			flag = false;
		}

		if (flag == true) {
		
			$(this).button('loading');
			$('.loading-children').html('loading...').css('background-color', '#337ab7');
			$('#message-modal').css('z-index', 1039);
			$('.loading-parent').fadeIn(233);
			$('.error_message').html('').slideUp('fast');

			var jqXHR_insertmessage = $.ajax({
				type : 'POST',
				url : 'interface/add_message.php',
				data : $('#message').serialize()
			});
			jqXHR_insertmessage.done(function (response, status, xhr) {
				
				if (response == 1) {
					check_title = false;

					$('.loading-children').html('发表成功').css('background-color', '#5cb85c');


					check_code = false;
					

					

					var src = 'config/code.php?tm=' + Math.random();
					for (var i = 0; i < $('.code').size(); i++) {
						$('.code').get(i).src = src;
					}
					
					$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').slideUp(233);
					setTimeout(function () {

						$('.loading-parent').fadeOut(233);
						$('#message-modal').css('z-index', 1050).modal('hide');
						$('.insert-btn').button('reset');
						$('#message').get(0).reset();
						

						
						get_content(0, true, 1);
						get_page_list();
						
						
					}, 666);

				} else {
					check_title = false;

					$('.loading-children').html('发表失败').css('background-color', '#d9534f');


					check_code = false;

					var src = 'config/code.php?tm=' + Math.random();
					for (var i = 0; i < $('.code').size(); i++) {
						$('.code').get(i).src = src;
					}
					
					$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').slideUp(233);
					setTimeout(function () {

						$('.loading-parent').fadeOut(233);
						$('#message-modal').css('z-index', 1050).modal('hide');
						$('.insert-btn').button('reset');
						$('#message').get(0).reset();
						
					}, 666);
				}
			});
		}
	});

	$('#loginModal').css({modal:false});
	$('#registerModal').css({modal:false});

	$('.register_a').click(function() {
		$('body').removeClass('modalshow');
		$('#registerModal').modal('show');
		$('.error').hide();
		$('.code-glyphicon').hide();
	});

	$('.login_a').click(function() {
		$('body').removeClass('modalshow');
		$('#loginModal').modal('show');
		$('.error').hide();
		$('.code-glyphicon').hide();
	});

	$('.login-center').on('click',function() {
		$('body').addClass('modalpadding');
		$('body').removeClass('modalshow');
		$('#registerModal').modal('hide');
		$('#loginModal').modal('show');
		$('.error').hide();
		$('.code-glyphicon').hide();
	});

	$('.register-center').on('click',function() {
		$('body').addClass('modalpadding');
		$('body').removeClass('modalshow');
		$('#loginModal').modal('hide');
		$('#registerModal').modal('show');
		$('.error').hide();$('.code-glyphicon').hide();
	});

	$('#registerModal').on('hidden.bs.modal', function () {
		setTimeout(function () {
			if ($('.modal-backdrop').get(0) == undefined) {
				$('body').addClass('modalshow');
			}
		}, 0);
	});

	$('#loginModal').on('hidden.bs.modal', function () {
		setTimeout(function () {
			if ($('.modal-backdrop').get(0) == undefined) {
				$('body').addClass('modalshow');
			}
		}, 0);
	});

});