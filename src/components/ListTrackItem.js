import React, { Component } from 'react';
import classNames from 'classnames';
import { formatArtists, convertTime } from '../helpers';

export default class ListTrackItem extends Component {
  render() {
    let track = this.props.track;
    let classes = classNames({
      ListTrackItem: true,
      active: this.props.active,
      unplayable: this.props.unplayable,
      selected: this.props.selected
    });

    return (
      <li {...this.props} className={classes}>
        <span>
          {this.props.active ? <i className="fa fa-volume-up" /> : ''}{' '}
          {track.name.replace('[unplayable] ', '')}
        </span>
        <span className="artist-name">{formatArtists(track.artists)}</span>
        <span className="track-length">{convertTime(track.length)}</span>
      </li>
    );
  }
}
