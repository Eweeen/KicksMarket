import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IShoes } from "../interfaces/shoes.interface";
import ShoesCard from "../components/home/ShoesCard";
import { getBrands, getShoes } from "../services/shoes";
import useHeaderOptions from "../components/navigation/useHeaderOptions";

function HomeScreen() {
  const [shoes, setShoes] = useState([] as IShoes[]);
  const [brands, setBrands] = useState([] as string[]);

  const findShoes = async () => {
    const { data, error } = await getShoes();
    if (error) return;
    setShoes(data ?? []);
  }

  const findBrands = async () => {
    const { data, error } = await getBrands();
    if (error) return;
    setBrands(data ?? []);
  }
  
  useEffect(() => {
    findShoes();
    findBrands();
  }, []);

  useHeaderOptions();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.brands}>
          <Text style={styles.title}>Catégories</Text>

          <FlatList
            horizontal
            data={brands}
            renderItem={({ item }) => (<Text style={styles.item}>{item}</Text>)}
            keyExtractor={item => item}
          ></FlatList>
        </View>

        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.row} 

          data={shoes}
          renderItem={({ item }) => (
            <ShoesCard shoes={item} />
          )}
          keyExtractor={item => item._id}
        />
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
  brands: {
    marginBottom: 12,
  },
  title: {
    color: "#9729D6",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 18,
  },
  item: {
    fontSize: 14,
    fontWeight: "700",
    marginRight: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    gap: 12,
  },
});

export default HomeScreen;