import React, { useState, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import Firebase from "../firebase/firebase";
import { SignUpContext } from "../contexts/SignUpContext";

export default function SignUp_email({ navigation }) {
  const { email, setEmail } = useContext(SignUpContext);
  const defaultMessage =
    "This will be used to log in and for account recovery.";
  const [subText, setSubText] = useState({
    message: defaultMessage,
    err: false
  });

  const handleNextPress = () => {
    Firebase.auth
      .fetchSignInMethodsForEmail(email)
      .then(resp => {
        if (resp.length === 0) {
          navigation.navigate("SignUp_password");
        } else {
          setSubText({
            message: "Email address is already in use.",
            err: true
          });
        }
      })
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
            setSubText({
              message: "Email address format is incorrect.",
              err: true
            });
        }
      });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.motto}>Enter email address</Text>
      <TextInput
        style={globalStyles.logInInput}
        keyboardType="email-address"
        onChangeText={value => {
          setSubText({ message: defaultMessage, err: false });
          setEmail(value);
        }}
        placeholder="Email"
      />
      <Text style={subText.err ? globalStyles.errMessage : globalStyles.center}>
        {subText.message}
      </Text>

      <TouchableOpacity
        style={globalStyles.logInButton}
        onPress={handleNextPress}
      >
        <Text style={globalStyles.buttonText}>Next</Text>
      </TouchableOpacity>
      <View style={globalStyles.signUpText}>
        <Text style={globalStyles.center}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Text style={globalStyles.hyperLink}>Sign In.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
