// RealtimeData.js
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { database } from '../../config/firebaseConfig';
import { ref,onValue } from 'firebase/database';

const db=database

const RealtimeData = () => {
  const {user,isLoading}= useAuth()
  const [temperature, setTemperature] = useState('');
  const [spo2, setSpo2] = useState('');
  const [bpm, setBpm] = useState('');

  useEffect(() => {
    if (user && !isLoading) {
      // Obtener referencia a la ubicación de la base de datos del usuario
      const databaseRef = ref(db,`/UsersData/${user.uid}`);
      
      // Escuchar cambios en los datos
      onValue(databaseRef,(snapshot) => {
        const data = snapshot.val();
        setTemperature(data.temperature);
        setSpo2(data.spo2);
        setBpm(data.bpm);
      });
    }
  }, []);

  return (
    <div>
      <h2>Temperatura: {temperature}</h2>
      <h2>Spo2: {spo2}</h2>
      <h2>BPM: {bpm}</h2>
    </div>
  );
};

export default RealtimeData;
