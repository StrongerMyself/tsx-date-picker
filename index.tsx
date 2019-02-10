import moment from 'moment'

class DatePicker implements IDatePicker {
    date = moment()
}

interface IDatePicker {
    date: moment.Moment
}

export default DatePicker
export { IDatePicker }