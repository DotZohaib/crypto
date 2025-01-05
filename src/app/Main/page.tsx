"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LineChart as LucideLineChart,
  BarChart,
  Activity,
  Bell,
  Lock,
  Users,
  Wallet,
  PieChart,
  Shield,
  HeadphonesIcon,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  Globe,
  Sun,
  Moon,
  Share2,
  BookOpen,
  Calendar,
  Clock,
  Gift,
  Heart,
  Star,
  Bookmark,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Enhanced Market Card Component
const MarketCard = ({ symbol, price, change, volume }) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.03, y: -5 }}
      layout
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{symbol}</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Star className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">${price}</span>
        <span
          className={`ml-2 ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
      </div>
      <div className="text-sm text-gray-500 mt-2">Vol: ${volume}M</div>
    </motion.div>
  );
};

// New Price Alert Component
const PriceAlert = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <motion.div className="bg-white p-6 rounded-xl shadow-lg" layout>
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 text-blue-600"
        whileHover={{ scale: 1.02 }}
      >
        <Bell className="w-5 h-5" />
        Set Price Alert
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4"
          >
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Create Alert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// New Portfolio Overview Component
const PortfolioOverview = () => {
  const [portfolioValue, setPortfolioValue] = useState(125000);
  const [profitLoss, setProfitLoss] = useState(12.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioValue((prev) => prev + (Math.random() - 0.5) * 1000);
      setProfitLoss((prev) => prev + (Math.random() - 0.5) * 0.1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-4">Portfolio Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">
            ${portfolioValue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">24h P/L</p>
          <p
            className={`text-2xl font-bold ${
              profitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitLoss >= 0 ? "+" : ""}
            {profitLoss.toFixed(2)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Features Component
const Main = () => {
  const [theme, setTheme] = useState("light");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const marketData = [
    { symbol: "BTC/USD", price: "45,123.45", change: 2.5, volume: 1234 },
    { symbol: "ETH/USD", price: "3,123.45", change: -1.2, volume: 567 },
    { symbol: "SOL/USD", price: "123.45", change: 5.6, volume: 890 },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      {/* Enhanced Navigation */}
      <motion.nav
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation Items */}
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  className="rounded-full"
                  width={50}
                  height={50}
                />
              </motion.div>

              {/* Search Bar */}
              <motion.div
                className="relative"
                animate={{ width: showSearch ? 300 : 40 }}
              >
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <AnimatePresence>
                  {showSearch && (
                    <motion.input
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      exit={{ opacity: 0, width: 0 }}
                      type="text"
                      placeholder="Search markets..."
                      className="absolute left-0 top-0 h-full rounded-full px-4 border"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Globe className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Wallet
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Portfolio Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PortfolioOverview />
          <PriceAlert />
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <DollarSign />, label: "Deposit" },
                { icon: <Share2 />, label: "Withdraw" },
                { icon: <Gift />, label: "Rewards" },
                { icon: <BookOpen />, label: "Learn" },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
                  whileHover={{ y: -5 }}
                >
                  {action.icon}
                  <span className="mt-2 text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Market Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {marketData.map((market, index) => (
            <MarketCard key={index} {...market} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4">Price Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={Array.from({ length: 20 }, (_, i) => ({
                  name: i.toString(),
                  value: Math.random() * 100,
                }))}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4">Volume Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={Array.from({ length: 20 }, (_, i) => ({
                  name: i.toString(),
                  value: Math.random() * 100,
                }))}
              >
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Main;
