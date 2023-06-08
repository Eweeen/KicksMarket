import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useHeaderOptions = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={28} style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CartScreen')}>
          <FontAwesome name="shopping-basket" size={20} style={{ marginRight: 16 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  }
});

export default useHeaderOptions;