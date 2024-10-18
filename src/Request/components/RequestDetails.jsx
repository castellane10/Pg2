import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';  

const RequestDetails = ({ requestDetails }) => {
    // Usa el estado actual de la solicitud como valor predeterminado
    const [status, setStatus] = useState(requestDetails.estado);
    const availableStatuses = ['Pendiente', 'Completado', 'Urgente'];
    
    const { fetchData, info } = useFetch();  // info contiene { data, loading, error }

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);  // Actualiza el estado localmente

        // Realizar la actualización en el backend
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: newStatus }),
        };

        await fetchData(`https://rest-api-prueba-production.up.railway.app/api/requests/${requestDetails.id}`, options);

        if (info.error) {
            console.error("Error al actualizar el estado:", info.error);
        } else {
            console.log("Estado actualizado exitosamente:", info.data);
        }
    };

    return (
        <div className="mb-4">
            <p className="text-lg"><strong>Título:</strong> {requestDetails.titulo}</p>
            <p className="text-lg"><strong>Descripción:</strong> {requestDetails.descripcion}</p>
            
            <label htmlFor="status">Estado:</label>
            {/* Select con el estado predeterminado */}
            <select id="status" value={status} onChange={handleStatusChange}>
                {availableStatuses.map(statusOption => (
                    <option key={statusOption} value={statusOption}>
                        {statusOption}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RequestDetails;
