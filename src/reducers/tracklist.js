import invariant from 'invariant';
import fuzzysearch from 'fuzzysearch';
import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  sortBy: 'name',
  direction: -1,
  filter: '',
  selectedIndex: 0
};

const VALID_SORT_PROPERTIES = ['name', 'artistName', 'length'];

export function createSorter(state) {
  const { direction, sortBy } = state.tracklist;

  invariant(
    VALID_SORT_PROPERTIES.indexOf(sortBy) !== -1,
    `Invalid sort property ${sortBy}`
  );

  return function sorter(a, b) {
    if (typeof a[sortBy] === 'number') {
      return direction * (a[sortBy] - b[sortBy]);
    }
    return direction * a[sortBy].localeCompare(b[sortBy]);
  };
}

function contains(first, second) {
  return fuzzysearch(second.toLowerCase(), first.toLowerCase());
}

export function createFilter(state) {
  const { filter } = state.tracklist;
  return track =>
    contains(track.name, filter) || contains(track.artistName, filter);
}

export default createReducer(initialState, {
  [ActionTypes.FILTER_TRACKS]: (state, action) => {
    return { ...state, filter: action.payload };
  },

  [ActionTypes.SELECT_TRACK]: (state, { payload }) => ({
    ...state,
    selectedIndex: payload
  }),

  [ActionTypes.CHANGE_PLAYLIST]: (state, action) => ({ ...state, filter: '' }),

  [ActionTypes.SORT_TRACKS]: (state, action) => {
    const { property } = action.payload;
    return {
      ...state,
      sortBy: property,
      direction: state.direction * -1,
      selectedIndex: 0
    };
  }
});
