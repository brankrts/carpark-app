/** @format */
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMapOpen } from "../redux/auth";
import { setLocation } from "../redux/auth";

import * as Location from "expo-location";

export const useLocation = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      dispatch(setIsMapOpen(false));

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.getCurrentPositionAsync({}).then((location) => {
        dispatch(
          setLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          })
        );

        dispatch(setIsMapOpen(true));
      });
    })();
  }, []);
};
