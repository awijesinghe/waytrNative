import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { globalStyles } from "../../styles/global";
import { UserContext } from "../../contexts/UserContext";
import Firebase from "../../firebase/firebase";
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function Account() {
  const { currentUserId, currentUserData, setCurrentUserData } = useContext(
    UserContext
  );

  // console.log(currentUserId);

  const [isLoading, setIsLoading] = useState(true);

  const signOut = () => {
    Firebase.signOut();
  };

  Firebase.getUserData(currentUserId.uid).then(response => {
    if (isLoading !== response.loading) {
      setIsLoading(response.loading);
    }
    if (!response.loading && currentUserData.firstName.length === 0) {
      setCurrentUserData(response.userData);
    }
  });

  if (!isLoading) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Account</Text>
        <View style={styles.iconTextFlex}>
          <FontAwesome name="user-circle-o" size={30} style={styles.icon} />
          <Text style={styles.userInfoText}>
            {currentUserData.firstName} {currentUserData.lastName}
          </Text>
        </View>
        <View style={styles.iconTextFlex}>
          <Entypo name="email" size={30} style={styles.icon} />
          <Text style={styles.userInfoText}>{currentUserId.email}</Text>
        </View>
        <View style={styles.iconTextFlex}>
          <FontAwesome name="phone" size={30} style={styles.icon} />
          <Text style={styles.userInfoText}>
            {currentUserId.phoneNumber
              ? currentUserId.phoneNumber
              : "Enter phone number"}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...globalStyles.logInButton
          }}
          onPress={signOut}
        >
          <Text style={globalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <ActivityIndicator
        style={{ marginTop: 150 }}
        animating={true}
        size="large"
        color="#5CDC58"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    marginTop: 45,
    fontFamily: "raleway-bold",
    textAlign: "center",
    fontSize: 40,
    color: "black",
    marginBottom: 15,
    textAlign: "center"
  },
  userInfoText: {
    fontFamily: "raleway-regular",
    fontSize: 18,
    textAlignVertical: "center"
  },
  iconTextFlex: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 40
  },
  icon: {
    marginRight: 20
  }
});
