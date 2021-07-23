$(document).ready(function () {

    var $body = $('body');
    $.get($body.data('svg-sprite'), function(data) {
        var sprite = document.createElement('div');
        $(sprite).css({
            position: "absolute",
            width: 0,
            height: 0
        });
        sprite.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
        $body.prepend(sprite);
    });

    var $dropdownMenu = $(".dropdown-menu");
    if ($dropdownMenu.length) {
        $dropdownMenu.selectric();
    }

    var $btnMobileSearch = $(".btn-mobile-search");
    var $headerSearch = $(".header__search");
    $btnMobileSearch.on("click", function () {
        if ($btnMobileSearch.hasClass("btn-mobile-search_active")) {
            $btnMobileSearch.removeClass("btn-mobile-search_active");
            if ($headerSearch.length) {
                $headerSearch.hide();
            }
        }
        else {
            $btnMobileSearch.addClass("btn-mobile-search_active");
            if ($headerSearch.length) {
                $headerSearch.show();
            }
        }
    });

    $body.on("click", ".btn-mobile-menu", function () {
        var $this = $(this);
        var $mobileNav = $(".mobile-nav");
        if ($mobileNav.length) {
            if (!$mobileNav.hasClass("mobile-nav_active")) {
                $this.addClass("btn-mobile-menu_active");
                $mobileNav.slideDown(300, function () {
                    $mobileNav.addClass("mobile-nav_active");
                });
            }
            else {
                $this.removeClass("btn-mobile-menu_active");
                $mobileNav.slideUp(300, function () {
                    $mobileNav.removeClass("mobile-nav_active");
                });
            }
        }
    });

    var $mobileMenuTitle = $(".mobile-menu__title");
    $mobileMenuTitle.on("click", function () {
        var $mobileMenu = $(this).closest(".mobile-menu");
        var $mobileMenuList = $mobileMenu.find(".mobile-menu__list");
        if ($mobileMenu.hasClass("mobile-menu_active")) {
            $mobileMenuList.slideUp(300, function () {
                $body.removeClass("overflow-hidden");
                $mobileMenu.removeClass("mobile-menu_active");
            });
        }
        else {
            $mobileMenuList.slideDown(300, function () {
                $body.addClass("overflow-hidden");
                $mobileMenu.addClass("mobile-menu_active");
            });
        }
    });

    homeCategorySection();
    scrollableMenu();
    fixedSectionMenuMaxWidth();
    mobileBannerSlider();
    productListSlider();
    brandsSlider();
    panorama();
    storiesSlider();
    reviewsSlider();
    advicesSlider();
    blogSlider();
    newsSlider();
    scrollToAnchor();

    if ($('#map').length) {ymaps.ready(initMoscowOfficeMap);}
});

function mobileBannerSlider() {
    var $mobileBannerSlider = $(".mobile-banner-slider");
    var mobileBannerSliderArr = [];
    if ($mobileBannerSlider.length) {
        $mobileBannerSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".mobile-banner-slider__list").addClass("swiper-wrapper");
            $this.find(".mobile-banner-slider__item").addClass("swiper-slide");
            $this.find(".mobile-banner-slider__link").append("<div class='swiper-lazy-preloader'></div>");
            $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination mobile-banner-slider-pagination'></div>");

            mobileBannerSliderArr[i] = new Swiper($mobileBannerSlider[i], {
                spaceBetween: 48,
                freeMode: true,
                slidesPerView: "auto",
                watchSlidesVisibility: true,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: $($mobileBannerSlider[i]).next(".swiper-pagination")[0],
                    clickable: true,
                },
                breakpoints: {
                    1: {
                        spaceBetween: 32,
                    },
                    768: {
                        spaceBetween: 48,
                    },
                }
            });
            // brandsSlidersArr[i].update();
            // $(window).on("resize", function () {
            //     brandsSlidersArr[i].update();
            // }).trigger('resize');
            mobileBannerSliderArr[i].on('lazyImageReady', function () {
                mobileBannerSliderArr[i].update();
            });

        });
    }
}

function homeCategorySection() {
    var $brandsList = $(".home-category-section__brands-container");
    var brandsSlidersArr = [];
    if ($brandsList.length) {
        $brandsList.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".home-category-section__brands-list").addClass("swiper-wrapper");
            $this.find(".home-category-section__brands-item").addClass("swiper-slide");
            $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            $this.find("img").addClass("swiper-lazy");
            // $this.after("<div class='swiper-pagination'></div>");
            $this.after(
            "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                    "<svg class='icon icon-slider-arrow-right'>" +
                        "<use xlink:href='#slider-arrow-right'></use>" +
                    "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                    "<svg class='icon icon-slider-arrow-right'>" +
                        "<use xlink:href='#slider-arrow-right'></use>" +
                    "</svg>" +
                "</button>" +
            "</div>"
            );
            brandsSlidersArr[i] = new Swiper($brandsList[i], {
                spaceBetween: 48,
                freeMode: true,
                slidesPerView: "auto",
                watchSlidesVisibility: true,
                lazy: {
                    loadPrevNext: true,
                },
                // pagination: {
                //     el: $($brandsList[i]).closest(".home-category-section__brands-body").find(".swiper-pagination")[0],
                //     clickable: true,
                // },
                navigation: {
                    nextEl: $($brandsList[i]).closest(".home-category-section__brands-body").find(".swiper-arrow_next")[0],
                    prevEl: $($brandsList[i]).closest(".home-category-section__brands-body").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 32,
                    },
                    768: {
                        spaceBetween: 48,
                    },
                }
            });
            // brandsSlidersArr[i].update();
            // $(window).on("resize", function () {
            //     brandsSlidersArr[i].update();
            // }).trigger('resize');
            brandsSlidersArr[i].on('lazyImageReady', function () {
                brandsSlidersArr[i].update();
            });

        });
    }
    var $homeCategorySectionHeader = $(".home-category-section__header");
    $homeCategorySectionHeader.on("click", function () {
        var $this = $(this);
        var $section = $(this).closest(".home-category-section");
        if ($(window).width() <=480) {
            if ($section.hasClass("home-category-section_active")) {
                $section.removeClass("home-category-section_active");
                $this.next(".home-category-section__body").slideUp(300);
            }
            else {
                $section.addClass("home-category-section_active");
                $this.next(".home-category-section__body").slideDown(300, function () {
                    if (brandsSlidersArr.length > 0) {
                        for(var j=0; j < brandsSlidersArr; j++) {

                        }
                    }
                });
            }
        }
    });

}

function productListSlider() {
    var $productListSlider = $(".product-list-slider");
    var productListSliderArr = [];
    if ($productListSlider.length) {
        $productListSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            productListSliderArr[i] = new Swiper($productListSlider[i], {
                spaceBetween: 0,
                freeMode: false,
                slidesPerView: 5,
                // freeMode: true,
                // slidesPerView: "auto",
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($productListSlider[i]).closest(".product-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($productListSlider[i]).closest(".product-container").find(".swiper-arrow_next")[0],
                    prevEl: $($productListSlider[i]).closest(".product-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    },
                    992: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 5
                    },
                },
                on: {
                    init: function () {
                        setTimeout(changeSliderGradClass, 1000);
                    },
                }
            });
            productListSliderArr[i].on('lazyImageReady', function () {
                productListSliderArr[i].update();
            });
            productListSliderArr[i].on('slideChange', function () {
                changeSliderGradClass();
            });
            function changeSliderGradClass() {
                var $productListSliderInstance = $($productListSlider[i]);
                var $prevBtn = $productListSliderInstance.closest(".product-container").find('.swiper-arrow_prev');
                var $nextBtn = $productListSliderInstance.closest(".product-container").find('.swiper-arrow_next');
                if (!$prevBtn.hasClass('swiper-button-disabled')) {
                    $productListSliderInstance.addClass('swiper-grad-left');
                }
                else {
                    $productListSliderInstance.removeClass('swiper-grad-left');
                }
                if (!$nextBtn.hasClass('swiper-button-disabled')) {
                    $productListSliderInstance.addClass('swiper-grad-right');
                }
                else {
                    $productListSliderInstance.removeClass('swiper-grad-right');
                }
            }

        });
    }
}

function blogSlider() {
    var $blogSlider = $(".blog-slider");
    var blogSliderArr = [];
    if ($blogSlider.length) {
        $blogSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col-md-4").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            blogSliderArr[i] = new Swiper($blogSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 3,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($blogSlider[i]).closest(".blog-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($blogSlider[i]).closest(".blog-container").find(".swiper-arrow_next")[0],
                    prevEl: $($blogSlider[i]).closest(".blog-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 15,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    360: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    480: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 3,
                    },
                }
            });

            blogSliderArr[i].on('lazyImageReady', function () {
                blogSliderArr[i].update();
            });

        });
    }
}

function advicesSlider() {
    var $advicesSlider = $(".advices-slider");
    var advicesSliderArr = [];
    if ($advicesSlider.length) {
        $advicesSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col-md-4").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            advicesSliderArr[i] = new Swiper($advicesSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 3,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($advicesSlider[i]).closest(".advices-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($advicesSlider[i]).closest(".advices-container").find(".swiper-arrow_next")[0],
                    prevEl: $($advicesSlider[i]).closest(".advices-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 15,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    360: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    768: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    992: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 3,
                    },
                }
            });

            advicesSliderArr[i].on('lazyImageReady', function () {
                advicesSliderArr[i].update();
            });

        });
    }
}

function reviewsSlider() {
    var $reviewsSlider = $(".reviews-slider");
    var reviewsSliderArr = [];
    if ($reviewsSlider.length) {
        $reviewsSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col-md-6").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            reviewsSliderArr[i] = new Swiper($reviewsSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 2,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($reviewsSlider[i]).closest(".reviews-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($reviewsSlider[i]).closest(".reviews-container").find(".swiper-arrow_next")[0],
                    prevEl: $($reviewsSlider[i]).closest(".reviews-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 0,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    360: {
                        spaceBetween: 0,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    768: {
                        spaceBetween: 0,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    992: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                }
            });
            reviewsSliderArr[i].on('lazyImageReady', function () {
                reviewsSliderArr[i].update();
            });

        });
    }
}

function newsSlider() {
    var $newsSlider = $(".news-slider");
    var newsSliderArr = [];
    if ($newsSlider.length) {
        $newsSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col-md-3").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            newsSliderArr[i] = new Swiper($newsSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 4,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($newsSlider[i]).closest(".news-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($newsSlider[i]).closest(".news-container").find(".swiper-arrow_next")[0],
                    prevEl: $($newsSlider[i]).closest(".news-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 15,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    360: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    480: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    1200: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 4,
                    },
                }
            });
            newsSliderArr[i].on('lazyImageReady', function () {
                newsSliderArr[i].update();
            });

        });
    }
}

function storiesSlider() {
    var $storiesSlider = $(".stories-slider");
    var storiesSliderArr = [];
    if ($storiesSlider.length) {
        $storiesSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col-md-3").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            storiesSliderArr[i] = new Swiper($storiesSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 4,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($storiesSlider[i]).closest(".stories-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($storiesSlider[i]).closest(".stories-container").find(".swiper-arrow_next")[0],
                    prevEl: $($storiesSlider[i]).closest(".stories-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 15,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    360: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 1,
                    },
                    576: {
                        spaceBetween: 20,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 2,
                    },
                    992: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 3,
                    },
                    1367: {
                        spaceBetween: 24,
                        freeMode: false,
                        slidesPerView: 4,
                    },
                }
            });
            storiesSliderArr[i].on('lazyImageReady', function () {
                storiesSliderArr[i].update();
            });

        });
    }
}

function brandsSlider() {
    var $brandsSlider = $(".brands-slider");
    var brandsSliderArr = [];
    if ($brandsSlider.length) {
        $brandsSlider.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".row").addClass("swiper-wrapper");
            $this.find(".col").addClass("swiper-slide");
            // $this.find(".home-category-section__brands-link").append("<div class='swiper-lazy-preloader'></div>");
            // $this.find("img").addClass("swiper-lazy");
            $this.after("<div class='swiper-pagination'></div>");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            brandsSliderArr[i] = new Swiper($brandsSlider[i], {
                spaceBetween: 24,
                freeMode: false,
                slidesPerView: 7,
                slidesPerColumn: 2,
                // slidesPerGroup: 2,
                watchSlidesVisibility: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                pagination: {
                    el: $($brandsSlider[i]).closest(".brands-container").find(".swiper-pagination")[0],
                    clickable: true,
                },
                navigation: {
                    nextEl: $($brandsSlider[i]).closest(".brands-container").find(".swiper-arrow_next")[0],
                    prevEl: $($brandsSlider[i]).closest(".brands-container").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 10,
                        slidesPerView: 2,
                        slidesPerColumn: 2,
                    },
                    360: {
                        spaceBetween: 14,
                        slidesPerView: 2,
                        slidesPerColumn: 2,
                    },
                    480: {
                        spaceBetween: 14,
                        slidesPerView: 3,
                        slidesPerColumn: 2,
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 4,
                        slidesPerColumn: 2,
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 5,
                        slidesPerColumn: 2,
                    },
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 7,
                        slidesPerColumn: 2,
                    },
                    1440: {
                        spaceBetween: 24,
                        slidesPerView: 7,
                        slidesPerColumn: 2,
                    },
                }
            });
            brandsSliderArr[i].on('lazyImageReady', function () {
                brandsSliderArr[i].update();
            });

        });
    }
}

function scrollableMenu() {
    var $scrollableMenu = $(".scrollable-menu__container");
    var scrollableMenuArr = [];
    if ($scrollableMenu.length) {
        $scrollableMenu.each(function (i) {
            var $this = $(this);
            $this.addClass("swiper-container");
            $this.find(".scrollable-menu__list").addClass("swiper-wrapper");
            $this.find(".scrollable-menu__item").addClass("swiper-slide");
            $this.after(
                "<div class='swiper-arrows'>" +
                "<button type='button' class='swiper-arrow swiper-arrow_prev'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "<button type='button' class='swiper-arrow swiper-arrow_next'>" +
                "<svg class='icon icon-slider-arrow-right'>" +
                "<use xlink:href='#slider-arrow-right'></use>" +
                "</svg>" +
                "</button>" +
                "</div>"
            );
            scrollableMenuArr[i] = new Swiper($scrollableMenu[i], {
                spaceBetween: 24,
                freeMode: true,
                slidesPerView: "auto",
                watchSlidesVisibility: true,
                navigation: {
                    nextEl: $($scrollableMenu[i]).closest(".scrollable-menu").find(".swiper-arrow_next")[0],
                    prevEl: $($scrollableMenu[i]).closest(".scrollable-menu").find(".swiper-arrow_prev")[0],
                },
                breakpoints: {
                    1: {
                        spaceBetween: 20,
                    },
                    481: {
                        spaceBetween: 24,
                    },
                },
                on: {
                    init: function () {
                        setTimeout(changeSliderGradClass, 1000);
                    },
                }
            });
            scrollableMenuArr[i].on('lazyImageReady', function () {
                scrollableMenuArr[i].update();
            });
            scrollableMenuArr[i].on('slideChange', function () {
                changeSliderGradClass();
            });
            function changeSliderGradClass() {
                var $scrollableMenuInstance = $($scrollableMenu[i]);
                var $prevBtn = $scrollableMenuInstance.closest(".scrollable-menu").find('.swiper-arrow_prev');
                var $nextBtn = $scrollableMenuInstance.closest(".scrollable-menu").find('.swiper-arrow_next');
                if (!$prevBtn.hasClass('swiper-button-disabled')) {
                    $scrollableMenuInstance.addClass('swiper-grad-left');
                }
                else {
                    $scrollableMenuInstance.removeClass('swiper-grad-left');
                }
                if (!$nextBtn.hasClass('swiper-button-disabled')) {
                    $scrollableMenuInstance.addClass('swiper-grad-right');
                }
                else {
                    $scrollableMenuInstance.removeClass('swiper-grad-right');
                }
            }
        });
    }
}

function fixedSectionMenuMaxWidth() {

    var $sectionNav = $(".section__nav");

    if ($sectionNav.length) {
        for(var i = 0; i < $sectionNav.length; i++) {
            var $sectionNavInstance = $($sectionNav[i]);
            var $sectionHeader= $sectionNavInstance.closest(".section__header");
            var $sectionTitle = $sectionNavInstance.siblings(".section__title");
            var $sectionMoreLink = $sectionNavInstance.siblings(".section__more-link");
            var sectionTitleWidth = ($sectionTitle.length) ? $sectionTitle.width() + 24 : 0;
            var sectionMoreLink = ($sectionMoreLink.length) ? $sectionMoreLink.width() + 24 : 0;
            $sectionNavInstance.css("max-width", $sectionHeader.width() - sectionTitleWidth - sectionMoreLink);
        }
        function changeSectionMenuMaxWidth() {
            for(var i = 0; i< $sectionNav.length; i++) {
                var $sectionNavInstance = $($sectionNav[i]);
                var $sectionTitle = $sectionNavInstance.siblings(".section__title");
                var $sectionMoreLink = $sectionNavInstance.siblings(".section__more-link");
                var sectionTitleWidth = ($sectionTitle.length) ? $sectionTitle.width() + 24 : 0;
                var sectionMoreLink = ($sectionMoreLink.length) ? $sectionMoreLink.width() + 24 : 0;
                $sectionNavInstance.css("max-width", $sectionHeader.width() - sectionTitleWidth - sectionMoreLink);
            }
        }
        var timer;
        $(window).on("resize.fixedMenuMaxWidth", function () {
            if (typeof timer === "function") {
                clearTimeout(timer);
            }
            timer = setTimeout(changeSectionMenuMaxWidth, 200);
        });
    }

}

function panorama() {
    var $panorama = $('#panorama');
    if ($panorama.length) {
        ymaps.ready(function () {
            // Для начала проверим, поддерживает ли плеер браузер пользователя.
            if (!ymaps.panorama.isSupported()) {
                // Если нет, то просто ничего не будем делать.
                return;
            }

            // Ищем панораму в переданной точке.
            ymaps.panorama.locate([55.733685, 37.588264]).done(
                function (panoramas) {
                    // Убеждаемся, что найдена хотя бы одна панорама.
                    if (panoramas.length > 0) {
                        // Создаем плеер с одной из полученных панорам.
                        var player = new ymaps.panorama.Player(
                            'player1',
                            // Панорамы в ответе отсортированы по расстоянию
                            // от переданной в panorama.locate точки. Выбираем первую,
                            // она будет ближайшей.
                            panoramas[0],
                            // Зададим направление взгляда, отличное от значения
                            // по умолчанию.
                            { direction: [256, 16] }
                        );
                    }
                },
                function (error) {
                    // Если что-то пошло не так, сообщим об этом пользователю.
                    alert(error.message);
                }
            );

            // Для добавления панорамы на страницу также можно воспользоваться
            // методом panorama.createPlayer. Этот метод ищет ближайщую панораму и
            // в случае успеха создает плеер с найденной панорамой.
            ymaps.panorama.createPlayer(
                'panorama',
                [59.938557, 30.316198],
                // Ищем воздушную панораму.
                { layer: 'yandex#airPanorama' }
            )
                .done(function (player) {
                    // player – это ссылка на экземпляр плеера.
                });
        });
    }
}

function scrollToAnchor() {
    $("body").on('click', 'a.scroll-anchor[href*="#"]:not([href="#"])', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

function initMap(containerId, centerCoordinates, zoom, jsonUrl, jsonContent) {

    var storesMap = new ymaps.Map(containerId, {
        center: centerCoordinates,
        zoom: zoom,
        // controls: ['geolocationControl', 'zoomControl']
        controls: []
    });

    storesMap.behaviors.disable('scrollZoom');
    // storesMap.behaviors.disable('drag');

    // Создадим пользовательский макет ползунка масштаба.
    var ZoomLayout = ymaps.templateLayoutFactory.createClass('<div class="giant-map-zoom">' +
        '<div id="' + containerId + '--zoom-in" class="giant-map-zoom__btn giant-map-zoom__up"></div>' +
        '<div id="' + containerId + '--zoom-out" class="giant-map-zoom__btn giant-map-zoom__down"></div>' +
        '</div>', {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            $('#' + containerId + '--zoom-in').bind('click', this.zoomInCallback);
            $('#' + containerId + '--zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            $('#' + containerId + '--zoom-in').unbind('click', this.zoomInCallback);
            $('#' + containerId + '--zoom-out').unbind('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
        }
    });

    var GeolocationLayout = ymaps.templateLayoutFactory.createClass('<div class="giant-map-geolocation">'+
        '<div id="' + containerId + '--geolocation" class="giant-map-geolocation__btn">'+
        '<svg class="giant-map-geolocation__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M5.69,11.26c.31,1,.91,1,1.33.08L11.83,1.05c.42-.91,0-1.3-.88-.88L.66,5c-.91.43-.87,1,.07,1.34L4.45,7.55Z"/></svg>' +
        '</div>'+
        '</div>');

    var mapHeight = storesMap.container.getSize()[1];

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            layout: ZoomLayout,
            position: {
                right: '12px',
                top: mapHeight / 2 - 57 + 'px',
            }
        }
    });

    var geolocationControl = new ymaps.control.GeolocationControl({
        options: {
            layout: GeolocationLayout,
            position: {
                right: '12px',
                top: mapHeight / 2 + 25 + 'px',
            }
        }
    });

    storesMap.controls.add(zoomControl);
    storesMap.controls.add(geolocationControl);

    storesMap.events.add('sizechange', function (e) {
        // mapHeight = storesMap.container.getSize()[1];
        mapHeight = e.get('newSize')[1];
        zoomControl.options.set({position: {right: '12px', top: mapHeight / 2 - 57 + 'px'}});
        geolocationControl.options.set({position: {right: '12px', top: mapHeight / 2 + 25 + 'px'}});
    });

    var objectManager = new ymaps.ObjectManager({
        // clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    //var giantPlacemarkLayout = ymaps.templateLayoutFactory.createClass('<svg class="giant-map-placemark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="28" height="40"><circle fill="#ffffff" class="cls-1" cx="14" cy="14" r="6"/><path fill="#0e78bf" d="M14,0A14,14,0,0,0,0,14C0,24.5,14,40,14,40S28,24.5,28,14A14,14,0,0,0,14,0Zm0,19a5,5,0,1,1,5-5A5,5,0,0,1,14,19Z"/></svg>');
    var giantPlacemarkLayout = ymaps.templateLayoutFactory.createClass(
        '<svg class="giant-map-placemark-icon" viewBox="0 0 30 30" width="48" height="48" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="15" cy="5" fill="none" r="1.5"/>' +
        '<path fill="#E01F2E" d="M19.09473,19.19141a.98474.98474,0,0,0-1.08985.90039.99873.99873,0,0,0,.90039,1.08984C24.83887,21.749,28,23.47363,28,24.5c0,1.39355-5.18457,3.5-13,3.5S2,25.89355,2,24.5c0-1.02637,3.16113-2.751,9.09473-3.31836a.99873.99873,0,0,0,.90039-1.08984.98345.98345,0,0,0-1.08985-.90039C5.63281,19.69531,0,21.35449,0,24.5,0,28.11035,7.5459,30,15,30s15-1.88965,15-5.5C30,21.35449,24.36719,19.69531,19.09473,19.19141Z"/>' +
        '<path fill="#E01F2E" d="M14,13.91992V25a1,1,0,0,0,2,0V13.91992a7,7,0,1,0-2,0ZM15,3.5A1.5,1.5,0,1,1,13.5,5,1.50164,1.50164,0,0,1,15,3.5Z"/>' +
        '</svg>');

    // Создание макета балуна на основе Twitter Bootstrap.
    var giantBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="giant-map-balloon">' +
        '<button class="giant-map-balloon__close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path fill-rule="evenodd" d="M14 .7l-.7-.7L7 6.3.7 0 0 .7 6.3 7 0 13.3l.7.7L7 7.7l6.3 6.3.7-.7L7.7 7z" clip-rule="evenodd"/></svg></button>' +
        '<div class="giant-map-balloon__arrow"></div>' +
        '<div class="giant-map-balloon__inner">' +
        '$[[options.contentLayout observeSize minWidth=240 maxWidth=280 maxHeight=350]]' +
        '</div>' +
        '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.giant-map-balloon', this.getParentElement());
                this.applyElementOffset();
                this._$element.find('.giant-map-balloon__close').on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                this._$element.find('.giant-map-balloon__close').off('click');
                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                giantBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._$element)) {return;}
                this.applyElementOffset();
                this.events.fire('shapechange');
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function () {
                this._$element.css({
                    // left: -(this._$element[0].offsetWidth / 2),
                    // top: -(this._$element[0].offsetHeight + this._$element.find('.giant-map-balloon__arrow')[0].offsetHeight)
                    left: this._$element.find('.giant-map-balloon__arrow')[0].offsetWidth + 22,
                    top: -28
                });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire('userclose');
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function () {
                if(!this._isElement(this._$element)) {
                    return giantBalloonLayout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight + this._$element.find('.giant-map-balloon__arrow')[0].offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.giant-map-balloon__arrow')[0];
            }
        });

    // Создание вложенного макета содержимого балуна.
    var giantBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="giant-map-balloon__header">$[properties.balloonHeader]</div>' +
        '<div class="giant-map-balloon__content">$[properties.balloonContent]</div>'
    );

    objectManager.objects.options.set({
        iconLayout: giantPlacemarkLayout,
        iconShape: {type: 'Rectangle', coordinates: [[-14, -40], [14, 0]]},
        hideIconOnBalloonOpen: false,
        balloonOffset: [0, -40],
        balloonLayout: giantBalloonLayout,
        // balloonContentLayout: giantBalloonContentLayout
        // panelMaxMapArea: 'Infinity'
    });

    storesMap.geoObjects.add(objectManager);

    if (typeof jsonContent !== 'undefined') {
        objectManager.add(jsonContent);
        storesMap.setBounds(storesMap.geoObjects.getBounds(), { checkZoomRange: true });
    }
    else {
        $.ajax({url: jsonUrl}).done(function(data) {
            objectManager.add(data);
            storesMap.setBounds(storesMap.geoObjects.getBounds(), { checkZoomRange: true });
        });
    }

    // storesMap.zoom.set(8);
}

function initMoscowOfficeMap() {
    var objJson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "id": 0,
                "geometry": {
                    "type": "Point",
                    "coordinates": [55.654940, 37.631038]
                },
                "properties": {
                    "balloonContentHeader": "<span class='store__title'>Магазин Fitness Place</span>",
                    "balloonContentBody": "<span class='store__address'>Каширский проезд, д. 17, кор. 9</span><a href='tel:+74952762886' class='store__phone'>+7 (495) 276-28-86</a><span class='store__shedule'>Пн-пт: 9:00-19:00; сб-вс: с 11:00-19:00</span><a class='store__email' href='mailto:info@giant-rus.ru'>info@fitness-place.ru</a><a class='store__site' href='https://fitness-place.ru' target='_blank'>fitness-place.ru</a>",
                    "balloonContentFooter": "",
                    "clusterCaption": "Магазин Fitness Place",
                    "hintContent": ""
                }
            }
        ]
    };
    initMap('map', [55.654940, 37.631038], 11, false, objJson);
}