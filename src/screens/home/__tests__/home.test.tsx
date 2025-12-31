import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../index';
import { useQuery } from '@apollo/client/react';
import {
  createUserTable,
  getAllUsers,
  insertUsers,
} from '../../../db/userTable';
import { USER_ROLES } from '../../../constants';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../../db/userTable', () => ({
  createUserTable: jest.fn(),
  getAllUsers: jest.fn(),
  insertUsers: jest.fn(),
}));

jest.mock('react-native-pager-view', () => {
  const React = require('react');
  return ({ children }: any) => <>{children}</>;
});

jest.mock('../../../components/SegmentedTabs', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ onChange }: any) => (
    <>
      <Text onPress={() => onChange(0)}>All</Text>
      <Text onPress={() => onChange(1)}>Admins</Text>
      <Text onPress={() => onChange(2)}>Managers</Text>
    </>
  );
});

jest.mock('../../../components/UserList', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    UserList: ({ data, onRefresh }: any) => (
      <>
        <Text testID="user-count">{data.length}</Text>
        <Text onPress={onRefresh}>Refresh</Text>
      </>
    ),
  };
});

jest.mock('../../../components/AddUserModal', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return ({ visible }: any) => (visible ? <Text>AddUserModal</Text> : null);
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');

  return {
    SafeAreaView: ({ children }: any) => <>{children}</>,
  };
});

const mockUsers = [
  { id: '1', name: 'Alice', role: USER_ROLES.ADMIN },
  { id: '2', name: 'Bob', role: USER_ROLES.MANAGER },
];

const mockQueryResult = {
  data: {
    listZellerCustomers: {
      items: mockUsers,
    },
  },
  loading: false,
  error: undefined,
  refetch: jest.fn().mockResolvedValue({
    data: {
      listZellerCustomers: {
        items: mockUsers,
      },
    },
  }),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useQuery as unknown as jest.Mock).mockReturnValue(mockQueryResult);

    (createUserTable as jest.Mock).mockResolvedValue(undefined);
    (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
    (insertUsers as jest.Mock).mockResolvedValue(undefined); // ✅ FIX
  });

  it('renders users after DB load', async () => {
    const { getAllByTestId } = render(<HomeScreen />);

    // Wait until DB + network sync completes
    await waitFor(() => {
      expect(getAllByTestId('user-count').length).toBe(3);
    });

    const counts = getAllByTestId('user-count');

    expect(counts[0].props.children).toBe(2);
    expect(counts[1].props.children).toBe(1);
    expect(counts[2].props.children).toBe(1);
  });

  it('opens Add User modal on FAB press', async () => {
    const { getByText, findByText } = render(<HomeScreen />);

    fireEvent.press(getByText('＋'));

    expect(await findByText('AddUserModal')).toBeTruthy();
  });

  it('renders error message on GraphQL error', () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: { message: 'Something went wrong' },
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('Something went wrong')).toBeTruthy();
  });
});
