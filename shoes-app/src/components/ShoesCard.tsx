import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IShoes } from "../interfaces/shoes.interface";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";

const ShoesCard = ({ shoes }: { shoes: IShoes }) => {
  const navigation = useNavigation();
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

      <TouchableOpacity style={styles.navigate} onPress={() => navigation.navigate('Shoes', { shoes }) }>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://images.stockx.com/360/${shoes.image}/Images/${shoes.image}/Lv2/img01.jpg?fm=avif&auto=compress` }}
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.name}>{shoes.name}</Text>
          <Text style={styles.price}>{shoes.price}€</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.elipseBottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "50%",
    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 8,
  },
  navigate: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name : {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    textAlign: "center",
    fontSize: 12,
  },
  imageContainer: {
    width: "100%",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 100,
    transform: [{ scaleX: -1 }],
    // { rotate: "3deg" }
    zIndex: -2,
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
    borderColor: "#fafafa",
    borderWidth: 2,
    borderRadius: 999,
  },
});

export default ShoesCard;
