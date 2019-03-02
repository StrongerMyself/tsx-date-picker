import * as React from 'react'
import moment from 'moment'

import Grid, { GridContext } from '../grid'

export interface Interface<V> {
    refDays: React.RefObject<HTMLDivElement>
    onRender: (ref: React.RefObject<HTMLDivElement>) => void
    onSetView: (date: moment.Moment) => void
    onClickDay: (date: moment.Moment) => void
    onSelect: (date: moment.Moment, isChange: boolean) => void
    transformElemsSelect: (value?: V) => void
    transformElemsReset: () => void
    resetElem: (elem: Element) => void
}

export interface Props<Value> {
    value?: Value
    onChange?: (date?: Value) => void
}

export class Component<P extends Props<V>, S, V> extends React.Component<P, S> implements Interface<V> {
    
    static defaultProps = {
        value: null,
        onChange: (date) => {}
    }

    refDays: React.RefObject<HTMLDivElement>
    initDate: moment.Moment = moment()
    prefix: string = ''

    onRender = (ref: React.RefObject<HTMLDivElement>) => {
        this.refDays = ref
        this.onSelect(this.initDate, false)
    }

    onSetView = (date: moment.Moment) => {
        this.transformElemsSelect()
    }

    onClickDay = (date: moment.Moment) => {
        this.onSelect(date)
    }
    
    onSelect = (date: moment.Moment = null, isChange = true) => {}
    
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
        return (
            <GridContext.Provider value={{
                onSetView: this.onSetView,
                onClickDay: this.onClickDay,
                onRender: this.onRender
            }}>
                <Grid.ComponentCtxt
                    prefix={this.prefix}
                    initDate={this.initDate}
                />
            </GridContext.Provider>
        )
    }
}