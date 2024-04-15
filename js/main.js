var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

$(document).ready(function () {

	// 获取一言数据
	fetch('https://v1.hitokoto.cn').then(function (res) {
		return res.json();
	}).then(function (e) {
		$('#description').html(e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
	}).catch(function (err) {
		console.error(err);
	})


	// var url = 'https://query.yahooapis.com/v1/public/yql' + 
	// '?q=' + encodeURIComponent('select * from json where url=@url') +
	// '&url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8') +
	// '&format=json&callback=?';

	/**
	 * 获取Bing壁纸
	 * 
	 */
	// URL被设置为需要请求的新Bing图片地址
	var url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
	
	// 从 sessionStorage 中取出储存的图片URLs
	var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls")) || [];
	
	// 从 sessionStorage 中取出当前所在的图片索引
	var index = parseInt(sessionStorage.getItem("index"));
	
	if (isNaN(index)) {
	    index = 0;
	}
	
	// 获取面板的jQuery对象
	var $panel = $('#panel');
	
	// 从服务器获取数据
	$.get(url, function (result) {
	    var images = result.images;
	
	    if (images && images.length > 0) {
	        for (let i = 0; i < images.length; i++) {
	            // 记录每一张图片的URL
	            const item = images[i];
	            imgUrls.push(item.url);
	        }
	
	        var imgUrl = imgUrls[index];
	        var url = "https://www.bing.com" + imgUrl;
	
	        // 设置面板背景样式
	        $panel.css("background", "url('" + url + "') center center no-repeat #666");
	        $panel.css("background-size", "cover");  
	    }
	
	    // 设置图片URLs和当前索引到sessionStorage
	    sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
	});
	
	// 如果存在图片URLs，检查索引，循环使用
	if (imgUrls.length > 0){
	    index = (index >= imgUrls.length) ? 0 : index + 1;
	
	    // 获取当前索引对应的图片URL
	    var imgUrl = imgUrls[index];
	    var url = "https://www.bing.com" + imgUrl;
	
	    // 设置面板背景样式
	    $panel.css("background", "url('" + url + "') center center no-repeat #666");
	    $panel.css("background-size", "cover");
	
	    // 设置当前索引到sessionStorage
	    sessionStorage.setItem("index", index);
	}

	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});

	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});

$('.btn-mobile-menu__icon').click(function () {
	if ($('.navigation-wrapper').css('display') == "block") {
		$('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
			$('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});
		$('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	} else {
		$('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	}
	$('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-ngleup animated fadeIn');
});
