import React from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Tani Chain</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4 px-6">
          <li>
            <Link to="/home" className="block p-3 rounded hover:bg-blue-600">
              <MdHome className="inline-block mr-2" />
              Home
            </Link>
          </li>
          {/* Tambahkan link lainnya */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
