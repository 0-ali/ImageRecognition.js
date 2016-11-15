/*!
 * ImageRecognition.js 1.0 (https://github.com/xc0d3rz/ImageRecognition.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
(function () {
    var ImageRecognition = function (imageURL) {
        var api = this.api, encodeQueryData = this.encodeQueryData, extractContents = this.extractContents, tigger = this.onRecognized;
        if (typeof  imageURL == "string" && api.urlPattern.test(imageURL) == true) {
            api.parameters.image_url = imageURL;
            var beforeRequest = function () {
                return api.host + api.path + "?" + encodeQueryData(api.parameters);
            };
            this.request(
                beforeRequest(),
                api.method,
                function (a, b, c) {
                    var responseURL = b.responseURL;
                    if (/https:\/\/www.google.com\/search/.test(responseURL)) {
                        tigger(btoa(imageURL), extractContents(b.response));
                    }
                }
            );
        }
    };
    /**
     *
     * @param url
     * @param type
     * @param successHandler
     * @param errorHandler
     * @param isJson
     */
    ImageRecognition.prototype.request = function (url, type, successHandler, errorHandler, isJson) {
        var xhr = typeof XMLHttpRequest != 'undefined' ?
            new XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP'), parseResponseHeaders = this.parseResponseHeaders;
        xhr.open(type, url, true);
        xhr.onreadystatechange = function () {
            var status;
            var data;
            if (xhr.readyState == 4) { // `DONE`
                status = xhr.status;
                if (status < 400) {
                    data = (typeof isJson != "undefined" && isJson == true) ? JSON.parse(xhr.responseText) : xhr.responseType;
                    successHandler && successHandler(data, xhr, parseResponseHeaders(xhr.getAllResponseHeaders()));
                } else {
                    errorHandler && errorHandler(status);
                }
            }
        }
        xhr.send();
    };

    /**
     *
     * @param headerStr
     * @returns {{}}
     * @copyright https://gist.github.com/monsur/706839
     */
    ImageRecognition.prototype.parseResponseHeaders = function (headerStr) {
        var headers = {};
        if (!headerStr) {
            return headers;
        }
        var headerPairs = headerStr.split('\u000d\u000a');
        for (var i = 0; i < headerPairs.length; i++) {
            var headerPair = headerPairs[i];
            // Can't use split() here because it does the wrong thing
            // if the header value has the string ": " in it.
            var index = headerPair.indexOf('\u003a\u0020');
            if (index > 0) {
                var key = headerPair.substring(0, index);
                var val = headerPair.substring(index + 2);
                headers[key] = val;
            }
        }
        return headers;
    };
    /**
     *
     * @param data
     * @returns {string}
     * copyright http://stackoverflow.com/a/111545
     */
    ImageRecognition.prototype.encodeQueryData = function (data) {
        let ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    };
    ImageRecognition.prototype.api = {
        host: "https://images.google.com/",
        path: "searchbyimage",
        method: "get",
        parameters: {
            image_url: "",
            hl: navigator.language
        },
        urlPattern: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    };
    /**
     *
     * @param stringDom
     * @returns {*}
     */
    ImageRecognition.prototype.extractContents = function (stringDom) {
        var a = new DOMParser(), b = a.parseFromString(stringDom, "text/html");
        if (b.getElementsByClassName('_gUb')) {
            return b.getElementsByClassName('_gUb')[0].textContent
        } else {
            return false;
        }

    };
    /**
     *
     * @param res
     */
    ImageRecognition.prototype.onRecognized = function (i, res) {
        var a = new CustomEvent('recognized', {detail: {id: i, result: res}});
        console.log("recognized: ", res);
        window.dispatchEvent(a);
    };
    if (typeof define === "function" && define.amd) {
        define("ImageRecognition", [], function () {
            return ImageRecognition;
        });
    } else {
        (this.exports || this).ImageRecognition = ImageRecognition;
    }
}.call(window));
