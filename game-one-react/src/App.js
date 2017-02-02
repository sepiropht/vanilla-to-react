import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Move: { up: -4, left: -1, down: 4, right: 1 },
      order: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
        .sort(function() {
          return Math.random() - .5;
        })
        .concat(0),
      hole: 15,
    };
    // const draw = () => {
    //     for (let i = 0, tile; tile = box.childNodes[i], i < 16; i++) {
    //         tile.textContent = this.state.order[i];
    //         tile.style.visibility = this.state.order[i]
    //             ? 'visible'
    //             : 'hidden';
    //     }
    // };
    if (!this.solvable(this.state.order)) this.swap(0, 1);
    //const box = document.body.appendChild(document.createElement('div'));
    // for (let i = 0; i < 16; i++)
    //     box.appendChild(document.createElement('div'));
    // this.render();
    //draw();
  }
  isCompleted() {
    return !this.state.order.some(function(item, i) {
      return item > 0 && item - 1 !== i;
    });
  }
  go(move) {
    const index = this.state.hole + move;
    if (!this.state.order[index]) return false;
    if (move === this.state.Move.left || move === this.state.Move.right)
      if (Math.floor(this.state.hole / 4) !== Math.floor(index / 4))
        return false;
    this.swap(index, this.state.hole);
    //this.state.hole = index;
    this.setState({ hole: index });
    return true;
  }
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (
        this.go(
          this.state.Move[({
            39: 'left',
            37: 'right',
            40: 'up',
            38: 'down',
          })[e.keyCode]],
        )
      ) {
        //draw()
        //this.render();
        if (this.isCompleted()) {
          //box.style.backgroundColor = 'gold';
          window.removeEventListener('keydown', arguments.callee);
        }
      }
    });
  }

  swap(i1, i2) {
    const t = this.state.order[i1];
    let arr = this.state.order;
    arr[i1] = this.state.order[i2];
    arr[i2] = t;

    this.setState({ order: arr });
  }
  solvable(a) {
    for (var kDisorder = 0, i = 1, len = a.length - 1; i < len; i++)
      for (let j = i - 1; j >= 0; j--)
        if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2);
  }

  render() {
    const renderBoxContent = () => this.state.order.map(order => {
      if (order) return <div className="tile" key={order}> {order} </div>;
      return <div className="tile hidden" key={order}> {order} </div>;
    });

    return (
      <div className="box">
        {renderBoxContent()}
      </div>
    );
  }
}

export default App;
