/*!
 * modified Simple lightbox effect in pure JS
 * @see {@link https://github.com/squeral/lightbox}
 * @see {@link https://github.com/squeral/lightbox/blob/master/lightbox.js}
 * @params {Object} elem Node element
 * @params {Object} [rate] debounce rate, default 500ms
 * new IframeLightbox(elem)
 * passes jshint
 */
(function (root, document) {
  const addEventListener = "addEventListener";
  const getElementById = "getElementById";
  const getElementsByClassName = "getElementsByClassName";
  const createElement = "createElement";
  const classList = "classList";
  const appendChild = "appendChild";
  const dataset = "dataset";
  const containerClass = "iframe-lightbox";
  const isLoadedClass = "is-loaded";
  const isOpenedClass = "is-opened";
  const isShowingClass = "is-showing";
  const IframeLightbox = function (elem, settings) {
    const options = settings || {};
    this.trigger = elem;
    this.rate = options.rate || 500;
    this.el = document[getElementsByClassName](containerClass)[0] || "";
    this.body = this.el ? this.el[getElementsByClassName]("body")[0] : "";
    this.content = this.el ? this.el[getElementsByClassName]("content")[0] : "";
    this.href = elem[dataset].src || "";
    this.paddingBottom = elem[dataset].paddingBottom || "";
    // Event handlers
    this.onOpened = options.onOpened;
    this.onIframeLoaded = options.onIframeLoaded;
    this.onLoaded = options.onLoaded;
    this.onCreated = options.onCreated;
    this.onClosed = options.onClosed;
    this.init();
  };
  IframeLightbox.prototype.init = function () {
    const _this = this;
    if (!this.el) {
      this.create();
    }
    const debounce = function (func, wait) {
      let timeout;
      let args;
      let context;
      let timestamp;
      return function () {
        context = this;
        args = [].slice.call(arguments, 0);
        timestamp = new Date();
        var later = function () {
          const last = new Date() - timestamp;
          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            func.apply(context, args);
          }
        };
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
      };
    };
    const handleOpenIframeLightbox = function (e) {
      e.preventDefault();
      _this.open();
    };
    const debounceHandleOpenIframeLightbox = debounce(
      handleOpenIframeLightbox,
      this.rate
    );
    this.trigger[addEventListener]("click", debounceHandleOpenIframeLightbox);
  };
  IframeLightbox.prototype.create = function () {
    const _this = this;
    const bd = document[createElement]("div");
    this.el = document[createElement]("div");
    this.content = document[createElement]("div");
    this.body = document[createElement]("div");
    this.el[classList].add(containerClass);
    bd[classList].add("backdrop");
    this.content[classList].add("content");
    this.body[classList].add("body");
    this.el[appendChild](bd);
    this.content[appendChild](this.body);
    this.contentHolder = document[createElement]("div");
    this.contentHolder[classList].add("content-holder");
    this.contentHolder[appendChild](this.content);
    this.el[appendChild](this.contentHolder);
    document.body[appendChild](this.el);
    bd[addEventListener]("click", () => {
      _this.close();
    });
    const clearBody = function () {
      if (_this.isOpen()) {
        return;
      }
      _this.el[classList].remove(isShowingClass);
      _this.body.innerHTML = "";
    };
    this.el[addEventListener]("transitionend", clearBody, false);
    this.el[addEventListener]("webkitTransitionEnd", clearBody, false);
    this.el[addEventListener]("mozTransitionEnd", clearBody, false);
    this.el[addEventListener]("msTransitionEnd", clearBody, false);
    this.callCallback(this.onCreated, this);
  };
  IframeLightbox.prototype.loadIframe = function () {
    const _this = this;
    this.iframeId = containerClass + Date.now();
    this.body.innerHTML = `<iframe src="${this.href}" name="${this.iframeId}" id="${this.iframeId}" onload="this.style.opacity=1;" style="opacity:0;border:none;" scrolling="no" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" height="166" frameborder="no" allow="autoplay"></iframe>`;
    (function (iframeId, body) {
      document[getElementById](iframeId).onload = function () {
        this.style.opacity = 1;
        body[classList].add(isLoadedClass);
        _this.callCallback(_this.onIframeLoaded, _this);
        _this.callCallback(_this.onLoaded, _this);
      };
    })(this.iframeId, this.body);
  };
  IframeLightbox.prototype.open = function () {
    this.loadIframe();
    if (this.paddingBottom) {
      this.content.style.paddingBottom = this.paddingBottom;
    } else {
      this.content.removeAttribute("style");
    }
    this.el[classList].add(isShowingClass);
    this.el[classList].add(isOpenedClass);
    this.callCallback(this.onOpened, this);
  };
  IframeLightbox.prototype.close = function () {
    this.el[classList].remove(isOpenedClass);
    this.body[classList].remove(isLoadedClass);
    this.callCallback(this.onClosed, this);
  };
  IframeLightbox.prototype.isOpen = function () {
    return this.el[classList].contains(isOpenedClass);
  };
  IframeLightbox.prototype.callCallback = function (func, data) {
    if (typeof func !== "function") {
      return;
    }
    const caller = func.bind(this);
    caller(data);
  };
  root.IframeLightbox = IframeLightbox;
})(typeof window !== "undefined" ? window : this, document);
