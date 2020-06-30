const fs = require('fs');

module.exports = function(components, projectIssuesCount) {
  return new Promise((resolve, reject) => {
    const fileName = `unassigned-components-${(new Date()).toISOString()}.txt`;
    const fileContent = [];

    components.forEach(({ name, id, self, description }) => {
      const componentReport = [
        `Component #${id}: ${name}`,
        `Issues: ${projectIssuesCount[id]}`,
        description,
        self,
      ];

      fileContent.push(componentReport.join("\n"));
    });

    fs.writeFile(fileName, fileContent.join("\n\n"), 'utf8', (error) => {
      if (error) {
        reject(`Cannot write report file: ${error}`);
      } else {
        resolve(fileName);
      }
    });
  });
};