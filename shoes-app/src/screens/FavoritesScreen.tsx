import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import FavoriteShoesCard from "../components/favorites/FavoriteShoesCard";
import { UserContext } from "../contexts/UserContext";

function FavoritesScreen() {
  const { favorites } = useContext(UserContext);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Mes Favoris</Text>

        <FlatList
          data={favorites}
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
    marginBottom: 18,
    color: '#9729D6',
  },
});

export default FavoritesScreen;
