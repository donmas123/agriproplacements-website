import { ArrowRight, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

export default function CTABanner() {
  const { t } = useLang();
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-24 bg-earth-50 relative overflow-hidden">
      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop"
              alt="Golden wheat field at sunset"
              width={1200}
              height={500}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/85 to-primary-800/80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-30" />
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mb-4 leading-tight">
              {t(translations.ctaBanner.titleLine1)}
              <br />
              <span className="text-secondary-400">{t(translations.ctaBanner.titleLine2)}</span>
            </h2>
            <p className="text-primary-200/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(translations.ctaBanner.description)}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 hover:bg-secondary-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-secondary-900/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                {t(translations.ctaBanner.cta)}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="tel:+18703019200"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                (870) 301-9200
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
