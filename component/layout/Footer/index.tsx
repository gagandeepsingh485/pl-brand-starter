import {
  Publisher,
  type Footer,
  type QuickMenu,
  type ChildQuickLink,
  type SocialLink,
} from "publive-cms-sdk";
import React from "react";
import Link from "next/link";

interface FooterProps {
  publisher: Publisher;
  footer: Footer;
}

const brandLabel = (name: string) =>
  name.endsWith(".") ? name : `${name}.`;

type LinkItem = ChildQuickLink | SocialLink;

function getLinkHref(item: LinkItem): string {
  if ("link" in item && item.link) return String(item.link);
  if ("url" in item && item.url) return String(item.url);
  return "";
}

function getLinkLabel(item: LinkItem): string {
  if ("label" in item && item.label) return String(item.label);
  if ("title" in item && item.title) return String(item.title);
  return "";
}

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: LinkItem[];
}) {
  const list = links.filter((item) => getLinkHref(item) || getLinkLabel(item));
  if (!list.length) return null;
  return (
    <div>
      <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#666]">
        {heading}
      </h3>
      <ul className="mt-4 flex flex-col gap-3" role="list">
        {list.map((item) => (
          <li key={getLinkLabel(item) + getLinkHref(item)}>
            <Link
              href={getLinkHref(item)}
              className="text-[14px] text-[#222] transition-colors hover:text-[#555]"
            >
              {getLinkLabel(item)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = ({ publisher, footer }: FooterProps) => {
  const brandName = publisher.name;
  const shortBio = footer.short_bio;
  const copyRight = footer.copyRightText;
  const quickMenu: QuickMenu[] = footer.addQuickMenu ?? [];
  const socialLinks: SocialLink[] = footer.socialLinks ?? [];

  const hasQuickMenuShape = quickMenu.every(
    (m) => "title" in m && Array.isArray(m.childQuickLinks)
  );


  return (
    <footer className="border-t border-[#222]/10 bg-[#F8F7F2] px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1100px] py-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr,1fr,1fr,1fr] lg:gap-12">
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-normal text-[#222]"
              aria-label="Home"
            >
              {brandName}
            </Link>
            {shortBio ? (
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#555]">
                {shortBio}
              </p>
            ) : null}
          </div>
          <div className={`grid grid-cols-1 gap-10 ml-auto ${footer.addQuickMenu.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {footer.addQuickMenu.map((menu) => (
              <LinkColumn
                key={menu.title}
                heading={menu.title}
                links={menu.childQuickLinks ?? []}
              />
            ))}
          </div>
          {socialLinks.length > 0 ? (
            <LinkColumn heading="Connect" links={socialLinks} />
          ) : null}
        </div>

        <div className="mt-12 border-t border-[#222]/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[13px] text-[#555]">
              {copyRight ||
                `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
