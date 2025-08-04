import { useEffect, useState } from "react";
import { getGuest } from "../services/apdiPeopleService";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children, guestId }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPeople = async () => {
        // Si no hay guestId, usar un ID por defecto o hacer una consulta diferente
        const idToUse = guestId || "default";
        
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
    }, [guestId]);
    
    return (
        <DataContext.Provider value={{ person, loading }}>
            {children}
        </DataContext.Provider>
    );
};

