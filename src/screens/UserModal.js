/** @format */

import React, { useState } from "react";
import { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ReactNativeModal } from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, useCurrentUser } from "../redux/auth";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addReservation } from "../firebase/firebase";
const UserModal = () => {
  const selectedPark = useSelector((state) => state.auth.modalData);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.auth.isModalOpen);
  const [time, setTime] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const user = useCurrentUser();
  return (
    <View style={styles.container}>
      <ReactNativeModal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          dispatch(setModalOpen(false));
        }}
      >
        {}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  backgroundColor: "red",
                  right: 0,
                }}
                onPress={() => {
                  dispatch(setModalOpen(false));
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
              }}
            >
              {selectedPark.map((sel, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.text}>
                      Otopark adı :{sel.carparkName}
                    </Text>
                    <Text style={styles.text}>
                      Saatlik Ücret : {sel.pricePerHour}
                    </Text>
                    <Text style={styles.text}>Kapasite : {sel.capacity}</Text>
                    <Text style={styles.text}>Açılış : {sel.opening}</Text>
                    <Text style={styles.text}>Kapanış : {sel.closing}</Text>
                    <Text style={styles.text}>
                      İletişim : {sel.phoneNumber}
                    </Text>
                    <Text style={styles.text}>
                      Doluluk Oranı : {sel.occupancy}/{sel.capacity}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Rezervasyon almak ister misiniz?
                      </Text>
                      <Text>Saat seçin</Text>

                      <RNDateTimePicker
                        style={{
                          marginTop: 30,
                        }}
                        mode="time"
                        display="clock"
                        value={time}
                        onChange={(e, data) => {
                          setTime(data);
                          const date = new Date(e.nativeEvent.timestamp);
                          setDateString(
                            date.getHours() +
                              ":" +
                              date.getMinutes() +
                              ", " +
                              date.toDateString()
                          );
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: "gray",
                          width: 200,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 50,
                          borderRadius: 20,
                        }}
                        onPress={() => {
                          addReservation(sel.id, {
                            id: user?.uid,
                            from: user?.displayName,
                            time: dateString,
                          });
                          alert(
                            "Rezervasyon işleminiz başarı ile gerçekleştirilmiştir."
                          );
                        }}
                      >
                        <Text>Rezervasyon Yap</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: -55,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    height: "60%",
  },
  text: {
    fontWeight: "600",
    marginTop: 10,
  },
});
export default memo(UserModal);
