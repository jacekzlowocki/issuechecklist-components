const countIssuesByComponents = require('../countIssuesByComponents');

describe('filterIssuesByComponents', () => {
  let componentsIds;
  let issues;

  beforeAll(() => {
    componentsIds = ['1', '3', '5'];

    issues = [
      mockIssue('1'),
      mockIssue('2', ['2']),
      mockIssue('3', ['3', '5']),
      mockIssue('4'),
      mockIssue('5', ['4', '5']),
    ];
  });

  it('returns issues with matching components', () => {
    expect(countIssuesByComponents(issues, componentsIds)).toEqual({
      '1': 0,
      '3': 1,
      '5': 2,
    });
  });
});

function mockIssue(id, componentsIds = []) {
  return {
    id,
    key: `IC-${id}`,
    fields: {
      components: componentsIds.map((id) => ({
        id,
        name: 'foo',
      })),
    },
  };
}