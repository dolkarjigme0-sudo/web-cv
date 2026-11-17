const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('is-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    navigation?.classList.remove('is-open');
  });
});

const projectDetails = {
  'gmc-agent': {
    mark: 'GMC',
    kicker: 'AGENTIC AI / VOICE TECHNOLOGY',
    title: 'GMC Experience Centre: AI-Powered Visitor Guide',
    period: '2026 · GCIT, Thimphu, Bhutan',
    role: 'AI Agent Developer · Show Me Your Agent Hackathon 2026',
    bullets: [
      'Built a conversational guide that helps visitors explore GMC and its experience-centre chambers through text and voice.',
      'Implemented a ReAct agent workflow with LangGraph and LangChain tools to retrieve GMC and chamber information, answer questions and support follow-up conversations.',
      'Integrated speech transcription and generated voice responses, with session-based conversation memory and safeguards for tool usage.'
    ],
    skills: ['Agentic AI', 'ReAct', 'Voice AI', 'API integration', 'Teamwork'],
    tools: ['Node.js', 'JavaScript', 'OpenAI API', 'LangChain', 'LangGraph', 'WebSockets'],
    image: './assets/projects/gmc.png',
    imageAlt: 'Isometric visitor-guide view of the GMC Experience Centre',
    visualType: 'project-art'
  },
  rag: {
    mark: 'ACC / RAG',
    kicker: '02 / APPLIED AI / INFORMATION RETRIEVAL',
    title: 'RAG-Based AI Chatbot for ACC',
    period: 'Completed',
    role: 'Backend developer · Anti-Corruption Commission',
    bullets: ['Built an on-premise retrieval-augmented assistant for authorized investigators.', 'Added OCR support for scanned records alongside text-based documents.', 'Returned source-cited answers to help users verify retrieved information.', 'Designed for local deployment; portfolio imagery contains no real or confidential records.'],
    skills: ['RAG', 'Information retrieval', 'Document processing', 'Backend development'],
    tools: ['Python', 'OCR', 'RAG pipelines', 'REST APIs'],
    image: './assets/projects/acc-logo.png',
    imageAlt: 'Anti-Corruption Commission project logo',
    visualType: 'logo'
  },
  persona: {
    mark: 'PW',
    kicker: '03 / DEEP LEARNING / MULTIMODAL',
    title: 'PersonaWaves',
    period: 'Feb–Jun 2026',
    role: 'Deep learning engineer · GCIT',
    bullets: ['Explored confidence, clarity, energy and engagement across facial, voice and speech signals.', 'Combined computer vision, audio and language features.', 'Prototyped multimodal fusion using an MLP.'],
    skills: ['Deep learning', 'Multimodal analysis', 'Computer vision', 'Speech and language processing'],
    tools: ['PyTorch', 'Computer vision', 'Speech features', 'NLP', 'MLP fusion'],
    image: './assets/projects/persona-waves.png',
    imageAlt: 'PersonaWaves project logo',
    visualType: 'logo'
  },
  energy: {
    mark: 'ENERGY',
    kicker: '04 / MACHINE LEARNING / DATA VISUALIZATION',
    title: 'Energy consumption prediction',
    period: 'Feb–Jun 2025',
    role: 'Machine learning engineer · GCIT',
    bullets: ['Compared eight regression models for energy consumption forecasting.', 'Built sector-level views and interactive charts to explore energy-use patterns.', 'Presented tailored recommendations alongside model results.'],
    skills: ['Machine learning', 'Regression', 'Data analysis', 'Data visualization'],
    tools: ['Scikit-learn', 'Pandas', 'Matplotlib'],
    image: './assets/projects/energy-consumption.png',
    imageAlt: 'Energy consumption prediction project logo',
    visualType: 'logo'
  },
  movie: {
    mark: 'MY MOVIELOG',
    kicker: '05 / FULL-STACK / WEB DEVELOPMENT',
    title: 'MyMovieLog',
    period: 'Aug–Dec 2025',
    role: 'Full-stack developer · GCIT',
    bullets: ['Built a movie collection manager for tracking favorites, reviews and ratings.', 'Created a React interface backed by a Node.js and MongoDB application.', 'Organized the application around an MVC structure and user accounts.'],
    skills: ['Full-stack development', 'UI development', 'MVC architecture'],
    tools: ['React', 'Node.js', 'MongoDB'],
    image: './assets/projects/mymovielog.png',
    imageAlt: 'MyMovieLog project logo',
    visualType: 'logo'
  }
};
const projectList = document.querySelector('#project-list');
const projectCards = [...(projectList?.querySelectorAll('.project-list-item') || [])];

function getProjectImages(project) {
  if (project.images?.length) return project.images;
  return project.image ? [{ src: project.image, alt: project.imageAlt || project.title }] : [];
}

function makeTagGroup(label, values) {
  const group = document.createElement('div');
  group.className = 'project-detail-group';
  const heading = document.createElement('p');
  heading.className = 'project-kind';
  heading.textContent = label;
  const tags = document.createElement('div');
  tags.className = 'project-detail-tags';
  values.forEach((value) => {
    const tag = document.createElement('span');
    tag.textContent = value;
    tags.append(tag);
  });
  group.append(heading, tags);
  return group;
}

function makeProjectPanel(project, id) {
  const panel = document.createElement('section');
  const lightBackground = ['PW', 'ENERGY', 'MY MOVIELOG'].includes(project.mark);
  panel.className = `project-accordion-panel${lightBackground ? ' is-light' : ''}`;
  panel.id = id;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', `${project.title} details`);
  panel.hidden = true;

  const media = document.createElement('div');
  media.className = `project-accordion-media${project.mark === 'ACC / RAG' ? ' is-acc' : ''}`;
  const images = getProjectImages(project);
  if (images.length) {
    const gallery = document.createElement('div');
    gallery.className = `project-accordion-gallery${images.length > 1 ? ' has-multiple' : ''}`;
    images.forEach((item) => {
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'lazy';
      gallery.append(image);
    });
    media.append(gallery);
  } else {
    const wordmark = document.createElement('span');
    wordmark.className = 'project-accordion-wordmark';
    wordmark.textContent = project.mark || project.title;
    media.append(wordmark);
  }

  const copy = document.createElement('div');
  copy.className = 'project-accordion-copy';
  const kicker = document.createElement('p');
  kicker.className = 'project-kind';
  kicker.textContent = project.kicker;
  const title = document.createElement('h3');
  title.textContent = project.title;
  const period = document.createElement('p');
  period.className = 'project-accordion-period';
  period.textContent = project.period;
  const role = document.createElement('p');
  role.className = 'project-accordion-role';
  role.textContent = project.role;
  const bullets = document.createElement('ul');
  bullets.className = 'project-accordion-bullets';
  project.bullets.forEach((text) => {
    const bullet = document.createElement('li');
    bullet.textContent = text;
    bullets.append(bullet);
  });
  copy.append(kicker, title, period, role, bullets);
  if (project.skills?.length) copy.append(makeTagGroup('SKILLS USED', project.skills));
  if (project.tools?.length) copy.append(makeTagGroup('TOOLS', project.tools));
  panel.append(media, copy);
  return panel;
}

const projectPanels = new Map();
projectCards.forEach((card) => {
  const project = projectDetails[card.dataset.project];
  if (!project) return;
  const panel = makeProjectPanel(project, `project-details-${card.dataset.project}`);
  card.setAttribute('aria-controls', panel.id);
  card.setAttribute('aria-expanded', 'false');
  card.insertAdjacentElement('afterend', panel);
  projectPanels.set(card, panel);

  card.addEventListener('click', () => {
    const isOpen = card.getAttribute('aria-expanded') === 'true';
    projectCards.forEach((otherCard) => {
      otherCard.setAttribute('aria-expanded', 'false');
      otherCard.classList.remove('is-open');
      const otherPanel = projectPanels.get(otherCard);
      if (otherPanel) otherPanel.hidden = true;
    });
    if (isOpen) return;
    card.setAttribute('aria-expanded', 'true');
    card.classList.add('is-open');
    panel.hidden = false;
  });
});
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.section-heading, .about-copy, .about-aside, .stat-item, .project-list-item, .timeline-item, .education-feature, .education-entry, .skills-ledger, .skill-row, .credential-card');
if ('IntersectionObserver' in window && !reducedMotion) {
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

const counters = document.querySelectorAll('[data-count]');
if (reducedMotion || !('IntersectionObserver' in window)) {
  counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
} else {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.count);
      entry.target.textContent = '0';
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / 850);
        entry.target.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

const progressBar = document.querySelector('.scroll-progress span');
const updateScrollState = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
  document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 16);
};
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-current', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}

const specialty = document.querySelector('.rotating-specialty');
if (specialty && !reducedMotion) {
  const specialties = ['AI / Data / Software / Cybersecurity', 'Full-stack development', 'Machine learning / NLP / Computer vision'];
  let specialtyIndex = 0;
  window.setInterval(() => {
    specialty.classList.add('is-changing');
    window.setTimeout(() => {
      specialtyIndex = (specialtyIndex + 1) % specialties.length;
      specialty.textContent = specialties[specialtyIndex];
      specialty.classList.remove('is-changing');
    }, 220);
  }, 3200);
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion) {
  const glow = document.createElement('div');
  glow.className = 'pointer-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.append(glow);
  window.addEventListener('pointermove', (event) => {
    glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    glow.classList.add('is-visible');
    glow.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, .project-list-item')));
  }, { passive: true });
  document.addEventListener('pointerleave', () => glow.classList.remove('is-visible'));
}
