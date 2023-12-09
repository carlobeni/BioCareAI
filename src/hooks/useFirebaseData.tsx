import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { database } from '../config/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const db = database;

const useFirebaseData = () => {
  const { user, isLoading } = useAuth();
  const [fbData, setFbData] = useState({});

  useEffect(() => {
    const fetchData = () => {
      if (user && !isLoading) {
        // Obtener referencia a la ubicación de la base de datos del usuario
        const databaseRef = ref(db, `/UsersData/${user.uid}`);
        onValue(databaseRef, (snapshot) => {
          const data = snapshot.val();
          setFbData(data || {}); // Asegúrate de que data no sea null o undefined
        });
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Puedes realizar acciones de limpieza aquí si es necesario
    };
  }, []);

  return { fbData };
};

export default useFirebaseData;

