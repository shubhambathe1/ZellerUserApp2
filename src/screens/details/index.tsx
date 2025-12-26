import { RootStackParamList } from "@/src/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 12 },
});
