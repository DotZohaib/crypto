"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Bell,
  ChevronDown,
  Moon,
  Sun,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface HomeFormData {
  email: string;
  password: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

const Home = () => {
  const [formData, setFormData] = useState<HomeFormData>({
    email: "",
    password: "",
    agreeToTerms: false,
    newsletter: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strengthScore, setStrengthScore] = useState(0);

  // Animated background patterns
  const [patterns, setPatterns] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const newPatterns = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      opacity: Math.random() * 0.2
    }));
    setPatterns(newPatterns);
  }, []);

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrengthScore(score);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.email) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to terms and conditions");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store email in localStorage for persistence
    localStorage.setItem("userEmail", formData.email);
    setSuccess("Account created successfully!");
    setLoading(false);

    // Navigate to features page after success message
    setTimeout(() => {
      window.location.href = "/features";
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* Animated background patterns */}
      {patterns.map((pattern, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-float"
          style={{
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            width: `${pattern.size}px`,
            height: `${pattern.size}px`,
            background: isDarkMode ?
              `rgba(59, 130, 246, ${pattern.opacity})` :
              `rgba(219, 234, 254, ${pattern.opacity})`,
            animation: `float ${Math.random() * 10 + 5}s infinite`
          }}
        />
      ))}

      {/* Theme toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="mb-8 transform transition-all duration-500 hover:scale-105">
              <div className="text-red-500 text-2xl font-bold mb-4 animate-pulse">Crypto</div>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full animate-spin-slow"
                />
                <span className="text-xl font-bold">TradingView</span>
              </div>
              <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Chart. Analyse. Trade.
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-300
                    ${isDarkMode ?
                      'bg-gray-800 border-gray-700 text-white' :
                      'bg-white border-gray-300 text-gray-900'}
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                {formData.email && (
                  <CheckCircle className="absolute right-3 top-3 text-green-500" size={20} />
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-300
                    ${isDarkMode ?
                      'bg-gray-800 border-gray-700 text-white' :
                      'bg-white border-gray-300 text-gray-900'}
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    calculatePasswordStrength(e.target.value);
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <div
                        key={score}
                        className={`h-2 w-full rounded-full transition-colors duration-300 ${
                          score <= strengthScore ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Password strength: {
                      ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strengthScore - 1] || 'Very Weak'
                    }
                  </p>
                </div>
              )}

              {/* Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 transition-colors duration-300"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: e.target.checked,
                      })
                    }
                    required
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 transition-colors duration-300"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsletter: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm">
                    Subscribe to newsletter for trading tips and updates
                  </span>
                </label>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 animate-shake">
                  <AlertCircle size={20} />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-green-500 animate-bounce">
                  <CheckCircle size={20} />
                  <p className="text-sm">{success}</p>
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg
                  transition-all duration-300 transform hover:scale-105
                  ${loading ? 'bg-gray-400' : 'bg-pink-400 hover:bg-pink-500'}
                  text-white`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign up
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative transform transition-all duration-500 hover:scale-105">
              <Image
                src="/bg.webp"
                alt="Trading Platform"
                layout="responsive"
                width={700}
                height={475}
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
