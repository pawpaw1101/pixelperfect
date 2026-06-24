import React from "react";
import { Link } from "react-router-dom";

import contentRaw from "../content.JSON?raw";
import mediaMappingRaw from "../media_mapping.JSON?raw";
import { Button } from "./components/ui/button";
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

const portfolioCases = [
  {
    path: "/portfolio/nestle",
    copy: nestleContent.case_study_hero,
    image: nestleMedia.nestle_metaverse,
  },
  {
    path: "/portfolio/swat",
    copy: swatContent.case_study_hero,
    image: swatMedia.swat_cover,
  },
  {
    path: "/portfolio/meta",
    copy: metaContent.case_study_hero,
    image: metaMedia.meta_cover,
  },
];

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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pixel-border bg-[#242424]/90 backdrop-blur-md">
      <nav className="mx-auto flex min-h-20 max-w-[1480px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 lg:px-8">
        <Link
          aria-label="/"
          className="group flex h-12 w-[138px] items-center justify-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-pixel-cyan sm:w-[176px]"
          to="/"
        >
          <img
            alt=""
            className="max-h-11 max-w-full object-contain transition duration-150 group-hover:drop-shadow-[0_0_18px_rgba(21,255,255,0.42)]"
            src={assetPath(homeMedia.nav_logo_global)}
          />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <NavTextLink active={routeKey === "/services"} to="/services">
            Services
          </NavTextLink>
          <NavTextLink active={routeKey.startsWith("/portfolio")} to="/portfolio">
            Portfolio
          </NavTextLink>
          <Button
            asChild
            className={cn(
              "h-11 w-[112px] border-pixel-border bg-[#111111] px-2 hover:border-pixel-cyan sm:w-[146px] sm:px-3",
              isCampus && "border-campus-yellow hover:border-campus-yellow",
            )}
            size="logo"
            variant="ghost"
          >
            <Link aria-label="/campus-masters" to="/campus-masters">
              <img
                alt=""
                className="max-h-8 max-w-full object-contain"
                src={assetPath(campusMedia.nav_logo_cm_button)}
              />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function NavTextLink({ active, children, to }) {
  return (
    <Link
      className={cn(
        "border border-pixel-border bg-[#111111] px-3 py-3 font-mono text-[11px] uppercase tracking-normal text-white/75 transition-colors duration-150 hover:border-pixel-cyan hover:text-pixel-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-pixel-cyan sm:text-xs",
        active && "border-pixel-cyan text-pixel-cyan",
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

function Home() {
  return (
    <>
      <HeroVideoBrutalist />
      <TechStackTicker />
      <MissionStatementAvatars />
      <GlobalImpactStats />
      <ServicesExpandedGrid />
      <PortfolioPreviewGrid />
      <FooterGlobal />
    </>
  );
}

function HeroVideoBrutalist() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden border-b border-pixel-border pt-24 sm:min-h-[84svh]">
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.78),rgba(17,17,17,0.24)_52%,rgba(36,36,36,0.74)),linear-gradient(0deg,rgba(36,36,36,0.92),rgba(36,36,36,0)_42%)]" />
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(21,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(21,255,255,0.13)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="mx-auto flex w-full max-w-[1480px] items-end px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative max-w-[980px]">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-10 w-10 border-l border-t border-pixel-cyan"
          />
          <h1 className="font-display text-4xl font-bold uppercase leading-[1] tracking-normal text-white drop-shadow-[0_0_20px_rgba(21,255,255,0.18)] sm:text-6xl lg:text-7xl">
            {homeContent.hero_video_brutalist}
          </h1>
          <div
            aria-hidden="true"
            className="mt-7 grid h-4 max-w-[680px] grid-cols-[1.5fr_0.5fr_1fr_0.3fr] gap-2"
          >
            <span className="bg-pixel-cyan" />
            <span className="bg-pixel-magenta" />
            <span className="border border-pixel-cyan" />
            <span className="animate-pulseLine bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackTicker() {
  const ticker = homeContent.tech_stack_ticker;

  return (
    <section className="overflow-hidden border-b border-pixel-border bg-pixel-surface py-3 font-mono text-xs text-pixel-cyan sm:text-sm">
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
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative mx-auto grid max-w-[1480px] items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="border border-pixel-border bg-pixel-surface p-5 sm:p-7">
          <p className="font-display text-xl font-semibold leading-snug tracking-normal text-white/90 sm:text-3xl lg:text-4xl">
            {homeContent.mission_statement_avatars}
          </p>
        </div>
        <MediaFrame
          className="min-h-[320px]"
          imgClassName="object-contain p-3"
          src={assetPath(homeMedia.mission_avatars)}
        />
      </div>
    </section>
  );
}

function GlobalImpactStats() {
  return (
    <section className="border-b border-pixel-border bg-[#191919] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px] border-y border-pixel-cyan py-8">
        <p className="font-display text-2xl font-bold uppercase leading-tight tracking-normal text-pixel-cyan sm:text-4xl lg:text-5xl">
          {homeContent.global_impact_stats}
        </p>
      </div>
    </section>
  );
}

function ServicesExpandedGrid() {
  const gallery = assetList(servicesMedia.broadcast_gallery);

  return (
    <section className="border-b border-pixel-border bg-pixel-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1480px] gap-px bg-pixel-border md:grid-cols-3">
        <TextPanel className="md:col-span-2" tone="cyan">
          {servicesContent.services_header}
        </TextPanel>
        <TextPanel tone="magenta">{servicesContent.service_marketing_campaigns}</TextPanel>
        {gallery.slice(0, 3).map((image) => (
          <Link className="bg-pixel-surface" key={image.path} to="/services">
            <MediaFrame className="min-h-[260px] border-0" src={image.path} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function PortfolioPreviewGrid() {
  return (
    <section className="border-b border-pixel-border bg-[#191919] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1480px] gap-px bg-pixel-border md:grid-cols-3">
        {portfolioCases.map((item) => (
          <PortfolioCard item={item} key={item.path} />
        ))}
      </div>
    </section>
  );
}

function ServicesPage() {
  const gallery = assetList(servicesMedia.broadcast_gallery);
  const serviceCards = [
    servicesContent.service_marketing_campaigns,
    servicesContent.service_live_broadcast_gallery,
    servicesContent.service_island_dev_spotlight,
    servicesContent.service_influencer_campaigns,
    servicesContent.service_content_production,
    servicesContent.service_event_management,
    servicesContent.software_capabilities_grid,
  ];

  return (
    <PageShell>
      <section className="grid gap-px bg-pixel-border lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-pixel-surface p-5 sm:p-7 lg:p-10">
          <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-normal text-white sm:text-4xl">
            {servicesContent.services_header}
          </p>
        </div>
        <MediaFrame className="min-h-[360px] border-0" src={gallery[0]?.path} />
      </section>

      <section className="grid gap-px bg-pixel-border md:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((copy, index) => (
          <TextPanel key={copy} tone={index % 2 === 0 ? "cyan" : "magenta"}>
            {copy}
          </TextPanel>
        ))}
      </section>

      <section className="grid gap-px bg-pixel-border md:grid-cols-3">
        {gallery.slice(1).map((image) => (
          <MediaFrame className="min-h-[280px] border-0" key={image.path} src={image.path} />
        ))}
      </section>
    </PageShell>
  );
}

function PortfolioPage() {
  return (
    <PageShell>
      <section className="grid gap-px bg-pixel-border lg:grid-cols-[0.8fr_1.2fr]">
        <TextPanel tone="cyan">{portfolioContent.portfolio_intro}</TextPanel>
        <div className="grid gap-px bg-pixel-border md:grid-cols-3">
          {portfolioCases.map((item) => (
            <PortfolioCard item={item} key={item.path} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function PortfolioNestlePage() {
  return (
    <CaseStudyLayout
      heroCopy={nestleContent.case_study_hero}
      heroImage={assetPath(nestleMedia.nestle_metaverse)}
      panels={[
        { copy: nestleContent.fortnite_island_overview, tone: "cyan" },
        { copy: nestleContent.physical_pos_gallery, tone: "magenta" },
        { copy: nestleContent.campaign_results, tone: "cyan" },
        { copy: nestleContent.campaign_responsibilities, tone: "magenta" },
      ]}
      secondaryImage={assetPath(nestleMedia.nestle_pos)}
    />
  );
}

function PortfolioSwatPage() {
  return (
    <CaseStudyLayout
      heroCopy={swatContent.case_study_hero}
      heroImage={assetPath(swatMedia.swat_cover)}
      panels={[
        { copy: swatContent.project_overview, tone: "cyan" },
        { copy: swatContent.game_mechanics, tone: "magenta" },
        { copy: swatContent.on_ground_activation, tone: "cyan" },
        { copy: swatContent.exposure, tone: "magenta" },
      ]}
      secondaryImage={assetPath(swatMedia.swat_event)}
    />
  );
}

function PortfolioMetaPage() {
  return (
    <CaseStudyLayout
      heroCopy={metaContent.case_study_hero}
      heroImage={assetPath(metaMedia.meta_cover)}
      panels={[
        { copy: metaContent.project_overview, tone: "cyan" },
        { copy: metaContent.nft_results, tone: "magenta" },
        { copy: metaContent.media_coverage, tone: "cyan" },
        { copy: metaContent.space_overview, tone: "magenta" },
      ]}
      secondaryImage={assetPath(metaMedia.meta_world)}
    />
  );
}

function CaseStudyLayout({ heroCopy, heroImage, panels, secondaryImage }) {
  return (
    <PageShell>
      <section className="grid gap-px bg-pixel-border lg:grid-cols-[1.1fr_0.9fr]">
        <MediaFrame className="min-h-[430px] border-0" src={heroImage} />
        <div className="bg-pixel-surface p-5 sm:p-7 lg:p-10">
          <p className="font-display text-2xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
            {heroCopy}
          </p>
        </div>
      </section>

      <section className="grid gap-px bg-pixel-border md:grid-cols-2">
        {panels.slice(0, 2).map((panel) => (
          <TextPanel key={panel.copy} tone={panel.tone}>
            {panel.copy}
          </TextPanel>
        ))}
      </section>

      <section className="grid gap-px bg-pixel-border md:grid-cols-[0.9fr_1.1fr]">
        <MediaFrame className="min-h-[320px] border-0" src={secondaryImage} />
        <div className="grid gap-px bg-pixel-border">
          {panels.slice(2).map((panel) => (
            <TextPanel key={panel.copy} tone={panel.tone}>
              {panel.copy}
            </TextPanel>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function CampusMastersShell() {
  const eventImages = assetList(campusMedia.events_masonry_gallery);
  const sponsors = assetList(campusMedia.sponsors_marquee);

  return (
    <div className="bg-campus-bg pt-24">
      <section className="mx-auto grid max-w-[1480px] gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <div className="border border-campus-yellow bg-[#09111f] p-5 sm:p-7">
          <img
            alt=""
            className="mb-8 max-h-[220px] w-full object-contain"
            src={assetPath(campusMedia.hero_logo_main)}
          />
          <p className="font-display text-3xl font-semibold uppercase leading-tight tracking-normal text-campus-yellow sm:text-5xl">
            {campusContent.cm_hero_main_logo}
          </p>
        </div>
        <div className="grid gap-px bg-campus-yellow">
          <CampusPanel>{campusContent.season_3_metrics_grid}</CampusPanel>
          <CampusPanel>{campusContent.on_ground_events_masonry}</CampusPanel>
          <CampusPanel>{campusContent.brand_integration}</CampusPanel>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-px bg-campus-yellow px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {eventImages.map((image, index) => (
          <MediaFrame
            className={cn("min-h-[260px] border-0", index === 0 && "lg:row-span-2 lg:min-h-[520px]")}
            key={image.path}
            src={image.path}
          />
        ))}
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-px bg-campus-yellow px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <CampusPanel>{campusContent.on_ground_activations}</CampusPanel>
        <CampusPanel>{campusContent.previous_partnership_results}</CampusPanel>
        <CampusPanel>{campusContent.partnership_tiers_brutalist}</CampusPanel>
        <CampusPanel>{campusContent.closing_statement}</CampusPanel>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-px bg-campus-yellow sm:grid-cols-2 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div className="grid min-h-28 place-items-center bg-[#09111f] p-5" key={sponsor.path}>
              <img alt="" className="max-h-16 max-w-[180px] object-contain" src={sponsor.path} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CampusPanel({ children }) {
  return (
    <div className="bg-[#09111f] p-5 text-campus-yellow sm:p-7">
      <p className="font-display text-xl font-semibold uppercase leading-tight tracking-normal sm:text-3xl">
        {children}
      </p>
    </div>
  );
}

function PortfolioCard({ item }) {
  return (
    <Link className="group grid bg-pixel-surface transition-colors hover:bg-[#151515]" to={item.path}>
      <MediaFrame className="min-h-[260px] border-0" src={assetPath(item.image)} />
      <div className="border-t border-pixel-border p-5">
        <p className="font-display text-lg font-semibold leading-tight tracking-normal text-white/90 group-hover:text-pixel-cyan sm:text-xl">
          {item.copy}
        </p>
      </div>
    </Link>
  );
}

function PageShell({ children }) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="border border-pixel-border">{children}</div>
    </div>
  );
}

function TextPanel({ children, className, tone = "cyan" }) {
  return (
    <div className={cn("relative bg-pixel-surface p-5 sm:p-7 lg:p-9", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-8 w-8 border-l border-t",
          tone === "magenta" ? "border-pixel-magenta" : "border-pixel-cyan",
        )}
      />
      <p className="text-base leading-relaxed text-white/80 sm:text-lg">{children}</p>
    </div>
  );
}

function MediaFrame({ className, imgClassName, src }) {
  return (
    <div className={cn("relative overflow-hidden border border-pixel-border bg-[#050505]", className)}>
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(21,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(21,255,255,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
      {src ? (
        <img
          alt=""
          className={cn("absolute inset-0 z-10 h-full w-full object-cover", imgClassName)}
          loading="eager"
          src={src}
        />
      ) : null}
    </div>
  );
}

function FooterGlobal() {
  return (
    <footer className="bg-[#070707] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between border-t border-pixel-border pt-8">
        <img
          alt=""
          className="h-12 w-auto object-contain"
          src={assetPath(homeMedia.nav_logo_global)}
        />
        <div aria-hidden="true" className="h-px w-1/2 bg-pixel-cyan" />
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
