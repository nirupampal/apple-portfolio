import assert from 'node:assert/strict';
const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const slugs = ['tnb-pos','tnb-ordering','hisab-restro','microace-staff','rupvia','buildnerd-catalogue','buildnerd-quotes','catalogue-studio','create-qrcode','buildnerd-bookings','rmbc','dotcom-coin'];
const routes = ['/', '/projects', '/about', '/experience', '/skills', '/contact', ...slugs.map(slug=>`/projects/${slug}`)];
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status,200,`${route} must return 200`);
  const html = await response.text();
  assert.match(html,/<h1[\s>]/,`${route} must have a primary heading`);
  assert.doesNotMatch(html,/86176[\s-]*24775|8617624775|href="tel:/,`${route} must not publish a phone contact`);
  assert.match(html,/<link rel="canonical"/,`${route} must have a canonical URL`);
  if (route.startsWith('/projects/')) {
    assert.match(html,/MY CONTRIBUTION/,`${route} must include a case study`);
    assert.match(html,/PROBLEMS &amp; SOLUTIONS/,`${route} must include problem-solution analysis`);
    assert.match(html,/WHO THIS IS FOR/,`${route} must identify the audience`);
    assert.match(html,/IN PRACTICE/,`${route} must include project scenarios`);
    assert.doesNotMatch(html,/What needed<!-- -->|From build<br/,`${route} must not use the old generic headings`);
    if(route.endsWith('/microace-staff')) assert.doesNotMatch(html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? html,/Moving orders out of WhatsApp|cron jobs|200\+/, 'Staff must not inherit TNB engineering claims');
  }
  console.log(`PASS ${route}`);
}
const workRedirect=await fetch(base+'/works',{redirect:'manual'});
assert.equal(workRedirect.status,308);
assert.equal(workRedirect.headers.get('location'),'/projects');
const missing=await fetch(base+'/projects/not-a-real-project');
assert.equal(missing.status,404);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
for(const slug of slugs) assert.ok(sitemap.includes(`/projects/${slug}`),`Missing ${slug} from sitemap`);
assert.equal((await fetch(base+'/Nirupam_Pal_CV.pdf')).status,200);
console.log(`PASS redirects, 404, sitemap and CV; ${routes.length} public routes checked`);
