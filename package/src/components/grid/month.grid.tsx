import * as React from 'react'
import moment from 'moment'
import { CheckDateFunc } from './grid'

interface Props {
    disablePast: boolean
    disableFuture: boolean
    viewDate: moment.Moment
    setView: (date: moment.Moment) => void
    onCheckDate: CheckDateFunc
}

class MonthGrid extends React.Component<Props, {}> {

    renderItems() {
        let outElem = []
        let { viewDate, setView, onCheckDate } = this.props
        let date = moment(viewDate).startOf('year').endOf('month')
        for (let i = 0; i < 12; i++) {            
            let className = 'dp-blockCell --month'
            let checkDate = onCheckDate(className, date, 'months')
            className = checkDate.className
            let d = moment(date)
            let onClick = checkDate.notClick ? null : () => setView(d)
            outElem.push(
                <div 
                    key={i} 
                    className={className}
                    onClick={onClick}
                >{moment.monthsShort(i)}</div>
            )
            date.add(1, 'month')
        }
        return outElem
    }

    render() {
        return (
            <>
                {this.renderItems()}
            </>
        )
    }
}

export default MonthGrid