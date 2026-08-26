"use client";

import React, { useState, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence, useInView, animate, type Variants } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
import {
  Wallet,
  Stethoscope,
  ArrowRightLeft,
  ShieldCheck,
  Building2,
  ChevronRight,
  UserCheck,
  Info,
  X,
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
  PhoneCall,
  Globe,
  FileText,
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  User,
  CheckCircle,
  Home,
  FileCheck2
} from "lucide-react";

// Types
export interface UserPersona {
  name: string;
  uan: string;
  uanStatus: string;
  aadhaarLinked: boolean;
  bankLinked: boolean;
  bankVerified?: boolean;
  pfBalance: string;
  activeCompany: string;
}

interface CounterStatProps {
  prefix?: string;
  target: number;
  suffix?: string;
  label: string;
  colorClass?: string;
  decimals?: number;
  montserratClass?: string;
  isInView: boolean;
}

function CounterStatItem({
  prefix = "",
  target,
  suffix = "",
  label,
  colorClass = "text-slate-900",
  decimals = 0,
  montserratClass = "",
  isInView,
}: CounterStatProps) {
  const [displayValue, setDisplayValue] = useState<string>(
    (0).toFixed(decimals)
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          setDisplayValue(value.toFixed(decimals));
        },
      });
      return () => controls.stop();
    } else {
      setDisplayValue((0).toFixed(decimals));
    }
  }, [isInView, target, decimals]);

  return (
    <div>
      <span className={`block text-xl font-black ${colorClass} ${montserratClass}`}>
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  );
}

export function DirectCitizenAssurance({ montserratClass }: { montserratClass?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-16 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Direct Citizen Assurance</h4>
          <p className="text-xs text-slate-500">Secured via DigiLocker & Aadhaar e-KYC</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12">
        <CounterStatItem
          target={6.8}
          decimals={1}
          suffix=" Cr+"
          label="Active Accounts"
          colorClass="text-slate-900"
          montserratClass={montserratClass}
          isInView={isInView}
        />
        <CounterStatItem
          prefix="< "
          target={24}
          decimals={0}
          suffix=" Hrs"
          label="Avg Claim Sanction"
          colorClass="text-emerald-600"
          montserratClass={montserratClass}
          isInView={isInView}
        />
        <div className="hidden sm:block">
          <CounterStatItem
            target={8.25}
            decimals={2}
            suffix="%"
            label="Current Interest Rate"
            colorClass="text-blue-700"
            montserratClass={montserratClass}
            isInView={isInView}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function EPFOLandingPage() {
  // State Management
  const [activeUser, setActiveUser] = useState<UserPersona | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);
  const [showPassbook, setShowPassbook] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isJudgeModeOpen, setIsJudgeModeOpen] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [uanInput, setUanInput] = useState<string>("100456789012");
  const [lang, setLang] = useState<"en" | "hi">("en");

  // Listen for browser native back button (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      setSelectedIntent(null);
      setClaimSubmitted(false);
      setShowPassbook(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Sample data for Judge Mode presets
  const personas: UserPersona[] = [
    {
      name: "Ramesh Kumar",
      uan: "100984521098",
      uanStatus: "Active",
      aadhaarLinked: true,
      bankLinked: true,
      bankVerified: true,
      pfBalance: "₹ 4,82,450",
      activeCompany: "TCS India Pvt Ltd"
    },
    {
      name: "Priya Sharma",
      uan: "101239485761",
      uanStatus: "Active",
      aadhaarLinked: true,
      bankLinked: true,
      bankVerified: true,
      pfBalance: "₹ 2,15,000",
      activeCompany: "Infosys Technologies"
    },
    {
      name: "Suresh Patel",
      uan: "100443322110",
      uanStatus: "Active",
      aadhaarLinked: true,
      bankLinked: true,
      bankVerified: true,
      pfBalance: "₹ 6,50,200",
      activeCompany: "Wipro Ltd (3 Past Accounts)"
    }
  ];

  // Helper for active user display with initial mock flaw
  const currentUser = activeUser || {
    name: "Reyan",
    uan: "100456789012",
    uanStatus: "Active",
    aadhaarLinked: true,
    bankLinked: false,
    bankVerified: false,
    pfBalance: "₹ 4,82,450",
    activeCompany: "Tech Corp India"
  };

  // Mock KYC Validation Engine
  const validateKYC = (user: UserPersona) => {
    const isBankVerified = user.bankVerified ?? user.bankLinked;
    return {
      isBankVerified,
      isAadhaarLinked: user.aadhaarLinked,
      isUanActive: user.uanStatus === "Active",
    };
  };

  const kycStatus = validateKYC(currentUser);

  const handleProceed = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (selectedIntent === 'Check PF Balance') {
        setShowPassbook(true);
      } else {
        setClaimSubmitted(true);
      }
    }, 1500);
  };

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Dynamic Contribution Breakdown calculation based on active user's total balance
  const rawBalance = (activeUser as any)?.balance || activeUser?.pfBalance || currentUser?.pfBalance;
  const totalBalance = typeof rawBalance === 'number' 
    ? rawBalance 
    : (parseInt(String(rawBalance || '').replace(/[^0-9]/g, ''), 10) || 650200);
  const employeeShare = Math.floor(totalBalance * 0.63); // Mocking a realistic 63% share
  const employerShare = totalBalance - employeeShare; // Ensures the math is flawless

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative bg-grid-pattern selection:bg-blue-600 selection:text-white">
      {/* 1. TOP UTILITY BAR (High-Trust Government Branding) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <span className="text-sm">🇮🇳</span> Government of India • Ministry of Labour & Employment
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Official EPFO Citizen Services Portal
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === "en" ? "English" : "हिंदी"}</span>
            </button>
            <span className="text-slate-700">|</span>
            <a href="#help" className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toll Free: 1800 118 005</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <img src="/epfo-logo.png" alt="EPFO Logo" className="h-10 w-auto object-contain" />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans block">
                EPFO <span className="text-blue-700 font-black">Modern</span>
              </span>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Employees' Provident Fund Organisation • Direct Portal
              </p>
            </div>
          </div>

          {/* Right Action: Login / Active Session Indicator */}
          <div className="flex items-center space-x-3">
            {activeUser ? (
              /* Step 2: Navbar updates when activeUser populates */
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Session: {activeUser.name}</span>
                </div>
                <button
                  onClick={() => setIsJudgeModeOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer"
                >
                  Switch Persona
                </button>
              </div>
            ) : (
              /* Step 1: Initial Navbar state */
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowLoginModal(true)}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-md shadow-blue-800/20 hover:shadow-lg hover:shadow-blue-800/30 ring-2 ring-blue-600/30 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-blue-200" />
                <span>Login</span>
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20 flex flex-col justify-center">
        {/* Hero Header Content (Hidden when a service intent is selected) */}
        {!selectedIntent && (
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${montserrat.className} text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]`}
            >
              What do you want to <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900">
                do today?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${montserrat.className} text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed`}
            >
              Access your PF, file emergency claims, and merge accounts in one click.
            </motion.p>
          </div>
        )}

        {/* 4. CONDITIONAL RENDERING WORKFLOW (INTENT CARDS -> KYC CHECKLIST -> SUCCESS RECEIPT) */}
        {selectedIntent === null ? (
          /* STEP 1 & STEP 2: Show original 3 intent cards when selectedIntent is null */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* CARD 1: Check PF Balance */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!activeUser) {
                  setShowLoginModal(true);
                  return;
                }
                window.history.pushState({ service: "active" }, "", "");
                setSelectedIntent("Check PF Balance");
              }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Wallet className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                    <Clock className="w-3 h-3" /> &lt; 30 sec
                  </span>
                </div>

                <h3 className={`${montserrat.className} text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-1.5`}>
                  Check PF Balance
                  <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="mt-2.5 text-xs uppercase tracking-widest text-slate-500 font-medium leading-relaxed">
                  View real-time balance and interest.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Instant Passbook View</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-700 group-hover:text-white text-slate-600 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Emergency Medical Withdrawal */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!activeUser) {
                  setShowLoginModal(true);
                  return;
                }
                window.history.pushState({ service: "active" }, "", "");
                setSelectedIntent("Withdrawal");
              }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Auto-Sanction
                  </span>
                </div>

                <h3 className={`${montserrat.className} text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5`}>
                  Emergency Medical Withdrawal
                  <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="mt-2.5 text-xs uppercase tracking-widest text-slate-500 font-medium leading-relaxed">
                  Direct advance credit to your linked bank.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-emerald-700 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Up to ₹1,00,000 Direct Credit</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Transfer Past PF Account */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!activeUser) {
                  setShowLoginModal(true);
                  return;
                }
                window.history.pushState({ service: "active" }, "", "");
                setSelectedIntent("Transfer");
              }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <ArrowRightLeft className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    One UAN
                  </span>
                </div>

                <h3 className={`${montserrat.className} text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-1.5`}>
                  Transfer Past PF Account
                  <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="mt-2.5 text-xs uppercase tracking-widest text-slate-500 font-medium leading-relaxed">
                  Merge previous employer accounts instantly.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-indigo-700 transition-colors">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Multi-Employer Merge</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* STEP 3: PRE-FLIGHT KYC CHECKLIST CARD (when selectedIntent is active and claimSubmitted/showPassbook are false) */}
            {!showPassbook && !claimSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="mt-14 max-w-xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      <BadgeCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">Pre-Flight KYC Checklist</h2>
                      <p className="text-xs text-slate-500">Selected Intent: <span className="font-bold text-blue-700">{selectedIntent}</span></p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedIntent(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Go Back</span>
                  </button>
                </div>

                {/* Active User Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Citizen: <strong className="text-slate-900">{currentUser.name}</strong></span>
                  </div>
                  <span className="font-mono text-slate-500">UAN: {currentUser.uan}</span>
                </div>

                {/* Checklist Items reading from currentUser / activeUser */}
                <div className="space-y-3">
                  {/* Item 1: UAN Status */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">UAN Status</span>
                        <span className="text-xs text-slate-500">Unified Account Number Active</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  </div>

                  {/* Item 2: Aadhaar Linked */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">Aadhaar Linked</span>
                        <span className="text-xs text-slate-500">UIDAI e-KYC Verified</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{currentUser.aadhaarLinked ? "Yes" : "No"}</span>
                    </span>
                  </div>

                  {/* Item 3: Bank Verified */}
                  <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    kycStatus.isBankVerified
                      ? "bg-slate-50 border-slate-200/90"
                      : "bg-red-50/80 border-red-200"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        kycStatus.isBankVerified ? "bg-emerald-50 text-emerald-600" : "bg-red-100 text-red-600"
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">Bank Verified</span>
                        <span className={`text-xs ${kycStatus.isBankVerified ? "text-slate-500" : "text-red-600 font-medium"}`}>
                          {kycStatus.isBankVerified ? "Direct Benefit Transfer Ready" : "Bank record unverified"}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                      kycStatus.isBankVerified
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}>
                      {kycStatus.isBankVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Bank Verified: Yes</span>
                        </>
                      ) : (
                        <span>Bank Verified: No (Action Required)</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Hidden Proceed when unverified, 1-Click Resolve button shown */}
                {!kycStatus.isBankVerified ? (
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={() => {
                        setActiveUser({
                          ...currentUser,
                          bankLinked: true,
                          bankVerified: true,
                        });
                      }}
                      className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm text-blue-900 bg-blue-50 border-2 border-blue-600 hover:bg-blue-100 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>1-Click Resolve: Authenticate Bank via OTP</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-2">
                    <button
                      onClick={handleProceed}
                      disabled={isProcessing}
                      className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm text-white transition-all flex items-center justify-center gap-2 ${
                        isProcessing
                          ? "bg-indigo-800/80 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 shadow-md shadow-blue-800/20 hover:shadow-lg cursor-pointer"
                      }`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Securing Data...</span>
                        </span>
                      ) : (
                        <span>
                          {selectedIntent === "Check PF Balance" || selectedIntent === "Balance"
                            ? "View Instant Passbook →"
                            : "Proceed to Auto-Fill Claim →"}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* INSTANT PASSBOOK DASHBOARD UI */}
            {showPassbook && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-slate-100 text-center mt-14"
              >
                <h2 className={`${montserrat.className} text-xl font-medium text-slate-500 mb-6 uppercase tracking-widest`}>
                  Instant Passbook
                </h2>
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-xl mb-6">
                  <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">Total PF Balance</p>
                  <p className="text-5xl font-bold text-emerald-900">₹ {totalBalance.toLocaleString('en-IN')}</p>
                </div>

                {/* Contribution Breakdown Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Left Card: Your Contribution */}
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                      Your Contribution
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      ₹ {employeeShare.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Right Card: Employer Contribution */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Employer Contribution
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₹ {employerShare.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => { setShowPassbook(false); setSelectedIntent(null); }} 
                  className="text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
                >
                  ← Return to Dashboard
                </button>
              </motion.div>
            )}

            {/* STEP 4 & STEP 5: SUCCESS RECEIPT CARD (when claimSubmitted is true) */}
            {claimSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.4 }}
                className="mt-14 max-w-xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-2xl space-y-6 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                  <FileCheck2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Auto-Sanctioned & Submitted
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Claim Receipt Generated!
                  </h2>
                  <p className="text-xs text-slate-500">
                    Your request for <strong className="text-slate-900">{selectedIntent}</strong> has been auto-sanctioned via Aadhaar e-KYC.
                  </p>
                </div>

                {/* Receipt Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Tracking Reference ID</span>
                    <span className="font-mono font-bold text-blue-700">EPFO-2026-984521098</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Beneficiary Name</span>
                    <span className="font-bold text-slate-900">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Requested Intent</span>
                    <span className="font-bold text-blue-700">{selectedIntent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Submission Date</span>
                    <span className="font-medium text-slate-800">
                      {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">UAN Number</span>
                    <span className="font-mono font-bold text-slate-800">{currentUser.uan}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Est. Bank Disbursement</span>
                    <span className="font-bold text-emerald-700">&lt; 24 Hours</span>
                  </div>
                </div>

                {/* Step 5 Trigger: Click "Return to Home" */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSelectedIntent(null);
                      setClaimSubmitted(false);
                      setShowPassbook(false);
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4 text-slate-600" />
                    <span>Return to Home</span>
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* 5. TRUST & STATISTICS BANNER (Hidden when a service intent is selected) */}
        {!selectedIntent && (
          <DirectCitizenAssurance montserratClass={montserrat.className} />
        )}
      </main>

      {/* 6. FOOTER */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-slate-200">EPFO Modern Portal</span>
          </div>
          <p className="text-center sm:text-right text-slate-500">
            © 2026 Employees' Provident Fund Organisation, India. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 7. MODAL: DEMO LOGIN (JUDGE MODE) */}
      <AnimatePresence>
        {/* LOGIN MODAL */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark semi-transparent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mx-auto mb-3.5 shadow-xs">
                  <Lock className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className={`${montserrat.className} text-2xl font-extrabold text-slate-900 tracking-tight`}>
                  Access Your PF
                </h2>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mt-1">
                  Enter your Universal Account Number to proceed
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveUser({
                    name: "Reyan",
                    uan: uanInput || "100456789012",
                    uanStatus: "Active",
                    aadhaarLinked: true,
                    bankLinked: true,
                    pfBalance: "₹ 4,82,450",
                    activeCompany: "Tech Corp India"
                  });
                  setShowLoginModal(false);
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-500 font-medium mb-2">
                    12-Digit UAN Number
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={uanInput}
                    onChange={(e) => setUanInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="12-Digit UAN Number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-800/20 hover:shadow-lg hover:shadow-blue-800/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Send Secure OTP</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* JUDGE EVALUATOR MODAL */}
        {isJudgeModeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJudgeModeOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 relative">
                <button
                  onClick={() => setIsJudgeModeOpen(false)}
                  className="absolute top-5 right-5 p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                    Judge Evaluator Mode
                  </span>
                </div>
                <h3 className="text-xl font-bold">Preset User Sandbox</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Test the portal flows under pre-configured citizen profiles.
                </p>
              </div>

              <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Simulated Citizen Persona
                </label>

                <div className="space-y-3">
                  {personas.map((persona) => (
                    <div
                      key={persona.uan}
                      onClick={() => {
                        setActiveUser(persona);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                        (activeUser?.uan || currentUser.uan) === persona.uan
                          ? "border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600/30"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{persona.name}</span>
                          {(activeUser?.uan || currentUser.uan) === persona.uan && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-mono">UAN: {persona.uan}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                          {persona.activeCompany}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      Judge Mode bypasses OTP verification for immediate interface validation of all intent flows.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setIsJudgeModeOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!activeUser) setActiveUser(personas[0]);
                    setIsJudgeModeOpen(false);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Activate Demo Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
