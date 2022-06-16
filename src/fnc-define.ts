export const yyyy = (d: Date) => `${d.getFullYear()}`

export const d = (d: Date) => `${d.getDate()}`
export const dd = (date: Date) => d(date).padStart(2, '0')

export const m = (d: Date) => `${d.getMonth() + 1}`
export const mm = (d: Date) => m(d).padStart(2, '0')

export const H = (d: Date) => `${d.getHours()}`
export const HH = (d: Date) => H(d).padStart(2, '0')

export const h = (d: Date) => d.getHours() >= 12 ? `${d.getHours() - 12}` : `${d.getHours()}`
export const hh = (d: Date) => h(d).padStart(2, '0')

export const M = (d: Date) => `${d.getMinutes()}`
export const MM = (d: Date) => M(d).padStart(2, '0')

export const S = (d: Date) => `${d.getSeconds()}`
export const SS = (d: Date) => S(d).padStart(2, '0')

export const s = (d: Date) => sss(d).substring(0, 1)
export const ss = (d: Date) => sss(d).substring(0, 2)
export const sss = (d: Date) => `${d.getMilliseconds()}`.padEnd(3, '0')

export const a = (d: Date) => d.getHours() < 12 ? `AM` : `PM`

const dayA = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const e = (d: Date) => `${dayA[d.getDay()]}`

const dayAA = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const ee = (d: Date) => `${dayAA[d.getDay()]}`

const dayAAA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const eee = (d: Date) => `${dayAAA[d.getDay()]}`

// 基本のパターン(UTC,JST共通)
export interface ReplaceConfig { pattern: string, fnc: (date: Date) => string, regex?: RegExp, remapRegex?: RegExp, newKey?: string }
export const BASIC_PATTERNS: ReplaceConfig[] = [
    { pattern: 'yyyy', fnc: yyyy },
    { pattern: 'sss', fnc: sss },
    { pattern: 'eee', fnc: eee },
    { pattern: 'mm', fnc: mm },
    { pattern: 'dd', fnc: dd },
    { pattern: 'HH', fnc: HH },
    { pattern: 'hh', fnc: hh },
    { pattern: 'MM', fnc: MM },
    { pattern: 'SS', fnc: SS },
    { pattern: 'ss', fnc: ss },
    { pattern: 'ee', fnc: ee },
    { pattern: 'm', fnc: m },
    { pattern: 'd', fnc: d },
    { pattern: 'H', fnc: H },
    { pattern: 'h', fnc: h },
    { pattern: 'M', fnc: M },
    { pattern: 'S', fnc: S },
    { pattern: 's', fnc: s },
    { pattern: 'e', fnc: e },
    { pattern: 'a', fnc: a },
]

/**
 * パターンをキャッシュして、繰り返しのパフォーマンスアップを図る
 * eeeとaとか、Saturdayから再変換しないような仕組みを考える
 */
const patternCache: { [key: string]: Template } = {}
interface Template { template: string, patterns: ReplaceConfig[] }
export const getPatterns = (allPatterns: ReplaceConfig[], timezone: string, pattern: string): Template => {
    const key = `${timezone}-${pattern}`
    const cache = patternCache[key]

    if (cache) return cache

    const myPattern: ReplaceConfig[] = []

    allPatterns.forEach((p, idx) => {
        p.newKey = p.newKey || `_@${idx}@_`
        p.regex = p.regex || new RegExp(p.pattern, 'g')
        p.remapRegex = p.remapRegex || new RegExp(p.newKey, 'g')

        // aaとa、変換後のSaturdayが引っかからないようにユニークなテンプレートに変換
        if (p.regex?.test(pattern)) {
            pattern = pattern.replace(p.regex, p.newKey)
            myPattern.push(p)
        }
    })

    patternCache[key] = { template: pattern, patterns: myPattern }

    return patternCache[key]

}
