// sets scroll function of nav bar
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('.content');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $('h3').css('background-color', 'transparent').css('color', 'white').css('text-shadow', '2px 2px black');
            } else {
                $('h3').css('background-color', 'transparent').css('color', 'transparent').css('text-shadow', '2px 2px transparent');
            }
        });
    }
});