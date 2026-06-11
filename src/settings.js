export const DEFAULT_SETTINGS = {
  site_title: 'Mikhail Daffa Herdiansah — Portfolio',
  meta_description: 'Portfolio of Mikhail Daffa Herdiansah — Full-Stack Developer Enthusiast and IT Student at Politeknik Astra.',
  nav_brand: 'Mikhail',
  header_cta_label: 'GitHub',
  header_cta_url: 'https://github.com/mikhaildh20',
  hero_badge: 'Full-Stack Developer Enthusiast · IT Student',
  hero_title: 'Turning my IT curiosity into practical web projects.',
  hero_intro: "Hello, I'm Mikhail Daffa Herdiansah, also known as Mike. I am an Informatics Management student at Politeknik Astra, class of 2023, with a strong passion for Information Technology and full-stack web development.",
  hero_primary_label: 'View my direction',
  hero_secondary_label: 'Preview CV',
  hero_secondary_url: 'assets/curriculum_vitae.pdf',
  avatar_path: 'assets/avatar.jpg',
  profile_asset_note: 'Place my photo at public/assets/avatar.jpg to replace this reserved profile image area.',
  about_title: 'I am building strong foundations in IT.',
  about_paragraph_1: 'I am an Informatics Management student at Politeknik Astra. My current LinkedIn positioning is Full-Stack Developer Enthusiast and IT Student.',
  about_paragraph_2: 'I focus on learning how to build useful web-based systems, understand software development workflows, and improve through practical projects that can become real portfolio evidence.',
  focus_title: 'The skill direction I am developing.',
  focus_1_title: 'Frontend Development',
  focus_1_body: 'I am learning to build clean interfaces with HTML, CSS, JavaScript, and responsive layout fundamentals.',
  focus_2_title: 'Backend Development',
  focus_2_body: 'I am developing my understanding of server-side logic, routing, APIs, data handling, and application structure.',
  focus_3_title: 'Software Engineering',
  focus_3_body: 'I want to improve how I plan, organize, document, version, and maintain software projects.',
  focus_4_title: 'Information Technology',
  focus_4_body: 'I am growing my technical literacy across systems, databases, development tools, and real-world IT workflows.',
  work_title: 'I use this portfolio as a starting point for visible growth.',
  work_intro: 'This page is my personal landing page while I continue building public work, project case studies, and stronger development experience.',
  work_detail_title: 'A professional base I can keep improving.',
  work_detail_body: 'My goal is to present myself clearly, avoid overclaiming, and create a solid base that can grow as I add more repositories, project screenshots, CV updates, and professional milestones.',
  tech_title: 'Tools and topics I am growing into.',
  cv_title: 'Reserved space for my CV preview.',
  cv_intro: 'I will place my CV file at public/assets/curriculum_vitae.pdf. Once the file is uploaded, this section will be ready for preview and download access.',
  cv_path: 'assets/curriculum_vitae.pdf',
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

export async function getSettings(pool) {
  if (!pool) {
    return { ...DEFAULT_SETTINGS };
  }

  const { rows } = await pool.query(
    'select setting_key, setting_value from mst_detail_settings order by setting_key asc'
  );

  return {
    ...DEFAULT_SETTINGS,
    ...rowsToSettings(rows),
  };
}
