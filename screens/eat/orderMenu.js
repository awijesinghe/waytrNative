import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import Firebase from "../../firebase/firebase";
import { ActivityIndicator, Divider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

export default function OrderMenu({ navigation, route }) {
  const [menu, setMenu] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tempOrders, setTempOrders] = useState([]);
  let restUID = route.params.restUID;
  const socket = route.params.socket;
  const orders = route.params.orders;
  const restName = route.params.restName;

  Firebase.getRestaurantMenu(restUID)
    .then(response => {
      if (isLoading !== response.loading) {
        setIsLoading(response.loading);
        setTempOrders(orders);
      }
      if (!response.loading && !menu) {
        setMenu(response.menu);
      }
    })
    .catch(error => console.log(error));

  const goBack = () => {
    navigation.goBack();
  };

  function sendOrder() {
    socket.emit("sendTempOrder", tempOrders, () => {});
    navigation.goBack();
  }

  function changeQuantity(menu, i, action) {
    const order = tempOrders.find(item => item.item === menu.items[i]);
    let orderQuantity;
    if (order) {
      orderQuantity = +order.quantity;
    } else {
      orderQuantity = 0;
    }

    let newOrder = tempOrders.filter(item => {
      return item.item !== menu.items[i];
    });
    if (action === "add") {
      setTempOrders([
        ...newOrder,
        {
          item: menu.items[i],
          quantity: orderQuantity + 1,
          price: menu.prices[i],
          status: 0
        }
      ]);
    } else if (action === "subtract") {
      if (orderQuantity > 1) {
        setTempOrders([
          ...newOrder,
          {
            item: menu.items[i],
            quantity: orderQuantity - 1,
            price: menu.prices[i],
            status: 0
          }
        ]);
      } else {
        setTempOrders(newOrder);
      }
    }
  }

  if (!isLoading && menu) {
    if (Object.keys(menu).length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginBottom: 50,
                marginTop: 30
              }}
            >
              <TouchableOpacity onPress={goBack} style={{ height: 50 }}>
                <Entypo
                  name="chevron-left"
                  size={32}
                  style={{ marginLeft: 20, marginTop: 5 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "raleway-bold",
                  fontSize: 40,
                  color: "#333",
                  height: 50,
                  marginLeft: 30
                }}
              >
                {restName}
              </Text>
            </View>
          </View>
          <Divider />
          <ScrollView>
            {menu.items.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{ marginHorizontal: 25, marginVertical: 12 }}
                onPress={() => {
                  navigation.navigate("OrderItem", item);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <View
                    style={{
                      flex: 10
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{menu.items[i]}</Text>
                    <Text
                      style={{ fontFamily: "raleway-italic", marginRight: 35 }}
                    >
                      {menu.descriptions[i]}
                    </Text>
                    <Text>${menu.prices[i]}</Text>
                  </View>

                  <View
                    style={{
                      flex: 3,
                      marginTop: 5
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          changeQuantity(menu, i, "subtract");
                        }}
                      >
                        <Entypo
                          name="minus"
                          size={24}
                          style={{ height: 50, marginRight: 15 }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "raleway-regular",
                          minWidth: 20
                        }}
                      >
                        {tempOrders.find(item => item.item === menu.items[i])
                          ? tempOrders.find(item => item.item === menu.items[i])
                              .quantity
                          : 0}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          changeQuantity(menu, i, "add");
                        }}
                      >
                        <Entypo
                          name="plus"
                          size={24}
                          style={{ height: 50, marginLeft: 10 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    } else
      return (
        <View>
          <Text
            style={{
              ...globalStyles.titleText,
              marginTop: 50,
              marginHorizontal: 30
            }}
          >
            Restaurant menu was not found. Please try again later.
          </Text>
          <TouchableOpacity
            onPress={goBack}
            style={{ ...globalStyles.logInButton, marginHorizontal: 30 }}
          >
            <Text style={globalStyles.buttonText}>Go back to restaurants</Text>
          </TouchableOpacity>
        </View>
      );
  } else
    return (
      <ActivityIndicator
        style={{ marginTop: 150 }}
        animating={true}
        size="large"
        color="#5CDC58"
      />
    );
}
