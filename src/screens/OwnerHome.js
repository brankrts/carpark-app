/** @format */
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { logout } from "../redux/auth";
import { useDispatch } from "react-redux";
import {
  useReservationListener,
  useOwnListener,
  updateOccupancy,
} from "../firebase/firebase";
import { useState } from "react";

const OwnerHome = () => {
  const dispatch = useDispatch();
  const rezer = useReservationListener();
  const ownListener = useOwnListener();
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState({
    minDisabled: true,
    maxDisabled: false,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anasayfa</Text>
        {ownListener && ownListener.length > 0 ? (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              width: 150,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 5,
              backgroundColor: "gray",
            }}
            disabled={true}
            onPress={() => {
              navigation.navigate("AddPark");
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Zaten Eklendi
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              width: 150,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 5,
              backgroundColor: "green",
            }}
            onPress={() => {
              navigation.navigate("AddPark");
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Otopark Ekle
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.carPark}>
          <View>
            <Text style={styles.carParkHeaderText}>Otoparkım</Text>
          </View>
          {ownListener && ownListener.length > 0 ? (
            <>
              <Text style={styles.parkText}>
                Otopark İsmi :{ownListener[0].carparkName}
              </Text>
              <Text style={styles.parkText}>
                Kapasite :{ownListener[0].capacity}
              </Text>
              <Text style={styles.parkText}>
                Açılış :{ownListener[0].opening}
              </Text>
              <Text style={styles.parkText}>
                Kapanış :{ownListener[0].closing}
              </Text>
              <Text style={styles.parkText}>
                Saatlik Ücret :{ownListener[0].pricePerHour}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 10,
                    padding: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    width: 70,
                    borderColor: "white",
                  }}
                  disabled={disabled.minDisabled}
                  onPress={() => {
                    if (ownListener[0].occupancy > 0) {
                      updateOccupancy(
                        ownListener[0].docId,
                        ownListener[0].occupancy - 1
                      );
                    } else {
                      setDisabled({
                        maxDisabled: false,
                        minDisabled: true,
                      });
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                    }}
                  >
                    Azalt
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Doluluk Oranı: {ownListener[0].occupancy}/
                  {ownListener[0].capacity}
                </Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    borderRadius: 20,
                    width: 70,
                    borderColor: "white",
                  }}
                  disabled={disabled.maxDisabled}
                  onPress={() => {
                    if (ownListener[0].occupancy < ownListener[0].capacity) {
                      setDisabled({
                        ...disabled,
                        minDisabled: false,
                      });
                      updateOccupancy(
                        ownListener[0].docId,
                        ownListener[0].occupancy + 1
                      );
                    } else {
                      setDisabled({
                        minDisabled: false,
                        maxDisabled: true,
                      });
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                    }}
                  >
                    Artır
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text
              style={{
                marginTop: 20,
                color: "red",
                fontSize: 20,
              }}
            >
              Lütfen Bir Otopark ekleyiniz
            </Text>
          )}
        </View>
        <View style={styles.reservation}>
          <Text style={styles.reserTitle}>Rezervasyonlar</Text>

          {rezer &&
            rezer.map((e) => {
              return Object.keys(e).map((key) => {
                return (
                  <Text key={key} style={styles.reserText}>
                    {e[key].from} -- Saat : {e[key].time}
                  </Text>
                );
              });
            })}

          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
            }}
            style={{
              marginTop: 50,
              borderWidth: 1,
              width: 100,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              borderColor: "white",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
  },
  content: {
    flex: 8,
  },
  carPark: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  carParkHeaderText: {
    color: "white",
    fontSize: 20,
  },
  carParkHeaderContent: {
    marginTop: 20,
    borderWidth: 1,
    width: 300,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  parkText: {
    color: "white",
    marginTop: 10,
    fontSize: 15,
  },
  reservation: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  reserText: {
    color: "white",
    marginTop: 15,
  },
  reserTitle: {
    marginTop: -25,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default OwnerHome;
