import React, { useState, useContext } from "react";
import { DataTable } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PendingOrdersContext } from "../../../contexts/PendingOrdersContext";

export default function DropDown({ order, i }) {
  const [expanded, setExpanded] = useState(false);
  const { pendingOrders, setPendingOrders, setTotal, total } = useContext(
    PendingOrdersContext
  );
  let TPOrders = pendingOrders;

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
        <View style={styles.expandedView}>
          {order.note ? (
            <DataTable.Row>
              <DataTable.Cell style={{ flex: 1 }}>Note:</DataTable.Cell>
              <DataTable.Cell style={{ flex: 5 }}>{order.note}</DataTable.Cell>
            </DataTable.Row>
          ) : null}
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>Quantity:</DataTable.Cell>
            <View style={styles.quantityView}>
              {TPOrders[i].quantity > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    TPOrders[i].quantity = TPOrders[i].quantity - 1;
                    setPendingOrders(TPOrders);
                    setTotal(total - TPOrders[i].price);
                  }}
                >
                  <FontAwesome
                    name="minus-circle"
                    size={40}
                    color={"#5CDC58"}
                    style={styles.quantityButton}
                  />
                </TouchableOpacity>
              ) : (
                <FontAwesome
                  name="minus-circle"
                  size={40}
                  color={"#C0C0C0"}
                  style={styles.quantityButton}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  TPOrders[i].quantity = TPOrders[i].quantity + 1;
                  setPendingOrders(TPOrders);
                  setTotal(total + TPOrders[i].price);
                }}
              >
                <FontAwesome
                  name="plus-circle"
                  size={40}
                  color={"#5CDC58"}
                  style={styles.quantityButton}
                />
              </TouchableOpacity>
            </View>
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
  expandedView: {
    backgroundColor: "white"
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
