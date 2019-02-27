import * as React from 'react'

export interface Props {
    hide: boolean
    refWrap?: React.RefObject<HTMLDivElement>
    onToggle: (state?: boolean) => void
}

export interface State {}

export class Component<P extends Props, S extends State> extends React.Component<P, S> {

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
}
