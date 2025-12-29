/**
 * microCMS API Client using Fetch API
 * No axios dependency required
 * Based on src/_data/articles.js implementation
 */

import { parse } from 'node-html-parser';
import type { Article, Gallery, MicroCMSResponse } from './types';

const API_ENDPOINT = import.meta.env.MICROCMS_API_ENDPOINT;
const API_KEY = import.meta.env.MICROCMS_API_KEY;

/**
 * Parse photo gallery HTML and transform img tags
 * Converts img tags to lightbox-compatible anchors with lazy loading
 */
export function parsePhohoGallery(htmldata: any): any {
  const resArray = { ...htmldata };
  resArray.contents.forEach((article: Article) => {
    if (article.photoGallery) {
      let images = '';
      const parsed = parse(article.photoGallery);
      const pTag = parsed.querySelector('p');
      if (pTag) {
        pTag.querySelectorAll('img').forEach((img) => {
          const { src, width, height } = img.attributes;
          images += `<a href="${src}" data-lg-size="${width}-${height}"><img data-src="${src}" class="lazyload" loading="lazy" alt="" width="${width}" height="${height}" /></a>`;
        });
        article.photoGallery = images;
      }
    }
  });
  return resArray;
}

/**
 * Fetch all articles from microCMS
 * @returns Promise<Article[]> - Array of all articles
 */
export async function getArticles(): Promise<Article[]> {
  const response = await fetch(
    `${API_ENDPOINT}/neurona?limit=100`,
    {
      headers: {
        'X-API-KEY': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`microCMS API error: ${response.status}`);
  }

  const data: MicroCMSResponse<Article> = await response.json();
  const renderHTML = parsePhohoGallery(data);
  return renderHTML.contents;
}

/**
 * Fetch a single article by slug (permalink)
 * @param slug - The article slug/permalink
 * @returns Promise<Article | undefined> - The article or undefined if not found
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.permalink === slug);
}

/**
 * Fetch all gallery data from microCMS
 * @returns Promise<Gallery[]> - Array of all galleries
 */
export async function getGalleries(): Promise<Gallery[]> {
  const response = await fetch(
    `${API_ENDPOINT}/neurona?limit=100`,
    {
      headers: {
        'X-API-KEY': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`microCMS API error: ${response.status}`);
  }

  const data: MicroCMSResponse<Gallery> = await response.json();
  const renderHTML = parsePhohoGallery(data);
  return renderHTML.contents;
}

/**
 * Fetch a single gallery by slug (permalink)
 * @param slug - The gallery slug/permalink
 * @returns Promise<Gallery | undefined> - The gallery or undefined if not found
 */
export async function getGalleryBySlug(slug: string): Promise<Gallery | undefined> {
  const galleries = await getGalleries();
  return galleries.find((gallery) => gallery.permalink === slug);
}
