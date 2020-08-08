

(function ($) {
	
	$.fn.touchSlider = function (settings) {
		
		settings.supportsCssTransitions = (function (style) {
			var prefixes = ['Webkit','Moz','Ms'];
			for(var i=0, l=prefixes.length; i < l; i++ ) {
				if( typeof style[prefixes[i] + 'Transition'] !== 'undefined') {
					return true;
				}
			}
			return false;
		})(document.createElement('div').style);
		
		settings = jQuery.extend({
			roll : true,
			flexible : false,
			btn_prev : null,
			btn_next : null,
			paging : null,
			speed : 75,
			view : 1,
			range : 0.15,
			page : 1,
			transition : false,
			initComplete : null,
			counter : null,
			multi : false
		}, settings);
		
		var opts = [];
		opts = $.extend({}, $.fn.touchSlider.defaults, settings);
		
		return this.each(function () {
			
			$.fn.extend(this, touchSlider);
			
			var _this = this;
			
			this.opts = opts;
			this._view = this.opts.view;
			this._speed = this.opts.speed;
			this._tg = $(this);
			this._list = this._tg.children().children();
			this._width = parseInt(this._tg.css("width"));
			this._item_w = parseInt(this._list.css("width"));
			this._len = this._list.length;
			this._range = this.opts.range * this._width;
			this._pos = [];
			this._start = [];
			this._startX = 0;
			this._startY = 0;
			this._left = 0;
			this._top = 0;
			this._drag = false;
			this._scroll = false;
			this._btn_prev;
			this._btn_next;
			
			this.init();
			
			$(this)
			.bind("touchstart", this.touchstart)
			.bind("touchmove", this.touchmove)
			.bind("touchend", this.touchend)
			.bind("dragstart", this.touchstart)
			.bind("drag", this.touchmove)
			.bind("dragend", this.touchend)
			
			$(window).bind("orientationchange resize", function () {
				_this.resize(_this);
			});
		});
	
	};
	
	var touchSlider = {
		
		init : function () {
			var _this = this;
			
			$(this).children().css({
				"width":this._width + "px",
				"overflow":"visible"
			});
			
			if(this.opts.flexible) this._item_w = this._width / this._view;
			if(this.opts.roll) this._len = Math.ceil(this._len / this._view) * this._view;
			
			var page_gap = (this.opts.page > 1 && this.opts.page <= 0 this._len) ? (this.opts.page - 1) * this._item_w : 0; for(var i="0;" i<this._len; ++i) { this._pos[i]="this._item_w" page_gap; this._start[i]="this._pos[i];" this._list.eq(i).css({ "float" "none", "display" "block", "position" "absolute", "top" "0", "left" + "px", "width" "px" }); if(this.opts.supportscsstransitions && this.opts.transition) "-moz-transition" "0ms", "-moz-transform" "", "-ms-transition" "-ms-transform" "-webkit-transition" "-webkit-transform" "transition" "transform" "" } if(this.opts.btn_prev this.opts.btn_next) this.opts.btn_prev.bind("click", function() _this.animate(1, true); return false; }) this.opts.btn_next.bind("click", _this.animate(-1, if(this.opts.paging) $(this._list).each(function (i, el) var btn_page="_this.opts.paging.eq(0).clone();" _this.opts.paging.before(btn_page); btn_page.bind("click", function(e) _this.go_page(i, e); this.opts.paging.remove(); this.counter(); this.initcomplete(); }, initcomplete function () if(typeof(this.opts.initcomplete)="=" "function") this.opts.initcomplete(this); resize (e) if(e.opts.flexible) tmp_w="e._item_w;" e._width="parseInt(e._tg.css("width"));" e._item_w="e._width" e._view; e._range="e.opts.range" e._width; i<e._len; e._pos[i]="e._pos[i]" e._item_w; e._start[i]="e._start[i]" e._list.eq(i).css({ touchstart if((e.type="=" "touchstart" e.originalevent.touches.length <="1)" || e.type="=" "dragstart") this._startx="e.pageX" e.originalevent.touches[0].pagex; this._starty="e.pageY" e.originalevent.touches[0].pagey; this._scroll="false;" this._start="[];" touchmove "touchmove" "drag") this._left="(e.pageX" e.originalevent.touches[0].pagex) this._startx; this._top="(e.pageY" e.originalevent.touches[0].pagey) this._starty; w="this._left" -1 this._left; h="this._top" this._top; if (w this._scroll) this._drag="false;" else e.preventdefault(); this.position(e); tmp="this._start[i]" trans="translate3d(" "px,0,0)"; trans, this._list.eq(i).css("left", "px"); touchend "touchend" "dragend") if(this._scroll) this.animate(this.direction()); position (d) gap="this._view" this._item_w; if(d="=" d="=" gap; if(this._left> gap) this._left = gap;
				if(this._left < - gap) this._left = - gap;
			}
			
			if(this.opts.roll) {
				var tmp_pos = [];
				for(var i=0; i<this._len; 1 ++i) { tmp_pos[i]="this._pos[i];" } tmp_pos.sort(function(a,b){return a-b;}); var max_chk="tmp_pos[this._len-this._view];" p_min="$.inArray(tmp_pos[0]," this._pos); p_max="$.inArray(max_chk," if(this._view <="1)" - 1; if(this.opts.multi) if((d="=" && tmp_pos[0]>= 0) || (this._drag && tmp_pos[0] >= 100)) {
						for(var i=0; i<this._view; 1 ++i, ++p_min, ++p_max) { this._start[p_max]="this._start[p_min]" - gap; this._list.eq(p_max).css("left", + "px"); } else if((d="=" -1 && tmp_pos[0] <="0)" || (this._drag for(var i="0;" i<this._view; this._start[p_min]="this._start[p_max]" this._list.eq(p_min).css("left",>= 0) || (this._drag && tmp_pos[0] > 0)) {
						for(var i=0; i<this._view; 0 ++i, ++p_min, ++p_max) { this._start[p_max]="this._start[p_min]" - gap; this._list.eq(p_max).css("left", + "px"); } else if((d="=" -1 && tmp_pos[max_chk] <="0)" || (this._drag for(var i="0;" i<this._view; this._start[p_min]="this._start[p_max]" this._list.eq(p_min).css("left", if(this.limit_chk()) this._left="this._left" 2; }, animate : function (d, btn_click) if(this._drag !this._scroll var _this="this;" speed="this._speed;" if(btn_click) this.position(d); gap="d" * (this._item_w this._view); if(this._left="=" (!this.opts.roll this.limit_chk()) ) this._list.each(function (i, el) _this._pos[i]="_this._start[i]" if(_this.opts.supportscsstransitions _this.opts.transition) transition="speed" "ms"; transform="translate3d(" "px,0,0)"; ; $(this).css({ "left" "", "-moz-transition" transition, "-moz-transform" transform, "-ms-transition" "-ms-transform" "-webkit-transition" "-webkit-transform" "transition" "transform" }); $(this).stop(); $(this).animate({"left": "px"}, speed); this.counter(); direction () r="0;" -(this._range))> this._range) r = 1;
			
			if(!this._drag || this._scroll) r = 0;
			
			return r;
		},
		
		limit_chk : function () {
			var last_p = parseInt((this._len - 1) / this._view) * this._view;
			return ( (this._start[0] == 0 && this._left > 0) || (this._start[last_p] == 0 && this._left < 0) );
		},
		
		go_page : function (i, e) {
			var crt = ($.inArray(0, this._pos) / this._view) + 1;
			var cal = crt - (i + 1);
			
			while(cal != 0) {
				if(cal < 0) {
					this.animate(-1, true);
					cal++;
				} else if(cal > 0) {
					this.animate(1, true);
					cal--;
				}
			}
		},
		
		counter : function () {
			if(typeof(this.opts.counter) == "function") {
				var param = {
					total : Math.ceil(this._len / this._view),
					current : ($.inArray(0, this._pos) / this._view) + 1
				};
				this.opts.counter(param);
			}
		}
		
	};

})(jQuery);</this._view;></this._view;></this._len;></=>