import * as React from 'react'
import iconData from './icon.data'

const data = {
	...iconData,
}

export interface IIcon {
	className?: string
	onClick?: (e) => void
	icon: string | IconList
	width?: string
	height?: string
	stroke?: string
	fill?: string
	style?: object
}

class Icon extends React.Component<IIcon> {

	getProps = (item) => {
		let { width, height, stroke, fill, style } = this.props

		width = width || item.width || '0px'
		height = height || item.height || '0px'

		stroke = stroke || item.stroke || 'none'
		fill = fill || item.fill || 'none'
		style = style || item.style || {}
		style = { transition: '0.3s', ...style }

		return {
			svgProp: { width, height },
			pathProp: { style, fill, stroke },
		}
	}

	render() {
		let { className, onClick, icon } = this.props
		let item = data[icon] || {}
		let { viewBox, paths } = item
		let { svgProp, pathProp } = this.getProps(item)
		return (
			<div className={className} onClick={onClick}>
				<svg viewBox={viewBox} {...svgProp}>
					{ paths && (paths.map((el, i) =>
						<path key={i} d={el} {...pathProp} />
					))}
				</svg>
			</div>
		)
	}
}

enum IconList {
	arr = 'arr',
	calendar = 'calendar',
}

export { IconList }
export default Icon