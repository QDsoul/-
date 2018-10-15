define(["jquery", "jquery-cookie"], function($){
    function main(){
        $(function(){
            $(".toLoginOfNum").click(function(){
                $("#loginOfNum").css("display", "block");
                $("#loginOfCode").css("display", "none");
            });
            $(".toLoginOfNum2").click(function(e){
                e.preventDefault();
                $("#loginOfNum").css("display", "block");
                $("#loginOfCode").css("display", "none");
            });
            $(".toLoginOfCode").click(function(){
                $("#loginOfNum").css("display", "none");
                $("#loginOfCode").css("display", "block");
            });

            $("#login").click(function(e){
                e.preventDefault();
                if(!$("#username").val() && $("#password").val()){
                    $(".numLogin").html(" ");
                    $(".tip").html("请输入账户名").css("display", "block");
                }else if(!$("#password").val() && $("#username").val()){
                    $(".numLogin").html(" ");
                    $(".tip").html("请输入密码").css("display", "block");
                }else if(!$("#username").val() && !$("#password").val()){
                    $(".numLogin").html(" ");
                    $(".tip").html("请输入账户名和密码").css("display", "block");
                }else{
                    $(".numLogin").html("密码登陆");
                    $(".tip").css("display", "none");
                    $.ajax({
                        type : "POST",
                        data : `username=${$("#username").val()}&password=${$("#password").val()}`,
                        url : "../php/users.php?type=login",
                        success : function(res){
                            console.log(res);
                            if(res == "y"){
                                location.assign("../html/index.html");
                                $.cookie("username", `${$("#username").val()}`, {expires : 7});
                            }else{
                                $(".numLogin").html(" ");
                                $(".tip").html("账号密码错误").css("display", "block");
                            }
                        },
                        error : function(msg){
                            alert(msg);
                        }
                    })
                }
            })

        })
    }
    return {
        login : main
    }
})