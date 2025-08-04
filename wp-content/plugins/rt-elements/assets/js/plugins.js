/*!
 * Jarallax v2.2.1 (https://github.com/nk-o/jarallax)
 * Copyright 2024 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallax = t()
}(this, (function() {
    "use strict";

    function e(e) {
        "complete" === document.readyState || "interactive" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, {
            capture: !0,
            once: !0,
            passive: !0
        })
    }
    let t;
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var i = t,
        o = {
            type: "scroll",
            speed: .5,
            containerClass: "jarallax-container",
            imgSrc: null,
            imgElement: ".jarallax-img",
            imgSize: "cover",
            imgPosition: "50% 50%",
            imgRepeat: "no-repeat",
            keepImg: !1,
            elementInViewport: null,
            zIndex: -100,
            disableParallax: !1,
            onScroll: null,
            onInit: null,
            onDestroy: null,
            onCoverImage: null,
            videoClass: "jarallax-video",
            videoSrc: null,
            videoStartTime: 0,
            videoEndTime: 0,
            videoVolume: 0,
            videoLoop: !0,
            videoPlayOnlyVisible: !0,
            videoLazyLoading: !0,
            disableVideo: !1,
            onVideoInsert: null,
            onVideoWorkerInit: null
        };
    const {
        navigator: n
    } = i, a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent);
    let s, l, r;

    function c() {
        s = i.innerWidth || document.documentElement.clientWidth, a ? (!r && document.body && (r = document.createElement("div"), r.style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;", document.body.appendChild(r)), l = (r ? r.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight) : l = i.innerHeight || document.documentElement.clientHeight
    }

    function p() {
        return {
            width: s,
            height: l
        }
    }
    c(), i.addEventListener("resize", c), i.addEventListener("orientationchange", c), i.addEventListener("load", c), e((() => {
        c()
    }));
    const m = [];

    function d() {
        if (!m.length) return;
        const {
            width: e,
            height: t
        } = p();
        m.forEach(((i, o) => {
            const {
                instance: n,
                oldData: a
            } = i;
            if (!n.isVisible()) return;
            const s = n.$item.getBoundingClientRect(),
                l = {
                    width: s.width,
                    height: s.height,
                    top: s.top,
                    bottom: s.bottom,
                    wndW: e,
                    wndH: t
                },
                r = !a || a.wndW !== l.wndW || a.wndH !== l.wndH || a.width !== l.width || a.height !== l.height,
                c = r || !a || a.top !== l.top || a.bottom !== l.bottom;
            m[o].oldData = l, r && n.onResize(), c && n.onScroll()
        })), i.requestAnimationFrame(d)
    }
    const g = new i.IntersectionObserver((e => {
        e.forEach((e => {
            e.target.jarallax.isElementInViewport = e.isIntersecting
        }))
    }), {
        rootMargin: "50px"
    });
    const {
        navigator: u
    } = i;
    let f = 0;
    class h {
        constructor(e, t) {
            const i = this;
            i.instanceID = f, f += 1, i.$item = e, i.defaults = { ...o
            };
            const n = i.$item.dataset || {},
                a = {};
            if (Object.keys(n).forEach((e => {
                    const t = e.substr(0, 1).toLowerCase() + e.substr(1);
                    t && void 0 !== i.defaults[t] && (a[t] = n[e])
                })), i.options = i.extend({}, i.defaults, a, t), i.pureOptions = i.extend({}, i.options), Object.keys(i.options).forEach((e => {
                    "true" === i.options[e] ? i.options[e] = !0 : "false" === i.options[e] && (i.options[e] = !1)
                })), i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))), "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)), i.options.disableParallax instanceof RegExp) {
                const e = i.options.disableParallax;
                i.options.disableParallax = () => e.test(u.userAgent)
            }
            if ("function" != typeof i.options.disableParallax) {
                const e = i.options.disableParallax;
                i.options.disableParallax = () => !0 === e
            }
            if ("string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)), i.options.disableVideo instanceof RegExp) {
                const e = i.options.disableVideo;
                i.options.disableVideo = () => e.test(u.userAgent)
            }
            if ("function" != typeof i.options.disableVideo) {
                const e = i.options.disableVideo;
                i.options.disableVideo = () => !0 === e
            }
            let s = i.options.elementInViewport;
            s && "object" == typeof s && void 0 !== s.length && ([s] = s), s instanceof Element || (s = null), i.options.elementInViewport = s, i.image = {
                src: i.options.imgSrc || null,
                $container: null,
                useImgTag: !1,
                position: "fixed"
            }, i.initImg() && i.canInitParallax() && i.init()
        }
        css(e, t) {
            return function(e, t) {
                return "string" == typeof t ? i.getComputedStyle(e).getPropertyValue(t) : (Object.keys(t).forEach((i => {
                    e.style[i] = t[i]
                })), e)
            }(e, t)
        }
        extend(e, ...t) {
            return function(e, ...t) {
                return e = e || {}, Object.keys(t).forEach((i => {
                    t[i] && Object.keys(t[i]).forEach((o => {
                        e[o] = t[i][o]
                    }))
                })), e
            }(e, ...t)
        }
        getWindowData() {
            const {
                width: e,
                height: t
            } = p();
            return {
                width: e,
                height: t,
                y: document.documentElement.scrollTop
            }
        }
        initImg() {
            const e = this;
            let t = e.options.imgElement;
            return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (e.options.imgSrc ? (t = new Image, t.src = e.options.imgSrc) : t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", e.image.bgImage = e.css(e.$item, "background-image")), !(!e.image.bgImage || "none" === e.image.bgImage))
        }
        canInitParallax() {
            return !this.options.disableParallax()
        }
        init() {
            const e = this,
                t = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                };
            let o = {
                pointerEvents: "none",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
            };
            if (!e.options.keepImg) {
                const t = e.$item.getAttribute("style");
                if (t && e.$item.setAttribute("data-jarallax-original-styles", t), e.image.useImgTag) {
                    const t = e.image.$item.getAttribute("style");
                    t && e.image.$item.setAttribute("data-jarallax-original-styles", t)
                }
            }
            if ("static" === e.css(e.$item, "position") && e.css(e.$item, {
                    position: "relative"
                }), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {
                    zIndex: 0
                }), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, {
                    "z-index": e.options.zIndex
                }), "fixed" === this.image.position && e.css(e.image.$container, {
                    "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                }), e.image.$container.setAttribute("id", `jarallax-container-${e.instanceID}`), e.options.containerClass && e.image.$container.setAttribute("class", e.options.containerClass), e.$item.appendChild(e.image.$container), e.image.useImgTag ? o = e.extend({
                    "object-fit": e.options.imgSize,
                    "object-position": e.options.imgPosition,
                    "max-width": "none"
                }, t, o) : (e.image.$item = document.createElement("div"), e.image.src && (o = e.extend({
                    "background-position": e.options.imgPosition,
                    "background-size": e.options.imgSize,
                    "background-repeat": e.options.imgRepeat,
                    "background-image": e.image.bgImage || `url("${e.image.src}")`
                }, t, o))), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position) {
                const t = function(e) {
                    const t = [];
                    for (; null !== e.parentElement;) 1 === (e = e.parentElement).nodeType && t.push(e);
                    return t
                }(e.$item).filter((e => {
                    const t = i.getComputedStyle(e),
                        o = t["-webkit-transform"] || t["-moz-transform"] || t.transform;
                    return o && "none" !== o || /(auto|scroll)/.test(t.overflow + t["overflow-y"] + t["overflow-x"])
                }));
                e.image.position = t.length ? "absolute" : "fixed"
            }
            var n;
            o.position = e.image.position, e.css(e.image.$item, o), e.image.$container.appendChild(e.image.$item), e.onResize(), e.onScroll(!0), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {
                "background-image": "none"
            }), n = e, m.push({
                instance: n
            }), 1 === m.length && i.requestAnimationFrame(d), g.observe(n.options.elementInViewport || n.$item)
        }
        destroy() {
            const e = this;
            var t;
            t = e, m.forEach(((e, i) => {
                e.instance.instanceID === t.instanceID && m.splice(i, 1)
            })), g.unobserve(t.options.elementInViewport || t.$item);
            const i = e.$item.getAttribute("data-jarallax-original-styles");
            if (e.$item.removeAttribute("data-jarallax-original-styles"), i ? e.$item.setAttribute("style", i) : e.$item.removeAttribute("style"), e.image.useImgTag) {
                const t = e.image.$item.getAttribute("data-jarallax-original-styles");
                e.image.$item.removeAttribute("data-jarallax-original-styles"), t ? e.image.$item.setAttribute("style", i) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
            }
            e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax
        }
        coverImage() {
            const e = this,
                {
                    height: t
                } = p(),
                i = e.image.$container.getBoundingClientRect(),
                o = i.height,
                {
                    speed: n
                } = e.options,
                a = "scroll" === e.options.type || "scroll-opacity" === e.options.type;
            let s = 0,
                l = o,
                r = 0;
            return a && (n < 0 ? (s = n * Math.max(o, t), t < o && (s -= n * (o - t))) : s = n * (o + t), n > 1 ? l = Math.abs(s - t) : n < 0 ? l = s / n + Math.abs(s) : l += (t - o) * (1 - n), s /= 2), e.parallaxScrollDistance = s, r = a ? (t - l) / 2 : (o - l) / 2, e.css(e.image.$item, {
                height: `${l}px`,
                marginTop: `${r}px`,
                left: "fixed" === e.image.position ? `${i.left}px` : "0",
                width: `${i.width}px`
            }), e.options.onCoverImage && e.options.onCoverImage.call(e), {
                image: {
                    height: l,
                    marginTop: r
                },
                container: i
            }
        }
        isVisible() {
            return this.isElementInViewport || !1
        }
        onScroll(e) {
            const t = this;
            if (!e && !t.isVisible()) return;
            const {
                height: i
            } = p(), o = t.$item.getBoundingClientRect(), n = o.top, a = o.height, s = {}, l = Math.max(0, n), r = Math.max(0, a + n), c = Math.max(0, -n), m = Math.max(0, n + a - i), d = Math.max(0, a - (n + a - i)), g = Math.max(0, -n + i - a), u = 1 - (i - n) / (i + a) * 2;
            let f = 1;
            if (a < i ? f = 1 - (c || m) / a : r <= i ? f = r / i : d <= i && (f = d / i), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (s.transform = "translate3d(0,0,0)", s.opacity = f), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                let e = 1;
                t.options.speed < 0 ? e -= t.options.speed * f : e += t.options.speed * (1 - f), s.transform = `scale(${e}) translate3d(0,0,0)`
            }
            if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                let e = t.parallaxScrollDistance * u;
                "absolute" === t.image.position && (e -= n), s.transform = `translate3d(0,${e}px,0)`
            }
            t.css(t.image.$item, s), t.options.onScroll && t.options.onScroll.call(t, {
                section: o,
                beforeTop: l,
                beforeTopEnd: r,
                afterTop: c,
                beforeBottom: m,
                beforeBottomEnd: d,
                afterBottom: g,
                visiblePercent: f,
                fromViewportCenter: u
            })
        }
        onResize() {
            this.coverImage()
        }
    }
    const b = function(e, t, ...i) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        const o = e.length;
        let n, a = 0;
        for (; a < o; a += 1)
            if ("object" == typeof t || void 0 === t ? e[a].jarallax || (e[a].jarallax = new h(e[a], t)) : e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)), void 0 !== n) return n;
        return e
    };
    b.constructor = h;
    const y = i.jQuery;
    if (void 0 !== y) {
        const e = function(...e) {
            Array.prototype.unshift.call(e, this);
            const t = b.apply(i, e);
            return "object" != typeof t ? t : this
        };
        e.constructor = b.constructor;
        const t = y.fn.jarallax;
        y.fn.jarallax = e, y.fn.jarallax.noConflict = function() {
            return y.fn.jarallax = t, this
        }
    }
    return e((() => {
        b(document.querySelectorAll("[data-jarallax]"))
    })), b
})); //# sourceMappingURL=jarallax.min.js.map

/*!
 * Video Extension for Jarallax v2.0.2 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallaxVideo = t()
}(this, (function() {
    "use strict";
    /*!
     * Name    : Video Worker
     * Version : 2.0.0
     * Author  : nK <https://nkdev.info>
     * GitHub  : https://github.com/nk-o/video-worker
     */
    let e;
    e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var t = e;

    function o() {
        this.doneCallbacks = [], this.failCallbacks = []
    }
    o.prototype = {
        execute(e, t) {
            let o = e.length;
            for (t = Array.prototype.slice.call(t); o;) o -= 1, e[o].apply(null, t)
        },
        resolve(...e) {
            this.execute(this.doneCallbacks, e)
        },
        reject(...e) {
            this.execute(this.failCallbacks, e)
        },
        done(e) {
            this.doneCallbacks.push(e)
        },
        fail(e) {
            this.failCallbacks.push(e)
        }
    };
    let i = 0,
        a = 0,
        n = 0,
        s = 0,
        l = 0;
    const r = new o,
        p = new o;
    class d {
        constructor(e, t) {
            const o = this;
            o.url = e, o.options_default = {
                autoplay: !1,
                loop: !1,
                mute: !1,
                volume: 100,
                showControls: !0,
                accessibilityHidden: !1,
                startTime: 0,
                endTime: 0
            }, o.options = o.extend({}, o.options_default, t), void 0 !== o.options.showContols && (o.options.showControls = o.options.showContols, delete o.options.showContols), o.videoID = o.parseURL(e), o.videoID && (o.ID = i, i += 1, o.loadAPI(), o.init())
        }
        extend(...e) {
            const t = e[0] || {};
            return Object.keys(e).forEach((o => {
                e[o] && Object.keys(e[o]).forEach((i => {
                    t[i] = e[o][i]
                }))
            })), t
        }
        parseURL(e) {
            const t = function(e) {
                    const t = e.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/);
                    return !(!t || 11 !== t[1].length) && t[1]
                }(e),
                o = function(e) {
                    const t = e.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                    return !(!t || !t[3]) && t[3]
                }(e),
                i = function(e) {
                    const t = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/),
                        o = {};
                    let i = 0;
                    return t.forEach((e => {
                        const t = e.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                        t && t[1] && t[2] && (o["ogv" === t[1] ? "ogg" : t[1]] = t[2], i = 1)
                    })), !!i && o
                }(e);
            return t ? (this.type = "youtube", t) : o ? (this.type = "vimeo", o) : !!i && (this.type = "local", i)
        }
        isValid() {
            return !!this.videoID
        }
        on(e, t) {
            this.userEventsList = this.userEventsList || [], (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t)
        }
        off(e, t) {
            this.userEventsList && this.userEventsList[e] && (t ? this.userEventsList[e].forEach(((o, i) => {
                o === t && (this.userEventsList[e][i] = !1)
            })) : delete this.userEventsList[e])
        }
        fire(e, ...t) {
            this.userEventsList && void 0 !== this.userEventsList[e] && this.userEventsList[e].forEach((e => {
                e && e.apply(this, t)
            }))
        }
        play(e) {
            const o = this;
            o.player && ("youtube" === o.type && o.player.playVideo && (void 0 !== e && o.player.seekTo(e || 0), t.YT.PlayerState.PLAYING !== o.player.getPlayerState() && o.player.playVideo()), "vimeo" === o.type && (void 0 !== e && o.player.setCurrentTime(e), o.player.getPaused().then((e => {
                e && o.player.play()
            }))), "local" === o.type && (void 0 !== e && (o.player.currentTime = e), o.player.paused && o.player.play()))
        }
        pause() {
            const e = this;
            e.player && ("youtube" === e.type && e.player.pauseVideo && t.YT.PlayerState.PLAYING === e.player.getPlayerState() && e.player.pauseVideo(), "vimeo" === e.type && e.player.getPaused().then((t => {
                t || e.player.pause()
            })), "local" === e.type && (e.player.paused || e.player.pause()))
        }
        mute() {
            const e = this;
            e.player && ("youtube" === e.type && e.player.mute && e.player.mute(), "vimeo" === e.type && e.player.setVolume && e.player.setVolume(0), "local" === e.type && (e.$video.muted = !0))
        }
        unmute() {
            const e = this;
            e.player && ("youtube" === e.type && e.player.mute && e.player.unMute(), "vimeo" === e.type && e.player.setVolume && e.player.setVolume(e.options.volume), "local" === e.type && (e.$video.muted = !1))
        }
        setVolume(e = !1) {
            const t = this;
            t.player && e && ("youtube" === t.type && t.player.setVolume && t.player.setVolume(e), "vimeo" === t.type && t.player.setVolume && t.player.setVolume(e), "local" === t.type && (t.$video.volume = e / 100))
        }
        getVolume(e) {
            const t = this;
            t.player ? ("youtube" === t.type && t.player.getVolume && e(t.player.getVolume()), "vimeo" === t.type && t.player.getVolume && t.player.getVolume().then((t => {
                e(t)
            })), "local" === t.type && e(100 * t.$video.volume)) : e(!1)
        }
        getMuted(e) {
            const t = this;
            t.player ? ("youtube" === t.type && t.player.isMuted && e(t.player.isMuted()), "vimeo" === t.type && t.player.getVolume && t.player.getVolume().then((t => {
                e(!!t)
            })), "local" === t.type && e(t.$video.muted)) : e(null)
        }
        getImageURL(e) {
            const t = this;
            if (t.videoImage) e(t.videoImage);
            else {
                if ("youtube" === t.type) {
                    const o = ["maxresdefault", "sddefault", "hqdefault", "0"];
                    let i = 0;
                    const a = new Image;
                    a.onload = function() {
                        120 !== (this.naturalWidth || this.width) || i === o.length - 1 ? (t.videoImage = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`, e(t.videoImage)) : (i += 1, this.src = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`)
                    }, a.src = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`
                }
                if ("vimeo" === t.type) {
                    let o = new XMLHttpRequest;
                    o.open("GET", `https://vimeo.com/api/oembed.json?url=${t.url}`, !0), o.onreadystatechange = function() {
                        if (4 === this.readyState && this.status >= 200 && this.status < 400) {
                            const o = JSON.parse(this.responseText);
                            o.thumbnail_url && (t.videoImage = o.thumbnail_url, e(t.videoImage))
                        }
                    }, o.send(), o = null
                }
            }
        }
        getIframe(e) {
            this.getVideo(e)
        }
        getVideo(e) {
            const o = this;
            o.$video ? e(o.$video) : o.onAPIready((() => {
                let i;
                if (o.$video || (i = document.createElement("div"), i.style.display = "none"), "youtube" === o.type) {
                    let e, a;
                    o.playerOptions = {
                        host: "https://www.youtube-nocookie.com",
                        videoId: o.videoID,
                        playerVars: {
                            autohide: 1,
                            rel: 0,
                            autoplay: 0,
                            playsinline: 1
                        }
                    }, o.options.showControls || (o.playerOptions.playerVars.iv_load_policy = 3, o.playerOptions.playerVars.modestbranding = 1, o.playerOptions.playerVars.controls = 0, o.playerOptions.playerVars.showinfo = 0, o.playerOptions.playerVars.disablekb = 1), o.playerOptions.events = {
                        onReady(e) {
                            if (o.options.mute ? e.target.mute() : o.options.volume && e.target.setVolume(o.options.volume), o.options.autoplay && o.play(o.options.startTime), o.fire("ready", e), o.options.loop && !o.options.endTime) {
                                const e = .1;
                                o.options.endTime = o.player.getDuration() - e
                            }
                            setInterval((() => {
                                o.getVolume((t => {
                                    o.options.volume !== t && (o.options.volume = t, o.fire("volumechange", e))
                                }))
                            }), 150)
                        },
                        onStateChange(i) {
                            o.options.loop && i.data === t.YT.PlayerState.ENDED && o.play(o.options.startTime), e || i.data !== t.YT.PlayerState.PLAYING || (e = 1, o.fire("started", i)), i.data === t.YT.PlayerState.PLAYING && o.fire("play", i), i.data === t.YT.PlayerState.PAUSED && o.fire("pause", i), i.data === t.YT.PlayerState.ENDED && o.fire("ended", i), i.data === t.YT.PlayerState.PLAYING ? a = setInterval((() => {
                                o.fire("timeupdate", i), o.options.endTime && o.player.getCurrentTime() >= o.options.endTime && (o.options.loop ? o.play(o.options.startTime) : o.pause())
                            }), 150) : clearInterval(a)
                        },
                        onError(e) {
                            o.fire("error", e)
                        }
                    };
                    const n = !o.$video;
                    if (n) {
                        const e = document.createElement("div");
                        e.setAttribute("id", o.playerID), i.appendChild(e), document.body.appendChild(i)
                    }
                    o.player = o.player || new t.YT.Player(o.playerID, o.playerOptions), n && (o.$video = document.getElementById(o.playerID), o.options.accessibilityHidden && (o.$video.setAttribute("tabindex", "-1"), o.$video.setAttribute("aria-hidden", "true")), o.videoWidth = parseInt(o.$video.getAttribute("width"), 10) || 1280, o.videoHeight = parseInt(o.$video.getAttribute("height"), 10) || 720)
                }
                if ("vimeo" === o.type) {
                    if (o.playerOptions = {
                            dnt: 1,
                            id: o.videoID,
                            autopause: 0,
                            transparent: 0,
                            autoplay: o.options.autoplay ? 1 : 0,
                            loop: o.options.loop ? 1 : 0,
                            muted: o.options.mute ? 1 : 0
                        }, o.options.volume && (o.playerOptions.volume = o.options.volume), o.options.showControls || (o.playerOptions.badge = 0, o.playerOptions.byline = 0, o.playerOptions.portrait = 0, o.playerOptions.title = 0, o.playerOptions.background = 1), !o.$video) {
                        let e = "";
                        Object.keys(o.playerOptions).forEach((t => {
                            "" !== e && (e += "&"), e += `${t}=${encodeURIComponent(o.playerOptions[t])}`
                        })), o.$video = document.createElement("iframe"), o.$video.setAttribute("id", o.playerID), o.$video.setAttribute("src", `https://player.vimeo.com/video/${o.videoID}?${e}`), o.$video.setAttribute("frameborder", "0"), o.$video.setAttribute("mozallowfullscreen", ""), o.$video.setAttribute("allowfullscreen", ""), o.$video.setAttribute("title", "Vimeo video player"), o.options.accessibilityHidden && (o.$video.setAttribute("tabindex", "-1"), o.$video.setAttribute("aria-hidden", "true")), i.appendChild(o.$video), document.body.appendChild(i)
                    }
                    let e;
                    o.player = o.player || new t.Vimeo.Player(o.$video, o.playerOptions), o.options.startTime && o.options.autoplay && o.player.setCurrentTime(o.options.startTime), o.player.getVideoWidth().then((e => {
                        o.videoWidth = e || 1280
                    })), o.player.getVideoHeight().then((e => {
                        o.videoHeight = e || 720
                    })), o.player.on("timeupdate", (t => {
                        e || (o.fire("started", t), e = 1), o.fire("timeupdate", t), o.options.endTime && o.options.endTime && t.seconds >= o.options.endTime && (o.options.loop ? o.play(o.options.startTime) : o.pause())
                    })), o.player.on("play", (e => {
                        o.fire("play", e), o.options.startTime && 0 === e.seconds && o.play(o.options.startTime)
                    })), o.player.on("pause", (e => {
                        o.fire("pause", e)
                    })), o.player.on("ended", (e => {
                        o.fire("ended", e)
                    })), o.player.on("loaded", (e => {
                        o.fire("ready", e)
                    })), o.player.on("volumechange", (e => {
                        o.fire("volumechange", e)
                    })), o.player.on("error", (e => {
                        o.fire("error", e)
                    }))
                }
                if ("local" === o.type) {
                    let e;
                    o.$video || (o.$video = document.createElement("video"), o.options.showControls && (o.$video.controls = !0), o.options.mute ? o.$video.muted = !0 : o.$video.volume && (o.$video.volume = o.options.volume / 100), o.options.loop && (o.$video.loop = !0), o.$video.setAttribute("playsinline", ""), o.$video.setAttribute("webkit-playsinline", ""), o.options.accessibilityHidden && (o.$video.setAttribute("tabindex", "-1"), o.$video.setAttribute("aria-hidden", "true")), o.$video.setAttribute("id", o.playerID), i.appendChild(o.$video), document.body.appendChild(i), Object.keys(o.videoID).forEach((e => {
                        ! function(e, t, o) {
                            const i = document.createElement("source");
                            i.src = t, i.type = o, e.appendChild(i)
                        }(o.$video, o.videoID[e], `video/${e}`)
                    }))), o.player = o.player || o.$video, o.player.addEventListener("playing", (t => {
                        e || o.fire("started", t), e = 1
                    })), o.player.addEventListener("timeupdate", (function(e) {
                        o.fire("timeupdate", e), o.options.endTime && o.options.endTime && this.currentTime >= o.options.endTime && (o.options.loop ? o.play(o.options.startTime) : o.pause())
                    })), o.player.addEventListener("play", (e => {
                        o.fire("play", e)
                    })), o.player.addEventListener("pause", (e => {
                        o.fire("pause", e)
                    })), o.player.addEventListener("ended", (e => {
                        o.fire("ended", e)
                    })), o.player.addEventListener("loadedmetadata", (function() {
                        o.videoWidth = this.videoWidth || 1280, o.videoHeight = this.videoHeight || 720, o.fire("ready"), o.options.autoplay && o.play(o.options.startTime)
                    })), o.player.addEventListener("volumechange", (e => {
                        o.getVolume((e => {
                            o.options.volume = e
                        })), o.fire("volumechange", e)
                    })), o.player.addEventListener("error", (e => {
                        o.fire("error", e)
                    }))
                }
                e(o.$video)
            }))
        }
        init() {
            this.playerID = `VideoWorker-${this.ID}`
        }
        loadAPI() {
            if (a && n) return;
            let e = "";
            if ("youtube" !== this.type || a || (a = 1, e = "https://www.youtube.com/iframe_api"), "vimeo" === this.type && !n) {
                if (n = 1, void 0 !== t.Vimeo) return;
                e = "https://player.vimeo.com/api/player.js"
            }
            if (!e) return;
            let o = document.createElement("script"),
                i = document.getElementsByTagName("head")[0];
            o.src = e, i.appendChild(o), i = null, o = null
        }
        onAPIready(e) {
            const o = this;
            if ("youtube" === o.type && (void 0 !== t.YT && 0 !== t.YT.loaded || s ? "object" == typeof t.YT && 1 === t.YT.loaded ? e() : r.done((() => {
                    e()
                })) : (s = 1, t.onYouTubeIframeAPIReady = function() {
                    t.onYouTubeIframeAPIReady = null, r.resolve("done"), e()
                })), "vimeo" === o.type)
                if (void 0 !== t.Vimeo || l) void 0 !== t.Vimeo ? e() : p.done((() => {
                    e()
                }));
                else {
                    l = 1;
                    const o = setInterval((() => {
                        void 0 !== t.Vimeo && (clearInterval(o), p.resolve("done"), e())
                    }), 20)
                }
            "local" === o.type && e()
        }
    }
    let u;
    u = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var y, m = u;

    function c(e = m.jarallax) {
        if (void 0 === e) return;
        const t = e.constructor,
            o = t.prototype.onScroll;
        t.prototype.onScroll = function() {
            const e = this;
            o.apply(e);
            !e.isVideoInserted && e.video && (!e.options.videoLazyLoading || e.isElementInViewport) && !e.options.disableVideo() && (e.isVideoInserted = !0, e.video.getVideo((t => {
                const o = t.parentNode;
                e.css(t, {
                    position: e.image.position,
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                    pointerEvents: "none",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform,opacity",
                    margin: 0,
                    zIndex: -1
                }), e.$video = t, "local" === e.video.type && (e.image.src ? e.$video.setAttribute("poster", e.image.src) : e.image.$item && "IMG" === e.image.$item.tagName && e.image.$item.src && e.$video.setAttribute("poster", e.image.$item.src)), e.image.$container.appendChild(t), o.parentNode.removeChild(o), e.options.onVideoInsert && e.options.onVideoInsert.call(e)
            })))
        };
        const i = t.prototype.coverImage;
        t.prototype.coverImage = function() {
            const e = this,
                t = i.apply(e),
                o = !!e.image.$item && e.image.$item.nodeName;
            if (t && e.video && o && ("IFRAME" === o || "VIDEO" === o)) {
                let i = t.image.height,
                    a = i * e.image.width / e.image.height,
                    n = (t.container.width - a) / 2,
                    s = t.image.marginTop;
                t.container.width > a && (a = t.container.width, i = a * e.image.height / e.image.width, n = 0, s += (t.image.height - i) / 2), "IFRAME" === o && (i += 400, s -= 200), e.css(e.$video, {
                    width: `${a}px`,
                    marginLeft: `${n}px`,
                    height: `${i}px`,
                    marginTop: `${s}px`
                })
            }
            return t
        };
        const a = t.prototype.initImg;
        t.prototype.initImg = function() {
            const e = this,
                t = a.apply(e);
            return e.options.videoSrc || (e.options.videoSrc = e.$item.getAttribute("data-jarallax-video") || null), e.options.videoSrc ? (e.defaultInitImgResult = t, !0) : t
        };
        const n = t.prototype.canInitParallax;
        t.prototype.canInitParallax = function() {
            const e = this;
            let t = n.apply(e);
            if (!e.options.videoSrc) return t;
            const o = new d(e.options.videoSrc, {
                autoplay: !0,
                loop: e.options.videoLoop,
                showControls: !1,
                accessibilityHidden: !0,
                startTime: e.options.videoStartTime || 0,
                endTime: e.options.videoEndTime || 0,
                mute: e.options.videoVolume ? 0 : 1,
                volume: e.options.videoVolume || 0
            });

            function i() {
                e.image.$default_item && (e.image.$item = e.image.$default_item, e.image.$item.style.display = "block", e.coverImage(), e.onScroll())
            }
            if (e.options.onVideoWorkerInit && e.options.onVideoWorkerInit.call(e, o), o.isValid())
                if (this.options.disableParallax() && (t = !0, e.image.position = "absolute", e.options.type = "scroll", e.options.speed = 1), t) {
                    if (o.on("ready", (() => {
                            if (e.options.videoPlayOnlyVisible) {
                                const t = e.onScroll;
                                e.onScroll = function() {
                                    t.apply(e), e.videoError || !e.options.videoLoop && (e.options.videoLoop || e.videoEnded) || (e.isVisible() ? o.play() : o.pause())
                                }
                            } else o.play()
                        })), o.on("started", (() => {
                            e.image.$default_item = e.image.$item, e.image.$item = e.$video, e.image.width = e.video.videoWidth || 1280, e.image.height = e.video.videoHeight || 720, e.coverImage(), e.onScroll(), e.image.$default_item && (e.image.$default_item.style.display = "none")
                        })), o.on("ended", (() => {
                            e.videoEnded = !0, e.options.videoLoop || i()
                        })), o.on("error", (() => {
                            e.videoError = !0, i()
                        })), e.video = o, !e.defaultInitImgResult && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "local" !== o.type)) return o.getImageURL((t => {
                        e.image.bgImage = `url("${t}")`, e.init()
                    })), !1
                } else e.defaultInitImgResult || o.getImageURL((t => {
                    const o = e.$item.getAttribute("style");
                    o && e.$item.setAttribute("data-jarallax-original-styles", o), e.css(e.$item, {
                        "background-image": `url("${t}")`,
                        "background-position": "center",
                        "background-size": "cover"
                    })
                }));
            return t
        };
        const s = t.prototype.destroy;
        t.prototype.destroy = function() {
            const e = this;
            e.image.$default_item && (e.image.$item = e.image.$default_item, delete e.image.$default_item), s.apply(e)
        }
    }
    return c(), y = () => {
        void 0 !== m.jarallax && m.jarallax(document.querySelectorAll("[data-jarallax-video]"))
    }, "complete" === document.readyState || "interactive" === document.readyState ? y() : document.addEventListener("DOMContentLoaded", y, {
        capture: !0,
        once: !0,
        passive: !0
    }), m.VideoWorker || (m.VideoWorker = d), c
}));

/*!
 * Name    : Elements Extension for Jarallax
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(n) {
    var o = {};

    function r(t) {
        if (o[t]) return o[t].exports;
        var e = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports
    }
    r.m = n, r.c = o, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 0)
}([function(t, e, n) {
    t.exports = n(1)
}, function(t, e, n) {
    "use strict";
    var o = r(n(2));

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(0, r(n(3)).default)(), (0, o.default)(function() {
        "undefined" != typeof jarallax && jarallax(document.querySelectorAll("[data-jarallax-element]"))
    })
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        "complete" === document.readyState || "interactive" === document.readyState ? t.call() : document.attachEvent ? document.attachEvent("onreadystatechange", function() {
            "interactive" === document.readyState && t.call()
        }) : document.addEventListener && document.addEventListener("DOMContentLoaded", t)
    }
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : i.default.jarallax;
        if (void 0 === t) return;
        var e = t.constructor;
        ["initImg", "canInitParallax", "init", "destroy", "clipContainer", "coverImage", "isVisible", "onScroll", "onResize"].forEach(function(p) {
            var f = e.prototype[p];
            e.prototype[p] = function() {
                var t = this,
                    e = arguments || [];
                if ("initImg" === p && null !== t.$item.getAttribute("data-jarallax-element") && (t.options.type = "element", t.pureOptions.speed = t.$item.getAttribute("data-jarallax-element") || t.pureOptions.speed), "element" !== t.options.type) return f.apply(t, e);
                switch (t.pureOptions.threshold = t.$item.getAttribute("data-threshold") || "", p) {
                    case "init":
                        var n = t.pureOptions.speed.split(" ");
                        t.options.speed = t.pureOptions.speed || 0, t.options.speedY = n[0] ? parseFloat(n[0]) : 0, t.options.speedX = n[1] ? parseFloat(n[1]) : 0;
                        var o = t.pureOptions.threshold.split(" ");
                        t.options.thresholdY = o[0] ? parseFloat(o[0]) : null, t.options.thresholdX = o[1] ? parseFloat(o[1]) : null;
                        break;
                    case "onResize":
                        var r = t.css(t.$item, "transform");
                        t.css(t.$item, {
                            transform: ""
                        });
                        var i = t.$item.getBoundingClientRect();
                        t.itemData = {
                            width: i.width,
                            height: i.height,
                            y: i.top + t.getWindowData().y,
                            x: i.left
                        }, t.css(t.$item, {
                            transform: r
                        });
                        break;
                    case "onScroll":
                        var a = t.getWindowData(),
                            s = (a.y + a.height / 2 - t.itemData.y - t.itemData.height / 2) / (a.height / 2),
                            l = s * t.options.speedY,
                            u = s * t.options.speedX,
                            c = l,
                            d = u;
                        null !== t.options.thresholdY && l > t.options.thresholdY && (c = 0), null !== t.options.thresholdX && u > t.options.thresholdX && (d = 0), t.css(t.$item, {
                            transform: "translate3d(" + d + "px," + c + "px,0)"
                        });
                        break;
                    case "initImg":
                    case "isVisible":
                    case "clipContainer":
                    case "coverImage":
                        return !0
                }
                return f.apply(t, e)
            }
        })
    };
    var o, r = n(4),
        i = (o = r) && o.__esModule ? o : {
            default: o
        }
}, function(n, t, e) {
    "use strict";
    (function(t) {
        var e;
        e = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, n.exports = e
    }).call(this, e(5))
}, function(t, e, n) {
    "use strict";
    var o, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    o = function() {
        return this
    }();
    try {
        o = o || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" === ("undefined" == typeof window ? "undefined" : r(window)) && (o = window)
    }
    t.exports = o
}]);
//# sourceMappingURL=jarallax-element.min.js.map


/* SmoothScroll */
! function() {
    var s, i, c, a, o = {
            frameRate: 300,
            animationTime: 600,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        p = o,
        u = !1,
        d = !1,
        n = {
            x: 0,
            y: 0
        },
        f = !1,
        m = document.documentElement,
        l = [],
        h = /^Mac/.test(navigator.platform),
        w = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        v = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };

    function y() {
        if (!f && document.body) {
            f = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                n = e.scrollHeight;
            if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0;
            else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var r, a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() {
                    r = r || setTimeout(function() {
                        u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null)
                    }, 500)
                }, setTimeout(c, 10), Y("resize", c);
                if ((i = new R(c)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    }), m.offsetHeight <= o) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }
    var b = [],
        g = !1,
        r = Date.now();

    function S(d, f, m) {
        if (function(e, t) {
                e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0)
            }(f, m), 1 != p.accelerationMax) {
            var e = Date.now() - r;
            if (e < p.accelerationDelta) {
                var t = (1 + 50 / e) / 2;
                1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t)
            }
            r = Date.now()
        }
        if (b.push({
                x: f,
                y: m,
                lastX: f < 0 ? .99 : -.99,
                lastY: m < 0 ? .99 : -.99,
                start: Date.now()
            }), !g) {
            var o = q(),
                h = d === o || d === document.body;
            null == d.$scrollBehavior && function(e) {
                var t = M(e);
                if (null == B[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    B[t] = "smooth" == o
                }
                return B[t]
            }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
            var w = function(e) {
                for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                    var a = b[r],
                        l = t - a.start,
                        i = l >= p.animationTime,
                        c = i ? 1 : l / p.animationTime;
                    p.pulseAlgorithm && (c = F(c));
                    var s = a.x * c - a.lastX >> 0,
                        u = a.y * c - a.lastY >> 0;
                    o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--)
                }
                h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
            };
            j(w, d, 0), g = !0
        }
    }

    function e(e) {
        f || y();
        var t = e.target;
        if (e.defaultPrevented || e.ctrlKey) return !0;
        if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
        var o = -e.wheelDeltaX || e.deltaX || 0,
            n = -e.wheelDeltaY || e.deltaY || 0;
        h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
        var r = z(t);
        return r ? !! function(e) {
            if (!e) return;
            l.length || (l = [e, e, e]);
            e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function() {
                try {
                    localStorage.SS_deltaBuffer = l.join(",")
                } catch (e) {}
            }, 1e3);
            var t = 120 < e && P(e),
                o = !P(120) && !P(100) && !t;
            return e < 50 || o
        }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", {
            value: window.frameElement
        }), parent.wheel(e))
    }

    function x(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar;
        document.body.contains(s) || (s = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do {
                        if (o = t.classList && t.classList.contains("html5-video-controls")) break
                    } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || o) return !0;
        if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0;
        if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
        var r = 0,
            a = 0,
            l = z(s);
        if (!l) return !d || !W || parent.keydown(e);
        var i = l.clientHeight;
        switch (l == document.body && (i = window.innerHeight), e.keyCode) {
            case w.up:
                a = -p.arrowScroll;
                break;
            case w.down:
                a = p.arrowScroll;
                break;
            case w.spacebar:
                a = -(e.shiftKey ? 1 : -1) * i * .9;
                break;
            case w.pageup:
                a = .9 * -i;
                break;
            case w.pagedown:
                a = .9 * i;
                break;
            case w.home:
                l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                break;
            case w.end:
                var c = l.scrollHeight - l.scrollTop - i;
                a = 0 < c ? 10 + c : 0;
                break;
            case w.left:
                r = -p.arrowScroll;
                break;
            case w.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        S(l, r, a), e.preventDefault(), C()
    }

    function t(e) {
        s = e.target
    }
    var k, D, M = (k = 0, function(e) {
            return e.uniqueID || (e.uniqueID = k++)
        }),
        E = {},
        T = {},
        B = {};

    function C() {
        clearTimeout(D), D = setInterval(function() {
            E = T = B = {}
        }, 1e3)
    }

    function H(e, t, o) {
        for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t;
        return t
    }

    function z(e) {
        var t = [],
            o = document.body,
            n = m.scrollHeight;
        do {
            var r = (!1 ? E : T)[M(e)];
            if (r) return H(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = O(m) && O(o) || X(m);
                if (d && L(m) || !d && a) return H(t, q())
            } else if (L(e) && X(e)) return H(t, e)
        } while (e = e.parentElement)
    }

    function L(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function O(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function X(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function Y(e, t, o) {
        window.addEventListener(e, t, o || !1)
    }

    function A(e, t, o) {
        window.removeEventListener(e, t, o || !1)
    }

    function N(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        l = localStorage.SS_deltaBuffer.split(",")
    } catch (e) {}

    function K(e, t) {
        return Math.floor(e / t) == e / t
    }

    function P(e) {
        return K(l[0], e) && K(l[1], e) && K(l[2], e)
    }
    var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        q = ($ = document.scrollingElement, function() {
            if (!$) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return $
        });

    function V(e) {
        var t;
        return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize
    }

    function F(e) {
        return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e))
    }
    var I = window.navigator.userAgent,
        _ = /Edge/.test(I),
        W = /chrome/i.test(I) && !_,
        U = /safari/i.test(I) && !_,
        G = /mobile/i.test(I),
        J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        Z = (W || U || J) && !G,
        ee = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ee = !0
            }
        }))
    } catch (e) {}
    var te = !!ee && {
            passive: !1
        },
        oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ne(e) {
        for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t])
    }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function() {
        i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y)
    }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return ne
    }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
}();


/*! WOW - v1.1.2 - 2015-04-07
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function(a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function(a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function() {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function() {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a)
            } : function(a) {
                return a()
            }
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);

/* magnific-popup */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
}(function(c) {
    function e() {}

    function d(e, t) {
        m.ev.on(x + e + I, t)
    }

    function p(e, t, n, o) {
        var i = document.createElement("div");
        return i.className = "mfp-" + e, n && (i.innerHTML = n), o ? t && t.appendChild(i) : (i = c(i), t && i.appendTo(t)), i
    }

    function u(e, t) {
        m.ev.triggerHandler(x + e, t), m.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), m.st.callbacks[e]) && m.st.callbacks[e].apply(m, Array.isArray(t) ? t : [t])
    }

    function f(e) {
        return e === A && m.currTemplate.closeBtn || (m.currTemplate.closeBtn = c(m.st.closeMarkup.replace("%title%", m.st.tClose)), A = e), m.currTemplate.closeBtn
    }

    function r() {
        c.magnificPopup.instance || ((m = new e).init(), c.magnificPopup.instance = m)
    }

    function a() {
        y && (v.after(y.addClass(l)).detach(), y = null)
    }

    function i() {
        n && c(document.body).removeClass(n)
    }

    function t() {
        i(), m.req && m.req.abort()
    }
    var m, o, g, s, h, A, l, v, y, n, w = "Close",
        F = "BeforeClose",
        C = "MarkupParse",
        b = "Open",
        j = "Change",
        x = "mfp",
        I = "." + x,
        T = "mfp-ready",
        N = "mfp-removing",
        k = "mfp-prevent-close",
        P = !!window.jQuery,
        _ = c(window),
        S = (c.magnificPopup = {
            instance: null,
            proto: e.prototype = {
                constructor: e,
                init: function() {
                    var e = navigator.appVersion;
                    m.isLowIE = m.isIE8 = document.all && !document.addEventListener, m.isAndroid = /android/gi.test(e), m.isIOS = /iphone|ipad|ipod/gi.test(e), m.supportsTransition = function() {
                        var e = document.createElement("p").style,
                            t = ["ms", "O", "Moz", "Webkit"];
                        if (void 0 !== e.transition) return !0;
                        for (; t.length;)
                            if (t.pop() + "Transition" in e) return !0;
                        return !1
                    }(), m.probablyMobile = m.isAndroid || m.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), g = c(document), m.popupsCache = {}
                },
                open: function(e) {
                    if (!1 === e.isObj) {
                        m.items = e.items.toArray(), m.index = 0;
                        for (var t, n = e.items, o = 0; o < n.length; o++)
                            if ((t = (t = n[o]).parsed ? t.el[0] : t) === e.el[0]) {
                                m.index = o;
                                break
                            }
                    } else m.items = Array.isArray(e.items) ? e.items : [e.items], m.index = e.index || 0;
                    if (!m.isOpen) {
                        m.types = [], h = "", e.mainEl && e.mainEl.length ? m.ev = e.mainEl.eq(0) : m.ev = g, e.key ? (m.popupsCache[e.key] || (m.popupsCache[e.key] = {}), m.currTemplate = m.popupsCache[e.key]) : m.currTemplate = {}, m.st = c.extend(!0, {}, c.magnificPopup.defaults, e), m.fixedContentPos = "auto" === m.st.fixedContentPos ? !m.probablyMobile : m.st.fixedContentPos, m.st.modal && (m.st.closeOnContentClick = !1, m.st.closeOnBgClick = !1, m.st.showCloseBtn = !1, m.st.enableEscapeKey = !1), m.bgOverlay || (m.bgOverlay = p("bg").on("click" + I, function() {
                            m.close()
                        }), m.wrap = p("wrap").attr("tabindex", -1).on("click" + I, function(e) {
                            m._checkIfClose(e.target) && m.close()
                        }), m.container = p("container", m.wrap)), m.contentContainer = p("content"), m.st.preloader && (m.preloader = p("preloader", m.container, m.st.tLoading));
                        var i = c.magnificPopup.modules;
                        for (o = 0; o < i.length; o++) {
                            var r = (r = i[o]).charAt(0).toUpperCase() + r.slice(1);
                            m["init" + r].call(m)
                        }
                        u("BeforeOpen"), m.st.showCloseBtn && (m.st.closeBtnInside ? (d(C, function(e, t, n, o) {
                            n.close_replaceWith = f(o.type)
                        }), h += " mfp-close-btn-in") : m.wrap.append(f())), m.st.alignTop && (h += " mfp-align-top"), m.fixedContentPos ? m.wrap.css({
                            overflow: m.st.overflowY,
                            overflowX: "hidden",
                            overflowY: m.st.overflowY
                        }) : m.wrap.css({
                            top: _.scrollTop(),
                            position: "absolute"
                        }), !1 !== m.st.fixedBgPos && ("auto" !== m.st.fixedBgPos || m.fixedContentPos) || m.bgOverlay.css({
                            height: g.height(),
                            position: "absolute"
                        }), m.st.enableEscapeKey && g.on("keyup" + I, function(e) {
                            27 === e.keyCode && m.close()
                        }), _.on("resize" + I, function() {
                            m.updateSize()
                        }), m.st.closeOnContentClick || (h += " mfp-auto-cursor"), h && m.wrap.addClass(h);
                        var a = m.wH = _.height(),
                            s = {},
                            l = (m.fixedContentPos && m._hasScrollBar(a) && (l = m._getScrollbarSize()) && (s.marginRight = l), m.fixedContentPos && (m.isIE7 ? c("body, html").css("overflow", "hidden") : s.overflow = "hidden"), m.st.mainClass);
                        return m.isIE7 && (l += " mfp-ie7"), l && m._addClassToMFP(l), m.updateItemHTML(), u("BuildControls"), c("html").css(s), m.bgOverlay.add(m.wrap).prependTo(m.st.prependTo || c(document.body)), m._lastFocusedEl = document.activeElement, setTimeout(function() {
                            m.content ? (m._addClassToMFP(T), m._setFocus()) : m.bgOverlay.addClass(T), g.on("focusin" + I, m._onFocusIn)
                        }, 16), m.isOpen = !0, m.updateSize(a), u(b), e
                    }
                    m.updateItemHTML()
                },
                close: function() {
                    m.isOpen && (u(F), m.isOpen = !1, m.st.removalDelay && !m.isLowIE && m.supportsTransition ? (m._addClassToMFP(N), setTimeout(function() {
                        m._close()
                    }, m.st.removalDelay)) : m._close())
                },
                _close: function() {
                    u(w);
                    var e = N + " " + T + " ";
                    m.bgOverlay.detach(), m.wrap.detach(), m.container.empty(), m.st.mainClass && (e += m.st.mainClass + " "), m._removeClassFromMFP(e), m.fixedContentPos && (e = {
                        marginRight: ""
                    }, m.isIE7 ? c("body, html").css("overflow", "") : e.overflow = "", c("html").css(e)), g.off("keyup.mfp focusin" + I), m.ev.off(I), m.wrap.attr("class", "mfp-wrap").removeAttr("style"), m.bgOverlay.attr("class", "mfp-bg"), m.container.attr("class", "mfp-container"), !m.st.showCloseBtn || m.st.closeBtnInside && !0 !== m.currTemplate[m.currItem.type] || m.currTemplate.closeBtn && m.currTemplate.closeBtn.detach(), m.st.autoFocusLast && m._lastFocusedEl && c(m._lastFocusedEl).trigger("focus"), m.currItem = null, m.content = null, m.currTemplate = null, m.prevHeight = 0, u("AfterClose")
                },
                updateSize: function(e) {
                    var t;
                    m.isIOS ? (t = document.documentElement.clientWidth / window.innerWidth, t = window.innerHeight * t, m.wrap.css("height", t), m.wH = t) : m.wH = e || _.height(), m.fixedContentPos || m.wrap.css("height", m.wH), u("Resize")
                },
                updateItemHTML: function() {
                    var e = m.items[m.index],
                        t = (m.contentContainer.detach(), m.content && m.content.detach(), (e = e.parsed ? e : m.parseEl(m.index)).type),
                        n = (u("BeforeChange", [m.currItem ? m.currItem.type : "", t]), m.currItem = e, m.currTemplate[t] || (n = !!m.st[t] && m.st[t].markup, u("FirstMarkupParse", n), m.currTemplate[t] = !n || c(n)), s && s !== e.type && m.container.removeClass("mfp-" + s + "-holder"), m["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, m.currTemplate[t]));
                    m.appendContent(n, t), e.preloaded = !0, u(j, e), s = e.type, m.container.prepend(m.contentContainer), u("AfterChange")
                },
                appendContent: function(e, t) {
                    (m.content = e) ? m.st.showCloseBtn && m.st.closeBtnInside && !0 === m.currTemplate[t] ? m.content.find(".mfp-close").length || m.content.append(f()) : m.content = e: m.content = "", u("BeforeAppend"), m.container.addClass("mfp-" + t + "-holder"), m.contentContainer.append(m.content)
                },
                parseEl: function(e) {
                    var t, n = m.items[e];
                    if ((n = n.tagName ? {
                            el: c(n)
                        } : (t = n.type, {
                            data: n,
                            src: n.src
                        })).el) {
                        for (var o = m.types, i = 0; i < o.length; i++)
                            if (n.el.hasClass("mfp-" + o[i])) {
                                t = o[i];
                                break
                            }
                        n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
                    }
                    return n.type = t || m.st.type || "inline", n.index = e, n.parsed = !0, m.items[e] = n, u("ElementParse", n), m.items[e]
                },
                addGroup: function(t, n) {
                    function e(e) {
                        e.mfpEl = this, m._openClick(e, t, n)
                    }
                    var o = "click.magnificPopup";
                    (n = n || {}).mainEl = t, n.items ? (n.isObj = !0, t.off(o).on(o, e)) : (n.isObj = !1, n.delegate ? t.off(o).on(o, n.delegate, e) : (n.items = t).off(o).on(o, e))
                },
                _openClick: function(e, t, n) {
                    var o = (void 0 !== n.midClick ? n : c.magnificPopup.defaults).midClick;
                    if (o || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                        o = (void 0 !== n.disableOn ? n : c.magnificPopup.defaults).disableOn;
                        if (o)
                            if ("function" == typeof o) {
                                if (!o.call(m)) return !0
                            } else if (_.width() < o) return !0;
                        e.type && (e.preventDefault(), m.isOpen) && e.stopPropagation(), n.el = c(e.mfpEl), n.delegate && (n.items = t.find(n.delegate)), m.open(n)
                    }
                },
                updateStatus: function(e, t) {
                    var n;
                    m.preloader && (o !== e && m.container.removeClass("mfp-s-" + o), n = {
                        status: e,
                        text: t = t || "loading" !== e ? t : m.st.tLoading
                    }, u("UpdateStatus", n), e = n.status, t = n.text, m.st.allowHTMLInStatusIndicator ? m.preloader.html(t) : m.preloader.text(t), m.preloader.find("a").on("click", function(e) {
                        e.stopImmediatePropagation()
                    }), m.container.addClass("mfp-s-" + e), o = e)
                },
                _checkIfClose: function(e) {
                    if (!c(e).closest("." + k).length) {
                        var t = m.st.closeOnContentClick,
                            n = m.st.closeOnBgClick;
                        if (t && n) return !0;
                        if (!m.content || c(e).closest(".mfp-close").length || m.preloader && e === m.preloader[0]) return !0;
                        if (e === m.content[0] || c.contains(m.content[0], e)) {
                            if (t) return !0
                        } else if (n && c.contains(document, e)) return !0;
                        return !1
                    }
                },
                _addClassToMFP: function(e) {
                    m.bgOverlay.addClass(e), m.wrap.addClass(e)
                },
                _removeClassFromMFP: function(e) {
                    this.bgOverlay.removeClass(e), m.wrap.removeClass(e)
                },
                _hasScrollBar: function(e) {
                    return (m.isIE7 ? g.height() : document.body.scrollHeight) > (e || _.height())
                },
                _setFocus: function() {
                    (m.st.focus ? m.content.find(m.st.focus).eq(0) : m.wrap).trigger("focus")
                },
                _onFocusIn: function(e) {
                    if (e.target !== m.wrap[0] && !c.contains(m.wrap[0], e.target)) return m._setFocus(), !1
                },
                _parseMarkup: function(i, e, t) {
                    var r;
                    t.data && (e = c.extend(t.data, e)), u(C, [i, e, t]), c.each(e, function(e, t) {
                        if (void 0 === t || !1 === t) return !0;
                        var n, o;
                        1 < (r = e.split("_")).length ? 0 < (n = i.find(I + "-" + r[0])).length && ("replaceWith" === (o = r[1]) ? n[0] !== t[0] && n.replaceWith(t) : "img" === o ? n.is("img") ? n.attr("src", t) : n.replaceWith(c("<img>").attr("src", t).attr("class", n.attr("class"))) : n.attr(r[1], t)) : m.st.allowHTMLInTemplate ? i.find(I + "-" + e).html(t) : i.find(I + "-" + e).text(t)
                    })
                },
                _getScrollbarSize: function() {
                    var e;
                    return void 0 === m.scrollbarSize && ((e = document.createElement("div")).style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), m.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), m.scrollbarSize
                }
            },
            modules: [],
            open: function(e, t) {
                return r(), (e = e ? c.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e)
            },
            close: function() {
                return c.magnificPopup.instance && c.magnificPopup.instance.close()
            },
            registerModule: function(e, t) {
                t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
                allowHTMLInStatusIndicator: !1,
                allowHTMLInTemplate: !1
            }
        }, c.fn.magnificPopup = function(e) {
            r();
            var t, n, o, i = c(this);
            return "string" == typeof e ? "open" === e ? (t = P ? i.data("magnificPopup") : i[0].magnificPopup, n = parseInt(arguments[1], 10) || 0, o = t.items ? t.items[n] : (o = i, (o = t.delegate ? o.find(t.delegate) : o).eq(n)), m._openClick({
                mfpEl: o
            }, i, t)) : m.isOpen && m[e].apply(m, Array.prototype.slice.call(arguments, 1)) : (e = c.extend(!0, {}, e), P ? i.data("magnificPopup", e) : i[0].magnificPopup = e, m.addGroup(i, e)), i
        }, "inline"),
        E = (c.magnificPopup.registerModule(S, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    m.types.push(S), d(w + "." + S, function() {
                        a()
                    })
                },
                getInline: function(e, t) {
                    var n, o, i;
                    return a(), e.src ? (n = m.st.inline, (o = c(e.src)).length ? ((i = o[0].parentNode) && i.tagName && (v || (l = n.hiddenClass, v = p(l), l = "mfp-" + l), y = o.after(v).detach().removeClass(l)), m.updateStatus("ready")) : (m.updateStatus("error", n.tNotFound), o = c("<div>")), e.inlineElement = o) : (m.updateStatus("ready"), m._parseMarkup(t, {}, e), t)
                }
            }
        }), "ajax");
    c.magnificPopup.registerModule(E, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: "The content could not be loaded."
        },
        proto: {
            initAjax: function() {
                m.types.push(E), n = m.st.ajax.cursor, d(w + "." + E, t), d("BeforeChange." + E, t)
            },
            getAjax: function(o) {
                n && c(document.body).addClass(n), m.updateStatus("loading");
                var e = c.extend({
                    url: o.src,
                    success: function(e, t, n) {
                        e = {
                            data: e,
                            xhr: n
                        };
                        u("ParseAjax", e), m.appendContent(c(e.data), E), o.finished = !0, i(), m._setFocus(), setTimeout(function() {
                            m.wrap.addClass(T)
                        }, 16), m.updateStatus("ready"), u("AjaxContentAdded")
                    },
                    error: function() {
                        i(), o.finished = o.loadError = !0, m.updateStatus("error", m.st.ajax.tError.replace("%url%", o.src))
                    }
                }, m.st.ajax.settings);
                return m.req = c.ajax(e), ""
            }
        }
    });
    var z;
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: "The image could not be loaded."
        },
        proto: {
            initImage: function() {
                var e = m.st.image,
                    t = ".image";
                m.types.push("image"), d(b + t, function() {
                    "image" === m.currItem.type && e.cursor && c(document.body).addClass(e.cursor)
                }), d(w + t, function() {
                    e.cursor && c(document.body).removeClass(e.cursor), _.off("resize" + I)
                }), d("Resize" + t, m.resizeImage), m.isLowIE && d("AfterChange", m.resizeImage)
            },
            resizeImage: function() {
                var e, t = m.currItem;
                t && t.img && m.st.image.verticalFit && (e = 0, m.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", m.wH - e))
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, z && clearInterval(z), e.isCheckingImgSize = !1, u("ImageHasSize", e), e.imgHidden) && (m.content && m.content.removeClass("mfp-loading"), e.imgHidden = !1)
            },
            findImageSize: function(t) {
                function n(e) {
                    z && clearInterval(z), z = setInterval(function() {
                        0 < i.naturalWidth ? m._onImageHasSize(t) : (200 < o && clearInterval(z), 3 === ++o ? n(10) : 40 === o ? n(50) : 100 === o && n(500))
                    }, e)
                }
                var o = 0,
                    i = t.img[0];
                n(1)
            },
            getImage: function(e, t) {
                function n() {
                    e && (e.img.off(".mfploader"), e === m.currItem && (m._onImageHasSize(e), m.updateStatus("error", a.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
                }

                function o() {
                    e && (e.img[0].complete ? (e.img.off(".mfploader"), e === m.currItem && (m._onImageHasSize(e), m.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, u("ImageLoadComplete")) : ++r < 200 ? setTimeout(o, 100) : n())
                }
                var i, r = 0,
                    a = m.st.image,
                    s = t.find(".mfp-img");
                return s.length && ((i = document.createElement("img")).className = "mfp-img", e.el && e.el.find("img").length && (i.alt = e.el.find("img").attr("alt")), e.img = c(i).on("load.mfploader", o).on("error.mfploader", n), i.src = e.src, s.is("img") && (e.img = e.img.clone()), 0 < (i = e.img[0]).naturalWidth ? e.hasSize = !0 : i.width || (e.hasSize = !1)), m._parseMarkup(t, {
                    title: function(e) {
                        if (e.data && void 0 !== e.data.title) return e.data.title;
                        var t = m.st.image.titleSrc;
                        if (t) {
                            if ("function" == typeof t) return t.call(m, e);
                            if (e.el) return e.el.attr(t) || ""
                        }
                        return ""
                    }(e),
                    img_replaceWith: e.img
                }, e), m.resizeImage(), e.hasSize ? (z && clearInterval(z), e.loadError ? (t.addClass("mfp-loading"), m.updateStatus("error", a.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), m.updateStatus("ready"))) : (m.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), m.findImageSize(e))), t
            }
        }
    });

    function O(e) {
        var t;
        m.currTemplate[L] && (t = m.currTemplate[L].find("iframe")).length && (e || (t[0].src = "//about:blank"), m.isIE8) && t.css("display", e ? "block" : "none")
    }

    function M(e) {
        var t = m.items.length;
        return t - 1 < e ? e - t : e < 0 ? t + e : e
    }

    function D(e, t, n) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
    }
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, t, n, o, i, r, a = m.st.zoom,
                    s = ".zoom";
                a.enabled && m.supportsTransition && (t = a.duration, n = function(e) {
                    var e = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                        t = "all " + a.duration / 1e3 + "s " + a.easing,
                        n = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        },
                        o = "transition";
                    return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = t, e.css(n), e
                }, o = function() {
                    m.content.css("visibility", "visible")
                }, d("BuildControls" + s, function() {
                    m._allowZoom() && (clearTimeout(i), m.content.css("visibility", "hidden"), (e = m._getItemToZoom()) ? ((r = n(e)).css(m._getOffset()), m.wrap.append(r), i = setTimeout(function() {
                        r.css(m._getOffset(!0)), i = setTimeout(function() {
                            o(), setTimeout(function() {
                                r.remove(), e = r = null, u("ZoomAnimationEnded")
                            }, 16)
                        }, t)
                    }, 16)) : o())
                }), d(F + s, function() {
                    if (m._allowZoom()) {
                        if (clearTimeout(i), m.st.removalDelay = t, !e) {
                            if (!(e = m._getItemToZoom())) return;
                            r = n(e)
                        }
                        r.css(m._getOffset(!0)), m.wrap.append(r), m.content.css("visibility", "hidden"), setTimeout(function() {
                            r.css(m._getOffset())
                        }, 16)
                    }
                }), d(w + s, function() {
                    m._allowZoom() && (o(), r && r.remove(), e = null)
                }))
            },
            _allowZoom: function() {
                return "image" === m.currItem.type
            },
            _getItemToZoom: function() {
                return !!m.currItem.hasSize && m.currItem.img
            },
            _getOffset: function(e) {
                var e = e ? m.currItem.img : m.st.zoom.opener(m.currItem.el || m.currItem),
                    t = e.offset(),
                    n = parseInt(e.css("padding-top"), 10),
                    o = parseInt(e.css("padding-bottom"), 10),
                    e = (t.top -= c(window).scrollTop() - n, {
                        width: e.width(),
                        height: (P ? e.innerHeight() : e[0].offsetHeight) - o - n
                    });
                return (B = void 0 === B ? void 0 !== document.createElement("p").style.MozTransform : B) ? e["-moz-transform"] = e.transform = "translate(" + t.left + "px," + t.top + "px)" : (e.left = t.left, e.top = t.top), e
            }
        }
    });
    var B, L = "iframe",
        H = (c.magnificPopup.registerModule(L, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    m.types.push(L), d("BeforeChange", function(e, t, n) {
                        t !== n && (t === L ? O() : n === L && O(!0))
                    }), d(w + "." + L, function() {
                        O()
                    })
                },
                getIframe: function(e, t) {
                    var n = e.src,
                        o = m.st.iframe,
                        i = (c.each(o.patterns, function() {
                            if (-1 < n.indexOf(this.index)) return this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1
                        }), {});
                    return o.srcAction && (i[o.srcAction] = n), m._parseMarkup(t, i, e), m.updateStatus("ready"), t
                }
            }
        }), c.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
                langDir: null,
                loop: !0
            },
            proto: {
                initGallery: function() {
                    var r = m.st.gallery,
                        e = ".mfp-gallery";
                    if (m.direction = !0, !r || !r.enabled) return !1;
                    r.langDir || (r.langDir = document.dir || "ltr"), h += " mfp-gallery", d(b + e, function() {
                        r.navigateByImgClick && m.wrap.on("click" + e, ".mfp-img", function() {
                            if (1 < m.items.length) return m.next(), !1
                        }), g.on("keydown" + e, function(e) {
                            37 === e.keyCode ? "rtl" === r.langDir ? m.next() : m.prev() : 39 === e.keyCode && ("rtl" === r.langDir ? m.prev() : m.next())
                        }), m.updateGalleryButtons()
                    }), d("UpdateStatus" + e, function() {
                        m.updateGalleryButtons()
                    }), d("UpdateStatus" + e, function(e, t) {
                        t.text && (t.text = D(t.text, m.currItem.index, m.items.length))
                    }), d(C + e, function(e, t, n, o) {
                        var i = m.items.length;
                        n.counter = 1 < i ? D(r.tCounter, o.index, i) : ""
                    }), d("BuildControls" + e, function() {
                        var e, t, n, o, i;
                        1 < m.items.length && r.arrows && !m.arrowLeft && (t = "rtl" === r.langDir ? (o = r.tNext, e = r.tPrev, i = "next", "prev") : (o = r.tPrev, e = r.tNext, i = "prev", "next"), n = r.arrowMarkup, o = m.arrowLeft = c(n.replace(/%title%/gi, o).replace(/%action%/gi, i).replace(/%dir%/gi, "left")).addClass(k), i = m.arrowRight = c(n.replace(/%title%/gi, e).replace(/%action%/gi, t).replace(/%dir%/gi, "right")).addClass(k), "rtl" === r.langDir ? (m.arrowNext = o, m.arrowPrev = i) : (m.arrowNext = i, m.arrowPrev = o), o.on("click", function() {
                            "rtl" === r.langDir ? m.next() : m.prev()
                        }), i.on("click", function() {
                            "rtl" === r.langDir ? m.prev() : m.next()
                        }), m.container.append(o.add(i)))
                    }), d(j + e, function() {
                        m._preloadTimeout && clearTimeout(m._preloadTimeout), m._preloadTimeout = setTimeout(function() {
                            m.preloadNearbyImages(), m._preloadTimeout = null
                        }, 16)
                    }), d(w + e, function() {
                        g.off(e), m.wrap.off("click" + e), m.arrowRight = m.arrowLeft = null
                    })
                },
                next: function() {
                    var e = M(m.index + 1);
                    if (!m.st.gallery.loop && 0 === e) return !1;
                    m.direction = !0, m.index = e, m.updateItemHTML()
                },
                prev: function() {
                    var e = m.index - 1;
                    if (!m.st.gallery.loop && e < 0) return !1;
                    m.direction = !1, m.index = M(e), m.updateItemHTML()
                },
                goTo: function(e) {
                    m.direction = e >= m.index, m.index = e, m.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    for (var e = m.st.gallery.preload, t = Math.min(e[0], m.items.length), n = Math.min(e[1], m.items.length), o = 1; o <= (m.direction ? n : t); o++) m._preloadItem(m.index + o);
                    for (o = 1; o <= (m.direction ? t : n); o++) m._preloadItem(m.index - o)
                },
                _preloadItem: function(e) {
                    var t;
                    e = M(e), m.items[e].preloaded || ((t = m.items[e]).parsed || (t = m.parseEl(e)), u("LazyLoad", t), "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function() {
                        t.hasSize = !0
                    }).on("error.mfploader", function() {
                        t.hasSize = !0, t.loadError = !0, u("LazyLoadError", t)
                    }).attr("src", t.src)), t.preloaded = !0)
                },
                updateGalleryButtons: function() {
                    m.st.gallery.loop || "object" != typeof m.arrowPrev || null === m.arrowPrev || (0 === m.index ? m.arrowPrev.hide() : m.arrowPrev.show(), m.index === m.items.length - 1 ? m.arrowNext.hide() : m.arrowNext.show())
                }
            }
        }), "retina");
    c.magnificPopup.registerModule(H, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                var n, o;
                1 < window.devicePixelRatio && (n = m.st.retina, o = n.ratio, 1 < (o = isNaN(o) ? o() : o)) && (d("ImageHasSize." + H, function(e, t) {
                    t.img.css({
                        "max-width": t.img[0].naturalWidth / o,
                        width: "100%"
                    })
                }), d("ElementParse." + H, function(e, t) {
                    t.src = n.replaceSrc(t, o)
                }))
            }
        }
    }), r()
});