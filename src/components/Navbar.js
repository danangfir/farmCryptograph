import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAnalytics, MdHome, MdFormatListBulletedAdd, MdAdminPanelSettings, MdSupervisedUserCircle, MdOutlineInfo } from "react-icons/md";
import { SiBnbchain } from "react-icons/si";
import { GiFarmer } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white shadow-lg">
      <div className="p-6">
        <SiBnbchain className="text-4xl" />
        <h1 className="text-2xl font-bold">Tani Chain.</h1>
      </div>
      <nav className="mt-6">
        <ul className="flex flex-col space-y-4 px-6">
          <li>
            <Link to="/home" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/add-product" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdFormatListBulletedAdd className="text-xl" />
              <span>Fruits and Vegetables</span>
            </Link>
          </li>
          <li>
            <Link to="/admin" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdAdminPanelSettings className="text-xl" />
              <span>Admin</span>
            </Link>
          </li>
          <li>
            <Link to="/farmer" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <GiFarmer className="text-xl" />
              <span>Petani</span>
            </Link>
          </li>
          <li>
            <Link to="/customer" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdSupervisedUserCircle className="text-xl" />
              <span>Pelanggan</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdOutlineAnalytics className="text-xl" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center p-3 rounded hover:bg-blue-700 space-x-2">
              <MdOutlineInfo className="text-xl" />
              <span>Tentang</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
