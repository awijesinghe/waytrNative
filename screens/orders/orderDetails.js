import React from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import { Card, Title, Divider, DataTable } from "react-native-paper";

export default function OrderDetails({ navigation, route }) {
  let restName = route.params.restName;
  let orders = route.params.orders;
  let total = 0.0;

  function goBack() {
    navigation.pop();
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF"
      }}
    >
      <Card style={{ marginTop: 35 }}>
        <Title style={globalStyles.titleText}>{restName}</Title>

        <Card.Cover
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
            height: 125
          }}
          source={require("../../assets/pictures/test.jpg")}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 3 }}>Item</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }} numeric>
                Quantity
              </DataTable.Title>
              <DataTable.Title style={{ flex: 2 }} numeric>
                Unit Price($)
              </DataTable.Title>
            </DataTable.Header>
            {orders &&
              orders.map((item, i) => {
                total = total + item.price * item.quantity;
                return (
                  <DataTable.Row key={i} style={{ minHeight: 65 }}>
                    <DataTable.Cell
                      style={{
                        ...globalStyles.paragraph,
                        flex: 3
                      }}
                    >
                      {item.item}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }} numeric>
                      {item.quantity}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }} numeric>
                      {item.price}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
          </DataTable>
        </Card.Content>

        <Divider style={{ marginVertical: 15 }} />
        <Text
          style={{
            textAlign: "right",
            marginRight: 30
          }}
        >
          Total: ${total.toFixed(2)}
        </Text>
        <Card.Actions></Card.Actions>
      </Card>

      <TouchableOpacity
        onPress={goBack}
        style={{
          ...globalStyles.logInButton,
          marginTop: 10,
          marginBottom: 10
        }}
      >
        <Text style={globalStyles.buttonText}>Go back to orders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
