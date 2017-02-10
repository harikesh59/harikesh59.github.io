import React from 'react';


export default class CampaignForm extends React.Component {


  render(){
      return (
        <form onSubmit={this.props.onCreateCampaign}>
          <div className="form-group">
            <label htmlFor="campaing-title">Title</label>
            <input name="title" type="text" className="form-control" id="campaing-title" placeholder="Title"></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" type="password" className="form-control" id="description" placeholder="Description" rows="10"></textarea>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );
  }
}
