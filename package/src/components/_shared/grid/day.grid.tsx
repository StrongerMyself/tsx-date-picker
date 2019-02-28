import * as React from 'react'
import moment from 'moment'
import { CheckDateFunc } from './grid'

interface Props {
    viewDate: moment.Moment
    disablePast: boolean
    disableFuture: boolean
    setDate: (date: moment.Moment) => void
    onCheckDate: CheckDateFunc
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
                <React.Fragment key={i}>
                    {this.renderWeek()}
                </React.Fragment>
            )
        }
        return outElem
    }

    renderWeek() {
        let outElem = []
        let { setDate, onCheckDate, viewDate } = this.props
        for (let i = 0; i < 7; i++) {
            let date = moment(this.renderDate)
            let className = 'dp-blockCell'
            let otherDay = date.month() !== viewDate.month()
            let checkDate = onCheckDate(className, date, 'days', otherDay)
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
    
    render() {
        return (
            <div className="dp-block__row">
                {this.renderMonth()}
            </div>
        )
    }
}

export default DayGrid