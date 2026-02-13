import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Media, publive } from "publive-cms-sdk";
import { CTA, DynamicField } from "@/type/global.type";
import { cn } from "@/lib/utils";

interface ProductCard {
  title: string;
  popular?: boolean;
  media?: Media;
  cta?: DynamicField<CTA>;
}

interface ProductGridProps {
  heading: string;
  description?: string;
  products?: DynamicField<ProductCard>;
}

const SECTION_LABEL = "Selected work";

const ProductGrid = ({
  heading,
  description,
  products,
}: ProductGridProps) => {
  const cards = products?.dynamic_fields ?? [];

  if (cards.length === 0) return null;

  return (
    <section
      id="work"
      className="bg-[#F8F7F2] px-6 py-20 md:px-12 lg:px-20"
      aria-labelledby="product-grid-heading"
    >
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.3em] text-[#666]">
              {SECTION_LABEL}
            </p>
            <h2
              id="product-grid-heading"
              className="font-serif text-4xl leading-tight tracking-tight text-[#222] md:text-5xl"
            >
              {heading}
            </h2>
          </div>
          {description ? (
            <p className="max-w-md text-base leading-relaxed text-[#555] lg:pt-9">
              {description}
            </p>
          ) : null}
        </header>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2" role="list">
          {cards.map((card, index) => {
            const href = card.cta?.dynamic_fields?.[0]?.url;
            const category = card.cta?.dynamic_fields?.[0]?.text;
            const mediaPath = card?.media?.absolute_path ? publive.utils.lib.convertMediaURL(card?.media?.absolute_path, "large") : null;
            const mediaAlt = card.media?.alt_text ?? card.title;

            const content = (
              <>
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#222]/5">
                  {mediaPath ? (
                    <Image
                      src={mediaPath}
                      alt={mediaAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 639px) 100vw, 50vw"
                    />
                  ) : null}
                </div>
                <div className="mt-5">
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-[#222]">
                    {card.title}
                  </h3>
                  {category ? (
                    <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-[#666]">
                      {category}
                    </p>
                  ) : null}
                </div>
              </>
            );

            return (
              <li key={card.title + index}>
                {href ? (
                  <Link
                    href={href}
                    className={cn(
                      "group block outline-none focus-visible:ring-2 focus-visible:ring-[#222] focus-visible:ring-offset-2"
                    )}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="block">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProductGrid;
