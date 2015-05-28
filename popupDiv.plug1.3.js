(function ($) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = Domain.cdnHost.cdn1+"/Public/Popuplayer/styles/popupDiv.css";
    document.getElementsByTagName("head")[0].appendChild(link);
  
    var maskHtml = "<div id='popupMask' class='popupMask'></div>";  

    $.popupDiv = {
        popAlert: function (option) {
            var opts = $.extend({}, $.popupDiv.defaults, option),
			html = "<div id='popupDiv' class='popAlert'>" +
						"<div class='popupDivTitle' style='background-color:" + opts.bgColor + ";'><span style='float:left'>" + opts.title + "</span><span class='close' style=''>&times</span><div style='clear:both'></div></div>" +
						"<p class='popupDivT' style='color:" + opts.fontColor + ";'>" + opts.text + "</p>" +
						"<div style='height:25px;line-height:25px;margin:0 auto;text-align:center;padding:0px 10px 5px;;'>" +
							"<a id='popupEnter' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";float:right;text-decoration:none;color:#fff;font-size:13px;width:75px;margin-left:20px;font-weight:bold;height:24px;'>确定</a>" +
						"</div>" +
				   "</div>";
            ani(html, opts);
            drag(".popupDivTitle");
            $(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
                opts.callback();
            });
            removeDiv(opts);
        },
        popConfirm: function (option) {
            var opts = $.extend({}, $.popupDiv.defaults, option),
			html = "<div id='popupDiv' class='popConfirm' >" +
						"<div class='popupDivTitle' ><span style='float:left'>" + opts.title + "</span><span class='close' style=''>&times</span><div style='clear:both'></div></div>" +
						"<p class='popupDivT' style='color:" + opts.fontColor + ";'>" + opts.text + "</p>" +
						"<div class='btnDiv'>" +
							"<a id='popupCancel' href='javascript:void(0);'>取消</a><a id='popupEnter' href='javascript:void(0);'>确定</a>" +
						"</div>" +
				   "</div>";
            ani(html, opts);
            drag(".popupDivTitle");
            $(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
                opts.callback();
            });
            removeDiv(opts);
        },
        popLogin: function (option) {
            var opts = $.extend({}, $.popupDiv.defaults, option);
            opts.html = $("#" + opts.formId).html();
            var html = "<div id='popupDiv' class='popLogin' >" +
						"<div class='popupDivTitle' style='color:" + opts.fontColor + "'><span class='title_text'>" + opts.title + "</span><span class='close'>&times</span><div style='clear:both'></div></div>" +
						'<div id="form" style="color:' + opts.fontColor + '">' +
							opts.html +
						'</div>' +
                        "<div class='otherDiv'>" +
							"<a class='reg' href='" + opts.regURL + "'  target='blank'>还没注册</a><a class='find' href='" + opts.findPwURL + "'  target='blank'>忘记密码</a>" +
						"</div>" +
						"<div class='btnDiv'>" +
							"<a id='popupEnter' href='javascript:void(0);' style=''>登　录</a>" +
						"</div>" +
					'</div>';
            ani(html, opts);
            drag(".popupDivTitle");
            $(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
                opts.callback();
            });
            cl(opts);
        },
        popSetTime: function (option) {
            var opts = $.extend({ times: 10, title: "消息" }, $.popupDiv.defaults, option);
            opts.bgColor = "#1171BB";
            opts.fontColor = "#1171BB";
            var src = opts.path + "images/tinyIcon.png",
                  bgsrc = opts.path + "images/tinyBg.png",
                   p = "";
            if (opts.type == 1) {
                p = "10px -20px";
                opts.bgColor = "#E3070E";
                opts.fontColor = "#E3070E";
            } else if (opts.type == 2) {
                p = "10px 14px";
            }
            var html;
            if (opts.tiny == true) {
                html = "<div id='popupDiv' class='popSetTimeTiny' style='height:50px;width:auto;z-index:10000;background:#FFF;border:1px solid #EAEAEA;box-shadow: 0px 0px 1px rgba(0,0,0,.1);'>" +
                    "<p style='height:50px;line-height:50px;font-size:14px;font-family:Microsoft Yahei;min-width:70px;color:#666;background:url(" + src + ") no-repeat "+p+" transparent;padding-left:40px;color#666;padding-right:10px'>" + opts.text + "</p>" +
                    "<div style='text-align:center;'>" +
                    "</div>" +
                    "</div>";
            } else {
                html = "<div id='popupDiv' class='popSetTime' >" +
                    "<div class='popupDivTitle' style='background-color:" + opts.bgColor + ";'><span style='float:left'>" + opts.title + "</span><span class='close'>&times</span><div style='clear:both'></div></div>" +
                    "<p class='popupDivT' style='color:" + opts.fontColor + ";font-size:20px;height:60px;line-height:60px;padding-right:10px;'><img src=" + src + " style='vertical-align: middle;' />" + opts.text + "</p>" +
                    "<div style='text-align:center;'>" +
                    "<p class='SetTimeHint' style=''>该提示框将在<span id='timer' style='padding:0 5px;color:" + opts.fontColor + "'>" + opts.times + "</span>秒后自动关闭，或点击右上角</p>" +
                    "</div>" +
                    "</div>";
            }
            //removeDiv(opts);
            ani(html, opts);
            //$(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
               // opts.callback();
            //});
            var timer = setInterval(function () {
                opts.times--;
                $('#timer').text(opts.times);
                if (opts.times <= 0) {
                    clearInterval(timer);
                    if (opts.mask == true) {
                        $('.popSetTimeTiny,#popupMask').fadeOut("fast", function () {
                            $(this).remove();
                            opts.callback();
                        });
                    } else {
                        $('.popSetTimeTiny').fadeOut("fast", function () {
                            $(this).remove();
                            opts.callback();
                        });
                    }
                }
            }, 1000);
        },
        popSelf: function (option) {
            var opts = $.extend({ times: 10 }, $.popupDiv.defaults, option);
            var html = "<div id='popupDiv'>" +
						"<div class='popupDivTitle' style='background-color:" + opts.bgColor + ";'><span style='float:left'>" + opts.title + "</span><span class='close'>&times</span><div style='clear:both'></div></div>" +
						"<p class='popupDivT' style='color:" + opts.fontColor + ";'>" + opts.text + "</p>" +
						"<div class='btnDiv' >";
            for (var i = 0; i < opts.btn.length; i++) {
                html += "<a id='popupBtn" + i + "' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";'>" + opts.btn[i].name + "</a>";
                $(document).on("click", "#popupBtn" + i, closure(i, opts));
            }
            html += "</div></div>";
            $(document).on("click", ".close", function () {
                $('#popupDiv,#popupMask').remove();
                if (opts.scrollHid == true) {
                    $("body").css("overflow", "auto");
                }
            });
            ani(html, opts);
            drag(".popupDivTitle");
        },
        popEditSelf: function (option) {
            var opts = $.extend({}, $.popupDiv.defaults, option);
            var html = "<div id='popupDiv' class='popEdit' style='border:2px solid " + opts.bgColor + ";width:430px;margin-left:-215px;' >" +
						"<div class='popupDivTitle' style='background-color:" + opts.bgColor + ";'><span style='float:left'>" + opts.title + "</span><span class='close'>&times</span><div style='clear:both'></div></div>";
            var htmlself = $("#" + opts.htmlId).html();
            if (opts.type == 0) {
                html += "<div class='popEditMain'>" +
								htmlself +
								"<a id='popupEnter' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";'>" + opts.btnName + "</a>" +
								"<p class='des'>" + opts.text + "</p>" +
							"</div>" +
						"</div>";
            } else if (opts.type == 1) {
                html += "<div class='popEditMain popEditMain1 clearfix'>" + htmlself +
								"<a id='popupEnter' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";'>添加视频</a>" +
								"</div>" +
							"</div>";
            }
            ani(html, opts);
            $(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
                opts.callback();
            });
            drag(".popupDivTitle");
            cl(opts, htmlself);
        },
        popEdit: function (option) {
            var opts = $.extend({}, $.popupDiv.defaults, option);
            var html = "<div id='popupDiv' class='popEdit' style='height:113px;border:1px solid ;" + opts.bgColor + ";width:430px;margin-left:-215px;' >" +
						"<div class='popupDivTitle' style='background-color:" + opts.bgColor + ";'><span style='float:left'>" + opts.title + "</span><span class='close'>&times</span><div style='clear:both'></div></div>";
            if (opts.type == 0) {
                html += "<div class='popEditMain'>" +
								"<input type='text'  />" +
								"<a id='popupEnter' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";'>添加相册</a>" +
								"<p class='des'>在这里输入你相册的名称</p>" +
							"</div>" +
						"</div>";
            } else if (opts.type == 1) {
                html += "<div class='popEditMain'>" +
									"<label>分类名称</label><input type='text'  />" +
									"<label>分类描述</label><textarea></textarea>" +
									"<a id='popupEnter' href='javascript:void(0);' style='background-color:" + opts.bgColor + ";'>添加相册</a>" +
								"</div>" +
							"</div>";
            }
            ani(html, opts);
            $(document).off("click", "#popupEnter").on("click", "#popupEnter", function () {
                opts.callback();
            });
            drag(".popupDivTitle");
            removeDiv(opts);
        },
        popFrame: function (option) {
            var opts = $.extend({ width: "400px" }, $.popupDiv.defaults, option);
            var html = "<div id='popupDiv' style='width:" + opts.width + ";' >"
            var htmlself = $("#" + opts.htmlId).html() || opts.htmlText;
            html += htmlself + "</div>";
            ani(html, opts);
            if (opts.dragObj) drag(opts.dragObj);
            cl(opts, htmlself);
        }
    };

    $.popupDiv.defaults = {
        type: 0,
        animate: 0,
        mask: false,
        maskClose:false,
        fontColor: "#666",
        btnColor: "#005EAB",
        bgColor: "#3e96c4",
        path: "/Scripts/Plugins/Popuplayer/",
        callback: function () { },
        open: function () { },
        afterClose: function () { }
    };
    $.popupDiv.closeDiv = function() {
        $("#popupDiv,#popupMask").remove();
        $("body").css("overflow", "auto");
    };
    $.popupDiv.rePos = function(){
        var obj = $("#popupDiv");
        var ML = -(obj.width() / 2) + "px";
        var MT = -(obj.height() / 2) + "px";
        obj.css({ "marginLeft": ML, "marginTop": MT });
    }
    //动画选择方法
    var ani = function (html, opts) {
        /*if ($("#popupDiv").length > 0) {
	        return;
	    }*/
        $("body").prepend(html);
        if (opts.scrollHid == true) {
            $("body").css("overflow", "hidden");
        }
        $.popupDiv.rePos();
        if (opts.mask == true) {
            $("body").append(maskHtml);
        }
        switch (opts.animate) {
            case (0):
                $("#popupDiv").css("display", "block");
                break;
            case (1):
                $("#popupDiv").fadeIn(300);
                break;
            case (2):
                $("#popupDiv").slideDown(200);
                break;
            case (3):
                $("#popupDiv").show(200);
                break;
            case (4):
                $("#popupDiv").css({ "left": "0px", "display": "block", "opacity": "0" }).animate({ left: "50%", opacity: "1" }, 500);
                break;
        }
        $(document).ready(opts.open());
    };
    var removeDiv = function (opts, that) {
        $(document).on("click", "#popupCancel,.close", function () {
            $(this).parents('#popupDiv').remove();
            $("#popupMask").remove();
            if (opts.scrollHid == true) {
                $("body").css("overflow", "auto");
            }
            $(document).off("click", arguments.callee).off(".maskClose");
        });
        $(document).on("click", "#popupEnter", function () {
            $(this).parents('#popupDiv').remove();
            $("#popupMask").remove();
            if (opts.scrollHid == true) {
                $("body").css("overflow", "auto");
            }
            $(document).off("click", arguments.callee);
        });
        if (opts.afterClose) { opts.afterClose() };
    };
    var cl = function (opts, htmlself) {
        $(document).on("click", "#popupCancel,.close", function () {
            $(this).parents('#popupDiv').remove();
            $("#popupMask").remove();
            $("#" + opts.htmlId).html(htmlself);
            if (opts.scrollHid == true) {
                $("body").css("overflow", "auto");
            };
            $(document).off("click", arguments.callee).off(".maskClose");
        });
        if (opts.maskClose) {
            $(document).on("click.maskClose", function (e) {
                if (!$(e.target).parents("#popupDiv").length > 0) {
                    $("#popupDiv,#popupMask").remove();
                    $(document).off(".maskClose");
                }
            });
        }
        if (opts.afterClose) { opts.afterClose() };
    };
    var closure = function (i, opts) {
        return function (e) {
            opts.btn[i].callback();
        };
    };


})(jQuery);
var drag = function (o) {
    $(document).on("mousedown", o, function (e) {
        $(this).css("cursor", "move");
        var that = $(this).parents("#popupDiv");
        //e.preventDefault();
        var width = that.width();
        var height = that.height();
        that.x = e.clientX - that.offset().left;
        that.y = e.clientY - that.offset().top;
        $(document).on("mousemove", function (e) {
            var widthS = width / 2,
            heightS = height / 2,
            x = e.clientX - that.x + (widthS),
            y = 0;
            if (!$.support.cssFloat && !window.XMLHttpRequest) {
                y = e.clientY - that.y + heightS + $(document).scrollTop();
            } else {
                y = e.clientY - that.y + heightS - $(document).scrollTop();
            }
            if (x < widthS) { x = widthS } else if (x + widthS > $(window).width()) { x = $(window).width() - widthS; };
            if (y < heightS) { y = heightS } else if (y + heightS > $(window).height()) { y = $(window).height() - heightS };
            that.css({
                left: x + "px",
                top: y + "px"
            });

            return false;
        });
        $(document).on("mouseup", function (e) {
            $(this).css("cursor", "default");
            $(document).off("mousemove").off("mouseup");
        });
    });
};