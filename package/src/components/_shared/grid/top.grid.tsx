import * as React from 'react'
import moment from 'moment'

interface Props {
    viewDate: moment.Moment
    onClickArr: (i: number) => void
    toggleView: () => void
    leftBtn: React.ReactNode
    rightBtn: React.ReactNode
}

class TopGrid extends React.Component<Props, {}> {

    static defaultProps = {
        leftBtn: '<',
        rightBtn: '>',
    }

    render() {
        let { viewDate, onClickArr, toggleView, leftBtn, rightBtn } = this.props
        let month = viewDate.month()
        let monthStr = moment.months(month)
        let year = viewDate.year()
        return (
            <div className="dp-blockTop">
                <div className="dp-blockTop__arr" onClick={() => onClickArr(-1)}>
                    {leftBtn}
                </div>
                <div onClick={() => toggleView()}>
                    <div className="dp-blockTop__tit --dayLayer">{monthStr} {year}</div>
                    <div className="dp-blockTop__tit --monthLayer">{year}</div>
                </div>
                <div className="dp-blockTop__arr" onClick={() => onClickArr(1)}>
                    {rightBtn}
                </div>
            </div>
        )
    }
}

export default TopGrid