"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Droplet,
  Sun,
  TrendingUp,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Login = () => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Brand Color Constant
  const brandGreen = "#1F5224";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const features = [
    { icon: TrendingUp, text: "Analytics Node" },
    { icon: Droplet, text: "Inventory Protocol" },
    { icon: Sun, text: "Climate Metrics" },
    { icon: Sparkles, text: "Health Monitoring" },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"
      }`}
    >
      <div
        className={`w-full max-w-6xl grid lg:grid-cols-2 gap-0 transition-all duration-300 ${
          isDark ? "bg-black" : "bg-white"
        } rounded-3xl shadow-2xl border ${
          isDark ? "border-white/10" : "border-black/10"
        } overflow-hidden`}
      >
        {/* Left Side - Industrial Hero Section */}
        <div
          className={`relative p-10 lg:p-16 flex flex-col justify-between min-h-[600px] overflow-hidden transition-colors duration-500 ${
            isDark ? "bg-zinc-950" : "bg-zinc-50"
          }`}
        >
          {/* Brand Grid & Glow Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute inset-0 opacity-20`}
              style={{
                backgroundImage: `linear-gradient(${isDark ? 'rgba(31, 82, 36, 0.3)' : 'rgba(31, 82, 36, 0.1)'} 1px, transparent 1px), 
                                  linear-gradient(90deg, ${isDark ? 'rgba(31, 82, 36, 0.3)' : 'rgba(31, 82, 36, 0.1)'} 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
            <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] ${isDark ? "bg-[#1F5224]/20" : "bg-[#1F5224]/10"}`} />
          </div>

          <div className="relative z-10 space-y-8">
            {/* System Status Tag */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase ${
              isDark ? "bg-white/5 border-white/10 text-green-400" : "bg-[#1F5224]/5 border-[#1F5224]/20 text-[#1F5224]"
            }`}>
              <ShieldCheck className="w-3 h-3" />
              Secure_Access_Protocol_v4
            </div>

            <h1 className={`text-4xl lg:text-6xl font-black leading-none tracking-tighter uppercase transition-colors duration-500 ${
                isDark ? "text-white" : "text-black"
              }`}>
              Command <br />
              <span style={{ color: brandGreen }}>Efficiency.</span>
            </h1>

            <p className={`text-sm max-w-sm leading-relaxed uppercase tracking-wide opacity-60 font-medium ${
                isDark ? "text-white" : "text-black"
              }`}>
              Initialize your farm management terminal to oversee modular operating nodes and autonomous data.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 border transition-all duration-300 ${
                    isDark
                      ? "bg-black/40 border-white/10 hover:border-green-500/50"
                      : "bg-white/80 border-black/5 hover:border-[#1F5224]/30"
                  }`}
                >
                  <feature.icon className="w-4 h-4 opacity-70" style={{ color: isDark ? '#4ade80' : brandGreen }} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 flex gap-8 pt-8 border-t border-black/5 dark:border-white/5">
            {[
              { value: "500+", label: "UNITS" },
              { value: "98%", label: "UPTIME" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-xl font-black tracking-tighter" style={{ color: isDark ? '#fff' : '#000' }}>{stat.value}</div>
                <div className="text-[9px] font-bold opacity-40 tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center bg-transparent">
          <div className="mb-10">
            <h2 className={`text-2xl font-black uppercase tracking-tighter mb-2 ${isDark ? "text-white" : "text-black"}`}>
              User Authentication
            </h2>
            <p className={`text-xs font-bold uppercase tracking-widest opacity-40 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Accessing encrypted management layer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Access Identifier (Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@domain.sh"
                  className={`w-full pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest rounded-none border transition-all outline-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-green-500"
                      : "bg-black/5 border-black/10 text-black focus:border-[#1F5224]"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Security Key (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-12 py-4 text-xs font-bold rounded-none border transition-all outline-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-green-500"
                      : "bg-black/5 border-black/10 text-black focus:border-[#1F5224]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className={`text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all ${
                isDark ? "text-green-400" : "text-[#1F5224]"
              }`}>
                Reset Credentials?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-5 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group shadow-xl"
              style={{ backgroundColor: brandGreen, color: '#fff' }}
            >
              Authorize Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className={`absolute inset-0 flex items-center ${isDark ? "opacity-10" : "opacity-20"}`}>
              <div className="w-full border-t border-current" />
            </div>
            <div className="relative flex justify-center">
              <span className={`px-4 text-[9px] font-black uppercase tracking-widest ${isDark ? "bg-black text-gray-500" : "bg-white text-gray-400"}`}>
                OR
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              New Operator?{" "}
              <Link
                href="/signup"
                className={`ml-1 transition-all ${isDark ? "text-green-400 hover:text-green-300" : "text-[#1F5224] hover:opacity-70"}`}
              >
                Register Module
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;