// Site constants for walkingpadsale.com
export const ORIGIN = 'https://walkingpadsale.com';
export const SITE = 'Walking Pad Sale';
export const WRITER = 'Ryan Caldwell';
export const ISO = '2026-11-21';
export const AS_OF = 'November 21, 2026';
export const INDEXNOW_KEY = 'c6c571e70af053c9bb5902eaaee813cb';

// Amazon links live here so the Associates tag can be added in one place later.
export const AMZ_TAG = '';
export const amz = (query) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}${AMZ_TAG ? `&tag=${AMZ_TAG}` : ''}`;

export const safe = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
