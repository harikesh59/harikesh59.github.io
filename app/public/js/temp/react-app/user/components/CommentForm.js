import React from 'react';


export default class CommentForm extends React.Component {
  render(){
      let props = this.props;
      return (
        <form onSubmit={props.onCreateComment}>
          <input name="campaign" type="hidden" value={props.campaign_id}></input>
          <div className="form-group">
            <input name="text" type="text" className="form-control" id="comment-title" placeholder="Text"></input>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );
  }
}
