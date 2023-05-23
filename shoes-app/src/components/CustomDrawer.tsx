import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();

  const close = () => {
    props.navigation.closeDrawer();
  }

  const logout = async () => {
    await AsyncStorage.removeItem('@token');

    const firstPage = CommonActions.reset({
      index: 1,
      routes: [{ name: 'FirstPage' }],
    });
    navigation.dispatch(firstPage);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={close}>
        <FontAwesome5 name="times" size={24} color="#000" />
      </TouchableOpacity>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.textButton}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginTop: 65,
    marginLeft: "auto",
    marginRight: 16,
  },
  btn: {
    backgroundColor: "#ffe8f4",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 999,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  textButton: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomDrawer;
