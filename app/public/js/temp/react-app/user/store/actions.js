import {fetchCamapigns} from '../utils/api';
import { startAction, successAction, failureAction, asyncAction } from './actionUtils';


const fetchCampaignsType = 'app/fetchCamapigns';
export const fetchCampaignsStart = startAction(fetchCampaignsType);
export const fetchCampaignsSuccess = successAction(fetchCampaignsType);
export const fetchCampaignsFailure = failureAction(fetchCampaignsType);
export const fetchCampaigns = asyncAction({
  func: () => fetchCampaigns(),
  start: fetchCampaignsStart,
  success: fetchCampaignsSuccess,
  failure: fetchCampaignsFailure,
});


const created_by = 'me';
const created_on = 'today';


export const createCampaign = (id='', title='', description='') => {
  if (!id) throw new Error('Campaign Identifier not found');
  if (!title) throw new Error('Title not found');
  if (!description) throw new Error('Description not found');

  return {
    type: 'CREATE_CAMPAIGN',
    payload: {
      _id: id,
      title,
      description,
      created_by,
      created_on,
      comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }
}

export const updateCampaign = (id='', title='', description='') => {
  return {
    type: 'UPDATE_CAMPAIGN',
    payload: {
      _id: id,
      title,
      description,
      created_by,
      created_on,
      comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }
}

export const createComment = (comment='', campaign='', text='') => {
  if (!comment) throw new Error('Comment Identifier not found');
  if (!campaign) throw new Error('Campaign Identifier not found');
  if (!text) throw new Error('Comment Text not found');

  return {
    type: 'CREATE_COMMENT',
    payload: {
      _id: comment,
      campaign,
      text,
      created_by,
      created_on,
      parent_comment: null,
      children_comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }
}

export const createChildComment = (comment='', campaign='', parent_comment='', text='') => {
  if (!comment) throw new Error('Comment Identifier not found');
  if (!campaign) throw new Error('Campaign Identifier not found');
  if (!parent_comment) throw new Error('Parent Comment Identifier not found');
  if (!text) throw new Error('Comment Text not found');

  return {
    type: 'CREATE_CHILD_COMMENT',
    payload: {
      _id: comment,
      campaign,
      text,
      created_by,
      created_on,
      parent_comment,
      children_comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }
}

export const updateComment = (comment='', campaign='', text='') => {
  return {
    type: 'UPDATE_COMMENT',
    payload: {
      _id: comment,
      campaign,
      text,
      created_by,
      created_on,
      parent_comment: null,
      children_comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }
}
