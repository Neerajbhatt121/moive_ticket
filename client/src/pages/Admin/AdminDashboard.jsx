import { FaFilm, FaMoneyBillWave, FaSignOutAlt, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8 },
    { title: "Avengers", genre: "Action", rating: 8.5 },
    { title: "Titanic", genre: "Drama", rating: 7.8 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">🎬 Admin</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="hover:text-yellow-400">
            Dashboard
          </a>
          <a href="#" className="hover:text-yellow-400">
            Movies
          </a>
          <a href="#" className="hover:text-yellow-400">
            Users
          </a>
          <a href="#" className="hover:text-yellow-400 flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="bg-white p-2 rounded-full shadow-md">
            <img
              src="https://i.pravatar.cc/40"
              alt="admin"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
            <FaFilm className="text-3xl text-purple-600" />
            <div>
              <p className="text-gray-600">Total Movies</p>
              <h2 className="text-2xl font-bold">120</h2>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
            <FaUsers className="text-3xl text-green-600" />
            <div>
              <p className="text-gray-600">Users</p>
              <h2 className="text-2xl font-bold">350</h2>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
            <FaMoneyBillWave className="text-3xl text-blue-600" />
            <div>
              <p className="text-gray-600">Revenue</p>
              <h2 className="text-2xl font-bold">$12K</h2>
            </div>
          </div>
        </div>

        {/* Movie Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Movie List
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Title</th>
                <th className="p-2">Genre</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2">{movie.title}</td>
                  <td className="p-2">{movie.genre}</td>
                  <td className="p-2">{movie.rating}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
