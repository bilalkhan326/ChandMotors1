import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow pt-16 sm:pt-20 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
