/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Page</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Text>çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
