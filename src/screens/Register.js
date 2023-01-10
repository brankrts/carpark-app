/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, setOwner } from "../redux/auth";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const registerTypes = ["Otopark Sahibi", "Kullanıcı"];
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginTop: 30,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Kayıt Ol
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            borderWidth: 1,
            borderColor: "white",
            width: "90%",
            padding: 20,
          }}
        >
          {error && (
            <Text style={{ color: "red" }}>
              Kayıt başarısız lütfen bilgilerinizi kontrol ediniz
            </Text>
          )}
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Eposta"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                email: text,
              });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                password: text,
              });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="İsim soyisim"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                name: text,
              });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası"
            keyboardType="number-pad"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setUserInfo({
                ...userInfo,
                phoneNumber: text,
              });
            }}
          />

          <View>
            <Text
              style={{
                color: "white",
                marginTop: 20,
              }}
            >
              Kayıt tipi
            </Text>

            <SelectDropdown
              data={registerTypes}
              dropdownStyle={{
                borderRadius: 20,
              }}
              buttonStyle={{
                height: 30,
                borderColor: "pink",
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              defaultButtonText="Seçiniz.."
              onSelect={(selectedItem, index) => {
                index === 0
                  ? setUserInfo({ ...userInfo, owner: "true" })
                  : setUserInfo({ ...userInfo, owner: "false" });
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 200,
                height: 30,
                borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              onPress={() => {
                dispatch(register(userInfo));
                dispatch(setOwner(userInfo.owner));
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                Kayıt ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    marginTop: 15,
    height: 40,
    padding: 10,
  },
});

export default Register;
