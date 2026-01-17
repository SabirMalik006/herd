import React, { useState } from "react";
import {
  Leaf,
  TrendingUp,
  Users,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
export default function SignUp() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    farmName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Get real-time insights and boost your farm productivity by up to 40%",
    },
    {
      icon: Users,
      title: "Farmer Community",
      description:
        "Connect with expert farmers and share valuable farming experiences",
    },
    {
      icon: Shield,
      title: "Data Protection",
      description:
        "Enterprise-grade security keeps your farm data safe and private",
    },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-10 px-5 transition-colors duration-500 ${
        isDark
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden border transition-all duration-500 ${
          isDark
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* LEFT SIDE */}
        <div
          className={`relative p-10 flex flex-col justify-center transition-all duration-500 ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black"
              : "bg-gradient-to-br from-emerald-50 to-green-50"
          }`}
        >
          {/* Decorative Glow */}
          <div
            className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full ${
              isDark ? "bg-emerald-500/10" : "bg-emerald-500/20"
            }`}
          ></div>

          <div className="relative z-10">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-2xl backdrop-blur-sm ${
                  isDark
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-emerald-500/20 border border-emerald-500/30"
                }`}
              >
                <Leaf
                  className={`w-8 h-8 ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
              </div>
              <div>
                <h1
                  className={`font-bold text-2xl ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Agri Farm
                </h1>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Growing Together</span>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2
              className={`text-4xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Transform Your{" "}
              <span
                className={`block ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                Farming Journey
              </span>
            </h2>
            <p
              className={`text-base mb-8 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Join thousands of progressive farmers revolutionizing agriculture
              through smart technology.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={i}
                  className={`flex gap-4 items-start p-4 rounded-xl border transition-all duration-300 group ${
                    isDark
                      ? "bg-gray-800/60 border-gray-700 hover:bg-gray-800"
                      : "bg-white border-emerald-100 hover:bg-emerald-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isDark
                        ? "bg-emerald-500/10 group-hover:bg-emerald-500/20"
                        : "bg-emerald-500/10 group-hover:bg-emerald-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isDark ? "text-emerald-400" : "text-emerald-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Badge */}
            <div
              className={`pt-6 border-t ${
                isDark ? "border-gray-800" : "border-gray-300"
              }`}
            >
              <div
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <CheckCircle
                  className={`w-5 h-5 ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
                <span className="text-sm font-medium">
                  Free 30-day trial • No credit card required
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`p-10 flex flex-col justify-center transition-all duration-500 ${
            isDark
              ? "bg-gray-900 text-gray-100"
              : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p
            className={`mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign up to get started with{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              Agri Farm
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Full Name", name: "fullName", type: "text", placeholder: "John Smith" },
              { label: "Farm Name", name: "farmName", type: "text", placeholder: "Green Valley Farm" },
              { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/30"
                  }`}
                />
              </div>
            ))}

            {/* Password Fields */}
            {[
              {
                label: "Password",
                name: "password",
                show: showPassword,
                toggle: setShowPassword,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                show: showConfirmPassword,
                toggle: setShowConfirmPassword,
              },
            ].map((f) => (
              <div key={f.name}>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {f.label}
                </label>
                <div className="relative">
                  <input
                    type={f.show ? "text" : "password"}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-12 rounded-lg border outline-none transition-all ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => f.toggle(!f.show)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark
                        ? "text-gray-500 hover:text-gray-300"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {f.show ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-emerald-500/30"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDark ? "border-gray-800" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  isDark ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"
                }`}
              >
                or
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <p
            className={`text-sm text-center ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <a
              href="#"
              className={`font-semibold ${
                isDark
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
