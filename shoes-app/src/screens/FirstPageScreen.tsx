import { NavigationProp } from "@react-navigation/native";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function FirstPage({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          resizeMode="cover"
          style={styles.image}
        >
          <SafeAreaView style={styles.content}>
            <Text style={styles.title}>KicksMarket</Text>

            <Text style={styles.description}>
              Les sneakers de vos rêves sont à portée de main : découvrez-les dès maintenant sur notre application.
            </Text>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Connexion</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signUp} onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ fontSize: 18 }}>Inscription</Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: '#fff' }}>Continuer en tant qu'invité</Text>
            </TouchableOpacity> */}
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 28,
  },
  description: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 48,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  login: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUp: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
  },
});

export default FirstPage;
