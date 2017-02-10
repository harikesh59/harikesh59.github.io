import React from 'react';
import {createStore} from 'redux';

import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';

import {fetchCampaigns, fetchedCampaigns, createCampaign, createComment} from '../store/actions';
import {reducer} from '../store/reducers';

const API_URL = 'http://localhost:3000/api/v1';

let store = createStore(reducer);

jQuery.get(`${API_URL}/campaign/get_by_user_id`, {id: reactAppUser.id}, (response) => {
  let campaigns = response.data.campaigns;
  store.dispatch(fetchedCampaigns(campaigns));
});


export default class App extends React.Component{

  constructor(){
    super();
    this.state = {
      campaigns: []
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState({ campaigns: store.getState() })
    });
  }

  onCreateCampaign(e){
    e.preventDefault();
    var form = e.target;

    const data = new FormData(form);
    let campaign = {
      title: data.get('title'),
      description: data.get('description')
    }

    jQuery.post(`${API_URL}/campaign/create`, campaign, (response) => {
      Array.prototype.slice.call(form.querySelectorAll('.form-control')).forEach((el) => {
        el.value = '';
      });
      store.dispatch(createCampaign(response.data));
    });

  }

  onCreateComment(e){
    e.preventDefault();
    var form = e.target;

    const data = new FormData(form);
    let comment = {
      text: data.get('text'),
      campaign: data.get('campaign')
    }

    jQuery.post(`${API_URL}/comment/create`, comment, (response) => {
      Array.prototype.slice.call(form.querySelectorAll('.form-control')).forEach((el) => {
        el.value = '';
      });
      store.dispatch(createComment(response.data));
    });
  }

  getComments(){
    jQuery.get(`${API_URL}/campaign/get_by_campaign_id`, {id: this.props._id}, (response) => {
      let comments = response.data.comments;
      store.dispatch(fetchedComments(comments));
    });
  }

  render(){
    console.log(store.getState());
    return (
      <div>
        <h1>Create a new Campaign</h1>
        <br />
        <br />
        <CampaignForm onCreateCampaign={this.onCreateCampaign.bind(this)} />
        <br />
        <br />
        <h1>Your campaigns</h1>
        <br />
        <br />
        <CampaignList onCreateComment={this.onCreateComment.bind(this)} onCreateComment={this.onCreateComment.bind(this)} campaigns={this.state.campaigns} />
      </div>
    );
  }
}
