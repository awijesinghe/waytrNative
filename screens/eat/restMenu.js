import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import Firebase from "../../firebase/firebase";
import { ActivityIndicator, Divider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

export default function RestMenu({ navigation }) {
  const [menu, setMenu] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let restUID = navigation.getParam("restUID");
  const restTableMax = navigation.getParam("restTableMax");
  const restTableMin = navigation.getParam("restTableMin");
  const restName = navigation.getParam("restName");

  Firebase.getRestaurantMenu(restUID)
    .then(response => {
      if (isLoading !== response.loading) {
        setIsLoading(response.loading);
      }
      if (!response.loading && !menu) {
        setMenu(response.menu);
      }
    })
    .catch(error => console.log(error));

  const goBack = () => {
    navigation.pop();
  };
  if (!isLoading && menu) {
    if (Object.keys(menu).length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 50,
                marginTop: 30
              }}
            >
              <TouchableOpacity onPress={goBack} style={{ height: 50 }}>
                <Entypo
                  name="chevron-left"
                  size={32}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "raleway-bold",
                  fontSize: 40,
                  color: "#333",
                  height: 50
                }}
              >
                {restName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TableConfirmation", {
                    restName,
                    restTableMin,
                    restTableMax,
                    restUID
                  });
                }}
                style={{ height: 50 }}
              >
                <Entypo
                  name="chevron-right"
                  size={32}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Divider />
          <ScrollView>
            {menu.items.map((item, i) => (
              <View key={i} style={{ marginHorizontal: 25, marginVertical: 8 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {menu.items[i]}
                  </Text>

                  <Text style={{ textAlign: "center" }}>${menu.prices[i]}</Text>
                </View>
                <Text style={{ fontFamily: "raleway-italic", marginRight: 50 }}>
                  {menu.descriptions[i]}
                </Text>
              </View>
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
