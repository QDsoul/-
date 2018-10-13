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
            $("#next").click(function(ev){
                ev.preventDefault();
                var phone = $("#phone").val();
                if(!phone){
                    $(".phone .tip").html("手机号不能为空").css({"color" : "red"});
                }else if(!(/^1[34578]\d{9}$/.test(phone))){ 
                    $(".phone .tip").html("手机号格式不正确").css({"color" : "red"});
                }else{
                    $(".phone .tip").html("手机号可以使用").css({"color" : "green"});
                    $(".phoneMsg").css({"display": "block"});
                    $(".phoneMsg .phone1 strong").html(phone);
                }
            })
            $(".close").click(function(){
                $(".phoneMsg").css({"display": "none"});
            })
            $("#next2").click(function(){
                $(".phoneMsg").css({"display": "none"});
                $(".firstForm").css({"display": "none"});
                $(".steps>ul li").eq(1).attr("class", "active");
            })
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