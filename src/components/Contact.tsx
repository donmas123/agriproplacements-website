import { useState, type FormEvent } from 'react';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n/LanguageContext';
import translations from '../i18n/translations';

const serviceOptions = [
  'H-2A Visa Program Management',
  'Agricultural Staffing Solutions',
  'Compliance Management',
  'Bilingual Support',
  'Government Relations',
  'General Inquiry',
];

const MAX_MESSAGE = 2000;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '(870) 301-9200', href: 'tel:+18703019200' },
  { icon: Mail, label: 'Email', value: 'info@agriproplacements.com', href: 'mailto:info@agriproplacements.com' },
  { icon: MapPin, label: 'Location', value: 'Searcy, Arkansas', href: undefined },
  { icon: Clock, label: 'Hours', value: 'Mon - Fri, 8:00 AM - 5:00 PM', href: undefined },
];

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { ref: leftRef, isInView: leftVisible } = useInView({ threshold: 0.2 });
  const { ref: formRef, isInView: formVisible } = useInView({ threshold: 0.1 });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.length > MAX_MESSAGE) e.message = `Message too long (${form.message.length}/${MAX_MESSAGE})`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert([{
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      company: form.company.trim(),
      service_interest: form.service_interest,
      message: form.message.trim(),
    }]);

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', company: '', service_interest: '', message: '' });
      setErrors({});
    }
    setTimeout(() => setStatus('idle'), 6000);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'} focus:ring-2 outline-none transition-all text-earth-900 placeholder:text-earth-400`;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div
            ref={leftRef}
            className={`lg:col-span-2 transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t(translations.contact.eyebrow)}
            </p>
            <h2 className="text-3xl sm:text-4xl font-display text-earth-900 mb-6">
              {t(translations.contact.title)}
            </h2>
            <p className="text-earth-600 leading-relaxed mb-10">
              Contact us today to discuss your agricultural staffing needs. Our team
              is ready to help you build a reliable seasonal workforce.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary-100">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-earth-500 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-earth-900 font-medium hover:text-primary-700 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-earth-900 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-xl bg-primary-600 text-white">
              <p className="font-display text-lg mb-2">Se Habla Español</p>
              <p className="text-primary-100 text-sm leading-relaxed">
                Ofrecemos servicios completos en español. Llámenos para hablar con un
                representante bilingüe.
              </p>
            </div>
          </div>

          <div
            ref={formRef}
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10"
            >
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-earth-700 mb-2">{t(translations.contact.nameLabel)} *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => update('full_name', e.target.value)}
                    className={inputClass('full_name')}
                    placeholder={t(translations.contact.namePlaceholder)}
                  />
                  {errors.full_name && <p className="text-red-500 text-xs mt-1.5">{errors.full_name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-earth-700 mb-2">{t(translations.contact.emailLabel)} *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass('email')}
                    placeholder={t(translations.contact.emailPlaceholder)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-earth-700 mb-2">{t(translations.contact.phoneLabel)}</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', formatPhone(e.target.value))}
                    className={inputClass('phone')}
                    placeholder={t(translations.contact.phonePlaceholder)}
                    maxLength={14}
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-earth-700 mb-2">{t(translations.contact.farmLabel)}</label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    className={inputClass('company')}
                    placeholder={t(translations.contact.farmPlaceholder)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="contact-service" className="block text-sm font-medium text-earth-700 mb-2">{t(translations.contact.serviceLabel)}</label>
                <select
                  id="contact-service"
                  value={form.service_interest}
                  onChange={(e) => update('service_interest', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-earth-900 bg-white"
                >
                  <option value="">{t(translations.contact.serviceDefault)}</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-earth-700">{t(translations.contact.messageLabel)} *</label>
                  <span className={`text-xs ${form.message.length > MAX_MESSAGE ? 'text-red-500' : 'text-earth-400'}`}>
                    {form.message.length}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className={`${inputClass('message')} resize-none`}
                  placeholder={t(translations.contact.messagePlaceholder)}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t(translations.contact.sending)}
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t(translations.contact.submit)}
                  </>
                )}
              </button>

              {status === 'success' && (
                <div role="alert" aria-live="polite" className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-green-50 text-green-700 border border-green-100">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Thank you! We've received your message and will respond within 1 business day.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div role="alert" aria-live="assertive" className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Something went wrong. Please call us at (870) 301-9200 or try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
