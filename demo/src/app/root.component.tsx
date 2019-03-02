import * as React from 'react'
import moment from 'moment'
import { Input, Single, Range, Multy, InputRange } from '../../../package'

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
		this.setState({dates})
	}

	render() {
		let { dates } = this.state
		return (
			<div className="page">
				<div className="page__body">
					<div className="page__row">
						<div className="page__tit">Input</div>
						<Input
							value={dates.input}
							onChange={this.onChange('input')}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">Input Range</div>
						<InputRange
							value={dates.inputRange}
							onChange={this.onChange('inputRange')}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">Single</div>
						<Single
							value={dates.single}
							onChange={this.onChange('single')}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">Range</div>
						<Range
							value={dates.range}
							onChange={this.onChange('range')}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">Multy</div>
						<Multy
							value={dates.multy}
							onChange={this.onChange('multy')}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">Disable past or future</div>
						<Multy
							value={dates.multy}
							onChange={this.onChange('multy')}
							disableFuture={true}
							disablePast={true}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default RootComponent