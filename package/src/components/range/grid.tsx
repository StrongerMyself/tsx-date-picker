import * as React from 'react'
import moment from 'moment'

import { BaseGrid, MonthGrid, WeekGrid, DayGrid, TopGrid } from '../_shared'

export type DateRange = {
    from: moment.Moment
    to: moment.Moment
}

export interface Props extends BaseGrid.Props {
    date: DateRange
    onChange: (date: DateRange, format: string) => void
}

interface State extends BaseGrid.State {
    layer: BaseGrid.Layers
    viewDate: moment.Moment
}

class Grid extends BaseGrid.Component<Props, State> {
        
    state = {
        layer: BaseGrid.Layers.day,
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
    
    setDate = (dateIn: moment.Moment) => {
        let { onChange, format, disablePast, disableFuture } = this.props
        let pastState = disablePast ? this.checkPast(dateIn) : false
        let futureState = disableFuture ? this.checkFuture(dateIn) : false
        if (!pastState && !futureState) {
            let { viewDate, date } = this.setInterval(dateIn)
            this.setState({ viewDate }, () => {
                onChange(date, format)
            })
        }
    }

    checkSelect = (dateIn: moment.Moment) => {
        let { date } = this.props
        return {
            months: dateIn.isBetween(date.from, date.to, 'months', '[]'),
            days: dateIn.isBetween(date.from, date.to, 'days', '[]'),
        }
    }

    render() {
        let { viewDate } = this.state
        let { disableFuture, disablePast, leftBtn, rightBtn } = this.props
        return (
            <div className={`${this.className} --range`}>
                <TopGrid
                    viewDate={viewDate}
                    onClickArr={this.onClickArr}
                    toggleView={this.toggleView}
                    leftBtn={leftBtn}
                    rightBtn={rightBtn}
                />
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