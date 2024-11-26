import { ReactNode } from "react";
import Image from "next/image";
import ResponsiveSearch from "../ui/navbarHomes/navbar";
import "./globals.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="body">
      <div className="children">
      {children}
      </div>
    </div>
  );
};

export default AuthLayout;
