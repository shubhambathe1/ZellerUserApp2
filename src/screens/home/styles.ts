import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pageViewer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2979FF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  marginBottom: 8,
},
searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 16,
  marginBottom: 8,
  backgroundColor: "#F2F2F2",
  borderRadius: 10,
  paddingHorizontal: 12,
},
searchInput: {
  flex: 1,
  height: 40,
},
searchLogo: {
  width: 20,
  height: 20,
},
overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255,255,255,0.6)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
},
});

export default HomeStyles;
