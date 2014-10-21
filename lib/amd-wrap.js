"use strict";

module.exports = function (commonJSModuleText, deps) {
    if (/^define\(function \(require/.test(commonJSModuleText)) {
        return commonJSModuleText;
    } else {
        var toString = Object.prototype.toString;
        var depsCode = []
        if ( toString.call(deps) == '[object String]' ) {
            depsCode.push('var ', deps, ' = require("', deps, '");\n');
        } else if ( toString.call(deps) == '[object Array]' ) {
            deps.forEach(function(d) {
                depsCode.push('var ', d, ' = require("', d, '");\n');
            })
        } else if ( toString.call(deps) == '[object Object]' ) {
            for(var k in deps) {
                depsCode.push('var ', k, ' = require("', deps[k], '");\n');
            }
        }
        return "define(function (require, exports, module) {\n" + depsCode.join('') + commonJSModuleText + "\n});\n";
    }
};
