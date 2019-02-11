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
		dateInput: moment(),
	}

	onChange = (key = 'date') => (date, format) => {
		console.log({key, date})
		this.setState({[key]: moment(date, format)})
	}

	render() {
		let { date, dateInput } = this.state
		return (
			<div className="page">
				<div className="page__body">
					<div className="page__row">
						<Datepicker
							date={date}
							onChange={this.onChange('date')}
						/>
					</div>
					<div className="page__row">
						<DatePickerInput
							date={dateInput}
							onChange={this.onChange('dateInput')}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default AppComponent