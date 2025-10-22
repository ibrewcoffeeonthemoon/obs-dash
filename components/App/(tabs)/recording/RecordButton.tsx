import { ThemedText } from "@/components/themed-text";
import { StyleSheet, TouchableOpacity } from "react-native";

export const RecordButton = () => {
  return (
    <TouchableOpacity style={{ ...styles.button, backgroundColor: "green" }}>
      <ThemedText style={styles.buttonText}>Start</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    height: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 60,
    lineHeight: 80,
    fontWeight: "bold",
  },
});
