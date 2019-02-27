import * as React from 'react'
import moment from 'moment'

import Popup from './popup'
import { Props as GridProps } from './grid'

interface Props extends GridProps {
    autoHide?: boolean
    showBtn?: React.ReactNode | string
}

interface State {
    popupHide: boolean
    dateStr: string
    error: boolean
}

class InputDatepicker extends React.Component<Props, State> {

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

    onToggle = (state = !this.state.popupHide) => {
        this.setState({popupHide: state})
    }

    onChange = (date) => {
        let { onChange, format } = this.props
        onChange(moment(date), format)
    }

    onInputChange = (e) => {
        let { value } = e.target
        let { error } = this.state
        let { format, disablePast, disableFuture } = this.props
        let date = moment(value, format)
        
        let validDate = (date.format() === 'Invalid date')
        let validLen = value.length !== format.length
        let pastState = disablePast ? this.checkPast(date) : false
        let futureState = disableFuture ? this.checkFuture(date) : false
        let inNotValid = (validDate || validLen || pastState || futureState)
        
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