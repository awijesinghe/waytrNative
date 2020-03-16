import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import { globalStyles } from "../styles/global";
import { UserContext } from "../contexts/UserContext";
import Firebase from "../firebase/firebase";
import { ActivityIndicator, Colors } from "react-native-paper";

export default function Account() {
  const { currentUserId, currentUserData, setCurrentUserData } = useContext(
    UserContext
  );

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
      <View style={globalStyles.container}>
        <Text style={globalStyles.motto}>
          {currentUserData.firstName} {currentUserData.lastName}
        </Text>
        <TouchableOpacity style={globalStyles.logInButton} onPress={signOut}>
          <Text style={globalStyles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
