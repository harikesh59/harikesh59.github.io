import 'whatwg-fetch';

const API_URL = '/api/v1'

export const fetchCamapigns = () => {
  return fetch(`${API_URL}/campaign/get_by_user_id?id=${reactAppUser.id}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    console.log(json);
  });
}
