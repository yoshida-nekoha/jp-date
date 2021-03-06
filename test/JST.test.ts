import { JST, fromJst, fromUtc } from '../src/JST'

describe('単品変換', () => {
    const now = new Date('2021-12-31T23:07:02.123Z') // 日本時間は1月1日8時37分
    const jst = fromUtc(now)

    const cases = [
        { it: 'JST日(yyyy)', format: 'yyyy', tobe: '2022' },
        { it: 'JST日(d)', format: 'd', tobe: '1' },
        { it: 'JST日(dd)', format: 'dd', tobe: '01' },
        { it: 'JST月(mm)', format: 'mm', tobe: '01' },
        { it: 'JST月(m)', format: 'm', tobe: '1' },
        { it: 'JST時(H)', format: 'H', tobe: '8' },
        { it: 'JST時(HH)', format: 'HH', tobe: '08' },
        { it: 'JST分(M)', format: 'M', tobe: '7' },
        { it: 'JST分(MM)', format: 'MM', tobe: '07' },
        { it: 'JST秒(S)', format: 'S', tobe: '2' },
        { it: 'JST秒(SS)', format: 'SS', tobe: '02' },
        { it: 'JSTミリ秒(s)', format: 's', tobe: '1' },
        { it: 'JSTミリ秒(ss)', format: 'ss', tobe: '12' },
        { it: 'JST英語で曜日(e)', format: 'e', tobe: 'Sa' },
        { it: 'JST英語で曜日(ee)', format: 'ee', tobe: 'Sat' },
        { it: 'JST英語で曜日(eee)', format: 'eee', tobe: 'Saturday' },

        { it: 'JSTミリ秒(sss)', format: 'sss', tobe: '123' },
        { it: 'JST日本語で曜日(E)', format: 'E', tobe: '土' },
        { it: 'JST日本語で曜日(EE)', format: 'EE', tobe: '土曜' },
        { it: 'JST日本語で曜日(EEE)', format: 'EEE', tobe: '土曜日' },
        { it: 'JST午前(a h/hh)', format: 'a h/hh', tobe: 'AM 8/08' },
        { it: 'JST午前(A h/hh)', format: 'A h/hh', tobe: '午前 8/08' },
    ]

    for (const c of cases) {
        it(c.it, () => expect(jst.format(c.format)).toBe(c.tobe))
    }
})

describe('現在時刻でテスト', () => {
    const now = new Date()
    const jst = fromUtc()
    it('9時間ずれてるはず', () => {
        expect(`${now.getHours() + 9}`).toBe(jst.format('H'))
    })
})

describe('AM/PM, 11時', () => {
    const now = new Date('2022-01-01T02:07:02.123Z') // 日本時間は1月1日11時37分
    const jst = fromUtc(now)
    it('JST午後(a h/hh)', () => expect(jst.format('a h/hh')).toBe('AM 11/11'))
    it('JST午後(A h/hh)', () => expect(jst.format('A h/hh')).toBe('午前 11/11'))
})

describe('AM/PM, 12時', () => {
    const now = new Date('2022-01-01T03:07:02.123Z') // 日本時間は1月1日12時37分
    const jst = fromUtc(now)
    it('JST午後(a h/hh)', () => expect(jst.format('a h/hh')).toBe('PM 0/00'))
    it('JST午後(A h/hh)', () => expect(jst.format('A h/hh')).toBe('午後 0/00'))
})

describe('AM/PM, 13時', () => {
    const now = new Date('2022-01-01T04:07:02.123Z') // 日本時間は1月1日13時37分
    const jst = fromUtc(now)
    it('JST午後(a h/hh)', () => expect(jst.format('a h/hh')).toBe('PM 1/01'))
    it('JST午後(A h/hh)', () => expect(jst.format('A h/hh')).toBe('午後 1/01'))
})

describe('定形', () => {
    const now = new Date('2021-12-31T23:07:02.123Z') // 日本時間は1月1日8時7分2秒
    const jst = fromUtc(now)

    it('JST(yyyymmdd)', () => expect(jst.format('yyyymmdd')).toBe('20220101'))
    it('JST(HHMMSS)', () => expect(jst.format('HHMMSS')).toBe('080702'))
})

describe('フォーマッタ', () => {
    const now = new Date('2021-12-31T23:07:02.123Z') // 日本時間は1月1日8時7分2秒
    const jst = fromUtc(now)

    it('JST(yyyymmdd)', () => expect(jst.format('yyyymmdd')).toBe('20220101'))
    it('JST(yyyy/mm/dd(E))', () => expect(jst.format('yyyy/mm/dd(E)')).toBe('2022/01/01(土)'))
    it('JST(yyyy/m/d)', () => expect(jst.format('yyyy/m/d')).toBe('2022/1/1'))
    it('JST(HH:MM:SS)', () => expect(jst.format('HH:MM:SS')).toBe('08:07:02'))
    it('JST(H:M:S)', () => expect(jst.format('H:M:S')).toBe('8:7:2'))
    it('JST(yyyy/mm/dd HH:MM:SS.sss)', () => expect(jst.format('yyyy/mm/dd HH:MM:SS.sss')).toBe('2022/01/01 08:07:02.123'))
})

describe('複合優先順位の確認', () => {
    const now = new Date('2021-07-31T23:07:02.123Z') // 日本時間は1月1日8時7分2秒
    const jst = fromUtc(now)

    it('複合優先順位の確認 順', () => {
        expect(jst.format('m/mm d/dd H/HH M/MM S/SS s/ss/sss E/EE/EEE')).toBe('8/08 1/01 8/08 7/07 2/02 1/12/123 日/日曜/日曜日')
    })
    it('複合優先順位の確認 逆順', () => {
        expect(jst.format('mm/m dd/d HH/H MM/M SS/S sss/ss/s EEE/EE/E')).toBe('08/8 01/1 08/8 07/7 02/2 123/12/1 日曜日/日曜/日')
    })

    it('複合優先順 混合', () => {
        expect(jst.format('EEE/E/EEE/EE')).toBe('日曜日/日/日曜日/日曜')
        expect(jst.format('EEEEEEEEEE')).toBe('日曜日日曜日日曜日日')
    })
})

describe('変換後のパターンにかぶるやつ', () => {
    const now = new Date('2022-01-01T02:07:02.123Z') // 日本時間は1月1日11時37分
    const jst = fromUtc(now)
    it('JST午後(a A h/hh)', () => expect(jst.format('a A h/hh')).toBe('AM 午前 11/11'))
    it('eee a ee', () => expect(jst.format('eee a ee')).toBe('Saturday AM Sat'))
})

describe('文字列でのインスタンス化', () => {
    const jst = fromUtc('2021-12-31T23:07:02.123Z')
    it('値チェック', () => expect(jst.format('yyyymmdd HHMMSS.sss E')).toBe('20220101 080702.123 土'))
})

describe('いろいろな日付のパース(JST)', () => {
    const jst = fromUtc('2022/6/15 23:24:25')

    const cases = [
        { from: '2022/6/15 23:24:25', pattern: 'yyyy/m/dd HH:MM:SS', expect: '2022/6/15 23:24:25' }
    ]

    for (const c of cases) {
        it(c.from, () => {
            expect(fromJst(c.from).format(c.pattern)).toBe(c.expect)
        })
    }
})