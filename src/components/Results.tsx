import * as React from 'react';

import { IResultProps } from '../interfaces/Interfaces';

class Results extends React.Component<IResultProps> {

    displayRows = () => {
        return this.props.rows.map((row: string, index: number) => (
            <div key={index}>{String(index) + ' - ' + row}</div>
        ));
    }

    displayLeadEnds = () => {
        return this.props.leadEnds.map((leadEnd: string, index: number) => (
            <div key={index}>{String(index + 1) + ' - ' + leadEnd}</div>
        ));
    }
    
    displayTruth = () => {
        return this.props.truth ? 'True' : 'False';
    }

    render() {
        return (
            <div>
                {this.props.rows.length > 1 ? this.displayTruth() : null} 
                <br/>
                {this.props.rows.length > 1 ? this.displayRows() : null}
                <br/>
                {this.props.rows.length > 1 ? this.displayLeadEnds() : null}
            </div>
        );
    }
}

export default Results;
