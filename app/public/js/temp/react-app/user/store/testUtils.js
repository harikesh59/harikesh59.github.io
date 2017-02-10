import faker from 'faker';

export const mockStore = {
  withNoCampaign: () => {
    return {
      campaignsDB: {},
      campaignsIds: [],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withOneCampaign: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {},
            commentsIds: []
          }
        }
      },
      campaignsIds: ['123'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withTwoCampaigns: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {},
            commentsIds: []
          }
        },
        '456': {
          _id: '456',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {},
            commentsIds: []
          }
        }
      },
      campaignsIds: ['123', '456'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withOneCampaignAndOneComment: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '123',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              }
            },
            commentsIds: ['123']
          }
        }
      },
      campaignsIds: ['123'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withTwoCampaignsAndOneCommentEach: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '123',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              }
            },
            commentsIds: ['123']
          }
        },
        '456': {
          _id: '456',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '456',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              }
            },
            commentsIds: ['123']
          }
        }
      },
      campaignsIds: ['123', '456'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withTwoCampaignsAndTwoCommentsEach: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '123',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              },
              '456': {
                _id: '456',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '123',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              }
            },
            commentsIds: ['123', '456']
          }
        },
        '456': {
          _id: '456',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '456',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              },
              '456': {
                _id: '456',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '456',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {},
                  commentsIds: []
                }
              }
            },
            commentsIds: ['123', '456']
          }
        }
      },
      campaignsIds: ['123', '456'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
  withOneCampaignOneCommentAndOneNestedComment: () => {
    return {
      campaignsDB: {
        '123': {
          _id: '123',
          title: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          created_by: 'me',
          created_on: 'today',
          comments: {
            commentsDB: {
              '123': {
                _id: '123',
                text: faker.lorem.sentence(),
                created_by: 'me',
                campaign: '123',
                parent_comment: null,
                created_on: 'today',
                children_comments: {
                  commentsDB: {
                    '123': {
                      _id: '123',
                      text: faker.lorem.sentence(),
                      created_by: 'me',
                      campaign: '123',
                      parent_comment: null,
                      created_on: 'today',
                      children_comments: {
                        commentsDB: {},
                        commentsIds: []
                      }
                    }
                  },
                  commentsIds: ['123']
                }
              }
            },
            commentsIds: ['123']
          }
        }
      },
      campaignsIds: ['123'],
      user: {
        _id: 'me',
        username: 'anksin'
      }
    };
  },
};
