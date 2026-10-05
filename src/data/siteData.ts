export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  delay: number;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface ProductItem {
  id: number;
  index: number;
  name: string;
  image: string;
  mobileIncluded: boolean;
}

export interface ContactInfoItem {
  icon: string;
  title: string;
}

export const siteConfig = {
  companyName: 'NIMINI CO.',
  phoneDisplay: '+1 (346) 664-8018',
  phoneTel: '+13466648018',
  whatsappUrl: 'https://wa.me/13466648018',
  email: 'nimini@gmail.com',
  address: 'Oakwood Avenue, Houston, Texas',
  hours: 'Mon – Sat: 8am – 6pm CST',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#product' },
  { label: 'Contact Us', href: '#contact' },
];

export const servicesData: ServiceItem[] = [
  {
    icon: 'fa-solid fa-cart-shopping',
    title: 'Convenient Ordering',
    description:
      'Order medical supplies online with ease. Our streamlined system lets hospitals and healthcare facilities place bulk or individual requests 24/7, no paperwork, no delays.',
    linkText: 'Get Started',
    linkHref: '#contact',
    delay: 0,
  },
  {
    icon: 'fa-solid fa-file-pen',
    title: 'Customisation & Drop-Shipping',
    description:
      "We tailor supply packages to your facility's unique specifications and ship directly to your door. From branded kits to specialised bundles, we handle every detail.",
    linkText: 'Learn More',
    linkHref: '#contact',
    delay: 100,
  },
  {
    icon: 'fa-solid fa-heart',
    title: 'Superior Support',
    description:
      'Our dedicated team is always on standby. From order tracking to urgent supply requests, we deliver responsive, professional support that healthcare professionals can rely on.',
    linkText: 'Contact Us',
    linkHref: '#contact',
    delay: 200,
  },
  {
    icon: 'fa-solid fa-truck-fast',
    title: 'Emergency Supply Requests',
    description:
      'Critical shortage? We offer priority handling for urgent supply requests, ensuring your facility never faces a gap in essential medical equipment when it matters most.',
    linkText: 'Request Now',
    linkHref: 'https://wa.me/13466648018',
    delay: 300,
  },
  {
    icon: 'fa-solid fa-magnifying-glass-location',
    title: 'Order Tracking',
    description:
      "Stay informed every step of the way. Track your supply deliveries in real time, receive status updates, and plan your facility's inventory with confidence.",
    linkText: 'Track Order',
    linkHref: '#contact',
    delay: 400,
  },
  {
    icon: 'fa-solid fa-stethoscope',
    title: 'Procurement Consultation',
    description:
      'Our experts work directly with your procurement team to audit supply needs, reduce overhead costs, and build a long-term sourcing strategy that fits your budget.',
    linkText: 'Book a Session',
    linkHref: '#contact',
    delay: 500,
  },
];

export const statsData = [
  { num: '500+', label: 'Facilities Served' },
  { num: '10+', label: 'Years Experience' },
  { num: '99%', label: 'On-Time Delivery' },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'NIMINI CO. has been an exceptional partner for our clinic. Their reliability and product quality have significantly improved our supply management process.',
    name: 'Joseph Stanley',
    role: 'Physician',
    image: '/assets/test-1.jpg',
  },
  {
    id: 2,
    quote:
      'From ordering to delivery, everything is seamless. I especially appreciate how responsive the team is whenever we have urgent equipment needs.',
    name: 'Deborah Inyang',
    role: 'Anesthesiologist',
    image: '/assets/test-2.jpg',
  },
  {
    id: 3,
    quote:
      'The drop-shipping flexibility NIMINI offers has been a game changer for our rehab unit. Products arrive on time, every time, without fail.',
    name: 'Mike Johnson',
    role: 'Occupational Therapist',
    image: '/assets/test-3.jpg',
  },
  {
    id: 4,
    quote:
      'As someone overseeing procurement budgets, I appreciate the transparent pricing and consistent quality. NIMINI has become our most trusted supplier.',
    name: 'Evelyn Daniels',
    role: 'Financial Analyst',
    image: '/assets/test-6.jpg',
  },
  {
    id: 5,
    quote:
      'Our nursing team depends on NIMINI for consumables. The ordering system is simple and the delivery never lets us down — critical for patient care.',
    name: 'Riley',
    role: 'Nurse Practitioner',
    image: '/assets/test-5.jpg',
  },
  {
    id: 6,
    quote:
      'The product variety and delivery speed have made NIMINI our go-to supplier for our dialysis centre. Outstanding service, every single time.',
    name: 'Brad Tidwell',
    role: 'Medical Technician',
    image: '/assets/test-4.jpg',
  },
];

export const productsData: ProductItem[] = [
  {
    id: 1,
    index: 1,
    name: 'Diagnostic Equipment',
    image: '/assets/product (1).webp',
    mobileIncluded: true,
  },
  {
    id: 2,
    index: 2,
    name: 'Surgical Supplies',
    image: '/assets/product (2).webp',
    mobileIncluded: true,
  },
  {
    id: 3,
    index: 3,
    name: 'Patient Care Kits',
    image: '/assets/product (3).webp',
    mobileIncluded: false,
  },
  {
    id: 4,
    index: 4,
    name: 'Lab Equipment',
    image: '/assets/product (4).webp',
    mobileIncluded: false,
  },
  {
    id: 5,
    index: 5,
    name: 'Mobility Aids',
    image: '/assets/product (5).webp',
    mobileIncluded: true,
  },
  {
    id: 6,
    index: 6,
    name: 'Monitoring Devices',
    image: '/assets/product (6).webp',
    mobileIncluded: true,
  },
  {
    id: 7,
    index: 7,
    name: 'Sterilisation Tools',
    image: '/assets/product (7).webp',
    mobileIncluded: true,
  },
  {
    id: 8,
    index: 8,
    name: 'Rehab Equipment',
    image: '/assets/product (8).webp',
    mobileIncluded: false,
  },
];

export const contactInfoData: ContactInfoItem[] = [
  { icon: 'fa-solid fa-mobile', title: '+1 (346) 664-8018' },
  { icon: 'fa-solid fa-location-dot', title: 'Oakwood Avenue, Houston, Texas' },
  { icon: 'fa-solid fa-envelope', title: 'nimini@gmail.com' },
  { icon: 'fa-solid fa-clock', title: 'Mon – Sat: 8am – 6pm CST' },
];

export const specialtiesList: string[] = [
  'Medical Supplies',
  'Pharma Products',
  'Healthcare Distribution',
  'Medical Distribution Network',
  'Custom Supply Packages',
];
