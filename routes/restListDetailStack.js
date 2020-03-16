import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import RestList from "../screens/eat/restList";
import RestMenu from "../screens/eat/restMenu";
import TableConfirmation from "../screens/eat/tableConfirmation";
import Seated from "../screens/eat/seated";
import OrderMenu from "../screens/eat/orderMenu";

const screens = {
  RestList: {
    screen: RestList
  },
  RestMenu: {
    screen: RestMenu
  },
  TableConfirmation: {
    screen: TableConfirmation
  },
  Seated: {
    screen: Seated
  },
  OrderMenu: {
    screen: OrderMenu
  }
};

const RestListDetailStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

export default createAppContainer(RestListDetailStack);
