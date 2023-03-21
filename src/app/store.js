import { configureStore } from '@reduxjs/toolkit';
import formRegisLogin from '../features/formRegisLogin';
import restApiLoginRegister from '../features/restApiLoginRegister';
import restApiCatatans from '../features/restApiCatatans';
import onOffAddCatatan from '../features/onOffAddCatatan';
import restApiFolder from '../features/restApiFolder';
import onOffAddFolder from '../features/onOffAddFolder';
import lockScrollBody from '../features/lockScrollBody';

export const store = configureStore({
  reducer: {
    // Register
    formRegisLogin: formRegisLogin,
    // Login User
    loginRegis: restApiLoginRegister,
    // Catatan
    catatan: restApiCatatans,
    // On Off Form Add Catatan
    onOffFormCatatan: onOffAddCatatan,
    // Folder
    folder: restApiFolder,
    // Add Folder
    onOffAddFolder: onOffAddFolder,
    // Scroll Lock Body
    scrollLock: lockScrollBody
  },
});
