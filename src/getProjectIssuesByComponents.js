
const axios = require('axios');
const querystring = require('querystring');
const { API_BASE_URL } = require('./enums');
const countIssuesByComponents = require('./countIssuesByComponents');

module.exports = async function(projectName, componentsIds) {
  let startAt = 0;
  let maxResults = 50;
  let total;
  const allIssues = [];

  do {
    const url = getIssuesUrl(projectName, startAt, maxResults);
    const { data } = await axios.get(url);

    maxResults = data.maxResults;
    total = data.total;
    startAt += maxResults;

    allIssues.push(...data.issues);
  } while (startAt < total);

  return countIssuesByComponents(allIssues, componentsIds);
}

function getIssuesUrl(projectName, startAt = 0, maxResults = 5) {
  const queryString = querystring.stringify({
    jql: `project = "${projectName}" AND component is not empty`,
    startAt,
    maxResults,
  });

  return `${API_BASE_URL}search?${queryString}`;
}
