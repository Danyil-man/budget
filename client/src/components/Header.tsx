import { FC } from "react";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store/redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { toast } from "react-toastify";
import { NAVIGATE_ROUTES } from "../constants";

export const Header: FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    toast.success("You logged out!");
    navigate("/auth");
  };
  return (
    <header className="flex items-center p-4 bg-slate-800 shadow-sm backdrop-blur-sm">
      <Link to="/transactions">
        <FaBtc size={20} />
      </Link>
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5 ">
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                {NAVIGATE_ROUTES.TRANSACTIONS}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                {NAVIGATE_ROUTES.CATEGORIES}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>{NAVIGATE_ROUTES.LOGOUT}</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link className="py-2 text-white/50 hover:text-white ml-auto" to="auth">
          {NAVIGATE_ROUTES.LOGIN}
        </Link>
      )}
    </header>
  );
};
