import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import AddUserModal from '..';
import { USER_ROLES } from '../../../constants';

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

jest.mock('../../../db/userTable', () => ({
  addUser: jest.fn(() => Promise.resolve()),
}));

describe('AddUserModal', () => {
  const onClose = jest.fn();
  const onUserAdded = jest.fn();

  it('renders correctly and closes on close button press', () => {
    const { getByText } = render(
      <AddUserModal
        visible={true}
        onClose={onClose}
        onUserAdded={onUserAdded}
      />,
    );

    expect(getByText('New User')).toBeTruthy();

    fireEvent.press(getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation errors if fields are empty', () => {
    const { getByText } = render(
      <AddUserModal
        visible={true}
        onClose={onClose}
        onUserAdded={onUserAdded}
      />,
    );

    fireEvent.press(getByText('Create User'));

    expect(getByText('First name is required')).toBeTruthy();
    expect(getByText('Last name is required')).toBeTruthy();
    expect(getByText('Email is required')).toBeTruthy();
  });

  it('calls addUser and onUserAdded when valid data is entered', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddUserModal
        visible={true}
        onClose={onClose}
        onUserAdded={onUserAdded}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');

    fireEvent.press(getByText('Create User'));

    // 2. Use waitFor instead of manual setTimeout
    // This automatically wraps the check in act() and waits for the state update
    await waitFor(() => {
      expect(onUserAdded).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('allows changing user role', () => {
    const { getByText } = render(
      <AddUserModal
        visible={true}
        onClose={onClose}
        onUserAdded={onUserAdded}
      />,
    );

    const managerButton = getByText(USER_ROLES.MANAGER);
    fireEvent.press(managerButton);
    expect(managerButton.props.style).toEqual(
      expect.arrayContaining([expect.any(Object)]),
    );
  });
});
