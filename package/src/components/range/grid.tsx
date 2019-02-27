import * as React from 'react'
import moment from 'moment'

import { Shared, MonthGrid, WeekGrid, DayGrid } from '../grid'

export type DateRange = {
    from: moment.Moment
    to: moment.Moment
}

export interface Props extends Shared.Props {
    date: DateRange
    onChange: (date: DateRange, format: string) => void
}

interface State extends Shared.State {
    layer: Shared.Layers
    viewDate: moment.Moment
}

class Grid extends Shared.Grid<Props, State> {
        
    state = {
        layer: Shared.Layers.day,
        viewDate: this.date.from,
    }

    componentDidUpdate(prevProps) {
        let prevDateStr = prevProps.date.from.format('YYYY-MM-DD')
        let nextDateStr = this.date.from.format('YYYY-MM-DD')
        if (prevDateStr !== nextDateStr) {
            this.setState({viewDate: moment(this.date.from)})
        }
    }

    get date(): DateRange {
        let { date } = this.props
        return {
            from: moment(date.from),
            to: moment(date.to),
        }
    }

    setInterval = (dateIn: moment.Moment): {date: DateRange, viewDate: moment.Moment} => {
        let { date } = this.props
        let len = date.to.diff(date.from, 'days')
        let dir = dateIn.isBefore(date.from, 'date') ? 'from' : 'to'
        if (len > 0) {
            date = {
                from: moment(dateIn),
                to: moment(dateIn),
            }
        } else {
            date[dir] = moment(dateIn)
        }
        let viewDate = (dir === 'from') ? moment(date.from) : moment(date.to)
        return { date, viewDate }
    }
    
    setDate = (dateIn) => {
        let { onChange, format, disablePast } = this.props
        let pastState = disablePast ? this.checkPast(dateIn) : false
        if (!pastState) {
            let { viewDate, date } = this.setInterval(dateIn)
            this.setState({ viewDate }, () => {
                onChange(date, format)
            })
        }
    }

    checkSelect = (inDate: moment.Moment) => {
        let { date } = this.props
        return {
            months: inDate.isBetween(date.from, date.to, 'months', '[]'),
            days: inDate.isBetween(date.from, date.to, 'days', '[]'),
        }
    }

    render() {
        let { viewDate } = this.state
        let { disableFuture, disablePast, leftBtn, rightBtn } = this.props
        let month = viewDate.month()
        let monthStr = moment.months(month)
        let year = viewDate.year()
        return (
            <div className={this.className}>
                <div className="dp-blockTop">
                    <div className="dp-blockTop__arr" onClick={this.onClickArr(-1)}>
                       {leftBtn}
                    </div>
                    <div onClick={() => this.toggleView()}>
                        <div className="dp-blockTop__tit --dayLayer">{monthStr} {year}</div>
                        <div className="dp-blockTop__tit --monthLayer">{year}</div>
                    </div>
                    <div className="dp-blockTop__arr" onClick={this.onClickArr(1)}>
                        {rightBtn}
                    </div>
                </div>
                <div className="dp-block__body">
                    <div className="dp-block__days">
                        <div className="dp-block__row">
                            <WeekGrid/>
                        </div>
                        <DayGrid
                            viewDate={viewDate}
                            setDate={this.setDate}
                            disablePast={disablePast}
                            disableFuture={disableFuture}
                            onCheckDate={this.checkDate}
                        />
                    </div>
                    <div className="dp-block__months">
                        <MonthGrid
                            viewDate={viewDate}
                            setView={this.setView('M')}
                            disablePast={disablePast}
                            disableFuture={disableFuture}
                            onCheckDate={this.checkDate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid