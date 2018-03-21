
$(function () {



var fm_register = $('#form-register');

	var check_username = false;
	var username = fm_register.find('input[name=username]');

	username.on('focus', check_username_fn);
	username.on('keyup', check_username_fn);
	username.on('blur', check_is_repeat);

	function check_username_fn() {
		var username_val = $.trim(username.val());
		if (username_val.length >= 2 && username_val.length <= 20) {
			$('.error-username').html('').slideUp('fast');
			return check_username = true;
		}
		$('.error-username').html('请输入2~23位用户名').slideDown('fast');
		return check_username = false;
	}

	function check_is_repeat() {
		var username_val = $.trim(username.val());
		jqXHR_is_repeat = $.ajax({

			type : 'POST',
			url : 'interface/is_repeat.php',
			data : {
				username : fm_register.find('input[name=username]').val()
			}

		});
		jqXHR_is_repeat.done(function (response, status, xhr) {
			if (response == 1) {
				$('.error-username').html('用户名已存在').slideDown('fast');
				return check_username = false;
			}
		});
	}

	check_password = false;	

	fm_register.find('input[name=password]').on('focus', check_password_fn);
	fm_register.find('input[name=password]').on('keyup', check_password_fn);
	function check_password_fn() {
		var password_val = $.trim(fm_register.find('input[name=password]').val());
		var code_length = 0;
		if (/[\d]/.test(password_val)) {
			code_length ++;
		}
		if (/[a-z]/.test(password_val)) {
			code_length ++;
		}
		if (/[A-Z]/.test(password_val)) {
			code_length ++;
		}
		if (/[^\w]/.test(password_val)) {
			code_length ++;
		}
		if (password_val.length >= 6 && password_val.length <= 20 && code_length >= 2) {
			$('.error-password').html('').slideUp('fast');
			return check_password = true;
		}
		$('.error-password').html('请输入6~23密码 AND 不能纯数字').slideDown('fast');
		return check_password = false;
	}

	var check_notpassword = false;

	fm_register.find('input[name=notpassword]').on('keyup', check_notpassword_fn);
	function check_notpassword_fn() {
		notpassword_val = fm_register.find('input[name=notpassword]').val();
		if (notpassword_val == fm_register.find('input[name=password]').val()) {
			$('.error-notpassword').html('').slideUp('fast');
			return check_notpassword = true;
		} else {
			$('.error-notpassword').html('密码不一致').slideDown('fast');
			return check_notpassword = false;
		}
	}

	var check_email = false;

	fm_register.find('input[name=email]').on('keyup', check_email_fn);
	$('.all-email li').on('mousedown', function () {
		check_email_fn();
	});

	function check_email_fn() {
		if (/^[\w\.\-]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($.trim(fm_register.find('input[name=email]').val()))) {
			$('.error-email').html('').slideUp(233);
			return check_email = true;
		} else {
			$('.error-email').html('邮件不合法').slideDown(233);
			return check_email = false;
		}
	}

	var check_sex = false;

	function check_sex_fn() {
		if ($('.check-sex').hasClass('active') == true) {
			$('.error-sex').html('').slideUp(233);
			return check_sex = true;
		} else {
			$('.error-sex').html('请您选择性别').slideDown(233);
			return check_sex = false;
		}
	}

	fm_register.find('input[name=code]').on('keyup', check_code_fn);

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

		if (fm_register.find('input[name=code]').val().length == 4) {

			ajax_code();

			$(this).on('keyup', ajax_code);

		} else {
			return check_code = false;
		}

	}
	
	
	function ajax_code() {

		var jqXHR_check_code = $.ajax({
			type : 'POST',
			url : 'interface/check_code.php',
			data : {
				code : fm_register.find('input[name=code]').val()
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
	
	
	

	$('.register-btn').click(function (e) {
		var flag = true;

		if (check_username == false) {

			var username_val = $.trim(username.val());
			jqXHR_is_repeat = $.ajax({

				type : 'POST',
				url : 'interface/is_repeat.php',
				data : {
					username : fm_register.find('input[name=username]').val()
				}

			});
			jqXHR_is_repeat.done(function (response, status, xhr) {
				if (response == 1) {
					$('.error-username').html('用户名已存在').slideDown('fast');
					return check_username = false;
				} else {
					$('.error-username').html('请输入2~23位用户名').slideDown('fast');
				}
			});
		
			flag = false;
		}

		if (check_password_fn() == false) {
			$('.error-password').html('请输入6~23密码 AND 不能纯数字').slideDown('fast');
			flag = false;
		}

		if (check_notpassword_fn() == false) {
			$('.error-notpassword').html('密码不一致').slideDown('fast');
			flag = false;
		}
		
		if (check_email_fn() == false) {
			$('.error-email').html('邮件不合法').slideDown('fast');
			flag = false;
		}

		if (check_sex_fn() == false) {
			$('.error-sex').html('请您选择性别').slideDown(233);
			flag = false;
		}
		if (check_code == false) {
			$('.code-glyphicon').hide();
			$('.code-glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').css('color', '#d9534f').slideDown(130);
			flag = false;
		}

		if (flag == true) {

			$(this).button('loading');
			$('#registerModal').css('z-index', 1039);
			$('.loading-parent').fadeIn(233);

			jqXHR_register = $.ajax({
				type : 'POST',
				url : 'interface/register.php',
				data : fm_register.serialize()
			});

			jqXHR_register.done(function (response, status, xhr) {

				
				if (response == 1) {
					$('.loading-children').html('注册成功').css('background-color', '#5cb85c');
					setCookie('username', fm_register.find('input[name=username]').val(), setCookieDate(23));
					setTimeout(function () {
						$('.loading-parent').fadeOut(233);
						$('#registerModal').css('z-index', 1050).modal('hide');
						$('.register-btn').button('reset');
						$('#form-register').get(0).reset();

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
					$('.loading-children').html('注册失败').css('background-color', 'orange');
					setTimeout(function () {
						$('.loading-parent').fadeOut(233);
						$('#registerModal').css('z-index', 1050).modal('hide');
						$('.register-btn').button('reset');
					}, 2333);
				}
			});

		}
	});

	//初始化邮箱列表
	var mail = new Array('sina.com', '163.com', 'gmail.com','qq.com', 'sohu.com', 'sina.com.cn');

	//把邮箱列表加入下拉
	for(var i=0;i<mail.length;i++){
		var $liElement = $("<li class=\"autoli\"><span class=\"ex\"></span><span class=\"at\">@</span><span class=\"step\">"+mail[i]+"</span></li>");
		$liElement.appendTo("ul.autoul");
	}

	//下拉初始隐藏
	$(".autoul").hide();

	//在邮箱输入框输入字符
	$("#uemail").keyup(function(){

		//keyup事件包括方向键↓(38)、方向键↑(40)、回车(13)、删除(del 8,delete 46)以及其他有输入的按键
        //首先是有输入的按键，使输入框有长度(因为删除事件也是判断匹配以及长度，所以只需要添加删除事件特有的动作，而不必在此处排除删除事件)
        if(event.keyCode!=38 && event.keyCode!=40 && event.keyCode!=13){

            //菜单展现，需要排除空格开头和"@"开头
            if( $.trim($(this).val())!="" && $.trim(this.value).match(/^@/)==null ) {

                $(".autoul").slideDown(66);
                //同时去掉原先的高亮，把第一条提示高亮
                if($(".autoul li.lihover").hasClass("lihover")) {
                    $(".autoul li.lihover").removeClass("lihover");
                }
                $(".autoul li:visible:eq(0)").addClass("lihover");
            }else{//如果为空或者"@"开头
                $(".autoul").hide();
                $(".autoul li:eq(0)").removeClass("lihover");
            }

            //把输入的字符填充进提示，有两种情况：1.出现"@"之前，把"@"之前的字符进行填充；2.出现第一次"@"时以及"@"之后还有字符时，不填充
            //出现@之前
            if($.trim(this.value).match(/[^@]@/)==null){//输入了不含"@"的字符或者"@"开头

                if($.trim(this.value).match(/^@/)==null){
                    //不以"@"开头
                    $(this).next().children("li").children(".ex").text($(this).val());
                }
            }else{

                //输入字符后，第一次出现了不在首位的"@"
                //当首次出现@之后，有2种情况：1.继续输入；2.没有继续输入
                //当继续输入时
                var str = this.value;//输入的所有字符
                var strs = new Array();
                strs = str.split("@");//输入的所有字符以"@"分隔
                $(".ex").text(strs[0]);//"@"之前输入的内容
                var len = strs[0].length;//"@"之前输入内容的长度
                if(this.value.length>len+1){

                    //截取出@之后的字符串,@之前字符串的长度加@的长度,从第(len+1)位开始截取
                    var strright = str.substr(len+1);

                    //正则屏蔽匹配反斜杠"\"
                    if(strright.match(/[\\]/)!=null){
                        strright.replace(/[\\]/,"");
                        return false;
                    }

                    //遍历li
                    $("ul.autoul li").each(function(){

                        //遍历span
                        //$(this) li
                        $(this).children("span.step").each(function(){

                            //@之后的字符串与邮件后缀进行比较
                            //当输入的字符和下拉中邮件后缀匹配并且出现在第一位出现
                            //$(this) span.step
                            if($("ul.autoul li").children("span.step").text().match(strright)!=null && $(this).text().indexOf(strright)==0){
                                //class showli是输入框@后的字符和邮件列表对比匹配后给匹配的邮件li加上的属性
                                $(this).parent().addClass("showli");
                                //如果输入的字符和提示菜单完全匹配，则去掉高亮和showli，同时提示隐藏
                                if(strright.length>=$(this).text().length){
                                    $(this).parent().removeClass("showli").removeClass("lihover").hide();
                                }
                            }else{
                                $(this).parent().removeClass("showli");
                            }
                            if($(this).parent().hasClass("showli")){
                                $(this).parent().show();
                                $(this).parent("li").parent("ul").children("li.showli:eq(0)").addClass("lihover");
                            }else{
                                $(this).parent().hide();
                                $(this).parent().removeClass("lihover");
                            }
                        });
                    });
                }else{
                    //"@"后没有继续输入时
                    $(".autoul").children().show();
                    $("ul.autoul li").removeClass("showli");
                    $("ul.autoul li.lihover").removeClass("lihover");
                    $("ul.autoul li:eq(0)").addClass("lihover");
                }
            }
        }//有效输入按键事件结束

        //按键为backspace(8)或是delete(46)
        if(event.keyCode == 8 || event.keyCode == 46){

            $(this).next().children().removeClass("lihover");
            $(this).next().children("li:visible:eq(0)").addClass("lihover");
        }//删除事件结束

        //按键为方向键↑
        if(event.keyCode == 38){
            //使光标始终在输入框文字右边(不完美 ①只有在keyup事件中起作用,keydown不行 ②向上时光标每次先移到最左,然后再移到最右)
            $(this).val($(this).val());
        }//方向键↑结束

        //按键为回车(13)
        if(event.keyCode == 13){

            if($("ul.autoul li").is(".lihover")) {
                $("#uemail").val($("ul.autoul li.lihover").children(".ex").text() + "@" + $("ul.autoul li.lihover").children(".step").text());
            }

            $(".autoul").slideUp(66);
            $(".autoul").children().show().removeClass("lihover");

            check_email_fn();
        }
    });


	//当鼠标点击下拉菜单的具体一条内容时
	$(".autoli").click(function(){
		$("#uemail").val($(this).children(".ex").text()+$(this).children(".at").text()+$(this).children(".step").text());
		$(".autoul").slideUp(66);
		check_email_fn();
	});
	//鼠标点击下拉菜单具体内容事件结束

	//当鼠标点击document时,下拉隐藏
	$("body").click(function(){
		$(".autoul").slideUp(66);
	});
	//鼠标点击document事件结束

    $("ul.autoul li").hover(function(){
        if($("ul.autoul li").hasClass("lihover")){

            $("ul.autoul li").removeClass("lihover");
        }
        $(this).addClass("lihover");
    },function(){

    });

    $("#uemail").keydown(function(){

        if(event.keyCode == 40){

            if ($("ul.autoul li").is(".lihover")) {
                if ($("ul.autoul li.lihover").nextAll().is("li:visible")) {
                    if ($("ul.autoul li.lihover").nextAll().hasClass("showli")) {

                        $("ul.autoul li.lihover").removeClass("lihover")
                                .nextAll(".showli:eq(0)").addClass("lihover");
                    } else {
                        $("ul.autoul li.lihover").removeClass("lihover").removeClass("showli")
                                .next("li:visible").addClass("lihover");
                        $("ul.autoul").children().show();
                    }
                } else {

                    $("ul.autoul li.lihover").removeClass("lihover");
                    $("ul.autoul li:visible:eq(0)").addClass("lihover");
                }
            }
        }

        if(event.keyCode == 38){
            if($("ul.autoul li").is(".lihover")){
                if($("ul.autoul li.lihover").prevAll().is("li:visible")){
                    if($("ul.autoul li.lihover").prevAll().hasClass("showli")){

                        $("ul.autoul li.lihover").removeClass("lihover")
                                .prevAll(".showli:eq(0)").addClass("lihover");
                    }else{

                        $("ul.autoul li.lihover").removeClass("lihover").removeClass("showli")
                                .prev("li:visible").addClass("lihover");
                        $("ul.autoul").children().show();
                    }
                }else{

                    $("ul.autoul li.lihover").removeClass("lihover");
                    $("ul.autoul li:visible:eq("+($("ul.autoul li:visible").length-1)+")").addClass("lihover");
                }
            }else{
                $("ul.autoul li:visible:eq("+($("ul.autoul li:visible").length-1)+")").addClass("lihover");
            }
        }
    });

});


	

