import { useEffect, useState } from "react";
import { getGuest } from "../services/apdiPeopleService";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children, guestId: dataGuestId }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [guestId, setGuestId] = useState('');

    const loadPeople = async () => {
        // Si no hay guestId, usar un ID por defecto o hacer una consulta diferente
        const idToUse = dataGuestId || "default";
        setGuestId(idToUse);
        try {
            const response = await getGuest(idToUse);
            setPerson(response.data);
        } catch (error) {
            setPerson(null);
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar la data global
    const updatePerson = (updatedData) => {
        setPerson(prevPerson => {
            if (prevPerson) {
                return { ...prevPerson, ...updatedData };
            }
            return updatedData;
        });
    };

    // Función para recargar la data desde el servidor
    const refreshPerson = async () => {
        if (guestId) {
            try {
                const response = await getGuest(guestId);
                setPerson(response.data);
            } catch (error) {
                console.error('Error refreshing person data:', error);
            }
        }
    };

    useEffect(() => {
        loadPeople();
    }, [dataGuestId]);
    
    return (
        <DataContext.Provider value={{ 
            person, 
            loading, 
            guestId, 
            setPerson, 
            updatePerson, 
            refreshPerson 
        }}>
            {children}
        </DataContext.Provider>
    );
};

