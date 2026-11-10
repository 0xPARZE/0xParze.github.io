// All of the site's content lives in this file.
// Edit text here; the page layout in src/pages/index.astro reads from it.

export const site = {
  name: 'Rahul Nivash',
  title: 'Rahul Nivash · Nonlinear Dynamics, HPC & Scientific ML',
  description:
    'Rahul Nivash is a Computer Science & Physics student at the University of Manitoba who studies chaotic dynamical systems, from laser cavities to food chains, with GPU computing and machine learning.',
  cv: '/Rahul_Nivash_CV.pdf',
  email: 'rxhulnivash@gmail.com',
  github: 'https://github.com/0xParze',
  githubHandle: '0xParze',
  linkedin: 'https://www.linkedin.com/in/rahulnivash/',
  linkedinHandle: 'rahulnivash',
  location: 'Winnipeg, MB',
  updated: 'November 2026',
};

// The one-line status shown in the hero. Change this as your plans firm up.
export const status = {
  text: 'Graduating December 2026 · Open to 2027 internships and research roles',
};

export const hero = {
  eyebrow: 'Computer Science × Physics · University of Manitoba',
  lede: 'I study chaos and build the fast code that maps it.',
  sub: 'The same nonlinear mathematics drives laser cavities and food chains. My research uses GPU computing and machine learning to find where systems tip from order into chaos.',
};

export const about = {
  heading: 'Chaos, made computable.',
  paragraphs: [
    'I’m in my final term of the Joint Honours Computer Science & Physics program at the University of Manitoba, with a minor in Mathematics. I graduate in December 2026.',
    'My research is in nonlinear dynamics and chaos. I’ve worked on food chains, laser cavities and optical ring resonators, and the questions are always similar: when does a system turn chaotic, and how far ahead can we predict it? Answering them takes a lot of computation, so I reformulate the math, move solvers onto GPUs with CUDA and JAX, and train ML surrogates that tell me where to look.',
    'Next, I’m looking for an internship or research role in 2027 ahead of graduate school, ideally in photonics, quantum technology, GPU and AI acceleration, or quantitative research.',
  ],
  facts: [
    { label: 'Based in', value: 'Winnipeg, MB' },
    { label: 'Relocating to', value: 'Toronto or Vancouver preferred' },
    { label: 'Degree', value: 'B.Sc. (Hons) Joint CS & Physics, Minor in Math' },
    { label: 'Graduating', value: 'December 2026' },
    { label: 'Works in', value: 'C++, CUDA, Python (JAX), Java' },
  ],
};

export const fit = [
  {
    area: 'Photonics & lasers',
    body: 'I’ve modeled class-B laser rate equations and optical turbulence in nonlinear ring cavities, backed by coursework in optics, circuits and electronics.',
  },
  {
    area: 'Quantum & physical modeling',
    body: 'Quantum mechanics through QM III, statistical mechanics and mathematical physics, plus the numerical methods to simulate sensitive systems accurately.',
  },
  {
    area: 'GPU & AI acceleration',
    body: 'I port solvers to C++/CUDA and JAX on HPC clusters, and restructure the math so the hardware does less work. One sweep runs 215× faster than 12-thread C++.',
  },
  {
    area: 'Quantitative research',
    body: 'Stochastic and chaotic dynamics, Markov chains, sampling high-dimensional spaces, and gradient-boosted models with active learning. Currently taking Advanced Algorithms and Cryptography.',
  },
];

export type Stat = { value: string; label: string };
export type Project = {
  id: string;
  title: string;
  role: string;
  org: string;
  dates: string;
  supervisor?: string;
  summary: string;
  bullets: string[];
  stats?: Stat[];
  tags: string[];
  links?: { label: string; href: string }[];
  outputs?: string[];
};

export const research: Project[] = [
  {
    id: 'usra',
    title: 'Mapping regime shifts with ML surrogates',
    role: 'Undergraduate Research Fellow (Faculty of Science USRA)',
    org: 'Department of Mathematics, University of Manitoba',
    dates: 'Summer 2026',
    supervisor: 'Dr. Christopher Heggerud',
    summary:
      'Where does a 9-dimensional nonlinear ecosystem switch between chaos, limit cycles and steady states? Brute-force simulation is too slow to say, so I built a pipeline that learns where the boundaries are.',
    bullets: [
      'Engineered a GPU-accelerated solver in JAX on HPC clusters to integrate trajectories of high-dimensional nonlinear systems.',
      'Computed full Lyapunov spectra via QR decomposition to classify each run as chaotic, periodic or steady.',
      'Sampled the parameter space with Latin Hypercube Sampling to resolve regime boundaries.',
      'Trained an XGBoost surrogate with active learning to locate transitions, cutting simulation runtime by orders of magnitude.',
    ],
    tags: ['JAX', 'HPC', 'XGBoost', 'Active learning', 'Latin Hypercube Sampling', 'QR Lyapunov spectra'],
    outputs: [
      'Manuscript in preparation',
      'Funded poster, MMI HQP Summit',
      'Posters at SURE and the Undergraduate Research Showcase',
    ],
  },
  {
    id: 'mxml',
    title: 'Laser dynamics meets population ecology',
    role: 'Undergraduate Researcher (MATH 4920)',
    org: 'Manitoba eXperimental Mathematics Laboratory (MXML), University of Manitoba',
    dates: 'Winter 2026',
    supervisor: 'Dr. Christopher Heggerud',
    summary:
      'Showed that the rate equations of a class-B laser cavity are dynamically equivalent to the Hastings–Powell food chain, a three-species model that exhibits transient chaos.',
    bullets: [
      'Integrated both systems with high-order adaptive Runge–Kutta methods (SciPy) to resolve sensitive strange attractors.',
      'Used finite-time Lyapunov exponents to measure how far ahead each system is predictable, and Markov chains to model state transitions.',
      'Built Poincaré maps and estimated fractal dimension with spatial neighbour search.',
      'Defended the findings in an oral presentation to department faculty.',
    ],
    tags: ['Python', 'SciPy', 'Hastings–Powell', 'Runge–Kutta', 'Markov chains', 'Poincaré maps'],
    links: [{ label: 'Report (PDF)', href: '/docs/Nivash_MATH4920_Report.pdf' }],
  },
  {
    id: 'ikeda',
    title: 'Optical turbulence in nonlinear ring cavities',
    role: 'Independent research project',
    org: 'Department of Physics & Astronomy, University of Manitoba',
    dates: 'Jan – Jun 2026',
    summary:
      'Extended a computational physics (PHYS 4250) assignment on the Ikeda map into a high-performance study of how light in a ring cavity becomes chaotic, and why that happens long before steady-state theory predicts.',
    bullets: [
      'Rewrote the complex-valued map as a 2D real system and ported the solver to C++ and CUDA. Parameter sweeps run 11.6× (FP64) to 215× (FP32) faster than 12-thread C++.',
      'Derived the Jacobian analytically for Lyapunov exponents, and used Newton continuation to locate the period-doubling route to chaos, recovering Feigenbaum’s constant to within 0.1%.',
      'Computed the attractor’s fractal dimension by box counting and checked convergence against universal scaling laws.',
      'Backed every number with 40 tests against exact identities, published values and a shared-source OpenMP reference.',
    ],
    tags: ['C++20', 'CUDA', 'OpenMP', 'Nonlinear optics', 'Newton continuation'],
    links: [
      { label: 'Code: ikeda-cuda', href: 'https://github.com/0xParze/ikeda-cuda' },
      { label: 'Theory Canada slides (PDF)', href: '/docs/Nivash_Theory-Canada-18_Ikeda-slides.pdf' },
    ],
    outputs: ['Contributed talk, Theory Canada 18', 'Poster, CUPC 2026'],
  },
];

export const publication = {
  authors: [{ name: 'Nivash, R.', me: true }, { name: 'Heggerud, C.' }],
  title:
    'Machine Learning Surrogate Modeling for Mapping Transient and Asymptotic Regimes in High-Dimensional Dynamical Systems',
  status: 'Manuscript in preparation · expected submission December 2026',
};

export type Talk = {
  date: string;
  venue: string;
  place: string;
  kind: 'Oral' | 'Poster';
  note?: string;
  title: string;
  coauthor?: boolean;
  // Slides or poster PDFs: put the file in public/docs/ and link it as '/docs/<file>.pdf'
  links?: { label: string; href: string }[];
};

// Newest first.
export const talks: Talk[] = [
  {
    date: 'Oct 22, 2026',
    venue: 'Undergraduate Research Showcase',
    place: 'University of Manitoba',
    kind: 'Poster',
    title: 'Studying Regime Shifts in Nonlinear Ecosystems: Mapping Topological Boundaries in a 9D Hyperspace Explicitly and with Machine Learning',
    coauthor: true,
  },
  {
    date: 'Oct 15–19, 2026',
    venue: 'Canadian Undergraduate Physics Conference (CUPC)',
    place: 'McMaster University, Hamilton',
    kind: 'Poster',
    title: 'Optical Turbulence and Chaos in the Ikeda Map: High-Performance Computational Modeling of Discrete-Time Chaos',
  },
  {
    date: 'Sep 14, 2026',
    venue: 'Math Biology Research Group',
    place: 'University of Manitoba',
    kind: 'Oral',
    title: 'Regime Shifts in Non-Linear Ecosystems: Topological Mapping with Machine Learning',
    coauthor: true,
  },
  {
    date: 'Aug 19, 2026',
    venue: 'SURE Poster Session',
    place: 'University of Manitoba',
    kind: 'Poster',
    title: 'Studying Regime Shifts in Nonlinear Ecosystems: Mapping Topological Boundaries in a 9D Hyperspace Explicitly and with Machine Learning',
    coauthor: true,
  },
  {
    date: 'Aug 14–16, 2026',
    venue: 'Maud Menten Institute HQP Summit',
    place: 'University of Victoria',
    kind: 'Poster',
    note: 'Funded presenter',
    title: 'Studying Regime Shifts in Nonlinear Ecosystems: Mapping Topological Boundaries in a 9D Hyperspace Explicitly and with Machine Learning',
    coauthor: true,
  },
  {
    date: 'Jun 19–20, 2026',
    venue: 'Theory Canada 18',
    place: 'Université de Montréal',
    kind: 'Oral',
    note: 'Contributed talk',
    title: 'High-Performance Computational Modeling of Optical Turbulence and Discrete-Time Chaos in the Ikeda Map',
    links: [{ label: 'Slides (PDF)', href: '/docs/Nivash_Theory-Canada-18_Ikeda-slides.pdf' }],
  },
];

export const skills = [
  { group: 'Languages', items: ['C/C++', 'CUDA', 'Python', 'Java'] },
  {
    group: 'Dynamical systems',
    items: ['Hastings–Powell food chain', 'Ikeda map', 'Class-B laser equations'],
  },
  { group: 'Scientific computing', items: ['JAX', 'NumPy', 'SciPy', 'XGBoost', 'OpenMP'] },
  {
    group: 'HPC',
    items: ['GPU simulation pipelines', 'Parallel numerical solvers', 'Vectorized parameter sweeps', 'Linux clusters'],
  },
  {
    group: 'Numerical methods',
    items: ['Adaptive ODE solvers', 'Lyapunov spectra', 'Poincaré maps', 'Newton continuation', 'Latin Hypercube Sampling'],
  },
  {
    group: 'Scientific ML',
    items: ['Surrogate modeling', 'Gradient boosting', 'Gaussian processes', 'MLPs', 'Active learning'],
  },
  {
    group: 'Physics',
    items: ['Nonlinear optical cavities', 'Laser rate equations', 'Wave & stability dynamics', 'Circuits & electronics'],
  },
  { group: 'Tools', items: ['Linux', 'Git', 'CMake', 'LaTeX'] },
];

export const education = {
  school: 'University of Manitoba',
  place: 'Winnipeg, MB',
  degree: 'B.Sc. (Honours) Joint Computer Science & Physics, Minor in Mathematics',
  dates: 'Expected December 2026',
  honours: ['Dean’s Honour List, Winter 2025 (term GPA 4.00 / 4.50)'],
  coursework: [
    {
      group: 'Physics',
      items: [
        'Optics',
        'Circuit Theory & Electronics',
        'Waves & Modern Physics',
        'Electro- & Magnetostatics',
        'Classical Mechanics',
        'Mathematical Physics I & II',
        'Quantum Mechanics II & III',
        'Medical Physics',
      ],
    },
    {
      group: 'Computing',
      items: ['Computational Physics', 'Data Structures & Algorithms', 'Computer Organization', 'Computer Graphics'],
    },
    {
      group: 'Mathematics',
      items: ['Multivariable Calculus', 'Vector Geometry & Linear Algebra', 'Undergraduate Research in Mathematics'],
    },
  ],
  inProgress: ['Advanced Algorithms', 'Statistical Mechanics', 'Cryptography & Cryptosystems', 'Computer Graphics 2'],
};

export const service = [
  {
    role: 'Founder & Lead Instructor',
    org: 'SpeakUp! Learning',
    dates: 'Jan 2026 – present',
    body: 'Founded an international consultancy that teaches conversational English. I lead a growing team of instructors and designed the intensive two-week fluency program we deliver.',
  },
  {
    role: 'Private STEM Tutor',
    org: 'TutorBright',
    dates: 'Nov 2025 – present',
    body: 'One-on-one tutoring in university-level mathematics, physics and chemistry, built around the reasoning behind each method.',
  },
  {
    role: 'Academic Consultant, Mathematics',
    org: 'Independent practice',
    dates: 'Mar – May 2026',
    body: 'Coached students for the University of Waterloo Gauss Mathematics Competition, covering combinatorics, probability and problem solving.',
  },
  {
    role: 'Ski Patroller (Volunteer)',
    org: 'Canadian Ski Patrol, Red River Zone',
    dates: 'Sep 2025 – Apr 2026',
    body: 'Certified in Advanced First Aid and CPR (BLS). On-hill emergency response and triage under pressure.',
  },
];

export const contact = {
  heading: 'Let’s talk.',
  body: 'I’m looking for 2027 internships and research positions in photonics, quantum technology, GPU and ML systems, or quantitative research, and I’m open to full-time roles. I’m based in Winnipeg and ready to relocate, with Toronto and Vancouver at the top of my list.',
};
