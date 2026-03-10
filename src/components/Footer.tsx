import { Sprout, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'H-2A Visa Program Management',
  'Agricultural Staffing Solutions',
  'Compliance Management',
  'Bilingual Support',
  'Government Relations',
];

export default function Footer() {
  const { t } = useLang();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-earth-950 text-earth-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-lg bg-primary-600">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-display text-white">Agri Pro</span>
                <span className="text-lg font-display text-primary-400">Placements</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-earth-400 mb-6">
              Agricultural recruitment and staffing agency specializing in the H-2A visa
              program. Seasonal Workforce. Full Compliance.
            </p>
            <div className="space-y-3">
              <a href="tel:+18703019200" className="flex items-center gap-2 text-sm hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />
                (870) 301-9200
              </a>
              <a href="mailto:info@agriproplacements.com" className="flex items-center gap-2 text-sm hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@agriproplacements.com
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Searcy, Arkansas
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display mb-5">{t(translations.footer.quickLinks)}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary-400 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display mb-5">{t(translations.footer.services)}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                    className="text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary-400 transition-all duration-200" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display mb-5">{t(translations.footer.businessHours)}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{t(translations.footer.monFri)}</span>
                <span className="text-white font-medium">8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{t(translations.footer.saturday)}</span>
                <span>{t(translations.footer.closed)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t(translations.footer.sunday)}</span>
                <span>{t(translations.footer.closed)}</span>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-earth-900/80 border border-earth-800">
              <p className="text-white font-medium text-sm mb-1">{t(translations.footer.urgentHelp)}</p>
              <p className="text-earth-400 text-xs leading-relaxed">
                Call us during business hours for immediate support with your H-2A workforce needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-earth-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-earth-500">
            &copy; {new Date().getFullYear()} Agri Pro Placements. {t(translations.footer.rights)}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-earth-500">
              Searcy, AR &middot; Serving farms nationwide
            </p>
            <button
              onClick={() => scrollTo('#home')}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-earth-900 border border-earth-800 hover:border-earth-700 text-earth-400 hover:text-white transition-all duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
