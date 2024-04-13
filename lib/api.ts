import { RequestOptions, HttpResponse } from "@types";
// import {
//   NEXT_PUBLIC_SITE_URL,
//   RAPID_API_BASE_URL,
//   RAPID_API_KEY,
// } from "./constants";

const globalOptions: Omit<RequestOptions, "method"> = {
  next: {
    revalidate: 60 * 60,
  },
};

export class HttpClient {
  constructor(
    private baseURL: string | URL = new URL("/api/", process.env.NEXT_PUBLIC_SITE_URL!),
    private defaultOptions: Omit<RequestOptions, "method"> = {}
  ) {}

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
    } catch (error) {
      return false;
    }

    return true;
  }

  private normalizeParams(params?: RequestOptions["params"]) {
    if (!params) {
      return [];
    }

    return Object.entries(params).reduce(
      (acc, [key, val]) => Object.assign(acc, { [key]: String(val) }),
      {} as Record<string, string>
    );
  }

  private buildUrl(path: string, params?: RequestOptions["params"]) {
    let url = this.baseURL;

    path = path.trim();
    if (!path.endsWith("/") && path.indexOf("?") < 1) {
      path += "/";
    }

    if (typeof url == "string") {
      url = new URL(url.trim());
    }

    if (params) {
      url.search = new URLSearchParams(this.normalizeParams(params)).toString();
    }

    return new URL(path, url).toString();
  }

  private mergeHeaders(...headers: HeadersInit[]): Headers {
    const mergedHeaders = new Headers();

    for (const header of headers) {
      if (header instanceof Headers) {
        // Se o cabeçalho fornecido for um objeto Headers, iteramos sobre seus pares chave/valor e os adicionamos ao objeto mergedHeaders
        header.forEach((value, key) => {
          mergedHeaders.append(key, value);
        });
      } else if (Array.isArray(header)) {
        // Se o cabeçalho fornecido for uma matriz de pares chave/valor, iteramos sobre ela e os adicionamos ao objeto mergedHeaders
        header.forEach(([key, value]) => {
          mergedHeaders.append(key, value);
        });
      } else if (typeof header === "object" && header !== null) {
        // Se o cabeçalho fornecido for um objeto simples, iteramos sobre suas chaves e os adicionamos ao objeto mergedHeaders
        Object.entries(header).forEach(([key, value]) => {
          mergedHeaders.append(key, value);
        });
      } else {
        throw new Error("Invalid header type");
      }
    }

    return mergedHeaders;
  }

  private mergeOptions(...options: Omit<RequestOptions, "method">[]) {
    let noptions: Omit<RequestOptions, "method"> = {};

    for (const option of options) {
      noptions = {
        ...noptions,
        ...option,
        headers: this.mergeHeaders(
          noptions.headers ?? {},
          option.headers ?? {}
        ),
        next: { ...(noptions.next ?? {}), ...(option.next ?? {}) },
      };
    }

    return noptions;
  }

  private buildRequestOptions(
    method: RequestOptions["method"],
    options?: Omit<RequestOptions, "method">
  ): RequestOptions {
    const requestOptions = Object.assign(
      this.mergeOptions(globalOptions, this.defaultOptions, options ?? {}),
      { method }
    );

    if (options?.body) {
      (requestOptions.headers as Headers).set(
        "Content-Type",
        "application/json"
      );
    }

    return requestOptions;
  }

  private async sendRequest<T>(
    url: string,
    options: Omit<RequestOptions, "params">
  ): Promise<HttpResponse<T>> {
    if (!this.isValidUrl(url)) {
      throw new Error(`Invalid URL provided`);
    }
    // console.log(JSON.stringify({ url, options }, null, 2));

    const res = await fetch(url, options);

    return {
      data: (await res.json()) as T,
      status: res.status,
      statusMessage: res.statusText,
      headers: res.headers,
    };
  }

  private async send<T>(
    method: RequestOptions["method"],
    path: string,
    options?: Omit<RequestOptions, "method">
  ): Promise<HttpResponse<T>> {
    try {
      return await this.sendRequest<T>(
        this.buildUrl(path, options?.params),
        this.buildRequestOptions(method, options)
      );
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(
    path: string,
    body: NonNullable<Extract<RequestOptions, "body">>,
    options?: Omit<RequestOptions, "method">
  ) {
    return this.send<T>("POST", path, { body, ...options });
  }

  public async put<T>(
    path: string,
    body: NonNullable<Extract<RequestOptions, "body">>,
    options?: Omit<RequestOptions, "method">
  ) {
    return this.send<T>("PUT", path, { body, ...options });
  }

  public async patch<T>(
    path: string,
    body: NonNullable<Extract<RequestOptions, "body">>,
    options?: Omit<RequestOptions, "method">
  ) {
    return this.send<T>("PATCH", path, { body, ...options });
  }

  public async delete<T>(
    path: string,
    options?: Omit<RequestOptions, "method">
  ) {
    return this.send<T>("DELETE", path, options);
  }

  public async get<T>(path: string, options?: Omit<RequestOptions, "method">) {
    return this.send<T>("GET", path, options);
  }
}

// let api = new HttpClient('http://127.0.0.1:8000/v1/')
let api = new HttpClient();

if (typeof window === "undefined") {
  api = new HttpClient(process.env.RAPID_API_BASE_URL, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": new URL(process.env.RAPID_API_BASE_URL!).host,
    },
  });
}

export default api;
