import { FlatList, StyleSheet, Text, View } from "react-native";
import { IShoesFavorites } from "../interfaces/shoes.interface";
import { useEffect, useState } from "react";
import FavoriteShoesCard from "../components/favorites/FavoriteShoesCard";
import { getShoesInFavorites } from "../services/shoes";

function FavoritesScreen() {
  const [shoes, setShoes] = useState([] as IShoesFavorites[]);

  const findFavorites = async () => {
    const { data, error } = await getShoesInFavorites();
    if (error) return;
    setShoes(data ?? []);
  }

  useEffect(() => {
    findFavorites();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Mes Favoris</Text>

        <FlatList
          data={shoes}
          renderItem={({ item }) => (<FavoriteShoesCard shoes={item} />)}
          keyExtractor={item => item._id}
        ></FlatList>
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
    marginBottom: 40,
    color: '#9729D6',
  },
});

export default FavoritesScreen;
