import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import LoginForm from './components/admin/LoginForm';
import ArtistProfileEditor from './components/admin/ArtistProfileEditor';
import PromoPages from './components/admin/PromoPages';
import Dashboard from './components/admin/Dashboard';
import EditPromoPage from './components/admin/EditPromoPage';
import ArtistProfile from './components/artist/ArtistProfile';
import PromoPage from './components/promo/PromoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />} />
        <Route path="/artist" element={<ArtistProfile />} />
        <Route path="/promo/:id" element={<PromoPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ArtistProfileEditor />} />
          <Route path="pages" element={<PromoPages />} />
          <Route path="pages/new" element={<Dashboard />} />
          <Route path="pages/edit/:id" element={<EditPromoPage />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}