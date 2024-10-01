import { Sitemap } from 'next-sitemap';
export default async function handler() {
  try {
    // Replace with logic to fetch or
    // generate your website URLs dynamically
    const urls = [];
    return Sitemap(urls).toXML();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Handle errors gracefully (e.g. return empty sitemap)
    return '';
  }
}