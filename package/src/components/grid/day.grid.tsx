import * as React from 'react'
import moment from 'moment'
import { CheckDateFunc } from './grid'
import { IGridContext } from './context.grid'

interface Props extends IGridContext {
    disablePast: boolean
    disableFuture: boolean
    viewDate: moment.Moment
    setView: (date: moment.Moment) => void
    onCheckDate: CheckDateFunc
}

class DayGrid extends React.Component<Props, {}> {

    static defaultProps = {
        onClickDay: (date) => {},
        onRender: (ref) => {},
    }

    renderDate: moment.Moment
    refWrap: React.RefObject<HTMLDivElement> = React.createRef()

    componentDidMount() {
        this.props.onRender(this.refWrap, this.props.setView)
    }

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
        let { onClickDay, onCheckDate, viewDate } = this.props
        for (let i = 0; i < 7; i++) {
            let date = moment(this.renderDate)
            let className = 'dp-blockCell'
            let otherDay = date.month() !== viewDate.month()
            let checkDate = onCheckDate(className, date, 'days', otherDay)
            className = checkDate.className
            let onClick = checkDate.notClick ? null : () => onClickDay(date)
            outElem.push(
                <div
                    key={i} 
                    className={className} 
                    onClick={onClick}
                    data-date={date.format('YYYY-MM-DD')}
                >
                    <span>{date.date()}</span>
                </div>
            )
            this.renderDate.add(1, 'day')
        }
        return outElem
    }

    render() {
        return (
            <div ref={this.refWrap} className="dp-block__row dp-block__row--days">
                {this.renderMonth()}
            </div>
        )
    }
}

export default DayGrid