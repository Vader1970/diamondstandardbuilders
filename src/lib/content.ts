export type NavItem = {
  label: string;
  id: string;
};

export type Service = {
  num: string;
  title: string;
  copy: string;
  img: string;
  alt: string;
  value: string;
};

export type Step = {
  num: string;
  title: string;
  copy: string;
  delay: string;
};

export const navItems: NavItem[] = [
  { label: "Services", id: "services" },
  { label: "Why Us", id: "approach" },
  { label: "Inspiration", id: "details" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export const services: Service[] = [
  {
    num: "01",
    title: "New Builds",
    copy: "Building a home around the way you want to live.",
    img: "/images/new-builds.webp",
    alt: "Contemporary two-storey home with dark vertical cladding, pale brick and timber decking",
    value: "New Build",
  },
  {
    num: "02",
    title: "Renovations & Extensions",
    copy: "Transforming existing spaces to suit changing needs.",
    img: "/images/renovations.webp",
    alt: "Light-filled open-plan kitchen and dining room opening onto a deck",
    value: "Renovation / Extension",
  },
  {
    num: "03",
    title: "Decking & Outdoor Living",
    copy: "Making more of the spaces outside your home.",
    img: "/images/outdoor-living.webp",
    alt: "Timber pergola over a deck with outdoor lounge and kitchen, mountains beyond",
    value: "Decking / Outdoor Living",
  },
  {
    num: "04",
    title: "General Building",
    copy: "Practical building solutions for projects large and small.",
    img: "/images/general-building.webp",
    alt: "Timber wall framing and roof trusses on a residential build",
    value: "General Building",
  },
];

export const projectTypes = [
  ...services.map((service) => service.value),
  "Something Else",
];

export const approachPoints = [
  "Clear Communication",
  "Care in Every Detail",
  "A Personal Approach",
];

export const steps: Step[] = [
  {
    num: "01",
    title: "Let's Talk",
    copy: "Tell us about your project, your ideas and what you're hoping to achieve.",
    delay: "0",
  },
  {
    num: "02",
    title: "Plan & Quote",
    copy: "Discuss the scope, practical details and the best way forward.",
    delay: "160",
  },
  {
    num: "03",
    title: "Let's Build",
    copy: "Once everything is agreed, the building work can begin.",
    delay: "320",
  },
];

export const SELECT_SERVICE_EVENT = "ds:select-service";
