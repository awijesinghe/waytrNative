import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import OrdersList from "../screens/orders/ordersList";
import OrderDetails from "../screens/orders/orderDetails";

const screens = {
  OrdersList: {
    screen: OrdersList
  },
  OrderDetails: {
    screen: OrderDetails
  }
};

const OrderDetailStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

export default createAppContainer(OrderDetailStack);
