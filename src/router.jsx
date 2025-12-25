import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from './layout/Home';
import BasicCalculator from './pages/BasicCalculator';
import ScientificCalculator from './pages/ScientificCalculator';
import DaysCalc from './pages/DaysCalc';
import Calendar from './pages/Calendar';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Navigate to="/basic" />} />
          <Route path="/basic" element={<BasicCalculator />} />
          <Route path='/scientific' element = {<ScientificCalculator />} />
          <Route path='/days' element = {<DaysCalc />} />
          <Route path = '/calendar' element = {<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
