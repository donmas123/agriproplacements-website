import { Shield, FileCheck, Scale, Award, Languages, Building2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const badges = [
  { icon: FileCheck, label: 'DOL Certified', sub: 'Department of Labor' },
  { icon: Shield, label: 'USCIS Compliant', sub: 'Immigration Services' },
  { icon: Scale, label: 'FLSA Adherent', sub: 'Fair Labor Standards' },
  { icon: Award, label: 'NCAE Member', sub: 'Agricultural Employers' },
  { icon: Languages, label: 'Bilingual', sub: 'English & Spanish' },
  { icon: Building2, label: 'AR Chamber', sub: 'Chamber of Commerce' },
];

export default function TrustBar() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLang();

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-earth-500 uppercase tracking-wider mb-10">
          {t(translations.trustBar.title)}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-earth-50 transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isInView ? `${i * 80}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm font-semibold text-earth-800 text-center">{badge.label}</p>
              <p className="text-xs text-earth-500 text-center">{badge.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
