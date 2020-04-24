$.fn.wookmark = function (a) {
    if (!this.wookmarkOptions) {
        this.wookmarkOptions = $.extend({
            container: $("body"),
            offset: 2,
            autoResize: false,
            itemWidth: $(this[0]).outerWidth(),
            resizeDelay: 50
        }, a)
    } else {
        if (a) {
            this.wookmarkOptions = $.extend(this.wookmarkOptions, a)
        }
    }
    if (!this.wookmarkColumns) {
        this.wookmarkColumns = null;
        this.wookmarkContainerWidth = null
    }
    this.wookmarkLayout = function () {
        var e = this.wookmarkOptions.itemWidth + this.wookmarkOptions.offset;
        var d = this.wookmarkOptions.container.width();
        var c = Math.floor((d + this.wookmarkOptions.offset) / e);
        var f = Math.round((d - (c * e - this.wookmarkOptions.offset)) / 2);
        var b = 0;
        if (this.wookmarkColumns != null && this.wookmarkColumns.length == c) {
            b = this.wookmarkLayoutColumns(e, f)
        } else {
            b = this.wookmarkLayoutFull(e, c, f)
        }
        this.wookmarkOptions.container.css("height", b + "px")
    };
    this.wookmarkLayoutFull = function (l, n, p) {
        var d = [];
        while (d.length < n) {
            d.push(0)
        }
        this.wookmarkColumns = [];
        while (this.wookmarkColumns.length < n) {
            this.wookmarkColumns.push([])
        }
        var j, e, m, b = 0, o = 0, h = this.length, c = null, g = null, f = 0;
        for (; b < h; b++) {
            j = $(this[b]);
            c = null;
            g = 0;
            for (o = 0; o < n; o++) {
                if (c == null || d[o] < c) {
                    c = d[o];
                    g = o
                }
            }
            j.css({position: "absolute", top: c + "px", left: (g * l + p) + "px"});
            d[g] = c + j.outerHeight() + this.wookmarkOptions.offset;
            f = Math.max(f, d[g]);
            this.wookmarkColumns[g].push(j)
        }
        return f
    };
    this.wookmarkLayoutColumns = function (m, e) {
        var h = [];
        while (h.length < this.wookmarkColumns.length) {
            h.push(0)
        }
        var g = 0, b = this.wookmarkColumns.length, c;
        var d = 0, f, j;
        var l = 0;
        for (; g < b; g++) {
            c = this.wookmarkColumns[g];
            f = c.length;
            for (d = 0; d < f; d++) {
                j = c[d];
                j.css({left: (g * m + e) + "px", top: h[g] + "px"});
                h[g] += j.outerHeight() + this.wookmarkOptions.offset;
                l = Math.max(l, h[g])
            }
        }
        return l
    };
    this.wookmarkResizeTimer = null;
    if (!this.wookmarkResizeMethod) {
        this.wookmarkResizeMethod = null
    }
    if (this.wookmarkOptions.autoResize) {
        this.wookmarkOnResize = function (b) {
            if (this.wookmarkResizeTimer) {
                clearTimeout(this.wookmarkResizeTimer)
            }
            this.wookmarkResizeTimer = setTimeout($.proxy(this.wookmarkLayout, this), this.wookmarkOptions.resizeDelay)
        };
        if (!this.wookmarkResizeMethod) {
            this.wookmarkResizeMethod = $.proxy(this.wookmarkOnResize, this)
        }
        $(window).resize(this.wookmarkResizeMethod)
    }
    this.wookmarkClear = function () {
        if (this.wookmarkResizeTimer) {
            clearTimeout(this.wookmarkResizeTimer);
            this.wookmarkResizeTimer = null
        }
        if (this.wookmarkResizeMethod) {
            $(window).unbind("resize", this.wookmarkResizeMethod)
        }
    };
    this.wookmarkLayout();
    this.show()
};