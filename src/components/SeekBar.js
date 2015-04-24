import React from 'react';
import { convertTime } from '../helpers';

class SeekBar extends React.Component {

  static defaultProps = {
    track: {}
  }

  interval = null

  constructor(props) {
    super(props);
    this.state = {
      timePosition: props.initialTimePosition,
      isSeeking: false
    };
  }

  tick = () => {
    this.setState({
      timePosition: this.state.timePosition + 1000
    });
  }

  start = () => {
    this.interval = setInterval(this.tick, 1000);
  }

  stop = () => {
    clearInterval(this.interval);
  }

  restart = () => {
    this.stop();
    this.setState({ timePosition: 0 });
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props', nextProps);
    if (nextProps.track.uri !== this.props.track.uri) {
      this.restart();
    }

    if (!nextProps.isPlaying) {
      this.stop();
    }

    this.setState({ timePosition: nextProps.initialTimePosition });
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  _onChange(e) {
    let ms = (e.target.value | 0) * this.props.track.length / 100;
    this.setState({ timePosition: ms });
    this.props.onMove(ms);
  }

  render() {
    return (
      <div className='seekbar'>
        <span>{convertTime(this.state.timePosition)}</span>
        <input
          type='range'
          value={(this.state.timePosition / this.props.track.length) * 100}
          style={{width: '100%'}}
          onChange={this._onChange.bind(this)}
        />
        <span>{convertTime(this.props.track.length)}</span>
      </div>
    );
  }
}

export default SeekBar;
