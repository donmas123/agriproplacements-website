import { ClipboardList, FileSearch, Plane, UserCheck } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Initial Consultation',
    description:
      'We begin by understanding your farm operation, labor needs, seasonal timing, and specific crop requirements to build a tailored workforce plan.',
  },
  {
    icon: FileSearch,
    step: '02',
    title: 'Application & Filing',
    description:
      'Our team prepares and files all necessary documentation with the Department of Labor and USCIS, managing every detail of the H-2A petition process.',
  },
  {
    icon: Plane,
    step: '03',
    title: 'Worker Recruitment & Travel',
    description:
      'We recruit qualified workers, coordinate consular appointments, and arrange all travel logistics to get your workforce to your farm on schedule.',
  },
  {
    icon: UserCheck,
    step: '04',
    title: 'Placement & Ongoing Support',
    description:
      'Workers arrive ready to work, and our team provides ongoing compliance support, communication assistance, and issue resolution throughout the season.',
  },
];

export default function Process() {
  const { t } = useLang();
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.3 });
  const { ref: gridRef, isInView: gridVisible } = useInView({ threshold: 0.15 });

  return (
    <section id="process" className="py-24 lg:py-32 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-secondary-400 font-semibold text-sm tracking-wider uppercase mb-3">
            {t(translations.process.eyebrow)}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mb-6">
            {t(translations.process.title)}
          </h2>
          <p className="text-lg text-primary-200/80 leading-relaxed">
            From initial consultation to worker placement, our streamlined process
            ensures your seasonal workforce is in place when you need it.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon: Icon, step, title, description }, idx) => (
            <div
              key={title}
              className={`relative group transition-all duration-500 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: gridVisible ? `${idx * 120}ms` : '0ms' }}
            >
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary-500/40 to-transparent -translate-x-4" />
              )}
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 h-full hover:border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary-500/20 group-hover:bg-secondary-500/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary-300 group-hover:text-secondary-400 transition-colors duration-300" />
                  </div>
                  <span className="text-5xl font-display text-white/10 group-hover:text-white/20 transition-colors">
                    {step}
                  </span>
                </div>
                <h3 className="text-xl font-display text-white mb-3">{title}</h3>
                <p className="text-primary-200/70 leading-relaxed text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
