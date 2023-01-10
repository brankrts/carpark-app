/** @format */

import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useParksListener } from "../firebase/firebase";
import { useLocation } from "../hooks/location";
import UserModal from "./UserModal";
import { useMakingReservation } from "../firebase/firebase";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { useState } from "react";
import {
  setModalOpen,
  setSelectedId,
  setCarParks,
  setParkWithId,
  logout,
} from "../redux/auth";
const CustomModal = ({ visible, hideModal, containerStyle, rezervations }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {rezervations.length > 0 &&
          rezervations.map((rezer) => {
            return (
              <Text style={{ color: "white", fontSize: 17, marginBottom: 20 }}>
                {rezer.carparkName} : {rezer.rezervationTime}
              </Text>
            );
          })}
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            width: 100,
            height: 30,
            borderWidth: 1,
            borderColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
          }}
          onPress={() => hideModal()}
        >
          <Text>Gizle</Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
};
const Map = () => {
  const isMapLoading = useSelector((state) => state.auth.isMapOpen);
  const isModalOpen = useSelector((state) => state.auth.isModalOpen);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "gray",
    height: "70%",
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  };

  const myLoc = useSelector((state) => state.auth.location);
  const marks = useParksListener();
  const lll = useLocation();
  const dispatch = useDispatch();
  const makingRezervation = useMakingReservation();

  useEffect(() => {
    dispatch(setCarParks(marks));
  }, [marks]);

  return (
    <Provider>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "red",
            backgroundColor: "transparent",

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottomColor: "blue",
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onPress={() => {
              showModal();
            }}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              Rezervasyonlar
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              color: "blue",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Harita
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              marginLeft: 10,
            }}
            onPress={() => {
              dispatch(logout());
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Çıkış yap
            </Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={{ alignSelf: "stretch", height: "100%" }}
          region={isMapLoading ? null : myLoc}
          showsUserLocation
        >
          {marks.map((mark, index) => {
            return (
              <Marker
                key={index}
                coordinate={mark.location}
                title={mark.carparkName}
                onPress={() => {
                  dispatch(setModalOpen(true));
                  dispatch(setSelectedId(mark.id));
                  dispatch(setParkWithId());
                }}
              ></Marker>
            );
          })}
        </MapView>

        {isModalOpen ? <UserModal /> : null}

        <CustomModal
          visible={visible}
          hideModal={hideModal}
          containerStyle={containerStyle}
          rezervations={makingRezervation}
        ></CustomModal>
      </View>
    </Provider>
  );
};
export default Map;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
