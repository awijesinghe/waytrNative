import React, { useState, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import Firebase from "../firebase/firebase";
import { SignUpContext } from "../contexts/SignUpContext";

export default function SignUp_password({ navigation }) {
  const { setPassword } = useContext(SignUpContext);
  const [tempPW, setTempPW] = useState({ temp1: "", temp2: "" });
  const [subText, setSubText] = useState();

  const handlePress = () => {
    if (tempPW.temp1 !== tempPW.temp2) {
      setSubText("Passwords do not match.");
    } else {
      if (tempPW.temp1.length < 6) {
        setSubText("Password must be at least 6 characters long.");
      } else {
        setPassword(tempPW.temp1);
        navigation.navigate("SignUp_user");
        console.log("reached");
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.motto}>Create a password</Text>
      <TextInput
        style={globalStyles.logInInput}
        secureTextEntry={true}
        onChangeText={value => {
          setTempPW({ ...tempPW, temp1: value });
        }}
        placeholder="Password"
      />
      <TextInput
        style={globalStyles.logInInput}
        secureTextEntry={true}
        onChangeText={value => {
          setTempPW({ ...tempPW, temp2: value });
        }}
        placeholder="Re-enter password"
      />

      <Text style={globalStyles.errMessage}>{subText}</Text>
      <TouchableOpacity onPress={handlePress} style={globalStyles.logInButton}>
        <Text style={globalStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
