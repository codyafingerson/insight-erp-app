import { useAppDispatch } from "../../app/hooks"
import { useAuth } from "../../features/auth/useAuth"
import { logout } from "../../features/auth/authSlice"

export default function Navbar() {
    const dispatch = useAppDispatch()
    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return null;
    }

    return (
        <nav>
            <p>
                Welcome, {user?.name}!
            </p>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </nav>
    )
}