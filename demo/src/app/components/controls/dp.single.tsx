import * as React from 'react'
import moment from 'moment'
import * as DatePicker from '../../../../../package'
import Icon, { IconList } from '../icon/icon'

type Value = moment.Moment

interface Props {
	value?: Value
	format?: string
	onChange?: (value: Value) => void
	disablePast?: boolean
	disableFuture?: boolean
}

class DpSingle extends React.Component<Props, {}> {

	static defaultProps = {
		onChange: (value) => {}
	}

	render() {
		let { value, format, onChange, disablePast, disableFuture } = this.props
		return (
			<DatePicker.Single
				value={value}
				format={format}
				onChange={onChange}
				disablePast={disablePast}
				disableFuture={disableFuture}
				leftBtn={
					<Icon className="left" icon={IconList.arr}/>
				}
				rightBtn={
					<Icon className="right" icon={IconList.arr}/>
				}
			/>
		)
	}
}

export default DpSingle