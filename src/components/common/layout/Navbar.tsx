"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  IconSparkles, 
  IconMenu2, 
  IconX, 
  IconChevronDown,
  IconRocket,
  IconArrowRight
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Innovations", href: "/innovations" },
  { 
    title: "Portals", 
    href: "#",
    children: [
      { title: "Student Hub", href: "/student/dashboard", desc: "For researchers & innovators" },
      { title: "Faculty Desk", href: "/faculty/dashboard", desc: "For mentors & evaluators" },
      { title: "Admin Panel", href: "/admin/dashboard", desc: "System governance" },
    ]
  },
  { title: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled 
          ? "py-3 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-b border-white/20 dark:border-neutral-800/50" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group relative"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-10 w-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300">
              <IconSparkles className="h-6 w-6 text-white dark:text-black" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
              ProEval <span className="text-primary italic font-serif">AI</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">Innovation Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/50 dark:bg-neutral-900/50 p-1.5 rounded-2xl backdrop-blur-md border border-white/10">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              {item.children ? (
                <div className="flex items-center gap-1 px-5 py-2.5 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white dark:hover:bg-neutral-800">
                  {item.title}
                  <IconChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  
                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-64">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-800 p-3">
                      {item.children.map((child) => (
                        <Link 
                          key={child.title} 
                          href={child.href}
                          className="flex flex-col p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">{child.title}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href={item.href}
                  className={cn(
                    "px-5 py-2.5 text-sm font-bold transition-all rounded-xl relative overflow-hidden",
                    pathname === item.href 
                      ? "text-primary bg-white dark:bg-neutral-800 shadow-sm" 
                      : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800"
                  )}
                >
                  {item.title}
                  {pathname === item.href && (
                    <motion.div 
                      layoutId="nav-active" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors px-4">
            Sign In
          </Link>
          <Button asChild className="rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold h-11 px-6 shadow-xl hover:scale-105 transition-all">
            <Link href="/register" className="flex items-center gap-2">
              Join Ecosystem <IconArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:scale-110 active:scale-95 transition-all"
        >
          {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-4 px-6 pb-8"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl border border-neutral-100 dark:border-neutral-800 p-6 space-y-8 overflow-hidden relative">
              {/* Decorative background for mobile menu */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    {item.children ? (
                      <div className="space-y-3">
                         <p className="text-xs font-black uppercase tracking-widest text-muted-foreground px-4 mt-4">{item.title}</p>
                         {item.children.map(child => (
                            <Link 
                              key={child.title} 
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-between p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                               <span className="font-bold">{child.title}</span>
                               <IconRocket className="h-4 w-4 text-primary" />
                            </Link>
                         ))}
                      </div>
                    ) : (
                      <Link 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "p-4 rounded-3xl font-bold flex items-center justify-between",
                          pathname === item.href ? "bg-primary/5 text-primary" : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        )}
                      >
                        {item.title}
                        {pathname === item.href && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-4">
                <Button asChild variant="outline" className="h-14 rounded-3xl border-2 font-bold">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="h-14 rounded-3xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20">
                  <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
