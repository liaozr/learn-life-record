// JavaScript Document

var jq = jQuery.noConflict();
jQuery(function () {
    jq(".leftNav ul li").hover(
        function () {
            jq(this).find(".fj").addClass("nuw");
            jq(this).find(".fj a").css('color', '#e02d02');
            jq(this).find(".zj").show();
        }
        ,
        function () {
            jq(this).find(".fj").removeClass("nuw");
            jq(this).find(".fj a").css('color', 'white');
            jq(this).find(".zj").hide();
        }
    )
})
