import { ReplaceConfig, getPatterns } from './fnc-define'

export abstract class DateFormatter {
    date: Date

    constructor(date: string | Date = new Date(), offset = 0) {
        const now: Date = ((date: string | Date): Date => {
            if (date instanceof Date) {
                return date
            }
            return new Date(date)
        })(date)

        this.date = new Date(now.getTime() + ((now.getTimezoneOffset() + (offset * 60)) * 60 * 1000))
    }

    abstract getTimezone: () => string
    abstract getTimezonePatterns: () => ReplaceConfig[]

    public format = (pattern: string): string => {
        const template = getPatterns(this.getTimezonePatterns(), this.getTimezone(), pattern)

        let result = template.template
        template.patterns.forEach(p => {
            result = result.replace(p.remapRegex!, () => p.fnc(this.date))
        })
        return result
    }
}