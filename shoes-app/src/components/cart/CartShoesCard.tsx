import { StyleSheet, Text, View } from "react-native";
import { IShoesCart } from "../../interfaces/shoes.interface";
import CartShoesImage from "./CartShoesImage";

const CartShoesCard = ({ cartItem }: { cartItem: IShoesCart }) => {
  return (
    <>
      <View style={styles.container}>
        <CartShoesImage shoes={cartItem.shoes} />

        <View style={styles.infosContainer}>
          <Text style={styles.name}>{cartItem.shoes.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#B8B8B8' }}>Taille:</Text>
            <Text>{cartItem.size}</Text>
          </View>
          <Text style={styles.price}>{cartItem.shoes.price * cartItem.quantity}€</Text>
          <Text style={styles.price}>Quantité: {cartItem.quantity}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    flexDirection: "row",
  },
  infosContainer: {
    width: "50%",
    paddingLeft: 12,
    justifyContent: "center",
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartShoesCard;