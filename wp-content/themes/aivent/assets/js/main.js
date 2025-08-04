(function($) {
    "use strict";

    $('#de-loader ').prepend($('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'));



    $(document).ready(function() {
        $(".menu-button, .close-button").on('click', function() {
            event.preventDefault();
            $(".nav-toggle, .menu-ofcn, .close-button, body").toggleClass("off-open");
        });

        $("ul.children").addClass("sub-menu");
    });

    if ($('.menu-area').length) {
        document.addEventListener("DOMContentLoaded", function() {
            const menuItems = document.querySelectorAll('.menu-item-has-children > a');
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const subMenu = this.nextElementSibling;

                    if (subMenu && subMenu.classList.contains('sub-menu')) {
                        if (subMenu.style.maxHeight) {
                            subMenu.style.maxHeight = null;
                            subMenu.style.opacity = '0';
                            this.classList.remove('rt-open');
                            subMenu.classList.remove('sub-open');
                        } else {
                            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
                            subMenu.style.opacity = '1';
                            this.classList.add('rt-open');
                            subMenu.classList.add('sub-open');
                        }
                    }
                });
            });
        });
    }

    var win = $(window);
    var totop = $('#top-to-bottom');
    win.on('scroll', function() {
        if (win.scrollTop() > 150) {
            totop.fadeIn();
            $('.rts_header__switch').addClass('btt__enable');
            $('#top-to-bottom').addClass('scroll_visible');
        } else {
            totop.slideDown(400);
            $('.rts_header__switch').removeClass('btt__enable');
            $('#top-to-bottom').removeClass('scroll_visible');

        }
    });
    totop.on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    });

    $(window).on('load', function() {
        $('#de-loader').fadeOut();
    });

    function initBackPostSlider($scope) {
        var $slider = $scope.find('.rt-all-slider');
        if (!$slider.length) {
            return;
        }
        var loop = $slider.data('loop') === true || $slider.data('loop') === 'true';
        var autoplay = $slider.data('autoplay') === true || $slider.data('autoplay') === 'true';
        var autoplayDelay = parseInt($slider.data('autoplay-delay'), 10) || 3000;
        var slidesPerView = parseInt($slider.data('slides-per-view'), 10) || 3;
        var speed = parseInt($slider.data('speed'), 10) || 600;
        var centeredSlides = $slider.data('centered-slides') === true || $slider.data('centered-slides') === 'true';
        var freeMode = $slider.data('free-mode') === true || $slider.data('free-mode') === 'true';
        var spaceBetween = parseInt($slider.data('space-between'), 10) || 0;
        var slidesPerViewTablet = parseInt($slider.data('slides-per-view-tablet'), 10) || 2;
        var slidesPerViewMobile = parseInt($slider.data('slides-per-view-mobile'), 10) || 1;
        var paginationType = $slider.data('pagination') !== 'none' ? $slider.data('pagination') : false;
        var navigation = $slider.data('navigation') === true || $slider.data('navigation') === 'true';
        new Swiper($slider[0], {
            loop: loop,
            speed: speed,
            simulateTouch: true,
            touchRatio: 1,
            grabCursor: true,
            autoplay: autoplay ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
            } : false,
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
            centeredSlides: centeredSlides,
            freeMode: freeMode,
            pagination: paginationType ? {
                el: '#' + $slider.attr('id') + ' .swiper-pagination',
                clickable: true,
                type: paginationType,
            } : false,
            navigation: navigation ? {
                nextEl: '#' + $slider.attr('id') + ' .swiper-next',
                prevEl: '#' + $slider.attr('id') + ' .swiper-prev',
            } : false,
            breakpoints: {
                0: {
                    slidesPerView: slidesPerViewMobile,
                },
                768: {
                    slidesPerView: slidesPerViewTablet,
                },
                1024: {
                    slidesPerView: slidesPerView,
                },
            },
        });
    }
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/global', initBackPostSlider);
    });

    // Canvas Menu Js
    $(".nav-link-container > a").off("click").on("click", function(event) {
        event.preventDefault();
        $(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
        $(".mobile-menus").toggleClass("nav-active-menu-container");
    });

    $(".nav-close-menu-li > a").on('click', function(event) {
        $(".mobile-menus").toggleClass("nav-active-menu-container");
        $(".content").toggleClass("inactive-body");
    });

    function menu_active() {
        const sections = document.querySelectorAll("[id]"); // সব id যুক্ত element
        const menuLinks = document.querySelectorAll("#menu-primary-menu .main-menu-link");

        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    window.pageYOffset >= sectionTop - 80 &&
                    window.pageYOffset < sectionTop + sectionHeight - 80
                ) {
                    current = section.getAttribute("id");
                }
            });

            menuLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });
        });
    }
    jQuery(document).ready(function($) {
        // Smooth scroll on click
        $('#menu-primary-menu a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            let target = $(this.getAttribute('href'));

            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 600);
            }
        });

        // Scroll based active menu
        menu_active();

        // Load with hash
        const hash = window.location.hash;
        if (hash && $(hash).length) {
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 600);
                $('#menu-primary-menu .main-menu-link').removeClass('active');
                $('#menu-primary-menu .main-menu-link[href="' + hash + '"]').addClass('active');
            }, 300);
        }
    });

    // slider 
    function initBackPostSlider($scope) {
        var $slider = $scope.find('.rt-all-slider');
        if (!$slider.length) {
            return;
        }
        var loop = $slider.data('loop') === true || $slider.data('loop') === 'true';
        var autoplay = $slider.data('autoplay') === true || $slider.data('autoplay') === 'true';
        var autoplayDelay = parseInt($slider.data('autoplay-delay'), 10) || 3000;
        var slidesPerView = parseInt($slider.data('slides-per-view'), 10) || 3;
        var speed = parseInt($slider.data('speed'), 10) || 600;
        var centeredSlides = $slider.data('centered-slides') === true || $slider.data('centered-slides') === 'true';
        var freeMode = $slider.data('free-mode') === true || $slider.data('free-mode') === 'true';
        var spaceBetween = parseInt($slider.data('space-between'), 10) || 0;
        var slidesPerViewTablet = parseInt($slider.data('slides-per-view-tablet'), 10) || 2;
        var slidesPerViewMobile = parseInt($slider.data('slides-per-view-mobile'), 10) || 1;
        var paginationType = $slider.data('pagination') !== 'none' ? $slider.data('pagination') : false;
        var navigation = $slider.data('navigation') === true || $slider.data('navigation') === 'true';
        new Swiper($slider[0], {
            loop: loop,
            speed: speed,
            simulateTouch: true,
            touchRatio: 1,
            grabCursor: true,
            autoplay: autoplay ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
            } : false,
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
            centeredSlides: centeredSlides,
            freeMode: freeMode,
            pagination: paginationType ? {
                el: '#' + $slider.attr('id') + ' .swiper-pagination',
                clickable: true,
                type: paginationType,
            } : false,
            navigation: navigation ? {
                nextEl: '#' + $slider.attr('id') + ' .swiper-next',
                prevEl: '#' + $slider.attr('id') + ' .swiper-prev',
            } : false,
            breakpoints: {
                0: {
                    slidesPerView: slidesPerViewMobile,
                },
                768: {
                    slidesPerView: slidesPerViewTablet,
                },
                1024: {
                    slidesPerView: slidesPerView,
                },
            },
        });
    }
})(jQuery);