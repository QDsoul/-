define(["jquery", "jquery-cookie"], function ($) {
    function main() {
        $(function () {
            $.ajax({
                url: "../json/banner.json",
                type: "GET",
                success: function (res) {
                    // 导航栏li
                    var liHtml = "";
                    for (var h = 0; h < res.nav.length; h++) {
                        liHtml += `<li><a href="">${res.nav[h]}</a></li>`;
                    }
                    $(liHtml).appendTo($("#nav_li"));
                    // 分类菜单
                    var html = "";
                    for (var i = 0; i < res.category.length; i++) {
                        html += `<dl>
                                    <dt>
                                        <img src="../images/indexImg/${res.category[i].imgUrl}" alt="${res.category[i].title}">
                                        <h4>${res.category[i].title}</h4>
                                    </dt>
                                    <dd>
                                        <a href="">${res.category[i].cat[0]} / </a>
                                        <a href="">${res.category[i].cat[1]} / </a>
                                        <a href="">${res.category[i].cat[2]}</a>
                                    </dd>
                                </dl>`;
                    }
                    $(html).appendTo($("#category"));
                    // 分类菜单移入
                    $("#category dl").mouseenter(function () {
                        $("#category_child").html("");
                        $("#category_child").css("display", "block");
                        var index = $(this).index();
                        var childHtml = "";
                        var aHtml = "";
                        for (var j = 0; j < res.category[index].child.length; j++) {
                            var aHtml = "";
                            for (var k = 0; k < res.category[index].child[j].cat.length; k++) {
                                var cat = res.category[index].child[j].cat[k];
                                if (cat.indexOf("*") == 0) {
                                    cat = cat.substring(1);
                                    aHtml += `<a href="" style='color:#ff195a'>${cat}</a>`;
                                } else {
                                    aHtml += `<a href="">${cat}</a>`;
                                }
                            }
                            childHtml += `<div>
                                    <h4>${res.category[index].child[j].title}</h4>
                                    <hr>
                                    <span>
                                        ${aHtml}
                                    </span>
                                </div>`;
                        }
                        $(childHtml).appendTo($("#category_child"));
                    });
                    $("#category dl").mouseleave(function () {
                        $("#category_child").css("display", "none")
                    });
                    $("#category_child").mouseenter(function () {
                        $("#category_child").css("display", "block")
                    });
                    $("#category_child").mouseleave(function () {
                        $("#category_child").css("display", "none")
                    });
                    // banner
                    // 动态添加图片
                    var imgHtml = `<a href=""><img src="../images/indexImg/${res.bannerImg[res.bannerImg.length - 1].url}" alt=""></img></a>`;
                    for (var l = 0; l < res.bannerImg.length; l++) {
                        imgHtml += `<a href=""><img src="../images/indexImg/${res.bannerImg[l].url}" alt=""></img></a>`;
                    }
                    var bannerUlWidth = (res.bannerImg.length + 2) * res.bannerImg[0].width;
                    $("#bannerImg ul").css({
                        width: bannerUlWidth + "px",
                        left: -1 * res.bannerImg[0].width + "px"
                    });
                    imgHtml += `<a href=""><img src="../images/indexImg/${res.bannerImg[0].url}" alt=""></img></a>`;
                    $(imgHtml).appendTo($("#bannerImg ul"));

                    var iNow = 1;
                    var timer = null;
                    // 按钮切换图片
                    $("#bannerImg ol li").click(function () {
                        iNow = $(this).index() + 1;
                        tap();
                    })
                    // 鼠标悬浮暂停切换
                    $("#bannerImg").hover(function () {
                        clearInterval(timer);
                    }, function () {
                        timer = setInterval(timerInner, 3000);
                    })

                    // $("#bannerImg").mouseenter(function(){
                    //     clearInterval(timer);
                    // }).mouseleave(function(){
                    //     timer = setInterval(timerInner, 3000);
                    // })

                    timer = setInterval(timerInner, 3000);

                    function timerInner() {
                        iNow++;
                        tap();
                    }
                    $("#prevBanner").click(function () {
                        iNow--;
                        tap();
                    })
                    $("#nextBanner").click(function () {
                        iNow++;
                        tap();
                    })
                    // 切换图片
                    function tap() {
                        $("#bannerImg ol li").attr("class", "").eq(iNow - 1).attr("class", "active");
                        if (iNow == $("#bannerImg ol li").size() + 1) {
                            $("#bannerImg ol li").eq(0).attr("class", "active");
                        } else if (iNow == 0) {
                            $("#bannerImg ol li").eq($("#bannerImg ol li").size()).attr("class", "active");
                        }
                        var imgAnimite = -1 * iNow * res.bannerImg[0].width;
                        $("#bannerImg ul").stop().animate({
                            left: imgAnimite
                        }, 500, function () {
                            if (iNow == $("#bannerImg ol li").size() + 1) {
                                var imgLeft = -1 * res.bannerImg[0].width;
                                $("#bannerImg ul").css("left", imgLeft);
                                iNow = 1;
                            } else if (iNow == 0) {
                                var imgLeft = -1 * res.bannerImg[0].width * ($("#bannerImg ol li").size());
                                $("#bannerImg ul").css("left", imgLeft);
                                iNow = $("#bannerImg ol li").size();
                            }
                        })
                    }
                    // 二维码
                    $(`<img src="../images/indexImg/${res.codeImg.url}" alt="">`).appendTo($("#codeImg"));
                },
                error: function (msg) {
                    alert(msg);
                }
            })

            $("#bannerImg").hover(function () {
                $("#prevBanner").stop().animate({
                    left: "0px"
                })
                $("#nextBanner").stop().animate({
                    right: "0px"
                })
            }, function () {
                $("#prevBanner").stop().animate({
                    left: "-34px"
                })
                $("#nextBanner").stop().animate({
                    right: "-34px"
                })
            })

            // 上部商品区
            $.ajax({
                type: "GET",
                url: "../json/topProduct.json",
                success: function (res) {
                    $(`<img style='height:${res.promise.height};width:${res.promise.width}' src="../images/indexImg/${res.promise.url}" alt="">`).appendTo($(".topProduct .promise"));
                    var productsHtml = "";
                    // 全球必买
                    $(`<img style='height:${res.choice.title.height};width:${res.choice.title.width}' src="../images/indexImg/${res.choice.title.url}" alt="">`).appendTo($("#topProduct .model1 .title"));
                    for (var i = 0; i < res.choice.product.length; i++) {
                        productsHtml += `<a href="">
                                            <dl title='${res.choice.product[i].desc}'>
                                                <dt>
                                                    <img style='height:${res.choice.product[i].height};width:${res.choice.product[i].width}' src="../images/indexImg/${res.choice.product[i].url}" alt="">
                                                </dt>
                                                <dd>
                                                    <p title='${res.choice.product[i].desc}'>${res.choice.product[i].desc}</p>
                                                    <em>${res.choice.product[i].price}</em>
                                                    <i>${res.choice.product[i].costPrice}</i>
                                                </dd>
                                            </dl>
                                        </a>`;
                    }
                    $(productsHtml).appendTo($("#topProduct .model1 .products"));
                    // 品牌街
                    $(`<img style='height:${res.superBrand.height};width:${res.superBrand.width}' src="../images/indexImg/${res.superBrand.url}" alt="">`).appendTo($("#topProduct .model2 .title"));

                },
                error: function (msg) {
                    alert(msg);
                }
            })
            // 商品加载
            $.ajax({
                type: "GET",
                url: "../json/products.json",
                success: function (res) {
                    var productsHtml = "";
                    // alert(res.length);
                    for (var i = 0; i < res.length; i++) {
                        var aHtml = "";
                        var dlHtml = "";
                        var logoHtml = "";
                        for (var j = 0; j < res[i].hot.length; j++) {
                            if (res[i].hot[j].indexOf("*") == 0) {
                                aHtml += `<a style='color:#e54077' href="">${res[i].hot[j].substring(1)}</a>`;
                            } else {
                                aHtml += `<a href="">${res[i].hot[j]}</a>`;
                            }
                        }
                        for (var k = 0; k < res[i].products.length; k++) {
                            // if(k == 0){
                            dlHtml += `
                                <dl title="${res[i].products[k].name}">
                                        <dt>
                                            <img style='height:${res[i].products[k].height};width:${res[i].products[k].width}' src="../images/indexImg/${res[i].products[k].url}" alt="">
                                        </dt>
                                        <dd>
                                            <p>${res[i].products[k].name}</p>
                                            <span>
                                                <em>￥${res[i].products[k].price}</em>
                                                <i>￥${res[i].products[k].costPrice}</i>
                                            </span>
                                        </dd>
                                    </dl>`;
                            // }else{
                            // dlHtml += `1`;
                            // }
                        }
                        for (var l = 0; l < res[i].logo.length; l++) {
                            logoHtml += `<dl title="${res[i].logo[l].name}">
                                            <dt>
                                                <img style='height:${res[i].logo[l].height};width:${res[i].logo[l].width}' src="../images/indexImg/${res[i].logo[l].url}" alt="">
                                            </dt>
                                            <dd>
                                                <p>${res[i].logo[l].name}</p>
                                            </dd>
                                        </dl>`;
                        }
                        productsHtml += `
                        <div class="productBox">
                            <div class="productTitle">
                            <img style='height:${res[i].topTitle.height};width:${res[i].topTitle.width}' src="../images/indexImg/${res[i].topTitle.url}" alt="">
                            </div>
                            <div class="product">
                                <div class="hot">
                                    <h4>最热HOT</h4>
                                    ${aHtml}
                                </div>
                                <div class="title">
                                <a href=""><img src="../images/indexImg/${res[i].title.url}" alt=""></a>
                                    <div class="detail">
                                        <h2>${res[i].title.text}</h2>
                                        <p>查看更多&gt;</p>
                                    </div>
                                </div>
                                <div class="pro">
                                    ${dlHtml}
                                </div>
                                <div class="logo">
                                    <h3>
                                        <b>BRAND</b>
                                        <strong>热卖品牌</strong>
                                    </h3>
                                    ${logoHtml}
                                </div>
                            </div>
                        </div>
                        `;
                    }
                    $(productsHtml).appendTo($("#content"));

                    $(".product .pro dt").mouseenter(function () {
                        $(this).stop().animate({
                            "marginLeft": "-10px",
                            "marginRight" : "10px"
                        });
                    }).mouseleave(function () {
                        $(this).stop().animate({
                            "marginLeft": 0,
                            "marginRight" : "0px"
                        });
                    })
                },
                error: function (msg) {
                    alert(msg);
                }
            })

            // 右边菜单
            $("#rightMenuBox").css({
                "height": $(window).height()
            });
            $(window).resize(function () {
                $("#rightMenuBox").css({
                    "height": $(window).height()
                });
            })

            $(".rightMenu>div").mouseenter(function () {
                $(this).children(".tip").css("display", "block").stop().animate({
                    "opacity": 1,
                    "right": "35px"
                });
            }).mouseleave(function () {
                var oTip = $(this).children(".tip");
                $(this).children(".tip").stop().animate({
                    "opacity": 0,
                    "right": "70px"
                }, function () {
                    // alert(1);
                    oTip.css("display", "none");
                });
            }).click(function () {
                // $('body,html').stop().animate({
                //     scrollTop: 0
                // });

            })

            // 二维码
            $(".rightCode").mouseover(function () {
                $(".rightCode .code").css({
                    "display": "block"
                });
            }).mouseout(function () {
                $(".rightCode .code").css({
                    "display": "none"
                });
            })

            // 返回顶部

            $(window).scroll(function () {
                if ($(window).scrollTop() > 50) {
                    $("#goTop").css({
                        "display": "block"
                    }).stop().animate({
                        "opacity": 1
                    });
                } else {
                    $("#goTop").stop().animate({
                        "opacity": 0
                    }, function () {
                        $("#goTop").css({
                            "display": "none"
                        })
                    })
                }
            })
            $("#goTop").mouseover(function () {
                setTimeout(function () {
                    $("#goTop .tip").css("display", "block").stop().animate({
                        "opacity": 1,
                        "right": "35px"
                    });
                }, 200);
            }).mouseout(function () {
                $("#goTop .tip").stop().animate({
                    "opacity": 0,
                    "right": "70px"
                }, function () {
                    $("#goTop .tip").css("display", "none");
                });
            }).click(function () {
                $('body,html').stop().animate({
                    scrollTop: 0
                });

            })
        })
    }
    return {
        index: main
    }
})