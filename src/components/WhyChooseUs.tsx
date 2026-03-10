import { CheckCircle, Headphones, Zap, Heart, ShieldCheck, BarChart3 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Regulatory Expertise',
    description:
      'Deep knowledge of DOL, USCIS, and state-level agricultural labor regulations ensures your operation stays compliant.',
  },
  {
    icon: Zap,
    title: 'Streamlined Process',
    description:
      'Our proven systems minimize paperwork delays and get your workforce in place on time, every season.',
  },
  {
    icon: CheckCircle,
    title: 'Vetted Workers',
    description:
      'Every worker goes through our rigorous screening process, ensuring reliability, skill, and work ethic.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Your dedicated account manager is available Monday through Friday to address any concerns or questions.',
  },
  {
    icon: Heart,
    title: 'Worker Welfare',
    description:
      'We ensure proper housing, transportation, and working conditions for every worker we place.',
  },
  {
    icon: BarChart3,
    title: 'Proven Results',
    description:
      'Our track record speaks for itself with high retention rates and satisfied farm partners year after year.',
  },
];

export default function WhyChooseUs() {
  const { t } = useLang();
  const { ref: leftRef, isInView: leftVisible } = useInView({ threshold: 0.2 });
  const { ref: rightRef, isInView: rightVisible } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div
            ref={leftRef}
            className={`lg:sticky lg:top-32 transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t(translations.whyChooseUs.eyebrow)}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-6">
              {t(translations.whyChooseUs.title)}
            </h2>
            <p className="text-lg text-earth-600 leading-relaxed mb-8">
              We go beyond simple staffing. Our comprehensive approach to agricultural
              workforce management means you can focus on growing your operation while we
              handle the complexities of H-2A compliance and worker placement.
            </p>
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
                alt="Farmland landscape"
                width={700}
                height={500}
                loading="lazy"
                className="w-full h-[320px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/20 to-transparent rounded-2xl" />
            </div>
          </div>

          <div ref={rightRef} className="grid gap-6">
            {reasons.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                className={`group flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-50 transition-all duration-500 ${
                  rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: rightVisible ? `${idx * 80}ms` : '0ms' }}
              >
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600 h-fit group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-earth-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-earth-600 leading-relaxed text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
