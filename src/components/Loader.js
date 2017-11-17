import React from 'react';

export default class Loader extends React.Component {
  static defaultProps = { loading: false };

  state = { excessiveLoading: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ excessiveLoading: true });
    }, 2000);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="Loader">
          <div className="spinner" />
          <p>
            {this.state.excessiveLoading
              ? 'Not loading? Make sure mopidy is running.'
              : ''}
          </p>
        </div>
      );
    }
    return this.props.children || null;
  }
}
