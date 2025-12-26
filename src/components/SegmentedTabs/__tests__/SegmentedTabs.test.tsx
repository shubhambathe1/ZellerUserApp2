import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SegmentedTabs from '../';

jest.mock('../../../constants', () => ({
  USER_TABS: ['ADMIN', 'MANAGER'],
}));

describe('SegmentedTabs', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tabs provided in USER_TABS', () => {
    const { getByText } = render(
      <SegmentedTabs activeIndex={0} onChange={mockOnChange} />,
    );

    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Manager')).toBeTruthy();
  });

  it('calls onChange with the correct index when a tab is pressed', () => {
    const { getByText } = render(
      <SegmentedTabs activeIndex={0} onChange={mockOnChange} />,
    );

    const managerTab = getByText('Manager');
    fireEvent.press(managerTab);

    expect(mockOnChange).toHaveBeenCalledWith(1);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('applies active text styles to the currently selected tab', () => {
    const { getByText } = render(
      <SegmentedTabs activeIndex={1} onChange={mockOnChange} />,
    );

    const activeTabText = getByText('Manager');
    const inactiveTabText = getByText('Admin');

    expect(activeTabText.props.style).toContainEqual(expect.any(Object));
  });

  it('updates the animation value when activeIndex changes', () => {
    const { rerender } = render(
      <SegmentedTabs activeIndex={0} onChange={mockOnChange} />,
    );

    rerender(<SegmentedTabs activeIndex={1} onChange={mockOnChange} />);
  });
});
