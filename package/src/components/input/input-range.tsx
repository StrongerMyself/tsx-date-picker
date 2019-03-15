import * as React from 'react'
import moment from 'moment'
import { Range } from '../select'
import Popup from '../popup/popup'

interface Props {
    className?: string
    value?: string[]
    format?: string
    showBtn?: React.ReactNode | string
    autoHide?: boolean
    onChange?: (value: string[]) => void
    onChangeAfterHide?: (value: string[]) => void
    disablePast?: boolean
    disableFuture?: boolean
    leftBtn?: React.ReactNode | string
    rightBtn?: React.ReactNode | string
    resetBtn?: React.ReactNode | string
    separate?: React.ReactNode | string
}

interface State {
    innerValue: string[]
    popupHide: boolean
    error: boolean
}

class InputRange extends React.Component<Props, State> {

    static defaultProps = {
        className: '',
        value: [],
        format: 'DD-MM-YYYY',
        showBtn: '#',
        autoHide: false,
        onChange: (value) => {},
        onHide: (value) => {},
        disablePast: false,
        disableFuture: false,
        separate: '',
    }

    refElem: React.RefObject<HTMLDivElement> = React.createRef()

    state = {
        innerValue: this.props.value,
        popupHide: true,
        error: false,
    }

    onChange = (value: string[] = []) => {
        let { innerValue, error } = this.prepareValue(value)
        this.setState({ innerValue, error }, () => {
            if (!error) {
                this.props.onChange(innerValue)
            }
        })
    }

    onChangeAfterHide = (value: string[] = []) => {
        let { innerValue, error } = this.prepareValue(value)
        this.setState({ innerValue, error }, () => {
            if (!error) {
                this.props.onChangeAfterHide(innerValue)
            }
        })
    }

    prepareValue = (innerValue: string[] = []) => {
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
        return { innerValue, error }
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
            if (value_0 !== value_1) {
                setTimeout(() => {
                    this.onTogglePopup(true)
                }, 100)
            }
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
        let { onChangeAfterHide } = this.props
        if (state === true && !!onChangeAfterHide) {
            this.onChangeAfterHide(this.state.innerValue)
        }
        this.setState({popupHide: state})
    }

    onClickReset = (e) => {
        e.preventDefault()
        let innerValue = ['', '']
        this.setState({ innerValue, error: false, popupHide: true }, () => {
            this.props.onChange(innerValue)
            setTimeout(() => {
                this.setState({popupHide: true })
            }, 100)
        })
    }

    render() {
        let { className, showBtn, format, disableFuture, disablePast, leftBtn, rightBtn, resetBtn, separate } = this.props
        let { innerValue, popupHide, error } = this.state
        let date = this.getValidDate()
        return (
            <div className={`dp-input --range ${className}`} ref={this.refElem}>
                <div className={`dp-input__input ${error ? ' --error' : ''}`}>
                    <input 
                        type="text"
                        placeholder={format}
                        value={innerValue[0] || ''}
                        onChange={this.onInputChange(0)}
                        onFocus={() => this.onTogglePopup(false)}
                    />
                    {separate}
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
                    {(resetBtn && date && (date[0] || date[1])) && (
                        <div
                            className="dp-input__reset"
                            onClick={this.onClickReset}
                        >
                            {resetBtn}
                        </div>
                    )}
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
                        leftBtn={leftBtn}
                        rightBtn={rightBtn}
                    />
                </Popup>
            </div>
        )
    }
}

export default InputRange