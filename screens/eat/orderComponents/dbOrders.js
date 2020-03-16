import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { DataTable, ActivityIndicator } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

export default function DBOrders({ toggleOrderView, dbOrders, isLoading }) {
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
          Sent Orders
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
        {!isLoading ? (
          <ScrollView>
            {dbOrders &&
              dbOrders.map((order, i) => (
                <DataTable.Row key={i}>
                  <DataTable.Cell
                    style={{
                      flex: 3
                    }}
                  >
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
        ) : (
          <ActivityIndicator
            style={{ marginTop: 100 }}
            animating={true}
            size="large"
            color="#5CDC58"
          />
        )}
      </DataTable>
    </View>
  );
}
