import React from 'react';
import classNames from 'classnames';
import TracklistActions from '../actions/TracklistActions';
import TracklistStore from '../stores/TracklistStore';
import connectToStores from '../utils/connectToStores';
import ListTrackItem from './ListTrackItem';

class Tracklist extends React.Component {

  _onFilterTracks(event) {
    event.preventDefault();
    TracklistActions.filterTracks(event.target.value);
  }

  _onSort(property) {
    TracklistActions.sortTracks(property);
  }

  _onTrackClick(track, unplayable) {
    if (unplayable) return;
    TracklistActions.enqueueTrack(track);
  }

  render() {
    return (
      <div>
        <div className='tracklist-filter'>
          <input
            type='search'
            placeholder='Filter tracks'
            onChange={this._onFilterTracks.bind(this)}
          />
        </div>
        <ul className='tracklist'>
          <li className='tracklist-header'>
            <span onClick={this._onSort.bind(this, 'name')}>Track</span>
            <span onClick={this._onSort.bind(this, 'artistName')}>Artist</span>
            <span onClick={this._onSort.bind(this, 'length')}>Time</span>
          </li>

          {this.props.tracks.map((track, i) => {

            let active = track.uri === this.props.currentTrack.uri;
            let unplayable = track.name.slice(0, 12) === '[unplayable]';

            return (
              <ListTrackItem
                key={'track' + i}
                active={active}
                track={track}
                unplayable={unplayable}
                onDoubleClick={this._onTrackClick.bind(this, track, unplayable)}
              />
            );
          })}
        </ul>
        </div>
    );
  }
}

Tracklist = connectToStores(Tracklist, [TracklistStore], props => TracklistStore.getState());

export default Tracklist;
