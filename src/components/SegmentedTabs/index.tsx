import { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { USER_TABS } from '../../constants';

const TAB_WIDTH = 100;

const SegmentedTabs = ({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * TAB_WIDTH,
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
      mass: 0.6,
    }).start();
  }, [activeIndex, translateX]);

  return (
    <View style={styles.container}>
      {/* Sliding indicator */}
      <Animated.View
        style={[styles.activeIndicator, { transform: [{ translateX }] }]}
      />

      {USER_TABS.map((tab, index) => {
        const isActive = index === activeIndex;

        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            activeOpacity={0.8}
            onPress={() => onChange(index)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.charAt(0) + tab.slice(1).toLocaleLowerCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedTabs;
