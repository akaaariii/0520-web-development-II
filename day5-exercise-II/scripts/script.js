$(function(){
    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.marker-animation').markerAnimation({
        "color": '#ffcb86',
        'padding_bottom': '.1em',
        "thickness": '.6em',
        "font_weight": 'bold',
        'stripe': false,
        'stripe_thickness': 2
        
      });

    $('#ipsum').modally('ipsum', {'max-width': 800});
    $('#dolor').modally();
    modally('video-modal', {video: true, 'max-width': 800});
})