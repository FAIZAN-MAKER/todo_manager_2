import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <Navbar />
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
}
