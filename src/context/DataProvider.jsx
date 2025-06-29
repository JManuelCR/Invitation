import { useEffect, useState } from "react";
import { getPeople } from "../services/apdiPeopleService";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPeople = async () => {
        try {
            // const response = await getPeople();
            // setPeople(response.data);
        } catch (error) {
            console.error("Error loading people:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPeople();
    }, []);
    return (
        <DataContext.Provider value={{ people, loading }}>
            {children}
        </DataContext.Provider>
    );
};

