import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { obs } from "@/lib/obs";
import { useStore } from "@/store/recording";
import { useEffect } from "react";

export const RecordingTime = () => {
  const isRecording = useStore((s) => s.stash.isRecording);
  const recordingTime = useStore((s) => s.stash.recordingTime);
  const setRecordingTime = useStore((s) => s.action.setRecordingTime);

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
  }, [isRecording]); // Re-run effect when isRecording changes

  return (
    <ThemedView
      style={{
        paddingHorizontal: 10,
        paddingVertical: 50,
      }}
    >
      <ThemedText
        style={{
          fontSize: 200, //120
          lineHeight: 200,
          textAlign: "center",
        }}
      >
        {recordingTime}
      </ThemedText>
    </ThemedView>
  );
};
