import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLocalStorage } from "./helpers/localStorage.helper";
import { toast } from "react-toastify";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (token) {
        const data = await AuthService.getMe();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const error = e?.response?.data.message;
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
