$(document).ready(function() {

    $("#slider-1").owlCarousel({

        autoPlay: false,
        slideSpeed: 800,
        paginationSpeed: 600,
        rewindSpeed: 1000,
        items: 1,
        itemsDesktop: [1199,1],
        itemsDesktopSmall: [979,1],
        responsive: true,
        navigation: true,
        navigationText: [
            "<img	src='./pic/slider_stories_prev.png'>",
            "<img	src='./pic/slider_stories_next.png'>"
        ]

    });


    $("#slider-2").owlCarousel({

        autoPlay: false,
        slideSpeed: 900,
        paginationSpeed: 800,
        rewindSpeed: 1000,
        items: 2,
        itemsDesktop: [1199,2],
        itemsDesktopSmall: [979,2],
        navigation: true,
        navigationText: [
            "<img	src='./pic/slider_stories_prev.png'>",
            "<img	src='./pic/slider_stories_next.png'>"
        ]

    });

});