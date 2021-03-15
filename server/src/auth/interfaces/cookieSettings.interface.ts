export interface CookieOptions {
  maxAge?: number;
  httpOnly?: boolean;
  path?: string;
}

export interface CookieSettings {
  name: string;
  value?: string;
  options?: CookieOptions;
}
