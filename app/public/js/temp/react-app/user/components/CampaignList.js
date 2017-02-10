import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions';
import * as selectors from '../store/selectors';
import Campaign from './Campaign';

class CampaignList extends React.Component {
  componentWillMount() {
   this.props.fetchCampaigns();
  }

  render(){
      const props = this.props;
      let campaigns = props.campaigns.map((c) => {
        return (
          <div key={c._id}>
            <Campaign onCreateComment={props.onCreateComment} {...c} />
            <br />
            <br />
          </div>
        );
      });

      return (
        <ul>
          {campaigns}
        </ul>
    );
  }
}

const selector = (state) => ({
  campaigns: selectors.getCampaigns(state)
});

export default connect(selector, actionCreators)(CampaignList);
