import * as React from 'react'
import moment from 'moment'

import { BaseInput } from '../_shared'
import Popup from './popup'
import { Props as GridProps } from './grid'

interface Props extends BaseInput.Props, GridProps {}

interface State extends BaseInput.State {
    dateStr: string
}
class InputDatepicker extends BaseInput.Component<Props, State> {

    static defaultProps = {
        date: moment(),
        format: 'DD-MM-YYYY',
        showBtn: '#'
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    dateStr(date = this.props.date) {
        let { format } = this.props
        return date.format(format)
    }

    state = {
        popupHide: true,
        dateStr: this.dateStr(),
        error: false
    }

    onChange = (date) => {
        let { onChange, format } = this.props
        onChange(moment(date), format)
    }

    onInputChange = (e) => {
        let { value } = e.target
        let { error } = this.state
        let { format } = this.props
        let date = moment(value, format)
        let inNotValid = this.validInputChange(date, value)
        if (inNotValid) {
            error = true
        } else {
            this.onChange(date)
            error = false
        }
        this.setState({dateStr: value, error})
    }

    onPopupChange = (date) => {
        let { autoHide } = this.props
        this.onChange(date)
        let dateStr = this.dateStr(date)
        this.setState({dateStr, error: false})
        if (autoHide) {
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
                        value={dateStr}
                        onChange={this.onInputChange}
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