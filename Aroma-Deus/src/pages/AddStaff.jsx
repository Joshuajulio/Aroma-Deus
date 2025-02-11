import { useState } from "react";
import { phase2api } from "../helpers/http-client";

import NavbarCMS from "../components/NavbarCMS";
import SidebarCMS from "../components/SidebarCMS";
import Swal from "sweetalert2";

function AddStaff() {
  const [staff, setStaff] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addStaff = async (e) => {
    e.preventDefault();
    console.log("Add Staff");
    Swal.fire({
      title: "Are all data correct?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await phase2api.post(
            `/add-user`,
            {
              username: staff.username,
              email: staff.email,
              password: staff.password,
              phoneNumber: staff.phoneNumber,
              address: staff.address,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Staff added successfully",
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add staff",
          });
        }
      }
    });
  };
  return (
    <>
      <NavbarCMS />
      <main className="bg-[#0B192C] min-h-screen w-screen">
        <div className="flex flex-col md:flex-row ">
          {/* Sidebar */}
          <SidebarCMS
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <main className="flex-1 p-8">
            <div className="bg-[#0B192C] rounded shadow p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Add New Staff
              </h2>
              <form className="space-y-4" onSubmit={addStaff}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-base font-medium text-[#f0d16b]">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full rounded-md p-2"
                    required
                    value={staff.username}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-[#f0d16b]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md p-2"
                    required
                    value={staff.email}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-base font-medium text-[#f0d16b]">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full rounded-md p-2"
                    required
                    value={staff.password}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-base font-medium text-[#f0d16b]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-md p-2"
                    required
                    value={staff.phoneNumber}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-base font-medium text-[#f0d16b]">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="mt-1 block w-full rounded-md p-2"
                    required
                    value={staff.address}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#f0d16b] text-[#370A40] font-bold py-4 px-4 mt-4 rounded-md hover:bg-gray-300">
                    Create Staff Account
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}

export default AddStaff;
