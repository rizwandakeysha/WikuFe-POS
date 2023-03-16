import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function DataTransaksi() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  const [transaksi, setTransaksi] = useState([]);
  const [filteredTransaksi, setFilteredTransaksi] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fecthDatas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/transaksi/", {
          headers,
        });
        setTransaksi(response.data.transaksi);
      } catch (err) {
        console.log(err);
      }
    };
    fecthDatas();
  }, []);

  function dateFormat(date) {
    const dateObj = new Date(date);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("id-ID", options);
    return formattedDate;
  }

  const filterByUser = (namaUser) => {
    if (namaUser) {
      const filteredData = transaksi.filter((t) => {
        return t.user.nama_user === namaUser;
      });
      setFilteredTransaksi(filteredData);
    }
  };

  console.log(filteredTransaksi);
  return (
    <div>
        <br />
      <div className="my-11 mx-11">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="my-4 mx-4">
            <div className="flex p-4 bg-gray-100 rounded-md border shadow-sm">
              <span className="flex-none">Pilih kasir : </span>
              <select
                className="pl-1 bg-gray-100"
                value={selectedUser}
                onChange={(event) => {
                  setSelectedUser(event.target.value);
                  filterByUser(event.target.value);
                }}
              >
                <option value="" disabled selected></option>
                {[...new Set(transaksi.map((t) => t.user.id))].map((id) => {
                  const user = transaksi.find((t) => t.user.id === id).user;
                  return (
                    <option key={id} value={user.nama_user}>
                      {user.nama_user}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Nama Kasir
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Tanggal Transaksi
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Nama Pelanggan
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Total Harga
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {filteredTransaksi !== null && filteredTransaksi !== undefined ? (
                <>
                  {filteredTransaksi.map((transaksi) => (
                    <tr
                      key={transaksi.id_transaksi}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                      <td className="px-6 py-4">{dateFormat(transaksi.tgl_transaksi)}</td>
                      <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                      <td className="px-6 py-4">Rp{transaksi.total.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Lunas
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {transaksi.map((transaksi) => (
                    <tr
                      key={transaksi.id_transaksi}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                      <td className="px-6 py-4">
                        {dateFormat(transaksi.tgl_transaksi)}
                      </td>
                      <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                      <td className="px-6 py-4">Rp{transaksi.total.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Lunas
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
