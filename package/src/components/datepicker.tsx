import * as React from 'react'
import Grid, { GridProps } from './grid/grid'

interface Props extends GridProps {}

interface State {}

class Datepicker extends React.Component<Props, State> {

    render() {
        let { ...rest } = this.props
        return (
            <div className="dp">
                <Grid {...rest}/>
            </div>
        )
    }
}

export default Datepicker