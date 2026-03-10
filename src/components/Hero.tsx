import { ArrowRight, Shield, Users, FileCheck, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const highlights = [
  { icon: FileCheck, label: 'H-2A Visa Services', desc: 'Complete program management' },
  { icon: Users, label: 'Agricultural Staffing', desc: 'Skilled seasonal workers' },
  { icon: Shield, label: 'Full Compliance', desc: 'DOL & USCIS adherence' },
];

export default function Hero() {
  const { t } = useLang();
  const { ref: statsRef, isInView: statsVisible } = useInView({ threshold: 0.3 });
  const employeesCount = useCountUp(100, 2000, statsVisible);
  const employersCount = useCountUp(20, 1500, statsVisible);
  const complianceCount = useCountUp(100, 1800, statsVisible);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Agricultural field at golden hour"
          width={1920}
          height={1080}
          className="w-full h-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-950/95 via-primary-950/80 to-primary-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950/60 via-transparent to-primary-950/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-200 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            {t(translations.hero.badge)}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-white leading-[1.1] mb-6 animate-fade-in-up">
            {t(translations.hero.titleLine1)}
            <br />
            <span className="text-secondary-400">{t(translations.hero.titleLine2)}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8 animate-fade-in-up-delay">
            {t(translations.hero.description)}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 animate-fade-in-up-delay">
            {[t(translations.hero.highlight1), t(translations.hero.highlight2), t(translations.hero.highlight3)].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm text-primary-200/90">
                <CheckCircle className="w-3.5 h-3.5 text-secondary-400" />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up-delay-2">
            <button
              onClick={() => scrollTo('#contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 hover:bg-secondary-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-secondary-900/30 hover:shadow-xl hover:shadow-secondary-900/40 hover:-translate-y-0.5"
            >
              {t(translations.hero.ctaPrimary)}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200"
            >
              {t(translations.hero.ctaSecondary)}
            </button>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up-delay-3"
          >
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
              >
                <div className="p-2.5 rounded-lg bg-primary-500/20">
                  <Icon className="w-5 h-5 text-primary-300" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col gap-5">
          {[
            { value: employeesCount, suffix: '+', label: 'Employees Placed' },
            { value: employersCount, suffix: '+', label: 'Employers Served' },
            { value: complianceCount, suffix: '%', label: 'Compliance' },
          ].map(({ value, suffix, label }) => (
            <div
              key={label}
              className="text-center p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              <p className="text-3xl font-display text-white">
                {value}
                <span className="text-secondary-400">{suffix}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80V40C360 70 720 10 1080 40C1260 55 1380 65 1440 60V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
