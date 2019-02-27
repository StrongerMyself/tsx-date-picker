import * as React from 'react'
import moment from 'moment'

import { BaseGrid, MonthGrid, WeekGrid, DayGrid } from '../_shared'

export interface Props extends BaseGrid.Props {
    date: moment.Moment
    onChange: (date: moment.Moment, format: string) => void
}

interface State extends BaseGrid.State {
    layer: BaseGrid.Layers
    viewDate: moment.Moment
}

class Grid extends BaseGrid.Component<Props, State> {
        
    state = {
        layer: BaseGrid.Layers.day,
        viewDate: this.date,
    }

    componentDidUpdate(prevProps) {
        let prevDateStr = prevProps.date.format('YYYY-MM-DD')
        let nextDateStr = this.date.format('YYYY-MM-DD')
        if (prevDateStr !== nextDateStr) {
            this.setState({viewDate: moment(this.date)})
        }
    }

    get date() {
        return moment(this.props.date)
    }

    setDate = (date) => {
        let { onChange, format, disablePast } = this.props
        let pastState = disablePast ? this.checkPast(date) : false
        if (!pastState) {
            let viewDate = moment(date)
            this.setState({ viewDate }, () => {
                onChange(moment(date), format)
            })
        }
    }

    checkSelect = (inDate: moment.Moment) => {
        let { date } = this.props
        let yearState = inDate.year() === date.year()
        let monthState = inDate.month() === date.month()
        let dayState = inDate.date() === date.date()
        return {
            months: (yearState && monthState),
            days: (yearState && monthState && dayState),
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