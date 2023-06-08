import HomeScreen from './HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/navigation/CustomDrawer';
import FavoritesScreen from './FavoritesScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';

const Drawer = createDrawerNavigator();

function Slot() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerTitle: "KicksMarket",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "900",
          },
          headerStyle: {
            backgroundColor: "#f4f4f4",
          },
          drawerStyle: {
            width: "100%",
            backgroundColor: "#fff",
          },
          drawerLabelStyle: {
            color: "#000",
            fontSize: 40,
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          drawerActiveBackgroundColor: "#fff",
        }}
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{
          title: "Accueil",
        }} />
        <Drawer.Screen name="FavoritesScreen" component={FavoritesScreen} options={{
          title: "Favoris",
        }} />
        <Drawer.Screen name="CartScreen" component={CartScreen} options={{
          title: "Panier",
        }} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{
          title: "Profile",
        }} />
      </Drawer.Navigator>
    </>
  );
}

export default Slot;