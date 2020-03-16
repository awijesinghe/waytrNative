import React from "react";
import { View } from "react-native";
import RestListDetailStack from "../../routes/restListDetailStack";
import { globalStyles } from "../../styles/global";

export default function Eat() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...globalStyles.container, padding: 0 }}>
        <RestListDetailStack />
      </View>
    </View>
  );
}
