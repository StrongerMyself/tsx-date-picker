import * as React from 'react'
import moment from 'moment'

import * as Select from './_select'

type Value = moment.Moment[]

interface Props extends Select.Props<Value> {}

class Multy extends Select.Component<Props, null, Value> implements Select.Interface<Value> {

    initDate = moment.isMoment(this.props.value[0]) ? moment(this.props.value[0]) : null
    prefix = '--multy'
    
    onSelect = (date = null, isChange = true) => {
        let refDays = this.refDays.current
        if (refDays) {
            let { onChange } = this.props
            let validDate = (date && moment.isMoment(date))
            let value = []
            if (validDate) {
                value = this.setInterval(date)
                this.transformElemsSelect(value)
            } else {
                this.transformElemsReset()
            }
            if (isChange) {
                onChange(value)
            }
        }
    }

    setInterval = (dateIn: moment.Moment): Value => {
        let { value } = this.props
        let dateStr = dateIn.format('YYYY-MM-DD')
        if (value.length > 0) {
            let outValue = [...value]
            let isSelectedIndex = outValue.findIndex(val => val.format('YYYY-MM-DD') === dateStr)
            if (isSelectedIndex >= 0) {
                outValue.splice(isSelectedIndex, 1)
            } else {
                outValue.push(moment(dateIn))
            }
            return outValue
        }
        return [moment(dateIn)]
    }

    transformElemsSelect = (value: Value = this.props.value) => {
        let refDays = this.refDays.current
        let dateStr = []
        value.forEach(val => {
            dateStr.push(val.format('YYYY-MM-DD'))
        })
        let dayElems = refDays.querySelectorAll('.dp-blockCell')
        let selectDays = []
        for (let i = 0; i < dayElems.length; i++) {
            let dayElem = dayElems[i]
            this.resetElem(dayElem)
            let dayDateStr = dayElem.getAttribute('data-date')
            let isFindDate = dateStr.find(el => el === dayDateStr)
            if (isFindDate) {
                dayElem.classList.add('--select')
                selectDays.push(dayElem)
            }
        }
    }
}

export default Multy