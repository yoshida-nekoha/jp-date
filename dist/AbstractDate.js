"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDate = void 0;
const fnc_define_1 = require("./fnc-define");
class AbstractDate {
    constructor(date = new Date(), offset = 0) {
        this.format = (pattern) => {
            const template = (0, fnc_define_1.getPatterns)(this.getTimezonePatterns(), this.getTimezone(), pattern);
            let result = template.template;
            template.patterns.forEach(p => {
                result = result.replace(p.remapRegex, () => p.fnc(this.date));
            });
            return result;
        };
        const now = ((date) => {
            if (date instanceof Date) {
                return date;
            }
            return new Date(date);
        })(date);
        this.date = new Date(now.getTime() + ((now.getTimezoneOffset() + (offset * 60)) * 60 * 1000));
    }
}
exports.AbstractDate = AbstractDate;
//# sourceMappingURL=AbstractDate.js.map