import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const navigate = useNavigate();
  const [userDt, setuserDt] = useState({});
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const username = sessionStorage.getItem('username')
  const userId = sessionStorage.getItem('id_user')
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`, {signal: controller.signal})
        isMounted && setuserDt(response.data)
      } catch(err) {
        console.error(err)
      }
    }

    getUser()

  }, [])
  
  console.log(userDt)

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
            <li>
              <a
                href="/"
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="material-symbols:area-chart" />
                </span>
                <span class="text-md font-medium">Grafik Penjualan</span>
              </a>
            </li>
            <li>
              <a
                href="data_transaksi_t"
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="mdi:auto-pay" />
                </span>
                <span class="text-md font-medium">Data Transaksi (T)</span>
              </a>
            </li>
            <li>
              <a
                href="data_transaksi_b"
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="mdi:auto-pay" />
                </span>
                <span class="text-md font-medium">Data Transaksi (B)</span>
              </a>
            </li>
            <li>
              <a
                href="data_transaksi_k"
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <Icon icon="mdi:auto-pay" />
                </span>
                <span class="text-md font-medium">Data Transaksi (K)</span>
              </a>
            </li>
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
            <br /><br />
            <li>
              <div
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <Icon icon="mdi:user" />
                </span>
                {userDt && (
                  <>
                  <div className="flex flex-col justify-start">
                  <span class="text-md font-medium">{userDt?.data?.nama_user}</span>
                  <span class="text-md font-medium capitalize">{userDt?.data?.role}</span>
                  </div>
                  </>

                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div>

    //     <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    //         <span className="sr-only">Open sidebar</span>
    //         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //             <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    //         </svg>
    //     </button>

    //     <div className='flex min-h-full'>
    //         <aside id="default-sidebar" className="sticky top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    //             <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    //                 <ul className="space-y-2">
    //                     <li>
    //                         <a href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    //                             <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
    //                             <span className="flex-1 ml-3 whitespace-nowrap">Chart Penjualan</span>
    //                         </a>
    //                     </li>
    //                     <li>
    //                         <a href="data_transaksi" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    //                             <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path clipRule="evenodd" fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"></path></svg>
    //                             <span className="ml-3">Data Transaksi</span>
    //                         </a>
    //                     </li>
    //                     <li>
    //                         <a href="#" onClick={handleLogout} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    //                             <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"></path></svg>
    //                             <span className="ml-3">Logout</span>
    //                         </a>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </aside>
    //     </div>
    // </div>
  );
}
