import * as React from 'react'
import moment from 'moment'

import { BaseInput } from '../_shared'
import Popup from './popup'
import { Props as GridProps } from './grid'

type DateInputRange = {
    from: string
    to: string
}

interface Props extends BaseInput.Props, GridProps {}

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
        showBtn: '#'
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    dateStr(date = this.props.date): DateInputRange {
        let { format } = this.props
        return {
            from: date.from.format(format),
            to: date.to.format(format)
        }
    }

    state = {
        popupHide: true,
        dateStr: this.dateStr(),
        error: false
    }

    onChange = (key) => (dateIn) => {
        let { date, onChange, format } = this.props
        date[key] = moment(dateIn)
        onChange(date, format)
    }

    onInputChange = (key) => (e) => {
        let { value } = e.target
        let { error, dateStr } = this.state
        let { format } = this.props
        let date = moment(value, format)
        let inNotValid = this.validInputChange(date, value)
        if (inNotValid) {
            error = true
        } else {
            this.onChange(key)(date)
            error = false
        }
        dateStr[key] = value
        this.setState({dateStr, error})
    }

    onPopupChange = (date) => {
        let { autoHide } = this.props
        this.onChange(date)
        let dateStr = this.dateStr(date)
        this.setState({dateStr, error: false})
        let len = date.to.diff(date.from, 'days')
        if (autoHide && len > 0) {
            this.onToggle(true)
        }
    }

    render() {
        let { showBtn, ...rest } = this.props
        let { popupHide, dateStr, error } = this.state
        return (
            <div className="dp-input" ref={this.refElem}>
                <div className={`dp-input__input ${error ? ' --error' : ''}`}>
                    <input 
                        type="text"
                        value={dateStr.from}
                        onChange={this.onInputChange('from')}
                        onFocus={() => this.onToggle(false)}
                    />
                    <input 
                        type="text"
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