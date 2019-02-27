import * as React from 'react'
import moment from 'moment'

import { Props as GridProps } from '../grid/grid'

export interface Props extends GridProps {
    autoHide?: boolean
    showBtn?: React.ReactNode | string
}

export interface State {
    popupHide: boolean
    error: boolean
}

export class Component<P extends Props, S extends State> extends React.Component<P, S> {

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    onToggle = (state = !this.state.popupHide) => {
        this.setState({popupHide: state})
    }
    
    validInputChange = (date: moment.Moment, value: string) => {
        let { format, disablePast, disableFuture } = this.props
        let validDate = (date.format() === 'Invalid date')
        let validLen = value.length !== format.length
        let pastState = disablePast ? this.checkPast(date) : false
        let futureState = disableFuture ? this.checkFuture(date) : false
        return (validDate || validLen || pastState || futureState)
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

}
