import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/apollo/client', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('../src/screens/home', () => {
  const React = require('react');
  const { View } = require('react-native');

  return function HomeScreen() {
    return <View testID="home-screen" />;
  };
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders Home screen as initial route', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-screen')).toBeTruthy();
  });
});
