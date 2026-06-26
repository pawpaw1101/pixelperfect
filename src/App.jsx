import React from "react";
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

const partnerLogos = [
  { label: "Abu Dhabi Gaming", src: "/images/carousel/partners/pp-partner-abudhabigaming.png" },
  { label: "Anghami", src: "/images/carousel/partners/pp-partner-anghami.png" },
  { label: "Blizzard", src: "/images/carousel/partners/pp-partner-blizzard.png" },
  { label: "Dubai Media", src: "/images/carousel/partners/pp-partner-dubaimedia.png" },
  { label: "Geekay", src: "/images/carousel/partners/pp-partner-geekay.png" },
  { label: "Honor", src: "/images/carousel/partners/pp-partner-honor.png" },
  { label: "HyperX", src: "/images/carousel/partners/pp-partner-hyperx.png" },
  { label: "Inzone", src: "/images/carousel/partners/pp-partner-inzone.png" },
  { label: "MBC", src: "/images/carousel/partners/pp-partner-mbc.png" },
  { label: "Nestle", src: "/images/carousel/partners/pp-partner-nestle.png" },
  { label: "Rainforest Alliance", src: "/images/carousel/partners/pp-partner-rainforestalliance.png" },
  { label: "Subaru", src: "/images/carousel/partners/pp-partner-subaru.png" },
  { label: "Tencent", src: "/images/carousel/partners/Tencent-Logo.png" },
  { label: "Red Bull", src: "/images/carousel/partners/Red-Bull-Logo.png" },
  { label: "StarLadder", src: "/images/carousel/partners/Starladder_logo.png" },
  { label: "YaLLa Compass", src: "/images/carousel/partners/YaLLa_Compass_2025_lightmode.png" },
];

const services = [
  { label: "Marketing Campaigns", copy: servicesContent.service_marketing_campaigns },
  { label: "Live Broadcast", copy: servicesContent.service_live_broadcast_gallery },
  { label: "Island & Map Dev", copy: servicesContent.service_island_dev_spotlight },
  { label: "Influencer Campaigns", copy: servicesContent.service_influencer_campaigns },
  { label: "Content Production", copy: servicesContent.service_content_production },
  { label: "Event Management", copy: servicesContent.service_event_management },
];

const homeStats = [
  { value: "6", label: "Years in market" },
  { value: "90+", label: "Projects delivered" },
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
        "inline-flex items-center gap-2 border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
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
        <GlobalImpactStats />
        <ServicesPreview />
        <PortfolioPreviewGrid />
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
      className="relative isolate min-h-[calc(100svh-144px)] overflow-hidden border-b border-pixel-border"
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
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      aria-label="Pixel Perfect partners"
      className="relative overflow-hidden border-b border-pixel-border bg-[#090909]/82 py-7 backdrop-blur-sm"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pixel-cyan to-transparent" />
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#090909] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#090909] to-transparent" />
        <div className="flex w-max animate-ticker items-center gap-4 whitespace-nowrap">
          {marqueeLogos.map((logo, index) => (
            <div
              className="grid h-20 w-40 place-items-center px-5 py-4 sm:w-48"
              key={`${logo.label}-${index}`}
            >
              <img
                alt={logo.label}
                className="max-h-12 max-w-full object-contain"
                src={logo.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionStatementAvatars() {
  return (
    <section className="relative overflow-hidden border-b border-pixel-border bg-pixel-bg/78 backdrop-blur-sm">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-12%] z-0 w-[min(86vw,780px)] opacity-35 mix-blend-screen sm:right-[-6%] md:opacity-45"
        src={assetPath(homeMedia.mission_avatars)}
      />
      <div className="relative z-10 mx-auto grid min-h-[520px] max-w-[1280px] items-center px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-6">
          <SectionHeader
            index="01"
            eyebrow="Who we are"
            title="A creative agency built for gaming."
            intro={homeContent.mission_statement_avatars}
          />
        </div>
        <div aria-hidden="true" className="hidden md:block" />
      </div>
    </section>
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
  const sponsorLogos = [...sponsors, ...sponsors];

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
        <div className="flex w-max animate-ticker items-center gap-4 whitespace-nowrap">
          {sponsorLogos.map((sponsor, index) => (
            <div
              className="grid h-24 w-44 place-items-center px-6 py-4 sm:w-52"
              key={`${sponsor.path}-${index}`}
            >
              <img
                alt={sponsor.desc ?? ""}
                className="max-h-14 max-w-full object-contain"
                src={sponsor.path}
              />
            </div>
          ))}
        </div>
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
