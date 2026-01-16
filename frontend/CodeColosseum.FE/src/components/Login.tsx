import { useState } from "react";
import { Rocket, Mail, Lock, Eye, EyeOff, Github, Chrome } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    onLogin(email, password);
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    onLogin(`demo@${provider}.com`, "demo");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeColosseum
            </span>
          </div>
          <h1 className="text-3xl mb-2 text-white">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to continue your coding journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                />
                <span className="text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-white font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#121212] text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg hover:border-gray-600 transition-all text-white"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg hover:border-gray-600 transition-all text-white"
            >
              <Chrome className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-gray-400">Don't have an account? </span>
          <button
            onClick={onSwitchToSignup}
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}
