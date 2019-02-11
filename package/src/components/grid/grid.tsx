import * as React from 'react'
import moment from 'moment'
import MonthGrid from './month.grid'
import WeekGrid from './week.grid'
import DayGrid from './day.grid'

export interface GridProps {
    date: moment.Moment
    disablePast?: boolean
    onChange: (date: moment.Moment, format: string) => void
    format?: string
}

interface State {
    layer: Layers
    viewDate: moment.Moment
    addMonth: number
    addYear: number
}

enum Layers {
    day = 'day',
    month = 'month',
}

export interface CheckDate {
    year: boolean
    month: boolean
    day: boolean
}

class Grid extends React.Component<GridProps, State> {

    static defaultProps = {
        date: moment(),
        format: 'DD-MM-YYYY',
    }
        
    state = {
        layer: Layers.day,
        viewDate: moment(this.props.date),
        addMonth: 0,
        addYear: 0,
    }

    toggleView() {
        let { layer } = this.state
        if (layer === Layers.day) {
            layer = Layers.month
        } else {
            layer = Layers.day
        }
        this.setState({layer})
    }
    
    checkPast = (date: moment.Moment): boolean => {
        let now = moment().format('YYYY-MM-DD')
        let check = date.format('YYYY-MM-DD')
        return moment(check).isBefore(now)
    }

    checkNow = (date: moment.Moment): CheckDate => {
        let nowDate = moment()
        let yearState = date.year() === nowDate.year()
        let monthState = date.month() === nowDate.month()
        let dayState = date.date() === nowDate.date()
        return {
            year: (yearState),
            month: (yearState && monthState),
            day: (yearState && monthState && dayState),
        }
    }

    checkSelect = (inDate: moment.Moment): CheckDate => {
        let { date } = this.props
        let yearState = inDate.year() === date.year()
        let monthState = inDate.month() === date.month()
        let dayState = inDate.date() === date.date()
        return {
            year: (yearState),
            month: (yearState && monthState),
            day: (yearState && monthState && dayState),
        }
    }

    setDate = (date) => {
        let { onChange, format, disablePast } = this.props
        let pastState = disablePast ? this.checkPast(date) : false
        let viewDate = moment(date)
        if (!pastState) {
            this.setState({ viewDate }, () => {
                onChange(date, format)
            })
        }
    }

    setMonthView = (inDate) => {
        let { viewDate } = this.state
        let offsetM = inDate.month() - viewDate.month()
        viewDate.add(offsetM, 'M')
        this.setState({ viewDate, layer: Layers.day })
    }
    
    onClickArr = (i) => () => {
        let { layer, viewDate } = this.state
        if (layer === Layers.day) viewDate.add(i, 'M')
        if (layer === Layers.month) viewDate.add(i, 'd')
        this.setState({ viewDate })
    }

    get className() {
        let className = 'dp-block'
        let { layer } = this.state
        if (layer === Layers.day) className += ' --dayLayer'
        if (layer === Layers.month) className += ' --monthLayer'
        return className
    }

    render() {
        let { viewDate } = this.state
        let { disablePast, date } = this.props
        let month = viewDate.month()
        let monthStr = moment.months(month)
        let year = viewDate.year()
        return (
            <div className={this.className}>
                <div className="_top">
                    <div className="_top__arr" onClick={this.onClickArr(-1)}>
                       {'<'}
                    </div>
                    <div onClick={() => this.toggleView()}>
                        <div className="_top__tit --dayLayer">{monthStr} {year}</div>
                        <div className="_top__tit --monthLayer">{year}</div>
                    </div>
                    <div className="_top__arr" onClick={this.onClickArr(1)}>
                        {'>'}
                    </div>
                </div>
                <div className="_body">
                    <div className="_days">
                        <div className="_row">
                            <WeekGrid/>
                        </div>
                        <DayGrid
                            date={date}
                            viewDate={viewDate}
                            setDate={this.setDate}
                            disablePast={disablePast}
                            checkNow={this.checkNow}
                            checkPast={this.checkPast}
                            checkSelect={this.checkSelect}
                        />
                    </div>
                    <div className="_months">
                        <MonthGrid
                            viewDate={viewDate}
                            setView={this.setMonthView}
                            disablePast={disablePast}
                            checkNow={this.checkNow}
                            checkPast={this.checkPast}
                            checkSelect={this.checkSelect}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid