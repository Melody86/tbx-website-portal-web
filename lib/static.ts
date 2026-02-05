/**
 * 将后端返回的图片路径转为可访问的 URL。
 * - 已是完整 URL（http/https）则直接返回；
 * - 相对路径（如 /profile/xxx）则原样返回，不拼接后端前缀，由浏览器按当前站点同源解析。
 */
export function getStaticUrl(url: string | null | undefined): string {
  if (url == null || url === '') return '';
  if (/^https?:\/\//i.test(url)) return url;
  // 相对路径不拼接前缀，直接使用（与 portal 同源或由网关/nginx 统一转发）
  return url.startsWith('/') ? url : `/${url}`;
}
