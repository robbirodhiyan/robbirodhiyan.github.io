(() => {
  'use strict';

  const forms = document.querySelectorAll('[data-consultation-form]');
  if (!forms.length) return;

  const phone = '6282232900440';

  const labels = {
    id: {
      opening: 'Halo Ahmad Robbi, saya ingin berkonsultasi mengenai project.',
      name: 'Nama',
      company: 'Perusahaan/Organisasi',
      service: 'Layanan',
      need: 'Kebutuhan',
      budget: 'Estimasi budget',
      timeline: 'Target waktu',
      contact: 'Kontak'
    },
    en: {
      opening: 'Hi Ahmad Robbi, I would like to discuss a project.',
      name: 'Name',
      company: 'Company/Organization',
      service: 'Service',
      need: 'Requirement',
      budget: 'Estimated budget',
      timeline: 'Target timeline',
      contact: 'Contact'
    }
  };

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const lang = form.dataset.lang === 'en' ? 'en' : 'id';
      const t = labels[lang];
      const lines = [
        t.opening,
        '',
        `${t.name}: ${data.get('name') || '-'}`,
        `${t.company}: ${data.get('company') || '-'}`,
        `${t.service}: ${data.get('service') || '-'}`,
        `${t.need}: ${data.get('need') || '-'}`,
        `${t.budget}: ${data.get('budget') || '-'}`,
        `${t.timeline}: ${data.get('timeline') || '-'}`,
        `${t.contact}: ${data.get('contact') || '-'}`
      ];

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
})();
