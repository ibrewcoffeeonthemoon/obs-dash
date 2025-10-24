import { obs } from "@/lib/obs";
import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const RecordingTime = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const isRecording = useStore((s) => s.stash.isRecording);
  const recordingTime = useStore((s) => s.stash.recordingTime);
  const setRecordingTime = useStore((s) => s.action.setRecordingTime);
  const [showHours, setShowHours] = useState(false);

  useEffect(() => {
    // Only poll when recording is active
    if (!isRecording) {
      return;
    }

    // Fetch timecode every second
    const fetchTimecode = async () => {
      try {
        const { outputTimecode } = await obs.call("GetRecordStatus");
        if (outputTimecode) {
          // Split timecode (e.g., "00:00:00.000" -> ["00", "00", "00"])
          const [hours, minutes, seconds] = outputTimecode
            .split(".")[0]
            .split(":");
          // Display mm:ss if hours are "00", else hh:mm:ss
          const formattedTimecode =
            hours === "00"
              ? `${minutes}:${seconds}`
              : `${hours}:${minutes}:${seconds}`;
          setRecordingTime(formattedTimecode);
          setShowHours(hours !== "00");
        }
      } catch (error) {
        console.error("Failed to fetch timecode:", error);
      }
    };

    // Initial fetch
    fetchTimecode();

    // Set up polling interval
    const interval = setInterval(fetchTimecode, 1000);

    // Cleanup interval on unmount or when isRecording changes
    return () => clearInterval(interval);
  }, [isRecording, setRecordingTime]); // Re-run effect when isRecording changes

  // custotm extra big font, no tailwindcss can fit
  const fontSize = () => {
    if (isPhone) {
      return showHours ? 75 : 120;
    } else {
      return showHours ? 120 : 200;
    }
  };

  return (
    <View className="pb-2">
      <Text
        style={{
          fontSize: fontSize(),
        }}
        className="text-white text-center"
      >
        {recordingTime}
      </Text>
    </View>
  );
};
