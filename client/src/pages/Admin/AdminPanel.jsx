import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div  className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">🎬 Admin</h2>
        <nav className="flex flex-col space-y-4">
          <a href="/dashboard" className="hover:text-yellow-400">
            Dashboard
          </a>
          <Link to={"/dashboard/movie"} className="hover:text-yellow-400">
            Movies
          </Link>
          <a href="#" className="hover:text-yellow-400">
            Users
          </a>
          <a href="#" className="hover:text-yellow-400 flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </a>
        </nav>
      </aside>
    </div>
  )
}

export default AdminPanel
