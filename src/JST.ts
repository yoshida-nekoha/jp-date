import { AbstractDate } from './AbstractDate'
import { BASIC_PATTERNS, ReplaceConfig } from './fnc-define'

const days = '日月日水木金土'.split('')
const TIMEZONE = 'JST'
const JP_PATTERNS: ReplaceConfig[] = [
    ...BASIC_PATTERNS,
    { pattern: 'EEE', fnc: (d: Date): string => `${days[d.getDay()]}曜日` },
    { pattern: 'EE', fnc: (d: Date): string => `${days[d.getDay()]}曜` },
    { pattern: 'E', fnc: (d: Date): string => `${days[d.getDay()]}` },
    { pattern: 'A', fnc: (d: Date) => d.getHours() < 12 ? `午前` : `午後` },
]

export class JST extends AbstractDate {
    constructor(date: string | Date = new Date()) {
        super(date, 9) // +9:00
    }

    getTimezone = () => TIMEZONE
    getTimezonePatterns = () => JP_PATTERNS
}