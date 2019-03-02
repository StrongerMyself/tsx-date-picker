import * as React from 'react'
import moment from 'moment'

export interface IGridContext {
	onSetView?: () => void
	onClickDay?: (date: moment.Moment) => void
	onRender?: (
        ref: React.RefObject<HTMLDivElement>,
        setView: (date: moment.Moment) => void
    ) => void
}

export const GridDefCtxt: IGridContext = {
    onSetView: () => {},
    onClickDay: (date) => {},
    onRender: (
        ref = { current: null },
        setView = (date) => {}
    ) => {},
}

const GridContext = React.createContext<IGridContext>(GridDefCtxt)

export default GridContext