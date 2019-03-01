import * as React from 'react'
import moment from 'moment'
import { Grid, Single, Range } from '../../../package'


interface Props {}

interface State {}

class RootComponent extends React.Component<Props, State> {

	static defaultProps = {}

	state = {
		dates: {
			single: null,
			range: []
		}
	}

	onChange = (key) => (value: moment.Moment | moment.Moment[] | null) => {
		let { dates } = this.state
		dates[key] = value
		this.setState({dates})
	}

	render() {
		let { dates } = this.state
		return (
			<div>
				{/* <Grid.Component/> */}
				<br/>
				<Single
					value={dates.single}
					onChange={this.onChange('single')}
				/>
				<Range
					value={dates.range}
					onChange={this.onChange('range')}
				/>
			</div>
		)
	}
}

export default RootComponent