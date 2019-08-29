
/*-- -------------登陆面板与注册面板逻辑------------ --*/
;(function($){
	//1.登陆切换注册面板
	var $register = $('#register');//注册
	var $login = $('#login');//登陆
	//1.1.从登陆面板切换到注册面板
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	})
	//1.2.从注册面板到登陆面板
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})

	/*-- -------------注册面板逻辑------------ --*/
	//正则(3-10以字母开头，包含数字下划线)
	var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i;
	var passwordReg = /^\w{3,6}$/;
	$('#sub-register').on('click',function(){
		//1.获取表单数据
		var username = $register.find('[name=username]').val();
		var password = $register.find('[name=password]').val();
		var repassword = $register.find('[name=repassword]').val();
		//2.验证
		var errMsg = '';
		var $err = $register.find('.err');
		if(!usernameReg.test(username)){
			errMsg = "用户名必须是3-10位以字母开头,数字字母下划线结束";
		}
		else if(!passwordReg.test(password)){
			errMsg = "密码必须是3-6位,字母数字结束";
		}
		else if(password != repassword){
			errMsg = "两次输入密码不一致";
		}
		//验证信息不通过
		if(errMsg){
			$err.html(errMsg);
			return
		}
		else{//验证通过
			$err.html();
			//提交表单发送ajax请求
			$.ajax({
				url:'/user/register',
				type:'POST',
				dateType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				// console.log(result);
				if(result.status == 0){
					$('#go-login').trigger('click');
				}else{
					$err.html(result.message);
				}
			})
			.fail(function(err){
				$err.html("请求失败,请稍后重试...")
			})
		}
	})

	/*---------------登陆面板逻辑------------ --*/
	$('#sub-login').on('click',function(){
		//1.获取表单数据
		var username = $login.find('[name=username]').val();
		var password = $login.find('[name=password]').val();
		//2.验证
		var errMsg = '';
		var $err = $login.find('.err');
		if(!usernameReg.test(username)){
			errMsg = "用户名必须是3-10位以字母开头,数字字母下划线结束";
		}
		else if(!passwordReg.test(password)){
			errMsg = "密码必须是3-6位,字母数字结束";
		}
		//验证不通过
		if(errMsg){
			$err.html(errMsg);
			return
		}else{//验证通过
			$err.html('');
			$.ajax({
				url:'/user/login',
				type:'POST',
				dateType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(result=>{
				// console.log(result);
				if(result.status == 0){
					$login.hide();
					$('#user-info').show();
					$('#user-info span').html(result.data.username);
				}else{
					$err.html(result.message);
				}
			})
			.fail(err=>{
				$err.html("请求失败...")
			})
		}
	})
})(jQuery)