const isEmpty = require('lodash.isempty');
const filter = require('lodash.filter');
const getComponents = require('./getComponents');

module.exports = async function(projectName) {
  try {
    return filterUnassigned(await getComponents(projectName));
  } catch (e) {
    throw new Error(`Could not fetch components: ${e.message}`);
  }
};

function filterUnassigned(components) {
  return filter(components, (component) => !isAssigned(component));
}

function isAssigned({ assigneeType, realAssigneeType, assignee, realAssignee }) {
  const ASSIGNED_TYPE = 'COMPONENT_LEAD';

  return assigneeType === ASSIGNED_TYPE
    && realAssigneeType === ASSIGNED_TYPE
    && !isEmpty(assignee)
    && !isEmpty(realAssignee);
}
