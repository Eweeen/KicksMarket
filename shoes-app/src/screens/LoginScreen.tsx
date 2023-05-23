import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from "../services/auth";

function LoginScreen({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [loader, setLoader] = useState(false);

  const submit = async () => {
    setError(null);
    setLoader(true);
    
    const { data, error } = await login(email, password);

    if (error || !data) {
      setLoader(false);
      setError(error?.message ?? "Une erreur est survenue");
      return;
    }

    AsyncStorage.setItem('@token', data.token);

    // Redirect to Home
    const home = CommonActions.reset({
      index: 1,
      routes: [{ name: 'Home' }],
    });
    navigation.dispatch(home);

    setLoader(false);
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title}>Se connecter</Text>

            <SafeAreaView style={styles.form}>
              {error &&
                <View style={styles.error}>
                  <Text style={{ color: "#fff" }}>{error}</Text>
                </View>
              }

              <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e)}
              ></TextInput>

              <TextInput
                style={styles.input}
                value={password}
                placeholder="Mot de passe"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(e) => setPassword(e)}
              ></TextInput>

              <CustomButton title="Connexion" isLoading={loader} onPress={submit}></CustomButton>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
    borderRadius: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    marginTop: 60,
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  error: {
    backgroundColor: "#ef4444",
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
    width: "100%",
  },
});

export default LoginScreen;