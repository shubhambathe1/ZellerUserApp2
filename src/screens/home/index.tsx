import { useQuery } from '@apollo/client/react';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { ZellerUserType } from '../../components/UserList/types';
import { createUserTable, getAllUsers, insertUsers } from '../../db/userTable';
import { USER_ROLES } from '../../constants';
import AddUserModal from '../../components/AddUserModal';
import { LIST_ZELLER_CUSTOMERS } from '../../graphql/queries';
import SegmentedTabs from '../../components/SegmentedTabs';
import { UserList } from '../../components/UserList';

const HomeScreen = () => {
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [users, setUsers] = useState<ZellerUserType[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);

  /** Fetch from network */
  const { data, loading, error, refetch } = useQuery(LIST_ZELLER_CUSTOMERS, {
    variables: { limit: 10 },
  });

  /** Create table on mount */
  useEffect(() => {
    (async () => {
      await createUserTable();
      await loadUsersFromDB();
    })();
  }, []);

  /** Sync network → SQLite */
  useEffect(() => {
    if (data?.listZellerCustomers?.items) {
      insertUsers(data?.listZellerCustomers?.items).then(() => {
        loadUsersFromDB();
      });
    }
  }, [data]);

  const filteredUsers = useMemo(() => {
    if (!searchText.trim()) return users;

    const query = searchText.toLowerCase();
    return users.filter(user => user.name?.toLowerCase().includes(query));
  }, [users, searchText]);

  const pages = useMemo(
    () => [
      filteredUsers,
      filteredUsers.filter(
        (u: { role: string }) => u.role === USER_ROLES.ADMIN,
      ),
      filteredUsers.filter(
        (u: { role: string }) => u.role === USER_ROLES.MANAGER,
      ),
    ],
    [filteredUsers],
  );

  const loadUsersFromDB = async () => {
    setDbLoading(true);
    const localUsers = await getAllUsers();

    setUsers(localUsers);
    setDbLoading(false);
  };

  const onTabChange = (index: number) => {
    setIsSearchVisible(false);
    setSearchText('');
    setActiveIndex(index);
    pagerRef.current?.setPage(index);
  };

  const onRefresh = async () => {
    if (loading || dbLoading) return;

    try {
      setRefreshing(true);

      // Re-fetch from network
      const result = await refetch();

      // Sync fresh data into SQLite
      if (result?.data?.listZellerCustomers?.items) {
        await insertUsers(result.data.listZellerCustomers.items);
      }

      // Reload from SQLite
      await loadUsersFromDB();
    } catch (err) {
      console.error('Refresh failed', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePageSelected = useCallback(
    (e: { nativeEvent: { position: SetStateAction<number> } }) =>
      setActiveIndex(e.nativeEvent.position),
    [],
  );

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SegmentedTabs activeIndex={activeIndex} onChange={onTabChange} />

        <Pressable
          onPress={() => setIsSearchVisible(true)}
          style={styles.searchLogo}
        >
          <Image
            style={styles.searchLogo}
            source={require('../../assets/images/search-icon.png')}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            autoFocus
            placeholder="Search users"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            returnKeyType="search"
          />

          <Pressable
            onPress={() => {
              setSearchText('');
              setIsSearchVisible(false);
            }}
          >
            <Image
              style={styles.searchLogo}
              source={require('../../assets/images/close-icon.png')}
            />
          </Pressable>
        </View>
      )}

      <PagerView
        ref={pagerRef}
        style={styles.pageViewer}
        initialPage={0}
        onPageSelected={handlePageSelected}
        scrollEnabled={!isSearchVisible}
      >
        {pages &&
          pages?.map((list, index) => (
            <UserList
              key={index}
              data={list}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          ))}
      </PagerView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddUserVisible(true)}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <AddUserModal
        visible={isAddUserVisible}
        onClose={() => setIsAddUserVisible(false)}
        onUserAdded={loadUsersFromDB}
      />

      {(loading || dbLoading) && !refreshing && (
        <View style={styles.overlay}>
          <ActivityIndicator size="small" color="#2F6FED" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
