import * as React from 'react'

import Grid, { Props as GridProps } from './grid'

interface Props extends GridProps {
    hide: boolean
    refWrap?: React.RefObject<HTMLDivElement>
    onToggle: (state?: boolean) => void
}

class Popup extends React.Component<Props, {}> {

    refPopup: React.RefObject<HTMLDivElement> = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.onClickOutside)
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutside)
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
        str += (hide) ? ' --hide' : ' --show'
        return str
    }

    render() {
        let { hide, refWrap, onToggle, ...rest } = this.props
        return (
            <div className={this.className} ref={this.refPopup}>
                <Grid {...rest}/>
            </div>
        )
    }
}

export default Popup