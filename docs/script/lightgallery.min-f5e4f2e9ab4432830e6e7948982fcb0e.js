/**
 * lightgallery | 2.2.1 | September 4th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
/*global define,picturefill*/
/*eslint no-undef: "error"*/
!(function (t, e) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = e())
    : typeof define === "function" && define.amd
    ? define(e)
    : ((t =
        typeof globalThis !== "undefined"
          ? globalThis
          : t || self).lightGallery = e());
})(this, () => {
  var t = function () {
    return (t =
      Object.assign ||
      function (t) {
        for (var e, i = 1, s = arguments.length; i < s; i++)
          for (const n in (e = arguments[i]))
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
      }).apply(this, arguments);
  };
  !(function () {
    if (typeof window.CustomEvent === "function") return !1;
    window.CustomEvent = function (t, e) {
      e = e || { bubbles: !1, cancelable: !1, detail: null };
      const i = document.createEvent("CustomEvent");
      return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
    };
  })(),
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
  const e = (function () {
    function t(t) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(t)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (t.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
          const e = (16 * Math.random()) | 0;
          return (t == "x" ? e : (3 & e) | 8).toString(16);
        });
      }),
      (t.prototype._getSelector = function (t, e) {
        return (
          void 0 === e && (e = document),
          typeof t !== "string"
            ? t
            : ((e = e || document),
              t.substring(0, 1) === "#"
                ? e.querySelector(t)
                : e.querySelectorAll(t))
        );
      }),
      (t.prototype._each = function (t) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, t)
              : t(this.selector, 0),
            this)
          : this;
      }),
      (t.prototype._setCssVendorPrefix = function (t, e, i) {
        const s = e.replace(/-([a-z])/gi, (t, e) => e.toUpperCase());
        this.cssVenderPrefixes.indexOf(s) !== -1
          ? ((t.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (t.style[`webkit${s}`] = i),
            (t.style[`moz${s}`] = i),
            (t.style[`ms${s}`] = i),
            (t.style[`o${s}`] = i))
          : (t.style[s] = i);
      }),
      (t.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (t.prototype.isEventMatched = function (t, e) {
        const i = e.split(".");
        return t
          .split(".")
          .filter((t) => t)
          .every((t) => i.indexOf(t) !== -1);
      }),
      (t.prototype.attr = function (t, e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.getAttribute(t)
            : ""
          : (this._each((i) => {
              i.setAttribute(t, e);
            }),
            this);
      }),
      (t.prototype.find = function (t) {
        return i(this._getSelector(t, this.selector));
      }),
      (t.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? i(this.selector[0])
          : i(this.selector);
      }),
      (t.prototype.eq = function (t) {
        return i(this.selector[t]);
      }),
      (t.prototype.parent = function () {
        return i(this.selector.parentElement);
      }),
      (t.prototype.get = function () {
        return this._getFirstEl();
      }),
      (t.prototype.removeAttr = function (t) {
        const e = t.split(" ");
        return (
          this._each((t) => {
            e.forEach((e) => t.removeAttribute(e));
          }),
          this
        );
      }),
      (t.prototype.wrap = function (t) {
        if (!this.firstElement) return this;
        const e = document.createElement("div");
        return (
          (e.className = t),
          this.firstElement.parentNode.insertBefore(e, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          e.appendChild(this.firstElement),
          this
        );
      }),
      (t.prototype.addClass = function (t) {
        return (
          void 0 === t && (t = ""),
          this._each((e) => {
            t.split(" ").forEach((t) => {
              e.classList.add(t);
            });
          }),
          this
        );
      }),
      (t.prototype.removeClass = function (t) {
        return (
          this._each((e) => {
            t.split(" ").forEach((t) => {
              e.classList.remove(t);
            });
          }),
          this
        );
      }),
      (t.prototype.hasClass = function (t) {
        return !!this.firstElement && this.firstElement.classList.contains(t);
      }),
      (t.prototype.hasAttribute = function (t) {
        return !!this.firstElement && this.firstElement.hasAttribute(t);
      }),
      (t.prototype.toggleClass = function (t) {
        return this.firstElement
          ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t), this)
          : this;
      }),
      (t.prototype.css = function (t, e) {
        const i = this;
        return (
          this._each((s) => {
            i._setCssVendorPrefix(s, t, e);
          }),
          this
        );
      }),
      (t.prototype.on = function (e, i) {
        const s = this;
        return this.selector
          ? (e.split(" ").forEach((e) => {
              Array.isArray(t.eventListeners[e]) || (t.eventListeners[e] = []),
                t.eventListeners[e].push(i),
                s.selector.addEventListener(e.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (t.prototype.once = function (t, e) {
        const i = this;
        return (
          this.on(t, () => {
            i.off(t), e(t);
          }),
          this
        );
      }),
      (t.prototype.off = function (e) {
        const i = this;
        return this.selector
          ? (Object.keys(t.eventListeners).forEach((s) => {
              i.isEventMatched(e, s) &&
                (t.eventListeners[s].forEach((t) => {
                  i.selector.removeEventListener(s.split(".")[0], t);
                }),
                (t.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (t.prototype.trigger = function (t, e) {
        if (!this.firstElement) return this;
        const i = new CustomEvent(t.split(".")[0], { detail: e || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (t.prototype.load = function (t) {
        const e = this;
        return (
          fetch(t).then((t) => {
            e.selector.innerHTML = t;
          }),
          this
        );
      }),
      (t.prototype.html = function (t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each((e) => {
              e.innerHTML = t;
            }),
            this);
      }),
      (t.prototype.append = function (t) {
        return (
          this._each((e) => {
            typeof t === "string"
              ? e.insertAdjacentHTML("beforeend", t)
              : e.appendChild(t);
          }),
          this
        );
      }),
      (t.prototype.prepend = function (t) {
        return (
          this._each((e) => {
            e.insertAdjacentHTML("afterbegin", t);
          }),
          this
        );
      }),
      (t.prototype.remove = function () {
        return (
          this._each((t) => {
            t.parentNode.removeChild(t);
          }),
          this
        );
      }),
      (t.prototype.empty = function () {
        return (
          this._each((t) => {
            t.innerHTML = "";
          }),
          this
        );
      }),
      (t.prototype.scrollTop = function (t) {
        return void 0 !== t
          ? ((document.body.scrollTop = t),
            (document.documentElement.scrollTop = t),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (t.prototype.scrollLeft = function (t) {
        return void 0 !== t
          ? ((document.body.scrollLeft = t),
            (document.documentElement.scrollLeft = t),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (t.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        const t = this.firstElement.getBoundingClientRect();
        const e = i("body").style().marginLeft;
        return {
          left: t.left - parseFloat(e) + this.scrollLeft(),
          top: t.top + this.scrollTop(),
        };
      }),
      (t.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (t.prototype.width = function () {
        const t = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(t.paddingLeft) -
          parseFloat(t.paddingRight)
        );
      }),
      (t.prototype.height = function () {
        const t = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(t.paddingTop) -
          parseFloat(t.paddingBottom)
        );
      }),
      (t.eventListeners = {}),
      t
    );
  })();
  function i(t) {
    return new e(t);
  }
  const s = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function n(t) {
    return t === "href"
      ? "src"
      : (t = (t =
          (t = t.replace("data-", "")).charAt(0).toLowerCase() +
          t.slice(1)).replace(/-([a-z])/g, (t) => t[1].toUpperCase()));
  }
  const o = function (t, e, s, n) {
    void 0 === s && (s = 0);
    let o = i(t).attr("data-lg-size") || n;
    if (o) {
      const r = o.split(",");
      if (r[1]) {
        for (let l = window.innerWidth, a = 0; a < r.length; a++) {
          const g = r[a];
          if (parseInt(g.split("-")[2], 10) > l) {
            o = g;
            break;
          }
          a === r.length - 1 && (o = g);
        }
      }
      const d = o.split("-");
      const h = parseInt(d[0], 10);
      const c = parseInt(d[1], 10);
      const u = e.width();
      const m = e.height() - s;
      const p = Math.min(u, h);
      const f = Math.min(m, c);
      const v = Math.min(p / h, f / c);
      return { width: h * v, height: c * v };
    }
  };
  const r = function (t, e, s, n, o) {
    if (o) {
      const r = i(t).find("img").first();
      if (r.get()) {
        const l = e.get().getBoundingClientRect();
        const a = l.width;
        const g = e.height() - (s + n);
        const d = r.width();
        const h = r.height();
        const c = r.style();
        let u =
          (a - d) / 2 -
          r.offset().left +
          (parseFloat(c.paddingLeft) || 0) +
          (parseFloat(c.borderLeft) || 0) +
          i(window).scrollLeft() +
          l.left;
        let m =
          (g - h) / 2 -
          r.offset().top +
          (parseFloat(c.paddingTop) || 0) +
          (parseFloat(c.borderTop) || 0) +
          i(window).scrollTop() +
          s;
        return `translate3d(${(u *= -1)}px, ${(m *= -1)}px, 0) scale3d(${
          d / o.width
        }, ${h / o.height}, 1)`;
      }
    }
  };
  const l = function (t, e, i, s) {
    return `<div class="lg-video-cont lg-has-iframe" style="width:${t}; height: ${e}">\n                    <iframe class="lg-object" frameborder="0" ${
      s ? `title="${s}"` : ""
    } src="${i}"  allowfullscreen="true"></iframe>\n                </div>`;
  };
  const a = function (t, e, i, s, n, o) {
    const r = `<img ${i} ${s ? `srcset="${s}"` : ""}  ${
      n ? `sizes="${n}"` : ""
    } class="lg-object lg-image" data-index="${t}" src="${e}" />`;
    let l = "";
    o &&
      (l = (typeof o === "string" ? JSON.parse(o) : o).map((t) => {
        let e = "";
        return (
          Object.keys(t).forEach((i) => {
            e += ` ${i}="${t[i]}"`;
          }),
          `<source ${e}></source>`
        );
      }));
    return `${l}${r}`;
  };
  const g = function (t) {
    for (var e = [], i = [], s = "", n = 0; n < t.length; n++) {
      const o = t[n].split(" ");
      o[0] === "" && o.splice(0, 1), i.push(o[0]), e.push(o[1]);
    }
    for (let r = window.innerWidth, l = 0; l < e.length; l++) {
      if (parseInt(e[l], 10) > r) {
        s = i[l];
        break;
      }
    }
    return s;
  };
  const d = function (t) {
    return !!t && !!t.complete && t.naturalWidth !== 0;
  };
  const h = function (t, e, i, s) {
    return `<div class="lg-video-cont ${
      s && s.youtube
        ? "lg-has-youtube"
        : s && s.vimeo
        ? "lg-has-vimeo"
        : "lg-has-html5"
    }" style="${i}">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ${
      e || ""
    }\n            <img class="lg-object lg-video-poster" src="${t}" />\n        </div>`;
  };
  const c = function (t, e, o, r) {
    const l = [];
    const a = (function () {
      for (var t = 0, e = 0, i = arguments.length; e < i; e++)
        t += arguments[e].length;
      const s = Array(t);
      let n = 0;
      for (e = 0; e < i; e++)
        for (let o = arguments[e], r = 0, l = o.length; r < l; r++, n++)
          s[n] = o[r];
      return s;
    })(s, e);
    return (
      [].forEach.call(t, (t) => {
        for (var e = {}, s = 0; s < t.attributes.length; s++) {
          const g = t.attributes[s];
          if (g.specified) {
            const d = n(g.name);
            let h = "";
            a.indexOf(d) > -1 && (h = d), h && (e[h] = g.value);
          }
        }
        const c = i(t);
        const u = c.find("img").first().attr("alt");
        const m = c.attr("title");
        const p = r ? c.attr(r) : c.find("img").first().attr("src");
        (e.thumb = p),
          o && !e.subHtml && (e.subHtml = m || u || ""),
          (e.alt = u || m || ""),
          l.push(e);
      }),
      l
    );
  };
  const u = function () {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };
  const m = {
    mode: "lg-slide",
    easing: "ease",
    speed: 400,
    licenseKey: "0000-0000-000-0000",
    height: "100%",
    width: "100%",
    addClass: "",
    startClass: "lg-start-zoom",
    backdropDuration: 300,
    container: document.body,
    startAnimationDuration: 400,
    zoomFromOrigin: !0,
    hideBarsDelay: 0,
    showBarsAfter: 1e4,
    slideDelay: 0,
    supportLegacyBrowser: !0,
    allowMediaOverlap: !1,
    videoMaxSize: "1280-720",
    defaultCaptionHeight: 0,
    ariaLabelledby: "",
    ariaDescribedby: "",
    closable: !0,
    swipeToClose: !0,
    closeOnTap: !0,
    showCloseIcon: !0,
    showMaximizeIcon: !1,
    loop: !0,
    escKey: !0,
    keyPress: !0,
    controls: !0,
    slideEndAnimation: !0,
    hideControlOnEnd: !1,
    mousewheel: !1,
    getCaptionFromTitleOrAlt: !0,
    appendSubHtmlTo: ".lg-sub-html",
    subHtmlSelectorRelative: !1,
    preload: 2,
    numberOfSlideItemsInDom: 10,
    showAfterLoad: !0,
    selector: "",
    selectWithin: "",
    nextHtml: "",
    prevHtml: "",
    index: 0,
    iframeWidth: "100%",
    iframeHeight: "100%",
    download: !0,
    counter: !0,
    appendCounterTo: ".lg-toolbar",
    swipeThreshold: 50,
    enableSwipe: !0,
    enableDrag: !0,
    dynamic: !1,
    dynamicEl: [],
    extraProps: [],
    exThumbImage: "",
    isMobile: void 0,
    mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
    plugins: [],
  };
  const p = "lgAfterAppendSlide";
  const f = "lgInit";
  const v = "lgHasVideo";
  const y = "lgContainerResize";
  const b = "lgUpdateSlides";
  const C = "lgAfterAppendSubHtml";
  const I = "lgBeforeOpen";
  const w = "lgAfterOpen";
  const x = "lgSlideItemLoad";
  const S = "lgBeforeSlide";
  const T = "lgAfterSlide";
  const E = "lgPosterClick";
  const O = "lgDragStart";
  const L = "lgDragMove";
  const D = "lgDragEnd";
  const z = "lgBeforeNextSlide";
  const G = "lgBeforePrevSlide";
  const M = "lgBeforeClose";
  const k = "lgAfterClose";
  let A = 0;
  const B = (function () {
    function s(t, e) {
      if (
        ((this.lgOpened = !1),
        (this.index = 0),
        (this.plugins = []),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.currentItemsInDom = []),
        (this.prevScrollTop = 0),
        (this.isDummyImageRemoved = !1),
        (this.dragOrSwipeEnabled = !1),
        (this.mediaContainerPosition = { top: 0, bottom: 0 }),
        !t)
      )
        return this;
      if (
        (A++,
        (this.lgId = A),
        (this.el = t),
        (this.LGel = i(t)),
        this.generateSettings(e),
        this.buildModules(),
        this.settings.dynamic &&
          void 0 !== this.settings.dynamicEl &&
          !Array.isArray(this.settings.dynamicEl))
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return (
        (this.galleryItems = this.getItems()),
        this.normalizeSettings(),
        this.init(),
        this.validateLicense(),
        this
      );
    }
    return (
      (s.prototype.generateSettings = function (e) {
        if (
          ((this.settings = { ...m, ...e }),
          this.settings.isMobile && typeof this.settings.isMobile === "function"
            ? this.settings.isMobile()
            : u())
        ) {
          const i = {
            ...this.settings.mobileSettings,
            ...this.settings.mobileSettings,
          };
          this.settings = { ...this.settings, ...i };
        }
      }),
      (s.prototype.normalizeSettings = function () {
        this.settings.slideEndAnimation &&
          (this.settings.hideControlOnEnd = !1),
          this.settings.closable || (this.settings.swipeToClose = !1),
          (this.zoomFromOrigin = this.settings.zoomFromOrigin),
          this.settings.dynamic && (this.zoomFromOrigin = !1),
          this.settings.container || (this.settings.container = document.body),
          (this.settings.preload = Math.min(
            this.settings.preload,
            this.galleryItems.length
          ));
      }),
      (s.prototype.init = function () {
        const t = this;
        this.addSlideVideoInfo(this.galleryItems),
          this.buildStructure(),
          this.LGel.trigger(f, { instance: this }),
          this.settings.keyPress && this.keyPress(),
          setTimeout(() => {
            t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
          }, 50),
          this.arrow(),
          this.settings.mousewheel && this.mousewheel(),
          this.settings.dynamic || this.openGalleryOnItemClick();
      }),
      (s.prototype.openGalleryOnItemClick = function () {
        for (
          var t = this,
            s = function (s) {
              const o = n.items[s];
              const r = i(o);
              const l = e.generateUUID();
              r.attr("data-lg-id", l).on(`click.lgcustom-item-${l}`, (e) => {
                e.preventDefault();
                const i = t.settings.index || s;
                t.openGallery(i, o);
              });
            },
            n = this,
            o = 0;
          o < this.items.length;
          o++
        )
          s(o);
      }),
      (s.prototype.buildModules = function () {
        const t = this;
        this.settings.plugins.forEach((e) => {
          t.plugins.push(new e(t, i));
        });
      }),
      (s.prototype.validateLicense = function () {
        this.settings.licenseKey
          ? this.settings.licenseKey === "0000-0000-000-0000" &&
            console.warn(
              `lightGallery: ${this.settings.licenseKey} license key is not valid for production use`
            )
          : console.error("Please provide a valid license key");
      }),
      (s.prototype.getSlideItem = function (t) {
        return i(this.getSlideItemId(t));
      }),
      (s.prototype.getSlideItemId = function (t) {
        return `#lg-item-${this.lgId}-${t}`;
      }),
      (s.prototype.getIdName = function (t) {
        return `${t}-${this.lgId}`;
      }),
      (s.prototype.getElementById = function (t) {
        return i(`#${this.getIdName(t)}`);
      }),
      (s.prototype.manageSingleSlideClassName = function () {
        this.galleryItems.length < 2
          ? this.outer.addClass("lg-single-item")
          : this.outer.removeClass("lg-single-item");
      }),
      (s.prototype.buildStructure = function () {
        const t = this;
        if (!(this.$container && this.$container.get())) {
          let e = "";
          let s = "";
          this.settings.controls &&
            (e = `<button type="button" id="${this.getIdName(
              "lg-prev"
            )}" aria-label="Previous slide" class="lg-prev lg-icon"> ${
              this.settings.prevHtml
            } </button>\n                <button type="button" id="${this.getIdName(
              "lg-next"
            )}" aria-label="Next slide" class="lg-next lg-icon"> ${
              this.settings.nextHtml
            } </button>`),
            this.settings.appendSubHtmlTo !== ".lg-item" &&
              (s =
                '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
          let n = "";
          this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
          const o = this.settings.ariaLabelledby
            ? `aria-labelledby="${this.settings.ariaLabelledby}"`
            : "";
          const r = this.settings.ariaDescribedby
            ? `aria-describedby="${this.settings.ariaDescribedby}"`
            : "";
          const l = `lg-container ${this.settings.addClass} ${
            document.body !== this.settings.container ? "lg-inline" : ""
          }`;
          const a =
            this.settings.closable && this.settings.showCloseIcon
              ? `<button type="button" aria-label="Close gallery" id="${this.getIdName(
                  "lg-close"
                )}" class="lg-close lg-icon"></button>`
              : "";
          const g = this.settings.showMaximizeIcon
            ? `<button type="button" aria-label="Toggle maximize" id="${this.getIdName(
                "lg-maximize"
              )}" class="lg-maximize lg-icon"></button>`
            : "";
          const d = `\n        <div class="${l}" id="${this.getIdName(
            "lg-container"
          )}" tabindex="-1" aria-modal="true" ${o} ${r} role="dialog"\n        >\n            <div id="${this.getIdName(
            "lg-backdrop"
          )}" class="lg-backdrop"></div>\n\n            <div id="${this.getIdName(
            "lg-outer"
          )}" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ${n} ">\n\n              <div id="${this.getIdName(
            "lg-content"
          )}" class="lg-content">\n                <div id="${this.getIdName(
            "lg-inner"
          )}" class="lg-inner">\n                </div>\n                ${e}\n              </div>\n                <div id="${this.getIdName(
            "lg-toolbar"
          )}" class="lg-toolbar lg-group">\n                    ${g}\n                    ${a}\n                    </div>\n                    ${
            this.settings.appendSubHtmlTo === ".lg-outer" ? s : ""
          }\n                <div id="${this.getIdName(
            "lg-components"
          )}" class="lg-components">\n                    ${
            this.settings.appendSubHtmlTo === ".lg-sub-html" ? s : ""
          }\n                </div>\n            </div>\n        </div>\n        `;
          i(this.settings.container).css("position", "relative").append(d),
            (this.outer = this.getElementById("lg-outer")),
            (this.$lgComponents = this.getElementById("lg-components")),
            (this.$backdrop = this.getElementById("lg-backdrop")),
            (this.$container = this.getElementById("lg-container")),
            (this.$inner = this.getElementById("lg-inner")),
            (this.$content = this.getElementById("lg-content")),
            (this.$toolbar = this.getElementById("lg-toolbar")),
            this.$backdrop.css(
              "transition-duration",
              `${this.settings.backdropDuration}ms`
            );
          let h = `${this.settings.mode} `;
          this.manageSingleSlideClassName(),
            this.settings.enableDrag && (h += "lg-grab "),
            this.settings.showAfterLoad && (h += "lg-show-after-load"),
            this.outer.addClass(h),
            this.$inner.css("transition-timing-function", this.settings.easing),
            this.$inner.css("transition-duration", `${this.settings.speed}ms`),
            this.settings.download &&
              this.$toolbar.append(
                `<a id="${this.getIdName(
                  "lg-download"
                )}" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>`
              ),
            this.counter(),
            i(window).on(
              `resize.lg.global${this.lgId} orientationchange.lg.global${this.lgId}`,
              () => {
                t.refreshOnResize();
              }
            ),
            this.hideBars(),
            this.manageCloseGallery(),
            this.toggleMaximize(),
            this.initModules();
        }
      }),
      (s.prototype.refreshOnResize = function () {
        if (this.lgOpened) {
          const t = this.galleryItems[this.index].__slideVideoInfo;
          this.mediaContainerPosition = this.getMediaContainerPosition();
          const e = this.mediaContainerPosition;
          const i = e.top;
          const s = e.bottom;
          if (
            ((this.currentImageSize = o(
              this.items[this.index],
              this.outer,
              i + s,
              t && this.settings.videoMaxSize
            )),
            t && this.resizeVideoSlide(this.index, this.currentImageSize),
            this.zoomFromOrigin && !this.isDummyImageRemoved)
          ) {
            const n = this.getDummyImgStyles(this.currentImageSize);
            this.outer
              .find(".lg-current .lg-dummy-img")
              .first()
              .attr("style", n);
          }
          this.LGel.trigger(y);
        }
      }),
      (s.prototype.resizeVideoSlide = function (t, e) {
        const i = this.getVideoContStyle(e);
        this.getSlideItem(t).find(".lg-video-cont").attr("style", i);
      }),
      (s.prototype.updateSlides = function (t, e) {
        if (
          (this.index > t.length - 1 && (this.index = t.length - 1),
          t.length === 1 && (this.index = 0),
          t.length)
        ) {
          const i = this.galleryItems[e].src;
          (this.galleryItems = t),
            this.updateControls(),
            this.$inner.empty(),
            (this.currentItemsInDom = []);
          let s = 0;
          this.galleryItems.some((t, e) => t.src === i && ((s = e), !0)),
            (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
            this.loadContent(s, !0),
            this.getSlideItem(s).addClass("lg-current"),
            (this.index = s),
            this.updateCurrentCounter(s),
            this.LGel.trigger(b);
        } else this.closeGallery();
      }),
      (s.prototype.getItems = function () {
        if (((this.items = []), this.settings.dynamic))
          return this.settings.dynamicEl || [];
        if (this.settings.selector === "this") this.items.push(this.el);
        else if (this.settings.selector) {
          if (typeof this.settings.selector === "string") {
            if (this.settings.selectWithin) {
              const t = i(this.settings.selectWithin);
              this.items = t.find(this.settings.selector).get();
            } else
              this.items = this.el.querySelectorAll(this.settings.selector);
          } else this.items = this.settings.selector;
        } else this.items = this.el.children;
        return c(
          this.items,
          this.settings.extraProps,
          this.settings.getCaptionFromTitleOrAlt,
          this.settings.exThumbImage
        );
      }),
      (s.prototype.openGallery = function (t, e) {
        const s = this;
        if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
          (this.lgOpened = !0),
            this.outer.get().focus(),
            this.outer.removeClass("lg-hide-items"),
            this.$container.addClass("lg-show");
          const n = this.getItemsToBeInsertedToDom(t, t);
          this.currentItemsInDom = n;
          let l = "";
          n.forEach((t) => {
            l = `${l}<div id="${t}" class="lg-item"></div>`;
          }),
            this.$inner.append(l),
            this.addHtml(t);
          let a = "";
          this.mediaContainerPosition = this.getMediaContainerPosition();
          const g = this.mediaContainerPosition;
          const d = g.top;
          const h = g.bottom;
          this.settings.allowMediaOverlap ||
            this.setMediaContainerPosition(d, h),
            this.zoomFromOrigin &&
              e &&
              ((this.currentImageSize = o(
                e,
                this.outer,
                d + h,
                this.galleryItems[t].__slideVideoInfo &&
                  this.settings.videoMaxSize
              )),
              (a = r(e, this.outer, d, h, this.currentImageSize))),
            (this.zoomFromOrigin && a) ||
              (this.outer.addClass(this.settings.startClass),
              this.getSlideItem(t).removeClass("lg-complete"));
          const c = this.settings.zoomFromOrigin
            ? 100
            : this.settings.backdropDuration;
          setTimeout(() => {
            s.outer.addClass("lg-components-open");
          }, c),
            (this.index = t),
            this.LGel.trigger(I),
            this.getSlideItem(t).addClass("lg-current"),
            (this.lGalleryOn = !1),
            (this.prevScrollTop = i(window).scrollTop()),
            setTimeout(() => {
              if (s.zoomFromOrigin && a) {
                const e = s.getSlideItem(t);
                e.css("transform", a),
                  setTimeout(() => {
                    e
                      .addClass("lg-start-progress lg-start-end-progress")
                      .css(
                        "transition-duration",
                        `${s.settings.startAnimationDuration}ms`
                      ),
                      s.outer.addClass("lg-zoom-from-image");
                  }),
                  setTimeout(() => {
                    e.css("transform", "translate3d(0, 0, 0)");
                  }, 100);
              }
              setTimeout(() => {
                s.$backdrop.addClass("in"), s.$container.addClass("lg-show-in");
              }, 10),
                (s.zoomFromOrigin && a) ||
                  setTimeout(() => {
                    s.outer.addClass("lg-visible");
                  }, s.settings.backdropDuration),
                s.slide(t, !1, !1, !1),
                s.LGel.trigger(w);
            }),
            document.body === this.settings.container &&
              i("html").addClass("lg-on");
        }
      }),
      (s.prototype.getMediaContainerPosition = function () {
        if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
        const t = this.$toolbar.get().clientHeight || 0;
        const e = this.outer.find(".lg-components .lg-sub-html").get();
        const i =
          this.settings.defaultCaptionHeight || (e && e.clientHeight) || 0;
        const s = this.outer.find(".lg-thumb-outer").get();
        return { top: t, bottom: (s ? s.clientHeight : 0) + i };
      }),
      (s.prototype.setMediaContainerPosition = function (t, e) {
        void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          this.$content.css("top", `${t}px`).css("bottom", `${e}px`);
      }),
      (s.prototype.hideBars = function () {
        const t = this;
        setTimeout(() => {
          t.outer.removeClass("lg-hide-items"),
            t.settings.hideBarsDelay > 0 &&
              (t.outer.on("mousemove.lg click.lg touchstart.lg", () => {
                t.outer.removeClass("lg-hide-items"),
                  clearTimeout(t.hideBarTimeout),
                  (t.hideBarTimeout = setTimeout(() => {
                    t.outer.addClass("lg-hide-items");
                  }, t.settings.hideBarsDelay));
              }),
              t.outer.trigger("mousemove.lg"));
        }, this.settings.showBarsAfter);
      }),
      (s.prototype.initPictureFill = function (t) {
        if (this.settings.supportLegacyBrowser) {
          try {
            picturefill({ elements: [t.get()] });
          } catch (t) {
            console.warn(
              "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
            );
          }
        }
      }),
      (s.prototype.counter = function () {
        if (this.settings.counter) {
          const t = `<div class="lg-counter" role="status" aria-live="polite">\n                <span id="${this.getIdName(
            "lg-counter-current"
          )}" class="lg-counter-current">${
            this.index + 1
          } </span> /\n                <span id="${this.getIdName(
            "lg-counter-all"
          )}" class="lg-counter-all">${this.galleryItems.length} </span></div>`;
          this.outer.find(this.settings.appendCounterTo).append(t);
        }
      }),
      (s.prototype.addHtml = function (t) {
        let e;
        let s;
        if (
          (this.galleryItems[t].subHtmlUrl
            ? (s = this.galleryItems[t].subHtmlUrl)
            : (e = this.galleryItems[t].subHtml),
          !s)
        ) {
          if (e) {
            const n = e.substring(0, 1);
            (n !== "." && n !== "#") ||
              (e =
                this.settings.subHtmlSelectorRelative && !this.settings.dynamic
                  ? i(this.items).eq(t).find(e).first().html()
                  : i(e).first().html());
          } else e = "";
        }
        if (this.settings.appendSubHtmlTo !== ".lg-item") {
          s
            ? this.outer.find(".lg-sub-html").load(s)
            : this.outer.find(".lg-sub-html").html(e);
        } else {
          const o = i(this.getSlideItemId(t));
          s ? o.load(s) : o.append(`<div class="lg-sub-html">${e}</div>`);
        }
        e != null &&
          (e === ""
            ? this.outer
                .find(this.settings.appendSubHtmlTo)
                .addClass("lg-empty-html")
            : this.outer
                .find(this.settings.appendSubHtmlTo)
                .removeClass("lg-empty-html")),
          this.LGel.trigger(C, { index: t });
      }),
      (s.prototype.preload = function (t) {
        for (
          let e = 1;
          e <= this.settings.preload && !(e >= this.galleryItems.length - t);
          e++
        )
          this.loadContent(t + e, !1);
        for (let i = 1; i <= this.settings.preload && !(t - i < 0); i++)
          this.loadContent(t - i, !1);
      }),
      (s.prototype.getDummyImgStyles = function (t) {
        return t
          ? `width:${t.width}px;\n                margin-left: -${
              t.width / 2
            }px;\n                margin-top: -${
              t.height / 2
            }px;\n                height:${t.height}px`
          : "";
      }),
      (s.prototype.getVideoContStyle = function (t) {
        return t
          ? `width:${t.width}px;\n                height:${t.height}px`
          : "";
      }),
      (s.prototype.getDummyImageContent = function (t, e, s) {
        let n;
        if ((this.settings.dynamic || (n = i(this.items).eq(e)), n)) {
          let o = void 0;
          if (
            !(o = this.settings.exThumbImage
              ? n.attr(this.settings.exThumbImage)
              : n.find("img").first().attr("src"))
          )
            return "";
          const r = `<img ${s} style="${this.getDummyImgStyles(
            this.currentImageSize
          )}" class="lg-dummy-img" src="${o}" />`;
          return (
            t.addClass("lg-first-slide"),
            this.outer.addClass("lg-first-slide-loading"),
            r
          );
        }
        return "";
      }),
      (s.prototype.setImgMarkup = function (t, e, i) {
        const s = this.galleryItems[i];
        const n = s.alt;
        const o = s.srcset;
        const r = s.sizes;
        const l = s.sources;
        const g = n ? `alt="${n}"` : "";
        const d = `<picture class="lg-img-wrap"> ${
          !this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize
            ? this.getDummyImageContent(e, i, g)
            : a(i, t, g, o, r, l)
        }</picture>`;
        e.prepend(d);
      }),
      (s.prototype.onLgObjectLoad = function (t, e, i, s, n) {
        const o = this;
        n && this.LGel.trigger(x, { index: e, delay: i || 0 }),
          t
            .find(".lg-object")
            .first()
            .on("load.lg", () => {
              o.handleLgObjectLoad(t, e, i, s, n);
            }),
          setTimeout(() => {
            t.find(".lg-object")
              .first()
              .on("error.lg", () => {
                t.addClass("lg-complete lg-complete_"),
                  t.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              });
          }, s);
      }),
      (s.prototype.handleLgObjectLoad = function (t, e, i, s, n) {
        const o = this;
        setTimeout(() => {
          t.addClass("lg-complete lg-complete_"),
            n || o.LGel.trigger(x, { index: e, delay: i || 0 });
        }, s);
      }),
      (s.prototype.isVideo = function (t, e) {
        if (!t) {
          return this.galleryItems[e].video
            ? { html5: !0 }
            : void console.error(
                `lightGallery :- data-src is not provided on slide item ${
                  e + 1
                }. Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/`
              );
        }
        const i = t.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
        );
        const s = t.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)/i
        );
        const n = t.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
        return i
          ? { youtube: i }
          : s
          ? { vimeo: s }
          : n
          ? { wistia: n }
          : void 0;
      }),
      (s.prototype.addSlideVideoInfo = function (t) {
        const e = this;
        t.forEach((t, i) => {
          t.__slideVideoInfo = e.isVideo(t.src, i);
        });
      }),
      (s.prototype.loadContent = function (t, e) {
        const s = this;
        const n = this.galleryItems[t];
        const r = i(this.getSlideItemId(t));
        const c = n.poster;
        const u = n.srcset;
        const m = n.sizes;
        const f = n.sources;
        let y = n.src;
        const b = n.video;
        const C = b && typeof b === "string" ? JSON.parse(b) : b;
        if (n.responsive) {
          const I = n.responsive.split(",");
          y = g(I) || y;
        }
        const w = n.__slideVideoInfo;
        let x = "";
        const S = !!n.iframe;
        if (!r.hasClass("lg-loaded")) {
          if (w) {
            const T = this.mediaContainerPosition;
            const E = T.top;
            const O = T.bottom;
            const L = o(
              this.items[t],
              this.outer,
              E + O,
              w && this.settings.videoMaxSize
            );
            x = this.getVideoContStyle(L);
          }
          if (S) {
            var D = l(
              this.settings.iframeWidth,
              this.settings.iframeHeight,
              y,
              n.iframeTitle
            );
            r.prepend(D);
          } else if (c) {
            let z = "";
            const G = !this.lGalleryOn;
            const M =
              !this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize;
            M && (z = this.getDummyImageContent(r, t, ""));
            D = h(c, z || "", x, w);
            r.prepend(D);
            const k =
              (M
                ? this.settings.startAnimationDuration
                : this.settings.backdropDuration) + 100;
            setTimeout(() => {
              s.LGel.trigger(v, {
                index: t,
                src: y,
                html5Video: C,
                hasPoster: !0,
                isFirstSlide: G,
              });
            }, k);
          } else if (w) {
            D = `<div class="lg-video-cont " style="${x}"></div>`;
            r.prepend(D),
              this.LGel.trigger(v, {
                index: t,
                src: y,
                html5Video: C,
                hasPoster: !1,
              });
          } else if ((this.setImgMarkup(y, r, t), u || f)) {
            const A = r.find(".lg-object");
            this.initPictureFill(A);
          }
          this.LGel.trigger(p, { index: t }),
            this.lGalleryOn &&
              this.settings.appendSubHtmlTo === ".lg-item" &&
              this.addHtml(t);
        }
        let B = 0;
        let P = 0;
        this.lGalleryOn ||
          (P =
            this.zoomFromOrigin && this.currentImageSize
              ? this.settings.startAnimationDuration + 10
              : this.settings.backdropDuration + 10),
          P && !i(document.body).hasClass("lg-from-hash") && (B = P),
          !this.lGalleryOn &&
            this.zoomFromOrigin &&
            this.currentImageSize &&
            (setTimeout(() => {
              r.removeClass(
                "lg-start-end-progress lg-start-progress"
              ).removeAttr("style");
            }, this.settings.startAnimationDuration + 100),
            r.hasClass("lg-loaded") ||
              setTimeout(() => {
                if (
                  (r.find(".lg-img-wrap").append(a(t, y, "", u, m, n.sources)),
                  u || f)
                ) {
                  const e = r.find(".lg-object");
                  s.initPictureFill(e);
                }
                s.onLgObjectLoad(r, t, P, B, !0);
                const i = r.find(".lg-object").first();
                d(i.get())
                  ? s.loadContentOnLoad(t, r, B)
                  : i.on("load.lg error.lg", () => {
                      s.loadContentOnLoad(t, r, B);
                    });
              }, this.settings.startAnimationDuration + 100)),
          r.addClass("lg-loaded"),
          this.onLgObjectLoad(r, t, P, B, !1),
          w && w.html5 && !c && r.addClass("lg-complete lg-complete_"),
          (this.zoomFromOrigin && this.currentImageSize) ||
            !r.hasClass("lg-complete_") ||
            this.lGalleryOn ||
            setTimeout(() => {
              r.addClass("lg-complete");
            }, this.settings.backdropDuration),
          (this.lGalleryOn = !0),
          !0 === e &&
            (r.hasClass("lg-complete_")
              ? this.preload(t)
              : r
                  .find(".lg-object")
                  .first()
                  .on("load.lg error.lg", () => {
                    s.preload(t);
                  }));
      }),
      (s.prototype.loadContentOnLoad = function (t, e, i) {
        const s = this;
        setTimeout(() => {
          e.find(".lg-dummy-img").remove(),
            e.removeClass("lg-first-slide"),
            s.outer.removeClass("lg-first-slide-loading"),
            (s.isDummyImageRemoved = !0),
            s.preload(t);
        }, i + 300);
      }),
      (s.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
        const s = this;
        void 0 === i && (i = 0);
        const n = [];
        let o = Math.max(i, 3);
        o = Math.min(o, this.galleryItems.length);
        const r = `lg-item-${this.lgId}-${e}`;
        if (this.galleryItems.length <= 3) {
          return (
            this.galleryItems.forEach((t, e) => {
              n.push(`lg-item-${s.lgId}-${e}`);
            }),
            n
          );
        }
        if (t < (this.galleryItems.length - 1) / 2) {
          for (var l = t; l > t - o / 2 && l >= 0; l--)
            n.push(`lg-item-${this.lgId}-${l}`);
          var a = n.length;
          for (l = 0; l < o - a; l++)
            n.push(`lg-item-${this.lgId}-${t + l + 1}`);
        } else {
          for (l = t; l <= this.galleryItems.length - 1 && l < t + o / 2; l++)
            n.push(`lg-item-${this.lgId}-${l}`);
          for (a = n.length, l = 0; l < o - a; l++)
            n.push(`lg-item-${this.lgId}-${t - l - 1}`);
        }
        return (
          this.settings.loop &&
            (t === this.galleryItems.length - 1
              ? n.push(`lg-item-${this.lgId}-0`)
              : t === 0 &&
                n.push(`lg-item-${this.lgId}-${this.galleryItems.length - 1}`)),
          n.indexOf(r) === -1 && n.push(`lg-item-${this.lgId}-${e}`),
          n
        );
      }),
      (s.prototype.organizeSlideItems = function (t, e) {
        const s = this;
        const n = this.getItemsToBeInsertedToDom(
          t,
          e,
          this.settings.numberOfSlideItemsInDom
        );
        return (
          n.forEach((t) => {
            s.currentItemsInDom.indexOf(t) === -1 &&
              s.$inner.append(`<div id="${t}" class="lg-item"></div>`);
          }),
          this.currentItemsInDom.forEach((t) => {
            n.indexOf(t) === -1 && i(`#${t}`).remove();
          }),
          n
        );
      }),
      (s.prototype.getPreviousSlideIndex = function () {
        let t = 0;
        try {
          const e = this.outer.find(".lg-current").first().attr("id");
          t = parseInt(e.split("-")[3]) || 0;
        } catch (e) {
          t = 0;
        }
        return t;
      }),
      (s.prototype.setDownloadValue = function (t) {
        if (this.settings.download) {
          const e = this.galleryItems[t];
          if (!1 === e.downloadUrl || e.downloadUrl === "false")
            this.outer.addClass("lg-hide-download");
          else {
            const i = this.getElementById("lg-download");
            this.outer.removeClass("lg-hide-download"),
              i.attr("href", e.downloadUrl || e.src),
              e.download && i.attr("download", e.download);
          }
        }
      }),
      (s.prototype.makeSlideAnimation = function (t, e, i) {
        const s = this;
        this.lGalleryOn && i.addClass("lg-slide-progress"),
          setTimeout(
            () => {
              s.outer.addClass("lg-no-trans"),
                s.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-next-slide"),
                t === "prev"
                  ? (e.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                  : (e.addClass("lg-next-slide"), i.addClass("lg-prev-slide")),
                setTimeout(() => {
                  s.outer.find(".lg-item").removeClass("lg-current"),
                    e.addClass("lg-current"),
                    s.outer.removeClass("lg-no-trans");
                }, 50);
            },
            this.lGalleryOn ? this.settings.slideDelay : 0
          );
      }),
      (s.prototype.slide = function (t, e, i, s) {
        const n = this;
        const r = this.getPreviousSlideIndex();
        if (
          ((this.currentItemsInDom = this.organizeSlideItems(t, r)),
          !this.lGalleryOn || r !== t)
        ) {
          const l = this.galleryItems.length;
          if (!this.lgBusy) {
            this.settings.counter && this.updateCurrentCounter(t);
            const a = this.getSlideItem(t);
            const g = this.getSlideItem(r);
            const d = this.galleryItems[t];
            const h = d.__slideVideoInfo;
            if (
              (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
              this.setDownloadValue(t),
              h)
            ) {
              const c = this.mediaContainerPosition;
              const u = c.top;
              const m = c.bottom;
              const p = o(
                this.items[t],
                this.outer,
                u + m,
                h && this.settings.videoMaxSize
              );
              this.resizeVideoSlide(t, p);
            }
            if (
              (this.LGel.trigger(S, {
                prevIndex: r,
                index: t,
                fromTouch: !!e,
                fromThumb: !!i,
              }),
              (this.lgBusy = !0),
              clearTimeout(this.hideBarTimeout),
              this.arrowDisable(t),
              s || (t < r ? (s = "prev") : t > r && (s = "next")),
              e)
            ) {
              this.outer
                .find(".lg-item")
                .removeClass("lg-prev-slide lg-current lg-next-slide");
              let f = void 0;
              let v = void 0;
              l > 2
                ? ((f = t - 1),
                  (v = t + 1),
                  ((t === 0 && r === l - 1) || (t === l - 1 && r === 0)) &&
                    ((v = 0), (f = l - 1)))
                : ((f = 0), (v = 1)),
                s === "prev"
                  ? this.getSlideItem(v).addClass("lg-next-slide")
                  : this.getSlideItem(f).addClass("lg-prev-slide"),
                a.addClass("lg-current");
            } else this.makeSlideAnimation(s, a, g);
            this.lGalleryOn || this.loadContent(t, !0),
              setTimeout(() => {
                n.lGalleryOn && n.loadContent(t, !0),
                  n.settings.appendSubHtmlTo !== ".lg-item" && n.addHtml(t);
              }, (this.lGalleryOn ? this.settings.speed + 50 : 50) + (e ? 0 : this.settings.slideDelay)),
              setTimeout(() => {
                (n.lgBusy = !1),
                  g.removeClass("lg-slide-progress"),
                  n.LGel.trigger(T, {
                    prevIndex: r,
                    index: t,
                    fromTouch: e,
                    fromThumb: i,
                  });
              }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (e ? 0 : this.settings.slideDelay));
          }
          this.index = t;
        }
      }),
      (s.prototype.updateCurrentCounter = function (t) {
        this.getElementById("lg-counter-current").html(`${t + 1}`);
      }),
      (s.prototype.updateCounterTotal = function () {
        this.getElementById("lg-counter-all").html(
          `${this.galleryItems.length}`
        );
      }),
      (s.prototype.getSlideType = function (t) {
        return t.__slideVideoInfo ? "video" : t.iframe ? "iframe" : "image";
      }),
      (s.prototype.touchMove = function (t, e, i) {
        const s = e.pageX - t.pageX;
        const n = e.pageY - t.pageY;
        let o = !1;
        if (
          (this.swipeDirection
            ? (o = !0)
            : Math.abs(s) > 15
            ? ((this.swipeDirection = "horizontal"), (o = !0))
            : Math.abs(n) > 15 &&
              ((this.swipeDirection = "vertical"), (o = !0)),
          o)
        ) {
          const r = this.getSlideItem(this.index);
          if (this.swipeDirection === "horizontal") {
            i == null || i.preventDefault(),
              this.outer.addClass("lg-dragging"),
              this.setTranslate(r, s, 0);
            const l = r.get().offsetWidth;
            const a = (15 * l) / 100 - Math.abs((10 * s) / 100);
            this.setTranslate(
              this.outer.find(".lg-prev-slide").first(),
              -l + s - a,
              0
            ),
              this.setTranslate(
                this.outer.find(".lg-next-slide").first(),
                l + s + a,
                0
              );
          } else if (
            this.swipeDirection === "vertical" &&
            this.settings.swipeToClose
          ) {
            i == null || i.preventDefault(),
              this.$container.addClass("lg-dragging-vertical");
            const g = 1 - Math.abs(n) / window.innerHeight;
            this.$backdrop.css("opacity", g);
            const d = 1 - Math.abs(n) / (2 * window.innerWidth);
            this.setTranslate(r, 0, n, d, d),
              Math.abs(n) > 100 &&
                this.outer
                  .addClass("lg-hide-items")
                  .removeClass("lg-components-open");
          }
        }
      }),
      (s.prototype.touchEnd = function (t, e, s) {
        let n;
        const o = this;
        this.settings.mode !== "lg-slide" && this.outer.addClass("lg-slide"),
          setTimeout(() => {
            o.$container.removeClass("lg-dragging-vertical"),
              o.outer
                .removeClass("lg-dragging lg-hide-items")
                .addClass("lg-components-open");
            let r = !0;
            if (o.swipeDirection === "horizontal") {
              n = t.pageX - e.pageX;
              const l = Math.abs(t.pageX - e.pageX);
              n < 0 && l > o.settings.swipeThreshold
                ? (o.goToNextSlide(!0), (r = !1))
                : n > 0 &&
                  l > o.settings.swipeThreshold &&
                  (o.goToPrevSlide(!0), (r = !1));
            } else if (o.swipeDirection === "vertical") {
              if (
                ((n = Math.abs(t.pageY - e.pageY)),
                o.settings.closable && o.settings.swipeToClose && n > 100)
              )
                return void o.closeGallery();
              o.$backdrop.css("opacity", 1);
            }
            if (
              (o.outer.find(".lg-item").removeAttr("style"),
              r && Math.abs(t.pageX - e.pageX) < 5)
            ) {
              const a = i(s.target);
              o.isPosterElement(a) && o.LGel.trigger(E);
            }
            o.swipeDirection = void 0;
          }),
          setTimeout(() => {
            o.outer.hasClass("lg-dragging") ||
              o.settings.mode === "lg-slide" ||
              o.outer.removeClass("lg-slide");
          }, this.settings.speed + 100);
      }),
      (s.prototype.enableSwipe = function () {
        const t = this;
        let e = {};
        let s = {};
        let n = !1;
        let o = !1;
        this.settings.enableSwipe &&
          (this.$inner.on("touchstart.lg", (s) => {
            t.dragOrSwipeEnabled = !0;
            const n = t.getSlideItem(t.index);
            (!i(s.target).hasClass("lg-item") && !n.get().contains(s.target)) ||
              t.outer.hasClass("lg-zoomed") ||
              t.lgBusy ||
              s.targetTouches.length !== 1 ||
              ((o = !0),
              (t.touchAction = "swipe"),
              t.manageSwipeClass(),
              (e = {
                pageX: s.targetTouches[0].pageX,
                pageY: s.targetTouches[0].pageY,
              }));
          }),
          this.$inner.on("touchmove.lg", (i) => {
            o &&
              t.touchAction === "swipe" &&
              i.targetTouches.length === 1 &&
              ((s = {
                pageX: i.targetTouches[0].pageX,
                pageY: i.targetTouches[0].pageY,
              }),
              t.touchMove(e, s, i),
              (n = !0));
          }),
          this.$inner.on("touchend.lg", (r) => {
            if (t.touchAction === "swipe") {
              if (n) (n = !1), t.touchEnd(s, e, r);
              else if (o) {
                const l = i(r.target);
                t.isPosterElement(l) && t.LGel.trigger(E);
              }
              (t.touchAction = void 0), (o = !1);
            }
          }));
      }),
      (s.prototype.enableDrag = function () {
        const t = this;
        let e = {};
        let s = {};
        let n = !1;
        let o = !1;
        this.settings.enableDrag &&
          (this.outer.on("mousedown.lg", (s) => {
            t.dragOrSwipeEnabled = !0;
            const o = t.getSlideItem(t.index);
            (i(s.target).hasClass("lg-item") || o.get().contains(s.target)) &&
              (t.outer.hasClass("lg-zoomed") ||
                t.lgBusy ||
                (s.preventDefault(),
                t.lgBusy ||
                  (t.manageSwipeClass(),
                  (e = { pageX: s.pageX, pageY: s.pageY }),
                  (n = !0),
                  (t.outer.get().scrollLeft += 1),
                  (t.outer.get().scrollLeft -= 1),
                  t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                  t.LGel.trigger(O))));
          }),
          i(window).on(`mousemove.lg.global${this.lgId}`, (i) => {
            n &&
              t.lgOpened &&
              ((o = !0),
              (s = { pageX: i.pageX, pageY: i.pageY }),
              t.touchMove(e, s),
              t.LGel.trigger(L));
          }),
          i(window).on(`mouseup.lg.global${this.lgId}`, (r) => {
            if (t.lgOpened) {
              const l = i(r.target);
              o
                ? ((o = !1), t.touchEnd(s, e, r), t.LGel.trigger(D))
                : t.isPosterElement(l) && t.LGel.trigger(E),
                n &&
                  ((n = !1),
                  t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
            }
          }));
      }),
      (s.prototype.triggerPosterClick = function () {
        const t = this;
        this.$inner.on("click.lg", (e) => {
          !t.dragOrSwipeEnabled &&
            t.isPosterElement(i(e.target)) &&
            t.LGel.trigger(E);
        });
      }),
      (s.prototype.manageSwipeClass = function () {
        let t = this.index + 1;
        let e = this.index - 1;
        this.settings.loop &&
          this.galleryItems.length > 2 &&
          (this.index === 0
            ? (e = this.galleryItems.length - 1)
            : this.index === this.galleryItems.length - 1 && (t = 0)),
          this.outer
            .find(".lg-item")
            .removeClass("lg-next-slide lg-prev-slide"),
          e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
          this.getSlideItem(t).addClass("lg-next-slide");
      }),
      (s.prototype.goToNextSlide = function (t) {
        const e = this;
        let i = this.settings.loop;
        t && this.galleryItems.length < 3 && (i = !1),
          this.lgBusy ||
            (this.index + 1 < this.galleryItems.length
              ? (this.index++,
                this.LGel.trigger(z, { index: this.index }),
                this.slide(this.index, !!t, !1, "next"))
              : i
              ? ((this.index = 0),
                this.LGel.trigger(z, { index: this.index }),
                this.slide(this.index, !!t, !1, "next"))
              : this.settings.slideEndAnimation &&
                !t &&
                (this.outer.addClass("lg-right-end"),
                setTimeout(() => {
                  e.outer.removeClass("lg-right-end");
                }, 400)));
      }),
      (s.prototype.goToPrevSlide = function (t) {
        const e = this;
        let i = this.settings.loop;
        t && this.galleryItems.length < 3 && (i = !1),
          this.lgBusy ||
            (this.index > 0
              ? (this.index--,
                this.LGel.trigger(G, { index: this.index, fromTouch: t }),
                this.slide(this.index, !!t, !1, "prev"))
              : i
              ? ((this.index = this.galleryItems.length - 1),
                this.LGel.trigger(G, { index: this.index, fromTouch: t }),
                this.slide(this.index, !!t, !1, "prev"))
              : this.settings.slideEndAnimation &&
                !t &&
                (this.outer.addClass("lg-left-end"),
                setTimeout(() => {
                  e.outer.removeClass("lg-left-end");
                }, 400)));
      }),
      (s.prototype.keyPress = function () {
        const t = this;
        i(window).on(`keydown.lg.global${this.lgId}`, (e) => {
          t.lgOpened &&
            !0 === t.settings.escKey &&
            e.keyCode === 27 &&
            (e.preventDefault(),
            t.settings.allowMediaOverlap &&
            t.outer.hasClass("lg-can-toggle") &&
            t.outer.hasClass("lg-components-open")
              ? t.outer.removeClass("lg-components-open")
              : t.closeGallery()),
            t.lgOpened &&
              t.galleryItems.length > 1 &&
              (e.keyCode === 37 && (e.preventDefault(), t.goToPrevSlide()),
              e.keyCode === 39 && (e.preventDefault(), t.goToNextSlide()));
        });
      }),
      (s.prototype.arrow = function () {
        const t = this;
        this.getElementById("lg-prev").on("click.lg", () => {
          t.goToPrevSlide();
        }),
          this.getElementById("lg-next").on("click.lg", () => {
            t.goToNextSlide();
          });
      }),
      (s.prototype.arrowDisable = function (t) {
        if (!this.settings.loop && this.settings.hideControlOnEnd) {
          const e = this.getElementById("lg-prev");
          const i = this.getElementById("lg-next");
          t + 1 === this.galleryItems.length
            ? i.attr("disabled", "disabled").addClass("disabled")
            : i.removeAttr("disabled").removeClass("disabled"),
            t === 0
              ? e.attr("disabled", "disabled").addClass("disabled")
              : e.removeAttr("disabled").removeClass("disabled");
        }
      }),
      (s.prototype.setTranslate = function (t, e, i, s, n) {
        void 0 === s && (s = 1),
          void 0 === n && (n = 1),
          t.css(
            "transform",
            `translate3d(${e}px, ${i}px, 0px) scale3d(${s}, ${n}, 1)`
          );
      }),
      (s.prototype.mousewheel = function () {
        const t = this;
        this.outer.on("mousewheel.lg", (e) => {
          !e.deltaY ||
            t.galleryItems.length < 2 ||
            (e.deltaY > 0 ? t.goToPrevSlide() : t.goToNextSlide(),
            e.preventDefault());
        });
      }),
      (s.prototype.isSlideElement = function (t) {
        return (
          t.hasClass("lg-outer") ||
          t.hasClass("lg-item") ||
          t.hasClass("lg-img-wrap")
        );
      }),
      (s.prototype.isPosterElement = function (t) {
        const e = this.getSlideItem(this.index)
          .find(".lg-video-play-button")
          .get();
        return (
          t.hasClass("lg-video-poster") ||
          t.hasClass("lg-video-play-button") ||
          (e && e.contains(t.get()))
        );
      }),
      (s.prototype.toggleMaximize = function () {
        const t = this;
        this.getElementById("lg-maximize").on("click.lg", () => {
          t.$container.toggleClass("lg-inline"), t.refreshOnResize();
        });
      }),
      (s.prototype.invalidateItems = function () {
        for (let t = 0; t < this.items.length; t++) {
          const e = i(this.items[t]);
          e.off(`click.lgcustom-item-${e.attr("data-lg-id")}`);
        }
      }),
      (s.prototype.manageCloseGallery = function () {
        const t = this;
        if (this.settings.closable) {
          let e = !1;
          this.getElementById("lg-close").on("click.lg", () => {
            t.closeGallery();
          }),
            this.settings.closeOnTap &&
              (this.outer.on("mousedown.lg", (s) => {
                const n = i(s.target);
                e = !!t.isSlideElement(n);
              }),
              this.outer.on("mousemove.lg", () => {
                e = !1;
              }),
              this.outer.on("mouseup.lg", (s) => {
                const n = i(s.target);
                t.isSlideElement(n) &&
                  e &&
                  (t.outer.hasClass("lg-dragging") || t.closeGallery());
              }));
        }
      }),
      (s.prototype.closeGallery = function (t) {
        const e = this;
        if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
        this.LGel.trigger(M), i(window).scrollTop(this.prevScrollTop);
        let s;
        const n = this.items[this.index];
        if (this.zoomFromOrigin && n) {
          const l = this.mediaContainerPosition;
          const a = l.top;
          const g = l.bottom;
          const d = o(
            n,
            this.outer,
            a + g,
            this.galleryItems[this.index].__slideVideoInfo &&
              this.settings.videoMaxSize
          );
          s = r(n, this.outer, a, g, d);
        }
        this.zoomFromOrigin && s
          ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
            this.getSlideItem(this.index)
              .addClass("lg-start-end-progress")
              .css(
                "transition-duration",
                `${this.settings.startAnimationDuration}ms`
              )
              .css("transform", s))
          : (this.outer.addClass("lg-hide-items"),
            this.outer.removeClass("lg-zoom-from-image")),
          this.destroyModules(),
          (this.lGalleryOn = !1),
          (this.isDummyImageRemoved = !1),
          (this.zoomFromOrigin = this.settings.zoomFromOrigin),
          clearTimeout(this.hideBarTimeout),
          (this.hideBarTimeout = !1),
          i("html").removeClass("lg-on"),
          this.outer.removeClass("lg-visible lg-components-open"),
          this.$backdrop.removeClass("in").css("opacity", 0);
        const h =
          this.zoomFromOrigin && s
            ? Math.max(
                this.settings.startAnimationDuration,
                this.settings.backdropDuration
              )
            : this.settings.backdropDuration;
        return (
          this.$container.removeClass("lg-show-in"),
          setTimeout(() => {
            e.zoomFromOrigin && s && e.outer.removeClass("lg-zoom-from-image"),
              e.$container.removeClass("lg-show"),
              e.$backdrop
                .removeAttr("style")
                .css("transition-duration", `${e.settings.backdropDuration}ms`),
              e.outer.removeClass(`lg-closing ${e.settings.startClass}`),
              e.getSlideItem(e.index).removeClass("lg-start-end-progress"),
              e.$inner.empty(),
              e.lgOpened && e.LGel.trigger(k, { instance: e }),
              e.outer.get() && e.outer.get().blur(),
              (e.lgOpened = !1);
          }, h + 100),
          h + 100
        );
      }),
      (s.prototype.initModules = function () {
        this.plugins.forEach((t) => {
          try {
            t.init();
          } catch (t) {
            console.warn(
              "lightGallery:- make sure lightGallery module is properly initiated"
            );
          }
        });
      }),
      (s.prototype.destroyModules = function (t) {
        this.plugins.forEach((e) => {
          try {
            t ? e.destroy() : e.closeGallery && e.closeGallery();
          } catch (t) {
            console.warn(
              "lightGallery:- make sure lightGallery module is properly destroyed"
            );
          }
        });
      }),
      (s.prototype.refresh = function (t) {
        this.settings.dynamic || this.invalidateItems(),
          (this.galleryItems = t || this.getItems()),
          this.updateControls(),
          this.openGalleryOnItemClick(),
          this.LGel.trigger(b);
      }),
      (s.prototype.updateControls = function () {
        this.addSlideVideoInfo(this.galleryItems),
          this.updateCounterTotal(),
          this.manageSingleSlideClassName();
      }),
      (s.prototype.destroy = function () {
        const t = this;
        const e = this.closeGallery(!0);
        return (
          setTimeout(() => {
            t.destroyModules(!0),
              t.settings.dynamic || t.invalidateItems(),
              i(window).off(`.lg.global${t.lgId}`),
              t.LGel.off(".lg"),
              t.$container.remove();
          }, e),
          e
        );
      }),
      s
    );
  })();
  return function (t, e) {
    return new B(t, e);
  };
});
