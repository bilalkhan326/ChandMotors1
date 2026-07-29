import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full pt-20 sm:pt-24 lg:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
