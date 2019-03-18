import * as React from 'react'

interface Props {
    prefix: string
    hide: boolean
    refWrap?: React.RefObject<HTMLDivElement>
    onToggle: (state?: boolean) => void
}

interface State {}

class Popup extends React.Component<Props, State> {

    static defaultProps = {
        prefix: ''
    }

    refPopup: React.RefObject<HTMLDivElement> = React.createRef()
    isInitEvent: boolean = false

    componentDidMount() {
        this.toggleEvent()
    }
    
    componentWillUnmount() {
        this.toggleEvent(true)
    }

    componentDidUpdate(prevProps) {
        let { hide } = this.props
        if (hide !== prevProps.hide) {
            this.toggleEvent()
        }
    }

    toggleEvent = (hide = this.props.hide) => {
        if (!hide) {
            document.addEventListener('mousedown', this.onClickOutside)
            this.isInitEvent = true
        } else {
            document.removeEventListener('mousedown', this.onClickOutside)
            this.isInitEvent = false
        }
    }

    onClickOutside = (e) => {
        let { hide, refWrap, onToggle } = this.props
        let outSideRef = refWrap ? refWrap.current : this.refPopup.current
        let containState = outSideRef.contains(e.target)
        if(!hide && !containState) {
            onToggle(true)
        }
    }

    get className() {
        let { hide } = this.props
        let str = 'dp-popup'
        str += (hide) ? ' dp-popup--hide' : ' dp-popup--show'
        return str
    }

    render() {
        let { prefix, children } = this.props
        return (
            <div 
                className={`${this.className} ${prefix}`} 
                ref={this.refPopup}
            >
                {children}
            </div>
        )
    }
}

export default Popup
