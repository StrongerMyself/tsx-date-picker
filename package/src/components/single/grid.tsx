import * as React from 'react'
import moment from 'moment'

import { BaseGrid, MonthGrid, WeekGrid, DayGrid, TopGrid } from '../_shared'

export interface Props extends BaseGrid.Props {
    date?: moment.Moment
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
        let date = this.propsDate
        if (date) {
            let prevDateStr = prevProps.date ? prevProps.date.format('YYYY-MM-DD') : ''
            let nextDateStr = date.format('YYYY-MM-DD')
            if (prevDateStr !== nextDateStr) {
                this.setState({viewDate: moment(date)})
            }
        }
    }

    get propsDate() {
        let { date } = this.props
        let isMoment = (date && moment.isMoment(date))
        return isMoment ? date : null
    }

    get date() {
        let date = this.propsDate
        return date ? moment(date) : moment()
    }

    setDate = (date?) => {
        let { onChange, format, disablePast } = this.props
        if (date) {
            let pastState = disablePast ? this.checkPast(date) : false
            if (!pastState) {
                let viewDate = moment(date)
                this.setState({ viewDate }, () => {
                    onChange(moment(date), format)
                })
            }
        } else {
            onChange(null, format)
        }
    }

    checkSelect = (inDate: moment.Moment) => {
        let date = this.propsDate
        if (date) {
            let yearState = inDate.year() === date.year()
            let monthState = inDate.month() === date.month()
            let dayState = inDate.date() === date.date()
            return {
                months: (yearState && monthState),
                days: (yearState && monthState && dayState),
            }
        } else {
            return {
                months: false,
                days: false,
            }
        }
    }

    render() {
        let { viewDate } = this.state
        let { disableFuture, disablePast, leftBtn, rightBtn } = this.props
        return (
            <div className={`${this.className} --single`}>
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