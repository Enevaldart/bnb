import { ReactNode } from 'react';
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: 'fit-content', margin: '0 auto' }}>
      <Image src="/logo.jpg" alt="Logo" width={150} height={18} priority />
      {children}
    </div>
  );
};

export default AuthLayout;