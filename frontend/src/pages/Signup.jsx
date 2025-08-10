import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Signup = () => {

  const { axios, token, setToken, navigate, setUser } = useAppContext();

  const [formData, setFormData] = useState({
    channelName: '',
    username: '',
    password: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.channelName || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await axios.post("/users/signup", formData);

      if (res.data.success) {
        toast.success("Signup successful");
        const response = await axios.post("/users/login", {
          username: formData.username,
          password: formData.password
        })

        if (response.data.success) {
          toast.success("Login successful");

          const accessToken = response.data.data.accessToken;
          const loggedInUser = response.data.data.user;

          setToken(accessToken);
          setUser(loggedInUser);

          localStorage.setItem("token", accessToken);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-300">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-base-content">Create Your Channel</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Channel Name */}
          <div>
            <label className="block mb-1 font-semibold text-base-content">Channel Name</label>
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              placeholder="My Cool Channel"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          {/* About */}
          <div>
            <label className="block mb-1 font-semibold text-base-content">About Your Channel</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe what your channel is about..."
              className="textarea textarea-bordered w-full resize-none"
            />
          </div>

          {/* Channel Picture */}
          <div>
            <label className="block mb-1 font-semibold text-base-content">Channel Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered w-full cursor-pointer"

            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-base-content mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
