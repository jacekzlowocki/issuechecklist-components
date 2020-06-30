const axios = require('axios');
const { API_BASE_URL } = require('./enums');

module.exports = async function(projectName) {
  const url = getComponentsUrl(projectName);
  const response = await axios.get(url);
  return response.data;
};

function getComponentsUrl(projectName) {
  return `${API_BASE_URL}project/${projectName}/components`;
}
