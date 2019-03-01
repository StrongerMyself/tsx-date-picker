import * as React from 'react'
import moment from 'moment'

interface Props {}

class WeekGrid extends React.Component<Props, {}> {

    static defaultProps = {}

    renderItems() {
        let outElem = []
        for (let i = 1; i < 8; i++) {
            let val = moment.weekdaysShort(i)
            let className = 'dp-blockCell --week'
            outElem.push(
                <div 
                    key={i}
                    className={className}
                >{val}</div>
            )
        }
        return outElem
    }

    render() {
        return (
            <>
                {this.renderItems()}
            </>
        )
    }
}

export default WeekGrid