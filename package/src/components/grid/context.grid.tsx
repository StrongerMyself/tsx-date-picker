import * as React from 'react'
import moment from 'moment'

export interface IGridContext {
	onSetView?: (date: moment.Moment) => void
	onClickDay?: (date: moment.Moment) => void
	onRender?: (ref: React.RefObject<HTMLDivElement>) => void
}

export const GridDefCtxt: IGridContext = {
	onSetView: (date) => {},
    onClickDay: (date) => {},
    onRender: (ref = { current: null }) => {},
}

const GridContext = React.createContext<IGridContext>(GridDefCtxt)

export default GridContext