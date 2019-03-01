import * as React from 'react'
import moment from 'moment'

import { BaseGrid, MonthGrid, WeekGrid, DayGrid, TopGrid } from '../_shared'

export type DateRange = {
    from: moment.Moment
    to: moment.Moment
}

export interface Props extends BaseGrid.Props {
    date?: DateRange
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

    componentDidMount() {
        this.prepareSelectClass()
    }

    componentDidUpdate(prevProps, prevState) {
        let date = this.propsDate
        // console.log(prevProps.date.from === date.from)
        // console.log({...date})
        if (date) {
            // let prevFrom = ''
            // let prevTo = ''
            // if (prevProps.date) {
            //     prevFrom = moment.isMoment(prevProps.date.from) ? prevProps.date.from.format('YYYY-MM-DD') : ''
            //     prevTo = moment.isMoment(prevProps.date.to) ? prevProps.date.to.format('YYYY-MM-DD') : ''
            // }
            // let nextFrom = moment.isMoment(date.from) ? date.from.format('YYYY-MM-DD') : ''
            // let nextTo = moment.isMoment(date.to) ? date.to.format('YYYY-MM-DD') : ''
            
            let isChangeFrom = date.from !== null && prevProps.date.from === date.from
            let isChangeTo = date.to !== null && prevProps.date.to === date.to
            
            console.log(isChangeFrom, isChangeTo)
            if (isChangeFrom || isChangeTo) {
                let viewDate = isChangeFrom ? date.from : date.to
                // this.setState({viewDate}, this.prepareSelectClass)
            } else {
                // let prevView = prevState.viewDate.format('YYYY-MM-DD')
                // let nextView = this.state.viewDate.format('YYYY-MM-DD')
    
                // let isChangeView = prevView !== nextView
                
                // if (isChangeView) {
                //     this.prepareSelectClass()
                // }
            }
        } else {
            this.prepareSelectClass()
        }
        // if (!this.state.viewDate.isValid()) {
        //     this.setState({viewDate: moment()})
        // }
    }

    get propsDate() {
        let { date } = this.props
        let isFromMoment = (date && date.from && moment.isMoment(date.from))
        let isToMoment = (date && date.to && moment.isMoment(date.to))
        let isMoment = isFromMoment && isToMoment
        return isMoment ? date : {
            from: isFromMoment ? moment() : null,
            to: isFromMoment ? moment() : null,
        }
    }

    get date(): DateRange {
        let date = this.propsDate
        if (date) {
            return {
                from: date.from ? moment(date.from) : moment(),
                to: date.to ? moment(date.to) : moment(),
            }
        } else {
            return {
                from: moment(),
                to: moment(),
            }
        }
    }
    
    setInterval = (dateIn: moment.Moment): {date: DateRange, viewDate: moment.Moment} => {
        let date = this.date
        let len = date.to.diff(date.from, 'days')
        let dir = dateIn.isBefore(date.from, 'date') ? 'from' : 'to'
        let dateOut = {
            from: (len > 0 || dir === 'from') ? moment(dateIn) : moment(date.from),
            to: (len > 0 || dir === 'to') ? moment(dateIn) : moment(date.to)
        }
        let viewDate = (dir === 'from') ? moment(dateOut.from) : moment(dateOut.to)
        return { date: dateOut, viewDate }
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
        let date = this.propsDate
        if (date) {
            return {
                months: dateIn.isBetween(date.from, date.to, 'months', '[]'),
                days: dateIn.isBetween(date.from, date.to, 'days', '[]'),
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
            <div className={`${this.className} --range`} ref={this.refWrap}>
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