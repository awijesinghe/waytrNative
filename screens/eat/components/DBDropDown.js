import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function DropDown({ order }) {
  const [expanded, setExpanded] = useState(false);

  let statusMessage;
  switch (order.status) {
    case 0:
      statusMessage = "Order has been sent to kitchen";
      break;
    case 1:
      statusMessage = "Currently being cooked/prepared";
      break;
    case 2:
      statusMessage = "Order has been completed";
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 1 }}>
            <FontAwesome
              name={expanded ? "angle-up" : "angle-down"}
              size={18}
            />
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 8 }}>{order.item}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }} numeric>
            {order.quantity}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }} numeric>
            {(order.price * order.quantity).toFixed(2)}
          </DataTable.Cell>
        </DataTable.Row>
      </TouchableOpacity>
      {expanded ? (
        <View>
          {order.note ? (
            <DataTable.Row>
              <DataTable.Cell style={{ flex: 1 }}>Note:</DataTable.Cell>
              <DataTable.Cell style={{ flex: 5 }}>{order.note}</DataTable.Cell>
            </DataTable.Row>
          ) : null}
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>Status:</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>{statusMessage}</DataTable.Cell>
          </DataTable.Row>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    marginVertical: 10
  },
  quantityView: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 5
  },
  quantityButton: {
    height: 50,
    marginLeft: 30,
    textAlignVertical: "center"
  }
});
