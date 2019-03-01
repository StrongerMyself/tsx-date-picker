import * as React from 'react'
import moment from 'moment'

import Grid, { GridContext } from '../grid'

type Value = moment.Moment | null

interface Props {
    value?: Value
    onChange?: (date?: Value) => void
}

interface State {}

class Single extends React.Component<Props, State> {

    static defaultProps = {
        onChange: (date) => {}
    }
    
    refDays: React.RefObject<HTMLDivElement>

    onRender = (ref) => {
        this.refDays = ref
        let { value } = this.props
        this.onSelect(value, false)
    }

    onSetView = (date: moment.Moment) => {
        this.transformElemsSelect()
    }

    onClickDay = (date: moment.Moment) => {
        this.onSelect(date)
    }
    
    onSelect = (date: moment.Moment = null, isChange = true) => {
        let refDays = this.refDays.current
        if (refDays) {
            let { onChange } = this.props
            let validDate = (date && moment.isMoment(date))
            if (validDate) {
                this.transformElemsSelect(date)
            } else {
                this.transformElemsReset()
            }
            if (isChange) {
                onChange(date)
            }
        }
    }
    
    transformElemsSelect = (value: Value = this.props.value) => {
        let refDays = this.refDays.current
        let dateStr = value.format('YYYY-MM-DD')
        let dayElems = refDays.querySelectorAll('.dp-blockCell:not(.--hide)')
        let selectDays = []
        for (let i = 0; i < dayElems.length; i++) {
            let dayElem = dayElems[i]
            this.resetElem(dayElem)
            let dayDateStr = dayElem.getAttribute('data-date')
            if (dayDateStr === dateStr) {
                dayElem.classList.add('--select')
                selectDays.push(dayElem)
                break
            }
        }
    }
    
    transformElemsReset = () => {
        let refDays = this.refDays.current
        let dayElems = refDays.querySelectorAll('.dp-blockCell')
        dayElems.forEach(dayElem => {
            this.resetElem(dayElem)
        })
    }

    resetElem = (elem) => {
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
                    prefix="--single"
                    initDate={this.props.value}
                />
            </GridContext.Provider>
        )
    }
}

export default Single