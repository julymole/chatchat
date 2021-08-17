import Swiper from "swiper";
import 'magnific-popup/dist/jquery.magnific-popup'
import './libs'

$('.js-mtp-gallery').each(function () {
	$(this).magnificPopup({
		delegate: '.js-mtp-gallery-item',
		type: 'image',
		closeBtnInside: true,
		fixedContentPos: true,
		fixedBgPos: true,
		showCloseBtn: true,
		closeOnBgClick: true,
		enableEscapeKey: true,
		gallery: {
			enabled: true,
			tCounter: '%curr% / %total%',
			preload: [0, 1]
		},
		image: {
			markup: '<div class="mfp-figure">' +
				'<button type="button" class="mfp-close"></button>' +
				'<div class="mfp-img"></div>' +
				'<div class="mfp-bottom-bar">' +
				'<div class="mfp-title"></div>' +
				'<div class="mfp-counter"></div>' +
				'</div>' +
				'</div>',

			// titleSrc: function (item) {
			//     return item.el.find('img').attr('title');
			// }
		}
	});
})
$('body').on('click', '.js-spoiler-button', function (e) {
	e.preventDefault;
	var spoilerTarget = $(this).data('target');
	$(this).toggleClass('mtp__spoiler-button--open');
	$(spoilerTarget).stop().slideToggle();
});

$(document).ready(function () {
    $('.js-mtp-slider').each(function () {
        var buttonNextSlide = $(this).find('.js-mtp-slider-button-next')[0],
            buttonPrevSlide = $(this).find('.js-mtp-slider-button-prev')[0],
            paginationSlide = $(this).find('.swiper-pagination')[0],
            navSlider = $(this).find('.js-mtp-nav-slider')[0],
            mainSlider = $(this).find('.js-mtp-main-slider')[0],
            mainSLiderInit = new Swiper(mainSlider, {
                containerModifierClass: 'mtp__slider-container-',
                wrapperClass: 'mtp__slider-wrapper',
                slideClass: 'mtp__slider-slide',
                slideActiveClass: 'mtp__slider-slide--active',
                slideVisibleClass: 'mtp__slider-slide--visible',
                slideNextClass: 'mtp__slider-slide--next',
                slidePrevClass: 'mtp__slider-slide--prev',
                slideBlankClass: 'mtp__slider-slide--blank',
                watchOverflow: true,
                autoHeight: true,
                spaceBetween: 32,
                navigation: {
                    nextEl: buttonNextSlide,
                    prevEl: buttonPrevSlide,
                },
                pagination: {
                    el: paginationSlide,
                    type: 'bullets',
                    dynamicBullets: true,
                },
                thumbs: {
                    swiper: {
                        el: navSlider,
                        slidesPerView: 6,
                        watchOverflow: true,
                        spaceBetween: 16,
                        containerModifierClass: 'mtp__slider-container-',
                        wrapperClass: 'mtp__slider-wrapper',
                        slideClass: 'mtp__slider-slide',
                        slideActiveClass: 'mtp__slider-slide--active',
                        slideVisibleClass: 'mtp__slider-slide--visible',
                        slideNextClass: 'mtp__slider-slide--next',
                        slidePrevClass: 'mtp__slider-slide--prev',
                        slideBlankClass: 'mtp__slider-slide--blank',
                    }
                }
            });
    });


    $('.js-mtp-main-slider .mtp__slider-wrapper').each(function () {
        $(this).magnificPopup({
            delegate: '.mtp__slider-slide',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                tCounter: '%curr% / %total%',
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            callbacks: {

                elementParse: function (item) {
                    var countItems = $('.js-mtp-main-slider .mtp__slider-slide').length;
                    if (item.el.hasClass("mtp__slider-slide--video")) {
                        var dataSrc = item.el.attr('data-mfp-src');

                        var countItem = item.el.index(),
                            countItem = parseInt(countItem + 1);
                        console.log(countItems, countItem);
                        item.type = 'inline';
                        item.src = '<div class="mfp-iframe-scaler"><div class="mfp-iframe-scaler-inner"><button title="Close (Esc)" type="button" class="mfp-close">×</button><iframe class="mfp-iframe" src="' + dataSrc + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div><div class="mfp-counter">' + countItem + '/' + countItems + '</div></div>';


                    } else {
                        item.type = 'image';
                    }
                }

            },
        });
    });
});
