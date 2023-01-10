/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../redux/auth";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          backgroundColor: "gray",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "white",
            }}
          >
            Giriş Yap
          </Text>
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          {error && (
            <Text style={{ color: "red" }}>
              Kayıt başarısız lütfen bilgilerinizi kontrol ediniz
            </Text>
          )}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              padding: 10,
              width: "70%",
              marginBottom: 40,
              color: "white",
            }}
            placeholder="Email"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                email: text,
              });
            }}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              padding: 10,
              width: "70%",
              color: "white",
            }}
            placeholder="Şifre"
            placeholderTextColor={"white"}
            secureTextEntry
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                color: "#fff7",
                fontSize: 15,
              }}
            >
              Hesabım yok mu? Kayıt ol.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              width: "50%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
            onPress={() => {
              dispatch(login(userInfo));
            }}
          >
            <Text style={{ color: "white" }}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
