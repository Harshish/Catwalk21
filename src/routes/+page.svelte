<script>
  import '@fontsource-variable/fraunces/opsz.css';
  import '@fontsource-variable/fraunces/opsz-italic.css';
  import '@fontsource-variable/manrope';
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
  import GoogleLogoIcon from 'phosphor-svelte/lib/GoogleLogoIcon';
  import QuotesIcon from 'phosphor-svelte/lib/QuotesIcon';
  import ArrowUpIcon from 'phosphor-svelte/lib/ArrowUpIcon';
  import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
  import SunIcon from 'phosphor-svelte/lib/SunIcon';
  import MoonIcon from 'phosphor-svelte/lib/MoonIcon';
  import PauseIcon from 'phosphor-svelte/lib/PauseIcon';
  import PlayIcon from 'phosphor-svelte/lib/PlayIcon';

  const services = [
    { name: 'Hair', icon: ScissorsIcon, description: 'Cuts, colour, smoothing and styling made to suit your texture, mood and routine.', image: '/img/bg3.jpg', alt: 'Stylist shaping a short haircut', details: 'Cuts · Colour · Styling' },
    { name: 'Skin care', icon: SparkleIcon, description: 'Thoughtful care that leaves your skin looking fresh, bright and cared for.', image: '/img/bg11.jpg', alt: 'Beauty portrait surrounded by fresh citrus', details: 'Refresh · Care · Glow' },
    { name: 'Spa', icon: FlowerLotusIcon, description: 'Slow down with restorative treatments and a little room to breathe.', image: '/img/bg8.jpg', alt: 'Relaxing hot stone spa treatment', details: 'Unwind · Restore · Recharge' },
    { name: 'Bridal', icon: HeartIcon, description: 'A beautifully considered look for your most memorable celebration.', image: '/img/bg12.jpg', alt: 'Bride wearing traditional jewellery and bridal makeup', details: 'Makeup · Hair · Finishing touches' }
  ];

  // Listing IDs come from the Google Maps embeds on the original site.
  const branches = [
    { name: 'Thakur Complex', address: 'Shop 37, Vasant Smruti CHS Ltd., Near Surbhi Hotel, 90ft Road, Thakur Complex, Kandivali East, Mumbai 400101', phone: '8452032889', tel: '+918452032889', cid: '1772599461488886969' },
    { name: 'Thakur Village', address: 'Shop 58, Evershine Moon CHS 72, behind Evershine Crown, Thakur Village, Kandivali East, Mumbai 400101', phone: '9004960045', tel: '+919004960045', cid: '8788651649671816183' }
  ];
  const marquee = [...services, { name: 'Colour', icon: SparkleIcon }, { name: 'Styling', icon: ScissorsIcon }];
  let marqueePaused = $state(false);
  let dark = $state(false);
  function toggleTheme() { window.dispatchEvent(new Event('toggle-theme')); }

  onMount(() => {
    const syncTheme = () => { dark = document.documentElement.dataset.theme === 'dark'; };
    syncTheme();
    window.addEventListener('themechange', syncTheme);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    /** @type {(() => void)[]} */
    let cleanups = [];
    const syncMotion = () => {
      cleanups.forEach((stop) => stop());
      cleanups = [];
      if (preference.matches) return;
      const progress = animate('.progress', { scaleX: [0, 1] }, { ease: 'linear' });
      cleanups.push(scroll(progress), () => progress.cancel());
      cleanups.push(inView('[data-reveal]', (element) => {
        const animation = animate(element, { opacity: [0, 1], y: [28, 0] }, { duration: .7, ease: [.22, 1, .36, 1] });
        cleanups.push(() => animation.cancel());
      }, { amount: .15 }));
      cleanups.push(inView('[data-stagger]', (element) => {
        const animation = animate(element.children, { opacity: [0, 1], y: [32, 0] }, { duration: .7, delay: stagger(.12), ease: [.22, 1, .36, 1] });
        cleanups.push(() => animation.cancel());
      }, { amount: .1 }));
      const line = document.querySelector('.care-line');
      if (line) {
        const animation = animate(line, { scaleX: [0, 1] }, { ease: 'linear' });
        cleanups.push(scroll(animation, { target: line, offset: ['start 90%', 'start 40%'] }), () => animation.cancel());
      }
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => {
      cleanups.forEach((stop) => stop());
      preference.removeEventListener('change', syncMotion);
      window.removeEventListener('themechange', syncTheme);
    };
  });
</script>

<svelte:head>
  <title>Catwalk 21 | Salon & Spa in Kandivali, Mumbai</title>
  <meta name="description" content="Discover hair, skin care, spa and bridal services at Catwalk 21, a unisex salon and spa in Kandivali, Mumbai." />
</svelte:head>

{#snippet brandMark()}
  <span class="brand-mark" aria-hidden="true">
    <img class="logo-light" src="/img/catwalk21_cat_logo_black.svg" alt="" width="36" height="48" />
    <img class="logo-dark" src="/img/catwalk21_cat_logo_white.svg" alt="" width="36" height="48" />
  </span>
  <span class="wordmark">Catwalk <span>21</span><small>Salon & Spa</small></span>
{/snippet}

<a class="skip-link" href="#main-content">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<header class="site-header">
  <a href="#top" class="brand" aria-label="Catwalk 21 home">{@render brandMark()}</a>
  <nav aria-label="Main navigation">
    <a class="nav-link" href="#services">Services</a>
    <a class="nav-link" href="#reviews">Reviews</a>
    <a class="pill" href="#branches"><PhoneIcon size={17} aria-hidden="true" />Call a branch</a>
    <button class="theme-toggle" type="button" onclick={toggleTheme} aria-label="Dark theme" aria-pressed={dark} title={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
      {#if dark}<SunIcon size={20} aria-hidden="true" />{:else}<MoonIcon size={20} aria-hidden="true" />{/if}
    </button>
  </nav>
</header>

<main id="main-content" tabindex="-1">
  <section id="top" class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow entrance" style="--delay: 0ms">Salon & Spa · Kandivali, Mumbai</p>
      <h1 id="hero-title"><span class="title-line"><span>Made for your</span></span><span class="title-line"><em>main character</em></span><span class="title-line"><span>moment.</span></span></h1>
      <p class="hero-intro entrance" style="--delay: 300ms">A women-forward beauty and wellness space, warmly welcoming everyone. Come in for a new look, a quiet reset, or your next big occasion.</p>
      <div class="actions entrance" style="--delay: 400ms">
        <a class="button" href="#services"><ScissorsIcon size={19} aria-hidden="true" />Explore services</a>
        <a class="link" href="#branches"><MapPinIcon size={19} aria-hidden="true" />Find your branch</a>
      </div>
      <a class="review-shortcut entrance" style="--delay: 500ms" href="#reviews"><span class="google-label"><GoogleLogoIcon size={18} aria-hidden="true" />Google reviews</span><span>Get to know us through our guests</span></a>
    </div>
    <div class="hero-visual entrance" style="--delay: 150ms">
      <div class="photo-frame"><img src="/img/bg12.jpg" alt="Bride with bridal makeup and traditional jewellery" width="1400" height="933" fetchpriority="high" /></div>
      <div class="photo-caption"><span>For the everyday.<br /><em>And the unforgettable.</em></span><span class="caption-star"><SparkleIcon size={36} weight="light" aria-hidden="true" /></span></div>
      <span class="photo-note">Hair · Skin · Spa · Bridal</span>
    </div>
  </section>

  <section class="marquee" class:paused={marqueePaused} aria-label="Hair, skin care, spa, bridal, colour and styling">
    <div class="marquee-window" aria-hidden="true">
      <div class="marquee-track">
        {#each [0, 1] as _}
          <div class="marquee-group">{#each marquee as item}<span>{item.name}</span><item.icon size={28} weight="light" />{/each}</div>
        {/each}
      </div>
    </div>
    <button class="marquee-toggle" type="button" onclick={() => (marqueePaused = !marqueePaused)} aria-label={marqueePaused ? 'Resume service marquee' : 'Pause service marquee'}>
      {#if marqueePaused}<PlayIcon size={18} weight="fill" aria-hidden="true" />{:else}<PauseIcon size={18} weight="fill" aria-hidden="true" />{/if}
    </button>
  </section>

  <section class="welcome section wrap" aria-labelledby="welcome-title">
    <p class="eyebrow" data-reveal>Our kind of care</p>
    <h2 id="welcome-title" class="statement" data-reveal>Whether you keep it simple or go all out, we make room for the version of you that feels most like <em>you.</em></h2>
    <p class="welcome-note" data-reveal>From everyday hair and skin rituals to bridal finishing touches, Catwalk 21 brings a considered touch to every visit.</p>
    <div class="care-line" aria-hidden="true"></div>
  </section>

  <section id="services" class="services section" aria-labelledby="services-title">
    <div class="wrap">
      <div class="section-heading" data-reveal><div><p class="eyebrow">What we offer</p><h2 id="services-title">A little something<br />for <em>every mood.</em></h2></div><p>Everyday rituals. Special occasions.<br />A considered touch, every time.</p></div>
      <div class="service-grid">
        {#each services as service, index}
          <article class="service-card" id={`service-${index}`} data-reveal>
            <div class="service-photo"><img src={service.image} alt={service.alt} width="1400" height="933" loading="lazy" /><span class="service-index" aria-hidden="true">0{index + 1}</span></div>
            <div class="service-copy"><p class="eyebrow"><service.icon size={20} aria-hidden="true" />{service.details}</p><div class="service-title"><h3>{service.name}</h3><a class="round-link" href="#branches" aria-label={`Enquire about ${service.name}`}><PhoneIcon size={21} aria-hidden="true" /></a></div><p>{service.description}</p></div>
          </article>
        {/each}
      </div>
      <p class="service-help" data-reveal>Not sure where to start? <a href="#branches">Call your nearest salon. We’ll talk it through.</a></p>
    </div>
  </section>

  <section id="reviews" class="reviews section" aria-labelledby="reviews-title">
    <div class="review-feature wrap" data-reveal>
      <div class="review-symbol"><QuotesIcon size={76} weight="duotone" aria-hidden="true" /></div>
      <p class="eyebrow">The word around the neighbourhood</p>
      <h2 id="reviews-title">Our guests.<br /><em>Their own words.</em></h2>
      <p class="review-intro">A new look. A little time for yourself. Discover what a visit to Catwalk 21 feels like, through our guests’ experiences.</p>
      <!-- Publish testimonial excerpts only after verifying their text, author and source. -->
      <div class="review-source"><GoogleLogoIcon size={24} aria-hidden="true" /><span>Explore guest reviews on Google</span></div>
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
    <div class="section-heading" data-reveal><div><p class="eyebrow">Come see us</p><h2 id="branches-title">Your next little <em>escape.</em></h2></div><p>Two welcoming branches in Kandivali. Pick the one closest to you and give us a call.</p></div>
    <div class="branch-grid" data-stagger>
      {#each branches as branch, index}
        <article class="branch-card"><p class="eyebrow">0{index + 1} / Kandivali East</p><h3>{branch.name}</h3><p class="address">{branch.address}</p><div class="actions"><a class="button" href={`tel:${branch.tel}`} aria-label={`Call ${branch.name} at ${branch.phone}`}><PhoneIcon size={19} aria-hidden="true" />Call {branch.phone}</a><a class="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Catwalk 21 ${branch.name} ${branch.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${branch.name} (opens in a new tab)`}><MapPinIcon size={19} aria-hidden="true" />Get directions</a></div></article>
      {/each}
    </div>
  </section>
</main>

<footer class="site-footer"><div class="wrap footer-inner"><div><a href="#top" class="brand" aria-label="Catwalk 21 home">{@render brandMark()}</a><p>Salon & Spa · Kandivali, Mumbai</p></div><div class="footer-links"><a href="mailto:customercare@catwalk21salon.com"><EnvelopeSimpleIcon size={20} aria-hidden="true" />Email us</a><a href="https://www.facebook.com/salon.spa.mumbai/" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)"><FacebookLogoIcon size={20} aria-hidden="true" />Facebook</a><a href="#top"><ArrowUpIcon size={20} aria-hidden="true" />Back to top</a></div></div></footer>

<style>
  :global(:root) { --ink: #1c1117; --cream: #fbf3ec; --surface: #fffaf6; --blush: #f2e2df; --accent: #9e2f52; --pink: #ec8fa3; --muted: #6e5560; --border: #ddcbd0; --serif: 'Fraunces Variable', Georgia, serif; --sans: 'Manrope Variable', system-ui, sans-serif; --ease: cubic-bezier(.22, 1, .36, 1); --gutter: clamp(1.25rem, 5vw, 5rem); color-scheme: light; }
  :global(:root[data-theme='dark']) { --ink: #fbf3ec; --cream: #1c1117; --surface: #291d25; --blush: #32212b; --accent: #f2a7ba; --muted: #cfb9c3; --border: #513b46; color-scheme: dark; }
  :global(*) { box-sizing: border-box; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; background: var(--cream); color: var(--ink); font-family: var(--sans); -webkit-font-smoothing: antialiased; }
  :global(a) { color: inherit; }
  :global(a:focus-visible), :global(button:focus-visible) { outline: 2px solid var(--accent); outline-offset: 5px; }
  :global([id]) { scroll-margin-top: 7rem; }
  :global(::selection) { background: var(--pink); color: #1c1117; }
  img { display: block; max-width: 100%; }
  p { line-height: 1.75; }
  h1, h2, h3, .visit-banner p { font-family: var(--serif); font-weight: 400; letter-spacing: -.045em; margin: 0; text-wrap: balance; }
  h2 { font-size: clamp(2.3rem, 1.2rem + 3.6vw, 4.7rem); line-height: 1.08; }
  h3 { font-size: clamp(1.8rem, 1.25rem + 1.6vw, 2.8rem); line-height: 1.15; }
  em { font-weight: 380; color: var(--accent); }
  .wrap { width: min(100% - var(--gutter) * 2, 1280px); margin-inline: auto; }
  .section { padding-block: clamp(4rem, 8vw, 7.5rem); }
  .eyebrow { margin: 0 0 1.2rem; font-size: .7rem; font-weight: 750; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); }
  .progress { position: fixed; inset: 0 0 auto; z-index: 20; height: 3px; background: var(--pink); transform: scaleX(0); transform-origin: left; }
  .skip-link { position: fixed; top: .5rem; left: 1rem; z-index: 30; transform: translateY(-200%); padding: 1rem; background: var(--ink); color: var(--cream); }
  .skip-link:focus { transform: none; }
  .site-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .85rem var(--gutter); background: var(--cream); border-bottom: 1px solid var(--border); }
  .brand { display: inline-flex; align-items: center; gap: .6rem; text-decoration: none; flex-shrink: 0; }
  .brand-mark { position: relative; display: block; width: 32px; height: 44px; }
  .brand-mark img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
  .brand-mark .logo-dark { display: none; }
  :global([data-theme='dark']) .logo-light { display: none; }
  :global([data-theme='dark']) .brand-mark .logo-dark { display: block; }
  .wordmark { font: 500 1.55rem/1 var(--serif); letter-spacing: -.05em; }
  .wordmark > span { color: var(--accent); }
  .wordmark small { display: block; margin-top: .4rem; font: 750 .55rem var(--sans); letter-spacing: .22em; text-transform: uppercase; }
  nav { display: flex; align-items: center; gap: clamp(.7rem, 2.5vw, 2rem); font-size: .8rem; font-weight: 700; }
  nav a { text-decoration: none; }
  .nav-link { padding-block: .9rem; }
  .nav-link:hover { color: var(--accent); }
  .pill, .theme-toggle { display: inline-flex; justify-content: center; align-items: center; min-height: 44px; border: 1px solid var(--border); border-radius: 99px; background: transparent; color: var(--ink); transition: background .2s, color .2s; }
  .pill { padding: .7rem 1.1rem; gap: .8rem; }
  .pill:hover, .theme-toggle:hover { background: var(--blush); }
  .theme-toggle { width: 44px; flex-shrink: 0; cursor: pointer; }
  .hero { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: clamp(2rem, 5vw, 5rem); padding-block: clamp(3rem, 6vw, 6rem); }
  h1 { font-size: clamp(3rem, 1rem + 5.3vw, 6rem); line-height: 1.06; }
  .title-line { display: block; overflow: hidden; padding-bottom: .08em; margin-bottom: -.08em; }
  .title-line > span, .title-line > em { display: block; animation: title-in 1s var(--ease) both; }
  .title-line:nth-child(2) > em { animation-delay: .12s; }
  .title-line:nth-child(3) > span { animation-delay: .24s; }
  .entrance { animation: entrance .85s var(--delay, 0ms) var(--ease) both; }
  .hero-intro { max-width: 29rem; margin-block: 1.7rem; color: var(--muted); font-size: clamp(.95rem, .85rem + .3vw, 1.1rem); }
  .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; }
  .button, .link { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; gap: 1rem; font-size: .85rem; font-weight: 750; text-decoration: none; }
  .button { padding: .9rem 1.4rem; border-radius: 99px; background: var(--pink); color: #1c1117; transition: transform .3s var(--ease), box-shadow .3s; }
  :global(svg) { flex-shrink: 0; }
  .button :global(svg), .link :global(svg), .round-link :global(svg), .footer-links :global(svg), .theme-toggle :global(svg), .review-links :global(svg) { transition: transform .4s var(--ease); }
  .link { text-decoration: underline; text-underline-offset: .35em; text-decoration-color: var(--border); }
  .link:hover { text-decoration-color: var(--accent); }
  .review-shortcut { display: flex; flex-direction: column; align-items: flex-start; gap: .4rem; margin-top: 2rem; color: var(--muted); font-size: .75rem; text-decoration: none; }
  .google-label { display: inline-flex; align-items: center; gap: .5rem; color: var(--ink); font-weight: 750; }
  .hero-visual { position: relative; padding: 0 0 2rem 1rem; }
  .photo-frame { border-radius: 12px; overflow: hidden; background: var(--blush); }
  .photo-frame img { width: 100%; height: auto; aspect-ratio: 1 / 1.1; object-fit: cover; object-position: 30% center; animation: photo-settle 1.5s var(--ease) both; }
  .photo-caption { position: absolute; bottom: 0; left: -1rem; right: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.3rem 1.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; font: 400 clamp(1.15rem, 1rem + .7vw, 1.7rem)/1.25 var(--serif); }
  .caption-star { display: grid; place-items: center; color: var(--accent); }
  .photo-note { position: absolute; top: 1rem; left: 2rem; padding: .6rem .85rem; background: #fbf3ec; color: #1c1117; border-radius: 4px; font-size: .65rem; font-weight: 700; letter-spacing: .08em; }
  .marquee { display: flex; align-items: center; gap: 1rem; padding: 1rem var(--gutter) 1rem 0; background: var(--pink); color: #1c1117; }
  .marquee-window { flex: 1; min-width: 0; overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 3%, black 97%, transparent); }
  .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
  .marquee-group { display: flex; flex-shrink: 0; align-items: center; justify-content: space-around; min-width: 100vw; gap: 2rem; padding-right: 2rem; }
  .marquee-group span { font: italic 380 clamp(1.8rem, 1rem + 2.4vw, 3.2rem) var(--serif); white-space: nowrap; }
  .marquee-group :global(svg) { color: #632039; }
  .marquee.paused .marquee-track { animation-play-state: paused; }
  .marquee-toggle { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border: 1px solid #632039; border-radius: 50%; background: transparent; color: #1c1117; cursor: pointer; }
  .marquee-toggle:hover { background: rgb(251 243 236 / .4); }
  .marquee-toggle:focus-visible { outline-color: #1c1117; }
  .statement { max-width: 1100px; font-size: clamp(2.1rem, 1.1rem + 3.2vw, 4.2rem); line-height: 1.15; text-wrap: pretty; }
  .welcome-note { max-width: 32rem; margin: 2rem 0 0 auto; color: var(--muted); }
  .care-line { height: 1px; background: var(--accent); margin-top: 3rem; transform-origin: left; }
  .services { background: var(--blush); }
  .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 3rem; }
  .section-heading > p { max-width: 22rem; color: var(--muted); margin: 0; }
  .service-grid, .branch-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.25rem, 3vw, 2.5rem); }
  .service-card { overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; transition: border-color .3s, box-shadow .3s; }
  .service-card:focus-within { border-color: var(--accent); }
  @media (hover: hover) {
    .service-card:hover { border-color: var(--accent); box-shadow: 0 12px 30px rgb(28 17 23 / .08); }
    .marquee:hover .marquee-track { animation-play-state: paused; }
  }
  .service-photo { position: relative; overflow: hidden; }
  .service-photo img { width: 100%; height: auto; aspect-ratio: 1400 / 933; object-fit: contain; transition: transform .8s var(--ease); }
  .service-index { position: absolute; top: 1rem; left: 1rem; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #fbf3ec; color: #1c1117; font-size: .75rem; font-weight: 700; }
  .service-copy { padding: clamp(1.25rem, 2.7vw, 2.4rem); }
  .service-copy .eyebrow { display: flex; align-items: center; gap: .6rem; font-size: .65rem; letter-spacing: .1em; margin-bottom: .8rem; }
  .service-title { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .round-link { display: grid; place-items: center; width: 48px; height: 48px; flex-shrink: 0; border: 1px solid var(--border); border-radius: 50%; text-decoration: none; font-size: 1.3rem; transition: background .3s, color .3s; }
  .round-link:hover, .round-link:focus-visible { background: var(--ink); color: var(--cream); }
  .service-copy > p:last-child { color: var(--muted); font-size: .9rem; margin: 1rem 0 0; max-width: 45ch; }
  .service-help { text-align: center; margin: 2.5rem 0 0; font-size: .85rem; color: var(--muted); }
  .service-help a { text-underline-offset: .3em; }
  .reviews { position: relative; overflow: hidden; background: radial-gradient(ellipse at 50% 35%, var(--blush), transparent 65%); }
  .review-feature { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .review-symbol { color: var(--accent); margin-bottom: 1rem; }
  .review-intro { max-width: 35rem; margin: 1.7rem 0 2.5rem; color: var(--muted); }
  .review-source { display: flex; align-items: center; gap: .65rem; font-size: .8rem; font-weight: 700; }
  .review-links { display: flex; flex-wrap: wrap; justify-content: center; gap: .75rem; margin-top: 1.2rem; }
  .review-links a { display: inline-flex; align-items: center; gap: .8rem; min-height: 48px; padding: .85rem 1.2rem; border: 1px solid var(--border); border-radius: 99px; text-decoration: none; font-size: .8rem; font-weight: 700; background: var(--surface); transition: background .25s, border-color .25s; }
  .review-links a:hover { background: var(--blush); border-color: var(--accent); }
  .review-note { color: var(--muted); font-size: .8rem; margin: 1.7rem 0 0; }
  .visit-banner { background: var(--blush); padding-block: clamp(3rem, 6vw, 5rem); border-block: 1px solid var(--border); }
  .visit-banner .wrap { display: flex; justify-content: space-between; align-items: center; gap: 2rem; }
  .visit-banner p { font-size: clamp(2.1rem, 1rem + 3vw, 3.8rem); line-height: 1.15; }
  .visit-banner .button { flex-shrink: 0; }
  .branch-card { padding: clamp(1.5rem, 3vw, 2.7rem); border-top: 2px solid var(--accent); background: var(--surface); border-radius: 0 0 12px 12px; }
  .branch-card .address { color: var(--muted); font-size: .9rem; min-height: 6rem; }
  .branch-card .actions { margin-top: 1.5rem; }
  .site-footer { border-top: 1px solid var(--border); padding-block: 3rem; background: var(--blush); }
  .footer-inner { display: flex; justify-content: space-between; align-items: end; gap: 2rem; }
  .footer-inner p { font-size: .8rem; color: var(--muted); }
  .footer-links { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: .8rem; }
  .footer-links a { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; padding-block: .8rem; text-decoration: none; }
  .footer-links a:hover { color: var(--accent); }
  @keyframes marquee { to { transform: translateX(-50%); } }
  @keyframes title-in { from { transform: translateY(110%); } to { transform: none; } }
  @keyframes entrance { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  @keyframes photo-settle { from { transform: scale(1.06); } to { transform: scale(1); } }
  @media (prefers-reduced-motion: no-preference) {
    .service-card:focus-within .service-photo img { transform: scale(1.045); }
    .round-link:focus-visible :global(svg) { transform: rotate(-12deg); }
  }
  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .service-card:hover .service-photo img { transform: scale(1.045); }
    .button:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgb(28 17 23 / .12); }
    .button:hover :global(svg), .round-link:hover :global(svg), .theme-toggle:hover :global(svg) { transform: rotate(-12deg); }
    .link:hover :global(svg), .footer-links a:hover :global(svg) { transform: translateY(-3px); }
    .review-links a:hover :global(svg) { transform: translate(2px, -2px); }
    .hero-visual:hover .caption-star { transform: rotate(45deg); }
    .caption-star { transition: transform .8s var(--ease); }
  }
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr 1fr; gap: 2rem; }
    h1 { font-size: clamp(2.6rem, 5.3vw, 4rem); }
    .section-heading > p { max-width: 17rem; }
    .visit-banner .wrap { flex-direction: column; align-items: start; }
  }
  @media (max-width: 700px) {
    .hero { grid-template-columns: 1fr; }
    h1 { font-size: clamp(3rem, 10vw, 4.8rem); }
    .hero-visual { width: min(100%, 500px); margin-inline: auto; padding-left: .75rem; }
    .photo-frame img { aspect-ratio: 4 / 3; object-position: center; }
    .photo-caption { left: 0; right: 1rem; }
    .section-heading { flex-direction: column; align-items: start; gap: 1.5rem; }
    .section-heading > p { max-width: 32rem; }
    .service-grid, .branch-grid { grid-template-columns: 1fr; }
    .nav-link { display: none; }
    .marquee-group { gap: 1.4rem; padding-right: 1.4rem; }
    .visit-banner .wrap, .footer-inner { flex-direction: column; align-items: start; }
    .branch-card .address { min-height: 0; }
    .site-header { gap: .6rem; padding-block: .7rem; }
    .wordmark { font-size: 1.25rem; }
    .brand-mark { width: 27px; height: 38px; }
    nav { gap: .6rem; font-size: .7rem; }
    .pill { padding: .6rem .8rem; }
  }
  @media (max-width: 360px) { .pill { gap: .4rem; padding-inline: .6rem; } .brand { gap: .35rem; } .wordmark { font-size: 1.15rem; } nav { gap: .4rem; } }
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    *, *::before, *::after, :global(svg) { animation: none !important; transition: none !important; }
    [data-reveal], [data-stagger] > *, .care-line { opacity: 1 !important; transform: none !important; }
    .progress, .marquee-toggle, .marquee-group + .marquee-group { display: none; }
    .marquee { padding-inline: var(--gutter); }
    .marquee-window { mask-image: none; }
    .marquee-track { width: 100%; }
    .marquee-group { width: 100%; min-width: 0; flex-shrink: 1; flex-wrap: wrap; justify-content: center; gap: .75rem 1rem; padding: 0; }
    .marquee-group span { font-size: 1.4rem; }
  }
</style>
