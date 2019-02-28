import * as React from 'react'
import moment from 'moment'

export interface Props {
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

export class Component<P extends Props, S extends State> extends React.Component<P, S> {

    static defaultProps = {
        format: 'DD-MM-YYYY',
        disablePast: false,
        disableFuture: false,
    }

    toggleView = () => {
        let { layer } = this.state
        if (layer === Layers.day) {
            layer = Layers.month
        } else {
            layer = Layers.day
        }
        console.log({layer})
        this.setState({layer})
    }
    
    checkPast = (date: moment.Moment): boolean => {
        let now = moment().format('YYYY-MM-DD')
        let check = date.format('YYYY-MM-DD')
        return moment(check).isBefore(now)
    }
    
    checkFuture = (date: moment.Moment): boolean => {
        let now = moment().format('YYYY-MM-DD')
        let check = date.format('YYYY-MM-DD')
        return moment(check).isAfter(now)
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

    checkSelect = (inDate: moment.Moment) => {
        return {
            months: false,
            days: false,
        }
    }

    checkDate = (className: string, date: moment.Moment, key, otherDay: boolean = false): CheckDate => {
        let { disablePast, disableFuture } = this.props

        let nowState = this.checkNow(date)[key]
        let selectState = this.checkSelect(date)[key]
        let pastState = disablePast ? this.checkPast(date) : false
        let futureState = disableFuture ? this.checkFuture(date) : false
        
        let notClick = (otherDay || pastState || futureState)

        if (nowState) className += ' --now'
        if (selectState) className += ' --select'
        if (notClick) className += ' --hide'

        return { className, notClick }
    }
    
    setView = (typeAdd) => (date) => {
        let { viewDate } = this.state
        let offsetM = date.month() - viewDate.month()
        viewDate.add(offsetM, typeAdd)
        this.setState({ viewDate, layer: Layers.day })
    }
    
    onClickArr = (i) => () => {
        let { layer, viewDate } = this.state
        if (layer === Layers.day) viewDate.add(i, 'M')
        if (layer === Layers.month) viewDate.add(i, 'y')
        this.setState({ viewDate })
    }

    get className() {
        let className = 'dp-block'
        let { layer } = this.state
        if (layer === Layers.day) className += ' --dayLayer'
        if (layer === Layers.month) className += ' --monthLayer'
        return className
    }
}