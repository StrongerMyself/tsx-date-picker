import * as React from 'react'

import { BasePopup } from '../_shared'
import Grid, { Props as GridProps } from './grid'

interface Props extends BasePopup.Props, GridProps {}

class Popup extends BasePopup.Component<Props, {}> {
    render() {
        let { hide, refWrap, onToggle, ...rest } = this.props
        return (
            <div className={`${this.className} --range`} ref={this.refPopup}>
                <Grid {...rest}/>
            </div>
        )
    }
}

export default Popup