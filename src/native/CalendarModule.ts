import { NativeModules } from 'react-native'

type CalendarEvent = {
    id: string,
    name: string,
    location: string
}

interface ICalendarModule {
    // createCalendarEvent(name: string, location: string, callback: (callbackValue: string) => void): void
    createCalendarEvent: (name: string, location: string) => Promise<CalendarEvent>
    getConstants(): { [key: string]: any }
}

const { CalendarModule } = NativeModules

export default CalendarModule as ICalendarModule