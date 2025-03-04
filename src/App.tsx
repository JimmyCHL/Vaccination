import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Approver } from './admin/Approval/Approver'
import { PatientList } from './admin/PatientList/PatientList'
import { AddVaccine } from './admin/vaccine/AddVaccine'
import { useAuthenticated } from './hooks/useAuthenticated'
import { useInitialization } from './hooks/useInitialization'
import { PersonalScheduleList } from './patient/ScheduleList/PersonalScheduleList'
import { RegisterVaccine } from './patient/Vaccine/RegisterVaccine'
import { Authenticate } from './share/Authentication/Authenticate'
import { Header } from './share/Header/Header'
import { Home } from './share/Home'
import { HospitalList } from './share/Hospital/HospitalList'
import { NotFound } from './share/NotFound'
import { PersonalDetail } from './share/PersonalDetail/PersonalDetail'
import { VaccineList } from './share/Vaccine/VaccineList'

function App() {
  const { isAuthenticated } = useAuthenticated()
  //Initialize the app global data
  useInitialization()

  return (
    <div className="App">
      <div className="background" />
      <ToastContainer />
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <div style={{ padding: '0 10px' }}>
            <Routes>
              <Route path="/authenticate" element={<Authenticate />} />
              {isAuthenticated && <Route path="/personalDetail" element={<PersonalDetail />} />}
              {/* Admin */}
              {isAuthenticated && (
                <>
                  <Route path="/admin/addVaccine" element={<AddVaccine />} />
                  <Route path="/admin/vaccineList" element={<VaccineList />} />
                  <Route path="/admin/AddHospital" element={<HospitalList />} />
                  <Route path="/admin/hospitalList" element={<HospitalList />} />
                  <Route path="/admin/approver" element={<Approver />} />
                  <Route path="/admin/patientList" element={<PatientList />} />
                </>
              )}
              {/* Patient */}
              <Route path="/" element={<Home />} />
              <Route path="/vaccineList" element={<VaccineList />} />
              <Route path="/hospitalList" element={<HospitalList />} />
              {isAuthenticated && (
                <>
                  <Route path="/ownSchedules" element={<PersonalScheduleList />} />
                  <Route path="/makeAppointment" element={<RegisterVaccine />} />
                </>
              )}
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
