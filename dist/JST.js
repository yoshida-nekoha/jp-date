"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JST = void 0;
const AbstractDate_1 = require("./AbstractDate");
const fnc_define_1 = require("./fnc-define");
const days = '日月日水木金土'.split('');
const TIMEZONE = 'JST';
const JP_PATTERNS = [
    ...fnc_define_1.BASIC_PATTERNS,
    { pattern: 'EEE', fnc: (d) => `${days[d.getDay()]}曜日` },
    { pattern: 'EE', fnc: (d) => `${days[d.getDay()]}曜` },
    { pattern: 'E', fnc: (d) => `${days[d.getDay()]}` },
    { pattern: 'A', fnc: (d) => d.getHours() < 12 ? `午前` : `午後` },
];
class JST extends AbstractDate_1.AbstractDate {
    constructor(date = new Date()) {
        super(date, 9); // +9:00
        this.getTimezone = () => TIMEZONE;
        this.getTimezonePatterns = () => JP_PATTERNS;
    }
}
exports.JST = JST;
//# sourceMappingURL=JST.js.map