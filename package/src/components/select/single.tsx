import * as React from 'react'
import moment from 'moment'

import * as Select from './_select'

type Value = moment.Moment | null

interface Props extends Select.Props<Value> {}

class Single extends Select.Component<Props, null, Value> implements Select.Interface<Value> {

    initDate = this.props.value !== null ? moment(this.props.value) : null
    prefix = '--single'

    componentDidUpdate(prevProps) {
        let { value } = this.props
        try {
            let valueStr = value.format('YYYY-MM-DD')
            let valuePrevStr = prevProps.value.format('YYYY-MM-DD')
            let isChangeVal = (valueStr !== valuePrevStr)
            if (isChangeVal) {
                this.setInitDate(value)
            }
        } catch (error) {
            let isReset = (value === null && prevProps.value !== null)
            let isSelect = (value !== null && prevProps.value === null)
            if (isReset) {
                this.transformElemsReset()
            } else if (isSelect) {
                this.setInitDate(value)
            }
        }
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
        let dayElems = refDays.querySelectorAll('.dp-blockCell')
        let selectDays = []
        for (let i = 0; i < dayElems.length; i++) {
            let dayElem = dayElems[i]
            this.resetElem(dayElem)
            let dayDateStr = dayElem.getAttribute('data-date')
            if (dayDateStr === dateStr) {
                dayElem.classList.add('--select')
                selectDays.push(dayElem)
            }
        }
    }
}

export default Single