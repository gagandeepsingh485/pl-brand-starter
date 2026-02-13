import React from "react";
import Image from "next/image";
import { publive } from "publive-cms-sdk";

interface BannerMedia {
  absolute_path?: string;
  alt_text?: string;
}

interface HeroBannerImageProps {
  heading: string;
  sub_text?: string;
  description?: string;
  banner?: BannerMedia;
}

const HeroBannerImage = ({
  heading,
  sub_text,
  description,
  banner,
}: HeroBannerImageProps) => {
  const hasBanner = Boolean(banner?.absolute_path);

  return (
    <section
      id="about"
      className="overflow-x-clip bg-[#F8F7F2] px-6 py-20 md:px-12 lg:px-20"
      aria-labelledby="hero-banner-image-heading"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8 order-2 lg:order-1 lg:col-start-1 lg:row-start-1">
            {sub_text ? (
              <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#666]">
                {sub_text}
              </p>
            ) : null}
            <h2
              id="hero-banner-image-heading"
              className="font-serif text-4xl leading-tight tracking-tight text-[#222] md:text-5xl"
            >
              {heading}
            </h2>
            {description ? (
              <div
                className="grid grid-cols-1 gap-6 text-[#555] sm:grid-cols-2 [&>p]:col-span-full [&>p]:text-base [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}
          </div>

          {hasBanner ? (
            <div className="relative order-1 aspect-[4/5] w-full min-w-0 overflow-hidden rounded-sm max-lg:-mx-6 max-lg:w-[calc(100%+3rem)] lg:order-2 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:ml-auto lg:max-w-[480px] lg:w-full">
              <Image
                src={ banner?.absolute_path ? publive.utils.lib.convertMediaURL(banner?.absolute_path, "large") : ""}
                alt={banner!.alt_text ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 45vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default HeroBannerImage;
