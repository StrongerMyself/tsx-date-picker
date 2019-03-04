import * as React from 'react'
import * as DatePicker from '../../../../../package'
import Icon, { IconList } from '../icon/icon'

type Value = string[]

interface Props {
	value?: Value
	format?: string
	onChange?: (value: Value) => void
	disablePast?: boolean
	disableFuture?: boolean
}

class DpRangeInput extends React.Component<Props, {}> {

	static defaultProps = {
		onChange: (value) => {}
	}

	render() {
		let { value, format, onChange, disablePast, disableFuture } = this.props
		return (
			<DatePicker.InputRange
				value={value}
				format={format}
				onChange={onChange}
				disablePast={disablePast}
				disableFuture={disableFuture}
				showBtn={
					<Icon icon={IconList.calendar}/>
				}
				leftBtn={
					<Icon className="--left" icon={IconList.arr}/>
				}
				rightBtn={
					<Icon className="--right" icon={IconList.arr}/>
				}
				// separate={<span className="dp-separate">-</span>}
			/>
		)
	}
}

export default DpRangeInput
