import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { obs } from "@/lib/obs";
import { useStore } from "@/store/recording";
import { useEffect, useState } from "react";

export const RecordingTime = () => {
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

  return (
    <ThemedView
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
    >
      <ThemedText
        style={{
          fontSize: showHours ? 120 : 200,
          lineHeight: 200,
          textAlign: "center",
        }}
      >
        {recordingTime}
      </ThemedText>
    </ThemedView>
  );
};
