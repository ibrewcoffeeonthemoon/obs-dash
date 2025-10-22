import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { Title } from "./Title";
import { IpAddressInput } from "./IpAddressInput";
import { PortInput } from "./PortInput";
import { PasswordInput } from "./PasswordInput";
import { ConnectButton } from "./ConnectButton";
import { LogArea } from "./LogArea";

export default function Connect() {
  return (
    <>
      <Banner />
      <ThemedView
        style={{
          flex: 1,
          padding: 32,
          gap: 16,
        }}
      >
        <Title />
        <IpAddressInput />
        <PortInput />
        <PasswordInput />
        <ConnectButton />
        <LogArea />
      </ThemedView>
    </>
  );
}
