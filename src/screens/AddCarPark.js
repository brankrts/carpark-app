/** @format */

import React, { useState, useEffect } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { useLocation } from "../hooks/location";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addPark, auth } from "../firebase/firebase";
import { useCurrentUser } from "../redux/auth";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const AddCarPark = () => {
  const [information, setİnformation] = useState({});
  const loc = useLocation();
  const isLocUpload = useSelector((state) => state.auth.isMapOpen);
  const myLoc = useSelector((state) => state.auth.location);
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setİnformation({
      ...information,
      havePark: true,
      userId: user?.uid,
      location: { ...myLoc },
      rezervation: [],
      occupancy: 0,
    });
  }, [myLoc]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Otopark Ekleme Sayfası</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Otopark ismi"
              placeholderTextColor={"white"}
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  carparkName: text,
                });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Otopark kapasitesi"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  capacity: text,
                });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Saatlik fiyat"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  pricePerHour: text,
                });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon numarası"
              keyboardType="numeric"
              placeholderTextColor={"white"}
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  phoneNumber: text,
                });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Açılış"
              keyboardType="numeric"
              placeholderTextColor={"white"}
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  opening: text,
                });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Kapanış"
              placeholderTextColor={"white"}
              keyboardType="numeric"
              onChangeText={(text) => {
                setİnformation({
                  ...information,
                  closing: text,
                });
              }}
            />
            <TouchableOpacity
              style={
                isLocUpload
                  ? { ...styles.button, backgroundColor: "green" }
                  : { ...styles.button }
              }
              disabled={!isLocUpload}
              onPress={() => {
                addPark(information);
                navigation.navigate("OwnerHome");
              }}
            >
              <Text style={styles.buttonText}>Otopark Ekle </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  input: {
    borderWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    borderColor: "#fff",
    color: "white",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  titleText: {
    color: "white",
    fontWeight: "600",
    fontSize: 30,
  },
  form: {
    flex: 3,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    height: 30,
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});

export default AddCarPark;
