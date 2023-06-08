import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IShoes } from "../../interfaces/shoes.interface";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const CartShoesImage = ({ shoes }: { shoes: IShoes }) => {
  const [isFavoris, setIsFavoris] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useContext(UserContext);

  const toggleFavoris = () => {
    if (isFavoris) {
      removeFavorite(shoes._id);
    } else {
      addFavorite(shoes);
    }
  }

  useEffect(() => {
    const findFavoris = favorites?.find(favorite => favorite._id === shoes._id);
    setIsFavoris(findFavoris ? true : false);
  }, [favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.topRound}></View>
      <TouchableOpacity style={styles.favoris} onPress={() => toggleFavoris()}>
        {
          isFavoris
            ? <FontAwesome name="heart" size={24} color="#fc81c5" />
            : <FontAwesome name="heart-o" size={24} color="#fc81c5" />
        }
      </TouchableOpacity>

      <Image
        source={{ uri: `https://images.stockx.com/360/${shoes.image}/Images/${shoes.image}/Lv2/img01.jpg?fm=avif&auto=compress` }}
        style={styles.image}
      />

      <View style={styles.elipseBottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 180,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
  },
  image: {
    width: "85%",
    height: 110,
    transform: [{ scaleX: -1 }],
  },
  topRound: {
    position: "absolute",
    zIndex: 1,
    top: -10,
    left: -10,
    width: 60,
    height: 60,
    borderColor: "#ffe8f4",
    borderWidth: 2,
    borderRadius: 999,
  },
  favoris: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
  },
  elipseBottom: {
    position: "absolute",
    zIndex: -1,
    bottom: -30,
    right: -30,
    width: 90,
    height: 90,
    borderColor: "#F4F4F4",
    borderWidth: 2,
    borderRadius: 999,
  },
});

export default CartShoesImage;