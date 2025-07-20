import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-6">
        {/* Devplay Heading */}
        <h1 className="text-7xl font-bold text-primary">Devplay</h1>

        {/* Description */}
        <p className="text-xl text-base-content/80 max-w-xl">
          A platform to explore, create, and share developer-focused video content. Learn from peers, contribute your knowledge, and become a part of the global dev community.
        </p>

        {/* Auth Area */}
        <SignedOut>
          <SignInButton>
            <button className="btn mt-4 px-6 py-3 btn-primary btn-outline btn-lg text-white hover:text-base-300 font-semibold rounded-xl hover:bg-primary-focus transition">
              Sign In to Get Started <i className="ri-login-box-line"></i>
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Login;
