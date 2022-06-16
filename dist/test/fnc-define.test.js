"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fnc_define_1 = require("../src/fnc-define");
describe('define 単体テスト', () => {
    const patterns = [
        { pattern: 'test1', fnc: () => `TEST1` },
        { pattern: 'test2', fnc: () => `TEST2` },
        ...fnc_define_1.BASIC_PATTERNS,
    ];
    const newPatterns = (0, fnc_define_1.getPatterns)(patterns, 'JST', 'test1test2');
    it('正しくパターン認識されていること', () => {
        expect(newPatterns.template).toBe('_@0@__@1@_');
        expect(newPatterns.patterns.length).toBe(2);
    });
});
describe('単品変換', () => {
    const now = new Date('2022-01-01T08:07:02.123Z'); // 日本時間は1月1日8時37分
    it('日(yyyy)', () => expect((0, fnc_define_1.yyyy)(now)).toBe('2022'));
    it('日(d)', () => expect((0, fnc_define_1.d)(now)).toBe('1'));
    it('日(dd)', () => expect((0, fnc_define_1.dd)(now)).toBe('01'));
    it('月(m)', () => expect((0, fnc_define_1.m)(now)).toBe('1'));
    it('月(mm)', () => expect((0, fnc_define_1.mm)(now)).toBe('01'));
    it('時(H)', () => expect((0, fnc_define_1.H)(now)).toBe('8'));
    it('時(HH)', () => expect((0, fnc_define_1.HH)(now)).toBe('08'));
    it('分(M)', () => expect((0, fnc_define_1.M)(now)).toBe('7'));
    it('分(MM)', () => expect((0, fnc_define_1.MM)(now)).toBe('07'));
    it('秒(S)', () => expect((0, fnc_define_1.S)(now)).toBe('2'));
    it('秒(SS)', () => expect((0, fnc_define_1.SS)(now)).toBe('02'));
    it('ミリ秒(s)', () => expect((0, fnc_define_1.s)(now)).toBe('1'));
    it('ミリ秒(ss)', () => expect((0, fnc_define_1.ss)(now)).toBe('12'));
    it('ミリ秒(sss)', () => expect((0, fnc_define_1.sss)(now)).toBe('123'));
    it('英語で曜日(e)', () => expect((0, fnc_define_1.e)(now)).toBe('Sa'));
    it('英語で曜日(ee)', () => expect((0, fnc_define_1.ee)(now)).toBe('Sat'));
    it('英語で曜日(eee)', () => expect((0, fnc_define_1.eee)(now)).toBe('Saturday'));
    it('午前(a h/hh)', () => expect((0, fnc_define_1.a)(now)).toBe('AM'));
});
//# sourceMappingURL=fnc-define.test.js.map