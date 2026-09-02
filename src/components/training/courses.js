// ─── Training Course Tree ──────────────────────────────────────────────────
// Single source of truth used by both NavBar dropdowns and InquireModal.
// To add or rename a course, edit here only — both components update automatically.

export const TRAINING_COURSES = [
  {
    name: "Cisco",
    subcourses: [
      {
        name: "CCNA",
        subcourses: [
          { name: "CCNA", path: "/training/cisco/ccna/ccna" },
          { name: "CCNA Automation", path: "/training/cisco/ccna/automation" },
          { name: "CCNA Cybersecurity", path: "/training/cisco/ccna/cybersecurity" },
        ],
      },
      {
        name: "CCNP",
        subcourses: [
          { name: "CCNP Enterprise", path: "/training/cisco/ccnp/enterprise" },
          { name: "CCNP Security", path: "/training/cisco/ccnp/security" },
          { name: "CCNP Data Center", path: "/training/cisco/ccnp/datacenter" },
          { name: "CCNP Collaboration", path: "/training/cisco/ccnp/collaboration" },
        ],
      },
    ],
  },

  {
    name: "CompTIA",
    subcourses: [
      { name: "A+ (Core 1 & 2)", path: "/training/comptia/aplus" },
      { name: "Network+", path: "/training/comptia/network" },
      { name: "Security+", path: "/training/comptia/security+" },
      { name: "CySA+", path: "/training/comptia/cysa" },
      { name: "PenTest+", path: "/training/comptia/pentest" },
      { name: "Linux+", path: "/training/comptia/linux" },
    ],
  },

  {
    name: "Fortinet",
    subcourses: [
      { name: "FortiOS", path: "/training/fortinet/fortios" },
      { name: "Secure Networking", path: "/training/fortinet/secure-networking" },
      { name: "SASE", path: "/training/fortinet/sase" },
      { name: "Cloud Security", path: "/training/fortinet/cloud-security" },
      { name: "Security Operations", path: "/training/fortinet/security-operations" },
      { name: "Cybersecurity Expert", path: "/training/fortinet/cybersecurity-expert" },
    ],
  },

  {
    name: "Palo Alto",
    subcourses: [
      {
        name: "Network Security",
        subcourses: [
          { name: "Cybersecurity Apprentice", path: "/training/paloalto/networksecurity/apprentice" },
          { name: "Cybersecurity Practitioner", path: "/training/paloalto/networksecurity/practitioner" },
          { name: "Network Security Professional", path: "/training/paloalto/networksecurity/professional" },
          { name: "Network Security Analyst", path: "/training/paloalto/networksecurity/analyst" },
          { name: "Next-Generation Firewall Engineer", path: "/training/paloalto/networksecurity/nextgenerationfirewallengineer" },
          { name: "SD-WAN Engineer", path: "/training/paloalto/networksecurity/sdwanengineer" },
          { name: "Security Service Edge Engineer", path: "/training/paloalto/networksecurity/securityserviceedgeengineer" },
          { name: "Network Security Architect", path: "/training/paloalto/networksecurity/architect" },
        ],
      },
      {
        name: "Security Operations",
        subcourses: [
          { name: "Security Operations Professional", path: "/training/paloalto/securityoperations/professional" },
          { name: "XSIAM Analyst", path: "/training/paloalto/securityoperations/xsiamanalyst" },
          { name: "XDR Analyst", path: "/training/paloalto/securityoperations/xdranalyst" },
          { name: "XSIAM Engineer", path: "/training/paloalto/securityoperations/xsiamengineer" },
          { name: "XDR Engineer", path: "/training/paloalto/securityoperations/xdrengineer" },
          { name: "XSOAR Engineer", path: "/training/paloalto/securityoperations/xsoarengineer" },
        ],
      },
      {
        name: "Cloud Security",
        subcourses: [
          { name: "Cloud Security Professional", path: "/training/paloalto/cloudsecurity/professional" },
        ],
      },
    ],
  },

  {
    name: "Data Center",
    subcourses: [
      { name: "Data Centre Foundation Certificate (DCFC)", path: "/training/datacenter/dcfc" },
      { name: "Certified Data Centre Professional (CDCP)", path: "/training/datacenter/cdcp" },
      { name: "Certified Data Centre Specialist (CDCS)", path: "/training/datacenter/cdcs" },
    ],
  },

  {
    name: "Cybersecurity",
    subcourses: [
      {
        name: "Practical Ethical Hacking",
        subcourses: [
          { name: "Cyber Defense & Threat Hunting", path: "/training/cybersecurity/peh/cdth" },
          { name: "Practical Ethical Hacking", path: "/training/cybersecurity/peh/PEH" },
          { name: "Vulnerability Assessment and Penetration Testing (VAPT)", path: "/training/cybersecurity/peh/vapt" },
        ],
      },
      { name: "Blue Team: Security Operations & Defensive Cybersecurity Program", path: "/training/cybersecurity/blueteam" },
      { name: "Red Team: CompTIA Security+ (SY0-701) Training", path: "/training/cybersecurity/redteam" },
    ],
  },

  {
    name: "Cloud Computing",
    subcourses: [
      {
        name: "Microsoft",
        subcourses: [
          { name: "Azure Fundamentals", path: "/training/cloud/microsoft/azurefundamentals" },
        ],
      },
      {
        name: "AWS",
        subcourses: [
          { name: "Cloud Practitioner", path: "/training/cloud/aws/practitioner" },
          { name: "Technical Essentials", path: "/training/cloud/aws/essentials" },
        ],
      },
    ],
  },

  {
    name: "IT Management",
    subcourses: [
      { name: "ITIL 5 Foundation", path: "/training/itil5/foundation" },
    ],
  },

  {
    name: "Project Management",
    subcourses: [
      { name: "Project Management Professional", path: "/training/projectmanagement/pmp" },
    ],
  },
];

// ─── Flatten utility ───────────────────────────────────────────────────────
// Recursively walks the tree and returns every leaf node as:
// { label: "CCNA Automation", path: "/training/cisco/ccna/automation" }
// Label is just the leaf node's own name — no breadcrumb prefix.

function flattenNode(node) {
  // Leaf node — has a path and no further subcourses
  if (node.path && (!node.subcourses || node.subcourses.length === 0)) {
    return [{ label: node.name, path: node.path }];
  }

  // Branch node — recurse into children
  if (node.subcourses && node.subcourses.length > 0) {
    const childResults = node.subcourses.flatMap((child) => flattenNode(child));

    // Branch nodes that also carry their own path (rare) get included too
    if (node.path) {
      return [{ label: node.name, path: node.path }, ...childResults];
    }

    return childResults;
  }

  return [];
}

// ─── Flat course list for the modal dropdown ───────────────────────────────
// Each entry: { label: string, path: string }
export const FLAT_COURSES = TRAINING_COURSES.flatMap((category) =>
  flattenNode(category),
);

// ─── Path → label lookup map ───────────────────────────────────────────────
// Used by EnrollNowButton to resolve current URL → pre-selected course label.
// Keys are lowercase for case-insensitive matching.
export const PATH_TO_COURSE = Object.fromEntries(
  FLAT_COURSES.map(({ label, path }) => [path.toLowerCase(), label]),
);

// Usage examples:
//
// import { TRAINING_COURSES, FLAT_COURSES, PATH_TO_COURSE } from "../data/courses";
//
// In NavBar:          training: TRAINING_COURSES
// In InquireModal:    FLAT_COURSES.map(c => c.label)  — populates the <select>
// In EnrollNowButton: PATH_TO_COURSE[location.pathname.toLowerCase()]