import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import useHeaderOptions from "../components/navigation/useHeaderOptions";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "../services/user";
import { CommonActions, useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(UserContext);

  console.log(user);

  const deleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ?",
      [
        { text: "Annuler", onPress: () => {}, style: "cancel" },
        { text: "Supprimer", onPress: () => confirmDelete() }
      ]
    );
  }

  const confirmDelete = async () => {
    await deleteUser(user._id);

    Alert.alert(
      "Compte supprimé",
      "Votre compte a bien été supprimé",
      [
        { text: "OK", onPress: () => {
          logout();
          const firstPage = CommonActions.reset({
            index: 1,
            routes: [{ name: 'FirstPage' }],
          });
          navigation.dispatch(firstPage);
        }, style: "cancel" },
      ]
    );
  }


  useHeaderOptions();

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ paddingTop: 24 }}>
            {/* ========== Photo ========== */}
            <View style={styles.imageContainer}>
              <FontAwesome5 name="user-alt" size={56} />
            </View>
            <Text style={{ textAlign: "center", marginBottom: 24 }}>Modifier la photo</Text>
            {/* =========================== */}
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                value={user.firstname}
                placeholder="Prénom"
              ></TextInput>
            </View>

            <View style={[styles.inputContainer, { borderTopWidth: 0 } ]}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                value={user.lastname}
                placeholder="Nom"
              ></TextInput>
            </View>

            <Text style={styles.subtitle}>Paramètres</Text>

            <View style={[styles.inputContainer, { marginBottom: 24 } ]}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={user.email}
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              ></TextInput>
            </View>

            <TouchableOpacity style={styles.actions}>
              <Text style={styles.textAction}>Commandes</Text>
              <AntDesign name="arrowright" size={24} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actions, { borderTopWidth: 0 } ]}>
              <Text style={styles.textAction}>Factures</Text>
              <AntDesign name="arrowright" size={24} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actions, { borderTopWidth: 0 } ]}>
              <Text style={styles.textAction}>Informations de paiements</Text>
              <AntDesign name="arrowright" size={24} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={() => deleteAccount()}>
              <Text style={styles.deleteText}>Supprimer le compte</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "#FFE8F4",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    marginRight: 12,
  },
  input: {
    fontSize: 16,
    width: "100%",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#9729D6',
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  actions: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
  },
  textAction: {
    fontSize: 18,
    fontWeight: "900",
  },
  delete: {
    backgroundColor: "#fff",
    padding: 24,
    marginTop: 24,
    marginBottom: 64,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
  },
  deleteText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF0000",
    textAlign: "center",
  },
});

export default ProfileScreen;
