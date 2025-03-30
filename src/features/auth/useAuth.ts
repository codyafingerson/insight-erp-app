import { useAppSelector } from "../../app/hooks";
import { selectUser, selectError, selectLoading } from "./authSlice";

/**
 * Provides the user object, loading status, error message, and
 * a boolean indicating if the user is authenticated.
 */
export const useAuth = () => {
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const isAuthenticated = !!user;

    return {
        user,
        loading,
        error,
        isAuthenticated,
    };
};