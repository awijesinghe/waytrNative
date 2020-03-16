import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignIn from "../screens/signIn";
import SignUp_email from "../screens/signUp_email";
import SignUp_password from "../screens/signUp_password";
import SignUp_user from "../screens/signUp_user";

const screens = {
  SignIn: {
    screen: SignIn
  },
  SignUp_email: {
    screen: SignUp_email
  },
  SignUp_password: {
    screen: SignUp_password
  },
  SignUp_user: {
    screen: SignUp_user
  }
};

const AccountCredStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

export default createAppContainer(AccountCredStack);
