"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const about = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        formData,
      });
      if (response.status === 200) {
        alert("Account created");
        window.location.href = "/login"
      }
      // console.log(formData);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists");
      } else {
        alert(error.response?.data?.message || "something went wrong");
      }
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <div className="w-96 h-screen m-auto p-5 flex flex-col gap-5 justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 items-center">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                className="border-2 border-slate-400 rounded"
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="name">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="border-2 border-slate-400 rounded"
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="name">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="passwrd"
                className="border-2 border-slate-400 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-max px-5 py-2 rounded"
            >
              Signin
            </button>
          </form>
          <Link href="/login" className="text-blue-400 font-bold cursor-pointer">Login</Link>
        </div>
      </div>
    </>
  );
};

export default about;
