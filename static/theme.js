// Apply before paint; a saved choice wins over the device preference.
(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('catwalk21-theme'); } catch {}
  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c1117' : '#fbf3ec');
    window.dispatchEvent(new Event('themechange'));
  };
  const systemTheme = () => media.matches ? 'dark' : 'light';
  apply(preference === 'dark' || preference === 'light' ? preference : systemTheme());
  media.addEventListener('change', () => {
    if (preference !== 'dark' && preference !== 'light') apply(systemTheme());
  });
  window.addEventListener('toggle-theme', () => {
    preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(preference);
    try { localStorage.setItem('catwalk21-theme', preference); } catch {}
  });
})();
