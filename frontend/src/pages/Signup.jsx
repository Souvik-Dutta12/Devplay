import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const slideVariants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 mx-auto">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
        {/* Left Side Text */}
        <motion.div
          initial="hiddenRight"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={slideVariants}
          className="space-y-4 text-left"
        >
          <h1 className="text-7xl font-bold text-shadow-base-content">Devplay</h1>
          <p className="text-lg text-base-content/80">
            The platform for developers to upload, discover, and share tech content. Create an account to start publishing your own videos, explore trending projects, and build your dev audience.
          </p>
          
        </motion.div>

        {/* Right Side Signup Form */}
        <motion.div
          initial="hiddenLeft"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={slideVariants}
          className="flex flex-col items-center gap-3"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-6">
            <legend className="fieldset-legend text-xl font-semibold">Sign Up</legend>

            <label className="label mt-2 text-md">Email</label>
            <input type="email" className="input input-bordered w-full text-md" placeholder="Email" />

            <label className="label mt-2 text-md">Password</label>
            <input type="password" className="input input-bordered w-full text-md" placeholder="Password" />

            <label className="label mt-2 text-md">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full text-md"
              placeholder="Confirm Password"
            />

            <button className="btn btn-neutral w-full mt-4">Create Account</button>
            <p className="text-sm text-base-content/60 mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Log in here
            </Link>
          </p>
          </fieldset>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
