import { FC } from "react";
import img from "../assets/404.png";
import { Link } from "react-router-dom";
import { BTN_BACK } from "../constants";

export const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
      <img src={img} alt="img" className="w-80" />
      <Link
        to="/auth"
        className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600"
      >
        {BTN_BACK}
      </Link>
    </div>
  );
};
