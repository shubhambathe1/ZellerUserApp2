import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 22,
    padding: 4,
    position: "relative",
  },

  tab: {
    width: 100,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  tabText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "500",
  },

  activeTabText: {
    color: "#2F6FED",
    fontWeight: "600",
  },

  activeIndicator: {
    position: "absolute",
    width: 100,
    height: 36,
    backgroundColor: "#E8F1FF",
    borderRadius: 18,
    top: 4,
    left: 4,
    borderWidth: 1,
    borderColor: "#2F6FED",
  },
});
