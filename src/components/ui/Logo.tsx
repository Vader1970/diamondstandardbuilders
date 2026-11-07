import Image from "next/image";

const logos = {
  light: { src: "/images/logo-white.png", width: 311, height: 60 },
  dark: { src: "/images/logo-dark.png", width: 286, height: 60 },
} as const;

type LogoProps = {
  tone: keyof typeof logos;
  height: number | string;
  priority?: boolean;
};

export function Logo({ tone, height, priority = false }: LogoProps) {
  const logo = logos[tone];
  return (
    <Image
      src={logo.src}
      alt="Diamond Standard Builders"
      width={logo.width}
      height={logo.height}
      priority={priority}
      quality={90}
      className="ds-logo"
      style={{ height, width: "auto", maxWidth: "none" }}
    />
  );
}
