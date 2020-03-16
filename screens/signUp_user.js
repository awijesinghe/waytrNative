import React, { useState, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import Firebase from "../firebase/firebase";
import { SignUpContext } from "../contexts/SignUpContext";

export default function SignUp_user({ navigation }) {
  const { email, password, userName, setUserName } = useContext(SignUpContext);
  const [subText, setSubText] = useState("");

  const handleNextPress = () => {
    if (userName.firstName.length === 0) {
      setSubText("Please enter your first Name");
    } else {
      if (userName.lastName.length === 0) {
        setSubText("Please enter your last Name");
      } else {
        let signUpData = {
          email,
          password,
          firstName: userName.firstName,
          lastName: userName.lastName
        };
        Firebase.signUp(signUpData);
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.motto}>Enter your name</Text>
      <TextInput
        style={globalStyles.logInInput}
        onChangeText={value => {
          setUserName({ ...userName, firstName: value });
        }}
        placeholder="First Name"
      />
      <TextInput
        style={globalStyles.logInInput}
        onChangeText={value => {
          setUserName({ ...userName, lastName: value });
        }}
        placeholder="Last Name"
      />
      <TouchableOpacity
        style={globalStyles.logInButton}
        onPress={handleNextPress}
      >
        <Text style={globalStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
