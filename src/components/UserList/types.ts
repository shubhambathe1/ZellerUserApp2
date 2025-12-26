export type ZellerUserType = {
  id: string,
  name: string,
  email: string,
  role: string,
}

export type UserListProps = {
  data: ZellerUserType[];
  refreshing?: boolean;
  onRefresh?: () => Promise<void>;
}
