import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    channelName: '',
    username: '',
    password: '',
    about: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Signup submitted!');
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
              name="about"
              value={formData.about}
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
              required
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
