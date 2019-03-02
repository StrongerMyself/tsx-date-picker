import * as React from 'react'
import moment from 'moment'
import { withContextConsumer } from '../../core/context'
import GridContext, { IGridContext } from './context.grid'

import TopGrid from './top.grid'
import WeekGrid from './week.grid'
import DayGrid from './day.grid'
import MonthGrid from './month.grid'

export interface Props extends IGridContext {
    initDate?: moment.Moment
    prefix?: string
    disablePast?: boolean
    disableFuture?: boolean
    format?: string
    leftBtn?: React.ReactNode | string
    rightBtn?: React.ReactNode | string
}

export interface State {
    layer: Layers
    viewDate: moment.Moment
}

export enum Layers {
    day = 'day',
    month = 'month',
}

export type CheckDateFunc = (
    className: string, 
    date: moment.Moment, 
    key: any, 
    otherDay?: boolean
) => CheckDate

export type CheckDate = {
    className: string 
    notClick: boolean
}

export class Component extends React.Component<Props, State> {

    static defaultProps = {
        prefix: '',
        format: 'DD-MM-YYYY',
        disablePast: false,
        disableFuture: false,
        onSetView: (date) => {},
        onClickDay: (date) => {},
    }

    refWrap: React.RefObject<HTMLDivElement> = React.createRef()

    shouldComponentUpdate(nextProps, nextState) {
        let { viewDate, layer } = this.state
        let isChangeViewDate = viewDate.toString() !== nextState.viewDate.toString()
        let isChangeLayer = layer !== nextState.layer
        if (isChangeViewDate || isChangeLayer) {
            return true
        }
        return false
    }

    get initDate() {
        let { initDate } = this.props
        let validInitDate = (initDate && moment.isMoment(initDate))
        return validInitDate ? moment(initDate) : moment()
    }

    state = {
        layer: Layers.day,
        viewDate: this.initDate,
    }

    toggleView = () => {
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
        return moment(check, 'YYYY-MM-DD').isBefore(now)
    }
    
    checkFuture = (date: moment.Moment): boolean => {
        let now = moment().format('YYYY-MM-DD')
        let check = date.format('YYYY-MM-DD')
        return moment(check, 'YYYY-MM-DD').isAfter(now)
    }

    checkNow = (date: moment.Moment) => {
        let nowDate = moment()
        let yearState = date.year() === nowDate.year()
        let monthState = date.month() === nowDate.month()
        let dayState = date.date() === nowDate.date()
        return {
            months: (yearState && monthState),
            days: (yearState && monthState && dayState),
        }
    }

    checkDate = (className: string, date: moment.Moment, key, otherDay: boolean = false): CheckDate => {
        let { disablePast, disableFuture } = this.props

        let nowState = this.checkNow(date)[key]
        let pastState = disablePast ? this.checkPast(date) : false
        let futureState = disableFuture ? this.checkFuture(date) : false
        
        let notClick = (otherDay || pastState || futureState)

        if (nowState) className += ' --now'
        if (notClick) className += ' --hide'

        return { className, notClick }
    }
    
    setView = (typeAdd) => (date) => {
        let { onSetView } = this.props
        let viewDate = moment(this.state.viewDate)
        let offsetM = date.month() - viewDate.month()
        viewDate.add(offsetM, typeAdd)
        this.setState({ viewDate, layer: Layers.day }, () => {
            onSetView(moment(viewDate))
        })
    }
    
    onClickArr = (i) => () => {
        let { layer } = this.state
        let { onSetView } = this.props
        let viewDate = moment(this.state.viewDate)
        if (layer === Layers.day) viewDate.add(i, 'M')
        if (layer === Layers.month) viewDate.add(i, 'y')
        this.setState({ viewDate }, () => {
            onSetView(moment(viewDate))
        })
    }

    get className() {
        let className = 'dp-block'
        let { layer } = this.state
        let { prefix } = this.props
        if (prefix) className += ` ${prefix}`
        if (layer === Layers.day) className += ' --dayLayer'
        if (layer === Layers.month) className += ' --monthLayer'
        return className
    }

    render() {
        console.log('renderGrid')
        let { viewDate } = this.state
        let { onClickDay, onRender, disableFuture, disablePast, leftBtn, rightBtn } = this.props
        return (
            <div className={this.className} ref={this.refWrap}>
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
                            onRender={onRender}
                            onClickDay={onClickDay}
                            viewDate={viewDate}
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

export const ComponentCtxt = withContextConsumer(GridContext)(Component)
