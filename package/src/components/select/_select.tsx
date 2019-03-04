import * as React from 'react'
import moment from 'moment'

import Grid, { GridContext } from '../grid'
import { IGridContext } from '../grid/context.grid'

export interface Interface<V> extends IGridContext {
    refDays: React.RefObject<HTMLDivElement>
    onSelect: (date: moment.Moment, isChange: boolean) => void
    transformElemsSelect: (value?: V) => void
    transformElemsReset: () => void
    resetElem: (elem: Element) => void
    setInterval?: (dateIn: moment.Moment) => moment.Moment[]
}

export interface Props<Value> {
    value?: Value
    format?: string
    onChange?: (date?: Value) => void
    disablePast?: boolean
    disableFuture?: boolean
    leftBtn?: React.ReactNode | string
    rightBtn?: React.ReactNode | string
}

export class Component<P extends Props<V>, S, V> extends React.Component<P, S> implements Interface<V> {
    
    static defaultProps = {
        value: null,
        onChange: (date) => {}
    }

    refDays: React.RefObject<HTMLDivElement>
    initDate: moment.Moment = moment()
    setInitDate: (date: moment.Moment) => void
    prefix: string = ''

    onRender = (ref: React.RefObject<HTMLDivElement>, setView) => {
        this.refDays = ref
        this.setInitDate = setView
        this.onSelect(this.initDate, false)
    }

    onSetView = () => {
        this.transformElemsSelect()
    }

    onClickDay = (date: moment.Moment) => {
        this.onSelect(date)
    }
    
    onSelect = (date: moment.Moment = null, isChange = true) => {}

    setInterval = (dateIn: moment.Moment): moment.Moment[] => {
        return []
    }
    
    transformElemsSelect = (value: V = this.props.value) => {}
    
    transformElemsReset = () => {
        let refDays = this.refDays.current
        let dayElems = refDays.querySelectorAll('.dp-blockCell')
        dayElems.forEach(dayElem => {
            this.resetElem(dayElem)
        })
    }

    resetElem = (elem: Element) => {
        elem.classList.remove('--select')
        elem.classList.remove('--single')
        elem.classList.remove('--first')
        elem.classList.remove('--last')
    }

    render() {
        let { value, format, disablePast, disableFuture, leftBtn, rightBtn } = this.props
        return (
            <GridContext.Provider value={{
                onSetView: this.onSetView,
                onClickDay: this.onClickDay,
                onRender: this.onRender
            }}>
                <Grid.ComponentCtxt
                    prefix={this.prefix}
                    format={format}
                    initDate={value}
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                    leftBtn={leftBtn}
                    rightBtn={rightBtn}
                />
            </GridContext.Provider>
        )
    }
}