import test from 'tape';
import faker from 'faker';

import * as actions from './actions';
import * as reducers from './reducers';
import {mockStore} from './testUtils';

const id_1 = '123';
const id_2 = '456';
const created_by = 'me';
const created_on = 'today';


test('campaign reducer | campaignsDB :: Handle createCampaign action', ({deepEqual, end}) => {
  const state = mockStore.withNoCampaign();

  let title = faker.lorem.sentence();
  let description = faker.lorem.sentences();

  const actualState = reducers.campaignsDB(state.campaignsDB, actions.createCampaign(id_1, title, description));
  const expectedState = {
    [id_1]: {
      _id: id_1,
      title,
      description,
      created_on,
      created_by,
      comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  };

  deepEqual(actualState, expectedState);
  end();
});

test('campaign reducer | campaignsIds :: Handle createCampaign action', ({deepEqual, end}) => {
  const state = mockStore.withNoCampaign();

  let title = faker.lorem.sentence();
  let description = faker.lorem.sentences();

  const actualState = reducers.campaignsIds(state.commentsDB, actions.createCampaign(id_1, title, description));
  const expectedState = [id_1];

  deepEqual(actualState, expectedState);
  end();
});

test('campaign reducer | campaignsDB :: Handle updateCampaign action', ({deepEqual, end}) => {
  const state = mockStore.withOneCampaign();

  let title = faker.lorem.sentence();
  let description = faker.lorem.sentences();

  const actualState = reducers.campaignsDB(state.campaignsDB, actions.updateCampaign(id_1, title, description));
  const expectedState = {
    [id_1]: {
      _id: id_1,
      title,
      description,
      created_on: 'today',
      created_by: 'me',
      comments: {
        commentsDB: {},
        commentsIds: []
      }
    }
  };

  deepEqual(actualState, expectedState);
  end();
});

test('comment reducer | commentsDB :: Handle createComment action', ({deepEqual, end}) => {
  const state = mockStore.withOneCampaign();

  let text = faker.lorem.sentence();

  const actualState = reducers.commentsDB(state.campaignsDB, actions.createComment(id_1, id_1, text));
  state.campaignsDB[id_1].comments.commentsDB[id_1] = {
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
  };

  deepEqual(actualState, state.campaignsDB);
  end();
});



// test('comment reducer | commentsDB :: Handle createChildComment action when the comment has a parent comment', ({deepEqual, end}) => {
//   const state = mockStore.withOneCampaignAndOneComment();
//
//   let text = faker.lorem.sentence();
//
//   const actualState = reducers.commentsDB(state.campaignsDB[id_1].comments.commentsDB, actions.createChildComment(id_1, id_1, id_1, text));
//   const expectedState = {
//     [id_1]: {
//       _id: id_1,
//       campaign: id_1,
//       text: state.campaignsDB[id_1].comments.commentsDB[id_1].text,
//       created_by,
//       created_on,
//       parent_comment: null,
//       children_comments: {
//         commentsDB: {
//           [id_1]: {
//             _id: id_1,
//             campaign: id_1,
//             text,
//             created_by,
//             created_on,
//             parent_comment: id_1,
//             children_comments: {
//               commentsDB: {},
//               commentsIds: []
//             }
//           }
//         },
//         commentsIds: []
//       }
//     }
//   };
//
//   deepEqual(actualState, expectedState);
//   end();
// });

// test('comment reducer | commentsIds :: Handle createComment action', ({deepEqual, end}) => {
//   const state = mockStore.withOneCampaign();
//
//   let text = faker.lorem.sentence();
//
//   const actualState = reducers.commentsIds(state.commentsIds, actions.createComment(id_1, id_1, text));
//   const expectedState = [id_1];
//
//   deepEqual(actualState, expectedState);
//   end();
// });
