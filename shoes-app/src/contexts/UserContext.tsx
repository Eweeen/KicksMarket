import { createContext, useEffect, useState } from "react";
import { IShoes } from "../interfaces/shoes.interface";
import { addToFavorite, getFavorites, removeToFavorite } from "../services/user";

type ContextType = {
  data: Record<string, any>;
  updateData: (data: Record<string, any>) => void;
  favorites: IShoes[];
  addFavorite: (shoe: IShoes) => void;
  removeFavorite: (shoeId: string) => void;
}

export const UserContext = createContext<ContextType>({
  data: {},
  updateData: (data: Record<string, any>) => {},
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

const UserContextProvider = ({ children }: any) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [favorites, setFavorites] = useState<IShoes[]>([]);

  const updateData = (newData: Record<string, any>) => {
    setData(newData);
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await getFavorites();

      if (error) {
        console.log('Erreur lors de la récupération des favoris :', error.message);
        return;
      }

      setFavorites(data ?? []);
    };

    fetchFavorites();
  }, []);

  // Ajoute une chaussure aux favoris
  const addFavorite = (shoe: IShoes) => {
    // Effectue une requête API pour ajouter la chaussure aux favoris
    addToFavorite(shoe._id)
      .then((response) => {
        setFavorites((prevFavorites) => [...prevFavorites, shoe]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la chaussure aux favoris : ", error);
      });
  };

  // Supprime une chaussure des favoris
  const removeFavorite = (shoeId: string) => {
    // Effectue une requête API pour supprimer la chaussure des favoris
    removeToFavorite(shoeId)
      .then((response) => {
        setFavorites((prevFavorites) => prevFavorites.filter((shoe) => shoe._id !== shoeId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la chaussure des favoris : ", error);
      });
  };

  return (
    <UserContext.Provider value={{ data, updateData, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;