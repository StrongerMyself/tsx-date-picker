import * as React from 'react'
import moment from 'moment'
import { Grid, Input, Single, Range, Multy, InputRange } from '../../../package'


interface Props {}

interface State {}

class RootComponent extends React.Component<Props, State> {

	static defaultProps = {}

	state = {
		dates: {
			input: '',
			inputRange: [],
			single: moment('2019-02-02'),
			range: [],
			multy: [],
		}
	}

	onChange = (key: string) => (value: any) => {
		let { dates } = this.state
		dates[key] = value
		console.log({value})
		this.setState({dates})
	}

	render() {
		let { dates } = this.state
		return (
			<div>
				{/* <Grid.Component/> */}
				<br/>
				{/* <Input
					value={dates.input}
					onChange={this.onChange('input')}
				/> */}
				<InputRange
					value={dates.inputRange}
					onChange={this.onChange('inputRange')}
				/>
				<br/>
				{/* <Single
					value={dates.single}
					onChange={this.onChange('single')}
				/> */}
				{/* <Range
					value={dates.range}
					onChange={this.onChange('range')}
				/> */}
				{/* <Multy
					value={dates.multy}
					onChange={this.onChange('multy')}
				/> */}
			</div>
		)
	}
}

export default RootComponent