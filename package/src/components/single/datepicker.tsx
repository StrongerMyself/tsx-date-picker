import * as React from 'react'
import Grid, { Props as GridProps } from './grid'

interface Props extends GridProps {}

interface State {}

class DatepickerSingle extends React.Component<Props, State> {

    render() {
        let { ...rest } = this.props
        return (
            <div className="dp --single">
                <Grid {...rest}/>
            </div>
        )
    }
}

export default DatepickerSingle