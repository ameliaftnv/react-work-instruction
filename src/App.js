import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Monitor, Cog, BarChart3, ArrowRight, Menu, X } from 'lucide-react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyaWQiIG9wYWNpdHk9IjAuMSI+CjxwYXRoIGQ9Ik0wIDEwSDE0ME0wIDIwSDEwME0wIDMwSDEwME0wIDQwSDEwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9nPgo8L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Optimalkan
                  <br />
                  Manajemen Proyek
                  <br />
                  Anda dengan{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Work Instruction
                  </span>
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Pantau kemajuan tim dan pekerja secara real-time untuk pengelolaan yang 
                  lebih efisien. Pastikan setiap langkah tercatat dengan baik untuk hasil 
                  yang maksimal.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="border-2 border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            
            {/* Right Content - Industrial Image */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-8">
                  {/* Simulated industrial facility */}
                  <div className="w-full h-full bg-slate-800 rounded-2xl relative overflow-hidden">
                    {/* Industrial structure simulation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
                    
                    {/* Structural elements */}
                    <div className="absolute top-1/4 left-1/4 right-1/4 h-2 bg-orange-400 rounded"></div>
                    <div className="absolute top-1/2 left-1/6 right-1/6 h-2 bg-orange-400 rounded"></div>
                    <div className="absolute top-3/4 left-1/3 right-1/3 h-2 bg-orange-400 rounded"></div>
                    
                    {/* Vertical supports */}
                    <div className="absolute left-1/4 top-1/4 bottom-1/4 w-2 bg-slate-600 rounded"></div>
                    <div className="absolute right-1/4 top-1/4 bottom-1/4 w-2 bg-slate-600 rounded"></div>
                    
                    {/* Glow effects */}
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-orange-400 rounded-full blur-sm animate-pulse"></div>
                    <div className="absolute bottom-12 right-12 w-3 h-3 bg-blue-400 rounded-full blur-sm animate-pulse delay-500"></div>
                    <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-green-400 rounded-full blur-sm animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <span className="text-blue-400">Len</span> Railway Systems
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-300 hover:text-white transition-colors">Home</a>
            <a href="#task" className="text-slate-300 hover:text-white transition-colors">Task</a>
            <a href="#progress" className="text-slate-300 hover:text-white transition-colors">Progress</a>
            <a href="#statistics" className="text-slate-300 hover:text-white transition-colors">Statistics</a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Sign In
            </button>
            <button className="border border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors">
              Register
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-slate-300 hover:text-white transition-colors">Home</a>
              <a href="#task" className="text-slate-300 hover:text-white transition-colors">Task</a>
              <a href="#progress" className="text-slate-300 hover:text-white transition-colors">Progress</a>
              <a href="#statistics" className="text-slate-300 hover:text-white transition-colors">Statistics</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Sign In
                </button>
                <button className="border border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900 px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Product Card Component
const ProductCard = ({ title, description, icon: Icon, gradient, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`group relative bg-gradient-to-br ${gradient} rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image simulation */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {/* Simulated control room image */}
        <div className="absolute inset-0 bg-slate-800">
          {/* Monitor screens simulation */}
          <div className="absolute top-1/4 left-1/6 right-1/6 h-1/3 bg-gradient-to-b from-green-400/30 to-green-600/30 rounded-lg border border-green-400/50"></div>
          <div className="absolute top-1/4 left-1/6 right-1/6 h-1/3 bg-slate-900/50 rounded-lg"></div>
          
          {/* Screen content lines */}
          <div className="absolute top-1/3 left-1/4 right-1/4 space-y-1">
            <div className="h-1 bg-green-400/60 rounded w-3/4"></div>
            <div className="h-1 bg-green-400/40 rounded w-1/2"></div>
            <div className="h-1 bg-green-400/60 rounded w-2/3"></div>
          </div>
          
          {/* Control panels */}
          <div className="absolute bottom-1/4 left-1/6 right-1/6 h-1/6 bg-slate-700 rounded-lg"></div>
          
          {/* Operator simulation */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-600 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-green-500/30 rounded"></div>
          
          {/* Indicator lights */}
          <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/6 right-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-sm text-slate-200 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        
        <button className={`w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
        } flex items-center justify-center group-hover:shadow-lg`}>
          Mulai Pengerjaan
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

// Products Section Component
const ProductsSection = () => {
  const products = [
    {
      title: "Sistem Persinyalan Kereta Api",
      description: "Sistem Interlocking Berbasis Komputer (CBI) Perkeretaapian dengan tingkat keselamatan dan keandalan yang tinggi menggunakan platform keselamatan bersertifikat SIL-4.",
      icon: Shield,
      gradient: "from-blue-600 to-blue-800"
    },
    {
      title: "Sistem Persinyalan Kereta Api",
      description: "Sistem Interlocking Berbasis Komputer (CBI) Perkeretaapian dengan tingkat keselamatan dan keandalan yang tinggi menggunakan platform keselamatan bersertifikat SIL-4.",
      icon: Monitor,
      gradient: "from-purple-600 to-purple-800"
    },
    {
      title: "Sistem Persinyalan Kereta Api",
      description: "Sistem Interlocking Berbasis Komputer (CBI) Perkeretaapian dengan tingkat keselamatan dan keandalan yang tinggi menggunakan platform keselamatan bersertifikat SIL-4.",
      icon: Cog,
      gradient: "from-indigo-600 to-indigo-800"
    }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Produk yang dihasilkan
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Dapatkan gambaran lengkap tentang progres masing-masing pekerja dan tim
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              icon={product.icon}
              gradient={product.gradient}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Logos */}
          <div className="flex items-center space-x-8 mb-8 lg:mb-0">
            {/* DEFEND ID Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <div className="text-white font-bold text-xl">D</div>
              </div>
              <div>
                <div className="text-red-600 font-bold text-xl">DEFEND ID</div>
                <div className="text-slate-600 text-sm">Defence Industry Indonesia</div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="hidden lg:block w-px h-12 bg-slate-300"></div>
            
            {/* LEN Logo */}
            <div className="flex items-center">
              <div className="text-red-600 font-bold text-3xl">LEN</div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-slate-600">
              © 2025 Len Railways System. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;