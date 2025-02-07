const LoginForm = () => {
    return (
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg mx-auto">
        <h1 className="text-2xl font-bold text-white text-center">Welcome back!</h1>
        <p className="text-gray-400 text-center mb-6">Enter your credentials to access your account</p>
  
        {/* Email Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
        </div>
  
        {/* Password Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1 flex justify-between">
            Password <a href="#" className="text-blue-400 text-sm">Forgot password?</a>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
        </div>
  
        {/* Remember Me */}
        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-gray-400 text-sm">Remember for 30 days</label>
        </div>
  
        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Login
        </button>
  
        {/* Sign Up Redirect */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account? <a href="/signup" className="text-blue-400">Sign Up</a>
        </p>
      </div>
    );
  };
  
  export default LoginForm;