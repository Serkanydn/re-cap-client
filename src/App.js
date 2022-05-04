import { Routes, Route } from 'react-router-dom';
import UiDashboard from '../src/layouts/ui/dashboard';


import AdminDashborad from '../src/layouts/admin/dashboard';


import AdminHome from '../src/pages/admin/home';
import AdminCarList from '../src/pages/admin/car/list';
import AdminCarDetail from '../src/pages/admin/car/detail';
import AdminCarAdd from '../src/pages/admin/car/add';


function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<UiDashboard />} >

        </Route>






        <Route path="/admin" element={<AdminDashborad />} >
          <Route index element={<AdminHome title="Anasayfa" />} />
          <Route path="/admin/car/list" element={<AdminCarList title="Araç Listesi" />} />
          <Route path="/admin/car/detail/:id" element={<AdminCarDetail title="Araç Detayı" />} />
          <Route path="/admin/car/add" element={<AdminCarAdd title="Araç Ekle" />} />

        </Route>

      </Routes>


    </div>
  );
}

export default App;
