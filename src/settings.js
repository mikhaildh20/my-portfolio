export const DEFAULT_SETTINGS = {
  site_title: 'Mikhail Daffa Herdiansah — Portfolio',
  meta_description: 'Portfolio of Mikhail Daffa Herdiansah — Full-Stack Developer Enthusiast and IT Student at Politeknik Astra.',
  nav_brand: 'Mikhail',
  header_cta_label: 'GitHub',
  header_cta_url: 'https://github.com/mikhaildh20',
  hero_badge: 'Full-Stack Developer Enthusiast · IT Student',
  hero_title: 'Turning my IT curiosity into practical web projects.',
  hero_intro: "Hello, I'm Mikhail Daffa Herdiansah, also known as Mike. I am an Informatics Management student at Politeknik Astra, class of 2023, with a strong passion for Information Technology and full-stack web development.",
  hero_primary_label: 'View Experience',
  hero_secondary_label: 'Contact Me',
  hero_secondary_url: '#contact',
  avatar_path: 'assets/paspoto_mikhail.png',
  profile_asset_note: 'Informatics Management student with hands-on experience across software development, IT support, and event technology operations.',
  about_title: 'I am building strong foundations in IT.',
  about_paragraph_1: 'I am an Informatics Management student at Politeknik Astra. My current LinkedIn positioning is Full-Stack Developer Enthusiast and IT Student.',
  about_paragraph_2: 'I focus on learning how to build useful web-based systems, understand software development workflows, and improve through practical projects that can become real portfolio evidence.',
  focus_title: 'The skill direction I am developing.',
  focus_1_title: 'Frontend Development',
  focus_1_body: 'I am learning to build clean interfaces with HTML, CSS, JavaScript, and responsive layout fundamentals.',
  focus_2_title: 'Backend Development',
  focus_2_body: 'I am developing my understanding of server side logic, routing, APIs, data handling, and application structure.',
  focus_3_title: 'Software Engineering',
  focus_3_body: 'I want to improve how I plan, organize, document, version, and maintain software projects.',
  focus_4_title: 'Information Technology',
  focus_4_body: 'I am growing my technical literacy across systems, databases, development tools, and real-world IT workflows.',
  work_title: 'I use this portfolio as a starting point for visible growth.',
  work_intro: 'This portfolio highlights my background, practical experience, education, and certifications as I continue growing toward a professional IT career.',
  work_detail_title: 'A professional base I can keep improving.',
  work_detail_body: 'I use this page to introduce who I am, what I have worked on, and the direction I am building through real learning, internships, part-time roles, and continuous improvement.',
  tech_title: 'Tools and topics I am growing into.',
  experience_title: 'Experience',
  experience_intro: 'Work, internship, and part-time experiences that shaped my practical understanding of software, IT support, and event technology operations.',
  education_title: 'Education',
  education_intro: 'Formal education history, academic activities, and practical learning background.',
  certification_title: 'Licenses & Certifications',
  certification_intro: 'Selected certifications and course credentials that support my IT learning journey.',
  contact_title: "Let's connect and build from here.",
  contact_body: 'I am open to learning opportunities, portfolio feedback, IT discussions, and collaboration around web development and software engineering.',
  email: 'mikhaildaffa7@gmail.com',
  github_url: 'https://github.com/mikhaildh20',
  linkedin_url: 'https://www.linkedin.com/in/mikhaildhns',
  footer_tagline: 'Full-Stack Developer Enthusiast · IT Student',
};

export function rowsToSettings(rows) {
  return Object.fromEntries(
    (rows || [])
      .filter((row) => row && typeof row.setting_key === 'string' && row.setting_key.trim() !== '')
      .map((row) => [row.setting_key, row.setting_value ?? ''])
  );
}

export function buildCollection(settings, prefix, fields, requiredField = fields[0]) {
  const recordsByIndex = new Map();
  const pattern = new RegExp(`^${prefix}_(\\d+)_(${fields.join('|')})$`);

  Object.entries(settings || {}).forEach(([key, value]) => {
    const match = key.match(pattern);
    if (!match) return;
    const index = Number(match[1]);
    const field = match[2];
    const current = recordsByIndex.get(index) || {};
    current[field] = value ?? '';
    recordsByIndex.set(index, current);
  });

  return [...recordsByIndex.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, record]) => record)
    .filter((record) => String(record[requiredField] || '').trim() !== '');
}

export function buildStructuredSettings(settings) {
  return {
    focusAreas: buildCollection(settings, 'focus', ['title', 'body'], 'title'),
    techItems: buildCollection(settings, 'tech', ['label'], 'label'),
    experiences: buildCollection(settings, 'experience', ['role', 'company', 'status', 'period', 'location', 'description'], 'role'),
    education: buildCollection(settings, 'education', ['school', 'year', 'description', 'image_path', 'image_alt'], 'school'),
    certifications: buildCollection(settings, 'certification', ['name', 'issuer', 'image_path', 'image_alt', 'pdf_path'], 'name'),
    projects: buildCollection(settings, 'project', ['name', 'period', 'description', 'image_path', 'image_alt', 'url'], 'name'),
  };
}

export async function getSettings(pool) {
  if (!pool) {
    const settings = { ...DEFAULT_SETTINGS };
    return { ...settings, collections: buildStructuredSettings(settings) };
  }

  const { rows } = await pool.query(
    'select setting_key, setting_value from mst_detail_settings order by setting_key asc'
  );

  const settings = {
    ...DEFAULT_SETTINGS,
    ...rowsToSettings(rows),
  };

  return {
    ...settings,
    collections: buildStructuredSettings(settings),
  };
}
