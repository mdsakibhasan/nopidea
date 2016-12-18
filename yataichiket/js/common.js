//rollover
$(function() {
	$("._rollOver").not('[src*="'+ "_on" +'."]').each(function(){
		var src = $(this).attr("src");
		var src_on = src.substr(0, src.lastIndexOf('.'))+ "_on"+ src.substring(src.lastIndexOf('.'));
		$(this).hover(function(){
			$(this).attr("src",src_on);
		},
		function(){
			$(this).attr("src",src);
		});
	});
});

//go top
$(function(){
	$("#footerArea").click(function(){
		$("html, body").animate({scrollTop:0},300);
		return false;
	});
});


$(function(){
    $("#displayArea li a").hover(function(){
        $(this).children(".btn").css({background:"#9c0000"});
    },function(){
        $(this).children(".btn").css({background:"#c90000"});
    });
});

//shop detail
$(function(){
	$("#displayArea li a").click(function(){
		var _href = $(this).attr("href");
		var _num = $("#displayArea li a").index(this);
		var _len = $("#displayArea li a").length;
		var _height = $("body").height()+60;
		var _wheight = $(window).height();
		var _wyposition = document.documentElement.scrollTop || document.body.scrollTop;
		var _top = (((_wyposition + _wheight) - _wyposition)/2) + _wyposition - 80;
		$("#bglayer").height(_height);
		$("#bglayer").fadeTo(300,0.7,function(){
			rewite(_href);
			$("#cblock").css({top:_top+"px"}).fadeIn(300,function(){
				$("#cblock .left").click(function(){
					_num = _num - 1;
					if(_num<0){
						_num = _len-1;
					}
					_href = $("#displayArea li a").eq(_num).attr("href");
					rewite(_href);
				});
				$("#cblock .right").click(function(){
					_num = _num + 1;
					if(_num>_len-1){
						_num = 0;
					}
					_href = $("#displayArea li a").eq(_num).attr("href");
					rewite(_href);
				});
			});

			//rewite function
			function rewite(_href){
				$("#image1").attr("src",jsondata[_href].image);
				$("#cblock .title").html(jsondata[_href].title);
				$("#cblock .catchcopy").html(jsondata[_href].catchcopy);
				$("#cblock .detail").html(jsondata[_href].detail);
				$("#cblock .menu").html(jsondata[_href].menu);
				$("#cblock .time").html(jsondata[_href].time);
				if (jsondata[_href].image2) {
					if ($("#image2").size()){
						$("#image2").attr("src",jsondata[_href].image2);
					} else {
						$("#cblock .image img").after('<img id="image2" src="' + jsondata[_href].image2 + '" alt="">');
					}
				} else {
					$("#image2").remove();
				}
			}
		});
		return false;
	});

	$("#bglayer,#cblock .close").click(function(){
		$("#bglayer").fadeOut(300);
		$("#cblock").fadeOut(300);
		return false;
	});
});