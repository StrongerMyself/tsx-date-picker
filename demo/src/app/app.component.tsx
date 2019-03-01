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
			2: null,
			3: moment(),
			4: { from: moment(), to: moment() },
			5: { from: moment(), to: moment() },
			6: null,
			7: { from: moment(), to: moment() },
			8: moment(),
			9: moment(),
			10: moment(),
			11: null,
			12: { from: moment(), to: moment() },
			13: { from: moment(), to: moment() },
			14: { from: moment(), to: moment() },
			15: null,
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
						<div className="page__tit">DateInput (empty)</div>
						<DPSingle.DatePickerInput
							date={dates[2]}
							onChange={this.onChange(2)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInput (noPast)</div>
						<DPSingle.DatePickerInput
							date={dates[3]}
							onChange={this.onChange(3)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange</div>
						<DPRange.DatePickerInput
							date={dates[4]}
							onChange={this.onChangeRange(4)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange (autoHide)</div>
						<DPRange.DatePickerInput
							date={dates[5]}
							onChange={this.onChangeRange(5)}
							autoHide={true}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange (empty)</div>
						<DPRange.DatePickerInput
							date={dates[6]}
							onChange={this.onChangeRange(6)}
							autoHide={true}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateInputRange (noFuture)</div>
						<DPRange.DatePickerInput
							date={dates[7]}
							onChange={this.onChangeRange(7)}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid</div>
						<DPSingle.Datepicker
							date={dates[8]}
							onChange={this.onChange(8)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid (notPast)</div>
						<DPSingle.Datepicker
							date={dates[9]}
							onChange={this.onChange(9)}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid (notFuture)</div>
						<DPSingle.Datepicker
							date={dates[10]}
							onChange={this.onChange(10)}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateGrid (empty)</div>
						<DPSingle.Datepicker
							date={dates[11]}
							onChange={this.onChange(11)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid</div>
						<DPRange.Datepicker
							date={dates[12]}
							onChange={this.onChangeRange(12)}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid (noPast)</div>
						<DPRange.Datepicker
							date={dates[13]}
							onChange={this.onChangeRange(13)}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid (notFuture)</div>
						<DPRange.Datepicker
							date={dates[14]}
							onChange={this.onChangeRange(14)}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">DateRangeGrid (empty)</div>
						<DPRange.Datepicker
							date={dates[15]}
							onChange={this.onChangeRange(15)}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default AppComponent