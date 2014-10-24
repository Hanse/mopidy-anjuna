/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-router');
var {Routes, Route, DefaultRoute, NotFoundRoute} = ReactRouter;

var App = require('./components/App');

React.renderComponent((
  <Routes location="history">
    <Route handler={App}>
    </Route>
  </Routes>
), document.getElementById('app'));
