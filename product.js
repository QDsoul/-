define(["jquery", "jquery-cookie"], function ($) {
    function main() {
        $(function () {

            // 获取商品名称

            var proUrlIndex = location.href.indexOf("?");
            var proUrl = location.href.substring(proUrlIndex + 1);
            var bottomImg = '';

            // 获取商品数据
            $.ajax({
                type: "GET",
                url: "../json/product.json",
                success: function (res) {

                    // toProNum();

                    for (var i = 0; i < res[proUrl].show.length; i++) {
                        bottomImg += `<img src="../images/product/${res[proUrl].show[i][0]}" alt="">`;
                    }

                    var metatit = '';
                    if (res[proUrl].metatit.length != 0) {
                        var metatitName = res[proUrl].metatit[0];
                        for (var j = 1; j < res[proUrl].metatit.length; j++) {
                            if (j == 1) {
                                metatit += `
                                            <li class="active">
                                                <img title='${res[proUrl].metatit[j][3]}' src="../images/product/${res[proUrl].metatit[j][0]}" alt="">
                                                <span><i></i></span>
                                            </li>`;
                            } else {
                                metatit += `
                                            <li>
                                            <img title='${res[proUrl].metatit[j][3]}' src="../images/product/${res[proUrl].metatit[j][0]}" alt="">
                                                <span></span>
                                            </li>`;
                            }

                        }
                    }


                    var soleType = '';
                    for (var k = 1; k < res[proUrl].soleType.length; k++) {
                        if (k == 1) {
                            soleType += `
                            <li class="active">
                                <b>${res[proUrl].soleType[k]}</b>
                                <span><i></i></span>
                            </li>`;
                        } else {
                            soleType += `
                            <li>
                                <b>${res[proUrl].soleType[k]}</b>
                                <span></span>
                            </li>`;
                        }
                    }

                    var skuRight = '';
                    for (var l in res) {
                        if (l != proUrl) {
                            skuRight += `
                            <li>
                                <a href="product.html?${l}" title="${res[l].title}">
                                    <img src="../images/product/${res[l].show[0][1]}" alt="">
                                    <p>￥${res[l].price}</p>
                                </a>
                            </li>`;
                        }
                    }

                    var html = `
                    <div class="detail">
                        <div class="left">
                            <div class="productImg">
                                <a href=""><img src="../images/product/${res[proUrl].show[0][1]}" alt=""></a>
                                <div class="magnifier"></div>
                                <div class="magnifierImg">
                                    <img src="../images/product/${res[proUrl].show[0][2]}" alt="">
                                </div>
                            </div>
                            <div class="productImg_t">
                                ${bottomImg}
                            </div>
                            <div class="operation">
                                <a href=""><i>&#xe61b;分享</i></a>
                                <a href=""><em>&#xe546;收藏</em></a>
                            </div>
                        </div>
                        <div class="right">
                            <div class="productInfo">
                                <h4>${res[proUrl].title}</h4>
                                <p>${res[proUrl].des}</p>
                                <div class="price">
                                    <b>价格</b>
                                    <strong>￥${res[proUrl].price}</strong>
                                </div>
                                <div class="freight">
                                    <b>运费</b>
                                </div>
                                <div class="evaluation">
                                    <a href="">累计评价<strong>${res[proUrl].evaluate}</strong></a>
                                </div>
                                <div class="division">
                                    <dl class="proDivision">
                                        <dt>${metatitName}</dt>
                                        <dd>
                                            <ul>
                                                ${metatit}
                                            </ul>
                                        </dd>
                                    </dl>
                                    <dl class="soleType">
                                        <dt>${res[proUrl].soleType[0]}</dt>
                                        <dd>
                                            <ol>
                                                ${soleType}
                                            </ol>
                                        </dd>
                                    </dl>
                                    <dl class="qtyBox">
                                        <dt>数量</dt>
                                        <dd>
                                            <input class="qty" type="text" value="1">
                                            <div class="num">
                                                <span class="addQty">&and;</span>
                                                <span class="reduceQty">&or;</span>
                                            </div>
                                            件
                                        </dd>
                                    </dl>
                                    <input id="toBug" type="button" value="立即购买">
                                    <input id="toAddShopCar" type="button" value="加入购物车">
                                    <div class="server">
                                        <a href="">服务承诺</a>
                                        <a href="">正品保障</a>
                                        <a href="">30售后无忧</a>
                                        <a href="">赠运费险</a>
                                        <span>支付方式<em>&or;</em></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="skuRight">
                        <span>
                            <h4>看了又看</h4>
                        </span>
                        <ul>
                            ${skuRight}
                        </ul>
                    </div>
                    `
                    $(html).appendTo($(".detailBox"));
                    if (!metatitName) {
                        $(".proDivision").remove();
                    }

                    

                    var proInfo = '';
                    for (i = 1; i < res[proUrl].info.length; i++) {
                        proInfo += `<li>${res[proUrl].info[i]}</li>`;
                    }

                    var htmlBottom = `
                    <div class="tm_layout">
                        <img src="../images/product/tm_layout.png" alt="">
                    </div>
                    <div class="proInfo">
                        <div class="left">
                            <h4><a href="">${res[proUrl].shops.name}</a></h4>
                            <p>${res[proUrl].shops.title}</p>
                            <div class="score">
                                <dl>
                                    <dt>描述</dt>
                                    <dd>${res[proUrl].shops.score.des}</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>${res[proUrl].shops.score.server}</dd>
                                </dl>
                                <dl>
                                    <dt>物流</dt>
                                    <dd>${res[proUrl].shops.score.log}</dd>
                                </dl>
                            </div>
                            <div class="goShop">
                                <input type="text" value="进店逛逛">
                                <input type="text" value="收藏店铺">
                            </div>
                        </div>
                        <div class="right">
                            <div class="top">
                                <ul>
                                    <li>商品详情</li>
                                    <li>累计评价${res[proUrl].evaluate}</li>
                                    <li>服务详情</li>
                                </ul>
                            </div>
                            <div class="bottom">
                                <h3>${res[proUrl].info[0]}</h3>
                                <p>产品参数</p>
                                <ol>
                                    ${proInfo}
                                </ol>
                            </div>
                        </div>
                    </div>`;

                    $(htmlBottom).appendTo($(".detailBox"));
                    if ($(".proInfo .right").height() > $(".proInfo .left").height()) {
                        $(".proInfo").css("height", $(".proInfo .right").height());
                    } else {
                        $(".proInfo").css("height", $(".proInfo .left").height());
                    }

                    // 显示放大镜
                    $(".productImg img").eq(0).mouseover(function (e) {
                        $(".productImg .magnifier").css("display", "block");
                        $(".productImg .magnifierImg").css("display", "block");
                        $(document).mousemove(function (e) {
                            var clientX = e.pageX - $(".productImg .magnifier").width() / 2 - $(".productImg img").eq(0).offset().left;
                            var clientY = e.pageY - $(".productImg .magnifier").height() / 2 - $(".productImg img").eq(0).offset().top;
                            if (clientX <= 0) {
                                clientX = 0;
                            } else if (clientX >= $(".productImg img").eq(0).width() - $(".productImg .magnifier").width()) {
                                clientX = $(".productImg img").eq(0).width() - $(".productImg .magnifier").width();
                            }
                            if (clientY <= 0) {
                                clientY = 0;
                            } else if (clientY >= $(".productImg img").eq(0).height() - $(".productImg .magnifier").height()) {
                                clientY = $(".productImg img").eq(0).height() - $(".productImg .magnifier").height();
                            }
                            $(".productImg .magnifier").css({
                                left: clientX,
                                top: clientY
                            })
                        })
                    });
                    // 隐藏放大镜和大图片
                    $(".productImg .magnifier").mouseout(function () {
                        $(this).css("display", "none");
                        $(".productImg .magnifierImg").css("display", "none");
                    }).mousemove(function () {
                        var per = $(".productImg .magnifierImg img").width() / $(".productImg img").eq(0).width()
                        $(".productImg .magnifierImg img").css({
                            left: $(".productImg .magnifier").position().left * per * -1,
                            top: $(".productImg .magnifier").position().top * per * -1
                        })
                    });
                    // 切换图片
                    // 下方
                    $(".productImg_t img").mouseover(function () {
                        $(".productImg_t img").attr("class", "");
                        $(this).attr("class", "active");
                    }).on("click, mouseover", function () {
                        var newSrc = $(this).attr("src").replace("_t.jpg", ".jpg");
                        var newSrc_m = $(this).attr("src").replace("_t.jpg", "_m.jpg");
                        $(".productImg img").attr("src", newSrc);
                        $(".productImg .magnifierImg img").attr("src", newSrc_m);
                    });
                    // 分类
                    $(".proDivision dd li").click(function () {
                        $(".proDivision dd li span").html("");
                        $(this).find("span").html("<i></i>");
                        $(".proDivision dd li").attr("class", "");
                        $(this).attr("class", "active");
                        var newSrc = $(this).find("img").attr("src").replace("_t.jpg", ".jpg");
                        var newSrc_m = $(this).find("img").attr("src").replace("_t.jpg", "_m.jpg");
                        $(".productImg img").attr("src", newSrc);
                        $(".productImg .magnifierImg img").attr("src", newSrc_m);
                    });
                    $(".soleType dd ol li").click(function () {
                        $(".soleType dd ol li span").html("");
                        $(this).find("span").html("<i></i>");
                        $(".soleType dd ol li").attr("class", "");
                        $(this).attr("class", "active");
                    })
                    // 增加数量
                    $(".addQty").click(function () {
                        var qty = parseInt($(".qty").val()) + 1;
                        $(".qty").val(qty);
                    });
                    $(".reduceQty").click(function () {
                        if ($(".qty").val() > 1) {
                            var qty = parseInt($(".qty").val()) - 1;
                            $(".qty").val(qty);
                        }
                    })

                },
                error: function (msg) {
                    alert("error : " + msg);
                }
            })

        })
    }
    return {
        product : main
    }
})