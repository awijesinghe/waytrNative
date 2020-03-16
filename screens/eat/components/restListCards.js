import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../../styles/global";
import { Card, Title, Paragraph, Divider } from "react-native-paper";

export default function RestListCards({
  searchQuery,
  navigation,
  restaurantList
}) {
  let filteredList;
  if (!searchQuery) {
    filteredList = restaurantList;
  }

  filteredList = restaurantList.filter(restaurant => {
    return restaurant.restName
      .toUpperCase()
      .includes(searchQuery.toUpperCase());
  });

  return (
    <View>
      {filteredList.map(restaurant => (
        <Card style={{ marginBottom: 15 }} key={restaurant.restUID}>
          <Card.Cover source={require("../../../assets/pictures/test.jpg")} />
          <Card.Content>
            <Title style={globalStyles.titleText}>{restaurant.restName}</Title>
            <Paragraph
              style={{ ...globalStyles.paragraph, textAlign: "center" }}
            >
              {restaurant.restStreetAddress} {restaurant.restSuburb}
            </Paragraph>
          </Card.Content>
          <Divider />
          <Card.Actions>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RestMenu", restaurant);
                }}
                style={globalStyles.restaurantButton}
              >
                <Text style={globalStyles.buttonText}>Menu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.restaurantButton}>
                <Text style={globalStyles.buttonText}>Book</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TableConfirmation", restaurant);
                }}
                style={globalStyles.restaurantButton}
              >
                <Text style={globalStyles.buttonText}>Seated</Text>
              </TouchableOpacity>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
}
