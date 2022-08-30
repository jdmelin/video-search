import { SearchResult } from '../models/search-result.model';

const apiKey = 'AIzaSyBodF7AjfuR3FPidlGP46IYXEsBjD-T4W8';
const apiRoot = 'https://www.googleapis.com/youtube/v3';

export default {
  buildResults(data: any): SearchResult[] {
    return data.items.map((result: any) => {
      const id = result.id.videoId;
      const { description, thumbnails, title } = result.snippet;
      const thumbnail = thumbnails.default.url;

      return {
        description,
        id,
        thumbnail,
        title,
      };
    });
  },

  async searchByKeyword(keyword: string, sortBy: string) {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      maxResults: '25',
      q: keyword,
      key: apiKey,
      order: sortBy,
    });

    try {
      const response = await fetch(`${apiRoot}/search?${searchParams}`);
      const data = await response.json();
      return this.buildResults(data);
    } catch {
      // TODO: handle error
    }
  },
};
