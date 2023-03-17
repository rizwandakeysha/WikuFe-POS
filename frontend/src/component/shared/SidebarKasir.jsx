import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function splitPath(path) {
  const respath = path.split("\\");
  return respath[0] + "/" + respath[1] + "/" + respath[2];
}

export default function Pemesanan() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };

  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pesanan, setPesanan] = useState([]);
  const totalPrice = pesanan.reduce((total, item) => {
    return total + item.harga * item.qty;
  }, 0);

  const [meja, setMeja] = useState([]);
  const [selectedMeja, setSelectedMeja] = useState("");
  const selectedOption = meja.find(
    (option) => option.nomor_meja === selectedMeja
  );

  const [namaPelanggan, setNamaPelanggan] = useState("");

  const [detail_transaksi, setDetailTransaksi] = useState([]);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    const fecthDatas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/menu/", {
          headers,
        });
        const qty = response.data.menu.map((res) => (res.qty = 0));
        setMenu(response.data.menu, qty);

        const responseMeja = await axios.get("http://localhost:8080/meja/", {
          headers,
        });
        setMeja(responseMeja.data.meja);
      } catch (err) {
        console.log(err);
      }
    };

    fecthDatas();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedMeja(e.target.value);
  };

  function handleIncreaseClick(id_menu) {
    setMenu(
      menu.map((menu) => {
        if (menu.id_menu === id_menu) {
          return { ...menu, qty: menu.qty + 1 };
        } else {
          return menu;
        }
      })
    );
  }

  function handleDecreaseClick(id_menu) {
    setMenu(
      menu.map((menu) => {
        if (menu.id_menu === id_menu) {
          if (menu.qty <= 0) {
            return menu;
          } else {
            return { ...menu, qty: menu.qty - 1 };
          }
        } else {
          return menu;
        }
      })
    );
  }

  const checkPemesanan = () => {
    var pesanan = menu.filter((x) => x.qty > 0);
    setPesanan(pesanan);

    setDetailTransaksi(
      pesanan.map((detail) => {
        const { id_menu, harga, qty } = detail;
        return {
          id_menu,
          qty,
          subtotal: harga * qty,
        };
      })
    );

    if (selectedOption === undefined) {
      toast.info("Pilih nomor meja");
    } else if (pesanan.length === 0) {
      toast.info("Pesanan kosong");
    } else setShowModal(true);
  };

  const removePesanan = (id_menu) => {
    setPesanan(
      pesanan.filter((pesanan) => {
        return pesanan.id_menu !== id_menu;
      })
    );

    setMenu(
      menu.map((menu) => {
        if (menu.id_menu === id_menu) {
          return { ...menu, qty: 0 };
        } else {
          return menu;
        }
      })
    );
  };

  const handleNamaPelanggan = (e) => {
    setNamaPelanggan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data_transaksi = {
      id_user: sessionStorage.getItem("id_user"),
      tgl_transaksi: "",
      id_meja: selectedOption.id_meja,
      nama_pelanggan: namaPelanggan,
      status: "belum_bayar",
      total: totalPrice,
      detail_transaksi,
    };

    const updatedStatusMeja = {
      ...selectedOption,
      status: "tidak_tersedia",
    };

    try {
      await axios.post("http://localhost:8080/transaksi/", data_transaksi, {
        headers,
      });
      await axios.put(
        "http://localhost:8080/meja/" + selectedOption.id_meja,
        updatedStatusMeja,
        { headers }
      );
      navigate("/riwayat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div class="min-h-screen flex flex-row bg-white">
        <div class="flex flex-col w-60 min-w-120 bg-white overflow-hidden relative">
          <div class="flex items-center justify-center h-1/6 shadow-sm">
            <h1 className="font-semibold text-lg">Pilih Meja</h1>
          </div>
          <select
            onChange={handleSelectChange}
            className="pointer-events-auto text-sm rounded-lg block p-2.5 bg-gray-100 my-24 mx-8 float-right py-3 placeholder-gray-400 text-black focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Pilih meja pelanggan</option>
            {meja.map((option) => (
              <option
                key={option.id_meja}
                value={option.nomor_meja}
                disabled={option.status === "tidak_tersedia"}
              >
                Meja nomor {option.nomor_meja}
              </option>
            ))}
          </select>
          <button
            onClick={checkPemesanan}
            className="pointer-events-auto absolute bottom-0 left-0 right-0 mx-8 mb-8 px-10 py-10 rounded-lg bg-gray-600 text-white text-4xl"
            style={{ fontFamily: "Outfit" }}
          >
            Pesan
          </button>
        </div>
      </div>

      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden max-w-full overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 max-h-screen">
              <div className="flex h-full w-full mx-auto  flex-col overflow-y-auto bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {pesanan.map((product) => (
                          <li key={product.id_menu} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={`http://localhost:8080/${splitPath(
                                  product.gambar
                                )}`}
                                alt="gambar pesanan"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <p>{product.nama_menu}</p>
                                  </h3>
                                  <p className="ml-4">
                                    Rp
                                    {(
                                      product.harga * product.qty
                                    ).toLocaleString("id-ID")}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.jenis}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product.qty}
                                </p>

                                <div className="flex">
                                  <button
                                    onClick={() =>
                                      removePesanan(product.id_menu)
                                    }
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-3 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>Rp{totalPrice.toLocaleString("id-ID")}</p>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="border-t border-gray-200 py-6 px-4 sm:px-6"
                >
                  <div>
                    <label
                      htmlFor="pelanggan"
                      className="flex justify-between text-base font-medium text-gray-900"
                    >
                      Nama Pelanggan
                    </label>
                    <input
                      onChange={handleNamaPelanggan}
                      value={namaPelanggan}
                      type="text"
                      id="pelanggan"
                      className="text-sm rounded-lg block w-full p-2.5 bg-transparent border border-gray-200 text-gray-900"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setShowModal(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

// function TabsLink(item, index) {
//   const { pathname } = useLocation();

//   return (
//     <li key={index}>
//       <a
//         href={item.path}
//         className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
//       >
//         <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
//           <Icon icon={item.icon} />
//         </span>
//         <span class="text-md font-medium">{item.label}</span>
//       </a>
//     </li>
//     // <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-600' : '', linkClass)}>
//     //     {item.label}
//     // </Link>
//   );
// }
