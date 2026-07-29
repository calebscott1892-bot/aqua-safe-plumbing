/**
 * Emits a JSON-LD block for a page. Mirrors how layout.tsx injects the
 * LocalBusiness entity — the graph is split so each page declares only its own
 * schema and references the business by @id rather than repeating it.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
