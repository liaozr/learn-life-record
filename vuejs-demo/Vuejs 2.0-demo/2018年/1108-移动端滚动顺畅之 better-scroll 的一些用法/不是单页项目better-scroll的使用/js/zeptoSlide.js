(function($) {
	$.fn.slideDown = function(duration) {
		this.css({
			visibility: 'visible',
			height: 'auto'
		});
		var height = this.height();
		this.css({
			visibility: 'visible',
			overflow: 'hidden',
			height: '0px'
		});
		this.animate({
			height: height + "px"
		}, duration);
	};
	$.fn.slideUp = function(duration) {
		_this = this;
		this.animate({
			height: "0px"
		}, duration, function() {
			_this.css({
				visibility: 'hidden',
				overflow: 'hidden',
			});
		});
	};
})(Zepto);