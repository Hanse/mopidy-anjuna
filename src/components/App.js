var React = require('react');
var Tracklist = require('./Tracklist');
var PlayerControls = require('./PlayerControls');
var Header = require('./Header');
var Playlists = require('./Playlists');
var Loader = require('./Loader');

var ConnectionStore = require('../stores/ConnectionStore');
var AlbumCoverStore = require('../stores/AlbumCoverStore');

var App = React.createClass({

  getInitialState: function() {
    return {
      connected: ConnectionStore.isConnected(),
      coverURL: AlbumCoverStore.getCoverURL()
    };
  },

  componentDidMount: function() {
    ConnectionStore.addChangeListener(this.update);
    AlbumCoverStore.addChangeListener(this.update);
  },

  componentWillUnmount: function() {
    ConnectionStore.removeChangeListener(this.update);
    AlbumCoverStore.removeChangeListener(this.update);
  },

  update: function() {
    this.setState({
      connected: ConnectionStore.isConnected(),
      coverURL: AlbumCoverStore.getCoverURL()
    });
  },

  render: function() {
    return (
      <Loader loading={!this.state.connected} text='Connecting...'>
        <div>
          <Header />
          <main>
            <aside>
              <Playlists />
            </aside>
            <section>
              <Tracklist />
            </section>
          </main>
          <footer>
            <img src={this.state.coverURL} alt='' />
            <PlayerControls />
          </footer>
        </div>
      </Loader>
    );
  }
});

module.exports = App;
