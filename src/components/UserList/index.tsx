import React, { useMemo } from 'react';
import { SectionList, Text, View } from 'react-native';
import styles from './styles';
import { UserListProps } from './types';
import { USER_ROLES } from '../../constants';

export const UserList = ({
  data = [],
  refreshing,
  onRefresh,
}: UserListProps) => {
  const sections = useMemo(() => {
    const grouped = data.reduce((acc: { [key: string]: any[] }, item) => {
      const letter =
        item.name && item.name[0] ? item.name[0].toUpperCase() : '#';

      if (!acc[letter]) {
        acc[letter] = [];
      }

      acc[letter].push(item);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        title: letter,
        data: grouped[letter],
      }));
  }, [data]);

  return (
    <SectionList
      testID="user-list"
      sections={sections}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <View testID="section-header" style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
          </View>

          {item.role === USER_ROLES.ADMIN && (
            <Text style={styles.role}>{item.role}</Text>
          )}
        </View>
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};
