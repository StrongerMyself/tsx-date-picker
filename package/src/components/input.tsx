import * as React from 'react'
import moment from 'moment'

import Popup from './popup'
import { GridProps } from './grid'

interface Props extends GridProps {
    errMsg?: string
    autoHide?: boolean
}

interface State {
    popupHide: boolean
    date: moment.Moment
    dateStr: string
    error: boolean
}

class InputDatepicker extends React.Component<Props, State> {

    static defaultProps = {
        format: 'DD-MM-YYYY'
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    inputValue: string = ''
    inputError: boolean = false
    
    initDate = () => {
        let { date } = this.props
        if (!moment.isMoment(date)) {
            date = date ? moment(date) : moment()
        }
        return date
    }
    
    initDateStr = () => {
        let date = this.initDate()
        return date.format(this.props.format)
    }

    state = {
        popupHide: true,
        error: false,
        date: this.initDate(),
        dateStr: this.initDateStr()
    }

    onToggle = (state = !this.state.popupHide) => {
        console.log()
        this.setState({popupHide: state})
    }

    onChange = (inDate) => {
        let date = moment(inDate)
        let dateStr = date.format(this.props.format)
        let error = false
        if (dateStr !== 'Invalid date') {
            this.props.onChange(dateStr, this.props.format)
        } else {
            date = this.state.date
            dateStr = this.state.dateStr
            error = true
        }
        this.setState({date, dateStr, error})
    }

    onInputChange = (e) => {
        let dateStr = e.target.value
        let { format } = this.props
        if (dateStr.length === format.length) {
            let date = moment(dateStr, format)
            this.onChange(date)
        } else {
            this.setState({error: true, dateStr})
        }
    }

    onPopupChange = (inDate) => {
        let { autoHide } = this.props
        this.onChange(inDate)
        if (autoHide) {
            this.onToggle(false)
        }
    }

    render() {
        let { format, errMsg, disablePast } = this.props
        let { popupHide, date, dateStr, error } = this.state
        return (
            <div className="dp-input" ref={this.refElem}>
                <div className="fieldInput">
                    <div className={`_input ${error ? '--error' : ''}`}>
                        <input 
                            type="text" 
                            value={dateStr} 
                            onChange={this.onInputChange}
                            onFocus={() => this.onToggle(false)}
                        />
                        <div className="_btn" onClick={() => this.onToggle()}>
                            {'#'}
                        </div>
                        { errMsg && error ? <span className="_error-message">{errMsg}</span> : '' }
                    </div>
                </div>
                <Popup
                    date={date} 
                    refWrap={this.refElem}
                    hide={popupHide}
                    onChange={this.onChange}
                    onToggle={() => this.onToggle()} 
                    format={format}
                    disablePast={disablePast}
                />
            </div>
        )
    }
}

export default InputDatepicker