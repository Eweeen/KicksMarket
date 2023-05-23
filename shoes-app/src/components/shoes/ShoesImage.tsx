import { Image, StyleSheet, View } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

const ShoesImage = ({ image }: { image: string }) => {
  const [images, setImages] = useState("01" as string);


  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://images.stockx.com/360/${image}/Images/${image}/Lv2/img${images}.jpg?fm=avif&auto=compress` }}
          style={styles.image}
        />
        <Slider
          minimumValue={1}
          maximumValue={36}
          step={1}
          value={1}
          onValueChange={(value) => setImages(value.toString().padStart(2, "0"))}
          containerStyle={styles.slider}
        />

        <MaterialIcons name="360" size={32} style={styles.rotate} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 230,
    marginBottom: 35,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 230,
  },
  slider: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0,
  },
  rotate: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default ShoesImage;