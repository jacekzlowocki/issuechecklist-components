const getUnassignedComponents = require('./src/getUnassignedComponents');
const getProjectIssuesByComponents = require('./src/getProjectIssuesByComponents');
const writeReport = require('./src/writeReport');

async function run(projectName) {
  try {
    const unassignedComponents = await getUnassignedComponents(projectName);
    const componentsIds = unassignedComponents.map(({ id }) => id);

    const projectIssuesCount = await getProjectIssuesByComponents(projectName, componentsIds);
    const reportFile = await writeReport(unassignedComponents, projectIssuesCount);

    console.log(`Report written to ${reportFile}`);
  } catch (e) {
    console.log('Error occurred', e);
  }
}

run('IC');
