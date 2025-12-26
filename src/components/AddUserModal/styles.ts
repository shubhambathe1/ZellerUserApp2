import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  keyboardWrapper: {
    width: "100%",
  },

  disabledButton: {
    opacity: 0.6,
  },

  modalContainer: {
    height: height * 0.85, // ✅ 85% height
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  close: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },

  closeText: {
    fontSize: 24,
    color: "#2F6FD6",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 24,
    color: "#111827",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 16,
    marginTop: 8,
  },

  roleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    padding: 4,
    marginBottom: 32,
  },

  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  activeRole: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2F6FD6",
  },

  roleText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  activeRoleText: {
    color: "#2F6FD6",
    fontWeight: "600",
  },

  createButton: {
    marginTop: "auto",
    marginBottom: 24,
    backgroundColor: "#2F6FD6",
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
  },

  createText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginBottom: 8,
  },

  inputError: {
    borderColor: "#D32F2F",
  },

});
