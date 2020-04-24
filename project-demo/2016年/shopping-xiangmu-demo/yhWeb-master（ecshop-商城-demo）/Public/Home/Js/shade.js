// JavaScript Document


function CloseDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
}


//document.getElementById(show_div).style.display='block';
//document.getElementById(bg_div).style.display='block' ;
//var bgdiv = document.getElementById(bg_div);
//bgdiv.style.width = document.body.scrollWidth;
//// bgdiv.style.height = $(document).height();
//$("#"+bg_div).height($(document).height());

//�رյ�����
function CloseDiv_1(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
    window.location.reload()
};