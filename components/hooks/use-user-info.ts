"use client";

import { useEffect, useState } from "react";

export type UserInfo = {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryName: string;
  latitude: number;
  longitude: number;
  org: string;
  asn: string;
  timezone: string;
  postal: string;
};

type Status = "idle" | "loading" | "ready" | "error";

export function useUserInfo() {
  const [data, setData] = useState<UserInfo | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetch("/api/whoami", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((raw) => {
        if (cancelled) return;
        if (raw.error) throw new Error(raw.reason ?? "lookup_failed");
        setData({
          ip: raw.ip ?? "—",
          city: raw.city ?? "—",
          region: raw.region ?? "—",
          country: raw.country ?? "—",
          countryName: raw.country_name ?? "—",
          latitude: typeof raw.latitude === "number" ? raw.latitude : 0,
          longitude: typeof raw.longitude === "number" ? raw.longitude : 0,
          org: raw.org ?? "—",
          asn: raw.asn ?? "—",
          timezone: raw.timezone ?? "—",
          postal: raw.postal ?? "—",
        });
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, status };
}
