var createStore = require('../createStore');

var PlaylistStore = require('./PlaylistStore');
var CurrentlyPlayingStore = require('./CurrentlyPlayingStore');

var _sortBy = null;
var _direction = -1;

function getSortedTracks() {
  var playlist = PlaylistStore.getCurrent();
  if (!playlist) return [];

  var tracklist = playlist.tracks;
  var currentTrack = CurrentlyPlayingStore.getCurrentTrack();
  var tracklist = playlist.tracks.map(function(track) {
    track.artist = track.artists.map(function(artist) {
      return artist.name;
    }).join(', ');
    return track;
  });

  if (_sortBy) {
    tracklist = tracklist.sort(function(a, b) {
      if ('number' === typeof a[_sortBy])
        return _direction * (a[_sortBy] - b[_sortBy]);
      return _direction * a[_sortBy].localeCompare(b[_sortBy]);
    });
  }
  return tracklist;
}

var TracklistStore = createStore({
  getState() {
    return {
      sortBy: _sortBy,
      sortDirection: _direction,
      tracks: getSortedTracks()
    }
  },

  actions: {
    changePlaylist() {
      this.emitChange();
    },

    sortTracks(action) {
      _sortBy = action.sortBy;
      _direction = -_direction;
      this.emitChange();
    }
  }
});

module.exports = TracklistStore;
