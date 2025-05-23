import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const RequestsList = () => {
  const { data, loading, error } = useFetch('https://pg2backend-production.up.railway.app/api/requests');

  if (loading) return <p className="text-center mt-8 text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  if (!data || !Array.isArray(data)) {
    return <p className="text-center mt-8 text-gray-500">No se encontraron solicitudes</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Lista de Solicitudes</h1>
      <p className="text-gray-500 mb-6">Aquí puedes revisar y asignar las solicitudes registradas.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map(request => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{request.titulo}</h2>
            </div>

            <div className="mt-4">
              <Link
                to={`/requests/${request.id}/assign`}
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;