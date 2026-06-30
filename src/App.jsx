import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Home as HomeIcon,
  RadioTower,
  Trophy,
} from "lucide-react";

import contentRaw from "../content.JSON?raw";
import mediaMappingRaw from "../media_mapping.JSON?raw";
import WebGLBackdrop from "./components/WebGLBackdrop";
import { cn } from "./lib/utils";

const content = JSON.parse(contentRaw);
const mediaMapping = JSON.parse(mediaMappingRaw);

const homeContent = content["/"];
const servicesContent = content["/services"];
const portfolioContent = content["/portfolio"];
const nestleContent = content["/portfolio/nestle"];
const swatContent = content["/portfolio/swat"];
const metaContent = content["/portfolio/meta"];
const campusContent = content["/campus-masters"];

const homeMedia = mediaMapping["/"];
const servicesMedia = mediaMapping["/services"];
const nestleMedia = mediaMapping["/portfolio/nestle"];
const swatMedia = mediaMapping["/portfolio/swat"];
const metaMedia = mediaMapping["/portfolio/meta"];
const campusMedia = mediaMapping["/campus-masters"];

function assetPath(entry) {
  if (typeof entry === "string") {
    return entry;
  }

  return entry?.path ?? "";
}

function assetList(entries = []) {
  return entries.map((entry) => ({
    ...entry,
    path: assetPath(entry),
  }));
}

/* ---------------------------------- data ---------------------------------- */

const portfolioCases = [
  {
    path: "/portfolio/nestle",
    tag: "Fortnite // Retail",
    title: "Nestle Cereal Season",
    copy: nestleContent.case_study_hero,
    image: assetPath(nestleMedia.nestle_metaverse),
  },
  {
    path: "/portfolio/swat",
    tag: "Counter-Strike 2 // Gov",
    title: "UAE SWAT Challenge",
    copy: swatContent.case_study_hero,
    image: assetPath(swatMedia.swat_cover),
  },
  {
    path: "/portfolio/meta",
    tag: "Metaverse // NFT",
    title: "Nestle Metaclub",
    copy: metaContent.case_study_hero,
    image: assetPath(metaMedia.meta_cover),
  },
];

const partnerLogoVersion = "natural-v4";
const partnerLogoSrc = (fileName) => `/images/carousel/partners/${fileName}?${partnerLogoVersion}`;

const partnerLogos = [
  { label: "Abu Dhabi Gaming", src: partnerLogoSrc("pp-partner-abudhabi-gaming.png") },
  { label: "Abu Dhabi TV", src: partnerLogoSrc("pp-partner-abudhabi-TV.png") },
  { label: "AOC", src: partnerLogoSrc("pp-partner-AOC.png") },
  { label: "Blizzard", src: partnerLogoSrc("pp-partner-blizzard.png") },
  { label: "Dubai Esports and Games Festival", src: partnerLogoSrc("pp-partner-DEF.png") },
  { label: "Dubai Media", src: partnerLogoSrc("pp-partner-dubai-media.png") },
  { label: "Dubai Police", src: partnerLogoSrc("pp-partner-dubai-police.png") },
  { label: "ExitLag", src: partnerLogoSrc("pp-partner-exitlag.png") },
  { label: "Honor", src: partnerLogoSrc("pp-partner-honor.png") },
  { label: "Nestle", src: partnerLogoSrc("pp-partner-nestle.png") },
  { label: "Red Bull", src: partnerLogoSrc("pp-partner-redbull.png") },
  { label: "Riot Games", src: partnerLogoSrc("pp-partner-Riot.png") },
  { label: "StarLadder", src: partnerLogoSrc("pp-partner-starladder.png") },
  { label: "Subaru", src: partnerLogoSrc("pp-partner-subaru.png") },
  { label: "True Gamers", src: partnerLogoSrc("pp-partner-truegamers.png") },
  { label: "UAE Pro League", src: partnerLogoSrc("pp-partner-UAE-pro.png") },
  { label: "Wizzo", src: partnerLogoSrc("pp-partner-wizzo.png") },
];

const services = [
  { label: "Marketing Campaigns", copy: servicesContent.service_marketing_campaigns },
  { label: "Live Broadcast", copy: servicesContent.service_live_broadcast_gallery },
  { label: "Island & Map Dev", copy: servicesContent.service_island_dev_spotlight },
  { label: "Influencer Campaigns", copy: servicesContent.service_influencer_campaigns },
  { label: "Content Production", copy: servicesContent.service_content_production },
  { label: "Event Management", copy: servicesContent.service_event_management },
];

const whoWeAreSocials = [
  {
    href: "https://www.linkedin.com/company/pixel-perfect-mena/",
    label: "LinkedIn",
    src: "/images/social/social-linkedin.png",
  },
  {
    href: "https://www.instagram.com/pixelperfectgg/",
    label: "Instagram",
    src: "/images/social/social-instagram.png",
  },
  {
    href: "https://www.youtube.com/@PixelPerfectmena",
    label: "YouTube",
    src: "/images/social/social-youtube.png",
  },
  {
    href: "https://www.twitch.tv/pixelperfectgg",
    label: "Twitch",
    src: "/images/social/social-twitch.png",
  },
  {
    href: "https://x.com/PixelPerfectGGX",
    label: "X/Twitter",
    src: "/images/social/social-x.png",
  },
];

const homeStats = [
  { value: "6", label: "Years in market" },
  { value: "90+", label: "Projects delivered" },
];

const homePortfolioAssetBase = "/images/portfolio/home-showcase";
const demoYoutubeEmbed = "https://www.youtube.com/embed/c2V1SGz5eIE?rel=0&modestbranding=1";

const homePortfolioFilters = [
  { id: "all", label: "All" },
  { id: "branded", label: "Branded Activation" },
  { id: "broadcast", label: "Broadcast" },
  { id: "marketing", label: "Marketing Materials" },
];

const homePortfolioProjects = [
  {
    id: "nestle-cereal-season",
    title: "Nestle Cereal Season",
    categories: ["branded", "marketing"],
    background: `${homePortfolioAssetBase}/bg-nestle-cereal-season.png`,
    video: demoYoutubeEmbed,
    body:
      "Led the development of Nestle's first branded Fortnite gaming experience for a global launch, supported by MENA campaign assets including POSM, key visuals, and video ads.",
    bodyClassName: "leading-[1.7] tracking-normal",
    partnerLogos: [
      { label: "Fortnite", src: `${homePortfolioAssetBase}/logo-fortnite.png`, className: "max-h-8 sm:max-h-9" },
      { label: "Nestle", src: `${homePortfolioAssetBase}/logo-nestle.png`, className: "max-h-10 sm:max-h-11" },
    ],
    playHref: "https://www.fortnite.com/@empireplay/7102-2377-4433",
    projectHref: "/portfolio/nestle",
  },
  {
    id: "campus-masters",
    title: "Campus Masters",
    categories: ["broadcast", "branded"],
    background: `${homePortfolioAssetBase}/bg-campus-masters.png`,
    video: demoYoutubeEmbed,
    body:
      "Built a university esports tournament platform with live production, brand integration, social content, and on-ground competitive moments for student communities.",
    bodyClassName: "leading-[1.65] tracking-normal",
    partnerLogos: [
      { label: "Campus Masters", src: assetPath(campusMedia.hero_logo_main), className: "max-h-12 sm:max-h-14" },
    ],
    projectHref: "/campus-masters",
  },
  {
    id: "nestle-metaclub",
    title: "Nestle METACLUB",
    categories: ["branded"],
    background: `${homePortfolioAssetBase}/bg-nestle-metaclub.png`,
    video: demoYoutubeEmbed,
    body:
      "I developed the Nestle Metaclub in Decentraland - a multi-brand metaverse experience featuring Lion, Koko Krunch, Cocoa Plan, Anghami, and the Rainforest Alliance, with interactive mini-games and sellable branded NFTs.",
    bodyClassName: "leading-[1.4] tracking-[0.004em]",
    partnerLogos: [
      { label: "Nestle", src: `${homePortfolioAssetBase}/logo-nestle.png`, className: "max-h-10 sm:max-h-11" },
      { label: "Decentraland", text: "Decentraland" },
    ],
    playHref: "https://decentraland.org/whats-on?id=1127102c-524c-45c1-8e31-6da4e9a62897",
    projectHref: "/portfolio/meta",
  },
];

const campusProvenResults = [
  { value: "51+", label: "Universities onboard" },
  { value: "20K+", label: "Student reach" },
  { value: "27", label: "Livestreams" },
  { value: "167K", label: "Livestream impressions" },
];

/* --------------------------------- shell ---------------------------------- */

function App({ children, routeKey }) {
  const isCampus = routeKey === "/campus-masters";

  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-body text-white antialiased">
      <GlobalNav isCampus={isCampus} routeKey={routeKey} />
      <main>{children}</main>
    </div>
  );
}

function GlobalNav({ isCampus, routeKey }) {
  const navItems = [
    { active: routeKey === "/", icon: HomeIcon, label: "Home", to: "/" },
    { active: routeKey === "/services", icon: RadioTower, label: "Services", to: "/services" },
    {
      active: routeKey.startsWith("/portfolio"),
      icon: BriefcaseBusiness,
      label: "Portfolio",
      to: "/portfolio",
    },
    {
      active: routeKey === "/campus-masters",
      icon: Trophy,
      label: "Campus Masters",
      logo: assetPath(campusMedia.nav_logo_cm_button),
      to: "/campus-masters",
      tone: "yellow",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center gap-1 overflow-visible border border-white/10 bg-black/72 px-2 py-2 shadow-[0_0_30px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ease-out",
          isCampus
            ? "text-campus-yellow hover:border-campus-yellow/50 hover:shadow-[0_0_28px_rgba(255,234,0,0.12)]"
            : "text-pixel-cyan hover:border-pixel-cyan/50 hover:shadow-[0_0_28px_rgba(21,255,255,0.12)]",
        )}
      >
        {navItems.map((item) => (
          <HudNavLink key={item.to} {...item} />
        ))}
      </nav>
    </header>
  );
}

function HudNavLink({ active, icon: Icon, label, logo, to, tone = "cyan" }) {
  const activeTone = tone === "yellow" ? "text-campus-yellow" : "text-pixel-cyan";
  const expandedWidth = logo ? "hover:w-48 focus-visible:w-48" : "hover:w-32 focus-visible:w-32";

  return (
    <Link
      aria-label={label}
      className={cn(
        "group/hud relative flex h-11 w-11 items-center justify-center overflow-hidden bg-transparent px-0 font-mono text-[10px] uppercase tracking-wider text-white/55 transition-[width,color,background-color,padding] duration-300 ease-out hover:z-10 hover:bg-white/[0.045] hover:px-3 hover:text-white focus-visible:z-10 focus-visible:bg-white/[0.045] focus-visible:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-cyan",
        expandedWidth,
        active && activeTone,
      )}
      to={to}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-1/2 h-px w-4 -translate-x-1/2 bg-white/0 transition-colors duration-150",
          active && (tone === "yellow" ? "bg-campus-yellow" : "bg-pixel-cyan"),
        )}
      />
      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.8} />
      {logo ? (
        <span className="ml-0 max-w-0 overflow-hidden opacity-0 transition-[max-width,margin,opacity] duration-300 ease-out group-hover/hud:ml-2.5 group-hover/hud:max-w-[128px] group-hover/hud:opacity-100 group-focus-visible/hud:ml-2.5 group-focus-visible/hud:max-w-[128px] group-focus-visible/hud:opacity-100">
          <img alt="" aria-hidden="true" className="h-6 w-auto max-w-[128px] object-contain" src={logo} />
        </span>
      ) : (
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,margin,opacity] duration-300 ease-out group-hover/hud:ml-2.5 group-hover/hud:max-w-[92px] group-hover/hud:opacity-100 group-focus-visible/hud:ml-2.5 group-focus-visible/hud:max-w-[92px] group-focus-visible/hud:opacity-100">
          {label}
        </span>
      )}
    </Link>
  );
}

/* ------------------------------ shared atoms ------------------------------ */

function Eyebrow({ children, tone = "cyan" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]",
        tone === "magenta" && "text-pixel-magenta",
        tone === "cyan" && "text-pixel-cyan",
        tone === "yellow" && "text-campus-yellow",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5",
          tone === "magenta" && "bg-pixel-magenta",
          tone === "cyan" && "bg-pixel-cyan",
          tone === "yellow" && "bg-campus-yellow",
        )}
      />
      {children}
    </span>
  );
}

function SectionHeader({
  align = "left",
  eyebrow,
  index,
  intro,
  level = "h2",
  title,
  tone = "cyan",
}) {
  const HeadingTag = level === "h1" ? "h1" : "h2";

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <div className="flex items-center gap-3">
        {index ? (
          <span
            className={cn(
              "font-mono text-sm",
              tone === "yellow" ? "text-campus-yellow/60" : "text-pixel-cyan/60",
            )}
          >
            {index}
          </span>
        ) : null}
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <HeadingTag className="text-balance font-display text-3xl font-light italic uppercase leading-[1.05] text-white sm:text-4xl lg:text-5xl">
        {title}
      </HeadingTag>
      {intro ? (
        <p className="text-pretty text-base leading-relaxed text-white/60 sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}

function StatCard({ value, label, tone = "cyan" }) {
  return (
    <div
      className={cn(
        "group relative border bg-[#141414] p-5 transition-colors duration-150 sm:p-7",
        tone === "yellow"
          ? "border-campus-yellow/30 bg-[#0b1322] hover:border-campus-yellow"
          : "border-pixel-border hover:border-pixel-cyan",
      )}
    >
      <p
        className={cn(
          "font-display text-4xl font-normal italic sm:text-5xl",
          tone === "yellow" ? "text-campus-yellow" : "text-pixel-cyan",
        )}
      >
        {value}
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-white/55 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function MediaFrame({
  aspect = "aspect-[16/10]",
  className,
  fit = "cover",
  imgClassName,
  src,
  tone = "cyan",
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-pixel-border bg-[#050505]",
        aspect,
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-10 opacity-30 [background-size:34px_34px]",
          tone === "yellow"
            ? "[background-image:linear-gradient(rgba(255,234,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,234,0,0.1)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(21,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(21,255,255,0.1)_1px,transparent_1px)]",
        )}
      />
      {src ? (
        <img
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full",
            fit === "contain" ? "object-contain p-4" : "object-cover",
            imgClassName,
          )}
          loading="lazy"
          src={src}
        />
      ) : null}
    </div>
  );
}

function FeatureRow({ image, eyebrow, title, body, reverse = false, tone = "cyan", aspect = "aspect-[4/3]" }) {
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12">
      <MediaFrame
        aspect={aspect}
        className={cn(
          tone === "yellow" && "border-campus-yellow/25",
          reverse && "md:order-2",
        )}
        src={image}
        tone={tone === "yellow" ? "yellow" : "cyan"}
      />
      <div className={cn("flex flex-col gap-4", reverse && "md:order-1")}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h3 className="text-balance font-display text-2xl font-light italic uppercase leading-tight text-white sm:text-3xl">
          {title}
        </h3>
        {body ? (
          <p className="text-pretty text-base leading-relaxed text-white/65 sm:text-lg">{body}</p>
        ) : null}
      </div>
    </div>
  );
}

function BandImage({ src, caption, tone = "cyan" }) {
  return (
    <figure className="relative">
      <MediaFrame
        aspect="aspect-[21/9]"
        className={cn(tone === "yellow" && "border-campus-yellow/25")}
        src={src}
        tone={tone === "yellow" ? "yellow" : "cyan"}
      />
      {caption ? (
        <figcaption
          className={cn(
            "absolute bottom-0 left-0 z-20 m-3 border bg-[#0a0a0a]/85 px-3 py-2 font-mono text-[11px] uppercase tracking-wider backdrop-blur-sm",
            tone === "yellow"
              ? "border-campus-yellow/40 text-campus-yellow"
              : "border-pixel-border text-pixel-cyan",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function CtaLink({ children, to, tone = "cyan" }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        tone === "solid" &&
          "border-pixel-cyan bg-pixel-cyan text-black hover:bg-white hover:border-white focus-visible:outline-pixel-cyan",
        tone === "cyan" &&
          "border-pixel-border bg-transparent text-white hover:border-pixel-cyan hover:text-pixel-cyan focus-visible:outline-pixel-cyan",
      )}
      to={to}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
    </Link>
  );
}

function wrapTickerOffset(offset, cycleWidth) {
  if (!cycleWidth) {
    return offset;
  }

  let nextOffset = offset;

  while (nextOffset <= -cycleWidth) {
    nextOffset += cycleWidth;
  }

  while (nextOffset > 0) {
    nextOffset -= cycleWidth;
  }

  return nextOffset;
}

function InteractiveLogoTrack({ baseSpeed = 120, gapClassName = "gap-4", getKey, items, renderItem }) {
  const trackRef = useRef(null);
  const stateRef = useRef({
    cycleWidth: 0,
    isHovered: false,
    isPointerDown: false,
    lastPointerTime: 0,
    lastTime: 0,
    lastX: 0,
    offset: 0,
    reduceMotion: false,
    speedFactor: 1,
  });
  const loopItems = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const state = stateRef.current;
    const applyTransform = () => {
      track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
    };
    const measure = () => {
      state.cycleWidth = track.scrollWidth / 2;
      state.offset = wrapTickerOffset(state.offset, state.cycleWidth);
      applyTransform();
    };
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduceMotion = () => {
      state.reduceMotion = reduceMotionQuery.matches;
    };
    let frame = 0;
    let resizeObserver;

    updateReduceMotion();
    measure();

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(track);
    }

    window.addEventListener("resize", measure);
    reduceMotionQuery.addEventListener?.("change", updateReduceMotion);

    const tick = (now) => {
      const previousTime = state.lastTime || now;
      const delta = Math.min((now - previousTime) / 1000, 0.064);
      state.lastTime = now;

      if (!state.isPointerDown && !state.reduceMotion) {
        const targetSpeedFactor = state.isHovered ? 0.25 : 1;
        const easing = Math.min(1, delta * 5);

        state.speedFactor += (targetSpeedFactor - state.speedFactor) * easing;
        state.offset = wrapTickerOffset(
          state.offset - baseSpeed * state.speedFactor * delta,
          state.cycleWidth,
        );
        applyTransform();
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
      reduceMotionQuery.removeEventListener?.("change", updateReduceMotion);
    };
  }, [baseSpeed, items]);

  const applyPointerOffset = (event) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const state = stateRef.current;
    const now = performance.now();
    const deltaX = event.clientX - state.lastX;

    state.offset = wrapTickerOffset(state.offset + deltaX, state.cycleWidth);
    state.lastX = event.clientX;
    state.lastPointerTime = now;
    track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
  };

  return (
    <div
      className="relative cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      onDragStart={(event) => event.preventDefault()}
      onPointerCancel={(event) => {
        stateRef.current.isPointerDown = false;
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }}
      onPointerDown={(event) => {
        const state = stateRef.current;

        state.isPointerDown = true;
        state.lastPointerTime = performance.now();
        state.lastTime = performance.now();
        state.lastX = event.clientX;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.preventDefault();
      }}
      onPointerEnter={() => {
        stateRef.current.isHovered = true;
      }}
      onPointerLeave={() => {
        stateRef.current.isHovered = false;
      }}
      onPointerMove={(event) => {
        if (!stateRef.current.isPointerDown) {
          return;
        }

        applyPointerOffset(event);
      }}
      onPointerUp={(event) => {
        stateRef.current.isPointerDown = false;
        stateRef.current.lastTime = performance.now();
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }}
    >
      <div
        className={cn("flex w-max items-center whitespace-nowrap will-change-transform", gapClassName)}
        ref={trackRef}
      >
        {loopItems.map((item, index) => (
          <React.Fragment key={`${getKey(item)}-${index}`}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PageShell({ backdrop = "pixel", children }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-black">
      <WebGLBackdrop className="fixed -z-20 opacity-[0.08]" variant={backdrop} />
      <div className="absolute inset-0 -z-10 bg-black/88" />
      <div className="relative mx-auto max-w-[1280px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------- home ---------------------------------- */

function Home() {
  return (
    <>
      <HeroVideoBrutalist />
      <HomeBodyShell>
        <PartnerLogoCarousel />
        <MissionStatementAvatars />
        <HomeSpotlightFeature />
        <HomePortfolioShowcase />
        <FooterGlobal />
      </HomeBodyShell>
    </>
  );
}

function HomeBodyShell({ children }) {
  return (
    <div className="relative isolate overflow-hidden bg-black">
      <WebGLBackdrop className="absolute -z-20 opacity-[0.07]" variant="pixel" />
      <div className="absolute inset-0 -z-10 bg-black/90" />
      {children}
    </div>
  );
}

function HeroVideoBrutalist() {
  return (
    <section
      aria-label="Pixel Perfect video"
      className="relative isolate min-h-[calc(100svh-132px)] overflow-hidden border-b border-pixel-border"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        loop
        muted
        playsInline
        poster={assetPath(homeMedia.hero_fallback)}
      >
        <source src={assetPath(homeMedia.hero_video)} type="video/mp4" />
      </video>
    </section>
  );
}

function PartnerLogoCarousel() {
  return (
    <section
      aria-label="Pixel Perfect partners"
      className="relative overflow-hidden border-b border-pixel-border bg-[#090909]/82 py-8 backdrop-blur-sm"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pixel-cyan to-transparent" />
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#090909] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#090909] to-transparent" />
        <InteractiveLogoTrack
          baseSpeed={132}
          gapClassName="gap-[1.2rem]"
          getKey={(logo) => logo.label}
          items={partnerLogos}
          renderItem={(logo) => (
            <div
              className="grid h-20 w-40 place-items-center px-5 py-4 sm:w-48"
            >
              <img
                alt={logo.label}
                className="max-h-12 max-w-full scale-90 object-contain object-center"
                draggable="false"
                src={logo.src}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}

function MissionStatementAvatars() {
  return (
    <section className="relative isolate overflow-hidden border-b border-pixel-border bg-black">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[42%_center] lg:object-[36%_center]"
        src={assetPath(homeMedia.mission_background)}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(5,8,24,0.7)_42%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-pixel-bg/24" />

      <div className="mx-auto grid min-h-[640px] max-w-[1680px] items-center gap-12 px-6 py-16 sm:px-12 lg:grid-cols-[1.35fr_0.8fr] lg:px-24 xl:px-36">
        <div>
          <h2 className="font-staatliches text-[clamp(4.2rem,9vw,11rem)] font-normal uppercase leading-[0.8] tracking-[-0.045em] text-pixel-magenta">
            Who We Are
          </h2>
          <p className="mt-8 max-w-[780px] text-pretty font-poppins text-xl font-normal leading-[1.2] tracking-[-0.045em] text-white sm:text-2xl lg:text-[1.65rem]">
            {homeContent.mission_statement_avatars}
          </p>
          <Link
            className="mt-12 inline-flex items-center gap-5 rounded-full border border-pixel-magenta px-8 py-3.5 font-poppins text-lg font-normal leading-[1.2] tracking-[-0.045em] text-white transition-colors duration-150 hover:bg-pixel-magenta hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-magenta sm:text-2xl"
            to="/services"
          >
            View Our Services
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/80">
              <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-start lg:items-center">
          <img
            alt="Pixel Perfect"
            className="w-[min(72vw,390px)] object-contain drop-shadow-[0_0_26px_rgba(21,255,255,0.2)]"
            src={assetPath(homeMedia.nav_logo_global)}
          />
          <div aria-label="Pixel Perfect social channels" className="mt-9 flex items-center gap-5 sm:gap-6">
            {whoWeAreSocials.map(({ href, label, src }) => (
              <a
                aria-label={label}
                className="inline-flex h-12 w-12 items-center justify-center transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" aria-hidden="true" className="max-h-11 max-w-12 object-contain" src={src} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeSpotlightFeature() {
  return (
    <section className="relative isolate overflow-hidden border-b border-pixel-border bg-[#132032]">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        loading="lazy"
        src={`${homePortfolioAssetBase}/spotlight-bg-campus-masters.png`}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.24)_46%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-pixel-cyan/70" />
      <div className="absolute -left-16 top-5 z-20 w-56 -rotate-45 bg-pixel-magenta py-2 text-center font-staatliches text-3xl uppercase leading-[0.8] tracking-[-0.045em] text-white shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
        New
      </div>

      <div className="mx-auto flex min-h-[560px] max-w-[1280px] items-center justify-end px-4 py-12 sm:px-8 lg:min-h-[530px] lg:px-14">
        <div className="w-full max-w-[560px] rounded-md bg-[#aeb6c4]/18 p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-[1.5px] sm:p-5">
          <PortfolioVideo src={demoYoutubeEmbed} title="Campus Masters spotlight" />
          <p className="mx-auto mt-6 max-w-[520px] text-pretty font-poppins text-base font-normal leading-[1.35] tracking-[-0.02em] text-white sm:text-xl">
            {homeContent.mission_statement_avatars}
          </p>
          <div className="mt-6 flex justify-center">
            <PortfolioActionButton href="/campus-masters" icon="arrow" internal>
              View The Project
            </PortfolioActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredProjects =
    activeFilter === "all"
      ? homePortfolioProjects
      : homePortfolioProjects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section id="portfolio" className="relative isolate overflow-hidden border-b border-pixel-border bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pixel-cyan to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(255,44,99,0.12),transparent_32%),radial-gradient(circle_at_88%_22%,rgba(21,255,255,0.08),transparent_26%)]" />

      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-staatliches text-[clamp(4.5rem,10vw,9rem)] font-normal uppercase leading-[0.8] tracking-[-0.045em] text-white">
              Our Portfolio
            </h2>
            <PortfolioFilterNav activeFilter={activeFilter} onChange={setActiveFilter} />
          </div>

          <div className="sm:text-right">
            <p className="font-staatliches text-[clamp(4.4rem,8vw,7.8rem)] font-normal uppercase leading-[0.8] tracking-[-0.045em] text-pixel-magenta">
              100+
            </p>
            <p className="mt-1 font-staatliches text-2xl uppercase leading-[0.8] tracking-[-0.045em] text-pixel-cyan sm:text-3xl">
              Projects Delivered
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10">
          {filteredProjects.map((project, index) => (
            <HomePortfolioProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioFilterNav({ activeFilter, onChange }) {
  return (
    <nav aria-label="Portfolio filters" className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
      {homePortfolioFilters.map((filter, index) => (
        <React.Fragment key={filter.id}>
          <button
            aria-pressed={activeFilter === filter.id}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-staatliches text-xl uppercase leading-[0.8] tracking-[-0.045em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-magenta sm:text-2xl",
              activeFilter === filter.id
                ? "bg-pixel-magenta text-white"
                : "text-pixel-cyan hover:bg-pixel-magenta hover:text-white",
            )}
            onClick={() => onChange(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
          {index < homePortfolioFilters.length - 1 ? (
            <span aria-hidden="true" className="font-staatliches text-2xl leading-none text-pixel-cyan/55">
              /
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </nav>
  );
}

function HomePortfolioProjectCard({ project }) {
  const isLight = project.id === "nestle-metaclub";

  return (
    <article
      className="group overflow-hidden rounded-lg border border-white/10 bg-[#132032] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:p-3"
    >
      <div className="relative min-h-[560px] overflow-hidden rounded-md bg-[#132032] sm:min-h-[500px] lg:min-h-[430px]">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
          loading="lazy"
          src={project.background}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            isLight
              ? "bg-gradient-to-r from-white/0 via-white/10 to-white/25"
              : "bg-gradient-to-r from-black/4 via-black/8 to-black/36",
          )}
        />
        <div className="relative z-10 flex min-h-[560px] items-end justify-end p-3 sm:min-h-[500px] sm:p-5 lg:min-h-[430px] lg:p-6">
        <div
          className={cn(
            "flex w-[min(100%,430px)] flex-col justify-end rounded-md border p-3 shadow-[0_18px_44px_rgba(0,0,0,0.24)] backdrop-blur-[2px] sm:p-4",
            isLight
              ? "border-white/50 bg-white/58 text-[#17212a]"
              : "border-white/18 bg-[#aeb6c4]/28 text-white",
          )}
        >
          <h3 className="sr-only">{project.title}</h3>
          <PortfolioVideo title={project.title} src={project.video} />

          <div className="flex flex-1 flex-col justify-end">
            <PortfolioPartnerLogos isLight={isLight} logos={project.partnerLogos} />
            <p
              className={cn(
                "mt-4 font-poppins text-[0.95rem] font-normal sm:text-base",
                isLight ? "text-[#17212a]" : "text-white/84",
                project.bodyClassName,
              )}
            >
              {project.body}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.playHref ? (
                <PortfolioActionButton href={project.playHref} icon="joystick">
                  Play Now
                </PortfolioActionButton>
              ) : null}
              <PortfolioActionButton href={project.projectHref} icon="arrow" internal>
                Explore Project
              </PortfolioActionButton>
            </div>
          </div>
        </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioVideo({ src, title }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-white/15 bg-black shadow-[0_18px_34px_rgba(0,0,0,0.28)]">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        src={src}
        title={`${title} video`}
      />
    </div>
  );
}

function PortfolioPartnerLogos({ isLight, logos }) {
  if (!logos?.length) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center">
      {logos.map((logo, index) => (
        <React.Fragment key={logo.label}>
          {index > 0 ? (
            <img
              alt=""
              aria-hidden="true"
              className={cn("h-4 w-4 object-contain opacity-80", isLight && "invert")}
              src={`${homePortfolioAssetBase}/icon-x-between-logos.png`}
            />
          ) : null}
          {logo.src ? (
            <img
              alt={logo.label}
              className={cn("max-w-[132px] object-contain", logo.className)}
              loading="lazy"
              src={logo.src}
            />
          ) : (
            <span
              className={cn(
                "font-poppins text-sm font-medium tracking-normal",
                isLight ? "text-[#17212a]" : "text-white",
              )}
            >
              {logo.text}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function PortfolioActionButton({ children, href, icon, internal = false }) {
  const iconSrc =
    icon === "joystick"
      ? `${homePortfolioAssetBase}/icon-joystick.png`
      : `${homePortfolioAssetBase}/icon-arrow.png`;
  const className =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pixel-magenta px-5 py-2.5 font-poppins text-sm font-medium leading-[1.53] tracking-[-0.02em] text-white transition-colors duration-150 hover:bg-white hover:text-pixel-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-magenta";
  const content = (
    <>
      {children}
      <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
        <img alt="" aria-hidden="true" className="h-4 w-4 object-contain" src={iconSrc} />
      </span>
    </>
  );

  if (internal) {
    return (
      <Link className={className} to={href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

function GlobalImpactStats() {
  return (
    <section className="border-b border-pixel-border bg-[#191919]/74 px-4 py-16 backdrop-blur-sm sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader index="02" eyebrow="By the numbers" title="Six years of measurable impact." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {homeStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="border-b border-pixel-border bg-pixel-bg/72 px-4 py-16 backdrop-blur-sm sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            index="03"
            eyebrow="What we do"
            title="Full-stack gaming production."
          />
          <CtaLink to="/services">Read more</CtaLink>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard index={index + 1} key={service.label} service={service} showCopy={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ index, service, showCopy = true }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-pixel-border bg-[#141414] p-6 transition-colors duration-150 hover:border-pixel-cyan",
        !showCopy && "p-5 sm:p-6",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-pixel-cyan/60">
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 bg-pixel-border transition-colors duration-150 group-hover:bg-pixel-cyan"
        />
      </div>
      <h3
        className={cn(
          "font-display font-light italic uppercase leading-tight text-white group-hover:text-pixel-cyan",
          showCopy ? "mt-4 text-lg sm:text-xl" : "mt-5 text-xl sm:text-2xl",
        )}
      >
        {service.label}
      </h3>
      {showCopy ? (
        <p className="mt-3 text-sm leading-relaxed text-white/60">{service.copy}</p>
      ) : null}
    </article>
  );
}

function PortfolioPreviewGrid() {
  return (
    <section className="border-b border-pixel-border bg-[#191919]/74 px-4 py-16 backdrop-blur-sm sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            index="04"
            eyebrow="Selected work"
            title="Our Portfolio."
            tone="magenta"
          />
          <CtaLink to="/portfolio">View portfolio</CtaLink>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {portfolioCases.map((item) => (
            <PortfolioCard item={item} key={item.path} showCopy={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item, showCopy = true }) {
  return (
    <Link
      className="group flex flex-col border border-pixel-border bg-[#141414] transition-colors duration-150 hover:border-pixel-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-cyan"
      to={item.path}
    >
      <MediaFrame className="border-0 border-b border-pixel-border" src={item.image} />
      <div className={cn("flex flex-1 flex-col", showCopy ? "p-5" : "p-4 sm:p-5")}>
        <span className="font-mono text-xs uppercase tracking-wider text-pixel-magenta">
          {item.tag}
        </span>
        <h3
          className={cn(
            "font-display font-light italic uppercase leading-tight text-white group-hover:text-pixel-cyan",
            showCopy ? "mt-2 text-lg sm:text-xl" : "mt-3 text-xl sm:text-2xl",
          )}
        >
          {item.title}
        </h3>
        {showCopy ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{item.copy}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-pixel-cyan">
          Case study <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}

function ClientTrust() {
  const label = homeContent.client_trust_marquee.replace(/^TRUSTED BY:\s*/i, "");
  const brands = label.replace(/\.$/, "").split(",").map((item) => item.trim());

  return (
    <section className="border-b border-pixel-border bg-pixel-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 text-center">
        <Eyebrow>Trusted by</Eyebrow>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {brands.map((brand) => (
            <span
              className="font-display text-lg font-light italic uppercase text-white/40 sm:text-xl"
              key={brand}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- services -------------------------------- */

function ServicesPage() {
  const gallery = assetList(servicesMedia.broadcast_gallery);

  return (
    <PageShell backdrop="pixel">
      <SectionHeader
        index="00"
        eyebrow="Services"
        level="h1"
        title={servicesContent.services_header}
        intro={servicesContent.service_marketing_campaigns}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard index={index + 1} key={service.label} service={service} />
        ))}
      </div>

      <div className="mt-4 border border-pixel-cyan/40 bg-[#0e1414] p-6 sm:p-8">
        <Eyebrow>Software & capabilities</Eyebrow>
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          {servicesContent.software_capabilities_grid}
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-6">
        <SectionHeader
          eyebrow="Live broadcast & production"
          title="On the ground and on air."
          tone="magenta"
          intro={servicesContent.service_live_broadcast_gallery}
        />
        <div className="mt-6 flex flex-col gap-16 lg:gap-24">
          {gallery.map((image, index) => (
            <FeatureRow
              aspect="aspect-[16/10]"
              eyebrow={`Production ${String(index + 1).padStart(2, "0")}`}
              image={image.path}
              key={image.path}
              reverse={index % 2 === 1}
              title={image.desc}
              tone={index % 2 === 1 ? "magenta" : "cyan"}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

/* ------------------------------- portfolio -------------------------------- */

function PortfolioPage() {
  return (
    <PageShell backdrop="magenta">
      <SectionHeader
        index="00"
        eyebrow="Portfolio"
        level="h1"
        title="Selected work."
        tone="magenta"
        intro={portfolioContent.portfolio_intro}
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {portfolioCases.map((item) => (
          <PortfolioCard item={item} key={item.path} />
        ))}
      </div>
    </PageShell>
  );
}

function PortfolioNestlePage() {
  return (
    <CaseStudyLayout
      tag="Fortnite Creative // Retail Activation"
      title="Nestle Cereal Season"
      heroCopy={nestleContent.case_study_hero}
      heroImage={assetPath(nestleMedia.nestle_metaverse)}
      panels={[
        { label: "Fortnite island overview", copy: nestleContent.fortnite_island_overview },
        { label: "Physical POS rollout", copy: nestleContent.physical_pos_gallery },
        { label: "Campaign results", copy: nestleContent.campaign_results, highlight: true },
        { label: "Our responsibilities", copy: nestleContent.campaign_responsibilities },
      ]}
      secondaryImage={assetPath(nestleMedia.nestle_pos)}
    />
  );
}

function PortfolioSwatPage() {
  return (
    <CaseStudyLayout
      tag="Counter-Strike 2 // Dubai Police"
      title="UAE SWAT Challenge"
      heroCopy={swatContent.case_study_hero}
      heroImage={assetPath(swatMedia.swat_cover)}
      panels={[
        { label: "Project overview", copy: swatContent.project_overview },
        { label: "Game mechanics", copy: swatContent.game_mechanics },
        { label: "On-ground activation", copy: swatContent.on_ground_activation },
        { label: "Exposure", copy: swatContent.exposure, highlight: true },
      ]}
      secondaryImage={assetPath(swatMedia.swat_event)}
    />
  );
}

function PortfolioMetaPage() {
  return (
    <CaseStudyLayout
      tag="Decentraland // Unity // NFT"
      title="Nestle Metaclub"
      heroCopy={metaContent.case_study_hero}
      heroImage={assetPath(metaMedia.meta_cover)}
      panels={[
        { label: "Project overview", copy: metaContent.project_overview },
        { label: "NFT results", copy: metaContent.nft_results, highlight: true },
        { label: "Media coverage", copy: metaContent.media_coverage },
        { label: "Space overview", copy: metaContent.space_overview },
      ]}
      secondaryImage={assetPath(metaMedia.meta_world)}
    />
  );
}

function CaseStudyLayout({ tag, title, heroCopy, heroImage, panels, secondaryImage }) {
  return (
    <PageShell backdrop="magenta">
      <Link
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors hover:text-pixel-cyan"
        to="/portfolio"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> Back to portfolio
      </Link>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <MediaFrame aspect="aspect-[4/3]" className="border-0 border border-pixel-border" src={heroImage} />
        <div className="flex flex-col justify-center border border-pixel-border bg-[#141414] p-6 sm:p-9">
          <span className="font-mono text-xs uppercase tracking-wider text-pixel-magenta">{tag}</span>
          <h1 className="mt-3 font-display text-3xl font-light italic uppercase leading-[1.05] text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            {heroCopy}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {panels.slice(0, 2).map((panel) => (
          <CaseStudyPanel key={panel.label} panel={panel} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <MediaFrame aspect="aspect-[4/3]" src={secondaryImage} />
        <div className="grid gap-4">
          {panels.slice(2).map((panel) => (
            <CaseStudyPanel key={panel.label} panel={panel} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function CaseStudyPanel({ panel }) {
  return (
    <article
      className={cn(
        "border bg-[#141414] p-6 sm:p-7",
        panel.highlight ? "border-pixel-cyan/50 bg-[#0e1414]" : "border-pixel-border",
      )}
    >
      <Eyebrow tone={panel.highlight ? "cyan" : "magenta"}>{panel.label}</Eyebrow>
      <p className="mt-4 text-pretty text-base leading-relaxed text-white/75">{panel.copy}</p>
    </article>
  );
}

/* ----------------------------- campus masters ----------------------------- */

function CampusMastersShell() {
  const eventImages = assetList(campusMedia.events_masonry_gallery).map((image) => image.path);
  const sponsors = assetList(campusMedia.sponsors_marquee);

  const venues = [
    {
      eyebrow: "Venue 01",
      name: "Wafi City takeover",
      blurb: "A mall-scale student arena drawing crowds through five days of open play and stage finals.",
      lead: eventImages[0],
      thumbs: eventImages.slice(1, 4),
    },
    {
      eyebrow: "Venue 02",
      name: "Yugo residence circuit",
      blurb: "Pop-up tournaments inside student accommodation, bringing the league to where players live.",
      lead: eventImages[5],
      thumbs: eventImages.slice(6, 9),
    },
    {
      eyebrow: "Venue 03",
      name: "DEF showmatch finals",
      blurb: "Headline showmatches with full broadcast production and a live student audience.",
      lead: eventImages[9],
      thumbs: eventImages.slice(10, 12),
    },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-black">
      <WebGLBackdrop className="fixed -z-20 opacity-[0.08]" variant="campus" />
      <div className="absolute inset-0 -z-10 bg-black/88" />
      <CampusHero heroImage={eventImages[4]} />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="Proven results"
          title="Reach that brands can measure."
          tone="yellow"
          intro="A consolidated snapshot of university reach, broadcast output, and sponsor-facing visibility across the league."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campusProvenResults.map((stat) => (
            <StatCard key={stat.label} tone="yellow" {...stat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-4 sm:px-6 lg:px-8">
        <BandImage caption="On-ground // Season 3" src={eventImages[4]} tone="yellow" />
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="On-ground events"
          title="Three venues, one league."
          tone="yellow"
          intro="From mall arenas to residence pop-ups and broadcast finals, the league showed up across the country."
        />
        <div className="mt-12 flex flex-col gap-16 lg:gap-24">
          {venues.map((venue, index) => (
            <CampusVenueFeature key={venue.name} reverse={index % 2 === 1} venue={venue} />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-[1280px] flex-col gap-16 px-4 py-16 sm:px-6 lg:gap-24 lg:px-8">
        <FeatureRow
          eyebrow="Brand integration"
          image={eventImages[2]}
          title="Your brand, built into the play."
          tone="yellow"
          body={campusContent.brand_integration}
        />
        <FeatureRow
          eyebrow="On-ground activations"
          image={eventImages[7]}
          reverse
          title="Activations students actually join."
          tone="yellow"
          body={campusContent.on_ground_activations}
        />
      </section>

      <CampusPartnersCarousel sponsors={sponsors} />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-light italic uppercase leading-[1.1] text-campus-yellow sm:text-4xl lg:text-5xl">
            {campusContent.closing_statement}
          </h2>
        </div>
      </section>
    </div>
  );
}

function CampusPartnersCarousel({ sponsors }) {
  return (
    <section className="overflow-hidden border-t border-campus-yellow/20 bg-[#0b1322]/86 px-4 py-16 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-center gap-3">
          <Eyebrow tone="yellow">Our partners</Eyebrow>
          <div className="h-px flex-1 bg-campus-yellow/20" />
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0b1322] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0b1322] to-transparent" />
        <InteractiveLogoTrack
          baseSpeed={118}
          getKey={(sponsor) => sponsor.path}
          items={sponsors}
          renderItem={(sponsor) => (
            <div
              className="grid h-24 w-44 place-items-center px-6 py-4 sm:w-52"
            >
              <img
                alt={sponsor.desc ?? ""}
                className="max-h-14 max-w-full object-contain"
                draggable="false"
                src={sponsor.path}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}

function CampusHero({ heroImage }) {
  return (
    <section className="relative overflow-hidden border-b border-campus-yellow/20 px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-[1280px]">
        <img
          alt="Campus Masters"
          className="mb-8 h-14 w-auto object-contain sm:mb-10 sm:h-16"
          src={assetPath(campusMedia.hero_logo_main)}
        />
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <Eyebrow tone="yellow">Campus Masters // University Esports League</Eyebrow>
            <h1 className="mt-6 text-balance font-display text-4xl font-light italic uppercase leading-[1] text-campus-yellow sm:text-6xl">
              {campusContent.cm_hero_main_logo}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              {campusContent.season_3_metrics_grid}
            </p>
          </div>
          <figure className="relative overflow-hidden border border-campus-yellow/30 bg-[#0b1322]">
            <MediaFrame
              aspect="aspect-[16/10]"
              className="border-0"
              imgClassName="saturate-125"
              src={heroImage}
              tone="yellow"
            />
            <figcaption className="absolute bottom-0 left-0 z-20 m-3 bg-campus-yellow px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-black">
              Season 3 // On-ground arena
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function CampusVenueFeature({ venue, reverse }) {
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12">
      <MediaFrame
        aspect="aspect-[4/3]"
        className={cn("border-campus-yellow/25", reverse && "md:order-2")}
        src={venue.lead}
        tone="yellow"
      />
      <div className={cn("flex flex-col gap-4", reverse && "md:order-1")}>
        <Eyebrow tone="yellow">{venue.eyebrow}</Eyebrow>
        <h3 className="text-balance font-display text-2xl font-light italic uppercase leading-tight text-white sm:text-3xl">
          {venue.name}
        </h3>
        <p className="text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          {venue.blurb}
        </p>
        {venue.thumbs.length ? (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {venue.thumbs.map((thumb) => (
              <MediaFrame
                aspect="aspect-square"
                className="border-campus-yellow/15"
                key={thumb}
                src={thumb}
                tone="yellow"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */

function FooterGlobal() {
  return (
    <footer className="bg-[#070707] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-pixel-border pb-10 md:flex-row md:items-center">
          <img
            alt="Pixel Perfect"
            className="h-10 w-auto object-contain"
            src={assetPath(homeMedia.nav_logo_global)}
          />
          <nav className="flex flex-wrap gap-2">
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/portfolio">Portfolio</FooterLink>
            <FooterLink to="/campus-masters">Campus Masters</FooterLink>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-white/40">
            Pixel Perfect // Gaming Creative Agency // United Arab Emirates
          </p>
          <div aria-hidden="true" className="h-px w-32 bg-pixel-cyan" />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children, to }) {
  return (
    <Link
      className="font-mono text-xs uppercase tracking-wider text-white/45 transition-colors hover:text-pixel-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-cyan"
      to={to}
    >
      {children}
    </Link>
  );
}

App.Home = Home;
App.ServicesPage = ServicesPage;
App.PortfolioPage = PortfolioPage;
App.PortfolioNestlePage = PortfolioNestlePage;
App.PortfolioSwatPage = PortfolioSwatPage;
App.PortfolioMetaPage = PortfolioMetaPage;
App.CampusMastersShell = CampusMastersShell;

export default App;
