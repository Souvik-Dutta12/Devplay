import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/devplayLogo.png';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {

  const { axios, setToken, navigate, setUser } = useAppContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", formData);
      const token = res.data.data.accessToken;
      const user = res.data.data.user;
      setToken(token);
      setUser(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate("/");
    } catch (error) {
      toast.error("Login Failed" || error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-300">
        {/* Logo & Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-base-content flex items-center justify-center gap-2">
          <img className="w-8 h-8 object-contain" src={logo} alt="Devplay Logo" />
          <span>Devplay</span>
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold text-base-content">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="@username"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-base-content">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-base-content mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-semibold">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
