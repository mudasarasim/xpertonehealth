var Wjs = (function() {
    var $ = jQuery;

    return {
        m: function(e) {
            this.methods(e);
        },
        methods: function(e) {
            this.wow();
        },
        wow: function() {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();
        },
    };
})();

Wjs.m();

(function($) {
    var jarallaxIdCounter = 0;

    function initJarallax() {
        $(".jarallax, .has-jarallax-img").each(function(i, el) {
            var $el = $(el);
            var dataId = $el.attr('data-id');
            if (dataId) {
                el.id = 'jarallax-container-' + dataId;
            } else if (!el.id || !el.id.startsWith('jarallax-container-')) {
                el.id = 'jarallax-container-' + (jarallaxIdCounter++);
            }
        });
        $(".jarallax, .has-jarallax-img").jarallax("destroy");
        $(".has-jarallax-img .jarallax-img").remove();

        $(".has-jarallax-img").each(function() {
            var $container = $(this);
            var bg = $container.css('background-image');
            var match = /url\(["']?([^"')]+)["']?\)/.exec(bg);
            if ((!match || !match[1]) && $container.data('jarallax-bg')) {
                match = [null, $container.data('jarallax-bg')];
            }
            if (match && match[1]) {
                $container.prepend('<img class="jarallax-img" src="' + match[1] + '" alt="">');
                $container.data('jarallax-bg', match[1]);
                $container.css('background-image', 'none');
            }
        });

        $(".jarallax, .has-jarallax-img").jarallax({
            speed: 0.5
        });
    }

    var jarallaxHookAdded = false;

    function addJarallaxHook() {
        if (!jarallaxHookAdded && typeof elementorFrontend !== 'undefined' && elementorFrontend.hooks) {
            elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                initJarallax();
            });
            // Add widget-specific hooks for reliability
            elementorFrontend.hooks.addAction('frontend/element_ready/section', function() {
                initJarallax();
            });
            elementorFrontend.hooks.addAction('frontend/element_ready/container', function() {
                initJarallax();
            });
            elementorFrontend.hooks.addAction('frontend/element_ready/image', function() {
                initJarallax();
            });
            jarallaxHookAdded = true;
        }
    }

    $(window).on('elementor/frontend/init', function() {
        initJarallax();
        addJarallaxHook();
    });

    if (typeof elementorFrontend !== 'undefined' && elementorFrontend.hooks) {
        addJarallaxHook();
    }

    $(document).ready(function() {
        if (typeof elementorFrontend === 'undefined') {
            initJarallax();
        }
    });
})(jQuery);