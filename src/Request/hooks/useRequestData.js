import { useFetch } from '../../hooks/useFetch';

export const useRequestData = (id) => {
    const { data: requestDetails, loading: requestLoading, error: requestError } = useFetch(`https://pg2backend-production.up.railway.app/api/requests/${id}`, null, true);
    const { data: users, loading: usersLoading, error: usersError } = useFetch('https://pg2backend-production.up.railway.app/api/user', null, true);
    const { data: assignments, loading: assignmentLoading, error: assignmentError } = useFetch('https://pg2backend-production.up.railway.app/api/assignments', null, true);
    return { requestDetails, requestLoading, requestError, users, usersLoading, usersError, assignments, assignmentLoading, assignmentError };
};
