define(["jquery", "jquery-cookie"], function ($) {
    function main() {
        $(function () {
            $.ajax({
                url: "../json/banner.json",
                type: "GET",
                success: function (res) {
                    // 导航栏li
                    var liHtml = "";
                    for(var h = 0; h < res.nav.length; h++){
                        liHtml += `<li><a href="">${res.nav[h]}</a></li>`;
                    }
                    $(liHtml).appendTo($("#nav_li"));
                    // 分类菜单
                    var html = "";
                    for (var i = 0; i < res.category.length; i++) {
                        html += `<dl>
                                    <dt>
                                        <img src="../images/${res.category[i].imgUrl}" alt="${res.category[i].title}">
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
                    $("#category dl").mouseenter(function(){
                        $("#category_child").html("");
                        $("#category_child").css("display", "block");
                        var index = $(this).index();
                        var childHtml = "";
                        var aHtml = "";
                        for (var j = 0; j < res.category[index].child.length; j++) {
                            var aHtml = "";
                            for(var k = 0; k < res.category[index].child[j].cat.length; k++){
                                var cat = res.category[index].child[j].cat[k];
                                if(cat.indexOf("*") == 0){
                                    cat = cat.substring(1);
                                    aHtml += `<a href="" style='color:#ff195a'>${cat}</a>`;
                                }else{
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
                    $("#category dl").mouseleave(function(){
                        $("#category_child").css("display", "none")
                    });
                    $("#category_child").mouseenter(function(){
                        $("#category_child").css("display", "block")
                    });
                    $("#category_child").mouseleave(function(){
                        $("#category_child").css("display", "none")
                    });
                    // banner
                    // 动态添加图片
                    var imgHtml = `<a href=""><img src="../images/${res.bannerImg[res.bannerImg.length - 1].url}" alt=""></img></a>`;
                    for(var l = 0; l < res.bannerImg.length; l++){
                        imgHtml += `<a href=""><img src="../images/${res.bannerImg[l].url}" alt=""></img></a>`;
                    }
                    var bannerUlWidth = (res.bannerImg.length + 2) * res.bannerImg[0].width;
                    $("#bannerImg ul").css({
                        width : bannerUlWidth + "px",
                        left : -1 * res.bannerImg[0].width + "px"
                    });
                    imgHtml += `<a href=""><img src="../images/${res.bannerImg[0].url}" alt=""></img></a>`; 
                    $(imgHtml).appendTo($("#bannerImg ul"));
                    
                    var iNow = 1;
                    var timer = null;
                    // 按钮切换图片
                    $("#bannerImg ol li").click(function(){
                        iNow = $(this).index() + 1;
                        tap();
                    })
                    // 鼠标悬浮暂停切换
                    $("#bannerImg").hover(function(){
                        clearInterval(timer);
                    },function(){
                        timer = setInterval(timerInner, 3000);    
                    })

                    timer = setInterval(timerInner, 3000);

                    function timerInner(){
                        iNow++;
                        tap();
                    }
                    $("#prevBanner").click(function(){
                        iNow--;
                        tap();
                    })
                    $("#nextBanner").click(function(){
                        iNow++;
                        tap();
                    })
                    // 切换图片
                    function tap(){
                        $("#bannerImg ol li").attr("class", "").eq(iNow - 1).attr("class", "active");
                        if(iNow == $("#bannerImg ol li").size() + 1){
                            $("#bannerImg ol li").eq(0).attr("class", "active");
                        }else if(iNow == 0){
                            $("#bannerImg ol li").eq($("#bannerImg ol li").size()).attr("class", "active");
                        }

                        $("#bannerImg ul").stop().animate({
                            left: -1 * iNow * res.bannerImg[0].width
                        }, 500, function(){
                            if(iNow == $("#bannerImg ol li").size() + 1){
                                $("#bannerImg ul").css("left", -1 * res.bannerImg[0].width);
                                iNow = 1;
                            }else if(iNow == 0){
                                $("#bannerImg ul").css("left", -1 * res.bannerImg[0].width * ($("#bannerImg ol li").size()));
                                iNow = $("#bannerImg ol li").size();
                            }
                        })
                    }
                    // 二维码
                    $(`<img src="../images/${res.codeImg.url}" alt="">`).appendTo($("#codeImg"));
                },
                error: function (msg) {
                    alert(msg);
                }
            })

            $("#bannerImg").hover(function(){
                $("#prevBanner").stop().animate({left : "0px"})
                $("#nextBanner").stop().animate({right : "0px"})
            }, function(){
                $("#prevBanner").stop().animate({left : "-34px"})
                $("#nextBanner").stop().animate({right : "-34px"})
            })
            
            // 上部商品区
            $.ajax({
                type : "GET",
                url : "../json/topProduct.json",
                success : function(res){
                    $(`<img style='height:${res.promise.height};width:${res.promise.width}' src="../images/${res.promise.url}" alt="">`).appendTo($(".topProduct .promise"));
                    var productsHtml = "";
                    // 全球必买
                    $(`<img style='height:${res.choice.title.height};width:${res.choice.title.width}' src="../images/${res.choice.title.url}" alt="">`).appendTo($("#topProduct .model1 .title"));
                    for(var i = 0; i < res.choice.product.length; i++){
                        productsHtml += `<a href="">
                                            <dl title='${res.choice.product[i].desc}'>
                                                <dt>
                                                    <img style='height:${res.choice.product[i].height};width:${res.choice.product[i].width}' src="../images/${res.choice.product[i].url}" alt="">
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
                    $(`<img style='height:${res.superBrand.height};width:${res.superBrand.width}' src="../images/${res.superBrand.url}" alt="">`).appendTo($("#topProduct .model2 .title"));

                },
                error : function(msg){
                    alert(msg);
                }
            })

            $.ajax({
                type : "GET",
                url : "../json/products.json",
                success : function(res){
                    var productsHtml = "";
                    // alert(res.length);
                    for(var i = 0; i < res.length; i++){
                        productsHtml += `
                        <div class="productBox">
                            <div class="productTitle">
                                <a href=""><img src="../images/${res[i].title.url}" alt=""></a>
                            </div>
                            <div class="product">
                                <div class="hot">
                                    <h4>最热HOT</h4>
                                    <a href="">补水</a>
                                </div>
                                <div class="title">
                                    <img src="../images/album-panel1.png" alt="">
                                    <div class="detail">
                                        <h2>美容护肤专区</h2>
                                        <p>查看更多&gt;</p>
                                    </div>
                                </div>
                                <div class="pro">
                                    <dl title="迪奥粉漾变色唇膏">
                                        <dt>
                                            <img src="../images/skin&bodyCare_02.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>迪奥粉漾变色唇膏</p>
                                            <span>
                                                <em>￥259</em>
                                                <i>￥300</i>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl title="迪奥粉漾变色唇膏">
                                        <dt>
                                            <img src="../images/skin&bodyCare_02.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>迪奥粉漾变色唇膏</p>
                                            <span>
                                                <em>￥259</em>
                                                <i>￥300</i>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl title="迪奥粉漾变色唇膏">
                                        <dt>
                                            <img src="../images/skin&bodyCare_02.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>迪奥粉漾变色唇膏</p>
                                            <span>
                                                <em>￥259</em>
                                                <i>￥300</i>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl title="迪奥粉漾变色唇膏">
                                        <dt>
                                            <img src="../images/skin&bodyCare_02.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>迪奥粉漾变色唇膏</p>
                                            <span>
                                                <em>￥259</em>
                                                <i>￥300</i>
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl title="迪奥粉漾变色唇膏">
                                        <dt>
                                            <img src="../images/skin&bodyCare_02.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>迪奥粉漾变色唇膏</p>
                                            <span>
                                                <em>￥259</em>
                                                <i>￥300</i>
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="logo">
                                    <h3>
                                        <b>BRAND</b>
                                        <strong>热卖品牌</strong>
                                    </h3>
                                    <dl title="日本知名化妆品牌">
                                        <dt>
                                            <img src="../images/skin&bodyCare_logo_01.jpg" alt="">
                                        </dt>
                                        <dd>
                                            <p>日本知名化妆品牌</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                    // alert(productsHtml);
                    $(productsHtml).appendTo($("#content"));
                },
                error : function(msg){
                    alert(msg);
                }
            })
        })
    }
    return {
        index: main
    }
})