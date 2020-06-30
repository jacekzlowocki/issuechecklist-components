jest.mock('../getComponents');

const getComponents = require('../getComponents');
const getUnassignedComponents = require('../getUnassignedComponents');

describe('getUnassignedComponents', () => {
  describe('when all components are assigned', () => {
    beforeAll(() => {
      getComponents.mockImplementation(async () => Promise.resolve([
        componentMock('1', true),
        componentMock('2', true),
        componentMock('3', true),
      ]));
    });

    it('returns empty list', async () => {
      expect(await getUnassignedComponents('x')).toEqual([]);
    });
  });

  describe('when there are non-assigned components', () => {
    beforeAll(() => {
      getComponents.mockImplementation(async () => Promise.resolve([
        componentMock('1', true),
        componentMock('2', false),
        componentMock('3', true),
        componentMock('4', false),
      ]));
    });

    it('returns empty list', async () => {
      expect(await getUnassignedComponents('x')).toEqual([
        componentMock('2', false),
        componentMock('4', false),
      ]);
    });
  });
});

function componentMock(id, isAssigned = false) {
  let assigneeType = 'PROJECT_DEFAULT';
  let assignee;

  if (isAssigned) {
    assigneeType = 'COMPONENT_LEAD';
    assignee = { accountId: 'foo' };
  }

  return {
    id,
    assigneeType,
    assignee,
    realAssigneeType: assigneeType,
    realAssignee: assignee,
  };
}
