import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRequestData } from '../Request/hooks/useRequestData';
import AssignmentForm from '../Request/components/AssignmentForm';
import RequestDetails from '../Request/components/RequestDetails';

const Request = () => {
  const { id } = useParams();
  const { requestDetails, requestLoading, requestError, users, assignments } = useRequestData(id);
  const [formData, setFormData] = useState({ usuarioId: '' });
  const [assignedUserName, setAssignedUserName] = useState('');

  const existingAssignment = assignments?.find(
    (assignment) => assignment.request === parseInt(id, 10)
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedUser = users.find((user) => user.id === parseInt(formData.usuarioId, 10));
    if (!selectedUser) return;

    const response = await fetch(
      `https://pg2backend-production.up.railway.app/api/requests/${id}/assign`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: selectedUser.id,
          assign_method: 'Directamente',
        }),
      }
    );

    if (response.ok) {
      setAssignedUserName(selectedUser.nombre);
      setFormData({ usuarioId: '' });
    } else {
      console.error('Error al asignar la solicitud');
    }
  };

  if (requestLoading || !users || !assignments) {
    return <p className="text-center text-gray-600 mt-10">Cargando solicitud...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">📄 Detalles de la Solicitud</h1>

      {requestError && (
        <p className="text-red-500 mb-4">Error al cargar: {requestError}</p>
      )}

      {requestDetails && <RequestDetails requestDetails={requestDetails} />}

      {existingAssignment ? (
        <div className="bg-blue-50 p-5 rounded-lg border mt-6">
          <h2 className="text-lg font-medium text-blue-800 mb-2">Solicitud ya asignada</h2>
          <p className="text-blue-700">
            <strong>Usuario:</strong> {users.find(user => user.id === existingAssignment.usuario)?.nombre || `ID: ${existingAssignment.usuario}`}
          </p>
          <p className="text-blue-700">
            <strong>Método:</strong> {existingAssignment.assign_method}
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Asignar Solicitud</h2>
          <AssignmentForm
            users={users}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

      {assignedUserName && (
        <p className="text-green-600 mt-4 font-medium">
          ✅ Asignación realizada exitosamente a {assignedUserName}
        </p>
      )}
    </div>
  );
};

export default Request;