import { TouchableOpacity, FlatList, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { IShoesCart } from "../interfaces/shoes.interface";
import { UserContext } from "../contexts/UserContext";
import CartShoesCard from "../components/cart/CartShoesCard";
import useHeaderOptions from "../components/navigation/useHeaderOptions";

function CartScreen() {
  const [shoes, setShoes] = useState([] as IShoesCart[]);
  const [userCart, setUserCart] = useState([] as IShoesCart[]);
  const [total, setTotal] = useState(0);

  const { cart, addCart } = useContext(UserContext);

  useEffect(() => {
    setUserCart(cart);

    setTotal(cart.reduce((acc, curr) => acc + curr.shoes.price * curr.quantity, 0));
  }, [cart]);

  useHeaderOptions();

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Mon Panier</Text>

          <FlatList
            data={userCart}
            renderItem={({ item }) => (<CartShoesCard cartItem={item} />)}
            keyExtractor={item => item._id}
          ></FlatList>
        </View>

        <View style={styles.footer}>
          <View style={styles.total}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Total</Text>
            <Text style={{ fontSize: 28, fontWeight: '700' }}>{total}€</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Acheter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
    color: '#9729D6',
  },
  footer: {
    backgroundColor: '#fff',
    borderRadius: 44,
    padding: 16,
    paddingBottom: 24,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 999,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default CartScreen;
