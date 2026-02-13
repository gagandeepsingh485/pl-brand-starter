import React from "react";
import Image from "next/image";
import { Media, publive } from "publive-cms-sdk";
import { CTA, DynamicField } from "@/type/global.type";
import ArrowRight from "@/lib/assets/svg/arrow-right";
import Link from "next/link";

type MediaPosition = "background" | "right";

interface HeroBannerWithMediaProps {
  heading: string;
  description: string;
  hashtag: string;
  media?: Media;
  media_position?: MediaPosition;
  cta?: DynamicField<CTA>;
}

const HeroBannerWithMedia = ({
  heading,
  description,
  hashtag,
  media,
  cta,
}: HeroBannerWithMediaProps) => {
  const ctaText = cta?.dynamic_fields?.[0]?.text ?? "View our work";
  const ctaUrl = cta?.dynamic_fields?.[0]?.url ?? "#work";
  const hasMedia = Boolean(media?.absolute_path);

  const contentBlock = (
    <div className="flex flex-col gap-8 text-center">
      <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#666]">
        {hashtag}
      </p>
      <h1 className="text-center font-serif text-4xl leading-[1.15] tracking-tight text-[#222] md:text-6xl lg:text-7xl">
        <span className="text-balance">{heading}</span>
      </h1>
      <p className="max-w-lg mx-auto text-center text-base leading-relaxed text-[#555] md:text-lg">
        {description}
      </p>
      <div className="flex flex-wrap mx-auto items-center gap-8 justify-center md:justify-start ">
        <Link
          href={ctaUrl}
          className="group inline-flex items-center gap-3 rounded-sm border border-[#222] bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#222] transition-colors hover:bg-[#222] hover:text-white"
        >
          {ctaText}
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
        <Link
          href="#about"
          className="text-xs font-medium uppercase tracking-[0.2em] text-[#555] underline-offset-4 transition-colors hover:text-[#222] hover:underline"
        >
          Our story
        </Link>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-[50vh] flex-col justify-end bg-[#F8F7F2] px-6 pb-20 pt-28 md:px-12 lg:px-20">
      {hasMedia && media?.absolute_path ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={media.absolute_path}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#F8F7F2]/85" />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[1100px] mx-auto">
        {hasMedia && media?.path ? (
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr,minmax(320px,480px)] lg:gap-16">
            <div className="max-w-3xl mx-auto">{contentBlock}</div>
            <div className="relative aspect-[4/5] w-full h-[400px] overflow-hidden rounded-sm lg:aspect-[3/4]">
              <Image
                src={publive.utils.lib.convertMediaURL(media.absolute_path, "large")}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1023px) 100vw, 240px"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">{contentBlock}</div>
        )}
      </div>
    </section>
  );
};

export default HeroBannerWithMedia;