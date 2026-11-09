import { defaultPortfolioContent, type ProjectItem } from "./portfolio-content";

export type CaseStudy = {
  role: string;
  context: string;
  headline: string;
  introduction: string;
  audience: string;
  problem: string;
  contribution: string[];
  workflow: string[];
  workflowStyle?: "journeys";
  implementation: { title: string; detail: string }[];
  outcome: string[];
  related: string[];
  challenges: { title: string; problem: string; detail: string }[];
  scenario: { title: string; detail: string }[];
  headings: { problem: string; contribution: string; workflow: string; challenges: string; implementation: string; outcome: string; scenario: string };
};

// Each record is authored separately. Product problems below are grounded in
// confirmed functionality; they do not assert invented incidents or benchmarks.
const cases: Record<string, CaseStudy> = {
  "tnb-pos": {
    "role": "Full Stack Developer",
    "context": "Microace Software · Taste N Bite",
    "headline": "Connecting daily billing, franchise administration and the ERP.",
    "introduction": "I built the web-based billing system and administration portal for Taste N Bite using Next.js, TypeScript and Firebase. The work extended beyond the billing interface into scheduled ERP imports, reporting performance and day-to-day operational oversight.",
    "audience": "Outlet teams handling daily bills and administrators overseeing a franchise business.",
    "problem": "The billing application had to fit into a business that already depended on an ERP and was introducing software-based franchise ordering. Delivering a usable POS was one part of the job; the order data also needed to reach the ERP, and administrators needed reports they could use during daily operations.",
    "contribution": [
      "Built the Next.js and TypeScript web billing application and its Firebase-backed functionality.",
      "Developed the administration portal alongside the POS and companion ordering app.",
      "Implemented cron-based imports of order data into the ERP software.",
      "Worked on indexing to improve the performance of operational reports."
    ],
    "workflow": [
      "Maintain business records",
      "Create product bills",
      "Review franchise activity",
      "Import order data into ERP",
      "Run operational reports"
    ],
    "implementation": [
      {
        "title": "Billing surface",
        "detail": "The web application provides the product-billing workflow used by the franchise network. The business console also exposes sales, purchases, entries and reporting areas."
      },
      {
        "title": "Administration and business visibility",
        "detail": "The administration portal gives the business a separate surface from the mobile ordering app. The dashboard brings sales, stock availability, product groups and product performance into one overview."
      },
      {
        "title": "Integration and reporting work",
        "detail": "Cron jobs support the scheduled ERP data handoff. Indexing work addresses the reporting side of the application, where data must be useful to operations as well as stored."
      }
    ],
    "outcome": [
      "The POS is used daily for product billing within the Taste N Bite network.",
      "Order data can be imported into the ERP through a scheduled workflow.",
      "The connected TNB Ordering application is used daily by 200+ franchises."
    ],
    "related": [
      "tnb-ordering",
      "hisab-restro"
    ],
    "challenges": [
      {
        "title": "A web application alongside an existing ERP",
        "problem": "Order capture in the new software also had to serve the established ERP workflow.",
        "detail": "Built scheduled imports with cron jobs to move the order data into the ERP, making integration part of the operational system rather than leaving it at the web interface."
      },
      {
        "title": "Reports that remain useful during daily work",
        "problem": "Storing business activity is not enough when administrators also need to retrieve and review it efficiently.",
        "detail": "Worked on indexing to improve report performance. The indexing work focused on the operational reporting workflow."
      },
      {
        "title": "Different jobs need different application surfaces",
        "problem": "A person creating bills and a person overseeing franchise operations need different ways into the same business system.",
        "detail": "Delivered the web POS and administration portal as distinct parts of the wider billing and ordering ecosystem."
      }
    ],
    "scenario": [
      {
        "title": "An outlet workday",
        "detail": "An outlet uses the POS for product billing while administrators review sales and inventory information in the business console."
      },
      {
        "title": "The back-office handoff",
        "detail": "Order data from the software is imported into the ERP through a cron-driven process, while reporting supports the business review workflow."
      }
    ],
    "headings": {
      "problem": "A POS that had to fit the wider business.",
      "contribution": "My work across billing and administration.",
      "workflow": "The billing and back-office loop",
      "challenges": "Integration, retrieval and operational fit.",
      "implementation": "Three parts of the web system.",
      "outcome": "Daily billing with a back-office connection.",
      "scenario": "How the system is used"
    }
  },
  "tnb-ordering": {
    "role": "Mobile Application Developer",
    "context": "Microace Software · Taste N Bite",
    "headline": "Moving franchise orders from WhatsApp into a tracked application workflow.",
    "introduction": "TNB Ordering is the mobile side of the Taste N Bite system I built at Microace Software. Its central challenge was adoption and order continuity: franchises were moving from WhatsApp ordering to software, while the receiving teams still needed to see and accept incoming orders in real time.",
    "audience": "Franchise staff placing orders, and the teams receiving, accepting and preparing them.",
    "problem": "Changing an ordering channel affects a daily business process. The move away from WhatsApp needed close monitoring so orders would not be missed during adoption. The application also had to account for orders arriving together, special-order details and a receiving team acting on incoming work.",
    "contribution": [
      "Built the companion mobile ordering application, including its special-order interface.",
      "Monitored orders daily during the transition from WhatsApp to the software.",
      "Tested simultaneous-order and transaction-handling edge cases.",
      "Built real-time order reception and acceptance workflows.",
      "Implemented WhatsApp integration and message templates alongside the application workflow."
    ],
    "workflow": [
      "Choose an order type",
      "Add products and customer details",
      "Review the cart",
      "Receive and accept the order",
      "Continue order and packing work"
    ],
    "implementation": [
      {
        "title": "Structured special orders",
        "detail": "The special-order screen separates catalogue, custom and normal options, then brings customer details and the cart action into the same flow. This gives special orders a dedicated interface rather than treating them as an ordinary product selection."
      },
      {
        "title": "Receiving-side workflow",
        "detail": "Real-time reception and acceptance connect franchise order placement with the people handling incoming work. This is a distinct responsibility from the POS billing and reporting surface."
      },
      {
        "title": "Transition and communication",
        "detail": "Daily monitoring supported the move from WhatsApp ordering. The WhatsApp integration and message templates connected messaging with the new software workflow."
      }
    ],
    "outcome": [
      "Used daily by 200+ Taste N Bite franchises for ordering.",
      "Published on Google Play as TNB Ordering.",
      "Replaced a messaging-based ordering channel with a dedicated application workflow, supported by daily transition monitoring."
    ],
    "related": [
      "tnb-pos",
      "microace-staff"
    ],
    "challenges": [
      {
        "title": "Changing the ordering habit without overlooking orders",
        "problem": "Franchises were moving an existing WhatsApp-based routine into a new application.",
        "detail": "Checked orders daily during the rollout to identify orders that could otherwise be missed while teams adopted the software."
      },
      {
        "title": "Several orders reaching the system together",
        "problem": "Concurrent order placement creates edge cases around transactions and the receiving workflow.",
        "detail": "Tested simultaneous ordering and transaction-handling edge cases as part of making the order flow work under overlapping activity."
      },
      {
        "title": "Connecting a submitted order to a person receiving it",
        "problem": "Order entry alone does not tell the receiving team what to act on, or support the communications around that work.",
        "detail": "Built real-time order reception and acceptance, together with WhatsApp integration and message templates."
      }
    ],
    "scenario": [
      {
        "title": "A regular franchise order",
        "detail": "A franchise prepares an order in the app. The receiving team can see incoming work and act on acceptance in real time."
      },
      {
        "title": "A special-order request",
        "detail": "The user selects the appropriate special-order mode, enters customer information and adds the request to the cart within a dedicated screen."
      }
    ],
    "headings": {
      "problem": "The hard part was the transition, not just the form.",
      "contribution": "My work on the order lifecycle.",
      "workflow": "From franchise request to receiving team",
      "challenges": "Rollout, concurrency and real-time acceptance.",
      "implementation": "What makes this an ordering product.",
      "outcome": "A daily ordering application across 200+ franchises.",
      "scenario": "Two ordering situations"
    }
  },
  "hisab-restro": {
    "role": "Web & Mobile Application Developer",
    "context": "Microace Software · Restaurant operations",
    "headline": "Taking a table order through the kitchen and into billing.",
    "introduction": "I built Hisab Restro as a web and mobile restaurant management application for small restaurants. The product brings table QR ordering, Kitchen Order Ticket generation and billing into a single service workflow, supported by views for tables, running orders and restaurant tools.",
    "audience": "Diners placing table orders, restaurant staff managing service and the people working on kitchen tickets and bills.",
    "problem": "A restaurant order changes context as service progresses: the diner starts at a table, the kitchen needs an actionable ticket, and staff eventually need a bill. The software needed to connect these tasks while making table availability and current order activity understandable during service.",
    "contribution": [
      "Built the web and mobile restaurant application.",
      "Implemented restaurant billing and Kitchen Order Ticket (KOT) generation.",
      "Enabled diners to place orders using a QR code at their table.",
      "Built the application surfaces shown for the restaurant overview, tables, service alerts and supporting tools."
    ],
    "workflow": [
      "Scan the table QR",
      "Place a food order",
      "Generate the kitchen ticket",
      "Manage kitchen and table work",
      "Prepare and settle the bill"
    ],
    "implementation": [
      {
        "title": "Customer entry through the table",
        "detail": "The QR ordering feature gives the diner an entry point from the table itself. It connects the customer-facing ordering experience with the restaurant application."
      },
      {
        "title": "Kitchen and billing outputs",
        "detail": "KOT generation supports preparation, while billing supports the end of the service workflow. These are different outputs of the same restaurant product."
      },
      {
        "title": "An operational view for staff",
        "detail": "The dashboard shows running order value, active orders and table occupancy. The table screen groups available tables by floor, and the tools area exposes kitchen queue, order history, settled bills and menu availability."
      }
    ],
    "outcome": [
      "Delivered web and mobile restaurant software covering QR ordering, KOT generation and billing.",
      "Provided staff with table availability and running-order views alongside the transactional workflow.",
      "Brought customer ordering and restaurant service tools into the same product."
    ],
    "related": [
      "tnb-pos",
      "microace-staff"
    ],
    "challenges": [
      {
        "title": "An order needs to move beyond the dining table",
        "problem": "A customer-facing order screen alone does not give the kitchen a preparation ticket or the staff a bill.",
        "detail": "Connected table QR ordering with KOT generation and billing as the core service flow."
      },
      {
        "title": "Staff need to understand the floor while serving",
        "problem": "Table availability and occupancy are separate operational questions from the contents of an individual order.",
        "detail": "Created a table-oriented view with floor navigation and availability, alongside the restaurant overview."
      },
      {
        "title": "Service tools need to stay reachable",
        "problem": "Kitchen work, order history, settled bills and menu availability are related tasks with different entry points.",
        "detail": "Organised them in the restaurant tools area and provided a separate alerts view for service updates."
      }
    ],
    "scenario": [
      {
        "title": "Dining at a table",
        "detail": "A diner scans the table QR and places an order. The restaurant can continue the work through kitchen-ticket generation and billing."
      },
      {
        "title": "Managing the floor",
        "detail": "Staff use table availability and the restaurant overview to understand the current service state, then open the relevant order or service tool."
      }
    ],
    "headings": {
      "problem": "One order, several service contexts.",
      "contribution": "My work from QR entry to billing.",
      "workflow": "The restaurant service journey",
      "challenges": "Connecting diners, tables, kitchen and bills.",
      "implementation": "Inside the restaurant workflow.",
      "outcome": "A service system for the restaurant.",
      "scenario": "A customer view and a staff view"
    }
  },
  "microace-staff": {
    "role": "Mobile Application Developer",
    "context": "Microace Software · Internal staff workspace",
    "headline": "Giving staff one starting point for the workday.",
    "introduction": "Microace Staff is a mobile workspace I built for staff operations. Its home focuses on the workday and attendance, while its wider workspace groups tasks, chat, sales, finance, projects and customer-support tools.",
    "audience": "Microace staff using attendance, communication, task and business-operation tools.",
    "problem": "An internal app can contain many useful tools without giving staff a clear way to start their day or find the right one. The product needed a workday-oriented home and a navigation structure that separated frequent actions from the broader business workspace.",
    "contribution": [
      "Built the Microace Staff mobile application.",
      "Created the home screen with attendance check-in and a daily overview.",
      "Organised attendance, tasks, chat and sales in the main navigation.",
      "Grouped finance, project and customer-support tools in the workspace view."
    ],
    "workflow": [
      "Start at the workday overview",
      "Open attendance or daily tasks",
      "Continue into chat or sales",
      "Choose a business workspace tool"
    ],
    "implementation": [
      {
        "title": "A workday-first home",
        "detail": "The home presents the current day, an attendance card and an overview of work needing attention. The check-in interface makes its photo and location requirements visible before the action."
      },
      {
        "title": "Frequently used navigation",
        "detail": "Attendance, tasks, chat and sales sit in the primary navigation, giving recurring work a direct route rather than placing every feature in a single list."
      },
      {
        "title": "Grouped supporting tools",
        "detail": "The workspace separates finance tools such as vouchers and the general ledger from team and support tools such as projects, tickets, shared sheets and project flows."
      }
    ],
    "outcome": [
      "Delivered a dedicated mobile workspace for staff and business operations.",
      "Made the workday overview and attendance entry point immediately accessible from home.",
      "Provided organised access to finance, project and support functions without mixing them into the home screen."
    ],
    "related": [
      "hisab-restro",
      "tnb-ordering"
    ],
    "challenges": [
      {
        "title": "A large toolset needs a clear hierarchy",
        "problem": "Attendance and tasks are frequent activities; vouchers, ledgers and project flows serve more specialised moments.",
        "detail": "Used primary navigation for recurring work and a grouped workspace for the wider toolset."
      },
      {
        "title": "Attendance requirements should be clear at the point of action",
        "problem": "The attendance screen asks for a photo and location, which users need to understand before starting check-in.",
        "detail": "Placed the check-in action and its requirements together on the attendance card."
      },
      {
        "title": "Finance and customer support are different kinds of work",
        "problem": "A voucher, a support ticket and a project flow should not look like interchangeable tasks in an unstructured menu.",
        "detail": "Grouped related tools under finance and team/customer-support sections, with a brief description for each entry."
      }
    ],
    "scenario": [
      {
        "title": "Starting the day",
        "detail": "A staff member opens the workday home, reviews the attendance card and enters the appropriate daily workflow."
      },
      {
        "title": "Handling a supporting task",
        "detail": "The staff member moves to the workspace to open a voucher, ledger, support ticket or project tool from its relevant group."
      }
    ],
    "headings": {
      "problem": "The challenge was finding the right work quickly.",
      "contribution": "My work on the internal workspace.",
      "workflow": "Different routes through a workday",
      "challenges": "Navigation, attendance context and tool organisation.",
      "implementation": "A home screen and a wider workspace.",
      "outcome": "A clearer entry point for staff operations.",
      "scenario": "Two staff journeys"
    },
    "workflowStyle": "journeys"
  },
  "rupvia": {
    "role": "Independent Product Developer",
    "context": "Personal mobile product · Offline money management",
    "headline": "Making everyday money tracking useful without a connection.",
    "introduction": "I built Rupvia as an offline money manager. Instead of stopping at a balance and transaction list, it brings income, expenses, lending, borrowing, bills, savings goals and a monthly plan into the same mobile experience.",
    "audience": "People who want to record and review their personal money activity without depending on an internet connection.",
    "problem": "A balance answers how much money is available, but not what it is committed to, who owes what, or whether spending fits the month’s plan. The app needed to support both quick recording and a broader view of money, while remaining usable offline.",
    "contribution": [
      "Built the offline money-management mobile application.",
      "Created balance, income, expense and transaction-ledger views.",
      "Added entry points for lending, borrowing, bill reminders, savings goals, subscriptions and budgets.",
      "Built monthly planning and spending-insight interfaces."
    ],
    "workflow": [
      "Review the current overview",
      "Record income or spending",
      "Organise other money movements",
      "Compare against the monthly plan",
      "Review spending insights"
    ],
    "implementation": [
      {
        "title": "A practical overview",
        "detail": "The home brings available balance, income, spent amounts, wallets, upcoming payments and the monthly plan into one place. This separates the current position from the plan for the rest of the month."
      },
      {
        "title": "A ledger that can be explored",
        "detail": "Transactions can be searched and viewed through category and date filters. The purpose is to help someone return to a record, not only enter it once."
      },
      {
        "title": "Different types of money movement",
        "detail": "The entry area distinguishes income and expense from lending, borrowing, bill reminders and planning tools. Weekly and monthly insight views provide another way to review spending."
      }
    ],
    "outcome": [
      "Built an offline mobile application for recording and reviewing personal money activity.",
      "Combined transaction tracking with monthly planning, savings goals and spending insights.",
      "Provided separate workflows for ordinary spending and other financial commitments."
    ],
    "related": [
      "buildnerd-quotes",
      "buildnerd-catalogue"
    ],
    "challenges": [
      {
        "title": "Money should be recordable without internet access",
        "problem": "If tracking depends on connectivity, a user may have to postpone entering an expense or income event.",
        "detail": "Designed Rupvia as an offline money manager so its central recording and review purpose is available without a network connection."
      },
      {
        "title": "Not every money movement is income or spending",
        "problem": "Money lent, money borrowed, bills and savings plans carry different meanings from an everyday purchase.",
        "detail": "Gave these activities separate entry points rather than presenting them all as the same transaction type."
      },
      {
        "title": "A current balance is not a monthly plan",
        "problem": "Someone may have money available now while still needing to account for planned spending and savings.",
        "detail": "Placed monthly planning and savings information alongside the overview, with separate spending-insight screens for review."
      }
    ],
    "scenario": [
      {
        "title": "Recording a day’s activity",
        "detail": "The user records income or an expense, then returns to the transaction ledger to search or review it by time period."
      },
      {
        "title": "Planning the rest of the month",
        "detail": "The user reviews the monthly plan and savings goal, alongside wallets, upcoming payments and category-based spending insights."
      }
    ],
    "headings": {
      "problem": "Tracking the present while planning the month.",
      "contribution": "My work across recording and planning.",
      "workflow": "From a money event to a monthly view",
      "challenges": "Offline access and the meaning of money movements.",
      "implementation": "The overview, ledger and planning layers.",
      "outcome": "An offline tool for a fuller picture of personal money.",
      "scenario": "Recording and reviewing serve different needs"
    }
  },
  "buildnerd-catalogue": {
    "role": "Founder & Product Developer",
    "context": "BuildNerd · Wholesale and seller tools",
    "headline": "Turning a product spreadsheet into a buyer-ready catalogue.",
    "introduction": "I built Catalogue for sellers who work from product spreadsheets but need a better way to share collections and dealer prices. The product connects spreadsheet imports, buyer-facing catalogues, branded price sheets and WhatsApp order requests.",
    "audience": "Wholesalers and growing sellers preparing collections for customers and dealers.",
    "problem": "A spreadsheet is useful for maintaining a product list, but a buyer needs a browseable collection and the right prices. Preparing separate messages and price sheets for different buyers creates repeated work. The product needed to carry the seller’s data into both a customer-facing catalogue and reusable sharing outputs.",
    "contribution": [
      "Built the Catalogue product and its public website.",
      "Implemented Excel imports, dealer-specific price lists and shareable product catalogues.",
      "Created the buyer browsing and WhatsApp order-request workflow.",
      "Provided branded PDF price-sheet outputs alongside the online catalogue."
    ],
    "workflow": [
      "Import the product collection",
      "Prepare dealer prices",
      "Publish or share the catalogue",
      "Let buyers browse and choose",
      "Receive an order request on WhatsApp"
    ],
    "implementation": [
      {
        "title": "The seller’s existing data is the starting point",
        "detail": "The product accepts spreadsheet data rather than requiring the seller to recreate a collection only for the online view. Its workflow includes SKUs, prices and minimum quantities."
      },
      {
        "title": "Pricing belongs to the buyer relationship",
        "detail": "Dealer price lists provide a way to prepare buyer-specific pricing while keeping the product collection as the common starting point."
      },
      {
        "title": "The catalogue is one sharing surface, not the only one",
        "detail": "An online collection supports browsing, filtering and search. Branded PDFs support price-sheet sharing, and WhatsApp order requests connect the buyer’s selection with a familiar communication channel."
      }
    ],
    "outcome": [
      "Published a live seller product with spreadsheet imports and dealer pricing.",
      "Provided both online catalogues and branded price-sheet outputs.",
      "Made the buyer workflow available through a public sample catalogue, without requiring a login to review it."
    ],
    "related": [
      "catalogue-studio",
      "buildnerd-quotes"
    ],
    "challenges": [
      {
        "title": "A spreadsheet is not a buyer-facing collection",
        "problem": "Product data needs a different presentation when a customer is choosing items rather than maintaining the records.",
        "detail": "Built a catalogue view with product browsing, category filters and search, using the seller’s imported collection."
      },
      {
        "title": "The same products may need different dealer prices",
        "problem": "A single public price does not cover every seller-buyer relationship.",
        "detail": "Added dealer-specific price lists as a separate part of the collection-sharing workflow."
      },
      {
        "title": "Choosing products should lead to a usable request",
        "problem": "A buyer’s selection needs a route back to the seller.",
        "detail": "Connected catalogue browsing with WhatsApp order requests, while keeping PDF price sheets available as another sharing format."
      }
    ],
    "scenario": [
      {
        "title": "Sharing a collection with a dealer",
        "detail": "A seller imports products, prepares the relevant dealer prices and shares the catalogue or a branded price sheet."
      },
      {
        "title": "A buyer exploring the collection",
        "detail": "The buyer searches or filters the collection, chooses products and continues into a WhatsApp order request. The public demo uses example products."
      }
    ],
    "headings": {
      "problem": "A spreadsheet needed a customer-facing life.",
      "contribution": "My work from import to buyer experience.",
      "workflow": "From seller data to an order request",
      "challenges": "Product presentation, dealer prices and handoff.",
      "implementation": "One collection, several ways to share.",
      "outcome": "A live product for preparing and sharing collections.",
      "scenario": "The seller and buyer sides"
    }
  },
  "buildnerd-quotes": {
    "role": "Founder & Product Developer",
    "context": "BuildNerd · Quotations, proposals and client workflow",
    "headline": "Connecting the scope of a job to its price and next steps.",
    "introduction": "I built Quotes to help service businesses prepare quotations and proposals that explain more than a total. The editor brings client details, scope, line items, pricing and terms together, with a live document preview and a path into client choices, invoices and payment records.",
    "audience": "Freelancers, agencies and service businesses preparing offers for clients.",
    "problem": "A client needs to understand what is included, what it costs and how the work will proceed. Those details can become disconnected when scope, prices and terms are prepared separately. The product needed a document-building workflow that keeps them visible together and supports the business process after the PDF is created.",
    "contribution": [
      "Built the Quotes product and its public editor.",
      "Created quotation and proposal editing with live preview and PDF export.",
      "Provided line items, discounts, tax, deposits, scope and payment-term fields.",
      "Developed client-choice, invoicing and payment-tracking workflows."
    ],
    "workflow": [
      "Identify the business and client",
      "Define scope and line items",
      "Review prices, tax and deposits",
      "Preview and export the document",
      "Continue into client choices and invoices"
    ],
    "implementation": [
      {
        "title": "Scope and pricing in one workspace",
        "detail": "The editor combines document details, business and client information, services, quantities, pricing and proposal sections. This keeps the work being offered near the amount being quoted."
      },
      {
        "title": "A preview before the handoff",
        "detail": "The live document preview makes the quotation or proposal visible while it is being prepared. PDF export produces the shareable document after that review."
      },
      {
        "title": "The document is part of a longer process",
        "detail": "Client choices, reusable services, invoices and payment records extend the workflow beyond drafting the initial offer. The public workspace can be reviewed with a software-proposal example."
      }
    ],
    "outcome": [
      "Published a live quotation and proposal product with a public editor.",
      "Connected scope writing, pricing and PDF output in one workflow.",
      "Extended the product into client choices, invoices and payment records rather than ending at document generation."
    ],
    "related": [
      "catalogue-studio",
      "buildnerd-catalogue"
    ],
    "challenges": [
      {
        "title": "A price without scope leaves the offer incomplete",
        "problem": "A total alone does not explain deliverables, timing or payment expectations.",
        "detail": "Brought scope sections, line items and terms into the same quotation or proposal editor."
      },
      {
        "title": "Several pricing components need to be reviewed together",
        "problem": "Quantities, unit prices, discounts, tax and deposits affect how the offer is understood.",
        "detail": "Provided explicit pricing controls and a live document preview so the offer can be reviewed before PDF export."
      },
      {
        "title": "The accepted offer should not become a dead-end PDF",
        "problem": "The sales process can continue into client decisions, invoicing and payment follow-up.",
        "detail": "Built supporting workflows for client choices, invoices and payment records around the document editor."
      }
    ],
    "scenario": [
      {
        "title": "Preparing a software proposal",
        "detail": "The example editor combines a website project, its deliverables, line-item price and payment terms. The displayed client and amounts are sample content."
      },
      {
        "title": "Continuing the commercial workflow",
        "detail": "The business can move from a prepared offer into client choices and invoice/payment-record tools within the product."
      }
    ],
    "headings": {
      "problem": "An offer needs scope, price and a next step.",
      "contribution": "My work on the document and client workflow.",
      "workflow": "From a brief to a client-ready offer",
      "challenges": "Clarity before export, continuity after it.",
      "implementation": "The editor, preview and sales workflow.",
      "outcome": "A quotation tool that continues beyond the PDF.",
      "scenario": "Drafting an offer and continuing the sale"
    }
  },
  "catalogue-studio": {
    "role": "Founder & Product Developer",
    "context": "BuildNerd · Product-photo and price-list preparation",
    "headline": "Preparing the files a seller needs before sharing a collection.",
    "introduction": "Catalogue Studio solves a different part of selling from Catalogue itself: preparing consistent product photos and branded PDF price lists. I built it as two focused tools, one for image preparation and one for turning product data into a document.",
    "audience": "Small brands, wholesalers and sellers preparing product images or price lists.",
    "problem": "A seller may already have photos and a spreadsheet but still lack files that are ready to send to buyers. Images can need consistent dimensions and presentation; a spreadsheet can need a branded, readable price-list format. These are related preparation tasks with different inputs and outputs.",
    "contribution": [
      "Built the product-photo and PDF price-list tools.",
      "Created batch photo preparation with canvas and export controls.",
      "Implemented CSV-based product import and branded price-list editing.",
      "Provided a live price-list preview and connected the workflow with the wider Catalogue ecosystem."
    ],
    "workflow": [
      "Choose photos or price-list work",
      "Provide images or product data",
      "Prepare the output",
      "Review the result",
      "Export the files"
    ],
    "implementation": [
      {
        "title": "A dedicated photo-preparation path",
        "detail": "The photo tool provides canvas sizing, fit or crop controls, and JPG or WebP exports. It addresses image consistency rather than presenting itself as a background-removal tool."
      },
      {
        "title": "A dedicated price-list path",
        "detail": "The price-list editor works with business details, product names, SKUs, prices and minimum quantities. A preview makes the resulting document visible before PDF export."
      },
      {
        "title": "Reuse of existing seller data",
        "detail": "CSV imports provide a path from an existing spreadsheet into a branded price list. The product sits alongside Catalogue, which serves a separate online publishing and buyer-browsing purpose."
      }
    ],
    "outcome": [
      "Published two public tools for preparing product photos and price-list PDFs.",
      "Provided spreadsheet-to-document and image-to-export workflows in one product.",
      "Kept seller file preparation distinct from online catalogue publishing."
    ],
    "related": [
      "buildnerd-catalogue",
      "buildnerd-quotes"
    ],
    "challenges": [
      {
        "title": "A collection can arrive as mismatched image files",
        "problem": "Different dimensions or presentation can make a product collection harder to prepare consistently.",
        "detail": "Provided a photo workflow with canvas sizing, fit/crop choices and export-format controls."
      },
      {
        "title": "A spreadsheet is not always ready to send as a price list",
        "problem": "Buyers may need a readable branded document with product identifiers, prices and order quantities.",
        "detail": "Built CSV import and a price-list editor that combines the product data with business details and PDF output."
      },
      {
        "title": "Preparation needs a review point before export",
        "problem": "The seller needs to inspect the document being created, not only the fields used to create it.",
        "detail": "Added a live price-list preview beside the editor. The screenshot uses an example wholesaler and sample product details."
      }
    ],
    "scenario": [
      {
        "title": "Photo preparation",
        "detail": "The seller chooses a canvas and fitting approach, prepares a batch of photos and exports the resulting images."
      },
      {
        "title": "Price-list preparation",
        "detail": "The seller imports or enters products, adds business details, reviews the PDF preview and exports a branded list."
      }
    ],
    "headings": {
      "problem": "Two preparation tasks, two different outputs.",
      "contribution": "My work on photos and price lists.",
      "workflow": "Choose the preparation path",
      "challenges": "Consistent images and sendable price lists.",
      "implementation": "Separate tools with a shared seller purpose.",
      "outcome": "Useful files before the collection is published.",
      "scenario": "The two Studio workflows"
    }
  },
  "create-qrcode": {
    "role": "Founder & Product Developer",
    "context": "BuildNerd · QR generation and managed links",
    "headline": "Connecting a printed code with a useful digital destination.",
    "introduction": "I built Create QRcode around the distinction between a downloadable static code and a managed dynamic link. The public generator covers common business payloads, while dynamic workflows support changing a destination and reviewing scans after a code has been shared or printed.",
    "audience": "Businesses creating menu, Wi-Fi, review, messaging and website QR codes.",
    "problem": "Creating a QR pattern is only one part of a business use case. The payload has to match the purpose, the output has to be usable in print or digital materials, and some destinations need to change after the code is already in circulation. These needs call for different static and managed-link workflows.",
    "contribution": [
      "Built the public QR generator and product website.",
      "Implemented static QR downloads and editable dynamic-link workflows.",
      "Created QR-type selection, input controls and a live preview.",
      "Provided PNG and SVG exports and a workspace path for dynamic codes."
    ],
    "workflow": [
      "Select the QR purpose",
      "Enter its destination or details",
      "Review the live preview",
      "Download a static file or manage a dynamic link"
    ],
    "implementation": [
      {
        "title": "Purpose-specific inputs",
        "detail": "The public generator supports website, UPI, WhatsApp, Wi-Fi and plain-text types. The selected type determines what details the person preparing the code needs to provide."
      },
      {
        "title": "Outputs for real materials",
        "detail": "PNG and SVG downloads give the code a usable form for print or sharing. The interface also asks users to scan-test the output before printing."
      },
      {
        "title": "A different lifecycle for dynamic codes",
        "detail": "Managed dynamic destinations can be changed from the workspace while the printed pattern stays in use. Scan review belongs to that managed workflow rather than to a standalone static file."
      }
    ],
    "outcome": [
      "Published a live public generator with static PNG and SVG downloads.",
      "Provided managed dynamic links for destinations that need to change after sharing.",
      "Connected multiple everyday business QR purposes through one product."
    ],
    "related": [
      "buildnerd-catalogue",
      "buildnerd-bookings"
    ],
    "challenges": [
      {
        "title": "A Wi-Fi code and a website code do not ask for the same details",
        "problem": "A single undifferentiated input form would not explain the information required for each QR purpose.",
        "detail": "Provided separate QR types with purpose-specific input controls and a live preview."
      },
      {
        "title": "Printed materials can outlast a destination URL",
        "problem": "A business may need to change where a code leads after it has already been printed.",
        "detail": "Built the dynamic-link workflow so managed destinations can be edited while the shared QR pattern remains in use."
      },
      {
        "title": "A generated pattern still needs a usable export",
        "problem": "A code may be used on a small menu, packaging or a digital image.",
        "detail": "Provided PNG and vector SVG exports, with preview and scan-testing guidance before print."
      }
    ],
    "scenario": [
      {
        "title": "A code with a fixed destination",
        "detail": "The user enters the relevant details, checks the preview and downloads a static file for use in a design or printed material."
      },
      {
        "title": "A code that needs ongoing management",
        "detail": "The user chooses the managed dynamic workflow when changing destinations and reviewing scans are part of the requirement."
      }
    ],
    "headings": {
      "problem": "The destination lifecycle matters as much as the code.",
      "contribution": "My work from payload to export.",
      "workflow": "Two ways to use a QR code",
      "challenges": "Payloads, print outputs and changing destinations.",
      "implementation": "The generator and the managed-link workspace.",
      "outcome": "A QR tool for both one-off and ongoing use.",
      "scenario": "Static and dynamic are different use cases"
    }
  },
  "buildnerd-bookings": {
    "role": "Founder & Product Developer",
    "context": "BuildNerd · Salon appointments and daily scheduling",
    "headline": "Bringing customer booking and the salon’s working day together.",
    "introduction": "I built Bookings for salons and barbershops that need to present bookable services to customers while managing staff schedules and walk-ins. The product joins the customer booking journey with the operational calendar and customer-history workflow.",
    "audience": "Customers booking appointments and salon teams organising services, staff and walk-ins.",
    "problem": "The customer thinks about a service and a suitable time. The salon has to consider the staff member, existing appointments, walk-ins and the rest of the day. A booking page needs to connect those two views rather than simply collect a customer’s preferred time.",
    "contribution": [
      "Built BuildNerd Bookings and its public product website.",
      "Created the salon appointment and staff-calendar workflow.",
      "Included walk-ins and customer history in the product.",
      "Provided a customer-facing booking link for service and time selection."
    ],
    "workflow": [
      "Choose the service",
      "Select a stylist",
      "Choose an available time",
      "Make the appointment",
      "Manage it in the salon schedule"
    ],
    "implementation": [
      {
        "title": "The customer-facing journey",
        "detail": "The booking workflow starts with the service, then connects it with a stylist and time selection. Its purpose is to offer a clear route into an appointment."
      },
      {
        "title": "The salon-facing schedule",
        "detail": "Staff calendars and appointment management provide the operational side of the same product. Walk-ins are also part of the daily scheduling workflow."
      },
      {
        "title": "Context beyond a single visit",
        "detail": "Customer history complements the calendar, giving the team a place to return to information about the customer rather than treating every appointment as an isolated entry."
      }
    ],
    "outcome": [
      "Published a live booking product for salons and barbershops.",
      "Connected online appointment entry with staff calendars and walk-in workflows.",
      "Included customer history alongside daily scheduling."
    ],
    "related": [
      "buildnerd-quotes",
      "create-qrcode"
    ],
    "challenges": [
      {
        "title": "A service needs to be connected with staff availability",
        "problem": "Selecting a time alone does not describe who will provide the service or how it fits into the salon day.",
        "detail": "Connected the booking flow with service, stylist and available-time selection, supported by staff calendars."
      },
      {
        "title": "Online bookings and walk-ins share the same working day",
        "problem": "A salon cannot plan its day well if those two kinds of demand are treated as unrelated activity.",
        "detail": "Included walk-ins alongside appointments in the salon’s scheduling workflow."
      },
      {
        "title": "A booking record is not the whole customer relationship",
        "problem": "Teams may need context from previous visits as well as the next appointment.",
        "detail": "Included customer history as a companion to the appointment and calendar tools."
      }
    ],
    "scenario": [
      {
        "title": "Booking a visit",
        "detail": "A customer follows the salon’s booking link, chooses a service, stylist and time, then makes an appointment."
      },
      {
        "title": "Running the salon day",
        "detail": "The team reviews appointments and staff calendars while also handling walk-ins and returning-customer context."
      }
    ],
    "headings": {
      "problem": "The customer’s choice has to fit the salon’s day.",
      "contribution": "My work across customer and staff workflows.",
      "workflow": "From service selection to the salon schedule",
      "challenges": "Services, staff time and walk-in demand.",
      "implementation": "The two sides of an appointment.",
      "outcome": "A connected scheduling product for salons.",
      "scenario": "A customer journey and an operational journey"
    }
  },
  "rmbc": {
    "role": "Website Developer",
    "context": "Ranirghat Mahismardini Barowari Committee · Nabadwip",
    "headline": "Giving a local festival and its community a permanent online home.",
    "introduction": "I built the RMBC website to bring the committee’s heritage, Rash Yatra celebrations, photographs and public updates into one place. It serves both someone discovering the festival for the first time and community members returning for announcements or memories.",
    "audience": "Festival visitors, local community members and people exploring Ranirghat’s heritage.",
    "problem": "A community website has to balance information that remains relevant for years with information that changes around each festival. History, photographs, announcements and membership information need their own places, without losing the sense that they belong to the same community.",
    "contribution": [
      "Built the RMBC community website.",
      "Created pages for the committee, Ranirghat’s heritage and Mahismardini.",
      "Brought festival information, a countdown, photo archives and announcements into the site.",
      "Provided public membership and community/social entry points."
    ],
    "workflow": [
      "Discover the celebration",
      "Read about the heritage",
      "Explore festival photographs",
      "Find announcements or membership information"
    ],
    "implementation": [
      {
        "title": "A heritage-led identity",
        "detail": "The site presents the committee and local heritage through dedicated pages, with English and Bengali content. This gives historical context a place beyond a temporary festival banner."
      },
      {
        "title": "Information around the festival",
        "detail": "The countdown and announcement areas support the current celebration, while news and photo stories give visitors a route into recent updates."
      },
      {
        "title": "A growing archive of memories",
        "detail": "Photographs and festival archives make past celebrations discoverable by year. The site also links visitors into the committee’s membership and public community channels."
      }
    ],
    "outcome": [
      "Delivered a live public website at rmbc.co.in.",
      "Brought heritage content, festival updates, photo archives and membership information into a connected site.",
      "The live website credits Nirupam Pal as its developer."
    ],
    "related": [
      "dotcom-coin",
      "buildnerd-catalogue"
    ],
    "challenges": [
      {
        "title": "Evergreen heritage and changing festival news need different homes",
        "problem": "A history page and a current announcement have different lifetimes and reading needs.",
        "detail": "Created dedicated heritage and committee pages alongside news, photo stories and festival information."
      },
      {
        "title": "The audience includes local readers and new visitors",
        "problem": "The website needs to communicate its place and community without relying on a single type of visitor.",
        "detail": "Used English and Bengali content and clear entry points for the committee, heritage, festival and gallery."
      },
      {
        "title": "Photographs accumulate across celebrations",
        "problem": "A single undifferentiated gallery makes it harder to return to a particular year’s memories.",
        "detail": "Organised festival archives and photographs with year-based context."
      }
    ],
    "scenario": [
      {
        "title": "Discovering Ranirghat",
        "detail": "A new visitor starts with the festival presentation, then moves into the heritage or committee pages to understand the place and celebration."
      },
      {
        "title": "Returning for an update",
        "detail": "A community member can go directly to news, a photo story, past festival memories or the membership entry point."
      }
    ],
    "headings": {
      "problem": "A festival changes each year; its history keeps growing.",
      "contribution": "My work on the community’s public website.",
      "workflow": "Different reasons to visit",
      "challenges": "Heritage, language and a growing photo archive.",
      "implementation": "A permanent site around a recurring celebration.",
      "outcome": "An online home for the committee and its memories.",
      "scenario": "First-time visitors and returning members"
    },
    "workflowStyle": "journeys"
  },
  "dotcom-coin": {
    "role": "Website Developer",
    "context": "DOTCOM Coin · Coins, notes and collectibles",
    "headline": "Making specialist collectibles easier to discover and compare.",
    "introduction": "I built the DOTCOM Coin storefront for a catalogue spanning coins, banknotes, books, accessories and other collectibles. The website’s central job is product discovery: helping a collector move from a broad category to an individual item with useful details, then into a shortlist or cart.",
    "audience": "Collectors browsing specialist categories and evaluating individual items.",
    "problem": "A collector may arrive with a specific item in mind or may want to explore an era, material or type of collectible. A storefront for these products needs more than a grid of generic names: category structure and item-level information are part of the buying experience.",
    "contribution": [
      "Built the DOTCOM Coin website.",
      "Created category browsing and product search within the storefront.",
      "Presented individual collectible listings with product imagery and available item attributes.",
      "Included wishlist and shopping-cart interfaces for the next stage of the shopping journey."
    ],
    "workflow": [
      "Explore a collection or category",
      "Search for an item",
      "Review the listing and images",
      "Shortlist in the wishlist",
      "Continue with the shopping cart"
    ],
    "implementation": [
      {
        "title": "A specialist category structure",
        "detail": "The live storefront organises coins, banknotes, collecting accessories and other items into distinct categories, giving both broad browsing and focused exploration a starting point."
      },
      {
        "title": "Details that matter to a collectible",
        "detail": "Listings show product imagery and available attributes such as year, material, condition and price. The item’s identity is part of its presentation, not only its name."
      },
      {
        "title": "From discovery to intent",
        "detail": "Search, collection navigation, product pages, wishlist and cart controls connect exploration with the next shopping action. Together, these controls support both browsing and more targeted shopping journeys."
      }
    ],
    "outcome": [
      "Delivered a live e-commerce website at dotcomcoin.in.",
      "Combined specialist browsing, search and item-level product presentation.",
      "Provided wishlist and cart entry points for collectors moving beyond discovery."
    ],
    "related": [
      "rmbc",
      "buildnerd-catalogue"
    ],
    "challenges": [
      {
        "title": "A broad catalogue needs usable entry points",
        "problem": "Coins, notes and collecting supplies do not form one simple undifferentiated product group.",
        "detail": "Built category navigation and collection entry points, with product search for more targeted discovery."
      },
      {
        "title": "Individual attributes help distinguish collectibles",
        "problem": "A year, material, condition or reverse image can be important when considering one item rather than another.",
        "detail": "Presented imagery and available item-specific details within the listing experience."
      },
      {
        "title": "Collectors may want to compare before continuing",
        "problem": "An interesting item is not always an immediate cart decision.",
        "detail": "Included wishlist and cart interfaces so the storefront supports both shortlisting and purchase intent."
      }
    ],
    "scenario": [
      {
        "title": "Exploring a collection",
        "detail": "A collector starts with a period or product category, reviews items and opens a listing for more detail."
      },
      {
        "title": "Looking for something specific",
        "detail": "The collector uses search or category navigation, reviews the available item details, then uses the wishlist or cart according to their intent."
      }
    ],
    "headings": {
      "problem": "Product discovery depends on the details.",
      "contribution": "My work on the collectibles storefront.",
      "workflow": "From a collection to a considered choice",
      "challenges": "Taxonomy, item identity and shopping intent.",
      "implementation": "A storefront shaped around collecting.",
      "outcome": "A live catalogue for specialist shopping.",
      "scenario": "Browsing and targeted discovery"
    }
  }
};

export function projectSlug(project: ProjectItem) {
  return project.slug ?? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function projectPath(project: ProjectItem) { return `/projects/${projectSlug(project)}`; }
export const allProjects = defaultPortfolioContent.works.projects;
export function findProject(slug: string) { return allProjects.find(project => projectSlug(project) === slug); }
export function getCaseStudy(project: ProjectItem): CaseStudy {
  const study = cases[projectSlug(project)];
  if (!study) throw new Error(`Missing authored case study: ${projectSlug(project)}`);
  return study;
}
export const homeProjectSlugs = ["tnb-pos", "tnb-ordering", "hisab-restro", "buildnerd-quotes", "buildnerd-catalogue", "rupvia"];
