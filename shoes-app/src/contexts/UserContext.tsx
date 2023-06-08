import { createContext, useEffect, useState } from "react";
import { IShoes, IShoesCart } from "../interfaces/shoes.interface";
import { addToCart, addToFavorite, getCart, getFavorites, removeToFavorite } from "../services/user";
import { login as setLogin } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IDecodedToken, IUser } from "../interfaces/user.interface";
import jwtDecode from "jwt-decode";

type ContextType = {
  user: IUser,
  setUser: (user: IUser) => void;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  favorites: IShoes[];
  addFavorite: (shoe: IShoes) => void;
  removeFavorite: (shoeId: string) => void;
  cart: IShoesCart[];
  addCart: (shoes: IShoes, quantity: number, size: number) => Promise<string | undefined>;
}

export const UserContext = createContext<ContextType>({
  user: {} as IUser,
  setUser: () => {},
  login: (email: string, password: string) => new Promise(() => {}),
  logout: () => {},
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  cart: [],
  addCart: () => new Promise(() => {}),
});

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<IShoes[]>([]);
  const [cart, setCart] = useState<IShoesCart[]>([]);

  const login = async (email: string, password: string) => {
    // Effectue le processus de connexion et met à jour l'état d'authentification
    const { data } = await setLogin(email, password)
    if (!data) return;

    const decodedToken = jwtDecode(data.token) as IDecodedToken;

    setUser(decodedToken.user);
    setIsLoggedIn(true);

    return data.token;
  };

  const logout = async () => {
    // Effectue le processus de déconnexion et met à jour l'état d'authentification
    await AsyncStorage.removeItem('@token');

    setUser({} as IUser);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('@token');

      if (token) {
        const decodedToken = jwtDecode(token) as IDecodedToken;
        setUser(decodedToken.user);
        setIsLoggedIn(true);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    // Récupère les favoris et le panier de l'utilisateur
    const fetchFavorites = async () => {
      const { data, error } = await getFavorites();

      if (error) {
        console.log('Erreur lors de la récupération des favoris :', error.message);
        return;
      }

      setFavorites(data ?? []);
    };
    // Récupère les favoris et le panier de l'utilisateur
    const fetchCart = async () => {
      const { data, error } = await getCart();

      if (error) {
        console.log('Erreur lors de la récupération du panier :', error.message);
        return;
      }

      setCart(data ?? []);
    };
    // Si l'utilisateur est connecté, on récupère ses favoris et son panier
    if (isLoggedIn) {
      fetchFavorites();
      fetchCart();
    }
  }, [isLoggedIn]);

  // Ajoute une chaussure aux favoris
  const addFavorite = (shoe: IShoes) => {
    if (!isLoggedIn) return;
    // Effectue une requête API pour ajouter la chaussure aux favoris
    addToFavorite(shoe._id)
      .then(() => {
        setFavorites((prevFavorites) => [...prevFavorites, shoe]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la chaussure aux favoris : ", error);
      });
  };

  // Supprime une chaussure des favoris
  const removeFavorite = (shoeId: string) => {
    if (!isLoggedIn) return;
    // Effectue une requête API pour supprimer la chaussure des favoris
    removeToFavorite(shoeId)
      .then(() => {
        setFavorites((prevFavorites) => prevFavorites.filter((shoe) => shoe._id !== shoeId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la chaussure des favoris : ", error);
      });
  };

  const addCart = async (shoes: IShoes, quantity: number, size: number) => {
    // Effectue une requête API pour ajouter la chaussure aux panier
    const { error } = await addToCart(shoes._id, quantity, size);

    if (error) {
      return error.message;
    }

    const cart = await getCart();

    if (cart.error) {
      console.log('Erreur lors de la récupération du panier :', cart.error.message);
      return;
    }

    setCart(cart.data ?? []);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, favorites, addFavorite, removeFavorite, cart, addCart }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;