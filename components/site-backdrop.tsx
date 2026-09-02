/**
 * 画面全体の背景。手前から順に
 * オーロラ → 舞う雪 → フィヨルドの山とアレンデール城 → ビネット
 * を重ねて夜のアートハランをつくる。装飾専用なので aria-hidden。
 */
export default function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* 夜空のベース。上は紫、足元は森の緑がにじむ */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(120% 90% at 50% 0%, #2A1D37 0%, transparent 60%)",
            "radial-gradient(90% 70% at 10% 100%, rgba(84, 107, 86, 0.35) 0%, transparent 65%)",
            "radial-gradient(70% 60% at 90% 90%, rgba(74, 54, 95, 0.6) 0%, transparent 70%)",
          ].join(","),
        }}
      />

      {/* オーロラのカーテン。縞を斜めに流し、上下をぼかして空に溶かす */}
      <div
        className="animate-aurora absolute -top-[12vh] left-[-18%] h-[58vh] w-[95vw] -rotate-6 mix-blend-screen blur-[45px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, rgba(124, 245, 168, 0) 0px, rgba(124, 245, 168, 0.62) 70px, rgba(148, 214, 160, 0.4) 130px, rgba(124, 245, 168, 0) 210px)",
          maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 60%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 60%, transparent 95%)",
        }}
      />
      <div
        className="animate-aurora absolute -top-[8vh] right-[-15%] h-[52vh] w-[80vw] rotate-3 mix-blend-screen blur-[55px] [animation-delay:-9s]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(80deg, rgba(150, 236, 255, 0) 0px, rgba(150, 236, 255, 0.5) 90px, rgba(190, 168, 226, 0.42) 150px, rgba(150, 236, 255, 0) 240px)",
          maskImage: "linear-gradient(180deg, transparent 5%, #000 35%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 5%, #000 35%, transparent 92%)",
        }}
      />
      {/* 奥でゆらぐ紫の光 */}
      <div
        className="animate-aurora absolute top-[4%] left-[8%] h-[52vh] w-[72vw] rounded-full mix-blend-screen blur-[130px] [animation-delay:-16s]"
        style={{
          background: "radial-gradient(closest-side, rgba(144, 123, 173, 0.55), transparent 72%)",
        }}
      />

      {/* 舞う雪。粒の大きさを変えた3層を別々の速さで流す */}
      <div
        className="absolute inset-0 animate-snow opacity-70"
        style={{
          backgroundImage: [
            "radial-gradient(1.6px 1.6px at 12% 18%, rgba(236, 242, 249, 0.9), transparent)",
            "radial-gradient(1.2px 1.2px at 68% 42%, rgba(214, 244, 252, 0.8), transparent)",
            "radial-gradient(2.2px 2.2px at 37% 76%, rgba(255, 255, 255, 0.55), transparent)",
          ].join(","),
          backgroundSize: "320px 420px, 240px 360px, 460px 540px",
        }}
      />

      {/* フィヨルドの山並みとアレンデール城 */}
      <svg
        className="absolute bottom-28 left-1/2 h-[34vh] w-full min-w-[820px] -translate-x-1/2 opacity-90 sm:bottom-0 sm:h-[46vh] sm:min-w-[1100px]"
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A365F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1A1124" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A1D37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#120B1D" />
          </linearGradient>
          <linearGradient id="castle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#392949" />
            <stop offset="100%" stopColor="#150E20" />
          </linearGradient>
          <linearGradient id="fjord" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A485E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#120B1D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 奥の稜線（雪をかぶった峰） */}
        <path
          d="M0 300 L120 214 L196 258 L300 168 L392 244 L470 196 L560 268 L648 220 L720 260 L806 206 L900 268 L1000 200 L1092 262 L1180 208 L1272 268 L1360 226 L1440 286 L1440 420 L0 420 Z"
          fill="url(#ridge-far)"
        />
        <path d="M300 168 L268 200 L292 208 L312 194 L336 206 L392 244 Z" fill="#D7E3F1" fillOpacity="0.35" />
        <path d="M1000 200 L972 232 L996 238 L1016 226 L1040 236 L1092 262 Z" fill="#D7E3F1" fillOpacity="0.28" />

        {/* 城 */}
        <g fill="url(#castle)">
          {/* 城壁 */}
          <path d="M556 306 h56 v-14 h20 v14 h56 v-14 h20 v14 h132 v-14 h20 v14 h56 v-14 h20 v14 h52 v46 H556 Z" />
          {/* 外側の小塔 */}
          <rect x="596" y="238" width="34" height="70" />
          <path d="M592 240 L613 186 L634 240 Z" />
          <rect x="828" y="234" width="34" height="74" />
          <path d="M824 236 L845 180 L866 236 Z" />
          {/* 内側の塔 */}
          <rect x="644" y="200" width="42" height="108" />
          <path d="M639 202 L665 130 L691 202 Z" />
          <rect x="772" y="194" width="42" height="114" />
          <path d="M767 196 L793 120 L819 196 Z" />
          {/* 本丸 */}
          <rect x="692" y="160" width="74" height="148" />
          <path d="M686 162 L729 68 L772 162 Z" />
        </g>

        {/* 尖塔の先の氷の輝き */}
        <g fill="#D6F4FC">
          <circle cx="729" cy="62" r="2.6" opacity="0.9" />
          <circle cx="665" cy="124" r="2" opacity="0.7" />
          <circle cx="793" cy="114" r="2" opacity="0.7" />
        </g>

        {/* 城の灯り */}
        <g fill="#F7C22C">
          <rect x="716" y="196" width="7" height="12" rx="3" opacity="0.85" />
          <rect x="736" y="196" width="7" height="12" rx="3" opacity="0.65" />
          <rect x="716" y="228" width="7" height="12" rx="3" opacity="0.75" />
          <rect x="736" y="228" width="7" height="12" rx="3" opacity="0.9" />
          <rect x="659" y="232" width="6" height="11" rx="3" opacity="0.7" />
          <rect x="789" y="226" width="6" height="11" rx="3" opacity="0.8" />
          <rect x="609" y="266" width="6" height="10" rx="3" opacity="0.6" />
          <rect x="841" y="262" width="6" height="10" rx="3" opacity="0.7" />
          <rect x="676" y="322" width="6" height="12" rx="3" opacity="0.55" />
          <rect x="756" y="322" width="6" height="12" rx="3" opacity="0.65" />
        </g>

        {/* 水面に落ちる灯りの帯 */}
        <rect x="700" y="352" width="60" height="68" fill="url(#fjord)" opacity="0.7" />

        {/* 手前の岸 */}
        <path
          d="M0 352 L150 320 L286 356 L420 330 L560 358 L720 344 L880 360 L1030 332 L1180 360 L1320 334 L1440 358 L1440 420 L0 420 Z"
          fill="url(#ridge-near)"
        />
      </svg>

      {/* 中央を暗く落として文字のコントラストを確保する */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(110% 70% at 50% 50%, rgba(18, 11, 29, 0) 45%, rgba(18, 11, 29, 0.45) 100%)",
        }}
      />
    </div>
  );
}
