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

    useEffect(() => {
        loadPeople();
    }, [dataGuestId]);
    
    return (
        <DataContext.Provider value={{ person, loading, guestId, setPerson }}>
            {children}
        </DataContext.Provider>
    );
};

