import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrderForm from './pages/OrderForm'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/adminpanel' element={<AdminPanel />} />
        <Route path='/order-form' element={<OrderForm />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
