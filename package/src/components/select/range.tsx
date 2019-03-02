import * as React from 'react'
import moment from 'moment'

import * as Select from './_select'

type Value = moment.Moment[]

interface Props extends Select.Props<Value> {}

class Range extends Select.Component<Props, null, Value> implements Select.Interface<Value> {

    initDate = moment.isMoment(this.props.value[0]) ? moment(this.props.value[0]) : null
    prefix  = '--range'
    
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
        let from = value[0]
        let to = value[1]
        if (!from) from = moment(dateIn)
        if (!to) to = moment(dateIn)
        let len = to.diff(from, 'days')
        if (len > 0) {
            from = moment(dateIn)
            to = moment(dateIn)
        } else {
            let dir = dateIn.isBefore(from, 'date') ? 'from' : 'to'
            if (dir === 'from') {
                from = moment(dateIn)
            } else if (dir === 'to') {
                to = moment(dateIn)
            }
        }
        return [moment(from), moment(to)]
    }
    
    transformElemsSelect = (value = this.props.value) => {
        let refDays = this.refDays.current
        let from = value[0]
        let to = value[1]
        let dayElems = refDays.querySelectorAll('.dp-blockCell')
        let selectDays = []
        for (let i = 0; i < dayElems.length; i++) {
            let dayElem = dayElems[i]
            this.resetElem(dayElem)
            let dateObj = moment(dayElem.getAttribute('data-date'))
            let isBetween = (from && to && dateObj.isBetween(from, to, 'days', '[]'))
            if (isBetween) {
                dayElem.classList.add('--select')
                selectDays.push(dayElem)
            }
        }
        let len = selectDays.length
        if (len === 1) {
            selectDays[0].classList.add('--single')
        } else if (len > 1) {
            let fromElem = selectDays[0]
            let toElem = selectDays[len - 1]

            let fromElemDate = fromElem.getAttribute('data-date')
            let toElemDate = toElem.getAttribute('data-date')

            let fromDateStr = from ? from.format('YYYY-MM-DD') : ''
            let toDateStr = to ? to.format('YYYY-MM-DD') : ''

            if (fromElemDate === fromDateStr) {
                fromElem.classList.add('--first')
            }
            if (toElemDate === toDateStr) {
                toElem.classList.add('--last')
            }
        }
    }
}

export default Range