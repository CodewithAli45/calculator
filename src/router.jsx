import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from './layout/Home';
import BasicCalculator from './pages/BasicCalculator';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/basic" />} />
          <Route path="/basic" element={<BasicCalculator />} />
          {/* <Route path="/scientific" element={<ScientificCalculator />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
