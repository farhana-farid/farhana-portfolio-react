export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const STATS = [
  { index: '01', value: '15+', label: 'Completed Projects' },
  { index: '02', value: '1200+', label: 'Hours of Coding' },
  { index: '03', value: '100%', label: 'Dedication' },
]

export const MARQUEE = [
  'Python',
  'Flask',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'AI APIs',
  'Prompt Engineering',
  'REST APIs',
  'SQLite',
  'PostgreSQL',
  'Jinja2',
  'Git & GitHub',
  'Responsive Design',
]

export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    code: 'fe/',
    blurb: 'Clean, accessible interfaces that feel effortless.',
    band: 'bg-navy',
    skills: [
      { name: 'HTML5 / CSS3', level: 95, tone: 'navy' },
      { name: 'Tailwind CSS', level: 95, tone: 'navy' },
      { name: 'JavaScript (ES6+)', level: 88, tone: 'navy' },
      { name: 'Responsive & accessible UI', level: 92, tone: 'navy' },
      { name: 'Micro-interactions', level: 84, tone: 'navy' },
    ],
  },
  {
    title: 'Backend',
    code: 'be/',
    blurb: 'Reliable Python/Flask services and APIs.',
    band: 'bg-sky',
    skills: [
      { name: 'Python', level: 92, tone: 'sky' },
      { name: 'Flask', level: 90, tone: 'sky' },
      { name: 'REST API design', level: 86, tone: 'sky' },
      { name: 'SQLite / PostgreSQL', level: 82, tone: 'sky' },
      { name: 'Jinja2 templating', level: 88, tone: 'sky' },
    ],
  },
  {
    title: 'AI & Tools',
    code: 'ai/',
    blurb: 'Intelligent features shipped to production.',
    band: 'bg-jam',
    skills: [
      { name: 'AI APIs & prompting', level: 85, tone: 'jam' },
      { name: 'Git & GitHub', level: 88, tone: 'jam' },
      { name: 'SEO & performance', level: 84, tone: 'jam' },
      { name: 'Data validation', level: 82, tone: 'jam' },
      { name: 'Prompt engineering', level: 86, tone: 'jam' },
    ],
  },
]

export const HOW_I_SHIP = [
  'Understand the problem',
  'Wireframe & design tokens',
  'Typed, readable code',
  'REST / AI integration',
  'Accessible UI',
  'Test & iterate',
  'Ship & measure',
]

export const PROJECTS = [
  {
    title: 'InsightAI - Intelligent Document Assistant',
    description:
      'A smart document summarizer and conversational Q&A system powered by Python Flask and AI API integration.',
    tags: ['Python', 'Flask', 'AI API', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    featured: true,
    image: 'project1.svg',
  },
  {
    title: 'DevPulse - Developer Productivity Hub',
    description:
      'An all-in-one developer workspace for tracking project milestones, API snippets, and daily coding focus metrics.',
    tags: ['Flask', 'Vanilla JS', 'SQLite', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    image: 'project2.svg',
  },
  {
    title: 'ArtisanUI - Clean Modern UI Components',
    description:
      'A curated collection of accessible, pixel-perfect Tailwind CSS components with micro-interactions.',
    tags: ['HTML5', 'Tailwind CSS', 'Vanilla JS', 'SVG'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    image: 'project3.svg',
  },
  {
    title: 'SmartExpense - AI Financial Categorizer',
    description:
      'Automated expense tracker that predicts budget anomalies and auto-tags receipts using natural language processing.',
    tags: ['Python', 'Flask', 'AI Prompting', 'Tailwind CSS'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    image: 'project4.svg',
  },
  {
    title: 'NexusChat - Multi-Agent AI Interface',
    description:
      'A clean conversational platform allowing users to toggle between coding assistants, creative writers, and research bots.',
    tags: ['Python', 'Flask', 'Vanilla JS', 'REST API'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    image: 'project5.svg',
  },
  {
    title: 'PortfolioCraft - High-Speed Portfolio Template',
    description:
      'An ultra-fast, 100/100 Lighthouse score personal website architecture featuring zero heavy framework overhead.',
    tags: ['HTML5', 'Tailwind CSS', 'Vanilla JS', 'SEO'],
    demoUrl: '#',
    repoUrl: 'https://github.com/farhana-farid',
    image: 'project6.svg',
  },
]

export const CREDENTIALS = [
  {
    id: 'polisci',
    kind: 'degree',
    title: 'Political Science (Honours) — 1st Year',
    org: 'Undergraduate Studies',
    period: '2025 - Present',
    description:
      'Currently in the first year of an honours program in Political Science, building a grounding in governance, policy, and social systems alongside hands-on technical projects.',
    highlights: [
      'Political Science (Honours)',
      'First-year undergraduate student',
      'Self-taught in web & AI development',
    ],
    tone: 'sky',
  },
  {
    id: 'selfstudy',
    kind: 'certification',
    title: 'AI & Web Development — Self-Directed',
    org: 'Independent Projects',
    period: '2022 - Present',
    description:
      'Hands-on learning through building AI-integrated Flask applications, Tailwind-based interfaces, and modern JavaScript frontends.',
    highlights: [
      'Python & Flask APIs',
      'AI integrations & prompt engineering',
      'Responsive UI engineering',
    ],
    tone: 'jam',
    credentialUrl: 'https://github.com/farhana-farid',
  },
]

export const CREDENTIAL_STATS = [
  { value: '1', label: 'Degree in progress' },
  { value: '2', label: 'Focus areas' },
  { value: '1200+', label: 'Hours of practice' },
]

export const VALUES = [
  {
    number: '01',
    title: 'Clean code, first',
    body:
      'Readable, typed and tested by default. I optimise for the developer who reads the code next — architecture before cleverness.',
    accent: 'bg-navy',
    text: 'text-on-navy',
  },
  {
    number: '02',
    title: 'Problem-solving mindset',
    body:
      'I turn fuzzy requirements into small, shippable slices, then measure what actually shipped instead of guessing.',
    accent: 'bg-sky',
    text: 'text-ink-solid',
  },
  {
    number: '03',
    title: 'Growth on purpose',
    body:
      'Growing toward AI-integrated full-stack products used at real scale, with real constraints.',
    accent: 'bg-jam',
    text: 'text-ink-solid',
  },
]

export const CODE_SNIPPET = [
  { indent: 0, tokens: [{ text: 'const', cls: 'text-jam' }, { text: ' farhana', cls: 'text-paper' }, { text: ' = {', cls: 'text-paper/70' }] },
  { indent: 1, tokens: [{ text: 'role', cls: 'text-sky' }, { text: ': ', cls: 'text-paper/70' }, { text: "'AI Enthusiast & Web Developer'", cls: 'text-leaf' }, { text: ',', cls: 'text-paper/70' }] },
  { indent: 1, tokens: [{ text: 'stack', cls: 'text-sky' }, { text: ': [', cls: 'text-paper/70' }, { text: "'Python'", cls: 'text-leaf' }, { text: ', ', cls: 'text-paper/70' }, { text: "'Flask'", cls: 'text-leaf' }, { text: ', ', cls: 'text-paper/70' }, { text: "'JavaScript'", cls: 'text-leaf' }, { text: '],', cls: 'text-paper/70' }] },
  { indent: 1, tokens: [{ text: 'values', cls: 'text-sky' }, { text: ': [', cls: 'text-paper/70' }, { text: "'clarity'", cls: 'text-leaf' }, { text: ', ', cls: 'text-paper/70' }, { text: "'performance'", cls: 'text-leaf' }, { text: ', ', cls: 'text-paper/70' }, { text: "'accessibility'", cls: 'text-leaf' }, { text: '],', cls: 'text-paper/70' }] },
  { indent: 1, tokens: [{ text: 'currently', cls: 'text-sky' }, { text: ': ', cls: 'text-paper/70' }, { text: "'building AI-powered web apps'", cls: 'text-leaf' }, { text: ',', cls: 'text-paper/70' }] },
  { indent: 0, tokens: [{ text: '}', cls: 'text-paper/70' }] },
]

export const TAG_CHIPS = [
  'AI Integration',
  'Full-stack web',
  'UI/UX design',
  'API architecture',
  'Prompt engineering',
  'Responsive design',
]

export const CONTACT_CARDS = [
  { label: 'Email', value: 'farhanafarid41@gmail.com', href: 'mailto:farhanafarid41@gmail.com' },
  { label: 'Location', value: 'Open to remote & on-site opportunities' },
  { label: 'Response time', value: 'Usually within 24 hours' },
]

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/farhana-farid' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', href: 'https://twitter.com' },
]

export const CONTACT_AVAILABILITY = 'Open to collaborations, freelance projects, and full-time opportunities.'
