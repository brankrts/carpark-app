/** @format */

import { Logs } from "expo";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Routes from "./src/router/Routes";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  Logs.enableExpoCliLogging();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
          <Routes />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );

}