import React from 'react';

import Comment from './Comment';

export default class CommentList extends React.Component {
  render(){
      const props = this.props;
      let comments = props.comments && props.comments.map((c) => {
        return (
          <div key={c._id}>
            <Comment {...c} />
            <br />
            <br />
          </div>
        );
      });

      return (
        <ul>
          {comments}
        </ul>
    );
  }
}
