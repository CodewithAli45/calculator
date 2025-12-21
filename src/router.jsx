import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BasicCalculator from './pages/BasicCalculator';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/basic" />} /> */}
        <Route path="/" element={<BasicCalculator />} />
        {/* Scientific route later */}
        {/* <Route path="/scientific" element={<ScientificCalculator />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
