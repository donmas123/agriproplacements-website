import { useState, useEffect } from 'react';
import { Menu, X, Phone, Sprout, Globe } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const navKeys = ['home', 'services', 'about', 'process', 'trends', 'faq', 'contact'] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy();
  const progress = useScrollProgress();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = navKeys.map((key) => ({
    label: t(translations.nav[key]),
    href: `#${key}`,
    id: key,
  }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-earth-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
            className="flex items-center gap-2.5 group"
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? 'bg-primary-600 shadow-sm' : 'bg-white/15 backdrop-blur-sm border border-white/20'}`}>
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-display tracking-tight transition-colors duration-300 ${scrolled ? 'text-earth-900' : 'text-white'}`}>
                Agri Pro
              </span>
              <span className={`text-xl font-display transition-colors duration-300 ${scrolled ? 'text-primary-600' : 'text-primary-300'}`}>
                Placements
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-earth-600 hover:text-primary-700 hover:bg-primary-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                } ${activeId === link.id ? (scrolled ? 'text-primary-700' : 'text-white') : ''}`}
              >
                {link.label}
                {activeId === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary-400" />
                )}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className={`ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                scrolled
                  ? 'text-earth-600 hover:text-primary-700 hover:bg-primary-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href="tel:+18703019200"
              aria-label="Call Agri Pro Placements"
              className={`ml-3 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md'
                  : 'bg-white/95 text-primary-800 hover:bg-white shadow-lg shadow-black/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              (870) 301-9200
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className={`p-2.5 rounded-lg transition-colors ${
                scrolled ? 'text-earth-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`p-2.5 rounded-lg transition-colors ${
                scrolled ? 'text-earth-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] bg-secondary-500 transition-all duration-150"
        style={{ width: `${progress * 100}%` }}
      />

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-20 left-0 right-0 z-50 transition-all duration-300 ${
          mobileOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white shadow-xl mx-4 rounded-2xl border border-gray-100 px-3 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                activeId === link.id
                  ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-600'
                  : 'text-earth-700 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+18703019200"
            className="flex items-center justify-center gap-2 px-4 py-3.5 mt-2 rounded-xl bg-primary-600 text-white font-semibold"
          >
            <Phone className="w-4 h-4" />
            (870) 301-9200
          </a>
        </div>
      </div>
    </header>
  );
}
