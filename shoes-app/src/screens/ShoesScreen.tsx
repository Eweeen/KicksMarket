import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IShoes } from "../interfaces/shoes.interface";
import { FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import ShoesImage from "../components/shoes/ShoesImage";
import { UserContext } from "../contexts/UserContext";

function ShoesScreen({ route }: { route: any }) {
  const [shoes, setShoes] = useState(route.params.shoes as IShoes);
  const [isFavoris, setIsFavoris] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useContext(UserContext);

  const [selectedId, setSelectedId] = useState(undefined as number | undefined);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const numberOptions = Array.from({ length: 5 }, (_, index) => ({
    label: (index + 1).toString(),
    value: index + 1,
  }));

  const toggleFavoris = () => {
    if (isFavoris) {
      removeFavorite(shoes._id);
    } else {
      addFavorite(shoes);
    }
  }

  const addToCart = () => {
    if (!selectedId) return Alert.alert("Veuillez sélectionner une taille");

    return Alert.alert("Ajouté au panier !");
  }

  useEffect(() => {
    setIsFavoris(favorites.find(favorite => favorite._id === shoes._id) ? true : false);
  }, [favorites]);

  return(
    <>
      <View style={styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <ShoesImage image={shoes.image} />

          <View style={styles.infos}>
            <Text style={styles.brand}>{shoes.brand}</Text>
            <Text style={styles.name}>{shoes.name}</Text>
            <Text style={styles.price}>{shoes.price}€</Text>
          </View>

          <View style={{ marginBottom: 35 }}>
            <Text style={styles.title}>Tailles</Text>

            <FlatList
              horizontal
              data={shoes.sizes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.sizeContainer,
                    item.size === selectedId
                      ? { backgroundColor: "#000" }
                      : item.quantity > 0
                        ? { backgroundColor: "#CBCBCB" }
                        : { backgroundColor: "#EBEBEB" },
                  ]}
                  onPress={() => item.quantity > 0 ? setSelectedId(item.size) : null}
                >
                  <Text style={[
                    styles.size,
                    item.size === selectedId
                      ? { color: "#fff" }
                      : item.quantity > 0
                        ? { color: "#000" }
                        : { color: "#CBCBCB" },
                  ]}>{item.size}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.size.toString()}
            ></FlatList>
          </View>

          <View style={{ marginBottom: 35 }}>
            <Text style={styles.title}>Quantité</Text>

            <View style={styles.quantity}>
              <RNPickerSelect
                value={selectedNumber}
                onValueChange={(value) => setSelectedNumber(value)}
                items={numberOptions}
                Icon={() => <FontAwesome name="chevron-down" size={12} />}
              />
            </View>
          </View>

          <View style={{ marginBottom: 120 }}>
            <Text style={styles.title}>Description</Text>

            <Text style={{ fontSize: 14, }}>{shoes.description}</Text>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.favorite} onPress={() => toggleFavoris}>
            {
              isFavoris
                ? <FontAwesome name="heart" size={32} color="#fc81c5" />
                : <FontAwesome name="heart-o" size={32} color="#fc81c5" />
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.panier} onPress={() => addToCart()}>
            <Text style={styles.panierText}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  infos: {
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    marginBottom: 35,
  },
  brand: {
    fontSize: 17,
    color: "#500C99",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  price: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    color: "#500C99",
    fontWeight: "600",
  },
  sizeContainer: {
    borderRadius: 12,
    marginRight: 8,
  },
  size: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  quantity: {
    width: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 8,
    gap: 20,
  },
  favorite: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fc81c5",
  },
  panier: {
    flexGrow: 1,
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  panierText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ShoesScreen;