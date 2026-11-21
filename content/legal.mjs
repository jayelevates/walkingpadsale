import { SITE, ORIGIN } from '../lib/site.mjs';
const host = ORIGIN.replace('https://', '');
const mail = `info@${host}`;
export default [
  { path: 'how-we-choose', legal: true, short: 'How we choose', tab: `How We Choose Walking Pads | ${SITE}`, summary: `How ${SITE} picks and ranks walking pads and treadmills.`, heading: 'How we choose',
    parts: [['What we look at', '<p>We compare machines on the maker\'s specifications and manuals, long-term owner feedback, repair and parts support, and typical street prices. We weigh belt size, speed range, weight limits, noise, storage and warranty support.</p>'], ['What we do not do', '<p>Brands cannot pay to be included or ranked. We do not claim hands-on lab testing; where we give a rating, it reflects specifications, owner feedback and value.</p>'], ['Prices', '<p>We describe prices as typical bands rather than exact figures, because retail prices change daily. Always check the current price on the seller\'s page before buying.</p>']] },
  { path: 'affiliate-disclosure', legal: true, short: 'Affiliate disclosure', tab: `Affiliate Disclosure | ${SITE}`, summary: `How ${SITE} earns money.`, heading: 'Affiliate disclosure',
    parts: [['How this site makes money', '<p>Some links on this site are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. This never changes which products we recommend or how we rank them.</p>']] },
  { path: 'privacy', legal: true, short: 'Privacy', tab: `Privacy Policy | ${SITE}`, summary: `Privacy policy for ${SITE}.`, heading: 'Privacy policy',
    parts: [['What we collect', '<p>This site has no accounts, forms or comments, and we do not ask for personal information. Our hosting provider keeps standard server logs, such as IP address, browser type and pages requested, for security and performance.</p>'], ['Cookies and links', '<p>We do not set advertising cookies. When you follow a link to a retailer, that retailer may set its own cookies under its own privacy policy, including to track affiliate referrals.</p>'], ['Contact', `<p>Questions about this policy: <a href="mailto:${mail}">${mail}</a>.</p>`]] },
  { path: 'terms', legal: true, short: 'Terms', tab: `Terms of Use | ${SITE}`, summary: `Terms of use for ${SITE}.`, heading: 'Terms of use',
    parts: [['Using this site', '<p>Content on this site is for general information. We work to keep it accurate, but specifications and prices change, so confirm details with the seller before you buy.</p>'], ['No warranty', '<p>The site is provided as is, without warranties of any kind. We are not responsible for purchases made from third-party sellers.</p>'], ['Contact', `<p><a href="mailto:${mail}">${mail}</a></p>`]] },
  { path: 'contact', legal: true, short: 'Contact', tab: `Contact | ${SITE}`, summary: `Contact ${SITE}.`, heading: 'Contact',
    parts: [['Get in touch', `<p>Spotted an error or have a question about a walking pad? Email <a href="mailto:${mail}">${mail}</a>.</p>`]] },
];
