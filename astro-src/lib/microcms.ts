/**
 * microCMS API Client using fetch API
 * No axios dependency required
 */

interface MicroCMSConfig {
  serviceDomain: string;
  apiKey: string;
}

interface FetchOptions {
  endpoint: string;
  queries?: Record<string, string | number>;
}

export class MicroCMSClient {
  private config: MicroCMSConfig;

  constructor(config: MicroCMSConfig) {
    this.config = config;
  }

  /**
   * Fetch data from microCMS API using native fetch
   */
  async get<T>(options: FetchOptions): Promise<T> {
    const { endpoint, queries = {} } = options;
    
    const queryString = new URLSearchParams(
      Object.entries(queries).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `https://${this.config.serviceDomain}.microcms.io/api/v1/${endpoint}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': this.config.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`microCMS API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Example usage:
 * 
 * import { MicroCMSClient } from '@/lib/microcms';
 * 
 * const client = new MicroCMSClient({
 *   serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
 *   apiKey: import.meta.env.MICROCMS_API_KEY,
 * });
 * 
 * const articles = await client.get({
 *   endpoint: 'articles',
 *   queries: { limit: 10 },
 * });
 */
