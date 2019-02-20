import * as React from 'react'
import moment from 'moment'

export interface SharedGridProps {
    disablePast?: boolean
    format?: string
    leftBtn?: React.ReactNode | string
    rightBtn?: React.ReactNode | string
}

export interface SharedGridState {
    layer: GridLayers
    viewDate: moment.Moment
}

export enum GridLayers {
    day = 'day',
    month = 'month',
}

export interface CheckDate {
    year: boolean
    month: boolean
    day: boolean
}

class SharedGrid<
	P extends SharedGridProps,
	S extends SharedGridState
> extends React.Component<P, S> {

    static defaultProps = {
        format: 'DD-MM-YYYY',
        leftBtn: '<',
        rightBtn: '>',
    }

    componentDidUpdate(prevProps) {
        let prevDateStr = prevProps.date.format('YYYY-MM-DD')
        let nextDateStr = this.date.format('YYYY-MM-DD')
        if (prevDateStr !== nextDateStr) {
            this.setState({viewDate: moment(this.date)})
        }
    }

    get date() {
        return moment()
    }

    toggleView() {
        let { layer } = this.state
        if (layer === GridLayers.day) {
            layer = GridLayers.month
        } else {
            layer = GridLayers.day
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
    
    setView = (typeAdd) => (date) => {
        let { viewDate } = this.state
        let offsetM = date.month() - viewDate.month()
        viewDate.add(offsetM, typeAdd)
        this.setState({ viewDate, layer: GridLayers.day })
    }
    
    onClickArr = (i) => () => {
        let { layer, viewDate } = this.state
        if (layer === GridLayers.day) viewDate.add(i, 'M')
        if (layer === GridLayers.month) viewDate.add(i, 'y')
        this.setState({ viewDate })
    }

    get className() {
        let className = 'dp-block'
        let { layer } = this.state
        if (layer === GridLayers.day) className += ' --dayLayer'
        if (layer === GridLayers.month) className += ' --monthLayer'
        return className
    }
}

export default SharedGrid