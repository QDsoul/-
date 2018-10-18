define(["product", "jquery", "jquery-cookie"], function (product, $) {
    function main() {
        $(function () {

            toProNum();
            var proUrlIndex = location.href.indexOf("?");
            var proUrl = location.href.substring(proUrlIndex + 1);
            //加入购物车
            $(".detailBox").on("click", "#toAddShopCar", function () {
                if ($.cookie("username")) {
                    var division = $(".proDivision dd ul li.active img").attr("title");
                    var soleType = $(".soleType dd ol li.active b").html();
                    var shopName = $(".proInfo .left h4 a").html();
                    if (division) {
                        var proImg = $(".proDivision dd ul li.active img").attr("src");
                    } else {
                        var proImg = $(".productImg_t img").eq(0).attr("src");
                    }

                    if (!$.cookie("products")) {
                        var qty = parseInt($(".qtyBox .qty").val());
                        $.cookie("products", `[{name:'${proUrl}', division:'${division}', soleType:'${soleType}', proImg:'${proImg}', shopName:'${shopName}', num:${qty}}]`, {
                            expires: 7
                        });
                        toProNum();
                    } else {
                        var strPro = $.cookie("products");
                        var arrPro = eval(strPro);
                        var isHas = false;
                        for (var i = 0; i < arrPro.length; i++) {
                            if (proUrl == arrPro[i].name && division == arrPro[i].division && soleType == arrPro[i].soleType) {
                                arrPro[i].num += parseInt($(".qtyBox .qty").val());
                                var newStrPro = JSON.stringify(arrPro);
                                $.cookie("products", newStrPro, {
                                    expries: 7
                                });
                                isHas = true;
                            }
                        }
                        if (!isHas) {
                            var qty = parseInt($(".qtyBox .qty").val());
                            var objPro = {
                                name: proUrl,
                                division: division,
                                soleType: soleType,
                                proImg: proImg,
                                shopName: shopName,
                                num: qty
                            };
                            arrPro.push(objPro)
                            var newStrPro = JSON.stringify(arrPro);
                            $.cookie("products", newStrPro, {
                                expires: 7
                            });
                        }
                        toProNum();

                    }
                } else {
                    $(".shopCarLogin").css("display", "block");
                }
            })

            $(".rightShopCar").click(function () {
                $(".proList").remove();
            })

            function toProNum() {
                if ($.cookie("products")) {
                    var proNum = 0;
                    var pro = $.cookie("products");
                    var pro = eval(pro);
                    for (var j = 0; j < pro.length; j++) {
                        proNum += parseInt(pro[j].num);
                    }
                    $(".rightShopCar .proNum").html(proNum);
                }
            }


            if ($.cookie("username")) {

                $(".rightShopCar").click(function () {
                    $.ajax({
                        type: "GET",
                        url: "../json/product.json",
                        success: function (res) {
                            var proHtml = "";

                            var arrPro = eval($.cookie("products"));
                            for (var i = 0; i < arrPro.length; i++) {
                                var isHasShop = false;
                                if ($("#shoppingCar dl").size() == 0) {
                                    if (arrPro[i].division == "undefined" || !arrPro[i].division) {
                                        arrPro[i].division = "";
                                    }
                                    proHtml = `
                                    <dl class='proList'>
                                        <dt>
                                            <input type="checkbox">
                                            <strong>${arrPro[i].shopName}</strong>
                                            <b>￥<i>0.00</i></b>
                                        </dt>
                            
                                        <dd>
                                            <div class="proList">
                                                <div class="deletePro">x</div>
                                                <input type="checkbox">
                                                <img src="${arrPro[i].proImg}" alt="">
                                                <span>
                                                    <p>${arrPro[i].division}</p>
                                                    <p>${arrPro[i].soleType}</p>
                                                </span>
                                                <div class="qty">
                                                    <div class="reduceQty">-</div>
                                                    <em>${arrPro[i].num}</em>
                                                    <div class="addQty">+</div>
                                                </div>
                                                <div class="totalOfPro">
                                                        ￥<b>${res[arrPro[i].name].price}</b>
                                                </div>
                                            </div>
                                        </dd>
                            
                                    </dl>
                                    `;
                                    $(proHtml).appendTo($("#shopCarListBox"));
                                } else {
                                    for (var j = 0; j < $("#shoppingCar dl").size(); j++) {
                                        if (arrPro[i].shopName == $("#shoppingCar dl").eq(j).find("dt strong").html()) {
                                            if (arrPro[i].division == "undefined" || !arrPro[i].division) {
                                                arrPro[i].division = "";

                                                if (arrPro[i].soleType == $(".proList p").eq(1).html() && arrPro[i].proImg == $(".proList img").attr("src")) {
                                                    var qty1 = parseInt($(".proList .qty em").html()) + parseInt(arrPro[i].num);
                                                    $(".proList .qty em").html(qty1);
                                                } else {
                                                    proHtml = `
                                                            <div class="proList">
                                                                <div class="deletePro">x</div>
                                                                <input type="checkbox">
                                                                <img src="${arrPro[i].proImg}" alt="">
                                                                <span>
                                                                    <p>${arrPro[i].division}</p>
                                                                    <p>${arrPro[i].soleType}</p>
                                                                </span>
                                                                <div class="qty">
                                                                    <div class="reduceQty">-</div>
                                                                    <em>${arrPro[i].num}</em>
                                                                    <div class="addQty">+</div>
                                                                </div>
                                                                <div class="totalOfPro">
                                                                        ￥<b>${res[arrPro[i].name].price}</b>
                                                                </div>
                                                            </div>
                                                            `;
                                                    $(proHtml).appendTo($("#shoppingCar dl").eq(j).find("dd"));
                                                }
                                            } else {
                                                if (arrPro[i].soleType == $(".proList p").eq(1).html() && arrPro[i].proImg == $(".proList img").attr("src") && arrPro[i].division == $(".proList p").eq(0).html()) {
                                                    var qty1 = parseInt($(".proList .qty em").html()) + parseInt(arrPro[i].num);
                                                    $(".proList .qty em").html(qty1);
                                                } else {
                                                    proHtml = `
                                                            <div class="proList">
                                                                <div class="deletePro">x</div>
                                                                <input type="checkbox">
                                                                <img src="${arrPro[i].proImg}" alt="">
                                                                <span>
                                                                    <p>${arrPro[i].division}</p>
                                                                    <p>${arrPro[i].soleType}</p>
                                                                </span>
                                                                <div class="qty">
                                                                    <div class="reduceQty">-</div>
                                                                    <em>${arrPro[i].num}</em>
                                                                    <div class="addQty">+</div>
                                                                </div>
                                                                <div class="totalOfPro">
                                                                        ￥<b>${res[arrPro[i].name].price}</b>
                                                                </div>
                                                            </div>
                                                            `;
                                                    $(proHtml).appendTo($("#shoppingCar dl").eq(j).find("dd"));
                                                }
                                            }
                                            // proHtml = `
                                            // <div class="proList">
                                            //     <div class="deletePro">x</div>
                                            //     <input type="checkbox">
                                            //     <img src="${arrPro[i].proImg}" alt="">
                                            //     <span>
                                            //         <p>${arrPro[i].division}</p>
                                            //         <p>${arrPro[i].soleType}</p>
                                            //     </span>
                                            //     <div class="qty">
                                            //         <div class="reduceQty">-</div>
                                            //         <em>${arrPro[i].num}</em>
                                            //         <div class="addQty">+</div>
                                            //     </div>
                                            //     <div class="totalOfPro">
                                            //             ￥<b>${res[arrPro[i].name].price}</b>
                                            //     </div>
                                            // </div>
                                            // `;
                                            // $(proHtml).appendTo($("#shoppingCar dl").eq(j).find("dd"));
                                            isHasShop = true;
                                        } else {


                                        }
                                        if (!isHasShop) {
                                            if (arrPro[i].division == "undefined" || !arrPro[i].division) {
                                                arrPro[i].division = "";
                                            }
                                            proHtml = `
                                            <dl class='proList'>
                                                <dt>
                                                    <input type="checkbox">
                                                    <strong>${arrPro[i].shopName}</strong>
                                                    <b>￥<i>0.00</i></b>
                                                </dt>
                                    
                                                <dd>
                                                    <div class="proList">
                                                        <div class="deletePro">x</div>
                                                        <input type="checkbox">
                                                        <img src="${arrPro[i].proImg}" alt="">
                                                        <span>
                                                            <p>${arrPro[i].division}</p>
                                                            <p>${arrPro[i].soleType}</p>
                                                        </span>
                                                        <div class="qty">
                                                            <div class="reduceQty">-</div>
                                                            <em>${arrPro[i].num}</em>
                                                            <div class="addQty">+</div>
                                                        </div>
                                                        <div class="totalOfPro">
                                                                ￥<b>${res[arrPro[i].name].price}</b>
                                                        </div>
                                                    </div>
                                                </dd>
                                    
                                            </dl>
                                            `;
                                            $(proHtml).appendTo($("#shopCarListBox"));
                                            break
                                        }
                                    }
                                }

                            }


                            // 购物车
                            $(".shoppingCar dl .proList").mouseenter(function () {
                                $(this).find(".reduceQty, .addQty").css("display", "block");
                                $(this).closest("dl").find(".deletePro").css("display", "block");
                            }).mouseleave(function () {
                                $(this).find(".reduceQty, .addQty").css("display", "none");
                                $(this).closest("dl").find(".deletePro").css("display", "none");
                            })

                            $(".reduceQty").click(function () {
                                var qty = $(this).closest(".qty").find("em").html();
                                if (qty > 1) {
                                    $(this).closest(".qty").find("em").html(--qty);


                                    var strPro = $.cookie("products");
                                    var arrPro = eval(strPro);
                                    var proImg1 = $(this).closest(".proList").find("img").attr("src");
                                    var division1 = $(this).closest(".proList").find("p").eq(0).html();
                                    var soleType1 = $(this).closest(".proList").find("p").eq(1).html();
                                    for (var i = 0; i < arrPro.length; i++) {
                                        if (division1) {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].division == division1 && arrPro[i].soleType == soleType1) {
                                                arrPro[i].num = $(this).closest(".qty").find("em").html();
                                            }
                                        } else {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].soleType == soleType1) {
                                                arrPro[i].num = $(this).closest(".qty").find("em").html();
                                            }
                                        }
                                    }
                                    var strPro = JSON.stringify(arrPro);
                                    $.cookie("products", strPro, {
                                        expires: 7
                                    });
                                    toProNum();
                                }


                            })

                            $(".addQty").click(function () {
                                var qty = $(this).closest(".qty").find("em").html();
                                $(this).closest(".qty").find("em").html(++qty);

                                var strPro = $.cookie("products");
                                    var arrPro = eval(strPro);
                                    var proImg1 = $(this).closest(".proList").find("img").attr("src");
                                    var division1 = $(this).closest(".proList").find("p").eq(0).html();
                                    var soleType1 = $(this).closest(".proList").find("p").eq(1).html();
                                    for (var i = 0; i < arrPro.length; i++) {
                                        if (division1) {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].division == division1 && arrPro[i].soleType == soleType1) {
                                                arrPro[i].num = $(this).closest(".qty").find("em").html();
                                            }
                                        } else {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].soleType == soleType1) {
                                                arrPro[i].num = $(this).closest(".qty").find("em").html();
                                            }
                                        }
                                    }
                                    var strPro = JSON.stringify(arrPro);
                                    $.cookie("products", strPro, {
                                        expires: 7
                                    });
                                    toProNum();
                            })

                            $(".deletePro").click(function () {


                                var strPro = $.cookie("products");
                                    var arrPro = eval(strPro);
                                    var proImg1 = $(this).closest(".proList").find("img").attr("src");
                                    var division1 = $(this).closest(".proList").find("p").eq(0).html();
                                    var soleType1 = $(this).closest(".proList").find("p").eq(1).html();
                                    for (var i = 0; i < arrPro.length; i++) {
                                        if (division1) {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].division == division1 && arrPro[i].soleType == soleType1) {
                                                arrPro.splice(i, 1);
                                            }
                                        } else {
                                            if (arrPro[i].proImg == proImg1 && arrPro[i].soleType == soleType1) {
                                                arrPro.splice(i, 1);
                                            }
                                        }
                                    }
                                    var strPro = JSON.stringify(arrPro);
                                    $.cookie("products", strPro, {
                                        expires: 7
                                    });
                                    toProNum();



                                if ($(this).closest("dl").find(".proList").size() == 1) {
                                    $(this).closest("dl").remove();
                                }
                                $(this).closest(".proList").remove();

                            })
                            $("#selectAll").click(function () {
                                if ($("#selectAll").prop("checked")) {
                                    $("dl input").prop("checked", "true");
                                } else {
                                    $("dl input").removeAttr("checked");
                                }
                            })

                            $("#shoppingCar dt input").click(function () {
                                if ($(this).prop("checked")) {
                                    $(this).closest("dl").find("dd input").prop("checked", "true");
                                } else {
                                    $(this).closest("dl").find("dd input").removeAttr("checked");
                                }
                            })

                            $("#shoppingCar input, #shoppingCar .qty div").click(function () {
                                var allTotal = 0.00;
                                var proCount = 0;
                                for (var i = 0; i < $("#shoppingCar dl").size(); i++) {
                                    var shopTotal = 0.00;
                                    for (var j = 0; j < $("#shoppingCar dl").eq(i).find(".proList").size(); j++) {
                                        if ($("#shoppingCar dl").eq(i).find(".proList").eq(j).find("input").prop("checked")) {
                                            shopTotal += parseFloat($("#shoppingCar dl").eq(i).find(".proList").eq(j).find(".totalOfPro b").html()) * $("#shoppingCar dl").eq(i).find(".proList").eq(j).find(".qty em").html();
                                            proCount += parseInt($("#shoppingCar dl").eq(i).find(".proList").eq(j).find(".qty em").html());
                                        }
                                    }
                                    $("#shoppingCar dl").eq(i).find("dt b i").html(shopTotal);
                                    allTotal += parseFloat($("#shoppingCar dl").eq(i).find("dt b i").html());
                                }
                                $("#shoppingCar span b strong").html(allTotal);
                                $("#shoppingCar span i em").html(proCount);
                                if (proCount != 0) {
                                    $("#shoppingCar .bottomTotal .total").css("backgroundColor", "#ff1655").removeAttr("disabled");
                                } else {
                                    $("#shoppingCar .bottomTotal .total").css("backgroundColor", "#666").attr("disabled", "true");
                                }
                            })
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    })
                })

            }


        })
    }

    return {
        shoppingCar: main
    }
})