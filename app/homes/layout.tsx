import { ReactNode } from 'react';
import Image from "next/image";
import ResponsiveSearch from '../ui/navbarHomes/navbar';
import  "./globals.css"

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='body' style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: 'fit-content', margin: '0 auto' }}>
      <ResponsiveSearch />
      {children}
    </div>
  );
};

export default AuthLayout;