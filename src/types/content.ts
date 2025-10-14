export interface HeaderNav {
  features: string;
  pricing: string;
  solutions: string;
  support: string;
  news: string;
  aboutUs: string;
}

export interface HeaderCTA {
  signUp: string;
  signIn: string;
}

export interface HeaderLogo {
  alt: string;
}

export interface Header {
  nav: HeaderNav;
  cta: HeaderCTA;
  logo: HeaderLogo;
}

export interface HeroContent {
  title: string;
  description: string;
}

export interface HeroCTA {
  freeTrial: string;
  watchVideo: string;
}

export interface HeroImage {
  alt: string;
}

export interface HeroSection {
  content: HeroContent;
  cta: HeroCTA;
  image: HeroImage;
}

export interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
}

export interface FeaturesContent {
  title: string;
  description: string;
}

export interface FeaturesSection {
  content: FeaturesContent;
  features: Feature[];
}

export interface Plan {
  name: string;
  subtitle: string;
  period: string;
  price: string;
  originalPrice: string;
  features: string[];
  highlighted: boolean;
}

export interface PricingContent {
  title: string;
}

export interface PricingHighlight {
  mostPopular: string;
}

export interface PricingCTA {
  signUpNow: string;
}

export interface PricingSection {
  content: PricingContent;
  plans: Plan[];
  highlight: PricingHighlight;
  cta: PricingCTA;
}

export interface ProductShowcaseContent {
  title: string;
  description: string;
}

export interface ProductShowcaseVideo {
  title: string;
  description: string;
}

export interface ProductShowcase {
  content: ProductShowcaseContent;
  video: ProductShowcaseVideo;
}

export interface SupportAccordionItem {
  id: number;
  title: string;
  imageUrl: string;
}

export interface SupportFormField {
  label: string;
  placeholder: string;
}

export interface SupportForm {
  name: SupportFormField;
  email: SupportFormField;
  message: SupportFormField;
  submit: string;
}

export interface SupportContent {
  title: string;
  description: string;
  formTitle: string;
}

export interface SupportSection {
  content: SupportContent;
  accordion: SupportAccordionItem[];
  form: SupportForm;
}

export interface TestimonialsContent {
  title: string;
  description: string;
}

export interface TestimonialsSection {
  content: TestimonialsContent;
}

export interface NewsContent {
  title: string;
}

export interface NewsCTA {
  readMore: string;
}

export interface NewsSection {
  content: NewsContent;
  cta: NewsCTA;
}

export interface FooterCompany {
  logoAlt: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkSection {
  title: string;
  items: FooterLink[];
}

export interface FooterLinks {
  product: FooterLinkSection;
  company: FooterLinkSection;
  support: FooterLinkSection;
}

export interface FooterNewsletter {
  title: string;
  description: string;
  emailPlaceholder: string;
  subscribe: string;
}

export interface FooterSocial {
  facebook: string;
  youtube: string;
  linkedin: string;
}

export interface FooterBottom {
  copyright: string;
  social: FooterSocial;
}

export interface Footer {
  company: FooterCompany;
  links: FooterLinks;
  newsletter: FooterNewsletter;
  bottom: FooterBottom;
}

export interface ContentData {
  Header: Header;
  HeroSection: HeroSection;
  FeaturesSection: FeaturesSection;
  PricingSection: PricingSection;
  ProductShowcase: ProductShowcase;
  SupportSection: SupportSection;
  TestimonialsSection: TestimonialsSection;
  NewsSection: NewsSection;
  Footer: Footer;
}

export interface MultilingualData {
  vi: ContentData;
  en: ContentData;
}