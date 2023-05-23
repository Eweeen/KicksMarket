import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text, Button, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { signUp } from "../services/auth";
import { ISignUp } from "../interfaces/auth.interface";

function SignUpScreen({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("Date de naissance");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<null | string>(null);
  const [loader, setLoader] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const submit = async () => {
    setError(null);
    setLoader(true);

    if (lastname === "" || firstname === "" || email === "" || date === "Date de naissance" || password === "") {
      setError("Veuillez remplir tous les champs");
      setLoader(false);
      return;
    }

    const split = date.split("/");
    const formatDate = `${split[1]}-${split[0]}-${split[2]}`;

    const req = {
      lastname,
      firstname,
      birthdate: formatDate,
      email,
      password
    } satisfies ISignUp;

    const { data, error } = await signUp(req);

    if (error || !data) {
      setLoader(false);
      setError(error?.message ?? "Une erreur est survenue");
      return;
    }

    console.log(data);

    setLoader(false);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.title}>S'inscire</Text>

              <SafeAreaView style={styles.form}>
                {error &&
                  <View style={styles.error}>
                    <Text style={{ color: "#fff" }}>{error}</Text>
                  </View>
                }

                <TextInput
                  style={styles.input}
                  value={lastname}
                  placeholder="Nom"
                  autoCorrect={false}
                  onChangeText={(e) => setLastName(e)}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  value={firstname}
                  placeholder="Prénom"
                  autoCorrect={false}
                  onChangeText={(e) => setFirstname(e)}
                ></TextInput>
                {/* Date time picker */}
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.input}
                >
                  <Text style={{ textAlign: 'left' }}>{date}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  textColor="#000"
                />
                {/* ================ */}
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

                <CustomButton title="S'inscrire" isLoading={loader} onPress={submit}></CustomButton>
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
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
    width: "100%",
  },
});

export default SignUpScreen;
