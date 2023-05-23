import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IShoes } from "../../interfaces/shoes.interface";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const FavoriteShoesCard = ({ shoes }: { shoes: IShoes }) => {
  const navigation = useNavigation();
  const soldOut = shoes.sizes.every((size) => size.quantity === 0);
  const { removeFavorite } = useContext(UserContext);

  const goTo = () => {
    if (soldOut) {
      Alert.alert("Épuisé", "Ce produit n'est plus disponible");
      return;
    }

    navigation.navigate('Shoes', { shoes });
  }

  return (
    <>
      <TouchableOpacity onPress={() => goTo()}>
        <View style={styles.container}>
          <View style={styles.elipseBottom}></View>
          <Image
            source={{ uri: `https://images.stockx.com/360/${shoes.image}/Images/${shoes.image}/Lv2/img01.jpg?fm=avif&auto=compress` }}
            style={styles.image}
          />

          <View>
            <Text style={styles.brand}>{shoes.brand}</Text>
            <Text style={styles.name}>{shoes.name}</Text>
            <Text style={styles.price}>{shoes.price}€</Text>
          </View>

          <View style={styles.topRound}></View>
          <TouchableOpacity style={styles.favoris} onPress={() => removeFavorite(shoes._id)}>
            <FontAwesome name="heart" size={24} color="#fc81c5" />
          </TouchableOpacity>

          {soldOut && (
            <View style={styles.soldOut}>
              <View style={styles.soldOutCard}>
                <Text style={styles.soldOutText}>Sold Out</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: "hidden",
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 16,
    borderRadius: 24,
    gap: 40,
    alignItems: 'center',
  },
  elipseBottom: {
    position: "absolute",
    zIndex: -1,
    top: -25,
    left: -15,
    width: 150,
    height: 150,
    borderColor: "#f4f4f4",
    borderWidth: 2,
    borderRadius: 999,
  },
  image: {
    width: 100,
    height: "100%",
    transform: [{ scaleX: -1 }],
    zIndex: -2,
  },
  brand: {
    fontSize: 12,
    color: '#500C99',
  },
  name: {
    width: 170,
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 4,
  },
  price: {
    fontSize: 12,
    color: '#500C99',
  },
  soldOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  soldOutCard: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  soldOutText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  topRound: {
    position: "absolute",
    zIndex: -1,
    top: -8,
    right: -8,
    width: 60,
    height: 60,
    borderColor: "#ffe8f4",
    borderWidth: 2,
    borderRadius: 999,
  },
  favoris: {
    position: "absolute",
    zIndex: 1,
    top: 11,
    right: 11,
  },
});

export default FavoriteShoesCard;