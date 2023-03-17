import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import axios from "axios";

const TABS_LINK = [
  {
    key: "pemesanan",
    label: "Pemesanan",
    path: "/",
    icon: "material-symbols:border-all",
  },
  {
    key: "riwayat",
    label: "Riwayat",
    path: "/riwayat",
    icon: "mdi:clipboard-text-history-outline",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [userDt, setuserDt] = useState({});
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("id_user");
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}`,
          { signal: controller.signal }
        );
        isMounted && setuserDt(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
    const handleLogout = () => {
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    };
  }, []);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div class="min-h-screen flex flex-row bg-white">
        <div class="flex flex-col w-60 min-w-120 bg-white overflow-hidden">
          <div class="flex items-center justify-center h-1/6 shadow-sm">
            <img
              src="/Logo_WikuFé_4.png"
              alt="Logo"
              class="object-contain h-16 mx-auto"
            />
          </div>
          <ul class="flex flex-col py-4 mx-5">
            {TABS_LINK.map((item, index) => TabsLink(item, index))}

            <li>
              <a
                href="#"
                onClick={handleLogout}
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="material-symbols:logout-rounded" />
                </span>
                <span class="text-md font-medium">Logout</span>
              </a>
            </li>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <li>
              <div class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="mdi:user" />
                </span>
                {userDt && (
                  <>
                    <div className="flex flex-col justify-start">
                      <span class="text-md font-medium">
                        {userDt?.data?.nama_user}
                      </span>
                      <span class="text-md font-medium capitalize">
                        {userDt?.data?.role}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    // <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
    //     <div className="flex flex-wrap text-sm font-medium text-center ">
    //         {TABS_LINK.map((item) => (
    //             <TabsLink key={item.key} item={item} />
    //         ))}
    //     </div>
    //     <a href="#" onClick={handleLogout} className="inline-block px-4 py-3 rounded-lg bg-red-500 text-white">
    //         Logout
    //     </a>
    // </div>
  );
}

function TabsLink(item, index) {
  const { pathname } = useLocation();

  return (
    <li key={index}>
      <a
        href={item.path}
        className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
      >
        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
          <Icon icon={item.icon} />
        </span>
        <span class="text-md font-medium">{item.label}</span>
      </a>
    </li>
    // <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-600' : '', linkClass)}>
    //     {item.label}
    // </Link>
  );
}
