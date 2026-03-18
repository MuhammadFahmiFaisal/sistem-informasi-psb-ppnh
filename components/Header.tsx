import React, { useState, useEffect } from 'react';
import { ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';

interface SubNavLink {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href?: string;
  subItems?: SubNavLink[];
}

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const sections = document.querySelectorAll('section[id], header[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Scroll lock logic
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navLinks: NavLink[] = [
    { name: 'Beranda', href: '/#home' },
    {
      name: 'Profil',
      subItems: [
        { name: 'Visi & Misi', href: '/#about' },
        { name: 'Fasilitas Unggulan', href: '/#facilities' },
      ]
    },
    { name: 'Program', href: '/#programs' },
    {
      name: 'Media',
      subItems: [
        { name: 'Karya Santri', href: '/#karya' },
        { name: 'Berita Terkini', href: '/#news' },
        { name: 'Galeri Foto', href: '/#gallery' },
        { name: 'Video Kegiatan', href: '/#videos' },
      ]
    },
    { name: 'Pendaftaran', href: '/#admissions' },
    { name: 'Kontak', href: '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-navy/95 shadow-xl py-2 md:py-3 dark:bg-navy-dark/95 backdrop-blur-md' : 'bg-transparent py-4'
          }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-10 lg:px-20">
        <a href="#home" className="flex items-center gap-2 sm:gap-3 text-white group" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center transition-transform duration-300 group-hover:scale-110">
            <img
              src="https://res.cloudinary.com/dnnuqxs7g/image/upload/v1765542749/LOGONH_jj5r9f.png"
              alt="Logo Nurul Huda Malati"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-white text-base sm:text-lg font-bold leading-tight tracking-tight">
            Nurul Huda <span className="text-primary">Malati</span>
          </h2>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-end gap-6 items-center">
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-3 py-2">
                {link.subItems ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-48 mt-2 py-2 bg-white dark:bg-navy rounded-xl shadow-2xl border border-slate-100 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className={`text-sm font-medium leading-normal transition-all duration-300 relative ${activeSection === link.href || (link.href && link.href.endsWith(activeSection))
                      ? 'text-primary font-bold'
                      : 'text-white/80 hover:text-white'
                      }`}
                  >
                    {link.name}
                    {activeSection === link.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                    )}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button & Dark Mode */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-navy/90 backdrop-blur-lg lg:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[85%] sm:w-[350px] bg-white dark:bg-navy shadow-2xl transition-transform duration-500 ease-in-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dnnuqxs7g/image/upload/v1765542749/LOGONH_jj5r9f.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-navy dark:text-white text-lg font-bold">
                Menu Utama
              </span>
            </div>
            <button
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.subItems ? (
                    <div className="py-1">
                      <button
                        onClick={() => setOpenSubMenu(openSubMenu === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between py-3 text-base font-bold transition-colors ${openSubMenu === link.name ? 'text-primary' : 'text-slate-600 dark:text-white/90'}`}
                      >
                        {link.name}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubMenu === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openSubMenu === link.name ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-slate-50 dark:bg-white/5 rounded-2xl my-2 px-4 py-2 border border-slate-100 dark:border-white/5">
                          {link.subItems.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="block py-3 text-sm text-slate-600 dark:text-white/70 active:text-primary transition-colors border-b border-slate-100 dark:border-white/5 last:border-none"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className={`block py-4 text-base font-bold transition-colors ${link.name === 'Pendaftaran'
                        ? 'text-primary'
                        : activeSection === link.href || (link.href && link.href.endsWith(activeSection))
                          ? 'text-primary'
                          : 'text-slate-600 dark:text-white/90'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Footer Info */}
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-white/5">
              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">Butuh bantuan pendaftaran?</p>
                <a 
                  href="https://wa.me/628123456789" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-navy rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                >
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
