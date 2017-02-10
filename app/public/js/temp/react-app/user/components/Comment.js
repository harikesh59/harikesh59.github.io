import React from 'react';


export default class Comment extends React.Component {
  render(){
      const props = this.props;
      return (
        <div className="row">
          <p>{props.title}</p>
        </div>
      );
  }
}
