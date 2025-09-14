import { useEffect, useState } from "react";
import { getGuest } from "../services/apdiPeopleService";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children, guestId: dataGuestId }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [guestId, setGuestId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loadPeople = async () => {
        try {
            // Verificar si ya estamos cargando para evitar bucles
            if (isLoading) {
                return;
            }
            
            setIsLoading(true);
            setLoading(true);
            
            // Si no hay guestId, usar un ID por defecto o hacer una consulta diferente
            const idToUse = dataGuestId || "default";
            setGuestId(idToUse);
            setError(null);
            
            if (!idToUse || idToUse === 'default') {
                throw new Error('No se proporcionó un ID de invitado válido');
            }
            
            const response = await getGuest(idToUse);
            setPerson(response.data);
        } catch (error) {
            setError({
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            setPerson(null);
        } finally {
            setLoading(false);
            setIsLoading(false);
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
                setError(null);
            } catch (error) {
                setError({
                    message: error.message,
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data
                });
            }
        }
    };

    // Función para reintentar la carga
    const retryLoad = () => {
        setLoading(true);
        setError(null);
        loadPeople();
    };

    useEffect(() => {
        // Timeout de seguridad para evitar cargas infinitas
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setLoading(false);
                setIsLoading(false);
                setError({
                    message: 'Timeout: La carga tardó demasiado',
                    status: 408,
                    statusText: 'Request Timeout'
                });
            }
        }, 10000); // 10 segundos timeout
        
        loadPeople();
        
        return () => {
            clearTimeout(timeoutId);
        };
    }, [dataGuestId]);
    
    return (
        <DataContext.Provider value={{ 
            person, 
            loading, 
            error,
            guestId, 
            setPerson, 
            updatePerson, 
            refreshPerson,
            retryLoad
        }}>
            {children}
        </DataContext.Provider>
    );
};

