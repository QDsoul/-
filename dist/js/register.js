define(["drag", "jquery", "jquery-cookie"], function (drag, $) {
    function main() {
        $(function () {
            // 显示隐藏国家及电话
            $(".country").click(function () {
                $(".countryList").toggle();
            })
            $(document).on("click", function (ev) {
                if (ev.target.closest('.country') && ev.target.closest('.country').className == "country") {
                    return false;
                } else {
                    $(".countryList").css("display", "none")
                }

            })
            // 切换国家
            $(".countryList ul li").click(function () {
                $(".text b").html($(this).find("a").find("i").html());
                $(".text strong").html($(this).find("a").find("em").html());
                $(".countryList ul li").attr("class", "");
                $(this).attr("class", "active");
            })

            // 验证
            drag.drag($("#validate .block"), $("#validate"), $(".progracess"), $("#validate p"), $("#next"));
            $("#next").click(function (ev) {
                ev.preventDefault();
                var isOK = validatePhone();
                var isHas = false;
                $.ajax({
                    type : "POST",
                    url : "../php/users.php?type=isHasUser",
                    data : `username=${$("#phone").val()}`,
                    success : function(res){
                        if(res == "n"){
                            isHas = true;
                        }else{
                            $(".phone .tip").html("此手机号已被注册").css("color", "red");
                        }
                        if(isOK && isHas){
                            $(".phoneMsg").css({
                                "display": "block"
                            });
                            $(".phoneMsg .phone1 strong").html(phone);
                            wait();
                        }
                    },
                    error : function(msg){
                        alert(msg);
                    }
                })
            })
            $("#phone").focus(function () {

            }).blur(function () {
                validatePhone();
            })
            $(".validate1 input[type='button']").click(function () {
                wait();
            })
            // 关闭验证码页面
            $(".close").click(function () {
                $(".phoneMsg").css({
                    "display": "none"
                });
            })
            // 进入填写账户信息页面
            $("#next2").click(function () {
                $(".phoneMsg").css({
                    "display": "none"
                });
                $(".firstForm").css({
                    "display": "none"
                });
                $(".steps>ul li").eq(1).attr("class", "active");
                $(".userInfo").css("display", "block");
                $(".userInfo .userName span").html($("#phone").val());
            })

            // $("#next2").click(function(){
                
            // })
            // 验证密码是否标准
            var isInfo1 = false;
            var isInfo2 = false;
            $("#setPwd").focus(function(){
                $(".pwdTip").html("");
            }).blur(function(){
                if($(this).val().length < 6 || $(this).val().length > 18){
                    $(".pwdTip").html("密码为6~18个字符").css("color", "red");
                    isInfo1 = false;
                }else{
                    $(".pwdTip").html("密码可以使用").css("color", "green");
                    isInfo1 = true;
                }
            })
            // 验证再次填写密码是否标准
            $("#reSetPwd").focus(function(){
                $(".rePwdTip").html("");
            }).blur(function(){
                if(!$("#reSetPwd").val()){
                    $(".rePwdTip").html("密码不能为空").css("color", "red");
                    isInfo2 = false;
                }else if($(this).val().length < 6 || $(this).val().length > 18){
                    $(".rePwdTip").html("密码为6~18个字符").css("color", "red");
                    isInfo2 = false;
                }else if($("#setPwd").val() != $("#reSetPwd").val()){
                    $(".rePwdTip").html("两次密码不一致").css("color", "red");
                    isInfo2 = false;
                }else{
                    $(".rePwdTip").html("密码一致").css("color", "green");
                    isInfo2 = true;
                }
            })
            // 验证会员名是否标准
            $("#setVIPName").focus(function(){
                $(".setVIPTip").html("");
            }).blur(function(){
                if(!$("#setVIPName").val()){
                    // $(".setVIPTip").html("请输入正确的会员名").css("color", "red");
                }else{
                    $(".setVIPTip").html("会员名可以使用").css("color", "green");
                }
            })
            // 跳转设置支付方式页面
            $("#toPay").click(function(){
                if(isInfo1 == true && isInfo2 == true){
                    $(".userInfo").css("display", "none");
                    $(".wayOfPay").css("display", "block");
                    $(".steps>ul li").eq(2).attr("class", "active");
                }
            })
            // 跳转成功页面
            $("#toSuccess").click(function(e){
                e.preventDefault();
                isSuccessOfReg();
            })
            $("#toSuccess1").click(function(e){
                e.preventDefault();
                isSuccessOfReg();
            })


            function isSuccessOfReg(){
                $.ajax({
                    type : "POST",
                    data : `username=${$("#phone").val()}&password=${$("#setPwd").val()}&vipName=${$("#setVIPName").val()}`,
                    url : "../php/users.php?type=register",
                    success : function(res){
                        if(res == "y"){
                            $(".wayOfPay").css("display", "none");
                            $(".registerSuccess").css("display", "block");
                            $(".steps>ul li").eq(3).attr("class", "active");
                            $(".registerSuccess em").html($("#phone").val());
                        }else{
                            $(".wayOfPay").css("display", "none");
                            $(".registerSuccess").css("display", "block");
                            $(".steps>ul li").eq(3).attr("class", "active");
                            $(".registerSuccess em").html($("#phone").val());
                            $(".steps ul li:nth-child(4)").html("<b>✘</b>注册失败");
                            $(".registerSuccess p").html("注册失败");
                            $(".registerSuccess a").html("重新注册");
                            $(".registerSuccess a").click(function(e){
                                e.preventDefault();
                                location.reload();
                            })
                        }
                    },
                    error : function(msg){
                        alert(msg);
                    }
                })
            }

            function validatePhone() {
                var phone = $("#phone").val();
                var isOK = false;
                if (!phone) {
                    $(".phone .tip").html("请输入你的手机号码").css({
                        "color": "red"
                    });
                } else if (!(/^1[34578]\d{9}$/.test(phone))) {
                    $(".phone .tip").html("手机号格式不正确").css({
                        "color": "red"
                    });
                } else {
                    $(".phone .tip").html("手机号可以使用").css({
                        "color": "green"
                    });
                    isOK = true;
                }
                return isOK;
            }

            function wait() {
                var timeInit = 10;
                $(".validate1 input[type='button']").val(`重发验证码${timeInit}s`).css("color", "white").attr("disabled", "true");
                var timer = setInterval(function () {
                    timeInit--;
                    $(".validate1 input[type='button']").val(`重发验证码${timeInit}s`);
                    if (timeInit == 0) {
                        clearInterval(timer);
                        $(".validate1 input[type='button']").val(`免费获取验证码`).css("color", "black").removeAttr("disabled");
                    }
                }, 1000)
            }
            // var offsetX = 0;
            // $("#validate .block").mousedown(function (e) {
            //     offsetX = e.clientX - $("#validate .block").position().left;
            //     $(document).mousemove(function (e) {
            //         var l = e.clientX - offsetX;
            //         if (l <= 0) {
            //             l = 0;
            //         } else if (l >= $("#validate").width() - $("#validate .block").width()) {
            //             l = $("#validate").width() - $("#validate .block").width();
            //         }
            //         $("#validate .block").css({
            //             left: l
            //         })
            //         $(".progracess").width(l);
            //     })
            //     $(document).mouseup(function () {
            //         $(document).off("mousemove");
            //         var blockLeft = $("#validate .block").width() + $("#validate .block").position().left;
            //         if (blockLeft != $("#validate").width()) {
            //             $("#validate .block").stop().animate({
            //                 "left": 0
            //             });
            //             $(".progracess").stop().animate({
            //                 "width": 0
            //             });
            //         } else {
            //             $("#validate p").html("验证通过");
            //             $("#validate .block").css({})
            //             $("#next").removeAttr("disabled");
            //             $("#next").attr("class", "active")
            //             $("#validate .block").off("mousedown");
            //         }
            //     })
            // })
        })
    }
    return {
        register: main
    }
})