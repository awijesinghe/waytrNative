import React, { useState } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import TabNavigation from "./routes/tabNavigation";
import { globalStyles } from "./styles/global";
import Firebase from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContextProvider from "./contexts/UserContext";
import { Provider as PaperProvider } from "react-native-paper";
import AccountStackCred from "./routes/accountCredStack";
import SignUpContextProvider from "./contexts/SignUpContext";
import RestaurantListContextProvider from "./contexts/RestaurantListContext";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const getFonts = () =>
  Font.loadAsync({
    "raleway-regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "raleway-light": require("./assets/fonts/Raleway-Light.ttf"),
    "raleway-italic": require("./assets/fonts/Raleway-Italic.ttf")
  });

export default function App() {
  const [user, initialising] = useAuthState(Firebase.auth);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    if (!initialising) {
      return user ? (
        <UserContextProvider>
          <RestaurantListContextProvider>
            <PaperProvider>
              <StatusBar />
              <TabNavigation user={user} styles={globalStyles.tabNav} />
            </PaperProvider>
          </RestaurantListContextProvider>
        </UserContextProvider>
      ) : (
          <SignUpContextProvider>
            <AccountStackCred />
          </SignUpContextProvider>
        );
    } else {
      return <AppLoading />;
    }
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
