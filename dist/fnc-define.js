"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatterns = exports.BASIC_PATTERNS = exports.eee = exports.ee = exports.e = exports.a = exports.sss = exports.ss = exports.s = exports.SS = exports.S = exports.MM = exports.M = exports.hh = exports.h = exports.HH = exports.H = exports.mm = exports.m = exports.dd = exports.d = exports.yyyy = void 0;
const yyyy = (d) => `${d.getFullYear()}`;
exports.yyyy = yyyy;
const d = (d) => `${d.getDate()}`;
exports.d = d;
const dd = (date) => (0, exports.d)(date).padStart(2, '0');
exports.dd = dd;
const m = (d) => `${d.getMonth() + 1}`;
exports.m = m;
const mm = (d) => (0, exports.m)(d).padStart(2, '0');
exports.mm = mm;
const H = (d) => `${d.getHours()}`;
exports.H = H;
const HH = (d) => (0, exports.H)(d).padStart(2, '0');
exports.HH = HH;
const h = (d) => d.getHours() >= 12 ? `${d.getHours() - 12}` : `${d.getHours()}`;
exports.h = h;
const hh = (d) => (0, exports.h)(d).padStart(2, '0');
exports.hh = hh;
const M = (d) => `${d.getMinutes()}`;
exports.M = M;
const MM = (d) => (0, exports.M)(d).padStart(2, '0');
exports.MM = MM;
const S = (d) => `${d.getSeconds()}`;
exports.S = S;
const SS = (d) => (0, exports.S)(d).padStart(2, '0');
exports.SS = SS;
const s = (d) => (0, exports.sss)(d).substring(0, 1);
exports.s = s;
const ss = (d) => (0, exports.sss)(d).substring(0, 2);
exports.ss = ss;
const sss = (d) => `${d.getMilliseconds()}`.padEnd(3, '0');
exports.sss = sss;
const a = (d) => d.getHours() < 12 ? `AM` : `PM`;
exports.a = a;
const dayA = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const e = (d) => `${dayA[d.getDay()]}`;
exports.e = e;
const dayAA = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ee = (d) => `${dayAA[d.getDay()]}`;
exports.ee = ee;
const dayAAA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const eee = (d) => `${dayAAA[d.getDay()]}`;
exports.eee = eee;
exports.BASIC_PATTERNS = [
    { pattern: 'yyyy', fnc: exports.yyyy },
    { pattern: 'sss', fnc: exports.sss },
    { pattern: 'eee', fnc: exports.eee },
    { pattern: 'mm', fnc: exports.mm },
    { pattern: 'dd', fnc: exports.dd },
    { pattern: 'HH', fnc: exports.HH },
    { pattern: 'hh', fnc: exports.hh },
    { pattern: 'MM', fnc: exports.MM },
    { pattern: 'SS', fnc: exports.SS },
    { pattern: 'ss', fnc: exports.ss },
    { pattern: 'ee', fnc: exports.ee },
    { pattern: 'm', fnc: exports.m },
    { pattern: 'd', fnc: exports.d },
    { pattern: 'H', fnc: exports.H },
    { pattern: 'h', fnc: exports.h },
    { pattern: 'M', fnc: exports.M },
    { pattern: 'S', fnc: exports.S },
    { pattern: 's', fnc: exports.s },
    { pattern: 'e', fnc: exports.e },
    { pattern: 'a', fnc: exports.a },
];
/**
 * パターンをキャッシュして、繰り返しのパフォーマンスアップを図る
 * eeeとaとか、Saturdayから再変換しないような仕組みを考える
 */
const patternCache = {};
const getPatterns = (allPatterns, timezone, pattern) => {
    const key = `${timezone}-${pattern}`;
    const cache = patternCache[key];
    if (cache)
        return cache;
    const myPattern = [];
    allPatterns.forEach((p, idx) => {
        p.newKey = p.newKey || `_@${idx}@_`;
        p.regex = p.regex || new RegExp(p.pattern, 'g');
        p.remapRegex = p.remapRegex || new RegExp(p.newKey, 'g');
        // aaとa、変換後のSaturdayが引っかからないようにユニークなテンプレートに変換
        if (p.regex?.test(pattern)) {
            pattern = pattern.replace(p.regex, p.newKey);
            myPattern.push(p);
        }
    });
    patternCache[key] = { template: pattern, patterns: myPattern };
    return patternCache[key];
};
exports.getPatterns = getPatterns;
//# sourceMappingURL=fnc-define.js.map