
import React from 'react';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: ['A', 'B', 'C', 'D']
    }
  }

  render() {
            return(
            <div className="score bg__dark p-1 font__light-thick" >
                <h1>Postępy w grze</h1>
                <ol reversed>
                    <li className="milestone">1000000</li>
                    <li>500000</li>
                    <li>250000</li>
                    <li>125000</li>
                    <li>75000</li>
                    <li className="milestone">40000</li>
                    <li>20000</li>
                    <li>10000</li>
                    <li>5000</li>
                    <li>2000</li>
                    <li className="milestone">1000</li>
                    <li>500</li>
                </ol>
            </div>
            );
        };
    }