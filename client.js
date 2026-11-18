const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}
function openModal(html) {
  const m = document.getElementById('modal');
  const content = document.getElementById('modalcontent');
  if (!m || !content) return;
  content.innerHTML = '<button class="close" aria-label="Close" onclick="closeModal()">×</button>' + html;
  m.scrollTop = 0;
  if (!m.open) m.showModal();
}
function closeModal() {
  const m = document.getElementById('modal');
  if (m && m.open) m.close();
}

const SAFE_DEMO_TALENTS = [
  {
    id: 'demo_ayaan',
    name: 'Ayaan Khan',
    type: 'Model / Actor',
    craftTitle: 'Editorial Model & Screen Actor',
    agency: 'Funnuun Studio · Talent Representation',
    city: 'Lahore',
    country: 'Pakistan',
    available: true,
    approved: true,
    photoUrl: '/assets/t4.jpg',
    portfolioUrl: 'https://www.behance.net/',
    approvedPortfolioCount: 3,
    canViewAbout: true,
    aboutAmbitions: 'Model and actor known for versatility, strong screen presence and modern editorial look.',
    portfolioItems: [
      { id: 'd_ak_1', name: 'Monograph Key Portrait', type: 'image/jpeg', src: '/assets/t4.jpg', approved: true },
      { id: 'd_ak_2', name: 'Daylight Tailoring Study', type: 'image/jpeg', src: '/assets/t2.jpg', approved: true },
      { id: 'd_ak_3', name: 'Nocturne Studio Lighting', type: 'image/jpeg', src: '/assets/t1.jpg', approved: true }
    ]
  },
  {
    id: 'demo_maya',
    name: 'Maya Ahmed',
    type: 'Actor',
    craftTitle: 'Screen & Commercial Actor',
    agency: 'Funnuun Studio · Talent Representation',
    city: 'Karachi',
    country: 'Pakistan',
    available: true,
    approved: true,
    photoUrl: '/assets/t1.jpg',
    portfolioUrl: 'https://www.behance.net/',
    approvedPortfolioCount: 2,
    canViewAbout: true,
    aboutAmbitions: 'Focused on dramatic cinema, editorial portraiture and international commercial campaigns.',
    portfolioItems: [
      { id: 'd_ma_1', name: 'Nocturne Studio Portrait', type: 'image/jpeg', src: '/assets/t1.jpg', approved: true },
      { id: 'd_ma_2', name: 'Stage Movement Frame', type: 'image/jpeg', src: '/assets/t3.jpg', approved: true }
    ]
  },
  {
    id: 'demo_sara',
    name: 'Sara Malik',
    type: 'Presenter',
    craftTitle: 'Editorial Host & Voice Talent',
    agency: 'Funnuun Studio · Talent Representation',
    city: 'Islamabad',
    country: 'Pakistan',
    available: true,
    approved: true,
    photoUrl: '/assets/t3.jpg',
    portfolioUrl: 'https://www.behance.net/',
    approvedPortfolioCount: 2,
    canViewAbout: true,
    aboutAmbitions: 'Bilingual presenter and runway talent crafting refined documentary and fashion storytelling.',
    portfolioItems: [
      { id: 'd_sm_1', name: 'Motion Frame Study', type: 'image/jpeg', src: '/assets/t3.jpg', approved: true },
      { id: 'd_sm_2', name: 'Stage & Silhouette', type: 'image/jpeg', src: '/assets/t5.jpg', approved: true }
    ]
  },
  {
    id: 'demo_hamza',
    name: 'Hamza Ali',
    type: 'Model',
    craftTitle: 'Runway & Editorial Model',
    agency: 'Funnuun Studio · Talent Representation',
    city: 'Lahore',
    country: 'Pakistan',
    available: true,
    approved: true,
    photoUrl: '/assets/t2.jpg',
    portfolioUrl: 'https://www.behance.net/',
    approvedPortfolioCount: 2,
    canViewAbout: true,
    aboutAmbitions: 'Runway and print specialist focused on minimalist tailoring and architectural campaigns.',
    portfolioItems: [
      { id: 'd_ha_1', name: 'Daylight Editorial', type: 'image/jpeg', src: '/assets/t2.jpg', approved: true },
      { id: 'd_ha_2', name: 'Low-Key Monograph', type: 'image/jpeg', src: '/assets/t4.jpg', approved: true }
    ]
  }
];

const SB_STORAGE_KEY = 'funuun_portfolio_project_v1';
const SB_CATEGORIES = ['Model', 'Actor', 'Photographer', 'Filmmaker', 'Artist', 'Content Creator'];
const SB_PALETTES = [
  { id: 'nocturne-editorial', name: 'Nocturne Editorial', swatches: ['#1F1E1E', '#2C3E50', '#7A6477', '#D6CCD7', '#C9B49A'] },
  { id: 'burgundy-ivory', name: 'Burgundy & Ivory', swatches: ['#16090D', '#6E1522', '#9B2235', '#E8DDD2', '#FAF3EA'] },
  { id: 'obsidian-slate', name: 'Obsidian & Slate', swatches: ['#0E0B0C', '#242933', '#525866', '#B9B2AA', '#F2ECE4'] },
  { id: 'warm-studio', name: 'Warm Studio', swatches: ['#1B1412', '#5A3A2E', '#9C7860', '#D9C8B8', '#FAF6F0'] }
];
const SB_STYLE_TAGS = ['Editorial', 'Cinematic', 'Modern', 'Minimalist', 'High Contrast'];
const SB_PRESET_IMAGES = [
  { label: 'Nocturne Studio Portrait', src: '/assets/t1.jpg' },
  { label: 'Daylight Editorial Portrait', src: '/assets/t2.jpg' },
  { label: 'Studio Motion Study', src: '/assets/t3.jpg' },
  { label: 'Monograph Low-Key Portrait', src: '/assets/t4.jpg' },
  { label: 'Stage & Movement Study', src: '/assets/t5.jpg' }
];

const STORYBOARD_STAGE_META = [
  { num: '01', tabLabel: 'Concept Development', stageBadge: 'STAGE 01', stageTitle: 'Concept Development', stageDesc: 'Define the project identity, creative vision and talent pairing before planning each scene.' },
  { num: '02', tabLabel: 'Visual Direction', stageBadge: 'STAGE 02', stageTitle: 'Visual Direction', stageDesc: 'Define the look, mood, style and creative references for the production.' },
  { num: '03', tabLabel: 'Scene Planning', stageBadge: 'STAGE 03', stageTitle: 'Scene Planning', stageDesc: 'Plan the complete shoot, define scenes, shots, angles and production details.' },
  { num: '04', tabLabel: 'Portfolio Presentation', stageBadge: 'STAGE 04', stageTitle: 'Portfolio Presentation', stageDesc: 'Curated selection of final photographs for the talent portfolio.' }
];

function defaultStoryboardProject() {
  return {
    brief: {
      projectTitle: 'Nocturne Editorial Monograph',
      category: 'Model',
      objective: 'Build a signature editorial portfolio showcasing range across studio and natural light.',
      targetAudience: 'Creative directors, fashion houses and commercial casting teams',
      description: 'An intimate, high-contrast visual study balancing sculpted shadow with warm ivory highlights.',
      creativeVision: 'Sculpted chiaroscuro portraiture pairing architectural minimalism with poised screen presence.',
      whySelected: 'Expressive stillness, strong editorial bone structure and effortless versatility across lighting moods.',
      conceptRefs: 'Classic studio monograph portraiture, low-key cinema stills and minimalist architectural framing.',
      visualStyle: 'Editorial',
      mood: 'Dramatic, poised and editorial',
      colorDirection: 'Deep charcoal shadows, muted slate tones and warm ivory highlights',
      lighting: 'Blue studio key with warm rim highlights',
      camera: 'Medium close-up · 50mm · f/1.4',
      shotTypes: 'Close-up, Medium, Profile, Wide',
      location: 'Main Studio (Blackout Setup)',
      wardrobe: 'Tailored dark coat, raw silk and minimalist monochrome silhouettes',
      props: 'Architectural chair, subtle diffused haze',
      deliverables: 'Creative brief, moodboard and 4-scene portfolio sequence',
      references: [
        { id: 'ref1', label: 'Nocturne Key Light', image: '/assets/t1.jpg', note: 'Primary studio lighting study' },
        { id: 'ref2', label: 'Daylight Wardrobe', image: '/assets/t2.jpg', note: 'Soft fill and texture' }
      ]
    },
    moodboard: {
      palette: 'nocturne-editorial',
      customColors: ['#1F1E1E', '#2C3E50', '#7A6477', '#D6CCD7', '#C9B49A'],
      activeTab: 'moodboard',
      visualStyles: ['Editorial', 'Cinematic', 'Modern'],
      lightingRefs: 'Low-key directional key light with rim separation and balanced fill',
      wardrobeRefs: 'Tailored, minimal and textured layers with a modern silhouette.',
      propsDesc: 'Subtle, premium accessories to enhance the narrative.',
      locationDesc: 'Studio setup with architectural elements and controlled light.',
      items: [
        { id: 'mb1', title: 'Cool Key & Warm Rim', image: '/assets/t1.jpg', tag: 'Lighting' },
        { id: 'mb2', title: 'Natural Daylight Texture', image: '/assets/t2.jpg', tag: 'Fabric & Texture' },
        { id: 'mb3', title: 'Studio Environment', image: '/assets/t3.jpg', tag: 'Studio & Set' },
        { id: 'mb4', title: 'Monograph Contrast', image: '/assets/t4.jpg', tag: 'Location' },
        { id: 'mb5', title: 'Stage Movement', image: '/assets/t5.jpg', tag: 'Lighting' },
        { id: 'mb6', title: 'Architectural Shadow', image: '/assets/t1.jpg', tag: 'Reference' }
      ]
    },
    scenes: [
      {
        id: 'sc1', frameKey: 't1', num: '01', title: 'The Introduction', talentMeta: 'CONCEPT · STUDIO PORTRAIT',
        description: 'Establish the mood and silent presence through strong, cinematic portraits.',
        image: '/assets/t1.jpg', shotType: 'Close-up', cameraAngle: 'Eye-level · 50mm · f/1.4',
        lighting: 'Key studio lighting with crisp rim highlights', location: 'Main Studio (Blackout Setup)',
        estimatedTime: '2 Hours', wardrobe: 'Tailored coat, minimal styling', moodTags: ['Dramatic', 'Elegant', 'Editorial'],
        instructions: 'Capture steady eye contact and subtle head turns before introducing side profile framing.',
        deliverable: 'Hero portrait select',
        shots: [
          { id: 'sh1_1', num: '01', label: 'Close-up', lens: '50mm · f/1.4', lighting: 'Key Light', image: '/assets/t1.jpg' },
          { id: 'sh1_2', num: '02', label: 'Medium', lens: '85mm · f/1.8', lighting: 'Rim Light', image: '/assets/t2.jpg' },
          { id: 'sh1_3', num: '03', label: 'Profile', lens: '50mm · f/2.0', lighting: 'Window Shadow', image: '/assets/t3.jpg' },
          { id: 'sh1_4', num: '04', label: 'Wide', lens: '35mm · f/2.8', lighting: 'Architectural Fill', image: '/assets/t4.jpg' }
        ]
      },
      {
        id: 'sc2', frameKey: 't2', num: '02', title: 'The Editorial', talentMeta: 'VISUAL DIRECTION · TEXTURE',
        description: 'Showcase style, wardrobe and versatility across clean studio compositions.',
        image: '/assets/t2.jpg', shotType: 'Tight Portrait', cameraAngle: 'Slight low angle · 85mm · f/1.8',
        lighting: 'Soft diffused daylight with subtle fill', location: 'Daylight Studio',
        estimatedTime: '2 Hours', wardrobe: 'Structured monochrome layers', moodTags: ['Editorial', 'Modern', 'Poised'],
        instructions: 'Emphasize fabric drape and clean negative space along the right third.',
        deliverable: 'Wardrobe & texture plates',
        shots: [
          { id: 'sh2_1', num: '01', label: 'Three-quarter', lens: '85mm · f/1.8', lighting: 'Soft Fill', image: '/assets/t2.jpg' },
          { id: 'sh2_2', num: '02', label: 'Detail', lens: '85mm · f/2.2', lighting: 'Natural Side', image: '/assets/t3.jpg' },
          { id: 'sh2_3', num: '03', label: 'Full Length', lens: '50mm · f/2.8', lighting: 'Diffused Key', image: '/assets/t4.jpg' }
        ]
      },
      {
        id: 'sc3', frameKey: 't3', num: '03', title: 'The Personality', talentMeta: 'SCENE PLANNING · MOVEMENT',
        description: 'Capture natural expressions, movement and authentic character.',
        image: '/assets/t3.jpg', shotType: 'Three-quarter', cameraAngle: 'Dynamic 35mm · f/2.0',
        lighting: 'Sculpted backlight with soft key', location: 'Soundstage A',
        estimatedTime: '1.5 Hours', wardrobe: 'Relaxed silk shirt', moodTags: ['Candid', 'Expressive', 'Warm'],
        instructions: 'Keep continuous motion between seated and standing beats.',
        deliverable: 'Motion sequence stills',
        shots: [
          { id: 'sh3_1', num: '01', label: 'Medium', lens: '35mm · f/2.0', lighting: 'Backlight', image: '/assets/t3.jpg' },
          { id: 'sh3_2', num: '02', label: 'Close-up', lens: '50mm · f/1.4', lighting: 'Soft Key', image: '/assets/t1.jpg' },
          { id: 'sh3_3', num: '03', label: 'Seated', lens: '50mm · f/2.0', lighting: 'Soft Fill', image: '/assets/t5.jpg' }
        ]
      },
      {
        id: 'sc4', frameKey: 't4', num: '04', title: 'The Signature', talentMeta: 'PORTFOLIO · FINAL SELECT',
        description: 'Final hero frames curated for the portfolio cover and credits.',
        image: '/assets/t4.jpg', shotType: 'Medium Portrait', cameraAngle: 'Locked tripod · 50mm · f/1.4',
        lighting: 'Low-key directional contrast', location: 'Main Studio',
        estimatedTime: '1.5 Hours', wardrobe: 'Signature dark blazer', moodTags: ['Iconic', 'Cinematic', 'Timeless'],
        instructions: 'Lock framing for editorial cover typography and final hero selects.',
        deliverable: 'Final portfolio cover',
        shots: [
          { id: 'sh4_1', num: '01', label: 'Hero Cover', lens: '50mm · f/1.4', lighting: 'Low-Key', image: '/assets/t4.jpg' },
          { id: 'sh4_2', num: '02', label: 'Silhouette', lens: '35mm · f/2.8', lighting: 'Rim Light', image: '/assets/t5.jpg' }
        ]
      }
    ],
    presentation: {
      layout: 'editorial',
      settingsTab: 'layout',
      activeCollectionIndex: 0,
      slideIndex: 0,
      includedCollections: ['sc1', 'sc2', 'sc3', 'sc4'],
      includeSections: {
        heroCover: true,
        aboutTalent: true,
        portfolioShots: true,
        sceneCollections: true,
        experienceCredits: false,
        contactCollab: false
      },
      credits: {
        photography: 'Funnuun Studio',
        styling: 'Editorial Team',
        lighting: 'Studio Setup'
      }
    }
  };
}

const SB_TALENT_PROJECTS_KEY = 'funuun_portfolio_projects_by_talent_v1';
const SB_SELECTED_TALENT_KEY = 'funuun_selected_storyboard_talent_v1';

function normalizeStoryboardProject(parsed) {
  const def = defaultStoryboardProject();
  if (!parsed || typeof parsed !== 'object') return def;
  const scenes = (Array.isArray(parsed.scenes) && parsed.scenes.length ? parsed.scenes : def.scenes).map((sc, i) => ({
    ...def.scenes[i % def.scenes.length],
    ...sc,
    shots: Array.isArray(sc.shots) && sc.shots.length ? sc.shots : (def.scenes[i % def.scenes.length]?.shots || [{ id: 'sh_' + i, num: '01', label: sc.shotType || 'Close-up', lens: sc.cameraAngle || '50mm · f/1.4', lighting: sc.lighting || 'Key Light', image: sc.image || '/assets/t1.jpg' }])
  }));
  return {
    talentId: parsed.talentId || null,
    brief: { ...def.brief, ...(parsed.brief || {}), references: Array.isArray(parsed.brief?.references) ? parsed.brief.references : def.brief.references },
    moodboard: { ...def.moodboard, ...(parsed.moodboard || {}), customColors: Array.isArray(parsed.moodboard?.customColors) ? parsed.moodboard.customColors : def.moodboard.customColors, visualStyles: Array.isArray(parsed.moodboard?.visualStyles) ? parsed.moodboard.visualStyles : def.moodboard.visualStyles, items: Array.isArray(parsed.moodboard?.items) ? parsed.moodboard.items : def.moodboard.items },
    scenes,
    presentation: {
      ...def.presentation,
      ...(parsed.presentation || {}),
      includeSections: { ...def.presentation.includeSections, ...(parsed.presentation?.includeSections || {}) },
      credits: { ...def.presentation.credits, ...(parsed.presentation?.credits || {}) }
    }
  };
}

function loadTalentProjectsMap() {
  try {
    const raw = localStorage.getItem(SB_TALENT_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function loadStoryboardProject(talentId = '') {
  if (talentId) {
    const map = loadTalentProjectsMap();
    if (map[talentId]) return normalizeStoryboardProject(map[talentId]);
  }
  try {
    const raw = localStorage.getItem(SB_STORAGE_KEY);
    if (!raw) return defaultStoryboardProject();
    return normalizeStoryboardProject(JSON.parse(raw));
  } catch {
    return defaultStoryboardProject();
  }
}

function saveStoryboardProjectToStorage(project) {
  try {
    localStorage.setItem(SB_STORAGE_KEY, JSON.stringify(project));
    if (project?.talentId) {
      const map = loadTalentProjectsMap();
      map[project.talentId] = project;
      localStorage.setItem(SB_TALENT_PROJECTS_KEY, JSON.stringify(map));
    }
  } catch {}
}

let sbSelectedTalentId = '';
try { sbSelectedTalentId = localStorage.getItem(SB_SELECTED_TALENT_KEY) || ''; } catch {}
let sbRegisteredTalents = [];
let sbTalentsLoaded = false;
let sbTalentsLoading = false;
let sbTalentsError = '';
let sbProject = loadStoryboardProject(sbSelectedTalentId);
let activeStoryboardIndex = 0;
let activeSceneIndex = 0;
let activePhotoIndex = 0;
let activeShotIndex = 0;
let sbThreeDotOpen = false;
let sbStage2Tab = 'moodboard';
let sbStage2ShowAddRef = false;
let sbStage2EditCard = '';
let sbStage3Tab = 'details';
let sbStage3Editing = false;
let sbStage4EditingBlock = '';
let sbDraftMoodboard = null;
let sbDraftScenes = null;
let sbDirty = false;
let sbStatusMessage = '';
let sbStatusKind = 'success';

function sbGetSelectedTalentIndex() {
  if (!sbRegisteredTalents.length) return -1;
  const idx = sbRegisteredTalents.findIndex(t => t.id === sbSelectedTalentId);
  return idx >= 0 ? idx : 0;
}

function stepStoryboardTalent(delta) {
  if (!sbRegisteredTalents.length) return;
  const cur = sbGetSelectedTalentIndex();
  const next = cur + delta;
  if (next < 0 || next >= sbRegisteredTalents.length) return;
  selectStoryboardTalent(sbRegisteredTalents[next].id);
}

function sbGetFourTalentPhotos(sel) {
  const photos = [];
  if (sel) {
    if (sel.photoPath) {
      photos.push({ src: sbTalentPhotoUrl(sel), title: sel.name + ' Portrait', meta: `${sel.name} · ${sel.type}` });
    }
    for (const it of (sel.portfolioItems || [])) {
      if (it && it.approved && it.type?.startsWith('image/')) {
        photos.push({ src: sbTalentPortfolioImgUrl(sel, it), title: it.name || 'Portfolio Frame', meta: `${sel.name} · Portfolio` });
      }
    }
  }
  const fallbacks = [
    { src: '/assets/t1.jpg', title: 'Nocturne Portrait Study', meta: 'Studio Portrait' },
    { src: '/assets/t2.jpg', title: 'Daylight Editorial Study', meta: 'Editorial Portrait' },
    { src: '/assets/t3.jpg', title: 'Studio Motion Study', meta: 'Movement Frame' },
    { src: '/assets/t4.jpg', title: 'Monograph Hero Frame', meta: 'Hero Select' }
  ];
  for (const fb of fallbacks) {
    if (photos.length >= 4) break;
    if (!photos.some(p => p.src === fb.src)) photos.push(fb);
  }
  return photos.slice(0, 4);
}

function sbSelectPhoto(idx) {
  activePhotoIndex = ((idx % 4) + 4) % 4;
  sbThreeDotOpen = false;
  sbRefreshDom();
}

function sbToggleThreeDotMenu() {
  sbThreeDotOpen = !sbThreeDotOpen;
  sbRefreshDom();
}

function sbOpenFullscreen(src, caption = '') {
  sbThreeDotOpen = false;
  openModal(
    `<div class="sb-lightbox">` +
      `<img src="${esc(src)}" alt="${esc(caption || 'Storyboard photograph')}">` +
      (caption ? `<p class="sb-lightbox-caption">${esc(caption)}</p>` : '') +
      `<div class="sb-lightbox-actions"><button type="button" class="sb-btn-ivory" onclick="closeModal()">Exit Fullscreen</button></div>` +
    `</div>`
  );
}

function sbShareProject() {
  const url = location.origin + '/#storyboard';
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast('Storyboard link copied.')).catch(() => toast('Share link: ' + url));
  } else {
    toast('Share link: ' + url);
  }
}

function sbExportPdf() {
  window.print();
}

function sbViewSelectedTalentProfile() {
  sbThreeDotOpen = false;
  const sel = getSelectedStoryboardTalent();
  if (!sel) {
    toast('Select a registered talent to view their complete profile.');
    return;
  }
  if (typeof D !== 'undefined' && D?.user && Array.isArray(D.talents) && D.talents.some(t => t.id === sel.id)) {
    viewProfile(sel.id);
    return;
  }
  const extUrl = safeExternalUrl(sel.portfolioUrl);
  const imgs = (sel.portfolioItems || []).filter(it => it && it.approved && it.type?.startsWith('image/'));
  openModal(
    `<div class="sb-profile-modal">` +
      `<div class="sb-profile-modal-head">` +
        `<img src="${esc(sbTalentPhotoUrl(sel))}" alt="${esc(sel.name)}">` +
        `<div>` +
          `<span class="sb-eyebrow">${esc(sel.type)}</span>` +
          `<h2>${esc(sel.name)}</h2>` +
          `<p>${esc(sel.craftTitle || sel.type)} · ${esc(sel.agency || 'Funnuun Studio')}</p>` +
          (sel.city ? `<small>${esc(sel.city)}${sel.country ? ', ' + esc(sel.country) : ''}</small>` : '') +
        `</div>` +
      `</div>` +
      (sel.canViewAbout && sel.aboutAmbitions ? `<div class="sb-profile-modal-about"><h4>About Me</h4><p>${esc(sel.aboutAmbitions)}</p></div>` : '') +
      (imgs.length ? `<div class="sb-profile-modal-imgs"><h4>Approved Portfolio (${imgs.length})</h4><div class="sb-sel-portfolio-grid">${imgs.map((it, i) => `<img src="${esc(sbTalentPortfolioImgUrl(sel, it))}" alt="${esc(it.name || ('Portfolio ' + (i + 1)))}">`).join('')}</div></div>` : '') +
      `<div class="sb-profile-modal-actions">` +
        (extUrl ? `<a class="sb-btn-outline" href="${esc(extUrl)}" target="_blank" rel="noopener noreferrer">Open External Portfolio ↗</a>` : '') +
        `<button type="button" class="sb-btn-ivory" onclick="closeModal()">Close</button>` +
      `</div>` +
    `</div>`
  );
}

function sbClone(v) { return JSON.parse(JSON.stringify(v)); }

function getSelectedStoryboardTalent() {
  if (!sbSelectedTalentId) return null;
  return sbRegisteredTalents.find(t => t.id === sbSelectedTalentId) || null;
}

function sbTalentPhotoUrl(t) {
  if (!t) return '/assets/default.svg';
  if (t.photoUrl) return t.photoUrl;
  return t.photoPath ? '/api?photo=' + encodeURIComponent(t.id) : '/assets/default.svg';
}

function sbTalentPortfolioImgUrl(t, item) {
  if (item?.src) return item.src;
  return `/api?portfolio=${encodeURIComponent(item.id)}&talentId=${encodeURIComponent(t.id)}`;
}

async function loadStoryboardTalents(force = false) {
  if (sbTalentsLoading || (sbTalentsLoaded && !force)) return;
  sbTalentsLoading = true;
  sbTalentsError = '';
  try {
    const r = await fetch('/api/talents');
    if (r.ok) {
      const data = await r.json();
      sbRegisteredTalents = Array.isArray(data.talents) && data.talents.length ? data.talents : SAFE_DEMO_TALENTS;
    } else {
      sbRegisteredTalents = SAFE_DEMO_TALENTS;
    }
    sbTalentsLoaded = true;
    const selected = getSelectedStoryboardTalent();
    if (selected && sbProject.talentId !== selected.id) {
      sbProject = buildOrLoadProjectForTalent(selected);
      saveStoryboardProjectToStorage(sbProject);
    }
  } catch {
    sbRegisteredTalents = SAFE_DEMO_TALENTS;
    sbTalentsLoaded = true;
  } finally {
    sbTalentsLoading = false;
    if (document.getElementById('storyboard')) sbRefreshDom();
  }
}

function buildOrLoadProjectForTalent(t) {
  const map = loadTalentProjectsMap();
  if (map[t.id]) return normalizeStoryboardProject(map[t.id]);
  const proj = defaultStoryboardProject();
  proj.talentId = t.id;
  proj.brief.projectTitle = t.name + ' — Portfolio Study';
  proj.brief.category = t.type || 'Model';
  proj.brief.location = t.city || 'Main Studio';
  if (t.craftTitle) proj.brief.visualStyle = t.craftTitle;
  const approvedImgs = (t.portfolioItems || []).filter(it => it && it.approved && it.type?.startsWith('image/'));
  if (approvedImgs.length) {
    proj.moodboard.items = approvedImgs.slice(0, 6).map((it, idx) => ({
      id: 'mb_t_' + it.id,
      title: it.name || ('Portfolio Image ' + (idx + 1)),
      image: sbTalentPortfolioImgUrl(t, it),
      tag: t.type || 'Portfolio'
    }));
    proj.scenes = proj.scenes.map((sc, idx) => {
      const match = approvedImgs[idx % approvedImgs.length];
      return match ? { ...sc, image: sbTalentPortfolioImgUrl(t, match) } : sc;
    });
  } else if (t.photoPath) {
    proj.scenes[0] = { ...proj.scenes[0], image: sbTalentPhotoUrl(t) };
  }
  return proj;
}

function selectStoryboardTalent(talentId) {
  if (!sbConfirmDiscardIfDirty()) return;
  const t = sbRegisteredTalents.find(x => x.id === talentId);
  if (!t) return;
  saveStoryboardProjectToStorage(sbProject);
  sbSelectedTalentId = t.id;
  try { localStorage.setItem(SB_SELECTED_TALENT_KEY, t.id); } catch {}
  sbProject = buildOrLoadProjectForTalent(t);
  saveStoryboardProjectToStorage(sbProject);
  sbDraftMoodboard = activeStoryboardIndex === 1 ? sbClone(sbProject.moodboard) : null;
  sbDraftScenes = activeStoryboardIndex === 2 ? sbClone(sbProject.scenes) : null;
  activeSceneIndex = 0;
  sbDirty = false;
  sbStatusKind = 'success';
  sbStatusMessage = `Selected ${t.name} for Storyboard Studio.`;
  sbRefreshDom();
  toast(`Storyboard connected to ${t.name}.`);
}

function clearStoryboardTalent() {
  if (!sbConfirmDiscardIfDirty()) return;
  sbSelectedTalentId = '';
  try { localStorage.removeItem(SB_SELECTED_TALENT_KEY); } catch {}
  sbProject = defaultStoryboardProject();
  saveStoryboardProjectToStorage(sbProject);
  sbDraftMoodboard = activeStoryboardIndex === 1 ? sbClone(sbProject.moodboard) : null;
  sbDraftScenes = activeStoryboardIndex === 2 ? sbClone(sbProject.scenes) : null;
  activeSceneIndex = 0;
  sbDirty = false;
  sbStatusMessage = '';
  sbRefreshDom();
}

function sbAddTalentImageToMoodboard(imageUrl, label) {
  if (activeStoryboardIndex !== 1) {
    if (!sbConfirmDiscardIfDirty()) return;
    activeStoryboardIndex = 1;
    sbDraftScenes = null;
    sbDirty = false;
  }
  ensureMoodboardDraft();
  if (!sbDraftMoodboard.items.some(it => it.image === imageUrl)) {
    sbDraftMoodboard.items.push({
      id: 'mb_tp_' + Date.now(),
      title: label || 'Talent Portfolio Image',
      image: imageUrl,
      tag: 'Talent Portfolio'
    });
    sbDirty = true;
    sbStatusKind = 'success';
    sbStatusMessage = 'Added talent portfolio image to Moodboard draft. Click Save Visual Direction to persist.';
  }
  sbRefreshDom();
}

function sbGetActiveScenes() {
  return activeStoryboardIndex === 2 && sbDraftScenes ? sbDraftScenes : sbProject.scenes;
}

function sbConfirmDiscardIfDirty() {
  if (!sbDirty) return true;
  return window.confirm('You have unsaved changes in Storyboard Studio. Discard unsaved changes?');
}

function sbRefreshDom() {
  const container = document.getElementById('storyboard');
  if (container) container.innerHTML = renderStoryboardStudio();
}

function ensureMoodboardDraft() {
  if (!sbDraftMoodboard) sbDraftMoodboard = sbClone(sbProject.moodboard);
}

function sbSelectPalette(paletteId) {
  ensureMoodboardDraft();
  sbDraftMoodboard.palette = paletteId;
  sbDirty = true;
  sbRefreshDom();
}

function sbToggleStyleTag(tag) {
  ensureMoodboardDraft();
  const list = sbDraftMoodboard.visualStyles;
  const idx = list.indexOf(tag);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(tag);
  sbDirty = true;
  sbRefreshDom();
}

function sbUpdateMoodboardField(field, value) {
  ensureMoodboardDraft();
  sbDraftMoodboard[field] = value;
  sbDirty = true;
}

function sbAddMoodboardItem() {
  ensureMoodboardDraft();
  const titleEl = document.getElementById('sb-mb-title');
  const tagEl = document.getElementById('sb-mb-tag');
  const urlEl = document.getElementById('sb-mb-url');
  const presetEl = document.getElementById('sb-mb-preset');
  const image = (urlEl?.value || '').trim() || presetEl?.value || '/assets/t2.jpg';
  const title = (titleEl?.value || '').trim() || 'Visual Reference';
  const tag = (tagEl?.value || '').trim() || 'Mood';
  sbDraftMoodboard.items.push({ id: 'mb_' + Date.now(), title, image, tag });
  sbDirty = true;
  sbRefreshDom();
}

function sbMoveMoodboardItem(index, delta) {
  ensureMoodboardDraft();
  const next = index + delta;
  if (next < 0 || next >= sbDraftMoodboard.items.length) return;
  const [item] = sbDraftMoodboard.items.splice(index, 1);
  sbDraftMoodboard.items.splice(next, 0, item);
  sbDirty = true;
  sbRefreshDom();
}

function sbRemoveMoodboardItem(index) {
  ensureMoodboardDraft();
  sbDraftMoodboard.items.splice(index, 1);
  sbDirty = true;
  sbRefreshDom();
}

function saveVisualDirection() {
  ensureMoodboardDraft();
  sbProject.moodboard = sbClone(sbDraftMoodboard);
  saveStoryboardProjectToStorage(sbProject);
  sbDirty = false;
  sbStatusKind = 'success';
  sbStatusMessage = 'Visual direction & moodboard saved.';
  toast('Visual direction saved.');
  sbRefreshDom();
}

function ensureScenesDraft() {
  if (!sbDraftScenes) sbDraftScenes = sbClone(sbProject.scenes);
}

function sbSelectScene(index) {
  const scenes = sbGetActiveScenes();
  activeSceneIndex = ((index % scenes.length) + scenes.length) % scenes.length;
  sbRefreshDom();
}

function addStoryboardScene() {
  if (activeStoryboardIndex !== 2) {
    if (!sbConfirmDiscardIfDirty()) return;
    activeStoryboardIndex = 2;
    sbDraftMoodboard = null;
    sbDirty = false;
  }
  ensureScenesDraft();
  const nextNum = String(sbDraftScenes.length + 1).padStart(2, '0');
  const preset = SB_PRESET_IMAGES[sbDraftScenes.length % SB_PRESET_IMAGES.length];
  sbDraftScenes.push({
    id: 'sc_' + Date.now(),
    frameKey: 't' + ((sbDraftScenes.length % 4) + 1),
    num: nextNum,
    title: 'New Scene ' + nextNum,
    talentMeta: sbProject.brief.category.toUpperCase() + ' · SCENE ' + nextNum,
    description: 'Describe the framing, mood and action for this scene.',
    image: preset.src,
    shotType: 'Medium Portrait',
    cameraAngle: sbProject.brief.camera || 'Eye-level · 50mm',
    lighting: sbProject.brief.lighting || 'Sculpted studio key',
    location: sbProject.brief.location || 'Main Studio',
    deliverable: 'Portfolio frame select'
  });
  activeSceneIndex = sbDraftScenes.length - 1;
  sbDirty = true;
  sbStatusMessage = '';
  sbRefreshDom();
  document.getElementById('sb-workspace-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function sbUpdateActiveSceneField(field, value) {
  ensureScenesDraft();
  const scene = sbDraftScenes[activeSceneIndex];
  if (!scene) return;
  scene[field] = value;
  sbDirty = true;
}

function sbMoveActiveScene(delta) {
  ensureScenesDraft();
  const next = activeSceneIndex + delta;
  if (next < 0 || next >= sbDraftScenes.length) return;
  const [item] = sbDraftScenes.splice(activeSceneIndex, 1);
  sbDraftScenes.splice(next, 0, item);
  sbDraftScenes.forEach((s, i) => { s.num = String(i + 1).padStart(2, '0'); });
  activeSceneIndex = next;
  sbDirty = true;
  sbRefreshDom();
}

function sbDeleteActiveScene() {
  ensureScenesDraft();
  if (sbDraftScenes.length <= 1) {
    sbStatusKind = 'error';
    sbStatusMessage = 'At least one scene frame is required in the storyboard.';
    sbRefreshDom();
    return;
  }
  sbDraftScenes.splice(activeSceneIndex, 1);
  sbDraftScenes.forEach((s, i) => { s.num = String(i + 1).padStart(2, '0'); });
  activeSceneIndex = Math.min(activeSceneIndex, sbDraftScenes.length - 1);
  sbDirty = true;
  sbRefreshDom();
}

function saveStoryboardScenes() {
  ensureScenesDraft();
  sbProject.scenes = sbClone(sbDraftScenes);
  saveStoryboardProjectToStorage(sbProject);
  sbDirty = false;
  sbStatusKind = 'success';
  sbStatusMessage = 'Storyboard scenes saved.';
  toast('Storyboard saved.');
  sbRefreshDom();
}

function safeExternalUrl(raw){
  const v=String(raw||'').trim();
  if(!v)return '';
  try{
    const u=new URL(v);
    return u.protocol==='https:'&&u.hostname?u.toString():'';
  }catch{return ''}
}
function sbGetPresetImages(){
  const sel=getSelectedStoryboardTalent();
  const selImgs=sel?(sel.portfolioItems||[]).filter(it=>it&&it.approved&&it.type?.startsWith('image/')).map((it,idx)=>({
    label:`${sel.name} — ${it.name||('Portfolio '+(idx+1))}`,
    src:sbTalentPortfolioImgUrl(sel,it)
  })):[];
  if(sel?.photoPath)selImgs.unshift({label:`${sel.name} — Profile Portrait`,src:sbTalentPhotoUrl(sel)});
  const seen=new Set(selImgs.map(x=>x.src));
  const dynamic=(typeof D!=='undefined'&&D?.talents?D.talents:[]).filter(t=>t&&t.approved!==false).flatMap(t=>
    (t.portfolioItems||[]).filter(it=>it&&it.approved===true&&it.type?.startsWith('image/')).map((it,idx)=>({
      label:`${t.name} — ${it.name||('Portfolio '+(idx+1))}`,
      src:`/api?portfolio=${encodeURIComponent(it.id)}&talentId=${encodeURIComponent(t.id)}`
    }))
  ).filter(x=>!seen.has(x.src));
  return [...selImgs,...dynamic,...SB_PRESET_IMAGES];
}

function renderStoryboardTalentSelection() {
  const sel = getSelectedStoryboardTalent();
  const cards = sbRegisteredTalents.map((t) => {
    const active = t.id === sbSelectedTalentId;
    const extUrl = safeExternalUrl(t.portfolioUrl);
    const hasImgs = t.approvedPortfolioCount > 0;
    const availBadge = hasImgs
      ? `${t.approvedPortfolioCount} Approved Image${t.approvedPortfolioCount === 1 ? '' : 's'}`
      : (extUrl ? 'External Portfolio' : 'Profile Ready');
    const shortDesc = t.canViewAbout && t.aboutAmbitions
      ? (t.aboutAmbitions.length > 110 ? t.aboutAmbitions.slice(0, 107).trim() + '...' : t.aboutAmbitions)
      : `${t.city || 'Studio'} · ${t.type}${t.craftTitle ? ' · ' + t.craftTitle : ''}`;
    return `<article class="sb-talent-card ${active ? 'is-selected' : ''}" data-talent-id="${esc(t.id)}">` +
      `<div class="sb-talent-card-top">` +
        `<img class="sb-talent-avatar" src="${esc(sbTalentPhotoUrl(t))}" alt="${esc(t.name)}">` +
        `<div class="sb-talent-head">` +
          `<span class="sb-cat-pill">${esc(t.type)}</span>` +
          `<h4>${esc(t.name)}</h4>` +
          `<small>${esc(t.craftTitle || t.type)}</small>` +
        `</div>` +
      `</div>` +
      `<p class="sb-talent-desc">${esc(shortDesc)}</p>` +
      `<div class="sb-talent-meta">` +
        `<span class="sb-talent-count">${t.approvedPortfolioCount} approved image${t.approvedPortfolioCount === 1 ? '' : 's'}</span>` +
        `<span class="sb-talent-avail ${hasImgs || extUrl ? 'is-ready' : ''}">${esc(availBadge)}</span>` +
      `</div>` +
      `<button type="button" class="${active ? 'sb-btn-gold' : 'sb-btn-outline'} sb-talent-select-btn" onclick="selectStoryboardTalent('${esc(t.id)}')">${active ? 'Selected ✓' : 'Select Talent'}</button>` +
    `</article>`;
  }).join('');

  const listHtml = sbTalentsLoading && !sbTalentsLoaded
    ? `<p class="sb-empty-note">Loading registered talents from database…</p>`
    : sbTalentsError
      ? `<div class="sb-status-banner sb-status-banner--error">${esc(sbTalentsError)}</div>`
      : cards
        ? `<div class="sb-talent-grid">${cards}</div>`
        : `<p class="sb-empty-note">No registered talents found in the database yet. Register a talent account to connect it directly to Storyboard Studio.</p>`;

  let selectedHtml = '';
  if (sel) {
    const extUrl = safeExternalUrl(sel.portfolioUrl);
    const imgs = (sel.portfolioItems || []).filter(it => it && it.approved && it.type?.startsWith('image/'));
    const imgsHtml = imgs.length
      ? `<div class="sb-sel-portfolio-grid">${imgs.map((it, i) => {
          const url = sbTalentPortfolioImgUrl(sel, it);
          return `<div class="sb-sel-portfolio-item">` +
            `<img src="${esc(url)}" alt="${esc(it.name || ('Portfolio ' + (i + 1)))}">` +
            `<button type="button" class="sb-btn-outline" onclick="sbAddTalentImageToMoodboard('${esc(url)}','${esc(it.name || (sel.name + ' Frame ' + (i + 1)))}')">+ Use in Moodboard</button>` +
          `</div>`;
        }).join('')}</div>`
      : `<p class="sb-empty-note">No approved portfolio images yet for this talent.</p>`;

    const aboutHtml = sel.canViewAbout
      ? `<p class="sb-sel-about">${esc(sel.aboutAmbitions || 'No personal description provided.')}</p>`
      : `<p class="sb-empty-note">Personal description is accessible to authorized internal reviewers.</p>`;

    selectedHtml = `<div class="sb-selected-talent-panel">` +
      `<div class="sb-selected-head">` +
        `<div class="sb-selected-identity">` +
          `<img class="sb-selected-avatar" src="${esc(sbTalentPhotoUrl(sel))}" alt="${esc(sel.name)}">` +
          `<div>` +
            `<span class="sb-eyebrow">SELECTED TALENT · CONNECTED TO STORYBOARD</span>` +
            `<h3>${esc(sel.name)}</h3>` +
            `<p>${esc(sel.craftTitle || sel.type)} · ${esc(sel.type)}${sel.city ? ' · ' + esc(sel.city) : ''}</p>` +
          `</div>` +
        `</div>` +
        `<div class="sb-editor-head-actions">` +
          (extUrl ? `<a class="sb-btn-outline" href="${esc(extUrl)}" target="_blank" rel="noopener noreferrer">External Portfolio ↗</a>` : '') +
          `<button type="button" class="sb-btn-ghost" onclick="clearStoryboardTalent()">Clear Selection</button>` +
        `</div>` +
      `</div>` +
      `<div class="sb-selected-body">` +
        `<div><span class="sb-spec-label">ABOUT ME / PERSONAL DESCRIPTION</span>${aboutHtml}</div>` +
        `<div><span class="sb-spec-label">APPROVED PORTFOLIO IMAGES (${imgs.length})</span>${imgsHtml}</div>` +
      `</div>` +
    `</div>`;
  }

  return `<section class="sb-talent-section" aria-label="Talent Selection">` +
    `<div class="sb-editor-head">` +
      `<div>` +
        `<span class="sb-eyebrow">TALENT SELECTION · TESTING MODE</span>` +
        `<h3>Registered Talent Roster (${sbRegisteredTalents.length})</h3>` +
      `</div>` +
      `<div class="sb-editor-head-actions">` +
        `<button type="button" class="sb-btn-outline" onclick="loadStoryboardTalents(true)">↻ Refresh Talents</button>` +
      `</div>` +
    `</div>` +
    listHtml +
    selectedHtml +
  `</section>`;
}
function sbSetStage2Tab(tab) { sbStage2Tab = tab; sbRefreshDom(); }
function sbToggleStage2AddRef() { sbStage2ShowAddRef = !sbStage2ShowAddRef; sbRefreshDom(); }
function sbToggleStage2EditCard(key) { sbStage2EditCard = sbStage2EditCard === key ? '' : key; sbRefreshDom(); }
function sbSaveStage2Inline(field, val) {
  ensureMoodboardDraft();
  sbDraftMoodboard[field] = val;
  sbProject.moodboard = sbClone(sbDraftMoodboard);
  saveStoryboardProjectToStorage(sbProject);
  sbDirty = false;
  sbStage2EditCard = '';
  sbRefreshDom();
  toast('Visual direction updated.');
}
function sbSelectPaletteColor(hex) {
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(hex).catch(() => {});
  toast(`Selected colour ${hex}`);
}

function sbSetStage3Tab(tab) { sbStage3Tab = tab; sbRefreshDom(); }
function sbToggleStage3Edit() { sbStage3Editing = !sbStage3Editing; sbRefreshDom(); }
function sbSelectShot(idx) {
  ensureScenesDraft();
  const sc = sbDraftScenes[activeSceneIndex] || sbDraftScenes[0];
  const shots = sc.shots || [];
  if (!shots.length) return;
  activeShotIndex = ((idx % shots.length) + shots.length) % shots.length;
  sbRefreshDom();
}
function sbAddShotToActiveScene() {
  ensureScenesDraft();
  const sc = sbDraftScenes[activeSceneIndex] || sbDraftScenes[0];
  if (!Array.isArray(sc.shots)) sc.shots = [];
  const nextNum = String(sc.shots.length + 1).padStart(2, '0');
  const presets = sbGetPresetImages();
  const pick = presets[sc.shots.length % presets.length] || { src: '/assets/t1.jpg' };
  sc.shots.push({ id: 'sh_' + Date.now(), num: nextNum, label: 'Shot ' + nextNum, lens: '50mm · f/1.8', lighting: 'Key Light', image: pick.src });
  activeShotIndex = sc.shots.length - 1;
  sbProject.scenes = sbClone(sbDraftScenes);
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
  toast('Shot added to Scene ' + sc.num + '.');
}
function sbRemoveShotFromActiveScene(idx) {
  ensureScenesDraft();
  const sc = sbDraftScenes[activeSceneIndex] || sbDraftScenes[0];
  if (!sc.shots || sc.shots.length <= 1) return;
  if (!window.confirm('Remove this shot from Scene ' + sc.num + '?')) return;
  sc.shots.splice(idx, 1);
  sc.shots.forEach((s, i) => { s.num = String(i + 1).padStart(2, '0'); });
  activeShotIndex = Math.min(activeShotIndex, sc.shots.length - 1);
  sbProject.scenes = sbClone(sbDraftScenes);
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}

function sbSetStage4Tab(tab) {
  sbProject.presentation.settingsTab = tab;
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbSetStage4Layout(layout) {
  sbProject.presentation.layout = layout;
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbToggleStage4Section(key) {
  sbProject.presentation.includeSections[key] = !sbProject.presentation.includeSections[key];
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbSelectStage4Collection(idx, toggleInclude = false) {
  const sc = sbProject.scenes[idx];
  if (!sc) return;
  sbProject.presentation.activeCollectionIndex = idx;
  if (toggleInclude) {
    const inc = sbProject.presentation.includedCollections || [];
    const pos = inc.indexOf(sc.id);
    if (pos >= 0 && inc.length > 1) inc.splice(pos, 1);
    else if (pos < 0) inc.push(sc.id);
    sbProject.presentation.includedCollections = inc;
  }
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbStepStage4Slide(delta) {
  const sel = getSelectedStoryboardTalent();
  const slides = sbGetFourTalentPhotos(sel);
  const total = slides.length || 1;
  sbProject.presentation.slideIndex = (((sbProject.presentation.slideIndex || 0) + delta) % total + total) % total;
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbSetStage4Slide(idx) {
  sbProject.presentation.slideIndex = idx;
  saveStoryboardProjectToStorage(sbProject);
  sbRefreshDom();
}
function sbToggleStage4Edit(block) {
  sbStage4EditingBlock = sbStage4EditingBlock === block ? '' : block;
  sbRefreshDom();
}
function sbSaveStage4Credits(e) {
  e.preventDefault();
  const f = e.target;
  sbProject.presentation.credits = {
    photography: f.photography.value.trim() || 'Funnuun Studio',
    styling: f.styling.value.trim() || 'Editorial Team',
    lighting: f.lighting.value.trim() || 'Studio Setup'
  };
  saveStoryboardProjectToStorage(sbProject);
  sbStage4EditingBlock = '';
  sbRefreshDom();
  toast('Project credits saved.');
}
function sbSaveStage4About(e) {
  e.preventDefault();
  const val = e.target.aboutText.value.trim();
  if (val) sbProject.brief.description = val;
  saveStoryboardProjectToStorage(sbProject);
  sbStage4EditingBlock = '';
  sbRefreshDom();
  toast('Portfolio summary saved.');
}
function sbPublishPortfolio() {
  saveStoryboardProjectToStorage(sbProject);
  toast('Portfolio presentation is ready to publish.');
}

function renderStoryboardStage1(sel) {
  const b = sbProject.brief;
  const photos = sbGetFourTalentPhotos(sel);
  const pIdx = ((activePhotoIndex % photos.length) + photos.length) % photos.length;
  const curPhoto = photos[pIdx] || photos[0];
  const extUrl = sel ? safeExternalUrl(sel.portfolioUrl) : '';
  const displayName = sel ? sel.name : 'Selected Talent';
  const displayTitle = sel ? (sel.craftTitle || sel.type) : b.category;
  const displayAgency = sel?.agency || 'Funnuun Studio · Talent Representation';

  const thumbs = photos.map((ph, i) =>
    `<button type="button" class="sb-thumb-card ${i === pIdx ? 'is-active' : ''}" aria-label="Select photo ${i + 1}" aria-pressed="${i === pIdx}" onclick="sbSelectPhoto(${i})">` +
      `<img class="sb-thumb-fg" src="${esc(ph.src)}" alt="${esc(ph.title)}">` +
    `</button>`
  ).join('');

  return `<div class="sb-s1-grid">` +
    `<div class="sb-viewport-card sb-s1-viewport">` +
      `<img class="sb-s1-main-img" src="${esc(curPhoto.src)}" alt="${esc(curPhoto.title)}" onclick="sbViewSelectedTalentProfile()">` +
      `<div class="sb-viewport-shade" aria-hidden="true"></div>` +
      `<div class="sb-viewport-top">` +
        `<div class="sb-scene-badge"><span>STAGE 01</span><span>CONCEPT DEVELOPMENT</span></div>` +
        `<div class="sb-frame-pill">` +
          `<span>PHOTO ${String(pIdx + 1).padStart(2, '0')} OF ${String(photos.length).padStart(2, '0')}</span>` +
          `<button type="button" aria-label="Previous photo" onclick="sbSelectPhoto(${pIdx - 1})">‹</button>` +
          `<button type="button" aria-label="Next photo" onclick="sbSelectPhoto(${pIdx + 1})">›</button>` +
        `</div>` +
      `</div>` +
      `<div class="sb-viewport-bottom">` +
        `<div class="sb-caption-box">` +
          `<h3><button type="button" class="sb-title-link" onclick="sbViewSelectedTalentProfile()">${esc(curPhoto.title)}</button></h3>` +
          `<div class="sb-caption-meta">${esc(displayName.toUpperCase())} · ${esc(displayTitle.toUpperCase())}</div>` +
          `<div class="sb-agency-line">${esc(displayAgency)}</div>` +
        `</div>` +
        `<div class="sb-viewport-controls">` +
          `<button type="button" class="sb-view-profile-btn" onclick="sbViewSelectedTalentProfile()">View Profile →</button>` +
          `<button type="button" class="sb-vp-icon" aria-label="Fullscreen photograph" title="Fullscreen" onclick="sbOpenFullscreen('${esc(curPhoto.src)}','${esc(curPhoto.title)}')">` +
            `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 6.5v-3h3M14.5 6.5v-3h-3M3.5 11.5v3h3M14.5 11.5v3h-3"/></svg>` +
          `</button>` +
          `<div class="sb-dotmenu-wrap">` +
            `<button type="button" class="sb-vp-icon" aria-label="Profile options" aria-expanded="${sbThreeDotOpen}" onclick="sbToggleThreeDotMenu()">` +
              `<svg viewBox="0 0 18 18" fill="currentColor"><circle cx="4.5" cy="9" r="1.3"/><circle cx="9" cy="9" r="1.3"/><circle cx="13.5" cy="9" r="1.3"/></svg>` +
            `</button>` +
            (sbThreeDotOpen ? `<div class="sb-dotmenu" role="menu">` +
              `<button type="button" onclick="sbViewSelectedTalentProfile()">View Complete Profile</button>` +
              `<button type="button" onclick="sbOpenFullscreen('${esc(curPhoto.src)}','${esc(curPhoto.title)}')">Open in Fullscreen</button>` +
              (extUrl ? `<a href="${esc(extUrl)}" target="_blank" rel="noopener noreferrer">Open External Portfolio ↗</a>` : '') +
            `</div>` : '') +
          `</div>` +
        `</div>` +
      `</div>` +
    `</div>` +
    `<aside class="sb-inspector-card" aria-label="Concept Development">` +
      `<div class="sb-inspector-head"><span class="sb-inspector-stage">STAGE 01</span></div>` +
      `<h3 class="sb-inspector-title">Concept Development</h3>` +
      `<p class="sb-inspector-desc">${esc(b.description)}</p>` +
      `<div class="sb-specs-list">` +
        `<div class="sb-spec-row"><span class="sb-spec-label">PROJECT TITLE</span><span class="sb-spec-val">${esc(b.projectTitle)}</span></div>` +
        `<div class="sb-spec-row"><span class="sb-spec-label">OBJECTIVE</span><span class="sb-spec-val">${esc(b.objective)}</span></div>` +
        `<div class="sb-spec-row"><span class="sb-spec-label">AUDIENCE</span><span class="sb-spec-val">${esc(b.targetAudience)}</span></div>` +
        `<div class="sb-spec-row"><span class="sb-spec-label">CREATIVE VISION</span><span class="sb-spec-val">${esc(b.creativeVision || b.visualStyle)}</span></div>` +
        `<div class="sb-spec-row"><span class="sb-spec-label">TALENT FIT</span><span class="sb-spec-val">${esc(b.whySelected || b.mood)}</span></div>` +
        `<div class="sb-spec-row"><span class="sb-spec-label">REFERENCES</span><span class="sb-spec-val">${esc(b.conceptRefs || b.colorDirection)}</span></div>` +
      `</div>` +
      (sel ? `<div class="sb-s1-talent-box">` +
        `<img src="${esc(sbTalentPhotoUrl(sel))}" alt="${esc(sel.name)}">` +
        `<div>` +
          `<strong>${esc(sel.name)}</strong>` +
          `<small>${esc(sel.craftTitle || sel.type)} · ${esc(sel.type)}</small>` +
          `<small class="sb-s1-agency">${esc(sel.agency || 'Funnuun Studio')}${sel.city ? ' · ' + esc(sel.city) : ''}</small>` +
          (extUrl ? `<a class="sb-s1-ext" href="${esc(extUrl)}" target="_blank" rel="noopener noreferrer">External Portfolio ↗</a>` : '') +
        `</div>` +
      `</div>` : '') +
      `<div class="sb-inspector-actions">` +
        `<button type="button" class="sb-stage-btn sb-stage-btn--prev" disabled><span aria-hidden="true">←</span><span>Previous Stage</span></button>` +
        `<button type="button" class="sb-stage-btn sb-stage-btn--next" onclick="setStoryboardStage(1)"><span>Next Stage</span><span aria-hidden="true">→</span></button>` +
      `</div>` +
    `</aside>` +
  `</div>` +
  `<div class="sb-filmstrip-row" aria-label="Talent photography gallery">${thumbs}</div>` +
  renderStoryboardTalentSelection();
}

function renderStoryboardStage2(sel) {
  ensureMoodboardDraft();
  const m = sbDraftMoodboard;
  const b = sbProject.brief;
  const paletteColors = Array.isArray(m.customColors) && m.customColors.length === 5 ? m.customColors : SB_PALETTES[0].swatches;
  const moodItems = m.items || [];
  const photos = sbGetFourTalentPhotos(sel);
  const heroImg = photos[0]?.src || '/assets/t1.jpg';
  const gridImages = [
    heroImg,
    moodItems[1]?.image || '/assets/t2.jpg',
    moodItems[2]?.image || '/assets/t3.jpg',
    moodItems[3]?.image || '/assets/t4.jpg',
    moodItems[4]?.image || '/assets/t5.jpg',
    moodItems[5]?.image || '/assets/t1.jpg'
  ];

  const lightingRefs = [
    { title: 'Key Light', sub: '(Dramatic)', img: gridImages[0] },
    { title: 'Rim Light', sub: '(Depth)', img: gridImages[3] },
    { title: 'Soft Fill', sub: '(Balance)', img: gridImages[1] }
  ];

  const presetOptions = sbGetPresetImages().map(p => `<option value="${esc(p.src)}">${esc(p.label)}</option>`).join('');

  let mainTabBody = '';
  if (sbStage2Tab === 'moodboard') {
    mainTabBody =
      `<div class="sb-s2-collage">` +
        `<div class="sb-s2-col-hero"><img src="${esc(gridImages[0])}" alt="Selected talent photography" onclick="sbOpenFullscreen('${esc(gridImages[0])}','Selected Talent Portrait')"></div>` +
        `<div class="sb-s2-col-top">` +
          `<img src="${esc(gridImages[1])}" alt="Fabric and texture reference" onclick="sbOpenFullscreen('${esc(gridImages[1])}','Fabric & Texture')">` +
          `<img src="${esc(gridImages[2])}" alt="Studio environment reference" onclick="sbOpenFullscreen('${esc(gridImages[2])}','Studio Environment')">` +
        `</div>` +
        `<div class="sb-s2-col-bot">` +
          `<img src="${esc(gridImages[3])}" alt="Location inspiration" onclick="sbOpenFullscreen('${esc(gridImages[3])}','Location Inspiration')">` +
          `<img src="${esc(gridImages[4])}" alt="Lighting reference" onclick="sbOpenFullscreen('${esc(gridImages[4])}','Lighting Reference')">` +
          `<img src="${esc(gridImages[5])}" alt="Creative reference" onclick="sbOpenFullscreen('${esc(gridImages[5])}','Creative Reference')">` +
        `</div>` +
      `</div>` +
      `<div class="sb-s2-add-row"><button type="button" class="sb-btn-outline" onclick="sbToggleStage2AddRef()">+ Add Reference</button></div>` +
      (sbStage2ShowAddRef ? `<div class="sb-ref-adder sb-s2-ref-adder">` +
        `<input id="sb-mb-title" type="text" placeholder="Reference title">` +
        `<input id="sb-mb-tag" type="text" placeholder="Tag (e.g. Lighting, Texture)">` +
        `<select id="sb-mb-preset">${presetOptions}</select>` +
        `<input id="sb-mb-url" type="url" placeholder="Or custom image URL (optional)">` +
        `<button type="button" class="sb-btn-ivory" onclick="sbAddMoodboardItem();saveVisualDirection();">Save Reference</button>` +
      `</div>` : '');
  } else if (sbStage2Tab === 'style') {
    const styleChips = SB_STYLE_TAGS.map(tag =>
      `<button type="button" class="sb-style-chip ${(m.visualStyles || []).includes(tag) ? 'is-active' : ''}" onclick="sbToggleStyleTag('${esc(tag)}');saveVisualDirection();">${esc(tag)}</button>`
    ).join('');
    mainTabBody = `<div class="sb-s2-subtab">` +
      `<span class="sb-spec-label">VISUAL STYLE TAGS</span>` +
      `<div class="sb-style-chips">${styleChips}</div>` +
      `<div class="sb-s2-style-notes">` +
        `<div><span class="sb-spec-label">LIGHTING DIRECTION</span><p>${esc(m.lightingRefs)}</p></div>` +
        `<div><span class="sb-spec-label">WARDROBE SILHOUETTE</span><p>${esc(m.wardrobeRefs)}</p></div>` +
      `</div>` +
    `</div>`;
  } else {
    mainTabBody = `<div class="sb-s2-subtab">` +
      `<div class="sb-mb-grid">${moodItems.map((it, i) =>
        `<div class="sb-mb-card">` +
          `<img src="${esc(it.image)}" alt="${esc(it.title)}">` +
          `<div class="sb-mb-body"><span class="sb-mb-tag">${esc(it.tag)}</span><strong>${esc(it.title)}</strong></div>` +
          `<div class="sb-ref-actions">` +
            `<button type="button" aria-label="Remove reference" onclick="sbRemoveMoodboardItem(${i});saveVisualDirection();">×</button>` +
          `</div>` +
        `</div>`
      ).join('')}</div>` +
    `</div>`;
  }

  return `<div class="sb-s2-shell">` +
    `<div class="sb-s2-layout">` +
      `<aside class="sb-s2-talent-col">` +
        `<img class="sb-s2-portrait" src="${esc(heroImg)}" alt="${esc(sel ? sel.name : 'Talent Portrait')}">` +
        `<div class="sb-s2-name-row"><h3>${esc(sel ? sel.name : 'Selected Talent')}</h3><span class="sb-verified-dot" aria-hidden="true">✓</span></div>` +
        `<p class="sb-s2-role">${esc(sel ? (sel.craftTitle || sel.type) : b.category)}</p>` +
        `<div class="sb-s2-meta-list">` +
          `<div><span class="sb-spec-label">AGENCY</span><strong>${esc(sel?.agency || 'Funnuun Studio')}</strong><small>Talent Representation</small></div>` +
          `<div><span class="sb-spec-label">PROJECT</span><strong>${esc(b.projectTitle)}</strong></div>` +
        `</div>` +
        `<div class="sb-s2-theme-block">` +
          `<span class="sb-spec-label">Creative Theme</span>` +
          `<div class="sb-s2-theme-tags">${(m.visualStyles || ['Editorial', 'Cinematic', 'Modern']).map(t => `<span>${esc(t)}</span>`).join('')}</div>` +
        `</div>` +
        `<button type="button" class="sb-btn-outline sb-s2-edit-btn" onclick="sbSetStage2Tab('style')">Edit Theme</button>` +
      `</aside>` +
      `<div class="sb-s2-main">` +
        `<div class="sb-s2-head">` +
          `<div>` +
            `<span class="sb-eyebrow">STAGE 02</span>` +
            `<h3 class="sb-serif-h3">Visual Direction</h3>` +
            `<p>Define the look, mood, style and creative references for the production.</p>` +
          `</div>` +
          `<div class="sb-s2-head-controls">` +
            `<div class="sb-pill-tabs" role="tablist">` +
              `<button type="button" class="${sbStage2Tab === 'moodboard' ? 'is-active' : ''}" onclick="sbSetStage2Tab('moodboard')">Moodboard</button>` +
              `<button type="button" class="${sbStage2Tab === 'style' ? 'is-active' : ''}" onclick="sbSetStage2Tab('style')">Style Guide</button>` +
              `<button type="button" class="${sbStage2Tab === 'references' ? 'is-active' : ''}" onclick="sbSetStage2Tab('references')">References</button>` +
            `</div>` +
            `<button type="button" class="sb-vp-icon" aria-label="Fullscreen moodboard" onclick="sbOpenFullscreen('${esc(heroImg)}','Visual Direction Moodboard')">` +
              `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 6.5v-3h3M14.5 6.5v-3h-3M3.5 11.5v3h3M14.5 11.5v3h-3"/></svg>` +
            `</button>` +
          `</div>` +
        `</div>` +
        `<div class="sb-s2-content-grid">` +
          `<div class="sb-s2-collage-col">${mainTabBody}</div>` +
          `<div class="sb-s2-side-col">` +
            `<div class="sb-s2-side-block">` +
              `<span class="sb-spec-label">CREATIVE PALETTE</span>` +
              `<div class="sb-s2-swatches">${paletteColors.map(hex => `<button type="button" class="sb-s2-swatch" onclick="sbSelectPaletteColor('${esc(hex)}')" title="Copy ${esc(hex)}"><i style="background:${esc(hex)}"></i><span>${esc(hex)}</span></button>`).join('')}</div>` +
            `</div>` +
            `<div class="sb-s2-side-block">` +
              `<span class="sb-spec-label">LIGHTING DIRECTION</span>` +
              `<div class="sb-s2-lighting-grid">${lightingRefs.map(lr => `<div class="sb-s2-light-card"><img src="${esc(lr.img)}" alt="${esc(lr.title)}"><strong>${esc(lr.title)}</strong><small>${esc(lr.sub)}</small></div>`).join('')}</div>` +
            `</div>` +
          `</div>` +
        `</div>` +
        `<div class="sb-s2-bottom-cards">` +
          `<article class="sb-s2-info-card">` +
            `<img src="/assets/t2.jpg" alt="Wardrobe & Styling">` +
            `<div><h4>Wardrobe &amp; Styling</h4><p>${esc(m.wardrobeRefs || b.wardrobe)}</p>${sbStage2EditCard === 'wardrobe' ? `<div class="sb-inline-edit"><input id="sb-s2-wardrobe-in" value="${esc(m.wardrobeRefs)}"><button type="button" class="sb-btn-ivory" onclick="sbSaveStage2Inline('wardrobeRefs',document.getElementById('sb-s2-wardrobe-in').value)">Save</button></div>` : ''}</div>` +
            `<button type="button" class="sb-card-arrow" aria-label="Edit Wardrobe & Styling" onclick="sbToggleStage2EditCard('wardrobe')">→</button>` +
          `</article>` +
          `<article class="sb-s2-info-card">` +
            `<img src="/assets/t3.jpg" alt="Props & Accessories">` +
            `<div><h4>Props &amp; Accessories</h4><p>${esc(m.propsDesc || b.props)}</p>${sbStage2EditCard === 'props' ? `<div class="sb-inline-edit"><input id="sb-s2-props-in" value="${esc(m.propsDesc || b.props)}"><button type="button" class="sb-btn-ivory" onclick="sbSaveStage2Inline('propsDesc',document.getElementById('sb-s2-props-in').value)">Save</button></div>` : ''}</div>` +
            `<button type="button" class="sb-card-arrow" aria-label="Edit Props & Accessories" onclick="sbToggleStage2EditCard('props')">→</button>` +
          `</article>` +
          `<article class="sb-s2-info-card">` +
            `<img src="/assets/t4.jpg" alt="Location & Set">` +
            `<div><h4>Location &amp; Set</h4><p>${esc(m.locationDesc || b.location)}</p>${sbStage2EditCard === 'location' ? `<div class="sb-inline-edit"><input id="sb-s2-location-in" value="${esc(m.locationDesc || b.location)}"><button type="button" class="sb-btn-ivory" onclick="sbSaveStage2Inline('locationDesc',document.getElementById('sb-s2-location-in').value)">Save</button></div>` : ''}</div>` +
            `<button type="button" class="sb-card-arrow" aria-label="Edit Location & Set" onclick="sbToggleStage2EditCard('location')">→</button>` +
          `</article>` +
        `</div>` +
        `<div class="sb-stage-footer-nav">` +
          `<button type="button" class="sb-stage-btn sb-stage-btn--prev" onclick="setStoryboardStage(0)">← Previous Stage</button>` +
          `<button type="button" class="sb-stage-btn sb-stage-btn--next" onclick="setStoryboardStage(2)">Continue to Scene Planning →</button>` +
        `</div>` +
      `</div>` +
    `</div>` +
  `</div>`;
}

function renderStoryboardStage3(sel) {
  ensureScenesDraft();
  const scenes = sbDraftScenes;
  const sIdx = ((activeSceneIndex % scenes.length) + scenes.length) % scenes.length;
  const sc = scenes[sIdx] || scenes[0];
  const shots = Array.isArray(sc.shots) && sc.shots.length ? sc.shots : [{ id: 'sh_def', num: '01', label: sc.shotType || 'Close-up', lens: sc.cameraAngle, lighting: sc.lighting, image: sc.image }];
  const shIdx = ((activeShotIndex % shots.length) + shots.length) % shots.length;
  const activeShot = shots[shIdx] || shots[0];
  const totalShots = scenes.reduce((sum, item) => sum + ((item.shots && item.shots.length) || 1), 0);
  const heroImg = sbGetFourTalentPhotos(sel)[0]?.src || '/assets/t1.jpg';
  const presetOptions = sbGetPresetImages().map(p => `<option value="${esc(p.src)}" ${sc.image === p.src ? 'selected' : ''}>${esc(p.label)}</option>`).join('');

  let rightTabHtml = '';
  if (sbStage3Tab === 'details') {
    rightTabHtml = sbStage3Editing
      ? `<div class="sb-s3-edit-form">` +
          `<label>Scene Name</label><input value="${esc(sc.title)}" oninput="sbUpdateActiveSceneField('title',this.value)">` +
          `<label>Objective</label><textarea rows="2" oninput="sbUpdateActiveSceneField('description',this.value)">${esc(sc.description)}</textarea>` +
          `<label>Location</label><input value="${esc(sc.location)}" oninput="sbUpdateActiveSceneField('location',this.value)">` +
          `<label>Estimated Time</label><input value="${esc(sc.estimatedTime || '2 Hours')}" oninput="sbUpdateActiveSceneField('estimatedTime',this.value)">` +
          `<label>Wardrobe</label><input value="${esc(sc.wardrobe || '')}" oninput="sbUpdateActiveSceneField('wardrobe',this.value)">` +
          `<label>Production Instructions</label><textarea rows="2" oninput="sbUpdateActiveSceneField('instructions',this.value)">${esc(sc.instructions || '')}</textarea>` +
          `<label>Reference Image</label><select onchange="sbUpdateActiveSceneField('image',this.value);sbRefreshDom()">${presetOptions}</select>` +
          `<div class="sb-s3-edit-actions">` +
            `<button type="button" class="sb-btn-ghost" onclick="sbToggleStage3Edit()">Done</button>` +
            `<button type="button" class="sb-btn-ivory" onclick="saveStoryboardScenes();sbStage3Editing=false;sbRefreshDom();">Save Scene</button>` +
          `</div>` +
        `</div>`
      : `<div class="sb-specs-list">` +
          `<div class="sb-spec-row"><span class="sb-spec-label">OBJECTIVE</span><span class="sb-spec-val">${esc(sc.description)}</span></div>` +
          `<div class="sb-spec-row"><span class="sb-spec-label">LOCATION</span><span class="sb-spec-val">${esc(sc.location)}</span></div>` +
          `<div class="sb-spec-row"><span class="sb-spec-label">ESTIMATED TIME</span><span class="sb-spec-val">${esc(sc.estimatedTime || '2 Hours')}</span></div>` +
          `<div class="sb-spec-row"><span class="sb-spec-label">WARDROBE</span><span class="sb-spec-val">${esc(sc.wardrobe || sbProject.brief.wardrobe)}</span></div>` +
          `<div class="sb-spec-row"><span class="sb-spec-label">MOOD</span><span class="sb-spec-val sb-mood-tags">${(sc.moodTags || ['Dramatic', 'Editorial']).map(t => `<span>${esc(t)}</span>`).join('')}</span></div>` +
          `<div class="sb-spec-row"><span class="sb-spec-label">INSTRUCTIONS</span><span class="sb-spec-val">${esc(sc.instructions || 'Follow lighting and framing notes.')}</span></div>` +
        `</div>` +
        `<div class="sb-s3-shot-plan">` +
          `<div class="sb-s3-shot-plan-head"><span class="sb-spec-label">Shot Plan (Key Shots)</span><button type="button" class="sb-text-btn" onclick="sbToggleStage3Edit()">Edit Scene</button></div>` +
          `<div class="sb-s3-key-shots">${shots.map((sh, i) => `<button type="button" class="sb-s3-key-shot ${i === shIdx ? 'is-active' : ''}" onclick="sbSelectShot(${i})"><img src="${esc(sh.image)}" alt="${esc(sh.label)}"><strong>Shot ${esc(sh.num)}</strong><small>${esc(sh.label)}</small></button>`).join('')}</div>` +
        `</div>`;
  } else if (sbStage3Tab === 'shots') {
    rightTabHtml = `<div class="sb-s3-shot-list">` +
      shots.map((sh, i) =>
        `<div class="sb-s3-shot-row ${i === shIdx ? 'is-active' : ''}" onclick="sbSelectShot(${i})">` +
          `<img src="${esc(sh.image)}" alt="${esc(sh.label)}">` +
          `<div><strong>Shot ${esc(sh.num)} · ${esc(sh.label)}</strong><small>${esc(sh.lens)} · ${esc(sh.lighting)}</small></div>` +
          (shots.length > 1 ? `<button type="button" class="sb-icon-x" aria-label="Remove shot" onclick="event.stopPropagation();sbRemoveShotFromActiveScene(${i})">×</button>` : '') +
        `</div>`
      ).join('') +
      `<button type="button" class="sb-btn-outline" onclick="sbAddShotToActiveScene()">+ Add Shot</button>` +
    `</div>`;
  } else {
    rightTabHtml = `<div class="sb-s3-assets-notes">` +
      `<div class="sb-spec-row"><span class="sb-spec-label">SELECTED SHOT</span><span class="sb-spec-val">Shot ${esc(activeShot.num)} · ${esc(activeShot.label)} (${esc(activeShot.lens)})</span></div>` +
      `<div class="sb-spec-row"><span class="sb-spec-label">LIGHTING</span><span class="sb-spec-val">${esc(activeShot.lighting || sc.lighting)}</span></div>` +
      `<div class="sb-spec-row"><span class="sb-spec-label">NOTES</span><span class="sb-spec-val">${esc(sc.instructions || 'No additional notes.')}</span></div>` +
      `<div class="sb-s3-order-bar">` +
        `<button type="button" class="sb-btn-ghost" onclick="sbMoveActiveScene(-1)" ${sIdx === 0 ? 'disabled' : ''}>← Move Up</button>` +
        `<button type="button" class="sb-btn-ghost" onclick="sbMoveActiveScene(1)" ${sIdx === scenes.length - 1 ? 'disabled' : ''}>Move Down →</button>` +
        `<button type="button" class="sb-btn-danger" onclick="if(confirm('Remove Scene ${esc(sc.num)}?'))sbDeleteActiveScene()" ${scenes.length <= 1 ? 'disabled' : ''}>Remove Scene</button>` +
      `</div>` +
    `</div>`;
  }

  return `<div class="sb-s3-shell">` +
    `<div class="sb-summary-banner">` +
      `<div class="sb-summary-talent">` +
        `<img src="${esc(heroImg)}" alt="${esc(sel ? sel.name : 'Talent')}">` +
        `<div><strong>${esc(sel ? sel.name : 'Selected Talent')}</strong><small>${esc(sel ? (sel.craftTitle || sel.type) : sbProject.brief.category)}</small></div>` +
      `</div>` +
      `<div class="sb-summary-title"><h3 class="sb-serif-h3">Scene Planning</h3><p>Plan the complete shoot, define scenes, shots, angles and production details.</p></div>` +
      `<div class="sb-summary-metrics">` +
        `<div><strong>${scenes.length}</strong><small>Scenes</small></div>` +
        `<div><strong>${totalShots}</strong><small>Shots</small></div>` +
        `<div><strong>1 Day</strong><small>Shoot</small></div>` +
        `<div><strong>${esc(sbProject.brief.location.split(' ')[0] || 'Studio')}</strong><small>Main Location</small></div>` +
      `</div>` +
    `</div>` +
    `<div class="sb-s3-grid">` +
      `<aside class="sb-s3-left">` +
        `<div class="sb-panel-head"><span>SCENE LIST</span><button type="button" class="sb-btn-outline sb-btn-sm" onclick="addStoryboardScene()">+ Add Scene</button></div>` +
        `<div class="sb-scene-cards">${scenes.map((item, i) => {
          const cnt = (item.shots && item.shots.length) || 1;
          return `<div class="sb-scene-card ${i === sIdx ? 'is-active' : ''}" onclick="activeShotIndex=0;sbSelectScene(${i})">` +
            `<img src="${esc(item.image)}" alt="${esc(item.title)}">` +
            `<div class="sb-scene-card-body">` +
              `<div class="sb-scene-card-top"><strong>${esc(item.num)} ${esc(item.title)}</strong></div>` +
              `<p>${esc(item.description)}</p>` +
              `<small>${cnt} Shot${cnt === 1 ? '' : 's'}</small>` +
            `</div>` +
          `</div>`;
        }).join('')}</div>` +
      `</aside>` +
      `<div class="sb-s3-center">` +
        `<span class="sb-scene-pill">SCENE ${esc(sc.num)}</span>` +
        `<h3 class="sb-serif-h3">${esc(sc.title)}</h3>` +
        `<p class="sb-s3-obj">${esc(sc.description)}</p>` +
        `<div class="sb-s3-stage-frame">` +
          `<img src="${esc(activeShot.image || sc.image)}" alt="${esc(activeShot.label)}">` +
          `<button type="button" class="sb-arrow-circle sb-arrow-left" aria-label="Previous shot" onclick="sbSelectShot(${shIdx - 1})">‹</button>` +
          `<button type="button" class="sb-arrow-circle sb-arrow-right" aria-label="Next shot" onclick="sbSelectShot(${shIdx + 1})">›</button>` +
          `<span class="sb-counter-badge">${shIdx + 1} / ${shots.length}</span>` +
        `</div>` +
        `<div class="sb-s3-shot-strip">` +
          shots.map((sh, i) => `<button type="button" class="sb-s3-shot-thumb ${i === shIdx ? 'is-active' : ''}" onclick="sbSelectShot(${i})"><img src="${esc(sh.image)}" alt="${esc(sh.label)}"></button>`).join('') +
          `<button type="button" class="sb-s3-add-shot" aria-label="Add Shot" onclick="sbAddShotToActiveScene()">+</button>` +
        `</div>` +
      `</div>` +
      `<aside class="sb-s3-right">` +
        `<div class="sb-pill-tabs" role="tablist">` +
          `<button type="button" class="${sbStage3Tab === 'details' ? 'is-active' : ''}" onclick="sbSetStage3Tab('details')">Scene Details</button>` +
          `<button type="button" class="${sbStage3Tab === 'shots' ? 'is-active' : ''}" onclick="sbSetStage3Tab('shots')">Shot List (${shots.length})</button>` +
          `<button type="button" class="${sbStage3Tab === 'assets' ? 'is-active' : ''}" onclick="sbSetStage3Tab('assets')">Assets &amp; Notes</button>` +
        `</div>` +
        rightTabHtml +
      `</aside>` +
    `</div>` +
    `<div class="sb-stage-footer-nav">` +
      `<button type="button" class="sb-stage-btn sb-stage-btn--prev" onclick="setStoryboardStage(1)">← Previous Stage</button>` +
      `<button type="button" class="sb-stage-btn sb-stage-btn--next" onclick="saveStoryboardScenes();setStoryboardStage(3)">Continue to Portfolio Presentation →</button>` +
    `</div>` +
  `</div>`;
}

function renderStoryboardStage4(sel) {
  const b = sbProject.brief;
  const p = sbProject.presentation || defaultStoryboardProject().presentation;
  const scenes = sbProject.scenes;
  const totalShots = scenes.reduce((sum, item) => sum + ((item.shots && item.shots.length) || 1), 0);
  const photos = sbGetFourTalentPhotos(sel);
  const curSlide = photos[(p.slideIndex || 0) % photos.length] || photos[0];
  const heroImg = photos[0]?.src || '/assets/t1.jpg';
  const extUrl = sel ? safeExternalUrl(sel.portfolioUrl) : '';
  const inc = p.includeSections || {};
  const layout = p.layout || 'editorial';

  const sectionChecks = [
    ['heroCover', 'Hero Cover'],
    ['aboutTalent', 'About the Talent'],
    ['portfolioShots', 'Portfolio (Final Shots)'],
    ['sceneCollections', 'Scene Collections'],
    ['experienceCredits', 'Experience & Credits'],
    ['contactCollab', 'Contact & Collaborations']
  ];

  let settingsBody = '';
  if (p.settingsTab === 'layout') {
    settingsBody =
      `<span class="sb-spec-label">LAYOUT</span>` +
      `<div class="sb-s4-layout-opts">` +
        `<button type="button" class="${layout === 'editorial' ? 'is-active' : ''}" onclick="sbSetStage4Layout('editorial')"><strong>Editorial</strong><small>(Recommended)</small></button>` +
        `<button type="button" class="${layout === 'grid' ? 'is-active' : ''}" onclick="sbSetStage4Layout('grid')"><strong>Gallery</strong><small>Grid</small></button>` +
        `<button type="button" class="${layout === 'magazine' ? 'is-active' : ''}" onclick="sbSetStage4Layout('magazine')"><strong>Magazine</strong><small>Spread</small></button>` +
      `</div>`;
  } else if (p.settingsTab === 'style') {
    settingsBody = `<span class="sb-spec-label">STYLE DIRECTION</span><p class="sb-s4-style-note">${esc(b.colorDirection)} · ${esc(b.mood)}</p>`;
  } else {
    settingsBody = `<span class="sb-spec-label">CURATED SERIES</span><p class="sb-s4-style-note">${esc(b.projectTitle)} · ${scenes.length} Scenes · ${totalShots} Final Shots</p>`;
  }

  return `<div class="sb-s4-shell">` +
    `<div class="sb-summary-banner">` +
      `<div class="sb-summary-talent">` +
        `<img src="${esc(heroImg)}" alt="${esc(sel ? sel.name : 'Talent')}">` +
        `<div><strong>${esc(sel ? sel.name : 'Selected Talent')}</strong><small>${esc(sel ? (sel.craftTitle || sel.type) : b.category)}</small></div>` +
      `</div>` +
      `<div class="sb-summary-title"><h3 class="sb-serif-h3">Portfolio Presentation</h3><p>Curated selection of final photographs for the talent portfolio.</p></div>` +
      `<div class="sb-summary-metrics">` +
        `<div><strong>${totalShots}</strong><small>Final Shots</small></div>` +
        `<div><strong>${scenes.length}</strong><small>Scenes</small></div>` +
        `<div><strong>${esc(layout[0].toUpperCase() + layout.slice(1))}</strong><small>Format</small></div>` +
        `<div><strong>Ready</strong><small>to Publish</small></div>` +
      `</div>` +
    `</div>` +
    `<div class="sb-s4-grid">` +
      `<aside class="sb-s4-left">` +
        `<span class="sb-spec-label">PORTFOLIO COLLECTION</span>` +
        `<div class="sb-scene-cards">${scenes.map((sc, i) => {
          const isIncluded = (p.includedCollections || []).includes(sc.id);
          const cnt = (sc.shots && sc.shots.length) || 1;
          return `<div class="sb-scene-card ${i === (p.activeCollectionIndex || 0) ? 'is-active' : ''}" onclick="sbSelectStage4Collection(${i},false)">` +
            `<img src="${esc(sc.image)}" alt="${esc(sc.title)}">` +
            `<div class="sb-scene-card-body"><strong>${esc(sc.num)} ${esc(sc.title)}</strong><small>${cnt} Final Shots</small></div>` +
            `<button type="button" class="sb-coll-check ${isIncluded ? 'is-on' : ''}" aria-label="Toggle collection" onclick="event.stopPropagation();sbSelectStage4Collection(${i},true)">✓</button>` +
          `</div>`;
        }).join('')}</div>` +
      `</aside>` +
      `<div class="sb-s4-center sb-s4-layout--${esc(layout)}">` +
        `<div class="sb-s4-hero">` +
          `<img class="sb-s4-hero-img" src="${esc(curSlide.src)}" alt="${esc(curSlide.title)}">` +
          `<div class="sb-s4-hero-shade"></div>` +
          `<div class="sb-s4-hero-copy">` +
            `<span class="sb-eyebrow">${esc(b.projectTitle.toUpperCase())}</span>` +
            `<h2>${esc((sel ? sel.name : 'TALENT PORTFOLIO').toUpperCase())}</h2>` +
            `<p>${esc((sel ? (sel.craftTitle || sel.type) : b.category).toUpperCase())}</p>` +
            `<button type="button" class="sb-btn-outline" onclick="sbViewSelectedTalentProfile()">VIEW PORTFOLIO →</button>` +
          `</div>` +
          `<button type="button" class="sb-arrow-circle sb-arrow-left" aria-label="Previous slide" onclick="sbStepStage4Slide(-1)">‹</button>` +
          `<button type="button" class="sb-arrow-circle sb-arrow-right" aria-label="Next slide" onclick="sbStepStage4Slide(1)">›</button>` +
          `<span class="sb-counter-badge">${String((p.slideIndex || 0) + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}</span>` +
        `</div>` +
        `<div class="sb-s4-strip">${photos.map((ph, i) => `<button type="button" class="sb-s3-shot-thumb ${i === (p.slideIndex || 0) ? 'is-active' : ''}" onclick="sbSetStage4Slide(${i})"><img src="${esc(ph.src)}" alt="${esc(ph.title)}"></button>`).join('')}</div>` +
      `</div>` +
      `<aside class="sb-s4-right">` +
        `<span class="sb-spec-label">PORTFOLIO SETTINGS</span>` +
        `<div class="sb-pill-tabs" role="tablist">` +
          `<button type="button" class="${p.settingsTab === 'layout' ? 'is-active' : ''}" onclick="sbSetStage4Tab('layout')">Layout</button>` +
          `<button type="button" class="${p.settingsTab === 'style' ? 'is-active' : ''}" onclick="sbSetStage4Tab('style')">Style</button>` +
          `<button type="button" class="${p.settingsTab === 'content' ? 'is-active' : ''}" onclick="sbSetStage4Tab('content')">Content</button>` +
        `</div>` +
        settingsBody +
        `<span class="sb-spec-label sb-mt-14">INCLUDE SECTIONS</span>` +
        `<div class="sb-s4-checks">${sectionChecks.map(([k, lbl]) => `<label class="sb-s4-check"><input type="checkbox" ${inc[k] ? 'checked' : ''} onchange="sbToggleStage4Section('${k}')"><span>${esc(lbl)}</span></label>`).join('')}</div>` +
      `</aside>` +
    `</div>` +
    `<div class="sb-s4-bottom-cards">` +
      `<div class="sb-s4-bottom-card">` +
        `<div class="sb-s4-bottom-head"><span class="sb-spec-label">ABOUT THE TALENT</span><button type="button" class="sb-btn-ghost sb-btn-sm" onclick="sbToggleStage4Edit('about')">Edit</button></div>` +
        (sbStage4EditingBlock === 'about'
          ? `<form class="sb-inline-edit" onsubmit="sbSaveStage4About(event)"><textarea name="aboutText" rows="2">${esc(b.description)}</textarea><button type="submit" class="sb-btn-ivory">Save</button></form>`
          : `<div class="sb-s4-about-row"><img src="${esc(heroImg)}" alt="${esc(sel ? sel.name : 'Talent')}"><p>${esc(sel?.canViewAbout && sel.aboutAmbitions ? sel.aboutAmbitions : b.description)}</p></div>`) +
      `</div>` +
      `<div class="sb-s4-bottom-card">` +
        `<div class="sb-s4-bottom-head"><span class="sb-spec-label">PROJECT CREDITS</span><button type="button" class="sb-btn-ghost sb-btn-sm" onclick="sbToggleStage4Edit('credits')">Edit</button></div>` +
        (sbStage4EditingBlock === 'credits'
          ? `<form class="sb-s4-credits-form" onsubmit="sbSaveStage4Credits(event)"><input name="photography" value="${esc(p.credits.photography)}" placeholder="Photography"><input name="styling" value="${esc(p.credits.styling)}" placeholder="Styling"><input name="lighting" value="${esc(p.credits.lighting)}" placeholder="Lighting"><button type="submit" class="sb-btn-ivory">Save</button></form>`
          : `<div class="sb-s4-credits-list">` +
              `<div><span>Photography</span><strong>${esc(p.credits.photography)}</strong></div>` +
              `<div><span>Styling</span><strong>${esc(p.credits.styling)}</strong></div>` +
              `<div><span>Lighting</span><strong>${esc(p.credits.lighting)}</strong></div>` +
              (extUrl ? `<div><span>Portfolio URL</span><a href="${esc(extUrl)}" target="_blank" rel="noopener noreferrer">Open Link ↗</a></div>` : '') +
            `</div>`) +
      `</div>` +
    `</div>` +
    `<div class="sb-stage-footer-nav">` +
      `<button type="button" class="sb-stage-btn sb-stage-btn--prev" onclick="setStoryboardStage(2)">← Previous Stage</button>` +
      `<button type="button" class="sb-stage-btn sb-stage-btn--next" onclick="sbPublishPortfolio()">Publish Portfolio →</button>` +
    `</div>` +
  `</div>`;
}

function renderStoryboardStudio() {
  if (!sbTalentsLoaded && !sbTalentsLoading) {
    setTimeout(() => loadStoryboardTalents(false), 0);
  }
  const sel = getSelectedStoryboardTalent();
  const stageMeta = STORYBOARD_STAGE_META;
  const totalStages = stageMeta.length;
  const idx = ((activeStoryboardIndex % totalStages) + totalStages) % totalStages;
  const brief = sbProject.brief;
  const tIdx = sbGetSelectedTalentIndex();
  const prevDisabled = sbRegisteredTalents.length <= 1 || tIdx <= 0;
  const nextDisabled = sbRegisteredTalents.length <= 1 || tIdx >= sbRegisteredTalents.length - 1;

  const stageTabs = stageMeta.map((st, i) => {
    const active = i === idx;
    const done = i < idx;
    const sep = i < totalStages - 1
      ? `<span class="sb-stage-sep ${active ? 'is-muted' : ''}" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span>`
      : '';
    return `<button type="button" role="tab" aria-selected="${active}" class="sb-stage-pill ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}" onclick="setStoryboardStage(${i})">` +
      `<span class="sb-stage-num">${done ? '✓' : st.num}</span>` +
      `<span class="sb-stage-name">${esc(st.tabLabel)}</span>` +
    `</button>${sep}`;
  }).join('');

  let stageBody = '';
  if (idx === 0) stageBody = renderStoryboardStage1(sel);
  else if (idx === 1) stageBody = renderStoryboardStage2(sel);
  else if (idx === 2) stageBody = renderStoryboardStage3(sel);
  else stageBody = renderStoryboardStage4(sel);

  return `<div class="sb-studio-inner">` +
    `<div class="sb-header-row">` +
      `<div class="sb-header-left">` +
        `<div class="sb-title-line">` +
          `<h2>Storyboard Studio</h2>` +
          `<span class="sb-title-slash" aria-hidden="true">/</span>` +
          `<p>Plan your shoot, organise your scenes and bring your ideas to life.</p>` +
        `</div>` +
      `</div>` +
      `<div class="sb-header-actions">` +
        `<div class="sb-header-utils">` +
          `<button type="button" class="sb-util-btn" onclick="sbShareProject()">Share</button>` +
          `<button type="button" class="sb-util-btn" onclick="setStoryboardStage(3)">Preview</button>` +
          `<button type="button" class="sb-util-btn" onclick="sbExportPdf()">Export PDF</button>` +
        `</div>` +
        `<div class="sb-talent-nav" role="group" aria-label="Talent navigation">` +
          `<button type="button" class="sb-tool-btn" aria-label="Previous Talent" title="Previous Talent" onclick="stepStoryboardTalent(-1)" ${prevDisabled ? 'disabled' : ''}>‹</button>` +
          `<button type="button" class="sb-tool-btn" aria-label="Next Talent" title="Next Talent" onclick="stepStoryboardTalent(1)" ${nextDisabled ? 'disabled' : ''}>›</button>` +
        `</div>` +
      `</div>` +
    `</div>` +
    `<div class="sb-stage-bar" role="tablist" aria-label="Storyboard stages">${stageTabs}</div>` +
    stageBody +
  `</div>`;
}

function setStoryboardStage(index) {
  if (!sbConfirmDiscardIfDirty()) return;
  const total = STORYBOARD_STAGE_META.length;
  activeStoryboardIndex = ((index % total) + total) % total;
  sbDraftMoodboard = activeStoryboardIndex === 1 ? sbClone(sbProject.moodboard) : null;
  sbDraftScenes = activeStoryboardIndex === 2 ? sbClone(sbProject.scenes) : null;
  sbThreeDotOpen = false;
  sbDirty = false;
  sbStatusMessage = '';
  sbRefreshDom();
}

function stepStoryboardScene(delta) {
  sbSelectScene(activeSceneIndex + delta);
}

function initStoryboardApp() {
  const container = document.getElementById('storyboard');
  if (container) container.innerHTML = renderStoryboardStudio();
  loadStoryboardTalents(false);
}
window.addEventListener('DOMContentLoaded', initStoryboardApp);
