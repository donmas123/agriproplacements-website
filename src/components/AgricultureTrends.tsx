import { TrendingUp, Users, Cpu, Leaf, BarChart2, AlertTriangle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';

interface Trend {
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

const trends: Trend[] = [
  {
    icon: Users,
    tag: 'Labor',
    tagColor: 'bg-primary-100 text-primary-700',
    title: 'H-2A Demand Hits Record Highs',
    description:
      'The H-2A guestworker program certified 398,258 positions in FY 2025 — the first time in program history that over 400,000 workers were requested. The program has grown 185% over the last decade, driven by persistent domestic labor shortages and a U.S. unemployment rate that keeps American workers out of seasonal farm roles.',
    stat: '398K+',
    statLabel: 'H-2A positions certified in FY 2025',
  },
  {
    icon: TrendingUp,
    tag: 'Economics',
    tagColor: 'bg-secondary-100 text-secondary-700',
    title: 'Farm Income Rebounds — But on Shaky Ground',
    description:
      'Net farm income rebounded in 2025, fueled by a 203% increase in government farm program payments rather than stronger commodity markets. Experts warn that policy support is neither guaranteed nor predictable, and farms that build long-term strategies independent of government assistance will be better positioned for the future.',
    stat: '203%',
    statLabel: 'Increase in government farm program payments (2025)',
  },
  {
    icon: Cpu,
    tag: 'Technology',
    tagColor: 'bg-earth-100 text-earth-700',
    title: 'Precision Agriculture & AgTech Accelerate',
    description:
      'IoT sensors, AI-driven crop monitoring, robotics, and smart irrigation are rapidly transforming farm operations in 2026. While large-scale mechanization remains cost-prohibitive for many small and mid-size farms, precision agriculture tools are becoming more accessible — and guestworker programs remain essential to bridge the gap.',
    stat: '14%',
    statLabel: 'Projected global ag production growth over the next decade (OECD-FAO)',
  },
  {
    icon: AlertTriangle,
    tag: 'Compliance',
    tagColor: 'bg-red-100 text-red-700',
    title: 'Regulatory Shifts Reshape H-2A Costs',
    description:
      'Recent changes to the Adverse Effect Wage Rate (AEWR) methodology aim to correct years of uncontrolled wage inflation. Simultaneously, new flexibility in work contract timelines and job duties is expected to make the H-2A program more accessible to more farm operators — but staying compliant requires expert guidance.',
    stat: '<0.04%',
    statLabel: 'Of advertised H-2A positions received a domestic applicant in FY 2025',
  },
  {
    icon: Leaf,
    tag: 'Sustainability',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Sustainability Becomes a Business Imperative',
    description:
      'Growers are increasingly expected to demonstrate environmental stewardship alongside productivity. Regenerative agriculture practices, carbon sequestration programs, and water conservation are moving from optional to essential — especially for operations supplying major food retailers and processors with sustainability mandates.',
    stat: '38',
    statLabel: 'U.S. states increased H-2A worker demand in FY 2025',
  },
  {
    icon: BarChart2,
    tag: 'Workforce',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'Domestic Labor Participation Continues to Decline',
    description:
      'The U.S. labor force participation rate has been falling since the early 2000s. With official unemployment at just 4.4% in late 2025 and virtually no domestic interest in seasonal farm work, agricultural employers are more dependent than ever on structured guestworker programs to maintain reliable seasonal workforces.',
    stat: '4.4%',
    statLabel: 'U.S. unemployment rate (Sept 2025) — yet farm labor shortages persist',
  },
];

export default function AgricultureTrends() {
  const { ref: headerRef, isInView: headerVisible } = useInView({ threshold: 0.3 });
  const { ref: gridRef, isInView: gridVisible } = useInView({ threshold: 0.1 });
  const { ref: bannerRef, isInView: bannerVisible } = useInView({ threshold: 0.3 });
  const { lang } = useLang();

  const eyebrow = lang === 'es' ? 'Tendencias del Sector' : 'Industry Trends';
  const title =
    lang === 'es'
      ? 'El Panorama Agrícola en 2026'
      : 'The Agricultural Landscape in 2026';
  const subtitle =
    lang === 'es'
      ? 'Manténgase informado sobre las fuerzas que están dando forma a la agricultura estadounidense y la demanda de mano de obra estacional.'
      : 'Stay informed on the forces shaping American agriculture and the demand for seasonal labor.';
  const sourceLabel =
    lang === 'es'
      ? 'Fuentes: American Farm Bureau Federation, AgAmerica, OECD-FAO, AgriThority®'
      : 'Sources: American Farm Bureau Federation, AgAmerica, OECD-FAO, AgriThority®';
  const bannerTitle =
    lang === 'es'
      ? 'La escasez de mano de obra no espera. Nosotros tampoco.'
      : "Labor Shortages Don't Wait. Neither Do We.";
  const bannerDesc =
    lang === 'es'
      ? 'Con la demanda del programa H-2A en máximos históricos, planificar con anticipación nunca ha sido más importante. Contáctenos hoy para asegurar su fuerza laboral para la próxima temporada.'
      : 'With H-2A program demand at all-time highs, planning ahead has never been more important. Contact us today to secure your workforce for the upcoming season.';
  const bannerCta = lang === 'es' ? 'Comience a Planificar' : 'Start Planning Now';

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trends" className="py-24 lg:py-32 bg-earth-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-earth-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-earth-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Trend Cards Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {trends.map(({ icon: Icon, tag, tagColor, title: tTitle, description, stat, statLabel }, idx) => (
            <div
              key={tTitle}
              className={`group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-500 overflow-hidden ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: gridVisible ? `${idx * 80}ms` : '0ms' }}
            >
              {/* Card top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon + Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor}`}>
                    {tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display text-earth-900 mb-3 leading-snug">
                  {tTitle}
                </h3>

                {/* Description */}
                <p className="text-sm text-earth-600 leading-relaxed flex-1">{description}</p>

                {/* Stat callout */}
                <div className="mt-5 pt-5 border-t border-gray-100 flex items-end gap-3">
                  <p className="text-2xl font-display text-primary-700 leading-none">{stat}</p>
                  <p className="text-xs text-earth-500 leading-tight">{statLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Source attribution */}
        <p className="text-center text-xs text-earth-400 mb-16">{sourceLabel}</p>

        {/* CTA Banner */}
        <div
          ref={bannerRef}
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
            bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
              alt="Agricultural field at sunrise"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/80 to-primary-800/70" />
          </div>
          <div className="relative z-10 px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-display text-white mb-3 leading-tight">
                {bannerTitle}
              </h3>
              <p className="text-primary-200/80 leading-relaxed">{bannerDesc}</p>
            </div>
            <button
              onClick={scrollToContact}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 hover:bg-secondary-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-secondary-900/30 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              {bannerCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
