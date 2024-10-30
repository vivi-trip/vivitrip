import IconFacebook from "@/assets/svgs/ic_sns_facebook_fill.svg";
import IconInstagram from "@/assets/svgs/ic_sns_instagram_fill.svg";
import IconTwitter from "@/assets/svgs/ic_sns_twitter_fill.svg";
import IconYoutube from "@/assets/svgs/ic_sns_youtube_fill.svg";
import TestPages from "@/src/components/TestPages";
import PATH_NAMES from "@/src/constants/pathname";
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
  text: "text-16px-medium text-white text-nowrap",
};

const Footer = () => {
  return (
    <footer className="bg-brand-500 -mx-32 h-footer p-32">
      <div className="mx-auto flex h-full max-w-screen-xl flex-wrap items-start justify-between gap-32">
        <div className="flex items-center">
          <p className={CLASS_NAME.text}>©vivitrip - 2024</p>
          <hr className="mx-24 h-16 border-0 border-l border-white opacity-50" />
          <TestPages />
        </div>
        <div className="flex items-center gap-32">
          <Link className={CLASS_NAME.text} href={PATH_NAMES.PrivacyPolicy}>
            Privacy Policy
          </Link>
          <Link className={CLASS_NAME.text} href={PATH_NAMES.FAQ}>
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-16">
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
