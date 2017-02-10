export const getCampaigns = (state) =>
  state.campaignsIds.map((id) => state.campaignsDB[id]);

export const getNote = (state, id) =>
  state.byId[id] || null;

export const getOpenNoteId = (state) =>
  state.openNoteId;
