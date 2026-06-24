import React from "react";
import { Link } from "react-router-dom";

import contentRaw from "../content.JSON?raw";
import mediaMappingRaw from "../media_mapping.JSON?raw";
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

const homeSectors = [
  "Brands",
  "Government entities",
  "Broadcast networks",
  "Events",
  "Game publishers",
];

const campusStats = [
  { value: "51+", label: "Universities onboard" },
  { value: "3", label: "Completed seasons" },
  { value: "$31K+", label: "Combined prize pool" },
  { value: "20K+", label: "Student reach" },
];

const campusResults = [
  { value: "150K+", label: "Social media views" },
  { value: "10,100+", label: "Students reached" },
  { value: "27", label: "Livestreams" },
  { value: "167K", label: "Livestream impressions" },
];

const partnershipTiers = [
  { tier: "Title Sponsor", price: "$50,000", featured: true },
  { tier: "Gold Partner", price: "$30,000", featured: false },
  { tier: "Silver Partner", price: "$12,000", featured: false },
];

/* --------------------------------- shell ---------------------------------- */

function App({ children, routeKey }) {
  const isCampus = routeKey === "/campus-masters";

  return (
    <div
      className={cn(
        "min-h-screen overflow-x-hidden font-body text-white antialiased",
        isCampus ? "bg-campus-bg" : "bg-pixel-bg",
      )}
    >
      <GlobalNav isCampus={isCampus} routeKey={routeKey} />
      <main>{children}</main>
    </div>
  );
}

function GlobalNav({ isCampus, routeKey }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pixel-border bg-[#1a1a1a]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          aria-label="Pixel Perfect home"
          className="group flex h-10 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pixel-cyan"
          to="/"
        >
          <img
            alt="Pixel Perfect"
            className="max-h-9 w-auto object-contain transition duration-150 group-hover:drop-shadow-[0_0_16px_rgba(21,255,255,0.45)] sm:max-h-10"
            src={assetPath(homeMedia.nav_logo_global)}
          />
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <NavTextLink active={routeKey === "/services"} to="/services">
            Services
          </NavTextLink>
          <NavTextLink active={routeKey.startsWith("/portfolio")} to="/portfolio">
            Portfolio
          </NavTextLink>
          <Link
            aria-label="Campus Masters"
            className={cn(
              "ml-1 flex h-10 items-center justify-center border bg-[#0d0d0d] px-3 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campus-yellow",
              isCampus
                ? "border-campus-yellow"
                : "border-pixel-border hover:border-campus-yellow",
            )}
            to="/campus-masters"
          >
            <img
              alt="Campus Masters"
              className="max-h-7 w-auto object-contain"
              src={assetPath(campusMedia.nav_logo_cm_button)}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavTextLink({ active, children, to }) {
  return (
    <Link
      className={cn(
        "border border-pixel-border bg-[#0d0d0d] px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-white/70 transition-colors duration-150 hover:border-pixel-cyan hover:text-pixel-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-cyan sm:text-xs",
        active && "border-pixel-cyan text-pixel-cyan",
      )}
      to={to}
    >
      {children}
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

function SectionHeader({ index, eyebrow, title, intro, tone = "cyan", align = "left" }) {
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
      <h2 className="text-balance font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
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
          "font-display text-4xl font-bold tracking-tight sm:text-5xl",
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

function MediaFrame({ aspect = "aspect-[16/10]", className, imgClassName, src, fit = "cover" }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-pixel-border bg-[#050505]",
        aspect,
        className,
      )}
    >
      <div className="absolute inset-0 z-10 opacity-30 [background-image:linear-gradient(rgba(21,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(21,255,255,0.1)_1px,transparent_1px)] [background-size:34px_34px]" />
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
      />
      <div className={cn("flex flex-col gap-4", reverse && "md:order-1")}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h3 className="text-balance font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
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
      <span aria-hidden="true">{"->"}</span>
    </Link>
  );
}

function PageShell({ children }) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">{children}</div>
  );
}

/* ---------------------------------- home ---------------------------------- */

function Home() {
  return (
    <>
      <HeroVideoBrutalist />
      <TechStackTicker />
      <MissionStatementAvatars />
      <GlobalImpactStats />
      <ServicesPreview />
      <PortfolioPreviewGrid />
      <ClientTrust />
      <FooterGlobal />
    </>
  );
}

function HeroVideoBrutalist() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden border-b border-pixel-border pt-16">
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loop
        muted
        playsInline
        poster={assetPath(homeMedia.hero_fallback)}
      >
        <source src={assetPath(homeMedia.hero_video)} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.92),rgba(17,17,17,0.55)_55%,rgba(17,17,17,0.35)),linear-gradient(0deg,rgba(17,17,17,0.95),rgba(17,17,17,0)_50%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(21,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(21,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Pixel Perfect // Gaming Creative Agency // UAE</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white drop-shadow-[0_0_24px_rgba(21,255,255,0.2)] sm:text-6xl lg:text-7xl">
            {homeContent.hero_video_brutalist}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            We build in-game experiences, branded content, esports partnerships, and gamified
            storytelling for the world&apos;s gaming audiences.
          </p>
          <div
            aria-hidden="true"
            className="mt-8 grid h-3 max-w-md grid-cols-[1.5fr_0.5fr_1fr_0.3fr] gap-2"
          >
            <span className="bg-pixel-cyan" />
            <span className="bg-pixel-magenta" />
            <span className="border border-pixel-cyan" />
            <span className="animate-pulseLine bg-white" />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/portfolio" tone="solid">
              View our work
            </CtaLink>
            <CtaLink to="/services">Explore services</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackTicker() {
  const ticker = homeContent.tech_stack_ticker;

  return (
    <section
      aria-label="Tools we use"
      className="overflow-hidden border-b border-pixel-border bg-pixel-surface py-3 font-mono text-xs text-pixel-cyan sm:text-sm"
    >
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, index) => (
          <span className="px-8" key={index}>
            {ticker}
          </span>
        ))}
      </div>
    </section>
  );
}

function MissionStatementAvatars() {
  return (
    <section className="relative border-b border-pixel-border bg-pixel-bg">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <SectionHeader
            index="01"
            eyebrow="Who we are"
            title="A creative agency built for gaming."
            intro={homeContent.mission_statement_avatars}
          />
        </div>
        <MediaFrame
          aspect="aspect-[4/3]"
          fit="contain"
          src={assetPath(homeMedia.mission_avatars)}
        />
      </div>
    </section>
  );
}

function GlobalImpactStats() {
  return (
    <section className="border-b border-pixel-border bg-[#191919] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader index="02" eyebrow="By the numbers" title="Six years of measurable impact." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {homeStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-white/45">
            Working with:
          </span>
          {homeSectors.map((sector) => (
            <span
              className="border border-pixel-border bg-[#141414] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white/70"
              key={sector}
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="border-b border-pixel-border bg-pixel-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            index="03"
            eyebrow="What we do"
            title="Full-stack gaming production."
            intro={servicesContent.services_header}
          />
          <CtaLink to="/services">All services</CtaLink>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard index={index + 1} key={service.label} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ index, service }) {
  return (
    <article className="group flex h-full flex-col border border-pixel-border bg-[#141414] p-6 transition-colors duration-150 hover:border-pixel-cyan">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-pixel-cyan/60">
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 bg-pixel-border transition-colors duration-150 group-hover:bg-pixel-cyan"
        />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold uppercase leading-tight tracking-tight text-white group-hover:text-pixel-cyan sm:text-xl">
        {service.label}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{service.copy}</p>
    </article>
  );
}

function PortfolioPreviewGrid() {
  return (
    <section className="border-b border-pixel-border bg-[#191919] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            index="04"
            eyebrow="Selected work"
            title="Playable brand worlds."
            tone="magenta"
            intro={portfolioContent.portfolio_intro}
          />
          <CtaLink to="/portfolio">View portfolio</CtaLink>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {portfolioCases.map((item) => (
            <PortfolioCard item={item} key={item.path} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }) {
  return (
    <Link
      className="group flex flex-col border border-pixel-border bg-[#141414] transition-colors duration-150 hover:border-pixel-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pixel-cyan"
      to={item.path}
    >
      <MediaFrame className="border-0 border-b border-pixel-border" src={item.image} />
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-xs uppercase tracking-wider text-pixel-magenta">
          {item.tag}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold uppercase leading-tight tracking-tight text-white group-hover:text-pixel-cyan sm:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{item.copy}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-pixel-cyan">
          Case study <span aria-hidden="true">{"->"}</span>
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
              className="font-display text-lg font-semibold uppercase tracking-tight text-white/40 sm:text-xl"
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
    <PageShell>
      <SectionHeader
        index="—"
        eyebrow="Services"
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
    <PageShell>
      <SectionHeader
        index="—"
        eyebrow="Portfolio"
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
    <PageShell>
      <Link
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors hover:text-pixel-cyan"
        to="/portfolio"
      >
        <span aria-hidden="true">{"<-"}</span> Back to portfolio
      </Link>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <MediaFrame aspect="aspect-[4/3]" className="border-0 border border-pixel-border" src={heroImage} />
        <div className="flex flex-col justify-center border border-pixel-border bg-[#141414] p-6 sm:p-9">
          <span className="font-mono text-xs uppercase tracking-wider text-pixel-magenta">{tag}</span>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl">
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
    <div className="bg-campus-bg">
      <CampusHero />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="Season 3 metrics"
          title="A league at national scale."
          tone="yellow"
          intro={campusContent.on_ground_events_masonry}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campusStats.map((stat) => (
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

      <section className="border-y border-campus-yellow/20 bg-[#0b1322] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            index="02"
            eyebrow="Proven results"
            title="Reach that brands can measure."
            tone="yellow"
            intro={campusContent.previous_partnership_results}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {campusResults.map((stat) => (
              <StatCard key={stat.label} tone="yellow" {...stat} />
            ))}
          </div>
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

      <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          eyebrow="Partnership tiers"
          title="Pick your level of presence."
          tone="yellow"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {partnershipTiers.map((tier) => (
            <div
              className={cn(
                "flex flex-col border bg-[#0b1322] p-7",
                tier.featured ? "border-campus-yellow" : "border-campus-yellow/25",
              )}
              key={tier.tier}
            >
              {tier.featured ? (
                <span className="mb-4 inline-flex w-fit bg-campus-yellow px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-black">
                  Most visible
                </span>
              ) : null}
              <span className="font-mono text-xs uppercase tracking-wider text-campus-yellow/70">
                {tier.tier}
              </span>
              <p className="mt-3 font-display text-4xl font-bold tracking-tight text-campus-yellow sm:text-5xl">
                {tier.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-campus-yellow/20 bg-[#0b1322] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <Eyebrow tone="yellow">Our partners</Eyebrow>
          <div className="mt-6 grid grid-cols-2 gap-px bg-campus-yellow/15 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <div
                className="grid min-h-28 place-items-center bg-[#0b1322] p-6"
                key={sponsor.path}
              >
                <img
                  alt={sponsor.desc ?? ""}
                  className="max-h-14 max-w-[160px] object-contain opacity-70 transition-opacity hover:opacity-100"
                  src={sponsor.path}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold uppercase leading-[1.1] tracking-tight text-campus-yellow sm:text-4xl lg:text-5xl">
            {campusContent.closing_statement}
          </h2>
        </div>
      </section>
    </div>
  );
}

function CampusHero() {
  return (
    <section className="relative overflow-hidden border-b border-campus-yellow/20 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36">
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,234,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,234,0,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div className="border border-campus-yellow bg-[#0b1322] p-6 sm:p-8">
          <img
            alt="Campus Masters"
            className="mx-auto max-h-44 w-auto object-contain"
            src={assetPath(campusMedia.hero_logo_main)}
          />
        </div>
        <div>
          <Eyebrow tone="yellow">Campus Masters // University Esports League</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold uppercase leading-[1] tracking-tight text-campus-yellow sm:text-6xl">
            {campusContent.cm_hero_main_logo}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            {campusContent.season_3_metrics_grid}
          </p>
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
      />
      <div className={cn("flex flex-col gap-4", reverse && "md:order-1")}>
        <Eyebrow tone="yellow">{venue.eyebrow}</Eyebrow>
        <h3 className="text-balance font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
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
            <NavTextLink to="/services">Services</NavTextLink>
            <NavTextLink to="/portfolio">Portfolio</NavTextLink>
            <NavTextLink to="/campus-masters">Campus Masters</NavTextLink>
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

App.Home = Home;
App.ServicesPage = ServicesPage;
App.PortfolioPage = PortfolioPage;
App.PortfolioNestlePage = PortfolioNestlePage;
App.PortfolioSwatPage = PortfolioSwatPage;
App.PortfolioMetaPage = PortfolioMetaPage;
App.CampusMastersShell = CampusMastersShell;

export default App;
