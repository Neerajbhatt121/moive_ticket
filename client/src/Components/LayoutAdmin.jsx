import { Outlet } from "react-router-dom"
import AdminPanel from "../pages/Admin/AdminPanel"

const LayoutAdmin = () => {
  return (
    <div className="flex min-h-screen">
        <AdminPanel/>
        <div className="flex p-4 w-full bg-gray-100">
            <Outlet/>
        </div>   
    </div>
  )
}

export default LayoutAdmin
