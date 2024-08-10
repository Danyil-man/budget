import { FC } from "react";
import { useAppSelector } from "../store/hooks";
import { PROTECTED_PAGE_MESSAGE } from "../constants";

interface IProtectedRoute {
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.user);
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl">{PROTECTED_PAGE_MESSAGE}</h1>
        </div>
      )}
    </>
  );
};
