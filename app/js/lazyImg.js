"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var images = document.querySelectorAll("img");
var options = {
  // If the image gets within 50px in the Y axis, start the download.
  root: null,
  // Page as root
  rootMargin: "50px 0px",
  threshold: 0.5
};

var fetchImage = function fetchImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
};

var loadImage = function loadImage(image) {
  var src = image.dataset.src;
  fetchImage(src).then(function () {
    image.src = src;
  });
};

var handleIntersection = function handleIntersection(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      loadImage(entry.target);
    }
  });
};

function imgLazy(imgs) {
  document.addEventListener("DOMContentLoaded", function () {
    _toConsumableArray(imgs).forEach(function (itemImg) {
      itemImg.setAttribute("src", itemImg.getAttribute("data-src"));
    });
  });
}

if (!("IntersectionObserver" in window)) {
  imgLazy(images);
} else {
  // The observer for the images on the page
  var observer = new IntersectionObserver(handleIntersection, options);
  images.forEach(function (img) {
    observer.observe(img);
  });
}