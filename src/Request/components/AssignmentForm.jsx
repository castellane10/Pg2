import { useState } from 'react';

const AssignmentForm = ({ users, handleSubmit, formData, handleChange, assignLoading }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
            <div className="mb-4">
                <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700">
                    Asignar a Usuario
                </label>
                <select
                    id="usuarioId"
                    name="usuarioId"
                    value={formData.usuarioId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                    <option value="">Selecciona un usuario</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <input type="hidden" name="assignMethod" value="Directamente" />

            <button
                type="submit"
                disabled={assignLoading}
                className={`w-full flex justify-center py-2 px-4 rounded-lg shadow text-sm font-semibold text-white transition-all duration-200 ${
                    assignLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-300'
                }`}
            >
                {assignLoading ? 'Asignando...' : 'Asignar Solicitud'}
            </button>
        </form>
    );
};

export default AssignmentForm;