import * as React from 'react'
import moment from 'moment'
import Datepicker, { DatePickerInput } from '../../../package'

interface IProps {}

interface IState {
	[x: string]: moment.Moment
}

class AppComponent extends React.Component<IProps, IState> {

	state = {
		date: moment(),
		dateNotPast: moment(),
		dateNotFuture: moment(),
		dateInput: moment(),
		dateInputAutoHide: moment(),
	}

	onChange = (key = 'date') => (date, format) => {
		this.setState({[key]: moment(date, format)})
	}

	render() {
		let { date, dateNotPast, dateNotFuture, dateInput, dateInputAutoHide } = this.state
		return (
			<div className="page">
				<div className="page__body">
					<div className="page__row">
						<div className="page__tit">date</div>
						<Datepicker
							date={date}
							onChange={this.onChange('date')}
							/>
					</div>
					<div className="page__row">
						<div className="page__tit">dateNotPast</div>
						<Datepicker
							date={dateNotPast}
							onChange={this.onChange('dateNotPast')}
							disablePast={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">dateNotFuture</div>
						<Datepicker
							date={dateNotFuture}
							onChange={this.onChange('dateNotFuture')}
							disableFuture={true}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">dateInput</div>
						<DatePickerInput
							date={dateInput}
							onChange={this.onChange('dateInput')}
						/>
					</div>
					<div className="page__row">
						<div className="page__tit">dateInputAutoHide</div>
						<DatePickerInput
							date={dateInputAutoHide}
							onChange={this.onChange('dateInputAutoHide')}
							autoHide={true}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default AppComponent