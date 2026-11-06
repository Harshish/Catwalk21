<script>
  const services = [
    { name: 'Salon', description: 'Hair care designed to help you feel your best.', image: '/img/bg3.jpg' },
    { name: 'Spa', description: 'Time to slow down and recharge.', image: '/img/bg8.jpg' },
    { name: 'Skin care', description: 'Care for skin that feels as good as it looks.', image: '/img/bg11.jpg' },
    { name: 'Bridal', description: 'A look for a day you will remember.', image: '/img/bg12.jpg' }
  ];

  const branches = [
    {
      name: 'Thakur Complex',
      address: 'Shop 37, Vasant Smruti CHS Ltd., Near Surbhi Hotel, 90ft Road, Thakur Complex, Kandivali East, Mumbai 400101',
      phone: '8452032889',
      tel: '+918452032889'
    },
    {
      name: 'Thakur Village',
      address: 'Shop 58, Evershine Moon CHS 72, behind Evershine Crown, Thakur Village, Kandivali East, Mumbai 400101',
      phone: '9004960045',
      tel: '+919004960045'
    }
  ];
</script>

<svelte:head>
  <title>Catwalk 21 | Salon & Spa in Kandivali, Mumbai</title>
  <meta name="description" content="Explore salon, spa, skin care and bridal services at Catwalk 21. Find our Thakur Complex and Thakur Village branches in Kandivali, Mumbai." />
</svelte:head>

<div class="site-shell">
  <header class="site-header">
    <a href="#top" class="brand" aria-label="Catwalk 21 home"><img src="/img/full_logo.png" alt="Catwalk 21" width="140" height="70" /></a>
    <nav aria-label="Main navigation">
      <a href="#services">Services</a>
      <a href="#branches">Branches</a>
      <a class="header-contact" href="#branches">Get in touch <span aria-hidden="true">↗</span></a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">CATWALK 21 · KANDIVALI, MUMBAI</p>
        <h1 id="hero-title">A little time<br />for <em>yourself.</em></h1>
        <p class="hero-intro">From a fresh look to a moment of calm, make space for the care you deserve at Catwalk 21 Salon & Spa.</p>
        <div class="hero-actions">
          <a class="button button-dark" href="#services">Explore services <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#branches">Find a branch <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="hero-visual"><img src="/img/bg3.jpg" alt="Salon hair care" fetchpriority="high" /><span class="hero-note">YOUR MOMENT STARTS HERE</span></div>
    </section>

    <section id="services" class="section services" aria-labelledby="services-title">
      <div class="section-heading">
        <div><p class="eyebrow">WHAT WE OFFER</p><h2 id="services-title">Feel good, <em>your way.</em></h2></div>
        <p>Find your next moment of care. Explore our salon and spa services, then call the Branch that works for you.</p>
      </div>
      <div class="service-grid">
        {#each services as service}
          <article class="service-card">
            <img src={service.image} alt="" loading="lazy" />
            <div class="service-info"><h3>{service.name}</h3><p>{service.description}</p></div>
          </article>
        {/each}
      </div>
    </section>

    <section class="statement" aria-label="Our approach"><p class="eyebrow">A MOMENT FOR YOU</p><p>Good care is about more than how you look. It’s how you <em>feel</em> when you leave.</p></section>

    <section id="branches" class="section branches" aria-labelledby="branches-title">
      <div class="section-heading"><div><p class="eyebrow">COME SEE US</p><h2 id="branches-title">Find your <em>Branch.</em></h2></div><p>Two locations in Kandivali. Choose the one that is right for you.</p></div>
      <div class="branch-grid">
        {#each branches as branch, index}
          <article class="branch-card">
            <span class="branch-number">0{index + 1} / KANDIVALI</span>
            <h3>{branch.name}</h3>
            <p>{branch.address}</p>
            <div class="branch-actions"><a class="button button-dark" href={`tel:${branch.tel}`} aria-label={`Call ${branch.name} at ${branch.phone}`}>Call {branch.phone} <span aria-hidden="true">↗</span></a><a class="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Catwalk 21 ${branch.name} ${branch.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${branch.name} (opens in a new tab)`}>Directions <span aria-hidden="true">↗</span></a></div>
          </article>
        {/each}
      </div>
    </section>
  </main>

  <footer class="site-footer"><div><img src="/img/full_logo.png" alt="Catwalk 21" width="125" height="62" /><p>Salon & Spa · Kandivali, Mumbai</p></div><div><p>Questions? <a href="mailto:customercare@catwalk21salon.com">Email us</a></p><a href="https://www.facebook.com/salon.spa.mumbai/" target="_blank" rel="noopener noreferrer">Facebook <span aria-hidden="true">↗</span></a></div></footer>
</div>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; background: #f7f3ec; color: #272820; font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  :global(a) { color: inherit; }
  :global(a:focus-visible) { outline: 3px solid #9a5739; outline-offset: 4px; }
  :global(img) { max-width: 100%; }
  .site-shell { max-width: 1680px; margin: auto; }
  .site-header { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: .8rem clamp(1.2rem, 6vw, 7rem); background: #f7f3ec; }
  .brand img { width: 140px; height: auto; display: block; }
  nav { display: flex; gap: clamp(1rem, 3vw, 3rem); align-items: center; }
  nav a, .text-link, .site-footer a { text-decoration: none; font-size: .9rem; font-weight: 600; }
  nav a:hover, .text-link:hover, .site-footer a:hover { text-decoration: underline; text-underline-offset: 5px; }
  .header-contact { border-bottom: 1px solid currentColor; padding: .55rem 0; }
  .hero { min-height: 650px; display: grid; grid-template-columns: 52% 48%; background: #eae4d9; }
  .hero-copy { padding: clamp(4rem, 8vw, 9rem) clamp(1.2rem, 6vw, 7rem); display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
  .eyebrow, .branch-number { font-size: .72rem; letter-spacing: .18em; font-weight: 700; color: #85624c; }
  h1, h2, .statement > p:last-child { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: -.045em; }
  h1 { font-size: clamp(4rem, 7vw, 7.5rem); line-height: 1.05; margin: 1.6rem 0 1.5rem; }
  h1 em, h2 em, .statement em { color: #9b6348; font-weight: 400; }
  .hero-intro { font-size: 1.12rem; line-height: 1.7; max-width: 29rem; color: #56564d; }
  .hero-actions, .branch-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.8rem; margin-top: 2rem; }
  .button { display: inline-flex; align-items: center; justify-content: space-between; gap: 1.6rem; min-height: 3.5rem; padding: .95rem 1.4rem; text-decoration: none; font-size: .88rem; font-weight: 600; }
  .button-dark { color: #fff; background: #2d322b; }
  .button-dark:hover { background: #494d41; }
  .hero-visual { position: relative; overflow: hidden; min-height: 580px; }
  .hero-visual img { width: 100%; height: 100%; object-fit: cover; object-position: center; position: absolute; inset: 0; }
  .hero-note { position: absolute; bottom: 2rem; right: 2rem; padding: 1rem 1.3rem; background: #f7f3ec; font-size: .68rem; font-weight: 700; letter-spacing: .16em; }
  .section { padding: clamp(4.5rem, 9vw, 9rem) clamp(1.2rem, 6vw, 7rem); }
  .section-heading { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-bottom: 3rem; }
  .section-heading h2 { font-size: clamp(3rem, 5vw, 5.4rem); margin: 1rem 0 0; line-height: 1.12; }
  .section-heading > p { max-width: 23rem; line-height: 1.7; color: #626257; margin-bottom: .4rem; }
  .service-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
  .service-card { background: #fffdf8; }
  .service-card img { display: block; width: 100%; height: clamp(220px, 24vw, 350px); object-fit: cover; }
  .service-info { padding: 1.4rem 1.3rem 1.8rem; }
  .service-info h3 { font: 400 1.7rem Georgia, serif; margin: 0 0 .6rem; }
  .service-info p { margin: 0; line-height: 1.55; color: #626257; font-size: .9rem; }
  .statement { text-align: center; background: #ded6c8; padding: clamp(5rem, 9vw, 9rem) 1.5rem; }
  .statement > p:last-child { font-size: clamp(2.4rem, 5vw, 5.5rem); line-height: 1.15; max-width: 920px; margin: 2rem auto 0; }
  .branch-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.3rem; }
  .branch-card { background: #ebe5d9; padding: clamp(1.5rem, 4vw, 3.5rem); }
  .branch-card h3 { font: 400 clamp(2rem, 3vw, 3rem) Georgia, serif; margin: 1.8rem 0 1rem; }
  .branch-card > p { color: #55564c; line-height: 1.7; max-width: 25rem; min-height: 5.5rem; }
  .site-footer { display: flex; justify-content: space-between; gap: 2rem; align-items: end; padding: 3rem clamp(1.2rem, 6vw, 7rem); background: #292e28; color: #f7f3ec; }
  .site-footer img { display: block; width: 125px; height: auto; background: #f7f3ec; padding: .3rem; }
  .site-footer p { margin: .6rem 0; font-size: .9rem; }
  @media (max-width: 1000px) { .service-grid { grid-template-columns: repeat(2, 1fr); } .hero { min-height: 560px; } }
  @media (max-width: 680px) { .site-header { align-items: flex-start; } .brand img { width: 100px; } nav { gap: .8rem; flex-wrap: wrap; justify-content: flex-end; } nav a { font-size: .8rem; } .header-contact { display: none; } .hero { display: flex; flex-direction: column; } .hero-copy { padding-top: 4rem; padding-bottom: 4rem; } .hero-visual { min-height: 340px; } .section-heading { display: block; } .section-heading > p { margin-top: 1.5rem; } .service-grid, .branch-grid { grid-template-columns: 1fr; } .service-card img { height: 280px; } .branch-card > p { min-height: 0; } .site-footer { align-items: flex-start; flex-direction: column; } }
  @media (prefers-reduced-motion: reduce) { :global(html) { scroll-behavior: auto; } }
</style>
