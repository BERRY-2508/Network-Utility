const BASE = "https://raw.githubusercontent.com/BERRY-2508/Network-Utility/main/";

export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }
    const isScript = path === "/win" || path === "/win/";
    const isHome = path === "/" || path === "/index.html";
    if (!isScript && !isHome) return new Response("Not found", { status: 404 });
    try {
      const upstream = await fetch(BASE + (isScript ? "NetworkUtility.ps1" : "index.html"), {
        headers: { "Accept": "text/plain, text/html" },
        cf: { cacheTtl: 0 }
      });
      if (!upstream.ok) return new Response("Source unavailable", { status: 502 });
      const content = await upstream.text();
      if (isScript && (!content.includes("Berry IT Network Utility") || content.trimStart().startsWith("<"))) {
        return new Response("Invalid PowerShell source", { status: 502 });
      }
      if (isHome && !content.trimStart().toLowerCase().startsWith("<!doctype html")) {
        return new Response("Invalid website source", { status: 502 });
      }
      return new Response(request.method === "HEAD" ? null : content, {
        status: 200,
        headers: {
          "Content-Type": isScript ? "text/plain; charset=utf-8" : "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
          "X-BerryIT-Site": isScript ? "network-utility-script" : "network-utility-blackjack-layout",
          "X-BerryIT-Layout-Version": "2026-10-31-blackjack-match"
        }
      });
    } catch {
      return new Response("Source unavailable", { status: 502 });
    }
  }
};
