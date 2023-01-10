/** @format */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsLoggedIn, useCurrentUser } from "../redux/auth";
import Login from "../screens/Login";
import AddCarPark from "../screens/AddCarPark";
import OwnerHome from "../screens/OwnerHome";
import Map from "../screens/Map";
import Register from "../screens/Register";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const user = useCurrentUser();
  const own = useSelector((state) => state.auth.owner);
  const isLoggedIn = useIsLoggedIn();
  const isOwn = own || (user && user?.photoURL === "true");
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          {isOwn ? (
            <>
              <Stack.Screen
                name="OwnerHome"
                component={OwnerHome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddPark"
                component={AddCarPark}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Map"
              component={Map}
              options={{ headerShown: false }}
            />
          )}
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
