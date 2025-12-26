import { StyleSheet } from "react-native";

const UserListStyles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    color: "#888",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E9F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#2979FF",
    fontWeight: "700",
  },
  name: {
    fontSize: 15,
  },
  role: {
    color: "#888",
    fontSize: 13,
  },
});

export default UserListStyles;
