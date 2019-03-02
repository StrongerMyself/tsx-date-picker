import * as React from 'react'
import moment from 'moment'
import { Range } from '../select'
import Popup from '../popup/popup'

interface Props {
    value?: string[]
    format?: string
    showBtn?: React.ReactNode | string
    autoHide?: boolean
    onChange?: (value: string[]) => void
    disablePast?: boolean
    disableFuture?: boolean
}

interface State {
    innerValue: string[]
    popupHide: boolean
    error: boolean
}

class InputRange extends React.Component<Props, State> {

    static defaultProps = {
        value: [],
        format: 'DD-MM-YYYY',
        showBtn: '#',
        autoHide: false,
        onChange: (value) => {},
        disablePast: false,
        disableFuture: false,
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    state = {
        innerValue: this.props.value,
        popupHide: true,
        error: false,
    }

    onChange = (innerValue: string[] = []) => {
        let { error } = this.state
        let val_0 = innerValue[0] || ''
        let val_1 = innerValue[1] || ''
        if (val_0 || val_1) {
            error = this.invalidInnerValue(val_0)
            error = error || this.invalidInnerValue(val_1)
        } else {
            error = false
        }
        innerValue = error ? innerValue : this.sortValue([val_0, val_1])
        this.setState({innerValue, error}, () => {
            if (!error) {
                this.props.onChange(innerValue)
            }
        })
    }

    sortValue = (value) => {
        let { format } = this.props
        let date = [moment(value[0], format), moment(value[1], format)]
        if (date[0].isAfter(date[1])) {
            return [date[1].format(format), date[0].format(format)]
        }
        return value
    }
    
    invalidInnerValue = (value: string): boolean => {
        let { format, disablePast, disableFuture } = this.props

        if (!value) value = ''
        
        let date = moment(value, format)
        let validDate = (date.format() === 'Invalid date')
        let validLen = value.length !== format.length
        
        let now = moment().format('YYYY-MM-DD')
        let pastState = disablePast ? date.isBefore(now) : false
        let futureState = disableFuture ? date.isAfter(now) : false

        return (validDate || validLen || pastState || futureState)
    }

    onInputChange = (index: number = null) =>  (e) => {
        let { value } = e.target
        let { innerValue } = this.state
        innerValue[index] = value
        this.onChange(innerValue)
    }

    onGridChange = (date: moment.Moment[]) => {
        let { format, autoHide } = this.props
        let value_0 = date[0].format(format)
        let value_1 = date[1].format(format)
        this.onChange([value_0, value_1])
        if (autoHide) {
            this.onTogglePopup(true)
        }
    }

    getValidDate = () => {
        let { format } = this.props
        let { innerValue } = this.state
        let date = []
        for (let i = 0; i < 2; i++) { 
            let invalidInnerValue = this.invalidInnerValue(innerValue[i])
            if (invalidInnerValue) {
                date.push(null)
            } else {
                date.push(moment(innerValue[i], format))
            }
        }
        return date
    }

    onTogglePopup = (state = !this.state.popupHide) => {
        this.setState({popupHide: state})
    }

    render() {
        let { showBtn, format, disableFuture, disablePast  } = this.props
        let { innerValue, popupHide, error } = this.state
        let date = this.getValidDate()
        return (
            <div className="dp-input --single" ref={this.refElem}>
                <div className={`dp-input__input ${error ? ' --error' : ''}`}>
                    <input 
                        type="text"
                        placeholder={format}
                        value={innerValue[0] || ''}
                        onChange={this.onInputChange(0)}
                        onFocus={() => this.onTogglePopup(false)}
                    />
                    <input 
                        type="text"
                        placeholder={format}
                        value={innerValue[1] || ''}
                        onChange={this.onInputChange(1)}
                        onFocus={() => this.onTogglePopup(false)}
                    />
                    <div
                        className="dp-input__btn"
                        onClick={() => this.onTogglePopup()}
                    >
                        {showBtn}
                    </div>
                </div>
                <Popup
                    refWrap={this.refElem}
                    hide={popupHide}
                    onToggle={this.onTogglePopup} 
                >
                    <Range
                        value={date}
                        onChange={this.onGridChange}
                        disablePast={disableFuture}
                        disableFuture={disablePast}
                    />
                </Popup>
            </div>
        )
    }
}

export default InputRange