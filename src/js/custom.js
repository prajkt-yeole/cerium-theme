$(document).ready(function() {
    $(".owl-courses").owlCarousel({
        items: 4,
        autoPlay: 4000,
        stopOnHover: true,
        scrollPerPage: true
    });

    $(".owl-test").owlCarousel({
        singleItem: true,
        autoPlay: true,
        afterInit: addCustomPagination
    });

    function addCustomPagination() {
        $('.owl-test .owl-item > div').each(function(i) {
            var author = $(this).attr('data-author');
            var dp = $(this).attr('data-dp');
            var page = $('.owl-test .owl-pagination .owl-page');
            var pages = $('.owl-test .owl-pagination .owl-page span');
            $(pages[i]).append('<img class="img-responsive" src="img/dp/dp' + dp + '">');
            $(page[i]).append('<div>' + author + '</div>')
                // console.log(author + ' ' + dp);
        });
    }

});
