import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

/**
 * Queue reducer
 *
 * Holds the tracks that are currently in the play queue.
 */
export default createReducer([], {
  [ActionTypes.TRACKLIST_RECEIVED]: (state, { payload }) => payload
});