/**
 * TypeScript type definitions for microCMS API responses
 */

export interface Article {
  id: string;
  title: string;
  permalink: string;
  content: string;
  thumbnail: { url: string };
  type: string[];
  createdAt: string;
  publishedAt: string;
  photoGallery?: string;
}

export interface Gallery {
  id: string;
  title: string;
  permalink: string;
  photoGallery: string;
  thumbnail: { url: string };
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
