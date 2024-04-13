export interface RequestOptions extends RequestInit {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  // headers?: Record<string, string>;
  params?: Record<string, string | boolean | number>;
}

export interface HttpResponse<T> {
  data: T;
  status?: number;
  statusMessage?: string;
  headers: Headers;
}

export type WallpapersOrdering = "ML" | "MV" | "AD" | "";

export interface IAnimeItem {
  name: string;
  cover: string;
  id: string;
  alternative_names: string[];
  followers_count: number;
  added_at: string;
  is_following: boolean;
}

export interface IWallpaperItem {
  added_at: string;
  downloads: number;
  id: string;
  is_liked: boolean;
  likes_count: number;
  source: string;
  tags: string[];
  anime: number;
  views: number;
}

export type IApiResponse<T = any, P = false> = P extends false
  ? T
  : {
      count: number;
      next: number | null;
      previous: number | null;
      results: T[];
    };

export interface IUser {
  username: string;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface ISimplePayload {
  success: boolean;
  type: "add" | "remove";
}

type SSRPageProps = {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_API_URL: string;
    }
  }
}

declare module "next-auth" {
  interface User extends ITokens {}
}
