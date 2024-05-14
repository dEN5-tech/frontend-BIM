import { redirect } from "react-router-dom";
import { store } from "../../App";
import { fetchProfile } from "../../store/userSlice";

const RouteLoader = async () => {
    const state = store.getState();
    const user = state.user.loggedInUser;
    const dispatch = store.dispatch;

    // Check if user data needs to be fetched
    if (!user) {
        await dispatch(fetchProfile());
        // Re-check the state after dispatch
        const updatedState = store.getState();
        const updatedUser = updatedState.user.loggedInUser;

        // Redirect based on updated user status
        if (!updatedUser) {
            return redirect("/login");
        }
    }

    // Redirect to the requested path if user is logged in
    return null;
};

export default RouteLoader;