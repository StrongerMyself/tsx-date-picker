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
    
    date: moment.Moment
    nowDate: moment.Moment
    viewDate: moment.Moment
    
    state = {
        viewDate: this.props.date || moment(),
        layer: Layers.day,
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
    
    initDate() {
        let { date, format } = this.props
        let { addMonth, addYear } = this.state
        this.nowDate = moment()
        this.viewDate = moment(date)
            .add(addMonth, 'month')
            .add(addYear, 'year')
    }

    checkPast = (date: moment.Moment): boolean => {
        let now = this.nowDate.format('YYYY-MM-DD')
        let check = date.format('YYYY-MM-DD')
        return moment(check).isBefore(now)
    }

    checkNow = (date: moment.Moment): CheckDate => {
        let yearState = date.year() === this.nowDate.year()
        let monthState = date.month() === this.nowDate.month()
        let dayState = date.date() === this.nowDate.date()
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
        if (!pastState) {
            this.setState({ addMonth: 0, addYear: 0 }, () => {
                onChange(date, format)
            })
        }
    }

    setMonthView = (inDate) => {
        let { date } = this.props
        let offsetM = inDate.month() - date.month()
        this.setState({ addMonth: offsetM, layer: Layers.day })
    }
    
    onClickArr = (i) => () => {
        let { layer, addMonth, addYear } = this.state
        if (layer === Layers.day) addMonth += i
        if (layer === Layers.month) addYear += i
        this.setState({ addMonth, addYear })
    }

    get className() {
        let className = 'dp-block'
        let { layer } = this.state
        if (layer === Layers.day) className += ' --dayLayer'
        if (layer === Layers.month) className += ' --monthLayer'
        return className
    }

    render() {
        this.initDate()
        let { disablePast, date } = this.props
        let month = this.viewDate.month()
        let monthStr = moment.months(month)
        let year = this.viewDate.year()
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
                            viewDate={this.viewDate}
                            setDate={this.setDate}
                            disablePast={disablePast}
                            checkNow={this.checkNow}
                            checkPast={this.checkPast}
                            checkSelect={this.checkSelect}
                        />
                    </div>
                    <div className="_months">
                        <MonthGrid
                            viewDate={this.viewDate}
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