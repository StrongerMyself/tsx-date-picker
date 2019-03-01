import * as React from 'react'

const withContextConsumer = (Context) => (Component) => (props) => {
	return (
		<Context.Consumer>
			{ctxt => (
				<Component
					{...props}
					{...ctxt}
				/>
			)}
		</Context.Consumer>
	)
}

export { withContextConsumer }