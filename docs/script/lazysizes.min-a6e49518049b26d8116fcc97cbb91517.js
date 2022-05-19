/*! lazysizes - v5.3.2 */

!(function (e) {
  const t = (function (u, D, f) {
    let k;
    let H;
    if (
      ((function () {
        let e;
        const t = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          fastLoadedClass: "ls-is-cached",
          iframeLoadMode: 0,
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: true,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: true,
          ricTimeout: 0,
          throttleDelay: 125,
        };
        H = u.lazySizesConfig || u.lazysizesConfig || {};
        for (e in t) {
          if (!(e in H)) {
            H[e] = t[e];
          }
        }
      })(),
      !D || !D.getElementsByClassName)
    ) {
      return { init() {}, cfg: H, noSupport: true };
    }
    const O = D.documentElement;
    const i = u.HTMLPictureElement;
    const P = "addEventListener";
    const $ = "getAttribute";
    const q = u[P].bind(u);
    const I = u.setTimeout;
    const U = u.requestAnimationFrame || I;
    const o = u.requestIdleCallback;
    const j = /^picture$/i;
    const r = ["load", "error", "lazyincluded", "_lazyloaded"];
    const a = {};
    const G = Array.prototype.forEach;
    const J = function (e, t) {
      if (!a[t]) {
        a[t] = new RegExp(`(\\s|^)${t}(\\s|$)`);
      }
      return a[t].test(e[$]("class") || "") && a[t];
    };
    const K = function (e, t) {
      if (!J(e, t)) {
        e.setAttribute("class", `${(e[$]("class") || "").trim()} ${t}`);
      }
    };
    const Q = function (e, t) {
      let a;
      if ((a = J(e, t))) {
        e.setAttribute("class", (e[$]("class") || "").replace(a, " "));
      }
    };
    var V = function (t, a, e) {
      const i = e ? P : "removeEventListener";
      if (e) {
        V(t, a);
      }
      r.forEach((e) => {
        t[i](e, a);
      });
    };
    const X = function (e, t, a, i, r) {
      const n = D.createEvent("Event");
      if (!a) {
        a = {};
      }
      a.instance = k;
      n.initEvent(t, !i, !r);
      n.detail = a;
      e.dispatchEvent(n);
      return n;
    };
    const Y = function (e, t) {
      let a;
      if (!i && (a = u.picturefill || H.pf)) {
        if (t && t.src && !e[$]("srcset")) {
          e.setAttribute("srcset", t.src);
        }
        a({ reevaluate: true, elements: [e] });
      } else if (t && t.src) {
        e.src = t.src;
      }
    };
    const Z = function (e, t) {
      return (getComputedStyle(e, null) || {})[t];
    };
    const s = function (e, t, a) {
      a = a || e.offsetWidth;
      while (a < H.minSize && t && !e._lazysizesWidth) {
        a = t.offsetWidth;
        t = t.parentNode;
      }
      return a;
    };
    const ee = (function () {
      let a;
      let i;
      const t = [];
      const r = [];
      let n = t;
      const s = function () {
        const e = n;
        n = t.length ? r : t;
        a = true;
        i = false;
        while (e.length) {
          e.shift()();
        }
        a = false;
      };
      const e = function (e, t) {
        if (a && !t) {
          e.apply(this, arguments);
        } else {
          n.push(e);
          if (!i) {
            i = true;
            (D.hidden ? I : U)(s);
          }
        }
      };
      e._lsFlush = s;
      return e;
    })();
    const te = function (a, e) {
      return e
        ? function () {
            ee(a);
          }
        : function () {
            const e = this;
            const t = arguments;
            ee(() => {
              a.apply(e, t);
            });
          };
    };
    const ae = function (e) {
      let a;
      let i = 0;
      const r = H.throttleDelay;
      let n = H.ricTimeout;
      const t = function () {
        a = false;
        i = f.now();
        e();
      };
      const s =
        o && n > 49
          ? function () {
              o(t, { timeout: n });
              if (n !== H.ricTimeout) {
                n = H.ricTimeout;
              }
            }
          : te(() => {
              I(t);
            }, true);
      return function (e) {
        let t;
        if ((e = e === true)) {
          n = 33;
        }
        if (a) {
          return;
        }
        a = true;
        t = r - (f.now() - i);
        if (t < 0) {
          t = 0;
        }
        if (e || t < 9) {
          s();
        } else {
          I(s, t);
        }
      };
    };
    const ie = function (e) {
      let t;
      let a;
      const i = 99;
      const r = function () {
        t = null;
        e();
      };
      var n = function () {
        const e = f.now() - a;
        if (e < i) {
          I(n, i - e);
        } else {
          (o || r)(r);
        }
      };
      return function () {
        a = f.now();
        if (!t) {
          t = I(n, i);
        }
      };
    };
    const e = (function () {
      let v;
      let m;
      let c;
      let h;
      let e;
      let y;
      let z;
      let g;
      let p;
      let C;
      let b;
      let A;
      const n = /^img$/i;
      const d = /^iframe$/i;
      const E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
      const _ = 0;
      let w = 0;
      let M = 0;
      let N = -1;
      const L = function (e) {
        M--;
        if (!e || M < 0 || !e.target) {
          M = 0;
        }
      };
      const x = function (e) {
        if (A == null) {
          A = Z(D.body, "visibility") == "hidden";
        }
        return (
          A ||
          !(
            Z(e.parentNode, "visibility") == "hidden" &&
            Z(e, "visibility") == "hidden"
          )
        );
      };
      const W = function (e, t) {
        let a;
        let i = e;
        let r = x(e);
        g -= t;
        b += t;
        p -= t;
        C += t;
        while (r && (i = i.offsetParent) && i != D.body && i != O) {
          r = (Z(i, "opacity") || 1) > 0;
          if (r && Z(i, "overflow") != "visible") {
            a = i.getBoundingClientRect();
            r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1;
          }
        }
        return r;
      };
      const t = function () {
        let e;
        let t;
        let a;
        let i;
        let r;
        let n;
        let s;
        let o;
        let l;
        let u;
        let f;
        let c;
        const d = k.elements;
        if ((h = H.loadMode) && M < 8 && (e = d.length)) {
          t = 0;
          N++;
          for (; t < e; t++) {
            if (!d[t] || d[t]._lazyRace) {
              continue;
            }
            if (!E || (k.prematureUnveil && k.prematureUnveil(d[t]))) {
              R(d[t]);
              continue;
            }
            if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
              n = w;
            }
            if (!u) {
              u =
                !H.expand || H.expand < 1
                  ? O.clientHeight > 500 && O.clientWidth > 500
                    ? 500
                    : 370
                  : H.expand;
              k._defEx = u;
              f = u * H.expFactor;
              c = H.hFac;
              A = null;
              if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                w = f;
                N = 0;
              } else if (h > 1 && N > 1 && M < 6) {
                w = u;
              } else {
                w = _;
              }
            }
            if (l !== n) {
              y = innerWidth + n * c;
              z = innerHeight + n;
              s = n * -1;
              l = n;
            }
            a = d[t].getBoundingClientRect();
            if (
              (b = a.bottom) >= s &&
              (g = a.top) <= z &&
              (C = a.right) >= s * c &&
              (p = a.left) <= y &&
              (b || C || p || g) &&
              (H.loadHidden || x(d[t])) &&
              ((m && M < 3 && !o && (h < 3 || N < 4)) || W(d[t], n))
            ) {
              R(d[t]);
              r = true;
              if (M > 9) {
                break;
              }
            } else if (
              !r &&
              m &&
              !i &&
              M < 4 &&
              N < 4 &&
              h > 2 &&
              (v[0] || H.preloadAfterLoad) &&
              (v[0] ||
                (!o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto")))
            ) {
              i = v[0] || d[t];
            }
          }
          if (i && !r) {
            R(i);
          }
        }
      };
      const a = ae(t);
      const S = function (e) {
        const t = e.target;
        if (t._lazyCache) {
          delete t._lazyCache;
          return;
        }
        L(e);
        K(t, H.loadedClass);
        Q(t, H.loadingClass);
        V(t, B);
        X(t, "lazyloaded");
      };
      const i = te(S);
      var B = function (e) {
        i({ target: e.target });
      };
      const T = function (e, t) {
        const a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
        if (a == 0) {
          e.contentWindow.location.replace(t);
        } else if (a == 1) {
          e.src = t;
        }
      };
      const F = function (e) {
        let t;
        const a = e[$](H.srcsetAttr);
        if ((t = H.customMedia[e[$]("data-media") || e[$]("media")])) {
          e.setAttribute("media", t);
        }
        if (a) {
          e.setAttribute("srcset", a);
        }
      };
      const s = te((t, e, a, i, r) => {
        let n;
        let s;
        let o;
        let l;
        let u;
        let f;
        if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
          if (i) {
            if (a) {
              K(t, H.autosizesClass);
            } else {
              t.setAttribute("sizes", i);
            }
          }
          s = t[$](H.srcsetAttr);
          n = t[$](H.srcAttr);
          if (r) {
            o = t.parentNode;
            l = o && j.test(o.nodeName || "");
          }
          f = e.firesLoad || ("src" in t && (s || n || l));
          u = { target: t };
          K(t, H.loadingClass);
          if (f) {
            clearTimeout(c);
            c = I(L, 2500);
            V(t, B, true);
          }
          if (l) {
            G.call(o.getElementsByTagName("source"), F);
          }
          if (s) {
            t.setAttribute("srcset", s);
          } else if (n && !l) {
            if (d.test(t.nodeName)) {
              T(t, n);
            } else {
              t.src = n;
            }
          }
          if (r && (s || l)) {
            Y(t, { src: n });
          }
        }
        if (t._lazyRace) {
          delete t._lazyRace;
        }
        Q(t, H.lazyClass);
        ee(() => {
          const e = t.complete && t.naturalWidth > 1;
          if (!f || e) {
            if (e) {
              K(t, H.fastLoadedClass);
            }
            S(u);
            t._lazyCache = true;
            I(() => {
              if ("_lazyCache" in t) {
                delete t._lazyCache;
              }
            }, 9);
          }
          if (t.loading == "lazy") {
            M--;
          }
        }, true);
      });
      var R = function (e) {
        if (e._lazyRace) {
          return;
        }
        let t;
        const a = n.test(e.nodeName);
        const i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
        const r = i == "auto";
        if (
          (r || !m) &&
          a &&
          (e[$]("src") || e.srcset) &&
          !e.complete &&
          !J(e, H.errorClass) &&
          J(e, H.lazyClass)
        ) {
          return;
        }
        t = X(e, "lazyunveilread").detail;
        if (r) {
          re.updateElem(e, true, e.offsetWidth);
        }
        e._lazyRace = true;
        M++;
        s(e, t, r, i, a);
      };
      const r = ie(() => {
        H.loadMode = 3;
        a();
      });
      const o = function () {
        if (H.loadMode == 3) {
          H.loadMode = 2;
        }
        r();
      };
      var l = function () {
        if (m) {
          return;
        }
        if (f.now() - e < 999) {
          I(l, 999);
          return;
        }
        m = true;
        H.loadMode = 3;
        a();
        q("scroll", o, true);
      };
      return {
        _() {
          e = f.now();
          k.elements = D.getElementsByClassName(H.lazyClass);
          v = D.getElementsByClassName(`${H.lazyClass} ${H.preloadClass}`);
          q("scroll", a, true);
          q("resize", a, true);
          q("pageshow", (e) => {
            if (e.persisted) {
              const t = D.querySelectorAll(`.${H.loadingClass}`);
              if (t.length && t.forEach) {
                U(() => {
                  t.forEach((e) => {
                    if (e.complete) {
                      R(e);
                    }
                  });
                });
              }
            }
          });
          if (u.MutationObserver) {
            new MutationObserver(a).observe(O, {
              childList: true,
              subtree: true,
              attributes: true,
            });
          } else {
            O[P]("DOMNodeInserted", a, true);
            O[P]("DOMAttrModified", a, true);
            setInterval(a, 999);
          }
          q("hashchange", a, true);
          [
            "focus",
            "mouseover",
            "click",
            "load",
            "transitionend",
            "animationend",
          ].forEach((e) => {
            D[P](e, a, true);
          });
          if (/d$|^c/.test(D.readyState)) {
            l();
          } else {
            q("load", l);
            D[P]("DOMContentLoaded", a);
            I(l, 2e4);
          }
          if (k.elements.length) {
            t();
            ee._lsFlush();
          } else {
            a();
          }
        },
        checkElems: a,
        unveil: R,
        _aLSL: o,
      };
    })();
    var re = (function () {
      let a;
      const n = te((e, t, a, i) => {
        let r;
        let n;
        let s;
        e._lazysizesWidth = i;
        i += "px";
        e.setAttribute("sizes", i);
        if (j.test(t.nodeName || "")) {
          r = t.getElementsByTagName("source");
          for (n = 0, s = r.length; n < s; n++) {
            r[n].setAttribute("sizes", i);
          }
        }
        if (!a.detail.dataAttr) {
          Y(e, a.detail);
        }
      });
      const i = function (e, t, a) {
        let i;
        const r = e.parentNode;
        if (r) {
          a = s(e, r, a);
          i = X(e, "lazybeforesizes", { width: a, dataAttr: !!t });
          if (!i.defaultPrevented) {
            a = i.detail.width;
            if (a && a !== e._lazysizesWidth) {
              n(e, r, i, a);
            }
          }
        }
      };
      const e = function () {
        let e;
        const t = a.length;
        if (t) {
          e = 0;
          for (; e < t; e++) {
            i(a[e]);
          }
        }
      };
      const t = ie(e);
      return {
        _() {
          a = D.getElementsByClassName(H.autosizesClass);
          q("resize", t);
        },
        checkElems: t,
        updateElem: i,
      };
    })();
    var t = function () {
      if (!t.i && D.getElementsByClassName) {
        t.i = true;
        re._();
        e._();
      }
    };
    return (
      I(() => {
        H.init && t();
      }),
      (k = {
        cfg: H,
        autoSizer: re,
        loader: e,
        init: t,
        uP: Y,
        aC: K,
        rC: Q,
        hC: J,
        fire: X,
        gW: s,
        rAF: ee,
      })
    );
  })(e, e.document, Date);
  (e.lazySizes = t),
    typeof module === "object" && module.exports && (module.exports = t);
})(typeof window !== "undefined" ? window : {});
