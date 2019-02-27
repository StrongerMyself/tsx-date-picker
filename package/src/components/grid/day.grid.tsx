import * as React from 'react'
import moment from 'moment'
import { CheckDate } from './grid'

interface Props {
    viewDate: moment.Moment
    disablePast: boolean
    disableFuture: boolean
    setDate: (date: moment.Moment) => void
    checkNow: (date: moment.Moment) => CheckDate
    checkPast: (date: moment.Moment) => boolean
    checkFuture: (date: moment.Moment) => boolean
    checkSelect: (date: moment.Moment) => CheckDate

}

class DayGrid extends React.Component<Props, {}> {

    renderDate: moment.Moment

    renderMonth() {
        let outElem = []
        let { viewDate } = this.props
        let weekLen = viewDate.daysInMonth() / 7 
        this.renderDate = moment(viewDate)
            .startOf('month')
            .startOf('week')
        for (let i = 0; i <= weekLen; i++) {
            outElem.push(
                <div key={i} className="dp-block__row">
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
            let className = 'dp-blockCell'
            let checkDate = this.checkDate(className, date)
            className = checkDate.className
            let onClick = checkDate.notClick ? null : () => setDate(date)
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
        let { disableFuture, disablePast, viewDate, checkNow, checkPast, checkFuture, checkSelect } = this.props

        let nowState = checkNow(date).day
        let selectState = checkSelect(date).day
        let otherDay = date.month() !== viewDate.month()
        let pastState = disablePast ? checkPast(date) : false
        let futureState = disableFuture ? checkFuture(date) : false
        
        let notClick = (otherDay || pastState || futureState)
        
        if (nowState) className += ' --now'
        if (selectState) className += ' --select'
        if (notClick) className += ' --hide'

        return { className, notClick }
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