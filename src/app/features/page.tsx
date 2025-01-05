"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { LineChart as LucideLineChart, BarChart, Activity, Bell, Wallet,
  PieChart, Shield, HeadphonesIcon,  ChevronDown,
  Zap, TrendingUp,  Award } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ... FeatureCardProps interface and FeatureCard component remain the same ...
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-500 border border-gray-100
        ${isHovered ? 'shadow-2xl border-blue-200' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="text-4xl mb-6 text-blue-600 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-xl font-bold mb-3 text-gray-800"
        animate={{ color: isHovered ? '#2563EB' : '#1F2937' }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex justify-end"
        >
          <motion.button
            className="text-blue-600 flex items-center gap-2 text-sm"
            whileHover={{ x: 5 }}
          >
            Learn more <ChevronDown className="w-4 h-4 rotate-270" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

const LiveChart = () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      name: i.toString(),
      value: Math.random() * 100
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          name: (parseInt(prev[prev.length - 1].name) + 1).toString(),
          value: Math.random() * 100
        }];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const TradingStats = () => {
  const [stats, setStats] = useState({
    volume: 1234567,
    trades: 50000,
    users: 25000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        volume: prev.volume + Math.random() * 1000,
        trades: prev.trades + Math.random() * 10,
        users: prev.users + Math.random() * 5
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {[
        { label: "24h Volume", value: `$${Math.floor(stats.volume).toLocaleString()}` },
        { label: "Total Trades", value: Math.floor(stats.trades).toLocaleString() },
        { label: "Active Users", value: Math.floor(stats.users).toLocaleString() }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white p-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-gray-500 text-sm mb-2">{stat.label}</h3>
          <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Features = () => {
  const [theme, setTheme] = useState("light");
  const [showNotifications, setShowNotifications] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [marketAlerts, setMarketAlerts] = useState([
    { id: 1, title: "BTC Alert", message: "Bitcoin breaks $45,000" },
    { id: 2, title: "ETH Alert", message: "Ethereum up 5% in last hour" }
  ]);

  const navigationItems = [
    { name: "Dashboard", icon: <Activity className="w-5 h-5" /> },
    { name: "Markets", icon: <TrendingUp className="w-5 h-5" /> },
    { name: "Portfolio", icon: <PieChart className="w-5 h-5" /> },
    { name: "Trading", icon: <BarChart className="w-5 h-5" /> }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/public/logo.jpg" alt="Logo" className="rounded-full" width={50} height={50} />
              </motion.div>

              <div className="hidden md:flex gap-6">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.icon}
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.button>

              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {marketAlerts.length}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2"
                    >
                      {marketAlerts.map(alert => (
                        <motion.div
                          key={alert.id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <div className="font-semibold">{alert.title}</div>
                          <div className="text-sm text-gray-600">{alert.message}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Trade Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Next-Gen Trading Platform
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience professional-grade trading with advanced tools and real-time analytics
          </p>
        </motion.div>

        <TradingStats />
        <LiveChart />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            { icon: <LucideLineChart size={32} />, title: "Advanced Charts", description: "Professional-grade charting with technical indicators" },
            { icon: <Shield size={32} />, title: "Bank-Grade Security", description: "Multi-layer security with biometric authentication" },
            { icon: <Zap size={32} />, title: "Instant Trades", description: "Lightning-fast execution with smart order routing" },
            { icon: <Award size={32} />, title: "Rewards Program", description: "Earn while you trade with our loyalty program" },
            { icon: <HeadphonesIcon size={32} />, title: "24/7 Support", description: "Round-the-clock customer support" },
            { icon: <Wallet size={32} />, title: "Multi-Asset Wallet", description: "Secure storage for all your digital assets" }
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
