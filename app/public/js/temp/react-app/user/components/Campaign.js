import React from 'react';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

const API_URL = 'http://localhost:3000/api/v1';

export default class Campaign extends React.Component {
  render(){
      const props = this.props;
      return (
        <div className="row">
          <h3>{props.title}</h3>
          <hr />
          <p>{props.description}</p>
          <br />
          <br />
          <h5>Create a comment</h5>
          <CommentForm campaign_id={props._id} onCreateComment={props.onCreateComment} />
          <br />
          <hr />
          <CommentList comments={props.comments} />
        </div>
      );
  }
}
