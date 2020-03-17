import React, { useContext } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { globalStyles } from "../../../styles/global";
import { Entypo } from "@expo/vector-icons";
import { PendingOrdersContext } from "../../../contexts/PendingOrdersContext";

export default function PendingOrders({ toggleOrderView }) {
  const { pendingOrders } = useContext(PendingOrdersContext);
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          left: 15,
          right: 15
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", height: 50 }}>
          Pending Orders
        </Text>
        <TouchableOpacity onPress={toggleOrderView}>
          <Entypo name="chevron-right" size={28} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      </View>
      <DataTable style={{ marginTop: 25 }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 3 }}>Item</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} numeric>
            Quantity
          </DataTable.Title>
          <DataTable.Title style={{ flex: 2 }} numeric>
            Unit Price ($)
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {pendingOrders.length > 0 &&
            pendingOrders.map((order, i) => (
              <DataTable.Row key={i}>
                <DataTable.Cell style={{ flex: 3 }}>
                  {order.item}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }} numeric>
                  {order.quantity}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }} numeric>
                  {order.price}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </ScrollView>
      </DataTable>
    </View>
  );
}
