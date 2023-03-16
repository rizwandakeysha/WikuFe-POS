import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DataTransaksi() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  const [transaksi, setTransaksi] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTransaksi, setFilteredTransaksi] = useState(null);

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

  const filterByDate = (date) => {
    if (date) {
      const filteredData = transaksi.filter((t) => {
        const tgl_transaksi = new Date(t.tgl_transaksi);
        return tgl_transaksi.toDateString() === date.toDateString();
      });
      setFilteredTransaksi(filteredData);
    }
  };

  console.log(filteredTransaksi);
  return (
    <div className="my-16 mx-16">
      <div class="flex items-center justify-center">
        <h1 class="text-center text-4xl font-bold">Transaksi per Hari</h1>
      </div>
      <br />
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="my-4 mx-4">
          <div className="flex p-4 bg-gray-100 rounded-md border shadow-sm">
            <span className="flex-none">Tgl. Transaksi : </span>
            <DatePicker
              className="pl-1 bg-gray-100"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                filterByDate(date);
              }}
            />
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
            {selectedDate === null || selectedDate === undefined ? (
              <>
                {transaksi.map((transaksi) => (
                  <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                    <td className="px-6 py-4">
                      {dateFormat(transaksi.tgl_transaksi)}
                    </td>
                    <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                    <td className="px-6 py-4">
                      Rp{transaksi.total.toLocaleString("id-ID")}
                    </td>
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
                {filteredTransaksi.map((transaksi) => (
                  <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{transaksi.user.nama_user}</td>
                    <td className="px-6 py-4">
                      {dateFormat(transaksi.tgl_transaksi)}
                    </td>
                    <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                    <td className="px-6 py-4">
                      Rp{transaksi.total.toLocaleString("id-ID")}
                    </td>
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
  );
}
