import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";

export default function App(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); 
      setLocation(location.coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Map succesfully loaded!";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0300,
            longitudeDelta: 0.0300,
          }}
        >
          <Marker coordinate={location} title="Your Location" />
          <Marker
            coordinate={{
              latitude: 41.29008034602307,
              longitude: -87.42470777557662
            }}
            title={"Mi Ranchito Mexican Restaurant"}
            description="A restaurant near my house."
          />
          {/* to help find the restaurant I marked */}
          <Polyline
          coordinates={[
            {latitude: location.latitude, longitude: location.longitude},
            {latitude: 41.29008034602307, longitude: -87.42470777557662 },
          ]}
          strokeColor="#000"
          strokeWidth={3}/>
        </MapView>
      )}
    </View>
  );
}

{/* I was rather confused by what percisely I was supposed to do.
  Namely I was not sure if I was supposed to have 'dynamic' markers
  for everything or if I was just supposed to match the tutorial in the
  book. I went with static because by all accounts I would have to use
  potentially premium google maps api features to dynamically find nearby
  restaurants. */}