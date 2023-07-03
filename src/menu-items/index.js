// project import
// import pages from './pages';
import dashboard_doctor from './dashboard_doctor';
import dashboard_patient from './dashboard_patient'; 
// import utilities from './utilities';
import support from './support';

// ==============================|| MENU ITEMS ||============================== //

const menu_doctor_items = {
    // items: [dashboard, pages, utilities, support]
    items: [dashboard_doctor, support]
};

const menu_patient_items = {
    items: [dashboard_patient, support]
}; 
export default [menu_doctor_items, menu_patient_items];
