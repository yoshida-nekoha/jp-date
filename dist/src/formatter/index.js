"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JST = void 0;
const JST = (date, formatString) => {
    return {
        d: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
        format: formatString,
    };
};
exports.JST = JST;
//# sourceMappingURL=index.js.map