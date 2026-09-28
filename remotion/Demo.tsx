import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DEMO_FPS = 30;
export const DEMO_DURATION = 240;
export const DEMO_WIDTH = 1280;
export const DEMO_HEIGHT = 720;

const VANTAGES = ["Frankfurt", "Singapore", "Virginia"] as const;
const CANARIES = 20;
const HEALTHY = new Set([3, 11, 16]);
const FAIL_START = 40;
const FAIL_SPREAD = 95;

const ink = "#1e293b";
const muted = "#64748b";
const green = "#16a34a";
const red = "#dc2626";

function failFrame(vantage: number, canary: number): number {
  if (HEALTHY.has(canary)) return Infinity;
  return FAIL_START + random(`v${vantage}-c${canary}`) * FAIL_SPREAD;
}

function failedCount(vantage: number, frame: number): number {
  let n = 0;
  for (let i = 0; i < CANARIES; i++) if (frame >= failFrame(vantage, i)) n++;
  return n;
}

function successRate(frame: number): number {
  let failed = 0;
  for (let v = 0; v < VANTAGES.length; v++) failed += failedCount(v, frame);
  return 1 - failed / (CANARIES * VANTAGES.length);
}

function degradedAt(): number {
  for (let f = 0; f < DEMO_DURATION; f++) {
    const confirming = VANTAGES.filter((_, v) => failedCount(v, f) >= 10).length;
    if (confirming >= 2) return f;
  }
  return DEMO_DURATION;
}

const DEGRADED_FRAME = degradedAt();
const QUOTE = "customer just reached out and my .shop is down";

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [DEMO_DURATION - 12, DEMO_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const inboxIn = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const typedChars = Math.floor(interpolate(frame, [14, 50], [0, QUOTE.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const degraded = frame >= DEGRADED_FRAME;
  const alertIn = spring({ frame: frame - DEGRADED_FRAME, fps, config: { damping: 18, stiffness: 140 } });
  const replyIn = spring({ frame: frame - DEGRADED_FRAME - 45, fps, config: { damping: 200 } });

  const rate = successRate(frame);
  const chartW = 560;
  const chartH = 110;
  const points: string[] = [];
  for (let f = 0; f <= frame; f += 3) {
    const x = (f / DEMO_DURATION) * chartW;
    const y = chartH - successRate(f) * chartH;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 55%, #e0f2fe 100%)",
        fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
        color: ink,
        opacity,
        padding: 36,
        display: "flex",
        flexDirection: "row",
        gap: 28,
      }}
    >
      <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: muted, letterSpacing: 1, textTransform: "uppercase" }}>
          Your support inbox
        </div>
        <div
          style={{
            transform: `translateY(${(1 - inboxIn) * 24}px)`,
            opacity: inboxIn,
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
            borderRadius: 18,
            padding: 22,
            backdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: "#cbd5e1" }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>mehphp</div>
              <div style={{ fontSize: 12, color: muted }}>Hacker News, Sept 24 2026</div>
            </div>
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.35, minHeight: 60 }}>
            {QUOTE.slice(0, typedChars)}
            <span style={{ opacity: typedChars < QUOTE.length && frame % 16 < 8 ? 1 : 0 }}>|</span>
          </div>
        </div>

        <div
          style={{
            transform: `translateY(${(1 - replyIn) * 24}px)`,
            opacity: replyIn,
            background: "rgba(37,99,235,0.08)",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 18,
            padding: 22,
          }}
        >
          <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>
            Your reply
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.4 }}>
            Registry-wide .shop outage, confirmed from 3 vantage points. Not our stack. Live status: tld_watch/shop
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
          borderRadius: 18,
          padding: 24,
          backdropFilter: "blur(14px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: muted, letterSpacing: 1, textTransform: "uppercase" }}>
              tld_watch
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 2 }}>.shop</div>
          </div>
          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              background: degraded ? "#fee2e2" : "#dcfce7",
              color: degraded ? "#991b1b" : "#166534",
            }}
          >
            {degraded ? "DEGRADED" : "OPERATIONAL"}
          </div>
        </div>
        <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>
          Simulation of the Sept 24 2026 zone-generation fault. Probe cadence 60s, compressed.
        </div>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {VANTAGES.map((name, v) => {
            const failed = failedCount(v, frame);
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 96, fontSize: 15, fontWeight: 600 }}>{name}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {Array.from({ length: CANARIES }, (_, i) => {
                    const down = frame >= failFrame(v, i);
                    return (
                      <div
                        key={i}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: down ? red : green,
                          opacity: down ? 1 : 0.85,
                        }}
                      />
                    );
                  })}
                </div>
                <div style={{ fontSize: 14, color: failed >= 10 ? red : muted, fontWeight: 600, width: 130 }}>
                  {failed > 0 ? `${failed}/${CANARIES} NXDOMAIN` : "20/20 resolving"}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: muted, marginBottom: 6 }}>
            <span>Canary resolution rate</span>
            <span style={{ fontWeight: 700, color: rate < 0.5 ? red : ink }}>{Math.round(rate * 100)}%</span>
          </div>
          <svg width={chartW} height={chartH + 4} style={{ display: "block" }}>
            <line x1={0} y1={chartH} x2={chartW} y2={chartH} stroke="#cbd5e1" />
            <line x1={0} y1={0} x2={chartW} y2={0} stroke="#e2e8f0" strokeDasharray="4 4" />
            {points.length > 1 && (
              <polyline
                points={points.join(" ")}
                fill="none"
                stroke={rate < 0.5 ? red : green}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            )}
            {degraded && (
              <g>
                <line
                  x1={(DEGRADED_FRAME / DEMO_DURATION) * chartW}
                  y1={0}
                  x2={(DEGRADED_FRAME / DEMO_DURATION) * chartW}
                  y2={chartH}
                  stroke={red}
                  strokeDasharray="4 3"
                />
                <text
                  x={(DEGRADED_FRAME / DEMO_DURATION) * chartW + 8}
                  y={16}
                  fontSize={13}
                  fontWeight={700}
                  fill={red}
                >
                  alert fired
                </text>
              </g>
            )}
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            right: 24,
            bottom: 24,
            width: 400,
            transform: `translateY(${(1 - alertIn) * 40}px) scale(${0.96 + alertIn * 0.04})`,
            opacity: alertIn,
            background: "#ffffff",
            borderLeft: `6px solid ${red}`,
            borderRadius: 14,
            boxShadow: "0 16px 48px rgba(15,23,42,0.18)",
            padding: "18px 20px",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: red, letterSpacing: 1, textTransform: "uppercase" }}>
            Alert: .shop degraded
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 6, lineHeight: 1.3 }}>
            17 of 20 canary domains NXDOMAIN from 3 of 3 vantage points.
          </div>
          <div style={{ fontSize: 16, marginTop: 8, color: ink }}>It is the .shop registry zone, not your stack.</div>
          <div style={{ fontSize: 13, marginTop: 10, color: muted }}>Sent to: email, webhook</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
