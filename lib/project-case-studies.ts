import { defaultPortfolioContent, type ProjectItem } from "./portfolio-content";

export type CaseStudy = {
  role: string;
  context: string;
  problem: string;
  contribution: string[];
  workflow: string[];
  implementation: { title: string; detail: string }[];
  outcome: string[];
  related?: string[];
  challenges?: { title: string; detail: string }[];
};

const tnbChallenges = [
  { title: "Moving orders out of WhatsApp", detail: "Monitored orders daily during the transition from WhatsApp ordering to the software, checking that orders were not missed as teams adopted the new workflow." },
  { title: "Keeping the ERP supplied with data", detail: "Built scheduled imports using cron jobs to move order data into the ERP software." },
  { title: "Orders arriving at the same time", detail: "Tested edge cases around simultaneous ordering and transaction handling." },
  { title: "Keeping reports responsive", detail: "Worked on indexing to improve report performance as part of the operational reporting workflow." },
  { title: "Helping teams respond in real time", detail: "Built real-time order reception and acceptance workflows for the teams handling incoming orders." },
  { title: "Connecting WhatsApp with the product", detail: "Implemented WhatsApp integration and message templates alongside the software ordering workflow." },
];

const cases: Record<string, CaseStudy> = {
  "tnb-pos": {
    role: "Full Stack Developer",
    context: "Built at Microace Software for Taste N Bite",
    problem: "Taste N Bite needed web-based product billing and an administration portal alongside its franchise ordering application. The software supports the everyday work of a distributed franchise business.",
    contribution: ["Built the web-based POS and billing application.", "Developed the administration portal and the companion mobile ordering application.", "Delivered software used for daily billing and franchise ordering."],
    workflow: ["Products & business records", "POS billing", "Administration", "Connected franchise ordering"],
    implementation: [
      { title: "Next.js interface", detail: "Built the web application with Next.js for the billing and administration workflows." },
      { title: "TypeScript codebase", detail: "Used TypeScript in the web application to define and work with application data." },
      { title: "Firebase backend services", detail: "Used Firebase as part of the application's backend and data stack." },
    ],
    outcome: ["The POS is used daily for product billing within the Taste N Bite franchise network.", "Its companion mobile app is used daily by 200+ franchises to place orders."],
    challenges: tnbChallenges,
    related: ["tnb-ordering", "hisab-restro"],
  },
  "tnb-ordering": {
    role: "Mobile Application Developer",
    context: "Built at Microace Software for Taste N Bite",
    problem: "Franchise teams needed a mobile application to place orders as part of Taste N Bite's daily operations, connected to the broader POS and administration system.",
    contribution: ["Built the companion mobile ordering application.", "Created ordering workflows including special orders and customer details.", "Developed the connected web billing system and administration portal."],
    workflow: ["Browse products", "Prepare an order", "Enter special-order details", "Review the cart"],
    implementation: [
      { title: "Franchise ordering", detail: "The mobile application provides ordering, packing and special-order areas, visible in its navigation." },
      { title: "Special-order capture", detail: "The supplied product screen shows catalogue, custom and normal order options, customer details and an add-to-cart action." },
      { title: "Connected product family", detail: "The ordering application sits alongside the TNB POS and administration portal developed for the same business." },
    ],
    outcome: ["Used daily by 200+ Taste N Bite franchises for ordering.", "Published on Google Play as TNB Ordering."],
    challenges: tnbChallenges,
    related: ["tnb-pos", "microace-staff"],
  },
  "hisab-restro": {
    role: "Web & Mobile Application Developer",
    context: "Built at Microace Software for restaurant operations",
    problem: "Small restaurants need to manage billing, kitchen tickets, table ordering and service without treating each task as a separate process.",
    contribution: ["Built Hisab Restro as a web and mobile restaurant management application.", "Implemented billing and Kitchen Order Ticket (KOT) generation.", "Enabled customers to place orders by scanning a QR code at their table."],
    workflow: ["Scan a table QR", "Place an order", "Generate a kitchen ticket", "Prepare the bill"],
    implementation: [
      { title: "Service overview", detail: "The mobile dashboard brings running order value, active orders and table occupancy into one view." },
      { title: "Table management", detail: "The table screen presents availability and floor-based navigation." },
      { title: "Restaurant tools", detail: "The supplied screens include a kitchen queue, order history, settled bills, menu availability and notifications." },
    ],
    outcome: ["Delivered web and mobile interfaces for restaurant billing and ordering.", "Connected customer QR ordering with kitchen-ticket and billing workflows."],
    related: ["tnb-pos", "microace-staff"],
  },
  "microace-staff": {
    role: "Mobile Application Developer",
    context: "Built for Microace Software staff workflows",
    problem: "A staff application's interface needs to make everyday attendance, tasks, communication and business tools easy to find in one workspace.",
    contribution: ["Built the Microace Staff mobile application.", "Created the workday overview and attendance check-in interface.", "Brought tasks, chat, sales and supporting business tools into the app's navigation."],
    workflow: ["Open the workday overview", "Access attendance", "Review tasks & conversations", "Open business tools"],
    implementation: [
      { title: "Workday home", detail: "The home screen presents attendance check-in, a daily overview and notifications." },
      { title: "Team tools", detail: "Navigation provides access to attendance, tasks, chat and sales." },
      { title: "Business workspace", detail: "The workspace screen groups vouchers, ledgers, projects, support tickets, shared sheets and project flows." },
    ],
    outcome: ["Delivered a dedicated mobile workspace for staff and business operations.", "The gallery shows the application home and grouped workspace tools."],
    challenges: tnbChallenges,
    related: ["tnb-ordering", "hisab-restro"],
  },
  "rupvia": {
    role: "Independent Product Developer",
    context: "Personal mobile product",
    problem: "Personal money management should remain useful without an internet connection, with a clear place to record transactions and understand a monthly plan.",
    contribution: ["Built Rupvia as an offline money management mobile application.", "Created views for balances, transaction records, income and expenses.", "Added interfaces for budgets, savings goals, bill reminders, lending and borrowing."],
    workflow: ["Review the balance", "Record money in or out", "Organise transactions", "Review spending insights"],
    implementation: [
      { title: "Offline use", detail: "Rupvia is designed as an offline money manager." },
      { title: "Transaction organisation", detail: "The ledger screen provides search, category filters and date-based views." },
      { title: "Planning & insights", detail: "The supplied screens show a monthly plan, savings targets, spending categories and weekly or monthly insights." },
    ],
    outcome: ["Built a mobile product covering everyday money tracking and planning.", "The gallery demonstrates the overview, ledger, entry tools and insights screens."],
    related: ["buildnerd-quotes", "buildnerd-catalogue"],
  },
  "buildnerd-catalogue": {
    role: "Founder & Product Developer",
    context: "An independently built BuildNerd product",
    problem: "Wholesalers and sellers need to share a product collection, offer dealer-specific prices and receive order requests without repeatedly preparing separate product messages.",
    contribution: ["Built the Catalogue product and its public product website.", "Implemented Excel imports, dealer price lists and shareable catalogues.", "Created a buyer workflow for browsing products and sending WhatsApp order requests."],
    workflow: ["Import the product list", "Prepare dealer prices", "Share a catalogue", "Receive order requests"],
    implementation: [
      { title: "Seller workflow", detail: "Bring spreadsheet products into a catalogue with SKU-based records and minimum quantities." },
      { title: "Buyer experience", detail: "The public demo lets buyers browse a sample collection, filter categories and search products." },
      { title: "Reusable outputs", detail: "Dealer pricing and branded PDF price sheets support sharing beyond the online catalogue." },
    ],
    outcome: ["Published as a live BuildNerd product.", "A public buyer demo demonstrates the catalogue interface without a login."],
    related: ["catalogue-studio", "buildnerd-quotes"],
  },
  "buildnerd-quotes": {
    role: "Founder & Product Developer",
    context: "An independently built BuildNerd product",
    problem: "Service businesses need to turn a scope of work into a clear quotation or proposal, then continue into client decisions, invoicing and payment tracking.",
    contribution: ["Built the Quotes product and public website.", "Created quotation and proposal editing with PDF export.", "Developed workflows for client choices, invoices and payment tracking."],
    workflow: ["Define the scope", "Set items & prices", "Review the document", "Export & continue the client workflow"],
    implementation: [
      { title: "Document editor", detail: "The public workspace combines business details, client information, line items, scope and payment terms." },
      { title: "Live preview", detail: "A document preview sits beside the editor so the quotation or proposal can be reviewed before PDF export." },
      { title: "Business workflow", detail: "The product extends into reusable services, clients, package choices, invoices and payment records." },
    ],
    outcome: ["Published as a live BuildNerd product with a public editor.", "The gallery includes a proposal example with sample client and pricing details."],
    related: ["buildnerd-catalogue", "catalogue-studio"],
  },
  "catalogue-studio": {
    role: "Founder & Product Developer",
    context: "An independently built BuildNerd product",
    problem: "Sellers need consistent product photos and branded price lists that they can prepare from their existing product files and spreadsheets.",
    contribution: ["Built Catalogue Studio's product-photo and price-list tools.", "Created batch photo preparation and CSV-to-PDF price-list workflows.", "Connected the product workflow with the wider BuildNerd Catalogue ecosystem."],
    workflow: ["Choose photos or product data", "Prepare the collection", "Review the output", "Export photos or a price list"],
    implementation: [
      { title: "Photo preparation", detail: "The product provides canvas sizing, fitting or cropping, and JPG or WebP exports." },
      { title: "Price-list editor", detail: "Business details, SKUs, prices and minimum quantities feed a live PDF preview." },
      { title: "Spreadsheet workflow", detail: "CSV imports bring existing product data into the price-list editor." },
    ],
    outcome: ["Published as a live BuildNerd product with public tools.", "The editor screenshot uses clearly identified sample products and prices."],
    related: ["buildnerd-catalogue", "buildnerd-quotes"],
  },
  "create-qrcode": {
    role: "Founder & Product Developer",
    context: "An independently built BuildNerd product",
    problem: "Businesses need usable QR codes for menus, Wi-Fi and everyday links, with editable destinations when a printed code needs to keep working after a link changes.",
    contribution: ["Built the Create QRcode product and public generator.", "Created static QR downloads and editable dynamic-link workflows.", "Provided business-focused QR options and a live preview."],
    workflow: ["Choose the QR type", "Enter the details", "Review & scan-test", "Download or manage a dynamic link"],
    implementation: [
      { title: "Public generator", detail: "The public interface supports website, UPI, WhatsApp, Wi-Fi and text QR types." },
      { title: "Export formats", detail: "PNG and SVG downloads make the generated code usable in print and digital materials." },
      { title: "Dynamic workspace", detail: "Managed dynamic links let account users update destinations and review scans." },
    ],
    outcome: ["Published as a live QR product in the BuildNerd ecosystem.", "The gallery shows a generator preview using the public BuildNerd website address."],
    related: ["buildnerd-catalogue", "buildnerd-bookings"],
  },
  "buildnerd-bookings": {
    role: "Founder & Product Developer",
    context: "An independently built BuildNerd product",
    problem: "Salons and barbershops need to keep customer appointments, staff schedules and walk-ins together while giving customers a simple way to book online.",
    contribution: ["Built BuildNerd Bookings and its public product website.", "Created the salon appointment and staff-calendar workflow.", "Included walk-ins and customer history within the product."],
    workflow: ["Choose a service", "Select a stylist & time", "Book an appointment", "Manage the salon's day"],
    implementation: [
      { title: "Customer booking", detail: "A public booking link gives customers a place to choose services and available times." },
      { title: "Staff scheduling", detail: "The product brings appointments and staff availability into the salon workflow." },
      { title: "Daily operations", detail: "Walk-ins and customer history complement online appointments." },
    ],
    outcome: ["Published as a live BuildNerd product for salons and barbershops.", "The gallery shows its public product page; the salon artwork is an illustration on that page."],
    related: ["create-qrcode", "buildnerd-quotes"],
  },
  "rmbc": {
    role: "Website Developer",
    context: "Ranirghat Mahismardini Barowari Committee, Nabadwip",
    problem: "The committee needed a public website that brings its heritage, Rash Yatra celebrations, photographs, announcements and membership information together.",
    contribution: ["Built the RMBC community website.", "Created pages presenting local heritage and festival information.", "Brought gallery archives, news and membership entry points into the website."],
    workflow: ["Discover the festival", "Explore local heritage", "Browse photo archives", "Read news or membership information"],
    implementation: [
      { title: "Community content", detail: "The live site presents English and Bengali content about the committee and its heritage." },
      { title: "Festival information", detail: "A festival countdown and announcements make upcoming celebrations visible." },
      { title: "Photo archives", detail: "The gallery presents festival photographs and memories by year." },
    ],
    outcome: ["A live public website at rmbc.co.in.", "The website credits Nirupam Pal as its developer."],
    related: ["dotcom-coin", "buildnerd-catalogue"],
  },
  "dotcom-coin": {
    role: "Website Developer",
    context: "DOTCOM Coin collectibles storefront",
    problem: "A collectibles storefront needs to make a large range of coins, banknotes, accessories and other items discoverable, with clear individual product listings.",
    contribution: ["Built the DOTCOM Coin website.", "Created a storefront with category browsing and product search.", "Included collectible listings, wishlists and a shopping cart in the shopping experience."],
    workflow: ["Browse a collection", "Search or select a category", "Review a collectible", "Use wishlist or cart"],
    implementation: [
      { title: "Product discovery", detail: "The live storefront organises items into specialist categories for coins, notes, books and collecting accessories." },
      { title: "Collectible listings", detail: "Product cards show images, pricing and item-specific information such as year, material or condition where available." },
      { title: "Shopping interface", detail: "Search, category navigation, wishlist and cart controls support moving from discovery to product selection." },
    ],
    outcome: ["A live e-commerce website at dotcomcoin.in.", "The gallery shows the public storefront and its collections interface."],
    related: ["rmbc", "buildnerd-catalogue"],
  },
};

export function projectSlug(project: ProjectItem) {
  return project.slug ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function projectPath(project: ProjectItem) { return `/projects/${projectSlug(project)}`; }
export const allProjects = defaultPortfolioContent.works.projects;
export function findProject(slug: string) { return allProjects.find(project => projectSlug(project) === slug); }
export function getCaseStudy(project: ProjectItem): CaseStudy {
  return cases[projectSlug(project)] ?? { role: "Developer", context: project.type, problem: project.description, contribution: project.points ?? [project.description], workflow: project.tech, implementation: [], outcome: ["Explore the project and its screenshots below."] };
}
export const homeProjectSlugs = ["tnb-pos", "tnb-ordering", "hisab-restro", "buildnerd-quotes", "buildnerd-catalogue", "rupvia"];
