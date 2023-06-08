import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const { logout } = useContext(UserContext);

  const close = () => {
    navigation.closeDrawer();
  }

  const submit = async () => {
    logout();

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

      <TouchableOpacity style={styles.btn} onPress={submit}>
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
