import { useState } from 'react';
import { FileCheck, Users, Shield, Globe, Landmark, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import ServiceModal from './ServiceModal';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const services = [
  {
    icon: FileCheck,
    title: 'H-2A Visa Program Management',
    description:
      'End-to-end management of the H-2A temporary agricultural worker visa program. We handle all paperwork, applications, and coordination with the Department of Labor and USCIS on your behalf.',
    features: [
      'Temporary Labor Certification applications',
      'USCIS petition filing & tracking',
      'Consular appointment coordination',
      'Worker arrival logistics',
    ],
    details:
      'Our H-2A program management covers the entire lifecycle from initial job order creation through worker departure. We prepare all ETA-9142A forms, coordinate with the State Workforce Agency for job postings, file I-129 petitions with USCIS, and manage the consular visa appointment process. We track every deadline and milestone so nothing falls through the cracks.',
    faqs: [
      { q: 'How far in advance should I apply?', a: 'We recommend starting the process at least 75-90 days before your anticipated need date to account for DOL processing times and consular scheduling.' },
      { q: 'Can I use H-2A for year-round positions?', a: 'H-2A is specifically for temporary or seasonal agricultural work. The position must be seasonal in nature, with a defined start and end date.' },
    ],
  },
  {
    icon: Users,
    title: 'Agricultural Staffing Solutions',
    description:
      'We recruit and place reliable, experienced agricultural workers who are ready to contribute from day one. Our rigorous vetting process ensures you receive skilled labor for your specific crop and operation needs.',
    features: [
      'Pre-screened agricultural workers',
      'Crop-specific skill matching',
      'Seasonal & year-round placements',
      'Workforce scaling flexibility',
    ],
    details:
      'Our recruiting network spans established agricultural regions with experienced workers who have demonstrated skills in a wide range of crops and farm operations. We match workers to your specific needs -- whether you need experienced row crop hands, orchard workers, greenhouse specialists, or general farm laborers.',
    faqs: [
      { q: 'How do you vet workers?', a: 'Every worker goes through interviews, skill assessments, reference checks, and background screening before being presented to your operation.' },
      { q: 'What if a worker doesn\'t meet expectations?', a: 'We stand behind our placements. If a worker is not a good fit, we work quickly to provide a replacement without disrupting your operations.' },
    ],
  },
  {
    icon: Shield,
    title: 'Compliance Management',
    description:
      'Stay fully compliant with all federal and state regulations. Our dedicated compliance team keeps you informed and protected against audits, ensuring your operations meet every legal requirement.',
    features: [
      'DOL audit preparation & support',
      'Wage & hour compliance',
      'Housing standards verification',
      'Record-keeping & documentation',
    ],
    details:
      'Agricultural labor compliance is complex and constantly evolving. Our compliance team monitors changes in AEWR rates, housing standards, transportation requirements, and recordkeeping obligations. We conduct pre-season compliance reviews and provide ongoing support throughout the work period.',
    faqs: [
      { q: 'What happens during a DOL audit?', a: 'Our team will be present to assist with all audit documentation, worker interviews, and corrective action plans if needed. We prepare you proactively to minimize audit risk.' },
      { q: 'Do you handle housing inspections?', a: 'Yes, we coordinate with local and state agencies to ensure worker housing meets all applicable federal and state standards before worker arrival.' },
    ],
  },
  {
    icon: Globe,
    title: 'Bilingual Support',
    description:
      'Full-service support in both English and Spanish, ensuring clear communication between employers and workers throughout the entire placement process and beyond.',
    features: [
      'English & Spanish communication',
      'Cultural orientation for workers',
      'On-site translation assistance',
      'Bilingual documentation',
    ],
    details:
      'Clear communication between employers and workers is essential for safety, productivity, and morale. Our bilingual team provides translation for all documents, assists with worker orientations, and is available to help resolve communication challenges throughout the season.',
    faqs: [
      { q: 'Is bilingual support available full-time?', a: 'Our bilingual staff is available during all business hours and for urgent situations outside normal hours during active work seasons.' },
    ],
  },
  {
    icon: Landmark,
    title: 'Government Relations',
    description:
      'Leverage our established relationships with government agencies to streamline your H-2A process. We stay ahead of policy changes to keep your operations running smoothly.',
    features: [
      'Agency liaison services',
      'Expedited processing support',
      'Policy monitoring & alerts',
      'Regulatory change management',
    ],
    details:
      'Our team maintains ongoing relationships with DOL regional offices, USCIS service centers, and consular officials. This allows us to efficiently navigate the bureaucratic process and quickly address any issues that arise during application processing.',
    faqs: [
      { q: 'Can you expedite H-2A processing?', a: 'While processing timelines are set by government agencies, our established relationships and thorough application preparation minimize delays and help resolve issues quickly.' },
    ],
  },
];

export default function Services() {
  const { t } = useLang();
  const [activeService, setActiveService] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.3 });
  const { ref: gridRef, isInView: gridVisible } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t(translations.services.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-6">
            {t(translations.services.title)}
          </h2>
          <p className="text-lg text-earth-600 leading-relaxed">
            From H-2A visa processing to full compliance management, we provide everything
            your agricultural operation needs to maintain a reliable seasonal workforce.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.slice(0, 3).map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-500 cursor-pointer ${
                  gridVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: gridVisible ? `${idx * 100}ms` : '0ms' }}
                onClick={() => setActiveService(idx)}
              >
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600 w-fit mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display text-earth-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-earth-600 leading-relaxed mb-5 text-sm">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-earth-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {services.slice(3).map((service, idx) => {
            const Icon = service.icon;
            const globalIdx = idx + 3;
            return (
              <div
                key={service.title}
                className={`group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-500 cursor-pointer ${
                  gridVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: gridVisible ? `${globalIdx * 100}ms` : '0ms' }}
                onClick={() => setActiveService(globalIdx)}
              >
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600 w-fit mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display text-earth-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-earth-600 leading-relaxed mb-5 text-sm">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-earth-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {activeService !== null && (() => {
        const s = services[activeService];
        const Icon = s.icon;
        return (
          <ServiceModal
            open={true}
            onClose={() => setActiveService(null)}
            icon={<Icon className="w-6 h-6" />}
            title={s.title}
            description={s.description}
            features={s.features}
            details={s.details}
            faqs={s.faqs}
          />
        );
      })()}
    </section>
  );
}
