"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatterns = exports.BASIC_PATTERNS = exports.eee = exports.ee = exports.e = exports.a = exports.HHMMSS = exports.HMS6 = exports.yyyymmdd = exports.ymd8 = exports.sss = exports.ss = exports.s = exports.SS = exports.S = exports.MM = exports.M = exports.hh = exports.h = exports.HH = exports.H = exports.mm = exports.m = exports.dd = exports.d = exports.yyyy = void 0;
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
const ymd8 = (d) => `${(0, exports.yyyy)(d)}${(0, exports.mm)(d)}${(0, exports.dd)(d)}`;
exports.ymd8 = ymd8;
const yyyymmdd = (d) => (0, exports.ymd8)(d);
exports.yyyymmdd = yyyymmdd;
const HMS6 = (d) => `${(0, exports.HH)(d)}${(0, exports.MM)(d)}${(0, exports.SS)(d)}`;
exports.HMS6 = HMS6;
const HHMMSS = (d) => (0, exports.HMS6)(d);
exports.HHMMSS = HHMMSS;
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
    { regexp: /yyyy/g, fnc: exports.yyyy },
    { regexp: /sss/g, fnc: exports.sss },
    { regexp: /eee/g, fnc: exports.eee },
    { regexp: /mm/g, fnc: exports.mm },
    { regexp: /dd/g, fnc: exports.dd },
    { regexp: /HH/g, fnc: exports.HH },
    { regexp: /hh/g, fnc: exports.hh },
    { regexp: /MM/g, fnc: exports.MM },
    { regexp: /SS/g, fnc: exports.SS },
    { regexp: /ss/g, fnc: exports.ss },
    { regexp: /ee/g, fnc: exports.ee },
    { regexp: /m/g, fnc: exports.m },
    { regexp: /d/g, fnc: exports.d },
    { regexp: /H/g, fnc: exports.H },
    { regexp: /h/g, fnc: exports.h },
    { regexp: /M/g, fnc: exports.M },
    { regexp: /S/g, fnc: exports.S },
    { regexp: /s/g, fnc: exports.s },
    { regexp: /e/g, fnc: exports.e },
    { regexp: /a/g, fnc: exports.a },
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
    allPatterns.forEach(p => {
        if (p.regexp.test(pattern)) {
            pattern = pattern.replace(p.regexp, ''); // aaとaなどの重複を回避
            myPattern.push(p);
        }
    });
    patternCache[key] = myPattern;
    return myPattern;
};
exports.getPatterns = getPatterns;
//# sourceMappingURL=_base.js.map