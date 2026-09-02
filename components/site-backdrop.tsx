export default function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(180deg, transparent 38%, rgba(10, 16, 12, 0.9) 100%)",
            "radial-gradient(125% 85% at 50% 0%, #3A2A50 0%, #241A34 42%, transparent 66%)",
            "radial-gradient(70% 45% at 12% 92%, rgba(84, 107, 86, 0.45) 0%, transparent 70%)",
            "radial-gradient(45% 34% at 52% 88%, rgba(160, 112, 52, 0.35) 0%, transparent 72%)",
            "radial-gradient(60% 50% at 88% 6%, rgba(113, 92, 142, 0.55) 0%, transparent 74%)",
          ].join(","),
        }}
      />

      <div
        className="animate-aurora absolute -top-[12vh] left-[-18%] h-[58vh] w-[105vw] -rotate-6 mix-blend-screen blur-[45px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, rgba(124, 245, 168, 0) 0px, rgba(124, 245, 168, 0.55) 70px, rgba(148, 214, 160, 0.32) 130px, rgba(124, 245, 168, 0) 210px)",
          maskImage: "linear-gradient(180deg, transparent 0%, #000 32%, transparent 86%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 32%, transparent 86%)",
        }}
      />
      <div
        className="animate-aurora absolute -top-[8vh] right-[-15%] h-[52vh] w-[75vw] rotate-3 mix-blend-screen blur-[55px] [animation-delay:-9s]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(80deg, rgba(150, 236, 255, 0) 0px, rgba(150, 236, 255, 0.4) 90px, rgba(160, 214, 176, 0.4) 150px, rgba(150, 236, 255, 0) 240px)",
          maskImage: "linear-gradient(180deg, transparent 5%, #000 35%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 5%, #000 35%, transparent 92%)",
        }}
      />
      <div
        className="animate-aurora absolute -top-[6%] left-[8%] h-[42vh] w-[64vw] rounded-full mix-blend-screen blur-[130px] [animation-delay:-16s]"
        style={{
          background: "radial-gradient(closest-side, rgba(150, 126, 186, 0.5), transparent 74%)",
        }}
      />

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

      <svg
        className="absolute bottom-28 left-1/2 h-[56vh] w-full min-w-[820px] -translate-x-1/2 opacity-90 sm:bottom-0 sm:h-[70vh] sm:min-w-[1180px]"
        viewBox="0 -300 1440 760"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E4133" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0C130E" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3024" />
            <stop offset="100%" stopColor="#0C130E" />
          </linearGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B5340" />
            <stop offset="60%" stopColor="#4A3828" />
            <stop offset="100%" stopColor="#2E2218" />
          </linearGradient>
          <linearGradient id="wall-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#503C2A" />
            <stop offset="100%" stopColor="#2E2217" />
          </linearGradient>
          <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E5A43" />
            <stop offset="100%" stopColor="#1F3023" />
          </linearGradient>
          <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A3325" />
            <stop offset="100%" stopColor="#0E1712" />
          </linearGradient>
          <linearGradient id="north-rock" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#8FCFE4" />
            <stop offset="40%" stopColor="#4A87A5" />
            <stop offset="75%" stopColor="#255269" />
            <stop offset="100%" stopColor="#153244" />
          </linearGradient>
          <linearGradient id="north-snow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7FDFF" />
            <stop offset="55%" stopColor="#D2EEF8" />
            <stop offset="100%" stopColor="#93CFE4" />
          </linearGradient>
          <radialGradient id="north-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7BD9F1" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#7BD9F1" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A6238" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0E1712" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform="translate(0 372) scale(1 0.78) translate(0 -372)">
          <ellipse cx="1010" cy="-90" rx="380" ry="330" fill="url(#north-glow)" />
          <path
            d="M596 372 L700 250 L760 268 L830 170 L890 60 L1010 -232 L1082 -30 L1140 66 L1196 26 L1268 150 L1350 108 L1440 196 L1440 372 Z"
            fill="url(#north-rock)"
          />
          <path
            d="M1010 -232 L1078 -40 L1058 -34 L1038 -62 L1016 -26 L994 -60 L972 -22 L950 -56 L931 -40 Z"
            fill="url(#north-snow)"
            fillOpacity="0.82"
          />
          <path d="M1010 -232 L931 -40 L958 -52 L978 -110 L994 -160 Z" fill="#FFFFFF" fillOpacity="0.3" />
          <path d="M1010 -232 L1082 -30 L1140 66 L1104 60 L1042 -84 Z" fill="#0B2E3F" fillOpacity="0.34" />
          <path d="M890 60 L830 170 L760 268 L700 250 L596 372 L668 372 L790 236 L858 148 Z" fill="#D6F4FC" fillOpacity="0.1" />
          <path d="M890 60 L918 84 L898 92 L946 108 Z" fill="#FFFFFF" fillOpacity="0.3" />
          <path d="M1196 26 L1226 62 L1204 68 L1248 88 Z" fill="#FFFFFF" fillOpacity="0.24" />
        </g>

        <path
          d="M0 330 L110 236 L188 284 L296 186 L392 268 L470 214 L566 292 L654 240 L742 286 L830 222 L920 292 L1020 216 L1112 286 L1198 226 L1290 292 L1372 244 L1440 306 L1440 460 L0 460 Z"
          fill="url(#ridge-far)"
        />
        <path d="M296 186 L262 222 L288 230 L310 214 L336 228 L392 268 Z" fill="#E8F0EC" fillOpacity="0.2" />
        <path d="M1020 216 L990 250 L1016 256 L1038 242 L1064 254 L1112 286 Z" fill="#E8F0EC" fillOpacity="0.14" />

        <g>
          <path d="M0 320 h150 v12 H0 Z" fill="url(#wall-shade)" />
          <path d="M150 318 h360 v14 H150 Z" fill="url(#wall)" />
          <path d="M150 332 h360 v30 H150 Z" fill="url(#wall-shade)" />
          <g fill="#080E0B" fillOpacity="0.92">
            <path d="M188 362 v-14 a28 22 0 0 1 56 0 v14 Z" />
            <path d="M298 362 v-14 a28 22 0 0 1 56 0 v14 Z" />
            <path d="M408 362 v-14 a28 22 0 0 1 56 0 v14 Z" />
          </g>
        </g>

        <path d="M470 358 q120 -34 250 -34 q130 0 250 34 l0 102 H470 Z" fill="url(#rock)" />

        <g>
          <path d="M510 300 h420 v22 H510 Z" fill="url(#wall)" />
          <g fill="url(#wall)">
            <rect x="510" y="288" width="20" height="14" />
            <rect x="560" y="288" width="20" height="14" />
            <rect x="610" y="288" width="20" height="14" />
            <rect x="810" y="288" width="20" height="14" />
            <rect x="860" y="288" width="20" height="14" />
            <rect x="910" y="288" width="20" height="14" />
          </g>
          <path d="M510 322 h420 v36 H510 Z" fill="url(#wall-shade)" />
          <path d="M694 358 v-30 a26 26 0 0 1 52 0 v30 Z" fill="#160F09" />
          <path d="M700 358 v-28 a20 20 0 0 1 40 0 v28 Z" fill="#EEA501" fillOpacity="0.35" />
        </g>

        <g>
          <rect x="546" y="238" width="56" height="84" fill="url(#wall)" />
          <path d="M544 240 L574 154 L604 240 Z" fill="url(#roof)" />
          <rect x="838" y="234" width="56" height="88" fill="url(#wall)" />
          <path d="M836 236 L866 146 L896 236 Z" fill="url(#roof)" />

          <rect x="612" y="252" width="96" height="70" fill="url(#wall-shade)" />
          <path d="M604 254 L660 210 L716 254 Z" fill="url(#roof)" />
          <rect x="734" y="248" width="100" height="74" fill="url(#wall-shade)" />
          <path d="M726 250 L784 204 L842 250 Z" fill="url(#roof)" />

          <rect x="676" y="196" width="92" height="126" fill="url(#wall)" />
          <path d="M666 198 L722 116 L778 198 Z" fill="url(#roof)" />
          <rect x="716" y="86" width="12" height="34" fill="url(#wall)" />
          <path d="M710 90 L722 58 L734 90 Z" fill="url(#roof)" />

          <rect x="666" y="214" width="18" height="108" fill="url(#wall-shade)" />
          <path d="M660 216 L675 182 L690 216 Z" fill="url(#roof)" />
          <rect x="760" y="214" width="18" height="108" fill="url(#wall-shade)" />
          <path d="M754 216 L769 182 L784 216 Z" fill="url(#roof)" />
        </g>

        <g fill="#F7C22C">
          <rect x="704" y="228" width="10" height="18" rx="5" opacity="0.9" />
          <rect x="730" y="228" width="10" height="18" rx="5" opacity="0.75" />
          <rect x="704" y="264" width="10" height="18" rx="5" opacity="0.8" />
          <rect x="730" y="264" width="10" height="18" rx="5" opacity="0.95" />
          <rect x="636" y="274" width="9" height="16" rx="4.5" opacity="0.7" />
          <rect x="668" y="274" width="9" height="16" rx="4.5" opacity="0.55" />
          <rect x="762" y="270" width="9" height="16" rx="4.5" opacity="0.8" />
          <rect x="794" y="270" width="9" height="16" rx="4.5" opacity="0.6" />
          <rect x="566" y="266" width="9" height="16" rx="4.5" opacity="0.7" />
          <rect x="860" y="262" width="9" height="16" rx="4.5" opacity="0.75" />
          <rect x="556" y="332" width="9" height="17" rx="4.5" opacity="0.45" />
          <rect x="874" y="332" width="9" height="17" rx="4.5" opacity="0.5" />
        </g>

        <g>
          <path d="M722 58 L722 34" stroke="#C9A47B" strokeWidth="2.5" />
          <path d="M723 36 L757 44 L723 54 Z" fill="#4A365F" />
          <path d="M574 154 L574 134" stroke="#C9A47B" strokeWidth="2" />
          <path d="M575 135 L599 141 L575 148 Z" fill="#4A365F" />
          <path d="M866 146 L866 126" stroke="#C9A47B" strokeWidth="2" />
          <path d="M867 127 L891 133 L867 140 Z" fill="#4A365F" />
        </g>

        <g fill="#E8F0EC" fillOpacity="0.5">
          <path d="M666 198 L722 116 L734 133 L688 198 Z" />
          <path d="M544 240 L574 154 L582 172 L558 240 Z" />
          <path d="M836 236 L866 146 L874 164 L850 236 Z" />
        </g>

        <rect x="640" y="376" width="160" height="84" fill="url(#water)" />

        <path
          d="M0 384 L160 352 L300 388 L430 360 L570 390 L720 376 L880 392 L1030 362 L1180 392 L1320 366 L1440 390 L1440 460 L0 460 Z"
          fill="url(#ridge-near)"
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(110% 70% at 50% 50%, rgba(16, 14, 26, 0) 45%, rgba(12, 16, 13, 0.55) 100%)",
        }}
      />
    </div>
  );
}
