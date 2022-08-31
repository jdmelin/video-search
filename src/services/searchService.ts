import { Result } from '../models/result.model';

// Not concerned about exposing this key for current purposes
const apiKey = 'AIzaSyBodF7AjfuR3FPidlGP46IYXEsBjD-T4W8';
const apiRoot = 'https://www.googleapis.com/youtube/v3';

export default {
  buildResults(data: any) {
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

  async getVideoComments(id: string) {
    const searchParams = new URLSearchParams({
      part: 'statistics',
      key: apiKey,
      id,
    });

    try {
      const response = await fetch(`${apiRoot}/videos?${searchParams}`);
      const data = await response.json();
      const comments = data.items[0].statistics.commentCount;
      return comments;
    } catch {
      // TODO: handle error
    }
  },

  async searchByKeyword(keyword: string, sortBy: string) {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      maxResults: '25',
      key: apiKey,
      ...(keyword && { q: keyword }),
      ...(sortBy && { sortBy }),
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
