import * as React from 'react'
import moment from 'moment'
import { Single } from '../select'
import Popup from '../popup/popup'

interface Props {
    value?: string
    format?: string
    showBtn?: React.ReactNode | string
    autoHide?: boolean
    onChange?: (value: string) => void
    disablePast?: boolean
    disableFuture?: boolean
    leftBtn?: React.ReactNode | string
    rightBtn?: React.ReactNode | string
}

interface State {
    innerValue: string
    popupHide: boolean
    error: boolean
}

class Input extends React.Component<Props, State> {

    static defaultProps = {
        value: '',
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

    onChange = (innerValue: string = '') => {
        let { error } = this.state
        if (innerValue !== '') {
            error = this.invalidInnerValue(innerValue)
        } else {
            innerValue = ''
            error = false
        }
        this.setState({innerValue, error}, () => {
            if (!error) {
                this.props.onChange(innerValue)
            }
        })
    }
    
    invalidInnerValue = (value: string): boolean => {
        let { format, disablePast, disableFuture } = this.props
        let date = moment(value, format)

        let validDate = (date.format() === 'Invalid date')
        let validLen = value.length !== format.length
        
        let now = moment().format('YYYY-MM-DD')
        let pastState = disablePast ? date.isBefore(now) : false
        let futureState = disableFuture ? date.isAfter(now) : false

        return (validDate || validLen || pastState || futureState)
    }

    onInputChange = (e) => {
        let { value } = e.target
        this.onChange(value)
    }

    onGridChange = (date: moment.Moment) => {
        let { format, autoHide } = this.props
        let value = date.format(format)
        this.onChange(value)
        if (autoHide) {
            this.onTogglePopup(true)
        }
    }

    getValidDate = () => {
        let { format } = this.props
        let { innerValue } = this.state
        let invalidInnerValue = this.invalidInnerValue(innerValue)
        if (invalidInnerValue) {
            return null
        } else {
            return moment(innerValue, format)
        }
    }

    onTogglePopup = (state = !this.state.popupHide) => {
        this.setState({popupHide: state})
    }

    render() {
        let { showBtn, format, disableFuture, disablePast, leftBtn, rightBtn } = this.props
        let { innerValue, popupHide, error } = this.state
        let date = this.getValidDate()
        return (
            <div className="dp-input --single" ref={this.refElem}>
                <div className={`dp-input__input ${error ? ' --error' : ''}`}>
                    <input 
                        type="text"
                        placeholder={format}
                        value={innerValue}
                        onChange={this.onInputChange}
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
                    <Single
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

export default Input