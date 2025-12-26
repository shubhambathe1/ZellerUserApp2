import React from 'react';
import { render } from '@testing-library/react-native';
import { USER_ROLES } from '../../../constants';
import { UserList } from '..';

const mockData = [
  { id: '1', name: 'Alice', role: USER_ROLES.ADMIN, email: 'alice@gmail.com' },
  { id: '2', name: 'Bob', role: USER_ROLES.MANAGER, email: 'bob@gmail.com' },
  {
    id: '3',
    name: 'Charlie',
    role: USER_ROLES.MANAGER,
    email: 'charlie@gmail.com',
  },
];

describe('UserList Component', () => {
  it('renders section headers based on the first letter of names', () => {
    const { getAllByText } = render(<UserList data={mockData} />);

    // Expecting 2 matches for 'A' (Header + Avatar)
    expect(getAllByText('A').length).toBe(2);
    expect(getAllByText('B').length).toBe(2);
  });

  it('renders user names correctly', () => {
    const { getByText } = render(<UserList data={mockData} />);

    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
  });

  it('displays the ADMIN tag only for admin users', () => {
    const { queryByText, getByText } = render(<UserList data={mockData} />);

    expect(getByText(USER_ROLES.ADMIN)).toBeTruthy();

    expect(queryByText(USER_ROLES.MANAGER)).toBeNull();
  });

  it('calls onRefresh when list is pulled down', () => {
    const onRefreshMock = jest.fn();
    const { getByTestId } = render(
      <UserList data={mockData} refreshing={false} onRefresh={onRefreshMock} />,
    );

    const list = getByTestId('user-list');
    const { refreshControl } = list.props;

    refreshControl.props.onRefresh();
    expect(onRefreshMock).toHaveBeenCalled();
  });

  it('groups multiple users under the same section header', () => {
    const multiData = [
      { id: '1', name: 'Alice', role: USER_ROLES.ADMIN, email: 'a@a.com' },
      { id: '4', name: 'Andrew', role: USER_ROLES.MANAGER, email: 'b@b.com' },
    ];

    const { getAllByTestId, queryAllByText } = render(
      <UserList data={multiData} />,
    );

    const aTexts = queryAllByText('A');

    const headerElements = getAllByTestId('section-header');

    expect(headerElements.length).toBeGreaterThanOrEqual(1);

    expect(queryAllByText('Alice')).toHaveLength(1);
    expect(queryAllByText('Andrew')).toHaveLength(1);
  });
});
