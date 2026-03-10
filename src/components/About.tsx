import { Award, Users, TrendingUp, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const stats = [
  { icon: TrendingUp, value: 100, suffix: '+', label: 'Employees Placed', animated: true },
  { icon: Users, value: 20, suffix: '+', label: 'Employers Served', animated: true },
  { icon: Award, value: 100, suffix: '%', label: 'Compliance Rate', animated: true },
  { icon: Calendar, value: 2023, suffix: '', label: 'Year Founded', animated: false },
];

export default function About() {
  const { t } = useLang();
  const { ref: textRef, isInView: textVisible } = useInView({ threshold: 0.2 });
  const { ref: imageRef, isInView: imageVisible } = useInView({ threshold: 0.2 });
  const { ref: statsRef, isInView: statsVisible } = useInView({ threshold: 0.3 });

  const counts = [
    useCountUp(100, 2000, statsVisible),
    useCountUp(20, 1500, statsVisible),
    useCountUp(100, 1800, statsVisible),
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t(translations.about.eyebrow)}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-6">
              {t(translations.about.title)}
            </h2>
            <div className="space-y-4 text-earth-700 leading-relaxed">
              <p>{t(translations.about.p1)}</p>
              <p>{t(translations.about.p2)}</p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-10">
              {stats.map(({ icon: Icon, suffix, label, animated, value }, idx) => (
                <div
                  key={label}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: statsVisible ? `${idx * 100}ms` : '0ms' }}
                >
                  <div className="p-2 rounded-lg bg-primary-100">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-display text-earth-900">
                      {animated ? counts[idx] : value}{suffix}
                    </p>
                    <p className="text-sm text-earth-600">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className={`relative transition-all duration-700 delay-200 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Agricultural workers in the field"
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-xl shadow-lg max-w-[260px] border border-gray-50">
              <p className="text-3xl font-display text-primary-700 mb-1">Searcy, AR</p>
              <p className="text-sm text-earth-600">
                {t(translations.about.location)}
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 right-12 w-32 h-32 bg-primary-400/15 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
