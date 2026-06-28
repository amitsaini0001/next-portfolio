import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Normalized = {
  ip: string;
  city: string;
  region: string;
  country: string;
  country_name: string;
  latitude: number;
  longitude: number;
  org: string;
  asn: string;
  timezone: string;
  postal: string;
};

function pickClientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first && !isPrivate(first)) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real && !isPrivate(real)) return real;
  return null;
}

function isPrivate(ip: string) {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.") ||
    ip === "0.0.0.0"
  );
}

async function tryIpwhois(ip: string | null): Promise<Normalized | null> {
  const url = ip ? `https://ipwho.is/${ip}` : "https://ipwho.is/";
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return null;
    const d = await r.json();
    if (!d || d.success === false) return null;
    return {
      ip: String(d.ip ?? "—"),
      city: String(d.city ?? "—"),
      region: String(d.region ?? "—"),
      country: String(d.country_code ?? "—"),
      country_name: String(d.country ?? "—"),
      latitude: Number(d.latitude ?? 0),
      longitude: Number(d.longitude ?? 0),
      org: String(d.connection?.org ?? d.connection?.isp ?? "—"),
      asn: d.connection?.asn ? `AS${d.connection.asn}` : "—",
      timezone: String(d.timezone?.id ?? "—"),
      postal: String(d.postal ?? "—"),
    };
  } catch {
    return null;
  }
}

async function tryIpapi(ip: string | null): Promise<Normalized | null> {
  const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "amit-portfolio/1.0" },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const d = await r.json();
    if (!d || d.error) return null;
    return {
      ip: String(d.ip ?? "—"),
      city: String(d.city ?? "—"),
      region: String(d.region ?? "—"),
      country: String(d.country ?? "—"),
      country_name: String(d.country_name ?? "—"),
      latitude: Number(d.latitude ?? 0),
      longitude: Number(d.longitude ?? 0),
      org: String(d.org ?? "—"),
      asn: String(d.asn ?? "—"),
      timezone: String(d.timezone ?? "—"),
      postal: String(d.postal ?? "—"),
    };
  } catch {
    return null;
  }
}

function fromVercelHeaders(req: NextRequest, ip: string | null): Normalized | null {
  const country = req.headers.get("x-vercel-ip-country");
  if (!country) return null;
  const lat = req.headers.get("x-vercel-ip-latitude");
  const lng = req.headers.get("x-vercel-ip-longitude");
  return {
    ip: ip ?? "—",
    city: decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "—"),
    region: req.headers.get("x-vercel-ip-country-region") ?? "—",
    country,
    country_name: country,
    latitude: lat ? Number(lat) : 0,
    longitude: lng ? Number(lng) : 0,
    org: "—",
    asn: "—",
    timezone: req.headers.get("x-vercel-ip-timezone") ?? "—",
    postal: req.headers.get("x-vercel-ip-postal-code") ?? "—",
  };
}

export async function GET(req: NextRequest) {
  const ip = pickClientIp(req);

  // Primary: ipwho.is (no key, generous limits)
  let data = await tryIpwhois(ip);

  // Fallback: ipapi.co
  if (!data) data = await tryIpapi(ip);

  // Last resort: Vercel-provided headers (deployed only)
  if (!data) {
    const v = fromVercelHeaders(req, ip);
    if (v) data = v;
  }

  if (!data) {
    return NextResponse.json({ error: "all_providers_failed" }, { status: 502 });
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=60" },
  });
}
