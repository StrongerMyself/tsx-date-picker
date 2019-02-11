import * as React from 'react'
import moment from 'moment'
import { CheckDate } from './grid'

interface Props {
    date: moment.Moment
    viewDate: moment.Moment
    disablePast: boolean
    setDate: (date: moment.Moment) => void
    checkNow: (date: moment.Moment) => CheckDate
    checkPast: (date: moment.Moment) => boolean
    checkSelect: (date: moment.Moment) => CheckDate

}

class DayGrid extends React.Component<Props, {}> {

    renderDate: moment.Moment

    renderMonth() {
        let outElem = []
        let { date } = this.props
        let weekLen = date.daysInMonth() / 7 
        this.renderDate = moment(date)
            .startOf('month')
            .startOf('week')
        for (let i = 0; i <= weekLen; i++) {
            outElem.push(
                <div key={i} className="_row">
                    {this.renderWeek()}
                </div>
            )
        }
        return outElem
    }

    renderWeek() {
        let outElem = []
        let { setDate } = this.props
        for (let i = 0; i < 7; i++) {
            let date = moment(this.renderDate)
            let className = '_cell'
            let checkDate = this.checkDate(className, date)
            className = checkDate.className
            let onClick = checkDate.isClick ? null : () => setDate(date)
            outElem.push(
                <div 
                    key={i} 
                    className={className} 
                    onClick={onClick}
                >{date.date()}</div>
            )
            
            this.renderDate.add(1, 'day')
        }
        return outElem
    }

    checkDate = (className, date) => {
        let { disablePast, viewDate, checkNow, checkPast, checkSelect } = this.props

        let otherDay = date.month() !== viewDate.month()
        let nowState = checkNow(date).month
        let pastState = disablePast ? checkPast(date) : false
        let selectState = checkSelect(date).month
        
        if (otherDay) className += ' --otherDay'
        if (nowState) className += ' --now'
        if (pastState) className += ' --past'
        if (selectState) className += ' --select'

        let isClick = (otherDay || pastState)

        return { className, isClick }
    }

    render() {
        return (
            <>
                {this.renderMonth()}
            </>
        )
    }
}

export default DayGrid