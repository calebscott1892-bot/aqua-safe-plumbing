/** Simple 24×24 line icons keyed by the `icon` id in src/content/services.ts. */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ICONS: Record<string, JSX.Element> = {
  drain: (<><circle cx="12" cy="12" r="8" {...P} /><path d="M9 9l6 6M15 9l-6 6" {...P} /></>),
  bath: (<><path d="M4 12h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4Z" {...P} /><path d="M6 12V6a2 2 0 0 1 2-2h1M17 20l1 1M7 20l-1 1" {...P} /></>),
  pipe: (<><path d="M4 8h7a2 2 0 0 1 2 2v10" {...P} /><path d="M20 16h-7a2 2 0 0 1-2-2V4" {...P} /></>),
  flame: (<><path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1 0-1 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 4-6 5-11Z" {...P} /></>),
  filter: (<><path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" {...P} /></>),
  wrench: (<><path d="M15 5a4 4 0 0 0-5 5L4 16l4 4 6-6a4 4 0 0 0 5-5l-3 3-2-2 3-3-2-2Z" {...P} /></>),
  home: (<><path d="M4 11l8-6 8 6" {...P} /><path d="M6 10v9h12v-9" {...P} /><path d="M10 19v-5h4v5" {...P} /></>),
  building: (<><rect x="5" y="4" width="14" height="16" rx="1" {...P} /><path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M10 20v-3h4v3" {...P} /></>),
  jet: (<><path d="M3 12h6M14 12l6-3v6l-6-3Z" {...P} /><path d="M9 9v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1Z" {...P} /></>),
  shield: (<><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3Z" {...P} /><path d="M9 12l2 2 4-4" {...P} /></>),
  commercial: (<><path d="M4 20V9l6-4 6 4v11" {...P} /><path d="M16 20V11l4-2v11M8 20v-4h4v4" {...P} /></>),
  camera: (<><rect x="3" y="7" width="18" height="12" rx="2" {...P} /><circle cx="12" cy="13" r="3" {...P} /><path d="M8 7l1.5-2h5L16 7" {...P} /></>),
  calendar: (<><rect x="4" y="5" width="16" height="15" rx="2" {...P} /><path d="M4 9h16M8 3v4M16 3v4M9 14l2 2 4-4" {...P} /></>),
  search: (<><circle cx="11" cy="11" r="6" {...P} /><path d="M20 20l-4-4" {...P} /></>),
  hotwater: (<><rect x="7" y="3" width="10" height="15" rx="3" {...P} /><path d="M9.5 10c.8-1 .8-2 0-3M12.5 11c1-1.2 1-2.6 0-3.8M9 21h2M13 21h2M9 18v3M15 18v3" {...P} /></>),
  facility: (<><path d="M3 20h18" {...P} /><path d="M5 20V8l5-3v15M14 20V10h5v10" {...P} /><path d="M7 9h.01M7 12h.01M7 15h.01M16.5 13h.01M16.5 16h.01" {...P} /></>),
  fitout: (<><rect x="4" y="4" width="16" height="16" rx="1" {...P} /><path d="M4 12h7M11 12V4M11 12a4 4 0 0 1 4 4" {...P} /><path d="M15 20v-1" {...P} /></>),
};

export function ServiceIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[id] ?? ICONS.wrench}
    </svg>
  );
}
