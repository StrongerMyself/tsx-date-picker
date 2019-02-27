import * as React from 'react'
import moment from 'moment'
import * as DPSingle from '../../../package/single'
import * as DPRange from '../../../package/range'

interface IProps {}

interface IState {
	[x: string]: any
}

class AppComponent extends React.Component<IProps, IState> {

	state = {
		dates: {
			0: moment(),
			1: moment(),
			2: moment(),
			3: { from: moment(), to: moment() },
			4: { from: moment(), to: moment() },
			5: moment(),
			6: moment(),
			7: moment(),
			8: { from: moment(), to: moment() },
			9: { from: moment(), to: moment() },
			10: { from: moment(), to: moment() },
		},
	}

	onChange = (key) => (dateIn, format) => {
		let { dates } = this.state
		let date = moment(dateIn, format)
		dates[key] = date
		this.setState({dates})
	}

	onChangeRange = (key) => (dateIn, format) => {
		let { dates } = this.state
		let date = {
			from: moment(dateIn.from, format),
			to: moment(dateIn.to, format),
		}
		dates[key] = date
		this.setState({dates})
	}

	render() {
		let { dates } = this.state
		return (
			<div className="page">
				<div className="page__body">
					<div className="page__row">
						<div className="page__tit">DateInput</div>
						<DPSingle.DatePickerInput
							date={dates[0]}
							onChange={this.onChange(0)}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInput (autoHide)</div>
						<DPSingle.DatePickerInput
							date={dates[1]}
							onChange={this.onChange(1)}
							autoHide={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange</div>
						<DPRange.DatePickerInput
							date={dates[3]}
							onChange={this.onChangeRange(3)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange (autoHide)</div>
						<DPRange.DatePickerInput
							date={dates[4]}
							onChange={this.onChangeRange(4)}
							autoHide={true}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid</div>
						<DPSingle.Datepicker
							date={dates[5]}
							onChange={this.onChange(5)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid (notPast)</div>
						<DPSingle.Datepicker
							date={dates[6]}
							onChange={this.onChange(6)}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid (notFuture)</div>
						<DPSingle.Datepicker
							date={dates[7]}
							onChange={this.onChange(7)}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid </div>
						<DPRange.Datepicker
							date={dates[8]}
							onChange={this.onChangeRange(8)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid (noPast)</div>
						<DPRange.Datepicker
							date={dates[9]}
							onChange={this.onChangeRange(9)}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid (notFuture)</div>
						<DPRange.Datepicker
							date={dates[10]}
							onChange={this.onChangeRange(10)}
							disableFuture={true}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default AppComponent