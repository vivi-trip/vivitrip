import IconFacebook from "@/assets/svgs/ic_sns_facebook_fill.svg";
import IconInstagram from "@/assets/svgs/ic_sns_instagram_fill.svg";
import IconTwitter from "@/assets/svgs/ic_sns_twitter_fill.svg";
import IconYoutube from "@/assets/svgs/ic_sns_youtube_fill.svg";
import Link from "next/link";

const SNS_LINKS = [
  {
    name: "Facebook",
    icon: <IconFacebook className="text-white" />,
    href: "https://www.facebook.com/",
  },
  {
    name: "Twitter",
    icon: <IconTwitter className="text-white" />,
    href: "https://twitter.com/",
  },
  {
    name: "Youtube",
    icon: <IconYoutube className="text-white" />,
    href: "https://www.youtube.com/",
  },
  {
    name: "Instagram",
    icon: <IconInstagram className="text-white" />,
    href: "https://www.instagram.com/",
  },
];

const CLASS_NAME = {
  text: "font-16px-medium text-white text-nowrap",
};

const Footer = () => {
  return (
    <footer className="-mx-24 min-h-footer bg-brand-500 p-32 md:-mx-32">
      <div className="mx-auto flex h-full max-w-screen-xl flex-wrap items-start justify-between gap-x-12 gap-y-40 md:gap-x-32">
        <div className="flex items-center">
          <p className={CLASS_NAME.text}>©VIVITRIP - 2025</p>
        </div>
        <div className="flex items-center gap-12 md:gap-16">
          {SNS_LINKS.map(({ name, icon, href }) => {
            return (
              <div key={`sns_link_${name}`}>
                <Link href={href} target="_blank">
                  {icon}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
