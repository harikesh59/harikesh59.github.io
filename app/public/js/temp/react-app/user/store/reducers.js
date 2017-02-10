import { combineReducers } from 'redux';
import {merge, dissoc, prepend, without} from 'ramda';

export const campaignsDB = (state={}, {type, payload, meta, error}) => {
  switch (type) {
    case 'app/fetchCamapigns':
      if (meta.done && !error) {
        return payload.campaigns;
      }
      return state;
      break;
    case 'CREATE_CAMPAIGN':
    case 'UPDATE_CAMPAIGN':
      return merge(state, { [payload._id]: payload })
      break;
    default:
      return state;
  }
}

export const campaignsIds = (state=[], {type, payload, meta, error}) => {
  switch (type) {
    case 'app/fetchCamapigns':
      if (meta.done && !error) {
        return payload.campaignsIds;
      }
      return state;
    case 'CREATE_CAMPAIGN':
      return prepend(payload._id, state)
      break;
    default:
      return state;
  }
}

export const commentsDB = (state={}, {type, payload}) => {
  switch (type) {
    case 'CREATE_COMMENT':
      let campaign = merge({}, state[payload.campaign]);
      campaign.comments.commentsDB[payload._id] = payload;
      return merge(state, { [payload.campaign]: campaign });
      break;
    case 'CREATE_CHILD_COMMENT':
      //you should not mutate the state
      //so get a copy initially
      let newState = merge({}, state);
      let tempComment = payload;
      while (tempComment.parent_comment != null) {
        tempComment = newState[tempComment.parent_comment];
      }
      tempComment.children_comments.commentsDB[payload._id] = payload;
      return newState;
      break;
    default:
      return state;
  }
}

export default combineReducers({
  campaignsDB,
  campaignsIds
});
