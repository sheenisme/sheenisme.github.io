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

	var $panel = $('#panel');
	// /**
	//  * 获取Bing壁纸(2种方式均已经弃用)
	//  * 原先 YQL 已经无法提供服务了
	//  * 改用 JsonBird：https://bird.ioliu.cn/
	//  * 
	//  */
	// // var url = 'https://query.yahooapis.com/v1/public/yql' + 
	// // '?q=' + encodeURIComponent('select * from json where url=@url') +
	// // '&url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8') +
	// // '&format=json&callback=?';
	// var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
	// var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	// var index = sessionStorage.getItem("index");
	// if (imgUrls == null) {
	// 	imgUrls = new Array();
	// 	index = 0;
	// 	$.get(url, function (result) {
	// 		images = result.images;
	// 		for (let i = 0; i < images.length; i++) {
	// 			const item = images[i];
	// 			imgUrls.push(item.url);
	// 		}
	// 		var imgUrl = imgUrls[index];
	// 		var url = "https://www.bing.com" + imgUrl;
	// 		$panel.css("background", "url('" + url + "') center center no-repeat #666");
	// 		$panel.css("background-size", "cover");
	// 		sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
	// 		sessionStorage.setItem("index", index);
	// 	});
	// } else {
	// 	if (index == 7)
	// 		index = 0;
	// 	else
	// 		index++;
	// 	var imgUrl = imgUrls[index];
	// 	var url = "https://www.bing.com" + imgUrl;
	// 	$panel.css("background", "url('" + url + "') center center no-repeat #666");
	// 	$panel.css("background-size", "cover");
	// 	sessionStorage.setItem("index", index);
	// }

	// // 切换成从Unsplash中获取（弃用）
    // // 假设这是你的 Unsplash API 访问密钥（实际使用时请替换）  
    // var unsplashApiKey = 'YOUR_UNSPLASH_ACCESS_KEY';  
    // var unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`;  

    // $.get(unsplashUrl, function (data) {  
    //     var imgUrl = data.urls.regular; // 使用 regular 分辨率的图片  
    //     $panel.css("background", "url('" + imgUrl + "') center center no-repeat #666");  
    //     $panel.css("background-size", "cover");  
    // }).fail(function (error) {  
    //     console.error('Failed to fetch image:', error);  
    //     // 可以设置一个默认背景图片或错误处理  
    //     $panel.css("background", "url('default-background.jpg') center center no-repeat #666");  
    //     $panel.css("background-size", "cover");  
    // });

	// 修改成从https://bing.img.run/api.html中的链接中直接获取图片，站在巨人的肩膀上
	$panel.css("background", "url(https://bing.img.run/rand_uhd.php) center center no-repeat #666");  
    $panel.css("background-size", "cover");  

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
