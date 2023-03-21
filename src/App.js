import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormLoginOrRegis from './pages/FormLoginOrRegis';
import Home from './pages/Home';
import PriveteRoute from './utils/PriveteRoute';
import Folder from './pages/Folder';
import IsiFolder from './components/IsiFolder';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PriveteRoute />}>
          <Route path='/' element={<Home />} />
          <Route path="folder" element={<Folder />} />
          <Route path="folder/isi-folder/:id" element={<IsiFolder />} />

          <Route path="fontend_catatan" element={<NotFound />} />
        </Route>
        <Route path='loginregis' element={<FormLoginOrRegis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
