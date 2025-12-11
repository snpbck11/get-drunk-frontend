export function getMediaUrl(path: string | undefined) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${path}`;
}

export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "только что";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}м назад`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}ч назад`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}д назад`;
  return then.toLocaleDateString();
}
