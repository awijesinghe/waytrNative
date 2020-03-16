import React from "react";
import { View } from "react-native";
import OrderDetailStack from "../../routes/orderDetailStack";

export default function Orders() {
  return (
    <View style={{ flex: 1 }}>
      <OrderDetailStack />
    </View>
  );
}
