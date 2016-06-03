(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("prisma", [], factory);
	else if(typeof exports === 'object')
		exports["prisma"] = factory();
	else
		root["prisma"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar MATH_ROUND = Math.round;\nvar MATH_MAX = Math.max;\nvar MATH_MIN = Math.min;\nvar OBJECT_FREEZE = Object.freeze;\n\nvar DEFAULT_HEX_CODE_VALUE = '000000';\nvar L_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;\n\n/**\n * convenience function to round fraction to two digits\n *\n * @param {number} number\n * @returns {number}\n */\nvar roundToTwoDigits = function roundToTwoDigits(number) {\n  return MATH_ROUND(number * 100) / 100;\n};\n\n/**\n * based on array of hsl / hsla values,\n * return built string of comma-separated hsl CSS values\n *\n * @param {Array} hsla\n * @returns {string}\n */\nvar getHslaString = function getHslaString(hsla) {\n  return hsla.reduce(function (hslaValueString, hslaPart, index) {\n    var isHue = index === 0;\n    var isAlpha = index === 3;\n\n    if (isHue) {\n      return hslaValueString + hslaPart;\n    }\n\n    if (isAlpha) {\n      return hslaValueString + ', ' + hslaPart;\n    }\n\n    return hslaValueString + ', ' + MATH_ROUND(hslaPart * 100) + '%';\n  }, '');\n};\n\n/**\n * determine whether the foreground color for the text\n * used with the color as a background color should\n * be dark (preferrably black), based on relative\n * luminance definitions in the spec:\n *\n * https://www.w3.org/TR/WCAG20/#relativeluminancedef\n *\n * @param {Array} rgb\n * @returns {boolean}\n */\nvar shouldForegroundBeDark = function shouldForegroundBeDark(rgb) {\n  var L = rgb.reduce(function (currentL, color, colorIndex) {\n    var updatedColor = color / 255;\n\n    if (updatedColor <= 0.03928) {\n      updatedColor /= 12.92;\n    }\n\n    updatedColor = Math.pow((updatedColor + 0.055) / 1.055, 2.4);\n\n    switch (colorIndex) {\n      case 0:\n        return currentL + 0.2126 * updatedColor;\n\n      case 1:\n        return currentL + 0.7152 * updatedColor;\n\n      case 2:\n        return currentL + 0.0722 * updatedColor;\n    }\n  }, 0);\n\n  return L > L_THRESHOLD;\n};\n\n/**\n * converts string to integer hash value\n *\n * @param {string} string\n * @returns {number}\n */\nvar hashCode = function hashCode(string) {\n  var hash = 0,\n      index = string.length;\n\n  for (; index--;) {\n    hash = string.charCodeAt(index) + ((hash << 5) - hash);\n  }\n\n  return hash;\n};\n\n/**\n * convert integer value to hex code\n *\n * @param {number} integer\n * @returns {string}\n */\nvar integerToHex = function integerToHex(integer) {\n  var hex = (integer >> 24 & 0xFF).toString(16) + (integer >> 16 & 0XFF).toString(16) + (integer >> 8 & 0xFF).toString(16) + (integer & 0xFF).toString(16);\n\n  if (!hex) {\n    return DEFAULT_HEX_CODE_VALUE;\n  }\n\n  if (hex.length < 6) {\n    var hexCharArray = [];\n\n    for (var index = 0; index < 6; index++) {\n      hexCharArray.push(hex[index] || '0');\n    }\n\n    return hexCharArray.join('');\n  }\n\n  return hex.substring(0, 6);\n};\n\n/**\n * based on string passed, return hex code generated\n * from hashed value\n *\n * @param {string} string\n * @returns {string}\n */\nvar stringToHex = function stringToHex(string) {\n  if (!string) {\n    return DEFAULT_HEX_CODE_VALUE;\n  }\n\n  var hash = hashCode(string);\n\n  return integerToHex(hash).substring(0, 6);\n};\n\n/**\n * build RGB color from hashed string value\n *\n * @param {string} hex\n * @returns {Array<number>}\n */\nvar stringToRgb = function stringToRgb(hex) {\n  var red = parseInt(hex.substring(0, 2), 16);\n  var green = parseInt(hex.substring(2, 4), 16);\n  var blue = parseInt(hex.substring(4, 6), 16);\n\n  return [red, green, blue];\n};\n\n/**\n * based on rgb array, return hsl array value\n *\n * @param {number} red\n * @param {number} green\n * @param {number} blue\n * @returns {Array}\n */\nvar rgbToHsl = function rgbToHsl(_ref) {\n  var _ref2 = _slicedToArray(_ref, 3);\n\n  var red = _ref2[0];\n  var green = _ref2[1];\n  var blue = _ref2[2];\n\n  var fractionalRed = red / 255;\n  var fractionalGreen = green / 255;\n  var fractionalBlue = blue / 255;\n\n  var max = MATH_MAX(fractionalRed, fractionalGreen, fractionalBlue);\n  var min = MATH_MIN(fractionalRed, fractionalGreen, fractionalBlue);\n\n  var luminance = (max + min) / 2;\n\n  if (max === min) {\n    return [0, 0, luminance];\n  }\n\n  var delta = max - min;\n  var saturation = luminance < 0.5 ? delta / (max + min) : delta / (1 - (2 * luminance - 1));\n\n  var hue = void 0;\n\n  switch (max) {\n    case fractionalRed:\n      hue = (fractionalGreen - fractionalBlue) / (max - min);\n      break;\n\n    case fractionalGreen:\n      hue = 2 + (fractionalBlue - fractionalRed) / (max - min);\n      break;\n\n    case fractionalBlue:\n      hue = 4 + (fractionalRed - fractionalGreen) / (max - min);\n      break;\n  }\n\n  hue *= 60;\n\n  return [MATH_ROUND(hue), roundToTwoDigits(saturation), roundToTwoDigits(luminance)];\n};\n\n/**\n * return object with a variety of color options for the developer\n *\n * @param {string} value\n * @returns {object}\n */\nvar createPrisma = function createPrisma(value) {\n  var stringValue = '' + value;\n  var hexString = stringToHex(stringValue);\n\n  var rgbArray = stringToRgb(hexString);\n  var rgbaArray = rgbArray.concat([1]);\n  var hslArray = rgbToHsl(rgbArray);\n  var hslaArray = hslArray.concat([1]);\n\n  var hex = '#' + hexString;\n  var rgb = 'rgb(' + rgbArray.join(', ') + ')';\n  var rgba = 'rgba(' + rgbaArray.join(', ') + ')';\n  var hsl = 'hsl(' + getHslaString(hslArray) + ')';\n  var hsla = 'hsla(' + getHslaString(hslaArray) + ')';\n\n  var shouldTextBeDark = shouldForegroundBeDark(rgbArray);\n\n  var prisma = Object.create(null);\n\n  prisma.hex = hex;\n\n  prisma.rgb = rgb;\n  prisma.rgbArray = OBJECT_FREEZE(rgbArray);\n\n  prisma.rgba = rgba;\n  prisma.rgbaArray = OBJECT_FREEZE(rgbaArray);\n\n  prisma.hsl = hsl;\n  prisma.hslArray = OBJECT_FREEZE(hslArray);\n\n  prisma.hsla = hsla;\n  prisma.hslaArray = OBJECT_FREEZE(hslaArray);\n\n  prisma.shouldTextBeDark = shouldTextBeDark;\n\n  return OBJECT_FREEZE(prisma);\n};\n\nexports.default = createPrisma;\nmodule.exports = exports['default'];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNQVRIX1JPVU5EID0gTWF0aC5yb3VuZDtcbmNvbnN0IE1BVEhfTUFYID0gTWF0aC5tYXg7XG5jb25zdCBNQVRIX01JTiA9IE1hdGgubWluO1xuY29uc3QgT0JKRUNUX0ZSRUVaRSA9IE9iamVjdC5mcmVlemU7XG5cbmNvbnN0IERFRkFVTFRfSEVYX0NPREVfVkFMVUUgPSAnMDAwMDAwJztcbmNvbnN0IExfVEhSRVNIT0xEID0gTWF0aC5zcXJ0KDEuMDUgKiAwLjA1KSAtIDAuMDU7XG5cbi8qKlxuICogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gcm91bmQgZnJhY3Rpb24gdG8gdHdvIGRpZ2l0c1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmNvbnN0IHJvdW5kVG9Ud29EaWdpdHMgPSAobnVtYmVyKSA9PiB7XG4gIHJldHVybiBNQVRIX1JPVU5EKG51bWJlciAqIDEwMCkgLyAxMDA7XG59O1xuXG4vKipcbiAqIGJhc2VkIG9uIGFycmF5IG9mIGhzbCAvIGhzbGEgdmFsdWVzLFxuICogcmV0dXJuIGJ1aWx0IHN0cmluZyBvZiBjb21tYS1zZXBhcmF0ZWQgaHNsIENTUyB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBoc2xhXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBnZXRIc2xhU3RyaW5nID0gKGhzbGEpID0+IHtcbiAgcmV0dXJuIGhzbGEucmVkdWNlKChoc2xhVmFsdWVTdHJpbmcsIGhzbGFQYXJ0LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGlzSHVlID0gaW5kZXggPT09IDA7XG4gICAgY29uc3QgaXNBbHBoYSA9IGluZGV4ID09PSAzO1xuXG4gICAgaWYgKGlzSHVlKSB7XG4gICAgICByZXR1cm4gaHNsYVZhbHVlU3RyaW5nICsgaHNsYVBhcnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzQWxwaGEpIHtcbiAgICAgIHJldHVybiBgJHtoc2xhVmFsdWVTdHJpbmd9LCAke2hzbGFQYXJ0fWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2hzbGFWYWx1ZVN0cmluZ30sICR7TUFUSF9ST1VORChoc2xhUGFydCAqIDEwMCl9JWA7XG4gIH0sICcnKTtcbn07XG5cbi8qKlxuICogZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZvcmVncm91bmQgY29sb3IgZm9yIHRoZSB0ZXh0XG4gKiB1c2VkIHdpdGggdGhlIGNvbG9yIGFzIGEgYmFja2dyb3VuZCBjb2xvciBzaG91bGRcbiAqIGJlIGRhcmsgKHByZWZlcnJhYmx5IGJsYWNrKSwgYmFzZWQgb24gcmVsYXRpdmVcbiAqIGx1bWluYW5jZSBkZWZpbml0aW9ucyBpbiB0aGUgc3BlYzpcbiAqXG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHJnYlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IHNob3VsZEZvcmVncm91bmRCZURhcmsgPSAocmdiKSA9PiB7XG4gIGNvbnN0IEwgPSByZ2IucmVkdWNlKChjdXJyZW50TCwgY29sb3IsIGNvbG9ySW5kZXgpID0+IHtcbiAgICBsZXQgdXBkYXRlZENvbG9yID0gY29sb3IgLyAyNTU7XG5cbiAgICBpZiAodXBkYXRlZENvbG9yIDw9IDAuMDM5MjgpIHtcbiAgICAgIHVwZGF0ZWRDb2xvciAvPSAxMi45MjtcbiAgICB9XG5cbiAgICB1cGRhdGVkQ29sb3IgPSAoKHVwZGF0ZWRDb2xvciArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQ7XG5cbiAgICBzd2l0Y2ggKGNvbG9ySW5kZXgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMICsgKDAuMjEyNiAqIHVwZGF0ZWRDb2xvcik7XG5cbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMICsgKDAuNzE1MiAqIHVwZGF0ZWRDb2xvcik7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMICsgKDAuMDcyMiAqIHVwZGF0ZWRDb2xvcik7XG4gICAgfVxuICB9LCAwKTtcblxuICByZXR1cm4gTCA+IExfVEhSRVNIT0xEO1xufTtcblxuLyoqXG4gKiBjb252ZXJ0cyBzdHJpbmcgdG8gaW50ZWdlciBoYXNoIHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuY29uc3QgaGFzaENvZGUgPSAoc3RyaW5nKSA9PiB7XG4gIGxldCBoYXNoID0gMCxcbiAgICAgIGluZGV4ID0gc3RyaW5nLmxlbmd0aDtcblxuICBmb3IgKDsgaW5kZXgtLTspIHtcbiAgICBoYXNoID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpICsgKChoYXNoIDw8IDUpIC0gaGFzaCk7XG4gIH1cblxuICByZXR1cm4gaGFzaDtcbn07XG5cbi8qKlxuICogY29udmVydCBpbnRlZ2VyIHZhbHVlIHRvIGhleCBjb2RlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGludGVnZXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGludGVnZXJUb0hleCA9IChpbnRlZ2VyKSA9PiB7XG4gIGxldCBoZXggPSAoKGludGVnZXIgPj4gMjQpJjB4RkYpLnRvU3RyaW5nKDE2KSArICgoaW50ZWdlciA+PiAxNikmMFhGRikudG9TdHJpbmcoMTYpICtcbiAgICAgICgoaW50ZWdlciA+PiA4KSYweEZGKS50b1N0cmluZygxNikgKyAoaW50ZWdlciYweEZGKS50b1N0cmluZygxNik7XG5cbiAgaWYgKCFoZXgpIHtcbiAgICByZXR1cm4gREVGQVVMVF9IRVhfQ09ERV9WQUxVRTtcbiAgfVxuXG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGxldCBoZXhDaGFyQXJyYXkgPSBbXTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA2OyBpbmRleCsrKSB7XG4gICAgICBoZXhDaGFyQXJyYXkucHVzaChoZXhbaW5kZXhdIHx8ICcwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhleENoYXJBcnJheS5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBoZXguc3Vic3RyaW5nKDAsIDYpO1xufTtcblxuLyoqXG4gKiBiYXNlZCBvbiBzdHJpbmcgcGFzc2VkLCByZXR1cm4gaGV4IGNvZGUgZ2VuZXJhdGVkXG4gKiBmcm9tIGhhc2hlZCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0cmluZ1RvSGV4ID0gKHN0cmluZykgPT4ge1xuICBpZiAoIXN0cmluZykge1xuICAgIHJldHVybiBERUZBVUxUX0hFWF9DT0RFX1ZBTFVFO1xuICB9XG5cbiAgY29uc3QgaGFzaCA9IGhhc2hDb2RlKHN0cmluZyk7XG5cbiAgcmV0dXJuIGludGVnZXJUb0hleChoYXNoKS5zdWJzdHJpbmcoMCwgNik7XG59O1xuXG4vKipcbiAqIGJ1aWxkIFJHQiBjb2xvciBmcm9tIGhhc2hlZCBzdHJpbmcgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaGV4XG4gKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn1cbiAqL1xuY29uc3Qgc3RyaW5nVG9SZ2IgPSAoaGV4KSA9PiB7XG4gIGNvbnN0IHJlZCA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgY29uc3QgZ3JlZW4gPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNik7XG4gIGNvbnN0IGJsdWUgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNik7XG5cbiAgcmV0dXJuIFtyZWQsIGdyZWVuLCBibHVlXTtcbn07XG5cbi8qKlxuICogYmFzZWQgb24gcmdiIGFycmF5LCByZXR1cm4gaHNsIGFycmF5IHZhbHVlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHJlZFxuICogQHBhcmFtIHtudW1iZXJ9IGdyZWVuXG4gKiBAcGFyYW0ge251bWJlcn0gYmx1ZVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5jb25zdCByZ2JUb0hzbCA9IChbcmVkLCBncmVlbiwgYmx1ZV0pID0+IHtcbiAgY29uc3QgZnJhY3Rpb25hbFJlZCA9IHJlZCAvIDI1NTtcbiAgY29uc3QgZnJhY3Rpb25hbEdyZWVuID0gZ3JlZW4gLyAyNTU7XG4gIGNvbnN0IGZyYWN0aW9uYWxCbHVlID0gYmx1ZSAvIDI1NTtcblxuICBjb25zdCBtYXggPSBNQVRIX01BWChmcmFjdGlvbmFsUmVkLCBmcmFjdGlvbmFsR3JlZW4sIGZyYWN0aW9uYWxCbHVlKTtcbiAgY29uc3QgbWluID0gTUFUSF9NSU4oZnJhY3Rpb25hbFJlZCwgZnJhY3Rpb25hbEdyZWVuLCBmcmFjdGlvbmFsQmx1ZSk7XG5cbiAgY29uc3QgbHVtaW5hbmNlID0gKG1heCArIG1pbikgLyAyO1xuXG4gIGlmIChtYXggPT09IG1pbikge1xuICAgIHJldHVybiBbMCwgMCwgbHVtaW5hbmNlXTtcbiAgfVxuXG4gIGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuICBjb25zdCBzYXR1cmF0aW9uID0gbHVtaW5hbmNlIDwgMC41ID8gZGVsdGEgLyAobWF4ICsgbWluKSA6IGRlbHRhIC8gKDEgLSAoKDIgKiBsdW1pbmFuY2UpIC0gMSkpO1xuXG4gIGxldCBodWU7XG5cbiAgc3dpdGNoIChtYXgpIHtcbiAgICBjYXNlIGZyYWN0aW9uYWxSZWQ6XG4gICAgICBodWUgPSAoZnJhY3Rpb25hbEdyZWVuIC0gZnJhY3Rpb25hbEJsdWUpIC8gKG1heCAtIG1pbik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgZnJhY3Rpb25hbEdyZWVuOlxuICAgICAgaHVlID0gMiArIChmcmFjdGlvbmFsQmx1ZSAtIGZyYWN0aW9uYWxSZWQpIC8gKG1heCAtIG1pbik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgZnJhY3Rpb25hbEJsdWU6XG4gICAgICBodWUgPSA0ICsgKGZyYWN0aW9uYWxSZWQgLSBmcmFjdGlvbmFsR3JlZW4pIC8gKG1heCAtIG1pbik7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGh1ZSAqPSA2MDtcblxuICByZXR1cm4gW01BVEhfUk9VTkQoaHVlKSwgcm91bmRUb1R3b0RpZ2l0cyhzYXR1cmF0aW9uKSwgcm91bmRUb1R3b0RpZ2l0cyhsdW1pbmFuY2UpXTtcbn07XG5cbi8qKlxuICogcmV0dXJuIG9iamVjdCB3aXRoIGEgdmFyaWV0eSBvZiBjb2xvciBvcHRpb25zIGZvciB0aGUgZGV2ZWxvcGVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVQcmlzbWEgPSAodmFsdWUpID0+IHtcbiAgY29uc3Qgc3RyaW5nVmFsdWUgPSBgJHt2YWx1ZX1gO1xuICBjb25zdCBoZXhTdHJpbmcgPSBzdHJpbmdUb0hleChzdHJpbmdWYWx1ZSk7XG5cbiAgY29uc3QgcmdiQXJyYXkgPSBzdHJpbmdUb1JnYihoZXhTdHJpbmcpO1xuICBjb25zdCByZ2JhQXJyYXkgPSByZ2JBcnJheS5jb25jYXQoWzFdKTtcbiAgY29uc3QgaHNsQXJyYXkgPSByZ2JUb0hzbChyZ2JBcnJheSk7XG4gIGNvbnN0IGhzbGFBcnJheSA9IGhzbEFycmF5LmNvbmNhdChbMV0pO1xuXG4gIGNvbnN0IGhleCA9IGAjJHtoZXhTdHJpbmd9YDtcbiAgY29uc3QgcmdiID0gYHJnYigke3JnYkFycmF5LmpvaW4oJywgJyl9KWA7XG4gIGNvbnN0IHJnYmEgPSBgcmdiYSgke3JnYmFBcnJheS5qb2luKCcsICcpfSlgO1xuICBjb25zdCBoc2wgPSBgaHNsKCR7Z2V0SHNsYVN0cmluZyhoc2xBcnJheSl9KWA7XG4gIGNvbnN0IGhzbGEgPSBgaHNsYSgke2dldEhzbGFTdHJpbmcoaHNsYUFycmF5KX0pYDtcblxuICBjb25zdCBzaG91bGRUZXh0QmVEYXJrID0gc2hvdWxkRm9yZWdyb3VuZEJlRGFyayhyZ2JBcnJheSk7XG5cbiAgbGV0IHByaXNtYSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgcHJpc21hLmhleCA9IGhleDtcblxuICBwcmlzbWEucmdiID0gcmdiO1xuICBwcmlzbWEucmdiQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKHJnYkFycmF5KTtcblxuICBwcmlzbWEucmdiYSA9IHJnYmE7XG4gIHByaXNtYS5yZ2JhQXJyYXkgPSBPQkpFQ1RfRlJFRVpFKHJnYmFBcnJheSk7XG5cbiAgcHJpc21hLmhzbCA9IGhzbDtcbiAgcHJpc21hLmhzbEFycmF5ID0gT0JKRUNUX0ZSRUVaRShoc2xBcnJheSk7XG5cbiAgcHJpc21hLmhzbGEgPSBoc2xhO1xuICBwcmlzbWEuaHNsYUFycmF5ID0gT0JKRUNUX0ZSRUVaRShoc2xhQXJyYXkpO1xuXG4gIHByaXNtYS5zaG91bGRUZXh0QmVEYXJrID0gc2hvdWxkVGV4dEJlRGFyaztcblxuICByZXR1cm4gT0JKRUNUX0ZSRUVaRShwcmlzbWEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUHJpc21hO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2luZGV4LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ])
});
;