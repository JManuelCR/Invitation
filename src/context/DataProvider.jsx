import { useEffect, useState } from "react";
import { getPeople } from "../services/apdiPeopleService";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children, guestId }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPeople = async () => {
        // Si no hay guestId, usar un ID por defecto o hacer una consulta diferente
        const idToUse = guestId || "default";
        
        try {
            console.log("Fetching data for guestId:", idToUse);
            const response = await getPeople(idToUse);
            console.log("Response received:", response.data);
            setPerson(response.data);
        } catch (error) {
            console.error("Error loading people:", error);
            setPerson(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("DataProvider useEffect triggered with guestId:", guestId);
        loadPeople();
    }, [guestId]);
    
    return (
        <DataContext.Provider value={{ person, loading }}>
            {children}
        </DataContext.Provider>
    );
};

