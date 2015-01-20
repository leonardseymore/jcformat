/**
 *  Copyright (c) 2015-2015 Leonard Seymore.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/*jshint regexp: false*/
(function(exports, undefined) {
    'use strict';

    function jcformat() {
        var str = arguments[0];
        var re = /%(\w\.?\d*)/g;
        var result = '';
        var previousMatch = 0;
        var previousMatchLength = 0;
        var replacements = 1;
        var match = null;
        while ((match = re.exec(str)) != null) {
            result += str.substring(previousMatch == 0 ? 0 : previousMatch + match[0].length, match.index);
            var formatOption = match[1];
            var arg = arguments[replacements++];
            var value = null;
            switch (formatOption) {
                case 'd':
                    value = parseInt(arg);
                break;
                case 's':
                    value = arg;
                break;
                default:
                    // TODO: check for formatOption.slice(0, 1) == '.', for decimal length support
                    //    e.g. %.3f must translate to parseFloat(arg).toFixed(3)
                    if (formatOption.slice(0, 1) == 'f') {
                        value = parseFloat(arg);
                    } else {
                        value = JSON.stringify(arg);
                    }
                break;
            }
            result += value;
            
            previousMatch = match.index;
            previousMatchLength = match[0].length;
        }
        if (previousMatch < str.length - previousMatchLength) {
            result += str.substr(previousMatch == 0 ? 0 : previousMatch + previousMatchLength, str.length);
        }
        result.replace(re, '');
        return result;
    }

    exports.jcformat = jcformat;
})(typeof exports !== 'undefined' ? jcformat : window);