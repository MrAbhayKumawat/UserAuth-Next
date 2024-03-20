"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [userdata, setuserdata] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userinfo = localStorage.getItem("userinfo");

    const parseduserdata = JSON.parse(userinfo);
    setuserdata(parseduserdata.userinfo);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      localStorage.clear();

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  console.log(userdata);

  return (
    <>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
            alt="user"
          />
        </div>
        <div className="text-center mt-2">
          <h1 className="text-xl">{userdata.username}</h1>
          <br />
          <strong>Email : </strong>
          <span>{userdata.useremail}</span>
        </div>

        <div className="p-4 border-t mx-8 mt-2">
          <button
            className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
