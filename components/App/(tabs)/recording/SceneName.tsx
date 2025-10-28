import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { obs } from "@/lib/obs";

const styles = StyleSheet.create({
  item: {
    color: "white",
    backgroundColor: "black",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});

export const SceneName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const sceneName = useStore((s) => s.stash.sceneName);
  const scenes = useStore((s) => s.stash.scenes);

  const setOBSScene = async (sceneName: string) => {
    await obs.call("SetCurrentProgramScene", { sceneName });
  };

  return (
    <View className="flex flex-col justify-between items-center border-2 border-gray-800">
      <Picker
        mode="dropdown"
        style={{
          width: "100%",
        }}
        dropdownIconColor="white"
        selectedValue={sceneName}
        onValueChange={(sceneName) => setOBSScene(sceneName)}
      >
        {scenes.map((name, i) => (
          <Picker.Item
            key={i}
            style={{ ...styles.item, fontSize: isPhone ? 18 : 26 }}
            label={name}
            value={name}
          />
        ))}
      </Picker>
    </View>
  );
};
