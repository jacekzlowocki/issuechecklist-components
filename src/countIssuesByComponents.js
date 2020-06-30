module.exports = function(issues, componentsIds) {
  const issuesCount = {};

  componentsIds.forEach((id) => {
    issuesCount[id] = 0;
  });

  issues.forEach(({ fields: { components }}) => {
    components.forEach(({ id }) => {
      if (componentsIds.includes(id)) {
        issuesCount[id] += 1;
      }
    });
  });

  return issuesCount;
}