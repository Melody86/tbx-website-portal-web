const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080';

/** 与后端 ResultData 一致：成功时 code 为 200 */
const SUCCESS_CODE = 200;

type Query = Record<string, string | number | boolean | undefined | null>;

type ApiResponse = {
  code?: number
  msg?: string
  data?: unknown
}

function ensureSuccess(json: ApiResponse, url: string): void {
  if (json && typeof json.code === 'number' && json.code !== SUCCESS_CODE) {
    throw new Error(json.msg ?? `API 请求失败 (code: ${json.code}) - ${url}`);
  }
}

function wrapFetchError(err: unknown, url: string): Error {
  const message =
    err instanceof TypeError && err.message === 'fetch failed'
      ? `无法连接后端 API（${url}）。请确认：1) 后端服务已启动；2) 环境变量 NEXT_PUBLIC_API_BASE_URL 是否正确（当前: ${API_BASE}）`
      : err instanceof Error
        ? err.message
        : String(err);
  return new Error(message);
}

export async function apiGet<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      cache: 'no-store',
      ...init,
    });
  } catch (err) {
    throw wrapFetchError(err, url.toString());
  }

  if (!res.ok) {
    throw new Error(`API 请求失败: ${res.status} ${res.statusText} - ${url.toString()}`);
  }

  const json = (await res.json()) as ApiResponse;
  ensureSuccess(json, url.toString());
  // 后端统一使用 { code, msg, data } 结构
  return (json?.data ?? json) as T;
}

export async function apiPost<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers as HeadersInit) },
      body: JSON.stringify(body),
      ...init,
    });
  } catch (err) {
    throw wrapFetchError(err, url);
  }
  const json = (await res.json()) as ApiResponse;
  if (!res.ok) {
    throw new Error(json.msg ?? `请求失败: ${res.status} - ${url}`);
  }
  ensureSuccess(json, url);
  return (json?.data ?? json) as T;
}

