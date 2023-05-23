import { Image, StyleSheet, Text, View } from "react-native";
import { IShoesFavorites } from "../../interfaces/shoes.interface";

const FavoriteShoesCard = ({ shoes }: { shoes: IShoesFavorites }) => {
  return (
    <>
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

        {shoes.soldOut && (
          <View style={styles.soldOut}>
            <View style={styles.soldOutCard}>
              <Text style={styles.soldOutText}>Sold Out</Text>
            </View>
          </View>
        )}
      </View>
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
    width: 190,
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
    top: 14,
    left: 14,
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
});

export default FavoriteShoesCard;