import { TrendingUp, Users, Map } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const regions = [
  { name: 'Southeast', states: 'AR, MS, AL, TN, GA', farms: 8, color: 'bg-primary-500' },
  { name: 'Southwest', states: 'TX, OK, NM, AZ', farms: 4, color: 'bg-secondary-500' },
  { name: 'Midwest', states: 'MO, IL, IN, OH, IA', farms: 3, color: 'bg-earth-500' },
  { name: 'West Coast', states: 'CA, OR, WA', farms: 2, color: 'bg-primary-600' },
  { name: 'Mid-Atlantic', states: 'NC, SC, VA, MD', farms: 2, color: 'bg-secondary-600' },
  { name: 'Great Plains', states: 'KS, NE, SD, ND', farms: 1, color: 'bg-earth-600' },
];

export default function ServiceMap() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const { t } = useLang();

  return (
    <section className="py-24 lg:py-32 bg-earth-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t(translations.serviceMap.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900">
            {t(translations.serviceMap.title)}
          </h2>
        </div>

        <div className={`grid lg:grid-cols-5 gap-8 mb-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="lg:col-span-3 relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[360px] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 960 600" className="w-full h-auto max-h-[400px]" aria-label="US Coverage Map">
              <defs>
                <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3d7a3e" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#b8860b" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <rect width="960" height="600" fill="url(#mapGrad)" rx="16" />

              <ellipse cx="200" cy="180" rx="100" ry="70" fill="#3d7a3e" fillOpacity="0.12" stroke="#3d7a3e" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="200" y="175" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">West Coast</text>
              <text x="200" y="195" textAnchor="middle" className="fill-earth-500 text-[10px]">CA, OR, WA</text>

              <ellipse cx="380" cy="250" rx="110" ry="65" fill="#b8860b" fillOpacity="0.1" stroke="#b8860b" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="380" y="245" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">Southwest</text>
              <text x="380" y="265" textAnchor="middle" className="fill-earth-500 text-[10px]">TX, OK, NM, AZ</text>

              <ellipse cx="490" cy="140" rx="120" ry="60" fill="#3d7a3e" fillOpacity="0.1" stroke="#3d7a3e" strokeOpacity="0.25" strokeWidth="1.5" />
              <text x="490" y="135" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">Great Plains</text>
              <text x="490" y="155" textAnchor="middle" className="fill-earth-500 text-[10px]">KS, NE, SD, ND</text>

              <ellipse cx="620" cy="170" rx="110" ry="65" fill="#3d7a3e" fillOpacity="0.14" stroke="#3d7a3e" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="620" y="165" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">Midwest</text>
              <text x="620" y="185" textAnchor="middle" className="fill-earth-500 text-[10px]">MO, IL, IN, OH, IA</text>

              <ellipse cx="570" cy="310" rx="110" ry="70" fill="#3d7a3e" fillOpacity="0.18" stroke="#3d7a3e" strokeOpacity="0.4" strokeWidth="2" />
              <text x="570" y="305" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">Southeast</text>
              <text x="570" y="325" textAnchor="middle" className="fill-earth-500 text-[10px]">AR, MS, AL, TN, GA</text>

              <ellipse cx="740" cy="250" rx="95" ry="60" fill="#b8860b" fillOpacity="0.1" stroke="#b8860b" strokeOpacity="0.3" strokeWidth="1.5" />
              <text x="740" y="245" textAnchor="middle" className="fill-earth-700 text-[13px] font-semibold">Mid-Atlantic</text>
              <text x="740" y="265" textAnchor="middle" className="fill-earth-500 text-[10px]">NC, SC, VA, MD</text>

              <circle cx="530" cy="320" r="6" fill="#b8860b" stroke="#fff" strokeWidth="2" />
              <circle cx="530" cy="320" r="12" fill="#b8860b" fillOpacity="0.2">
                <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="530" y="345" textAnchor="middle" className="fill-secondary-700 text-[10px] font-bold">
                {t(translations.serviceMap.hqLabel)}
              </text>
            </svg>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {regions.map((region) => (
              <div key={region.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div className={`w-3 h-3 rounded-full ${region.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-earth-800">{region.name}</p>
                  <p className="text-xs text-earth-500 truncate">{region.states}</p>
                </div>
                <span className="text-xs font-medium text-earth-600 bg-earth-50 px-2 py-1 rounded-full whitespace-nowrap">
                  {region.farms}+
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <Map className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-3xl font-display text-earth-900 mb-1">Growing</p>
            <p className="text-sm text-earth-600">{t(translations.serviceMap.statesServed)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-3xl font-display text-earth-900 mb-1">20+</p>
            <p className="text-sm text-earth-600">{t(translations.serviceMap.farmPartners)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-3xl font-display text-earth-900 mb-1">100+</p>
            <p className="text-sm text-earth-600">{t(translations.serviceMap.annualGrowth)}</p>
          </div>
          <div className="bg-primary-700 rounded-xl p-6 text-center text-white">
            <p className="font-display text-lg mb-1">{t(translations.serviceMap.expandingTitle)}</p>
            <p className="text-sm text-primary-100 mb-3">{t(translations.serviceMap.expandingDesc)}</p>
            <a href="#contact" className="inline-block text-sm font-semibold bg-white text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
              {t(translations.serviceMap.expandingCta)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
