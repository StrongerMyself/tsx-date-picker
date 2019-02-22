import * as React from 'react'
import moment from 'moment'

import SharedGrid, { SharedGridProps, SharedGridState, GridLayers, CheckDate } from './_shared/shared.grid'

import MonthGrid from './month.grid'
import WeekGrid from './week.grid'
import DayGrid from './day.grid'

export interface GridProps extends SharedGridProps {
    date: moment.Moment
    onChange: (date: moment.Moment, format: string) => void
}

interface State extends SharedGridState {
    layer: GridLayers
    viewDate: moment.Moment
}

class Grid extends SharedGrid<GridProps, State> {
        
    state = {
        layer: GridLayers.day,
        viewDate: this.date,
    }

    get date() {
        return moment(this.props.date)
    }

    setDate = (date) => {
        let { onChange, format, disablePast } = this.props
        let pastState = disablePast ? this.checkPast(date) : false
        let viewDate = moment(date)
        if (!pastState) {
            this.setState({ viewDate }, () => {
                onChange(moment(date), format)
            })
        }
    }

    checkSelect = (inDate: moment.Moment): CheckDate => {
        let date = this.date
        let yearState = inDate.year() === date.year()
        let monthState = inDate.month() === date.month()
        let dayState = inDate.date() === date.date()
        return {
            year: (yearState),
            month: (yearState && monthState),
            day: (yearState && monthState && dayState),
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
                            checkNow={this.checkNow}
                            checkPast={this.checkPast}
                            checkFuture={this.checkFuture}
                            checkSelect={this.checkSelect}
                        />
                    </div>
                    <div className="dp-block__months">
                        <MonthGrid
                            viewDate={viewDate}
                            setView={this.setView('M')}
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