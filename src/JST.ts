import { DateFormatter } from './AbstractDate'
import { BASIC_PATTERNS, ReplaceConfig } from './fnc-define'

const days = '日月日水木金土'.split('')
const OFFSET = 9
const TIMEZONE = 'JST'
const JP_PATTERNS: ReplaceConfig[] = [
    ...BASIC_PATTERNS,
    { pattern: 'EEE', fnc: (d: Date): string => `${days[d.getDay()]}曜日` },
    { pattern: 'EE', fnc: (d: Date): string => `${days[d.getDay()]}曜` },
    { pattern: 'E', fnc: (d: Date): string => `${days[d.getDay()]}` },
    { pattern: 'A', fnc: (d: Date) => d.getHours() < 12 ? `午前` : `午後` },
]

export const fromJst = (date: string | Date = new Date()): JST => {
    return new JST(date, 0)
}

export const fromUtc = (date: string | Date = new Date()): JST => {
    return new JST(date)
}

export class JST extends DateFormatter {
    constructor(date: string | Date = new Date(), offset = OFFSET) {
        super(date, offset)
    }

    getTimezone = () => TIMEZONE
    getTimezonePatterns = () => JP_PATTERNS
}