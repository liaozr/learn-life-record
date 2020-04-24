(function($) {
    $.fn.myPlugin = function(options) {
        var defaults = {
            'color': 'red'
        };
        var settings = $.extend({}, defaults, options);

        // 一个好的做法是将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其后，这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。

        // 所以将插件的所有方法属性包装到一个对象上，用面向对象的思维来进行开发，无疑会使工作轻松很多。
        return this.css({
            'color': settings.color,
            'fontSize': settings.fontSize
        });
    }
})(jQuery);
