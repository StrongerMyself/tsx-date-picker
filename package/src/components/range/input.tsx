import * as React from 'react'
import moment from 'moment'

import { BaseInput } from '../_shared'
import Popup from './popup'
import { Props as GridProps, DateRange } from './grid'

type DateInputRange = {
    from: string
    to: string
}

interface Props extends BaseInput.Props, GridProps {
    separate?: React.ReactNode
}

interface State extends BaseInput.State {
    dateStr: DateInputRange
}

class InputDatepicker extends BaseInput.Component<Props, State> {

    static defaultProps = {
        date: {
            from: moment(),
            to: moment()
        },
        format: 'DD-MM-YYYY',
        showBtn: '#',
        separate: '',
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    dateStr(date = this.props.date): DateInputRange {
        let { format } = this.props
        let validFrom = (date && date.from && moment.isMoment(date.from))
        let validTo = (date && date.to && moment.isMoment(date.to))
        if (validFrom && validTo) {
            return {
                from: date.from.format(format),
                to: date.to.format(format),
            }
        } else {
            return {
                from: '',
                to: '',
            }
        }
    }

    state = {
        popupHide: true,
        dateStr: this.dateStr(),
        error: false
    }

    onChange = (key: string) => (dateIn: moment.Moment) => {
        let { date, onChange, format } = this.props
        date[key] = dateIn ? moment(dateIn) : null
        onChange(date, format)
    }

    onInputChange = (key: string) => (e) => {
        let { value } = e.target
        let { error, dateStr } = this.state
        if (value !== '') { 
            let { format } = this.props
            let date = moment(value, format)
            let inNotValid = this.validInputChange(date, value)
            if (inNotValid) {
                error = true
            } else {
                this.onChange(key)(date)
                error = false
            }
        } else {
            error = true
            if (dateStr.from === '' && dateStr.to === '') {
                error = false
            }
            this.onChange(key)(null)
        }
        dateStr[key] = value
        this.setState({dateStr, error})
    }

    onPopupChange = (date: DateRange) => {
        let { autoHide, onChange, format } = this.props
        onChange(date, format)
        let dateStr = this.dateStr(date)
        this.setState({dateStr, error: false})
        let len = date.to.diff(date.from, 'days')
        if (autoHide && len > 0) {
            this.onToggle(true)
        }
    }

    render() {
        let { showBtn, separate, ...rest } = this.props
        let { popupHide, dateStr, error } = this.state
        return (
            <div className="dp-input --range" ref={this.refElem}>
                <div className={`dp-input__input ${error ? ' --error' : ''}`}>
                    <input 
                        type="text"
                        placeholder={rest.format}
                        value={dateStr.from}
                        onChange={this.onInputChange('from')}
                        onFocus={() => this.onToggle(false)}
                    />
                    {separate}
                    <input 
                        type="text"
                        placeholder={rest.format}
                        value={dateStr.to}
                        onChange={this.onInputChange('to')}
                        onFocus={() => this.onToggle(false)}
                    />
                    <div className="dp-input__btn" onClick={() => this.onToggle()}>
                        {showBtn}
                    </div>
                </div>
                <Popup
                    {...rest}
                    refWrap={this.refElem}
                    hide={popupHide}
                    onChange={this.onPopupChange}
                    onToggle={this.onToggle} 
                />
            </div>
        )
    }
}

export default InputDatepicker