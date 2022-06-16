import { yyyy, d, dd, M, m, MM, mm, H, h, hh, HH, S, ss, s, sss, SS, e, ee, eee, a, BASIC_PATTERNS, getPatterns, ReplaceConfig } from '../src/fnc-define'


describe('define 単体テスト', () => {
    const patterns: ReplaceConfig[] = [
        { pattern: 'test1', fnc: () => `TEST1` },
        { pattern: 'test2', fnc: () => `TEST2` },
        ...BASIC_PATTERNS,
    ]
    const newPatterns = getPatterns(patterns, 'JST', 'test1test2')

    it('正しくパターン認識されていること', () => {
        expect(newPatterns.template).toBe('_@0@__@1@_')
        expect(newPatterns.patterns.length).toBe(2)
    })
})

describe('単品変換', () => {
    const now = new Date('2022-01-01T08:07:02.123Z') // 日本時間は1月1日8時37分

    it('日(yyyy)', () => expect(yyyy(now)).toBe('2022'))
    it('日(d)', () => expect(d(now)).toBe('1'))
    it('日(dd)', () => expect(dd(now)).toBe('01'))
    it('月(m)', () => expect(m(now)).toBe('1'))
    it('月(mm)', () => expect(mm(now)).toBe('01'))
    it('時(H)', () => expect(H(now)).toBe('8'))
    it('時(HH)', () => expect(HH(now)).toBe('08'))
    it('分(M)', () => expect(M(now)).toBe('7'))
    it('分(MM)', () => expect(MM(now)).toBe('07'))
    it('秒(S)', () => expect(S(now)).toBe('2'))
    it('秒(SS)', () => expect(SS(now)).toBe('02'))
    it('ミリ秒(s)', () => expect(s(now)).toBe('1'))
    it('ミリ秒(ss)', () => expect(ss(now)).toBe('12'))
    it('ミリ秒(sss)', () => expect(sss(now)).toBe('123'))
    it('英語で曜日(e)', () => expect(e(now)).toBe('Sa'))
    it('英語で曜日(ee)', () => expect(ee(now)).toBe('Sat'))
    it('英語で曜日(eee)', () => expect(eee(now)).toBe('Saturday'))
    it('午前(a h/hh)', () => expect(a(now)).toBe('AM'))
})