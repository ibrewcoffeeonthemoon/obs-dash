import { Banner } from "./Banner";
import { Title } from "./Title";
import { IpAddressInput } from "./IpAddressInput";
import { PortInput } from "./PortInput";
import { PasswordInput } from "./PasswordInput";
import { ConnectButton } from "./ConnectButton";
import { LogArea } from "./LogArea";
import { View } from "react-native";

export default function Connect() {
  return (
    <>
      <Banner />
      <View className="flex-1 p-8 gap-4">
        <Title />
        <IpAddressInput />
        <PortInput />
        <PasswordInput />
        <ConnectButton />
        <LogArea />
      </View>
    </>
  );
}
