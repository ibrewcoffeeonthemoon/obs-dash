import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { useEffect, useState } from "react";
import { obs } from "@/lib/obs";

export const Title = () => {
  const [profileName, setProfileName] = useState("--");

  useEffect(() => {
    // get existing profile
    (async () => {
      const { currentProfileName } = await obs.call("GetProfileList");
      setProfileName(currentProfileName);
    })();

    // monitor future profile change
    obs.on("CurrentProfileChanged", (data) => {
      setProfileName(data.profileName);
      console.log("changing profile");
    });
  }, []);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        {profileName}
      </ThemedText>
    </ThemedView>
  );
};
