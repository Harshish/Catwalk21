<script>
  import '@fontsource/cormorant-garamond/latin-300.css';
  import '@fontsource/cormorant-garamond/latin-400.css';
  import '@fontsource/cormorant-garamond/latin-500.css';
  import '@fontsource/cormorant-garamond/latin-300-italic.css';
  import '@fontsource/cormorant-garamond/latin-400-italic.css';
  import '@fontsource-variable/manrope';
  import '@fontsource-variable/cinzel';
  import '@fontsource/tiro-devanagari-sanskrit/devanagari-400.css';
  import '@fontsource/didact-gothic/latin-400.css';
  import { onMount } from 'svelte';
  import { animate, inView, scroll, stagger } from 'motion';
  import ScissorsIcon from 'phosphor-svelte/lib/ScissorsIcon';
  import SparkleIcon from 'phosphor-svelte/lib/SparkleIcon';
  import FlowerLotusIcon from 'phosphor-svelte/lib/FlowerLotusIcon';
  import HeartIcon from 'phosphor-svelte/lib/HeartIcon';
  import PhoneIcon from 'phosphor-svelte/lib/PhoneIcon';
  import MapPinIcon from 'phosphor-svelte/lib/MapPinIcon';
  import EnvelopeSimpleIcon from 'phosphor-svelte/lib/EnvelopeSimpleIcon';
  import FacebookLogoIcon from 'phosphor-svelte/lib/FacebookLogoIcon';
  import InstagramLogoIcon from 'phosphor-svelte/lib/InstagramLogoIcon';
  import GoogleLogoIcon from 'phosphor-svelte/lib/GoogleLogoIcon';
  import QuotesIcon from 'phosphor-svelte/lib/QuotesIcon';
  import ArrowUpIcon from 'phosphor-svelte/lib/ArrowUpIcon';
  import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
  import SunIcon from 'phosphor-svelte/lib/SunIcon';
  import MoonIcon from 'phosphor-svelte/lib/MoonIcon';
  import PauseIcon from 'phosphor-svelte/lib/PauseIcon';
  import PlayIcon from 'phosphor-svelte/lib/PlayIcon';
  import ListIcon from 'phosphor-svelte/lib/ListIcon';
  import XIcon from 'phosphor-svelte/lib/XIcon';

  // Photos without a bg* name are Unsplash stock placeholders; see README for sources.
  // Nine-lobed Mughal (jharokha) arch in a 100×125 box. It both masks each service photo and draws
  // its gold frame; bells hang from the lobe cusps at x = 14.04 and 85.96.
  const archPath = 'M0 125V56H3.5V54A14.6 14.6 0 0 1 6.2 37.03A14.6 14.6 0 0 1 14.04 21.75A14.6 14.6 0 0 1 26.25 9.65A14.6 14.6 0 0 1 41.61 1.95A14.27 14.27 0 0 1 58.39 1.95A14.6 14.6 0 0 1 73.75 9.65A14.6 14.6 0 0 1 85.96 21.75A14.6 14.6 0 0 1 93.8 37.03A14.6 14.6 0 0 1 96.5 54V56H100V125Z';
  const archMask = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 100 126' preserveAspectRatio='none'><path d='${archPath}'/></svg>`)}")`;
  // ०१, ०२ … in Devanagari digits, for any number of services.
  const devanagariIndex = (/** @type {number} */ index) => (index + 1).toLocaleString('hi-IN-u-nu-deva', { minimumIntegerDigits: 2 });

  const services = [
    { name: 'Hair', sanskrit: 'केशः', transliteration: 'keśaḥ', meaning: 'tresses', icon: ScissorsIcon, description: 'Cuts, colour, smoothing and styling made to suit your texture, mood and routine.', image: '/img/bg3.jpg', width: 1600, height: 1068, alt: 'Stylist shaping a short haircut', details: 'Cuts · Colour · Styling', position: '45% center' },
    { name: 'Skin care', sanskrit: 'कान्तिः', transliteration: 'kāntiḥ', meaning: 'radiance', icon: SparkleIcon, description: 'Thoughtful care that leaves your skin looking fresh, bright and cared for.', image: '/img/bg11.jpg', width: 1600, height: 1066, alt: 'Beauty portrait surrounded by fresh citrus', details: 'Refresh · Care · Glow', position: '60% center' },
    { name: 'Spa', sanskrit: 'विश्रान्तिः', transliteration: 'viśrāntiḥ', meaning: 'repose', icon: FlowerLotusIcon, description: 'Slow down with restorative treatments and a little room to breathe.', image: '/img/bg8.jpg', width: 1600, height: 1066, alt: 'Relaxing hot stone spa treatment', details: 'Unwind · Restore · Recharge', position: 'center' },
    { name: 'Bridal', sanskrit: 'मङ्गलम्', transliteration: 'maṅgalam', meaning: 'auspiciousness', icon: HeartIcon, description: 'A beautifully considered look for your most memorable celebration.', image: '/img/bridal-portrait.jpg', width: 1000, height: 1500, alt: 'Bride in a red lehenga with a gold maang tikka and choker', details: 'Makeup · Hair · Finishing touches', position: 'center 30%' }
  ];

  // Listing IDs come from the Google Maps embeds on the original site.
  const branches = [
    { name: 'Thakur Complex', address: 'Shop 37, Vasant Smruti CHS Ltd., Near Surbhi Hotel, 90ft Road, Thakur Complex, Kandivali East, Mumbai 400101', phone: '8452032889', tel: '+918452032889', cid: '1772599461488886969' },
    { name: 'Thakur Village', address: 'Shop 58, Evershine Moon CHS 72, behind Evershine Crown, Thakur Village, Kandivali East, Mumbai 400101', phone: '9004960045', tel: '+919004960045', cid: '8788651649671816183' }
  ];

  const gallery = [
    { image: '/img/salon-interior.jpg', width: 843, height: 1500, alt: 'Salon chairs facing arched mirrors', label: 'The studio' },
    { image: '/img/kundan-look.jpg', width: 934, height: 1400, alt: 'Smiling woman in kundan jewellery and a pink lehenga', label: 'Occasion glam' },
    { image: '/img/grooming.jpg', width: 933, height: 1400, alt: 'Barber styling a man’s hair with a dryer', label: 'Grooming' },
    { image: '/img/bridal-makeup.jpg', width: 931, height: 1400, alt: 'Close-up of bridal eye makeup and a pearl nath', label: 'Bridal' },
    { image: '/img/bg9.jpg', width: 1400, height: 933, alt: 'Makeup brushes laid out on a black roll', label: 'Makeup' },
    { image: '/img/mehendi-detail.jpg', width: 933, height: 1400, alt: 'Hand covered in intricate bridal mehendi', label: 'Mehendi' }
  ];

  const ritual = [
    { title: 'Consult', text: 'We listen first: your hair, your skin, your routine and the occasion ahead.' },
    { title: 'Craft', text: 'Unhurried work from hands that care about every last detail.' },
    { title: 'Finish', text: 'You leave with a look you love and know how to keep.' }
  ];

  const statement = 'Whether you keep it simple or go all out, we make room for the version of you that feels most like'.split(' ');
  const marquee = [...services, { name: 'Colour', icon: SparkleIcon }, { name: 'Styling', icon: ScissorsIcon }];
  const instagram = 'https://www.instagram.com/catwalk21salon/';
  const facebook = 'https://www.facebook.com/salon.spa.mumbai/';
  // Canonical host; www.catwalk21salon.com redirects here (static/.htaccess).
  const site = 'https://catwalk21salon.com/';
  const title = 'Catwalk 21 | Luxury Salon & Spa in Kandivali East, Mumbai';
  const description = 'Luxury unisex salon and spa in Kandivali East, Mumbai. Hair, skin care, spa and bridal makeup at our Thakur Complex and Thakur Village branches. Call to book.';
  // Business facts only: no ratings, prices or opening hours until they are verified.
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${site}#organization`, name: 'Catwalk 21 Salon & Spa', url: site, logo: `${site}img/catwalk21_cat_logo_black.svg`, email: 'customercare@catwalk21salon.com', sameAs: [instagram, facebook] },
      ...branches.map((branch) => ({
        '@type': 'BeautySalon',
        '@id': `${site}#${branch.name.toLowerCase().replace(' ', '-')}`,
        name: `Catwalk 21 Salon & Spa, ${branch.name}`,
        parentOrganization: { '@id': `${site}#organization` },
        url: `${site}#branches`,
        image: `${site}img/og-image.jpg`,
        telephone: branch.tel,
        hasMap: `https://www.google.com/maps?cid=${branch.cid}`,
        address: { '@type': 'PostalAddress', streetAddress: branch.address.split(', Kandivali East')[0], addressLocality: 'Kandivali East, Mumbai', addressRegion: 'Maharashtra', postalCode: '400101', addressCountry: 'IN' },
        areaServed: 'Kandivali, Mumbai',
        sameAs: [instagram, facebook]
      }))
    ]
  }).replace(/</g, '\\u003c');
  const navLinks = [['Services', '#services'], ['Bridal', '#bridal'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Visit', '#branches']];

  let marqueePaused = $state(false);
  let dark = $state(false);
  let scrollY = $state(0);
  let showCallBar = $state(false);
  /** @type {HTMLElement | undefined} */
  let menu = $state();
  const scrolled = $derived(scrollY > 40);
  function toggleTheme() { window.dispatchEvent(new Event('toggle-theme')); }

  onMount(() => {
    const syncTheme = () => { dark = document.documentElement.dataset.theme === 'dark'; };
    syncTheme();
    window.addEventListener('themechange', syncTheme);
    const hero = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(([entry]) => { showCallBar = !entry.isIntersecting; });
    if (hero) heroObserver.observe(hero);

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const ease = /** @type {const} */ ([.22, 1, .36, 1]);
    /** @type {(() => void)[]} */
    let cleanups = [];
    const syncMotion = () => {
      cleanups.forEach((stop) => stop());
      cleanups = [];
      // Hide reveal targets up front only when they will be animated in.
      document.documentElement.classList.toggle('motion-ok', !preference.matches);
      if (preference.matches) return;
      const progress = animate('.progress', { scaleX: [0, 1] }, { ease: 'linear' });
      cleanups.push(scroll(progress), () => progress.cancel());
      cleanups.push(inView('[data-reveal]', (element) => {
        const animation = animate(element, { opacity: [0, 1], y: [32, 0] }, { duration: .9, ease });
        cleanups.push(() => animation.cancel());
      }, { amount: .15 }));
      cleanups.push(inView('[data-stagger]', (element) => {
        const animation = animate([...element.children], { opacity: [0, 1], y: [40, 0] }, { duration: .9, delay: stagger(.1), ease });
        cleanups.push(() => animation.cancel());
      }, { amount: .1 }));
      // Gold linework (arch frames, diya dividers) traces itself in once it scrolls into view.
      cleanups.push(inView('[data-draw]', (element) => { element.classList.add('drawn'); }, { amount: .3 }));
      // Spinning mandalas, swinging bells and diya flames only animate while on screen.
      cleanups.push(inView('.mandala, .arch-frame, .service-divider', (element) => {
        element.classList.add('live');
        return () => element.classList.remove('live');
      }, { margin: '200px' }));
      cleanups.push(() => document.querySelectorAll('.drawn, .live').forEach((element) => element.classList.remove('drawn', 'live')));
      // Photos unveil from the bottom edge while settling from a slight zoom. A fully clipped
      // element never intersects, so its parent is observed instead.
      document.querySelectorAll('[data-clip]').forEach((element) => {
        if (!element.parentElement) return;
        cleanups.push(inView(element.parentElement, () => {
          const frame = animate(element, { clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] }, { duration: 1.3, ease });
          const image = element.querySelector('img');
          const zoom = image && animate(image, { scale: [1.18, 1] }, { duration: 1.8, ease });
          cleanups.push(() => { frame.cancel(); zoom?.cancel(); });
        }, { amount: .2 }));
      });
      document.querySelectorAll('[data-parallax]').forEach((element) => {
        const distance = Number(element.getAttribute('data-parallax'));
        const animation = animate(element, { y: [-distance, distance] }, { ease: 'linear' });
        cleanups.push(scroll(animation, { target: element.parentElement ?? undefined, offset: ['start end', 'end start'] }), () => animation.cancel());
      });
      // Words of the statement light up one after another as it scrolls through view.
      const words = /** @type {HTMLElement[]} */ ([...document.querySelectorAll('.statement .word')]);
      const text = document.querySelector('.statement');
      if (text) {
        cleanups.push(scroll((/** @type {number} */ value) => {
          words.forEach((word, index) => { word.style.opacity = String(Math.min(1, Math.max(.16, value * words.length * 1.15 - index))); });
        }, { target: text, offset: ['start 85%', 'end 55%'] }), () => words.forEach((word) => { word.style.opacity = ''; }));
      }
      const line = document.querySelector('.care-line');
      if (line) {
        const animation = animate(line, { scaleX: [0, 1] }, { ease: 'linear' });
        cleanups.push(scroll(animation, { target: line, offset: ['start 90%', 'start 50%'] }), () => animation.cancel());
      }
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => {
      cleanups.forEach((stop) => stop());
      heroObserver.disconnect();
      preference.removeEventListener('change', syncMotion);
      window.removeEventListener('themechange', syncTheme);
    };
  });
</script>

<svelte:window bind:scrollY />

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={site} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:site_name" content="Catwalk 21 Salon & Spa" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={site} />
  <meta property="og:image" content={`${site}img/og-image.jpg`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Bride in a red lehenga with mehendi and bridal bangles" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="geo.region" content="IN-MH" />
  <meta name="geo.placename" content="Kandivali East, Mumbai" />
  {@html `<script type="application/ld+json">${schema}</` + 'script>'}
</svelte:head>

{#snippet brandMark()}
  <span class="brand-mark" aria-hidden="true">
    <img class="logo-light" src="/img/catwalk21_cat_logo_black.svg" alt="" width="36" height="48" />
    <img class="logo-dark" src="/img/catwalk21_cat_logo_white.svg" alt="" width="36" height="48" />
  </span>
  <span class="wordmark">Catwalk <span>21</span><small>Salon & Spa</small></span>
{/snippet}

<!-- Decorative mandala: four stacked SVG rings (rangoli border, paisley + lotus, kolam chain, bindu core).
     Each ring is its own <svg> so counter-rotation stays on the compositor instead of repainting. -->
{#snippet mandala(/** @type {string} */ variant)}
  <div class={`mandala ${variant}`} aria-hidden="true">
    <svg class="r1" viewBox="-100 -100 200 200">
      <circle r="97" /><circle r="93" stroke-dasharray=".1 2.8" stroke-width="1.2" />
      {#each Array(32) as _, i}<g transform={`rotate(${i * 11.25})`}><path d="M-9 -91Q0 -101 9 -91" /><circle class="dot" cy="-98.6" r=".9" /></g>{/each}
      {#each Array(24) as _, i}<g transform={`rotate(${i * 15}) translate(0 -82) scale(1.3)`}><path class="haldi" d="M0 5C-5 5-6-1-3-3.5C-1-5 1-6 .5-9C4-7.5 5.5-3 4.5.5C3.8 3.3 2 5 0 5Z" /><circle class="kumkum-solid" cx=".6" cy=".6" r="1.4" /></g>{/each}
      <circle r="74" />
    </svg>
    <svg class="r2" viewBox="-100 -100 200 200">
      {#each Array(16) as _, i}<g transform={`rotate(${i * 22.5})`}><path class="kumkum" d="M0-72C10-62 11-53 0-45C-11-53-10-62 0-72Z" /><path class="haldi" d="M0-66C5-60 5-54 0-50C-5-54-5-60 0-66Z" /><circle class="dot" cy="-69" r="1.1" transform="rotate(11.25)" /></g>{/each}
      <circle r="44" /><circle r="41" stroke-dasharray=".1 2.2" stroke-width="1" />
    </svg>
    <svg class="r3" viewBox="-100 -100 200 200">
      {#each Array(12) as _, i}<g transform={`rotate(${i * 30})`}><circle cy="-30" r="10" /><circle class="dot" cy="-30" r=".9" /></g>{/each}
      <circle r="21" />
    </svg>
    <svg class="r4" viewBox="-100 -100 200 200">
      {#each Array(8) as _, i}<path class="kumkum" transform={`rotate(${i * 45})`} d="M0-19C6-13 6-8 0-4C-6-8-6-13 0-19Z" /><path class="haldi" transform={`rotate(${i * 45 + 22.5})`} d="M0-15C3-12 3-9 0-6C-3-9-3-12 0-15Z" />{/each}
      <circle class="haldi" r="3.6" /><circle class="kumkum-solid" r="1.6" />
    </svg>
  </div>
{/snippet}

<a class="skip-link" href="#main-content">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<header class="site-header" class:scrolled>
  <a href="#top" class="brand" aria-label="Catwalk 21 home">{@render brandMark()}</a>
  <nav aria-label="Main navigation">
    {#each navLinks.slice(0, 4) as [label, href]}<a class="nav-link" {href}>{label}</a>{/each}
    <a class="pill" href="#branches"><PhoneIcon size={17} aria-hidden="true" />Call a branch</a>
    <button class="icon-button" type="button" onclick={toggleTheme} aria-label="Dark theme" aria-pressed={dark} title={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
      {#if dark}<SunIcon size={20} aria-hidden="true" />{:else}<MoonIcon size={20} aria-hidden="true" />{/if}
    </button>
    <button class="icon-button menu-toggle" type="button" popovertarget="menu" aria-label="Open menu"><ListIcon size={22} aria-hidden="true" /></button>
  </nav>
</header>

<div id="menu" class="menu" popover bind:this={menu}>
  <button class="icon-button menu-close" type="button" popovertarget="menu" popovertargetaction="hide" aria-label="Close menu"><XIcon size={22} aria-hidden="true" /></button>
  <nav aria-label="Menu">
    {#each navLinks as [label, href], index}<a {href} style={`--i: ${index}`} onclick={() => menu?.hidePopover()}><span>0{index + 1}</span>{label}</a>{/each}
  </nav>
  <a class="menu-social" href={instagram} target="_blank" rel="noopener noreferrer"><InstagramLogoIcon size={20} aria-hidden="true" />@catwalk21salon</a>
</div>

<main id="main-content" tabindex="-1">
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="jaali" aria-hidden="true"></div>
    <div class="hero-inner wrap">
      <div class="hero-copy">
        <p class="eyebrow entrance" style="--delay: 0ms"><span class="rule"></span>Luxury salon & spa · Kandivali, Mumbai</p>
        <h1 id="hero-title"><span class="title-line"><span>Made for your</span></span><span class="title-line"><em>main character</em></span><span class="title-line"><span>moment.</span></span></h1>
        <p class="hero-intro entrance" style="--delay: 350ms">A women-forward beauty and wellness space, warmly welcoming everyone. Come in for a new look, a quiet reset, or your next big occasion.</p>
        <div class="actions entrance" style="--delay: 450ms">
          <a class="button" href="#services"><ScissorsIcon size={19} aria-hidden="true" />Explore services</a>
          <a class="link" href="#branches"><MapPinIcon size={19} aria-hidden="true" />Find your branch</a>
        </div>
        <a class="review-shortcut entrance" style="--delay: 550ms" href="#reviews"><span class="google-label"><GoogleLogoIcon size={18} aria-hidden="true" />Google reviews</span><span>Get to know us through our guests</span></a>
      </div>
      <div class="hero-visual">
        {@render mandala('mandala-hero')}
        <div class="arch-outline" aria-hidden="true"></div>
        <div class="hero-arch"><img src="/img/hero-bride.jpg" alt="Bride in a red dupatta with kundan jewellery and mehendi" width="1200" height="1800" fetchpriority="high" data-parallax="28" /></div>
        <span class="hero-badge entrance" style="--delay: 900ms"><SparkleIcon size={18} weight="fill" aria-hidden="true" />Hair · Skin · Spa · Bridal</span>
      </div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span>Scroll</div>
  </section>

  <section class="marquee" class:paused={marqueePaused} aria-label="Hair, skin care, spa, bridal, colour and styling">
    <div class="marquee-window" aria-hidden="true">
      <div class="marquee-track">
        {#each [0, 1] as _}
          <div class="marquee-group">{#each marquee as item}<span>{item.name}</span><item.icon size={24} weight="light" />{/each}</div>
        {/each}
      </div>
    </div>
    <button class="marquee-toggle" type="button" onclick={() => (marqueePaused = !marqueePaused)} aria-label={marqueePaused ? 'Resume service marquee' : 'Pause service marquee'}>
      {#if marqueePaused}<PlayIcon size={16} weight="fill" aria-hidden="true" />{:else}<PauseIcon size={16} weight="fill" aria-hidden="true" />{/if}
    </button>
  </section>

  <section class="welcome section wrap" aria-labelledby="welcome-title">
    <p class="eyebrow" data-reveal><span class="rule"></span>Our kind of care</p>
    <h2 id="welcome-title" class="statement">{#each statement as word}<span class="word">{word}</span>{" "}{/each}<em class="word">you.</em></h2>
    <div class="care-line" aria-hidden="true"></div>
    <p class="welcome-note" data-reveal>From everyday hair and skin rituals to bridal finishing touches, Catwalk 21 brings a considered touch to every visit.</p>
  </section>

  <section id="services" class="services section" aria-labelledby="services-title">
    <div class="wrap">
      <div class="section-heading" data-reveal><div><p class="eyebrow"><span class="rule"></span>What we offer</p><h2 id="services-title">A little something<br />for <em>every mood.</em></h2></div><div class="sutra-block"><p class="sutra"><span lang="sa">सत्यं शिवं सुन्दरम्</span><small>Truth · Goodness · Beauty</small></p><p>Everyday rituals. Special occasions. A considered touch, every time.</p></div></div>
      <div class="service-list" style={`--arch-mask: ${archMask}`}>
        {#each services as service, index}
          {#if index}
            <svg class="service-divider" viewBox="-60 -16 120 28" aria-hidden="true" data-draw>
              <path class="draw" pathLength="1" d="M-58 6H-18M58 6H18" /><circle class="dot" cx="-14" cy="6" r="1.4" /><circle class="dot" cx="14" cy="6" r="1.4" />
              <path class="diya" d="M-9 3H9C8 9 4 11 0 11C-4 11-8 9-9 3ZM9 3L12 1" /><path class="flame" d="M0-14C4-8 4-3 0 1C-4-3-4-8 0-14Z" />
            </svg>
          {/if}
          <article class="service-card" id={`service-${index}`}>
            <div class="service-visual">
              {@render mandala('mandala-service')}
              <figure class="service-photo" data-clip><img src={service.image} alt={service.alt} width={service.width} height={service.height} loading="lazy" style={`object-position: ${service.position}`} data-parallax="22" /></figure>
              <svg class="arch-frame" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true" data-draw><path class="draw" pathLength="1" d={archPath} /><path class="draw" pathLength="1" d="M-2.5 52V127M102.5 52V127M-4.5 52H8M92 52H104.5M-4 127H104M-5.5 130H105.5M-7 133H107" /><g class="kalash"><path d="M50-1V-2.5M47.5-3.2H52.5M48-4C47.2-5.8 48.3-7.4 50-7.4C51.7-7.4 52.8-5.8 52-4ZM48.8-7.8H51.2" /><circle cy="-9.2" cx="50" r=".9" /></g>{#each [14.04, 85.96] as x}<g class="bell"><path d={`M${x} 21.75V28`} /><path d={`M${x - 1.6} 31C${x - 1.6} 28.6 ${x - .9} 28 ${x} 28C${x + .9} 28 ${x + 1.6} 28.6 ${x + 1.6} 31Z`} /><circle cx={x} cy="31.7" r=".5" /></g>{/each}</svg>
            </div>
            <div class="service-copy" data-reveal>
              <span class="service-index" aria-hidden="true">{devanagariIndex(index)}</span>
              <p class="sanskrit"><span lang="sa">{service.sanskrit}</span><small>{service.transliteration} · {service.meaning}</small></p>
              <p class="eyebrow"><service.icon size={18} aria-hidden="true" />{service.details}</p>
              <div class="service-title"><h3>{service.name}</h3><a class="round-link" href="#branches" aria-label={`Enquire about ${service.name}`}><ArrowUpRightIcon size={22} aria-hidden="true" /></a></div>
              <p>{service.description}</p>
            </div>
          </article>
        {/each}
      </div>
      <p class="service-help" data-reveal>Not sure where to start? <a href="#branches">Call your nearest salon. We’ll talk it through.</a></p>
    </div>
  </section>

  <section id="bridal" class="bridal section" aria-labelledby="bridal-title">
    <div class="jaali" aria-hidden="true"></div>
    <div class="wrap bridal-inner">
      <div class="bridal-visual">
        <figure class="bridal-main" data-clip><img src="/img/bg12.jpg" alt="Bride in a red lehenga with mehendi and bridal bangles" width="2000" height="1333" loading="lazy" /></figure>
        <figure class="bridal-inset" data-parallax="-50"><img src="/img/mehendi.jpg" alt="Hands with detailed bridal mehendi" width="1600" height="1066" loading="lazy" /></figure>
      </div>
      <div class="bridal-copy" data-reveal>
        <p class="eyebrow"><span class="rule"></span>Bridal & occasions</p>
        <h2 id="bridal-title">Every function.<br /><em>Every look, yours.</em></h2>
        <p>From the haldi glow to the sangeet and the pheras, we plan bridal makeup and hair around your outfits, your jewellery and the moments that matter most.</p>
        <ul class="bridal-points">
          <li><span>01</span>Makeup</li>
          <li><span>02</span>Hair</li>
          <li><span>03</span>Finishing touches</li>
        </ul>
        <a class="button" href="#branches"><HeartIcon size={19} aria-hidden="true" />Plan your bridal look</a>
      </div>
    </div>
  </section>

  <section id="gallery" class="gallery section" aria-labelledby="gallery-title">
    <div class="wrap">
      <div class="section-heading" data-reveal><div><p class="eyebrow"><span class="rule"></span>On the gram</p><h2 id="gallery-title">Looks we <em>love.</em></h2></div><a class="link" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow @catwalk21salon on Instagram (opens in a new tab)"><InstagramLogoIcon size={20} aria-hidden="true" />Follow @catwalk21salon</a></div>
      <div class="gallery-grid" data-stagger>
        {#each gallery as photo}
          <figure class="tile"><img src={photo.image} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><figcaption aria-hidden="true">{photo.label}</figcaption></figure>
        {/each}
      </div>
    </div>
  </section>

  <section class="ritual section" aria-labelledby="ritual-title">
    <div class="ritual-bg" aria-hidden="true"><img src="/img/bg10.jpg" alt="" width="2000" height="1329" loading="lazy" data-parallax="70" /></div>
    <div class="wrap">
      <div class="section-heading" data-reveal><div><p class="eyebrow"><span class="rule"></span>The Catwalk ritual</p><h2 id="ritual-title">Unhurried care,<br /><em>start to finish.</em></h2></div></div>
      <ol class="ritual-steps" data-stagger>
        {#each ritual as step, index}<li><span class="step-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>{/each}
      </ol>
    </div>
  </section>

  <section id="reviews" class="reviews section" aria-labelledby="reviews-title">
    {@render mandala('mandala-reviews')}
    <div class="review-feature wrap" data-reveal>
      <div class="review-symbol"><QuotesIcon size={64} weight="fill" aria-hidden="true" /></div>
      <p class="eyebrow">The word around the neighbourhood</p>
      <h2 id="reviews-title">Our guests.<br /><em>Their own words.</em></h2>
      <p class="review-intro">A new look. A little time for yourself. Discover what a visit to Catwalk 21 feels like, through our guests’ experiences.</p>
      <!-- Publish testimonial excerpts only after verifying their text, author and source. -->
      <div class="review-source"><GoogleLogoIcon size={22} aria-hidden="true" /><span>Explore guest reviews on Google</span></div>
      <div class="review-links">
        {#each branches as branch}
          <a href={`https://www.google.com/maps?cid=${branch.cid}`} target="_blank" rel="noopener noreferrer" aria-label={`Read Google reviews for ${branch.name} (opens in a new tab)`}>{branch.name}<ArrowUpRightIcon size={18} aria-hidden="true" /></a>
        {/each}
      </div>
      <p class="review-note">Already visited? We’d love to hear your story, too.</p>
    </div>
  </section>

  <section class="visit-banner" aria-label="Our promise"><div class="wrap" data-reveal><p>Show up as you are.<br /><em>Leave feeling like yourself.</em></p><a class="button" href="#branches"><HeartIcon size={20} aria-hidden="true" />Find your moment</a></div></section>

  <section id="branches" class="section wrap" aria-labelledby="branches-title">
    <div class="section-heading" data-reveal><div><p class="eyebrow"><span class="rule"></span>Come see us</p><h2 id="branches-title">Your next little <em>escape.</em></h2></div><p>Two welcoming branches in Kandivali East. Pick the one closest to you and give us a call.</p></div>
    <div class="branch-grid" data-stagger>
      {#each branches as branch, index}
        <article class="branch-card"><p class="eyebrow">0{index + 1} / Kandivali East</p><h3>{branch.name}</h3><p class="address">{branch.address}</p><div class="actions"><a class="button" href={`tel:${branch.tel}`} aria-label={`Call ${branch.name} at ${branch.phone}`}><PhoneIcon size={19} aria-hidden="true" />Call {branch.phone}</a><a class="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Catwalk 21 ${branch.name} ${branch.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${branch.name} (opens in a new tab)`}><MapPinIcon size={19} aria-hidden="true" />Get directions</a></div></article>
      {/each}
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="jaali" aria-hidden="true"></div>
  {@render mandala('mandala-footer')}
  <div class="wrap">
    <div class="footer-inner">
      <div><a href="#top" class="brand" aria-label="Catwalk 21 home">{@render brandMark()}</a><p>Luxury salon & spa · Kandivali East, Mumbai</p></div>
      <div class="footer-links">
        <a href="mailto:customercare@catwalk21salon.com"><EnvelopeSimpleIcon size={20} aria-hidden="true" />Email us</a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)"><InstagramLogoIcon size={20} aria-hidden="true" />Instagram</a>
        <a href="https://www.facebook.com/salon.spa.mumbai/" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)"><FacebookLogoIcon size={20} aria-hidden="true" />Facebook</a>
        <a href="#top"><ArrowUpIcon size={20} aria-hidden="true" />Back to top</a>
      </div>
    </div>
    <p class="footer-legal">© {new Date().getFullYear()} Catwalk 21 Salon & Spa</p>
  </div>
</footer>

<nav class="call-bar" class:visible={showCallBar} aria-label="Quick call">
  {#each branches as branch}<a href={`tel:${branch.tel}`} aria-label={`Call ${branch.name}`}><PhoneIcon size={18} weight="fill" aria-hidden="true" />{branch.name.replace('Thakur ', '')}</a>{/each}
</nav>

<style>
  :global(:root) { --bg: #f7f1e8; --surface: #fffbf5; --tint: #efe5d6; --ink: #1a1412; --muted: #6b5e57; --gold: #7d5e27; --gold-soft: #a98448; --em: #7a1f3d; --border: #e3d7c6; --glow: #eadcc3; --shadow: rgb(26 20 18 / .16); --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'Manrope Variable', system-ui, sans-serif; --logo: 'Didact Gothic', 'Century Gothic', 'Manrope Variable', sans-serif; --kumkum: #b3243f; --haldi: #e0962a; --clay: #b5562c; --display: 'Cinzel Variable', 'Trajan Pro', Georgia, serif; --deva: 'Tiro Devanagari Sanskrit', 'Kohinoor Devanagari', 'Noto Serif Devanagari', 'Nirmala UI', serif; --ease: cubic-bezier(.22, 1, .36, 1); --gutter: clamp(1.25rem, 5vw, 5rem); color-scheme: light; }
  :global(:root[data-theme='dark']) { --bg: #12100e; --surface: #231d19; --tint: #1b1714; --ink: #f4ede3; --muted: #b5a898; --gold: #d4b37a; --gold-soft: #c8a46a; --em: #e2c089; --border: #3a3029; --glow: #2a1f17; --shadow: rgb(0 0 0 / .5); color-scheme: dark; }
  :global(*) { box-sizing: border-box; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--sans); -webkit-font-smoothing: antialiased; }
  /* Fine film grain keeps flat colour fields from looking digital. */
  :global(body)::after { content: ''; position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: .05; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  :global(a) { color: inherit; }
  :global(a:focus-visible), :global(button:focus-visible) { outline: 2px solid var(--gold); outline-offset: 5px; }
  :global([id]) { scroll-margin-top: 6rem; }
  :global(::selection) { background: var(--gold-soft); color: #12100e; }
  :global(svg) { flex-shrink: 0; }
  img { display: block; max-width: 100%; }
  figure { margin: 0; }
  p { line-height: 1.8; }
  h1, h2, h3, .visit-banner p { font-family: var(--serif); font-weight: 300; letter-spacing: -.02em; margin: 0; text-wrap: balance; }
  h2 { font-size: clamp(2.6rem, 1.4rem + 4vw, 5.6rem); line-height: 1.02; }
  h3 { font-size: clamp(2rem, 1.4rem + 1.8vw, 3.2rem); line-height: 1.1; font-weight: 400; }
  em { font-style: italic; color: var(--em); }
  .wrap { width: min(100% - var(--gutter) * 2, 1320px); margin-inline: auto; }
  .section { padding-block: clamp(5rem, 10vw, 9rem); }
  .eyebrow { display: flex; align-items: center; gap: .9rem; margin: 0 0 1.4rem; font: 600 .76rem var(--display); letter-spacing: .22em; text-transform: uppercase; text-wrap: balance; color: var(--gold); }
  .rule { display: block; width: 2.5rem; height: 1px; background: currentColor; transform-origin: left; }
  .progress { position: fixed; inset: 0 0 auto; z-index: 40; height: 2px; background: linear-gradient(90deg, #c8a46a, #ecd8a8, #c8a46a); transform: scaleX(0); transform-origin: left; }
  .skip-link { position: fixed; top: .5rem; left: 1rem; z-index: 50; transform: translateY(-200%); padding: 1rem; background: var(--ink); color: var(--bg); }
  .skip-link:focus { transform: none; }

  .site-header { position: fixed; inset: 0 0 auto; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem var(--gutter); transition: background .5s, padding .5s var(--ease), color .5s, border-color .5s; border-bottom: 1px solid transparent; }
  .site-header.scrolled { padding-block: .7rem; color: var(--ink); background: color-mix(in srgb, var(--bg) 82%, transparent); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4); border-color: var(--border); }
  .brand { display: inline-flex; align-items: center; gap: .65rem; text-decoration: none; flex-shrink: 0; }
  .brand-mark { position: relative; display: block; width: 30px; height: 42px; }
  .brand-mark img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
  .brand-mark .logo-dark { display: none; }
  :global([data-theme='dark']) .logo-light { display: none; }
  :global([data-theme='dark']) .brand-mark .logo-dark { display: block; }
  /* Didact Gothic: free (OFL) near-match for the Century Gothic-style lettering on the salon sign board. */
  .wordmark { font: 400 1.75rem/1 var(--logo); letter-spacing: .01em; }
  .wordmark > span { color: var(--gold-soft); }
  .wordmark small { display: block; margin-top: .35rem; font: 700 .52rem var(--sans); letter-spacing: .32em; text-transform: uppercase; opacity: .8; }
  nav { display: flex; align-items: center; gap: clamp(.6rem, 2vw, 2.2rem); font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
  nav a { text-decoration: none; }
  .nav-link { position: relative; padding-block: .9rem; }
  .nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: .55rem; height: 1px; background: var(--gold-soft); transform: scaleX(0); transform-origin: right; transition: transform .5s var(--ease); }
  .nav-link:hover::after, .nav-link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
  .pill, .icon-button { display: inline-flex; justify-content: center; align-items: center; min-height: 44px; border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 99px; background: transparent; color: inherit; transition: background .3s, color .3s, border-color .3s; }
  .pill { padding: .7rem 1.2rem; gap: .7rem; }
  .pill:hover, .icon-button:hover { background: #c8a46a; border-color: #c8a46a; color: #12100e; }
  .icon-button { width: 44px; flex-shrink: 0; cursor: pointer; }
  .menu-toggle { display: none; }

  .menu { background: var(--bg); color: var(--ink); position: fixed; inset: 0; width: 100%; height: 100%; max-width: none; max-height: none; margin: 0; padding: 6rem var(--gutter) 2.5rem; border: 0; overflow-y: auto; }
  .menu:popover-open { display: flex; flex-direction: column; justify-content: space-between; animation: fade .4s var(--ease); }
  .menu-close { position: absolute; top: 1.1rem; right: var(--gutter); }
  .menu nav { flex-direction: column; align-items: stretch; gap: 0; letter-spacing: 0; text-transform: none; }
  .menu nav a { display: flex; align-items: baseline; gap: 1rem; padding-block: .9rem; border-bottom: 1px solid var(--border); font: 300 clamp(2.4rem, 10vw, 3.6rem)/1.1 var(--serif); animation: entrance .7s calc(var(--i) * 60ms + 100ms) var(--ease) both; }
  .menu nav a span { font: 700 .7rem var(--sans); letter-spacing: .2em; color: var(--gold); }
  .menu-social { display: inline-flex; align-items: center; gap: .7rem; min-height: 44px; margin-top: 2rem; text-decoration: none; font-size: .85rem; color: var(--gold); }

  .jaali { position: absolute; inset: 0; pointer-events: none; opacity: .07; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cg fill='none' stroke='%23d4b37a' stroke-width='.8'%3E%3Ccircle cx='28' cy='28' r='19.8'/%3E%3Ccircle cx='0' cy='0' r='19.8'/%3E%3Ccircle cx='56' cy='0' r='19.8'/%3E%3Ccircle cx='0' cy='56' r='19.8'/%3E%3Ccircle cx='56' cy='56' r='19.8'/%3E%3C/g%3E%3C/svg%3E"); mask-image: radial-gradient(ellipse at 70% 40%, black, transparent 70%); }
  :global([data-theme='light']) .jaali { opacity: .16; }
  /* Kumkum red and haldi saffron give the gold linework its festive, hand-painted colour. */
  .mandala { position: absolute; pointer-events: none; aspect-ratio: 1; color: var(--gold-soft); }
  .mandala svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: .5; stroke-linecap: round; animation: spin var(--spin) linear infinite; }
  .mandala .r1 { --spin: 240s; } .mandala .r2 { --spin: 150s; animation-direction: reverse; }
  .mandala .r3 { --spin: 90s; } .mandala .r4 { --spin: 50s; animation-direction: reverse; }
  .mandala .dot { fill: currentColor; stroke: none; }
  .mandala .kumkum { fill: var(--kumkum); fill-opacity: .28; }
  .mandala .kumkum-solid { fill: var(--kumkum); stroke: none; }
  .mandala .haldi { fill: var(--haldi); fill-opacity: .4; }
  .mandala-hero { z-index: -1; inset: 50% auto auto 50%; width: 150%; margin: -75% 0 0 -75%; opacity: .42; animation: bloom 2.6s .2s var(--ease) both, breathe 9s 2.8s ease-in-out infinite alternate; }
  .mandala-reviews { top: 50%; left: 50%; width: min(720px, 120vw); margin: calc(min(720px, 120vw) / -2) 0 0 calc(min(720px, 120vw) / -2); opacity: .16; }
  .mandala-footer { bottom: -60%; right: -6rem; height: 150%; max-height: 26rem; opacity: .2; } /* sized from footer height so its top never clips */
  /* Mehendi-style scalloped lace hanging from the top edge of tinted sections. */
  .services, .gallery, .visit-banner { position: relative; }
  .services::before, .gallery::before, .visit-banner::before { content: ''; position: absolute; inset: 0 0 auto; height: 20px; pointer-events: none; opacity: .55; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20'%3E%3Cg fill='none' stroke='%23c8a46a' stroke-width='.8'%3E%3Cpath d='M0 1Q20 22 40 1'/%3E%3Cpath d='M8 1Q20 13 32 1'/%3E%3C/g%3E%3Cg fill='%23c8a46a'%3E%3Ccircle cx='20' cy='16' r='1.4'/%3E%3Ccircle cx='0' cy='4' r='1'/%3E%3Ccircle cx='40' cy='4' r='1'/%3E%3C/g%3E%3C/svg%3E") repeat-x top / 40px 20px; }

  .hero { position: relative; overflow: hidden; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding-block: 7rem 4rem; background: radial-gradient(ellipse 60% 50% at 75% 45%, var(--glow), transparent 70%), var(--bg); }
  .hero-inner { position: relative; display: grid; grid-template-columns: 1.15fr 1fr; align-items: center; gap: clamp(2rem, 6vw, 6rem); }
  h1 { font-size: clamp(3.4rem, 1rem + 6.2vw, 7.6rem); line-height: .98; letter-spacing: -.03em; }
  .title-line { display: block; overflow: hidden; padding-bottom: .1em; margin-bottom: -.1em; }
  .title-line > span, .title-line > em { display: block; animation: title-in 1.2s var(--ease) both; }
  .title-line:nth-child(2) > em { animation-delay: .12s; padding-left: .6em; }
  .title-line:nth-child(3) > span { animation-delay: .24s; }
  .entrance { animation: entrance 1s var(--delay, 0ms) var(--ease) both; }
  .hero .eyebrow .rule { animation: draw 1.2s .3s var(--ease) both; }
  .hero-intro { max-width: 30rem; margin-block: 2rem 2.2rem; color: var(--muted); font-size: clamp(.95rem, .85rem + .3vw, 1.08rem); }
  .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.8rem; }
  .button, .link { display: inline-flex; align-items: center; justify-content: center; min-height: 50px; gap: .9rem; font-size: .74rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; text-decoration: none; }
  .button { position: relative; isolation: isolate; overflow: hidden; padding: 1rem 1.7rem; border-radius: 99px; background: #c8a46a; color: #12100e; transition: transform .4s var(--ease), box-shadow .4s; }
  .button::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(110deg, transparent 30%, rgb(255 255 255 / .55) 50%, transparent 70%); transform: translateX(-120%); }
  .button :global(svg), .link :global(svg), .round-link :global(svg), .footer-links :global(svg), .icon-button :global(svg), .review-links :global(svg) { transition: transform .5s var(--ease); }
  .link { position: relative; padding-block: .4rem; }
  .link::after { content: ''; position: absolute; left: 0; right: 0; bottom: .6rem; height: 1px; background: var(--gold-soft); transform-origin: left; transition: transform .5s var(--ease); }
  .link:hover::after { transform: scaleX(.3); }
  .review-shortcut { display: inline-flex; flex-direction: column; gap: .35rem; margin-top: 2.6rem; padding-left: 1.1rem; border-left: 1px solid var(--border); color: var(--muted); font-size: .78rem; text-decoration: none; }
  .google-label { display: inline-flex; align-items: center; gap: .5rem; color: var(--ink); font-weight: 700; }
  .hero-visual { position: relative; isolation: isolate; justify-self: center; width: min(100%, 470px); padding: 1.2rem; animation: entrance 1.4s .15s var(--ease) both; }
  .arch-outline { position: absolute; inset: 0; border: 1px solid var(--gold-soft); border-radius: 999px 999px 0 0; opacity: .55; }
  .hero-arch { overflow: hidden; border-radius: 999px 999px 0 0; aspect-ratio: 2 / 3; background: var(--surface); animation: unveil 1.6s .2s var(--ease) both; }
  .hero-arch img { width: 100%; height: 112%; margin-top: -6%; object-fit: cover; object-position: center 20%; }
  .hero-badge { position: absolute; bottom: 2.5rem; left: -2.5rem; display: inline-flex; align-items: center; gap: .6rem; padding: .85rem 1.2rem; border-radius: 99px; background: color-mix(in srgb, var(--bg) 70%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--border); font-size: .68rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--ink); }
  .hero-badge :global(svg) { color: var(--gold); }
  .scroll-cue { position: absolute; left: 50%; bottom: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: .6rem; transform: translateX(-50%); font-size: .6rem; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: var(--muted); }
  .scroll-cue span { width: 1px; height: 2.6rem; background: linear-gradient(var(--gold), transparent); animation: cue 2.2s var(--ease) infinite; transform-origin: top; }

  .marquee { display: flex; align-items: center; gap: 1rem; padding: 1.2rem var(--gutter) 1.2rem 0; border-block: 1px solid var(--border); background: var(--tint); }
  .marquee-window { flex: 1; min-width: 0; overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent); }
  .marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
  .marquee-group { display: flex; flex-shrink: 0; align-items: center; justify-content: space-around; min-width: 100vw; gap: 2.4rem; padding-right: 2.4rem; }
  .marquee-group span { font: italic 300 clamp(1.8rem, 1rem + 2.4vw, 3.2rem) var(--serif); white-space: nowrap; }
  .marquee-group :global(svg) { color: var(--gold); }
  .marquee.paused .marquee-track { animation-play-state: paused; }
  .marquee-toggle { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border: 1px solid var(--border); border-radius: 50%; background: transparent; color: var(--ink); cursor: pointer; }
  .marquee-toggle:hover { border-color: var(--gold); color: var(--gold); }

  .statement { max-width: 1180px; font-size: clamp(2.3rem, 1.2rem + 3.6vw, 4.8rem); line-height: 1.12; text-wrap: pretty; }
  .word { transition: opacity .2s linear; }
  .care-line { height: 1px; margin-top: 3.5rem; background: linear-gradient(90deg, var(--gold-soft), transparent); transform-origin: left; }
  .welcome-note { max-width: 30rem; margin: 2rem 0 0 auto; color: var(--muted); }

  .services { background: var(--tint); overflow-x: clip; }
  /* Toran over the temple door: mango leaves and marigolds strung across the top of the section. */
  .services::before { height: 30px; opacity: .9; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='30'%3E%3Cpath d='M0 3Q24 9 48 3' fill='none' stroke='%23c8a46a' stroke-width='.8'/%3E%3Cpath d='M24 6C29 12 28 22 24 29C20 22 19 12 24 6Z' fill='%237d8a3c' fill-opacity='.55'/%3E%3Cpath d='M24 8V27' stroke='%23c8a46a' stroke-width='.5'/%3E%3Ccircle cx='0' cy='7' r='3.6' fill='%23e0962a'/%3E%3Ccircle cx='48' cy='7' r='3.6' fill='%23e0962a'/%3E%3Ccircle cx='0' cy='7' r='1.4' fill='%23b3243f'/%3E%3Ccircle cx='48' cy='7' r='1.4' fill='%23b3243f'/%3E%3C/svg%3E") repeat-x top / 48px 30px; }
  .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: clamp(3rem, 6vw, 5rem); }
  .section-heading > p { max-width: 21rem; color: var(--muted); margin: 0; }
  .service-list { display: grid; gap: clamp(2.5rem, 5vw, 4.5rem); }
  .service-card { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: clamp(2rem, 6vw, 7rem); }
  .service-card:nth-of-type(even) .service-visual { order: 2; }
  /* Each photo sits in a Mughal jharokha: a nine-lobed cusped arch with a gold frame and a mandala halo. */
  .service-visual { position: relative; isolation: isolate; padding: 14px; }
  .mandala-service { z-index: -1; top: -9%; left: 50%; width: 84%; margin-left: -42%; opacity: .26; transition: opacity .8s var(--ease); }
  .service-photo { position: relative; overflow: hidden; aspect-ratio: 4 / 5; background: var(--surface); mask: var(--arch-mask) center / 100% 100% no-repeat; }
  .service-photo img { width: 100%; height: 116%; margin-top: -8%; object-fit: cover; transition: scale 1.2s var(--ease); }
  .arch-frame { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; fill: none; stroke: var(--gold-soft); stroke-width: .35; pointer-events: none; transition: stroke .6s; }
  .draw { stroke-dasharray: 1; }
  :global(.motion-ok) [data-draw] .draw { stroke-dashoffset: 1; transition: stroke-dashoffset 2.4s .3s var(--ease); }
  :global(.motion-ok .drawn) .draw { stroke-dashoffset: 0; }
  .arch-frame .kalash { fill: color-mix(in srgb, var(--haldi) 45%, transparent); }
  .arch-frame .kalash circle, .arch-frame .bell path + path, .arch-frame .bell circle { fill: var(--gold-soft); }
  /* Temple bells hang from the arch cusps and sway slowly, each on its own beat. */
  .arch-frame .bell { transform-box: fill-box; transform-origin: 50% 0; animation: swing 3.4s ease-in-out infinite alternate; }
  .arch-frame .bell + .bell { animation-delay: -1.7s; }
  .service-divider { justify-self: center; width: min(320px, 70%); fill: none; stroke: var(--gold-soft); stroke-width: .8; stroke-linecap: round; overflow: visible; }
  .service-divider .dot { fill: var(--gold-soft); stroke: none; }
  .service-divider .diya { fill: color-mix(in srgb, var(--clay) 40%, transparent); }
  .service-divider .flame { fill: var(--haldi); stroke: none; transform-box: fill-box; transform-origin: 50% 100%; animation: flicker 1.6s ease-in-out infinite alternate; filter: drop-shadow(0 0 4px var(--haldi)); }
  /* Must follow the animation shorthands above, which would otherwise reset play-state to running. */
  .mandala svg, .arch-frame .bell, .service-divider .flame { animation-play-state: paused; }
  .mandala:global(.live) svg, .arch-frame:global(.live) .bell, .service-divider:global(.live) .flame { animation-play-state: running; }
  /* Sanskrit is set in Tiro Devanagari Sanskrit, a manuscript-style face drawn for classical texts. */
  [lang='sa'] { font-family: var(--deva); font-weight: 400; }
  .sanskrit { display: flex; align-items: baseline; flex-wrap: wrap; gap: .4rem .9rem; margin: 0 0 1rem; color: var(--em); font-size: clamp(1.5rem, 1.2rem + .8vw, 2rem); line-height: 1.4; }
  .sanskrit small, .sutra small { font: italic 400 1.05rem var(--serif); color: var(--muted); letter-spacing: .02em; }
  .sutra-block { max-width: 21rem; }
  .sutra-block > p:last-child { color: var(--muted); margin: 0; }
  .sutra { display: flex; flex-direction: column; gap: .2rem; margin: 0 0 1.2rem; padding-left: 1rem; border-left: 2px solid var(--gold-soft); color: var(--gold); font-size: 1.35rem; }
  .service-copy { position: relative; max-width: 30rem; }
  .service-index { display: block; margin-bottom: 1.5rem; font: 400 clamp(4.5rem, 3rem + 4vw, 8rem)/.9 var(--deva); color: transparent; -webkit-text-stroke: 1px var(--gold-soft); }
  .service-copy .eyebrow { gap: .6rem; letter-spacing: .18em; }
  .service-title { display: flex; align-items: center; justify-content: space-between; gap: 1rem; position: relative; padding-bottom: 1.2rem; background: linear-gradient(90deg, var(--gold-soft), transparent 85%) bottom / 100% 1px no-repeat; }
  .service-title::after { content: ''; position: absolute; left: 0; bottom: -3px; width: 7px; height: 7px; rotate: 45deg; background: var(--gold-soft); }
  .round-link { display: grid; place-items: center; width: 54px; height: 54px; flex-shrink: 0; border: 1px solid var(--border); border-radius: 50%; text-decoration: none; transition: background .4s, color .4s, border-color .4s; }
  .round-link:hover, .round-link:focus-visible { background: #c8a46a; border-color: #c8a46a; color: #12100e; }
  .service-copy > p:last-child { color: var(--muted); margin: 1.2rem 0 0; }
  .service-help { text-align: center; margin: clamp(4rem, 8vw, 6rem) 0 0; color: var(--muted); }
  .service-help a { color: var(--ink); text-underline-offset: .35em; text-decoration-color: var(--gold-soft); }

  .bridal { position: relative; overflow: hidden; }
  .bridal-inner { position: relative; display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; gap: clamp(3rem, 7vw, 7rem); }
  .bridal-visual { position: relative; padding: 0 12% 12% 0; }
  .bridal-main { overflow: hidden; border-radius: 4px; aspect-ratio: 4 / 5; }
  .bridal-main img { width: 100%; height: 100%; object-fit: cover; object-position: 28% center; }
  .bridal-inset { position: absolute; right: 0; bottom: 0; width: 46%; aspect-ratio: 3 / 4; overflow: hidden; border-radius: 999px 999px 0 0; border: 6px solid var(--bg); box-shadow: 0 30px 60px var(--shadow); }
  .bridal-inset img { width: 100%; height: 100%; object-fit: cover; }
  .bridal-copy > p:not(.eyebrow) { color: var(--muted); margin: 2rem 0; max-width: 32rem; }
  .bridal-points { display: grid; gap: 0; margin: 0 0 2.5rem; padding: 0; list-style: none; }
  .bridal-points li { display: flex; align-items: baseline; gap: 1.2rem; padding-block: 1rem; border-bottom: 1px solid var(--border); font: 400 1.6rem var(--serif); }
  .bridal-points span { font: 700 .65rem var(--sans); letter-spacing: .2em; color: var(--gold); }

  .gallery { background: var(--tint); }
  .gallery-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: clamp(180px, 22vw, 320px); gap: clamp(.75rem, 1.5vw, 1.25rem); }
  .tile { position: relative; overflow: hidden; border-radius: 4px; background: var(--surface); }
  .tile:nth-child(1), .tile:nth-child(4) { grid-row: span 2; }
  .tile:nth-child(1) { border-radius: 999px 999px 4px 4px; }
  .tile img { width: 100%; height: 100%; object-fit: cover; transition: scale 1.2s var(--ease); }
  .tile figcaption { position: absolute; inset: auto 0 0; padding: 3rem 1.2rem 1.1rem; background: linear-gradient(transparent, rgb(18 16 14 / .75)); color: #f4ede3; font: italic 400 1.4rem var(--serif); opacity: 0; transform: translateY(12px); transition: opacity .5s, transform .6s var(--ease); }

  .ritual { position: relative; overflow: hidden; isolation: isolate; }
  .ritual-bg { position: absolute; inset: 0; z-index: -1; }
  .ritual-bg img { width: 100%; height: 125%; margin-top: -12%; object-fit: cover; opacity: .45; }
  :global([data-theme='light']) .ritual-bg img { opacity: .22; filter: sepia(.6) saturate(.8); }
  .ritual-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, var(--bg) 20%, color-mix(in srgb, var(--bg) 40%, transparent)); }
  .ritual-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.5rem, 4vw, 3rem); margin: 0; padding: 0; list-style: none; }
  .ritual-steps li { padding-top: 1.6rem; border-top: 1px solid var(--gold-soft); }
  .step-index { display: block; margin-bottom: 1.2rem; font: 700 .68rem var(--sans); letter-spacing: .26em; color: var(--gold); }
  .ritual-steps p { color: var(--muted); margin: 1rem 0 0; max-width: 22rem; }

  .reviews { position: relative; overflow: hidden; background: radial-gradient(ellipse at 50% 30%, var(--tint), transparent 70%); }
  .review-feature { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .review-feature .eyebrow { justify-content: center; }
  .review-symbol { color: var(--gold-soft); margin-bottom: 1.4rem; }
  .review-intro { max-width: 34rem; margin: 2rem 0 2.6rem; color: var(--muted); }
  .review-source { display: flex; align-items: center; gap: .65rem; font-size: .8rem; font-weight: 700; }
  .review-links { display: flex; flex-wrap: wrap; justify-content: center; gap: .8rem; margin-top: 1.3rem; }
  .review-links a { display: inline-flex; align-items: center; gap: .8rem; min-height: 50px; padding: .9rem 1.4rem; border: 1px solid var(--border); border-radius: 99px; text-decoration: none; font-size: .74rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; transition: background .3s, border-color .3s, color .3s; }
  .review-links a:hover { background: #c8a46a; border-color: #c8a46a; color: #12100e; }
  .review-note { color: var(--muted); font-size: .82rem; margin: 1.8rem 0 0; }

  .visit-banner { padding-block: clamp(4rem, 8vw, 6.5rem); background: var(--tint); border-block: 1px solid var(--border); }
  .visit-banner .wrap { display: flex; justify-content: space-between; align-items: center; gap: 2rem; }
  .visit-banner p { font-size: clamp(2.4rem, 1.2rem + 3.6vw, 4.6rem); line-height: 1.05; }
  .visit-banner .button { flex-shrink: 0; }

  .branch-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.25rem, 3vw, 2.5rem); }
  .branch-card { position: relative; padding: clamp(2rem, 4vw, 3.4rem); background: var(--surface); border: 1px solid var(--border); border-radius: 220px 220px 4px 4px; padding-top: clamp(4rem, 7vw, 6rem); text-align: center; transition: border-color .5s, transform .6s var(--ease), box-shadow .6s; }
  .branch-card .eyebrow { justify-content: center; }
  .branch-card .address { color: var(--muted); font-size: .92rem; max-width: 26rem; margin: 1.2rem auto 0; min-height: 5.5rem; }
  .branch-card .actions { justify-content: center; margin-top: 2rem; }

  .site-footer { position: relative; overflow: hidden; padding-block: clamp(2rem, 4vw, 3rem) 2rem; background: linear-gradient(var(--bg), var(--tint) 45%); }
  .footer-inner { position: relative; display: flex; justify-content: space-between; align-items: end; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
  .footer-inner p { font-size: .8rem; color: var(--muted); }
  .footer-links { display: flex; flex-wrap: wrap; gap: .5rem 1.8rem; font-size: .74rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
  .footer-links a { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; text-decoration: none; }
  .footer-links a:hover { color: var(--gold); }
  .footer-legal { position: relative; margin: 2rem 0 0; font-size: .7rem; color: var(--muted); letter-spacing: .08em; }

  .call-bar { display: none; }
  :global(.motion-ok) [data-reveal], :global(.motion-ok) [data-stagger] > * { opacity: 0; }
  :global(.motion-ok) [data-clip] { clip-path: inset(100% 0 0 0); }

  @keyframes marquee { to { transform: translateX(-50%); } }
  @keyframes title-in { from { transform: translateY(110%); } to { transform: none; } }
  @keyframes entrance { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  @keyframes unveil { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
  @keyframes draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes cue { 0% { transform: scaleY(0); opacity: 1; } 60% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(1); opacity: 0; } }
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes sheen { to { transform: translateX(120%); } }
  @keyframes spin { to { rotate: 360deg; } }
  @keyframes swing { from { rotate: -7deg; } to { rotate: 7deg; } }
  @keyframes flicker { 0% { scale: 1 1; opacity: .85; } 50% { scale: .9 1.08; } 100% { scale: 1.05 .94; opacity: 1; } }
  @keyframes bloom { from { opacity: 0; transform: scale(.5) rotate(-120deg); } }
  @keyframes breathe { to { scale: 1.05; } }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .button:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgb(200 164 106 / .3); }
    .button:hover::after { animation: sheen .9s var(--ease); }
    .button:hover :global(svg), .round-link:hover :global(svg), .icon-button:hover :global(svg) { transform: rotate(-12deg); }
    .link:hover :global(svg), .footer-links a:hover :global(svg) { transform: translateY(-3px); }
    .review-links a:hover :global(svg), .round-link:hover :global(svg) { transform: translate(2px, -2px); }
    .service-card:hover .service-photo img { scale: 1.05; }
    .service-card:hover .arch-frame { stroke: var(--em); }
    .service-card:hover .mandala-service { opacity: .55; }
    .tile:hover img { scale: 1.07; }
    .tile:hover figcaption { opacity: 1; transform: none; }
    .branch-card:hover { border-color: var(--gold-soft); transform: translateY(-6px); box-shadow: 0 30px 60px var(--shadow); }
    .marquee:hover .marquee-track { animation-play-state: paused; }
  }
  @media (max-width: 1100px) { .nav-link { display: none; } .menu-toggle { display: inline-flex; } }
  @media (max-width: 900px) {
    .hero-inner, .bridal-inner { grid-template-columns: 1fr; }
    .hero { padding-top: 6.5rem; }
    .hero-visual { width: min(80%, 380px); order: -1; }
    .hero-badge { left: -1.5rem; bottom: 1.5rem; }
    .scroll-cue { display: none; }
    .service-card { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .section-heading > p { max-width: 17rem; }
    .visit-banner .wrap { flex-direction: column; align-items: start; }
    .ritual-steps { grid-template-columns: 1fr; }
    .bridal-visual { max-width: 560px; }
  }
  @media (max-width: 700px) {
    .pill { display: none; }
    h1 { font-size: clamp(3rem, 13vw, 4.6rem); }
    .hero-copy { text-align: left; }
    .section-heading { flex-direction: column; align-items: start; gap: 1.5rem; }
    .section-heading > p { max-width: 32rem; }
    .service-card { grid-template-columns: 1fr; }
    .service-card:nth-of-type(even) .service-visual { order: 0; }
    .service-photo { aspect-ratio: 4 / 4.4; }
    .service-index { font-size: 4rem; margin: 1.6rem 0 .6rem; }
    .branch-grid { grid-template-columns: 1fr; }
    .branch-card { border-radius: 160px 160px 4px 4px; }
    .branch-card .address { min-height: 0; }
    .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 44vw; }
    .tile figcaption { opacity: 1; transform: none; font-size: 1.1rem; padding: 2rem .9rem .8rem; }
    .footer-inner { flex-direction: column; align-items: start; }
    .site-header { padding-block: .8rem; }
    .wordmark { font-size: 1.45rem; }
    .brand-mark { width: 26px; height: 36px; }
    nav { gap: .5rem; }
    .marquee-group { gap: 1.6rem; padding-right: 1.6rem; }
    .site-footer { padding-bottom: 6.5rem; }
    .call-bar { position: fixed; inset: auto .75rem .75rem; z-index: 25; display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; padding: .5rem; border-radius: 99px; background: color-mix(in srgb, #12100e 88%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid #3a3029; transform: translateY(140%); visibility: hidden; transition: transform .6s var(--ease), visibility 0s .6s; }
    .call-bar.visible { transform: none; visibility: visible; transition: transform .6s var(--ease); }
    .call-bar a { display: inline-flex; align-items: center; justify-content: center; gap: .55rem; min-height: 48px; border-radius: 99px; background: #c8a46a; color: #12100e; font-size: .72rem; letter-spacing: .14em; }
    .call-bar a + a { background: transparent; color: #f4ede3; border: 1px solid #5a4a3c; }
  }
  @media (max-width: 380px) { .wordmark small { display: none; } .brand { gap: .4rem; } }
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    *, *::before, *::after, :global(svg) { animation: none !important; transition: none !important; }
    [data-reveal], [data-stagger] > *, .care-line, [data-clip] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
    .progress, .marquee-toggle, .marquee-group + .marquee-group, .scroll-cue { display: none; }
    .marquee { padding-inline: var(--gutter); }
    .marquee-window { mask-image: none; }
    .marquee-track { width: 100%; }
    .marquee-group { width: 100%; min-width: 0; flex-shrink: 1; flex-wrap: wrap; justify-content: center; gap: .75rem 1rem; padding: 0; }
    .marquee-group span { font-size: 1.4rem; }
  }
</style>
