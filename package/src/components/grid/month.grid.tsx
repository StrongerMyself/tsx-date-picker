import * as React from 'react'
import moment from 'moment'
import { CheckDate } from './grid'

interface Props {
    disablePast: boolean
    viewDate: moment.Moment
    setView: (date: moment.Moment) => void
    checkNow: (date: moment.Moment) => CheckDate
    checkPast: (date: moment.Moment) => boolean
    checkSelect: (date: moment.Moment) => CheckDate
}

class MonthGrid extends React.Component<Props, {}> {

    static defaultProps = {
        viewDate: moment(),
    }

    renderItems() {
        let outElem = []
        let { viewDate, setView } = this.props
        let date = moment(viewDate).startOf('year').endOf('month')
        for (let i = 0; i < 12; i++) {            
            let className = '_cell --month'
            let checkDate = this.checkDate(className, date)
            className = checkDate.className
            let d = moment(date)
            let onClick = checkDate.isClick ? () => setView(d) : null
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

    checkDate = (className, date) => {
        let { disablePast, checkNow, checkPast, checkSelect } = this.props

        let nowState = checkNow(date).month
        let pastState = disablePast ? checkPast(date) : false
        let selectState = checkSelect(date).month
        
        if (nowState) className += ' --now'
        if (pastState) className += ' --past'
        if (selectState) className += ' --select'

        let isClick = !pastState

        return { className, isClick }
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