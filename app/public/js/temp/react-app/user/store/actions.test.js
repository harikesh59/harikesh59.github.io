import test from 'tape';
import faker from 'faker';
import * as actions from './actions';

const id_1 = '123';
const id_2 = '456';
const created_by = 'me';
const created_on = 'today';


test('create campaign action : createCampaign action creator should create an action object', ({deepEqual, end}) => {
  let title = faker.lorem.sentence();
  let description = faker.lorem.sentences();

  const actualAction = actions.createCampaign(id_1, title, description);
  const expectedAction = {
    type: 'CREATE_CAMPAIGN',
    payload: {
      _id:id_1,
      title,
      description,
      created_on,
      created_by,
      comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }

  deepEqual(actualAction, expectedAction);
  end();
});

test('update campaign action : updateCampaign action creator should create an action object', ({deepEqual, end}) => {
  let id = '123';
  let title = faker.lorem.sentence();
  let description = faker.lorem.sentences();

  const actualAction = actions.updateCampaign(id_1, title, description);
  const expectedAction = {
    type: 'UPDATE_CAMPAIGN',
    payload: {
      _id:id_1,
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

  deepEqual(actualAction, expectedAction);
  end();
});

test('create comment action : createChildComment action creator should create an action object', ({deepEqual, end}) => {
  let text = faker.lorem.sentence();

  //pass comment id as id_1
  //and campaign id also as id_1
  //and parent_comment also as id_1
  // createChildComment(comment, campaign, parent_comment, text)
  const actualAction = actions.createChildComment(id_1, id_1, id_1, text);
  const expectedAction = {
    type: 'CREATE_CHILD_COMMENT',
    payload: {
      _id: id_1,
      campaign: id_1,
      text,
      created_by,
      created_on,
      parent_comment: id_1,
      children_comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  }

  deepEqual(actualAction, expectedAction);
  end();
});

test('create comment action : createComment action creator should create an action object', ({deepEqual, end}) => {
  let text = faker.lorem.sentence();

  //pass comment id as id_1
  //and campaign id also as id_1
  const actualAction = actions.createComment(id_1, id_1, text);
  const expectedAction = {
    type: 'CREATE_COMMENT',
    payload: {
      _id: id_1,
      campaign: id_1,
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

  deepEqual(actualAction, expectedAction);
  end();
});

test('update comment action : updateComment action creator should create an action object', ({deepEqual, end}) => {
  let text = faker.lorem.sentence();

  const actualAction = actions.updateComment(id_1, id_1, text);
  const expectedAction = {
    type: 'UPDATE_COMMENT',
    payload: {
      _id: id_1,
      campaign: id_1,
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

  deepEqual(actualAction, expectedAction);
  end();
});
