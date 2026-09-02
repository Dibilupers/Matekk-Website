// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ChevronDown, ChevronUp } from "lucide-react";
import ccnaBadge from "../../../../assets/CCNPSecurity.png";
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.webp";
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.webp";
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";
import CourseModules from "../../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";
import TrainingHeroBanner from "../../../../components/section/TrainingHeroBanner";
import { useState } from "react";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNPCollaboration() {
  const [activeTab, setActiveTab] = useState("CLCOR");

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const CLCORModules = [
    {
      title: "1.0 Infrastructure and Design",
      items: [
        {
          subTitle:
            "1.1 Describe the Cisco on-premises, hybrid, and cloud collaboration solution design elements described in the CSR/PA",
          items: [
            "1.1.a Deployment offerings",
            "1.1.b Sizing",
            "1.1.c Bandwidth",
            "1.1.d Audio/video codecs features",
            "1.1.e High availability (excludes SRST)",
            "1.1.f Disaster recovery",
            "1.1.g Dial plan",
            "1.1.h Security (certificates, SRTP, TLS, OAuth, SSO, and default security features)",
            "1.1.i QoS",
          ],
        },
        "1.2 Describe the purpose of edge devices in the Cisco collaboration architecture such as Expressway and Cisco Unified Border Element",
        "1.3 Describe the cluster upgrade process for communications manager",
        {
          subTitle:
            "1.4 Troubleshoot security components of Cisco collaboration solutions",
          items: [
            "1.4.a SSO integration",
            "1.4.b x.509 certificates",
            "1.4.c OAuth",
            "1.4.d TCP/TLS handshake",
            "1.4.e SRTP",
          ],
        },
        {
          subTitle:
            "1.5 Troubleshoot network components in a Cisco collaboration solution",
          items: [
            "1.5.a DNS (A/AAAA, SRV, Reverse Pointer Record (PTR))",
            "1.5.b NTP",
            "1.5.c LDAP",
            "1.5.d DHCP",
            "1.5.e CDP/LLDP",
          ],
        },
      ],
    },
    {
      title: "2.0 Protocols and Endpoints",
      items: [
        {
          subTitle: "2.1 Deploy endpoints and soft clients (*on-premises and cloud, no Skinny, no Jabber)",
          items: [
            "2.1.a Manual",
            "2.1.b Self-provisioning",
            "2.1.c Bulk provisioning",
            "2.1.d Device onboarding via activation codes",
            "2.1.e Webex App (desktop and mobile)",
          ],
        },
        {
          subTitle: "2.2 Troubleshoot elements of a SIP",
          items: [
            "2.2.a Call setup and tear down",
            "2.2.b SDP (audio and video) (*including SRTP)",
            "2.2.c DTMF (RFC 2833/4733)",
            "2.2.d Hold/Resume/Transfer",
          ],
        },
        "2.3 Troubleshoot endpoint registration (*CUCM and CUBE)",
      ],
    },
    {
      title: "3.0 On-Premises Call Control",
      items: [
        "3.1 Describe the call routing process in Cisco UCM",
        "3.2 Implement toll fraud prevention in Cisco UCM",
        {
          subTitle: "3.3 Configure globalized call routing in Cisco UCM",
          items: [
            "3.3.a Route patterns (traditional and +E.164), route groups, route lists",
            "3.3.b Translation patterns, transformations, and transformation patterns",
            "3.3.c Local route group",
            "3.3.d Time-of-day routing",
            "3.3.e Partitions and Calling Search Space (CSS)",
            "3.3.f Forced authorization code (FAC)",
            "3.3.g Urgent priority",
          ],
        },
        "3.4 Troubleshoot misconfigured dial plan issues using monitoring tools",
        {
          subTitle: "3.5 Describe Cisco UCM APIs",
          items: [
            "3.5.a API type",
            "3.5.b Authentication",
            "3.5.c Capabilities",
          ],
        },
        {
          subTitle: "3.6 Configure Cisco Unity Connection",
          items: [
            "3.6.a Mailbox and MWI",
            "3.6.b SIP integration options for call control",
            "3.6.c Call handlers and routing rules",
          ],
        },
        {
          subTitle: "3.7 Configure on-premises user management",
          items: [
            "3.7.a UCM LDAP sync and authentication",
            "3.7.b RBAC",
          ],
        },
      ],
    },
    {
      title: "4.0 Voice Gateways and Session Border Controllers",
      items: [
        {
          subTitle:
            "4.1 Configure voice gateway and session border controller elements for on-premises and cloud calling",
          items: [
            "4.1.a DTMF (RFC 2833/4733)",
            "4.1.b Voice translation rules and profiles",
            "4.1.c Codec preference list",
            "4.1.d VoIP and POTS dial peers (excludes H.323)",
            "4.1.e Redundancy features (server groups, options keepalive, DNS SRV)",
          ],
        },
        "4.2 Troubleshoot IOS XE dial plans such as dial peer matching, translation rules, SIP profiles, and tenants",
        "4.3 Describe IOS XE media resources",
      ],
    },
    {
      title: "5.0 Cloud and Hybrid Services",
      items: [
        "5.1 Describe Webex Suite such as calling, meetings, and messages",
        "5.2 Describe call routing process in Webex Calling",
        "5.3 Implement toll fraud prevention on Webex Calling",
        {
          subTitle: "5.4 Configure call routing in Webex Calling",
          items: [
            "5.4.a Operating modes",
            "5.4.b Locations",
            "5.4.c Numbers",
            "5.4.d Translation patterns",
            "5.4.e Trunks and route groups",
            "5.4.f Dial plans",
            "5.4.g Call permissions",
          ],
        },
        "5.5 Configure cloud meetings",
        "5.6 Configure cloud messaging",
        {
          subTitle: "5.7 Describe cloud collaboration APIs (including webhooks)",
          items: [
            "5.7.a API type",
            "5.7.b Authentication",
            "5.7.c Capabilities",
          ],
        },
        "5.8 Configure cloud user management (Control Hub directory connector, SCIM, and RBAC)",
        "5.9 Describe Cloud Connected UC",
        "5.10 Describe Webex Hybrid Services",
      ],
    },
    {
      title: "6.0 Media and QoS",
      items: [
        "6.1 Troubleshoot media quality issues such as one-way, choppy audio, video artifact",
        "6.2 Describe the QoS considerations for signaling and media over wired and wireless networks",
        "6.3 Describe QoS trust boundaries and their significance in LAN-based classification and marking",
        "6.4 Configure LLQ (class map, policy map, service policy)",
      ],
    },
  ];

  const CLACCModules = [
    {
      title: "1.0 Signaling and Media Protocols",
      items: [
        {
          subTitle:
            "1.1 Troubleshoot advanced elements of a SIP conversation",
          items: [
            "1.1.a Ring back",
            "1.1.b PRACK",
            "1.1.c UPDATE",
          ],
        },
        "1.2 Describe media optimization features and NAT traversal protocols such as STUN, TURN, and ICE",
        {
          subTitle: "1.3 Troubleshoot mid-call signaling",
          items: [
            "1.3.a Hold/resume with new media",
            "1.3.b Call transfer (blind, consult, refer or reinvite)",
            "1.3.c Conferencing and barge",
            "1.3.d Session timers, retries, and refresh",
          ],
        },
      ],
    },
    {
      title: "2.0 Session Border Controller and Voice Gateway Technologies",
      items: [
        "2.1 Configure Cisco UCME and SIP SRST",
        {
          subTitle:
            "2.2 Troubleshoot Cisco Unified Border Element dial plan elements using VoIP Trace and debugs",
          items: [
            "2.2.a DTMF interoperability",
            "2.2.b Codec preference list",
            "2.2.c SIP and SDP header manipulation with SIP profiles",
            "2.2.d Signaling and media bindings",
            "2.2.e TLS profiles and SRTP",
          ],
        },
        {
          subTitle:
            "2.3 Troubleshoot Cisco Unified Border Element advanced dial peer features",
          items: [
            "2.3.a URI matching",
            "2.3.b Dial peer groups",
            "2.3.c E.164 pattern map",
            "2.3.d Voice VRF and multi VRF",
            "2.3.e Hunt stop",
          ],
        },
        {
          subTitle:
            "2.4 Configure advanced SIP interoperability with Cisco Unified Border Element",
          items: [
            "2.4.a Video interworking",
            "2.4.b Media flow through flow around",
            "2.4.c LTI transcoders",
            "2.4.d Filtering or blocking mid-call signaling",
            "2.4.e EO/DO interoperability",
            "2.4.f Secure SIP trunk interoperability",
          ],
        },
      ],
    },
    {
      title: "3.0 Advance Call Control",
      items: [
        {
          subTitle: "3.1 Configure advanced SIP interoperability with Cisco UCM",
          items: [
            "3.1.a EO/DO interoperability",
            "3.1.b SIP normalization and transparency",
            "3.1.c SIP profiles",
            "3.1.d SIP trunk security profile",
          ],
        },
        {
          subTitle: "3.2 Describe call recording options",
          items: [
            "3.2.a Network-based gateway recording (XMF)",
            "3.2.b SIPREC",
            "3.2.c Built in bridge",
          ],
        },
        {
          subTitle: "3.3 Troubleshoot globalized call routing elements in Cisco UCM",
          items: [
            "3.3.a Route patterns (traditional and +E.164), route groups, route lists",
            "3.3.b Translation patterns, transformations, and transformation patterns",
            "3.3.c Local route group",
            "3.3.d Time-of-day routing",
            "3.3.e Partitions and Calling Search Space (CSS)",
            "3.3.f Forced authorization code (FAC)",
            "3.3.g Urgent priority",
          ],
        },
      ],
    },
    {
      title: "4.0 Supplemental Features and Security",
      items: [
        {
          subTitle: "4.1 Describe certificate management in Cisco UCM",
          items: [
            "4.1.a Trust store usage",
            "4.1.b Secure phone registration",
            "4.1.c Phone security profile",
          ],
        },
        {
          subTitle: "4.2 Configure supplementary functions",
          items: [
            "4.2.a Call park",
            "4.2.b Call pick-up",
            "4.2.c Hunt groups",
            "4.2.d Call queuing with announcements",
            "4.2.e MoH",
            "4.2.f Barge",
            "4.2.g BLF",
          ],
        },
        {
          subTitle: "4.3 Troubleshoot Cisco UCM Mobility",
          items: [
            "4.3.a Unified Mobility (excluding dual-mode phones)",
            "4.3.b Extension Mobility",
            "4.3.c Extend & Connect",
          ],
        },
        "4.4 Configure ILS, URI synchronization, and GDPR",
      ],
    },
    {
      title: "5.0 Remote Connectivity and Business to Business Solutions",
      items: [
        "5.0 Remote Connectivity and Business to Business Solutions",
        "5.1 Configure a Mobile and Remote Access (MRA) solution",
        "5.2 Troubleshoot a Mobile and Remote Access (MRA) solution",
        "5.3 Describe Expressway media traversal",
        "5.4 Describe protocol interworking on the Expressway (IPv4 and IPv6)",
        {
          subTitle: "5.5 Configure encrypted calling in Expressway",
          items: [
            "5.5.a TLS",
            "5.5.b MTLS",
            "5.5.c Zone media encryption modes",
            "5.5.d Certificate management (including ACME protocol)",
          ],
        },
        {
          subTitle: "5.6 Configure security for Cisco Expressway",
          items: [
            "5.6.a Toll fraud prevention using local call policy rules",
            "5.6.b Automated intrusion detection",
            "5.6.c Zone media encryption modes",
            "5.6.d Firewall rules",
          ],
        },
        {
          subTitle: "5.7 Troubleshoot a Business to Business (B2B) collaboration solution",
          items: [
            "5.7.a DNS records",
            "5.7.b Certificates",
            "5.7.c Traversal zones",
            "5.7.d Neighbor zones",
            "5.7.e DNS zones",
            "5.7.f Transforms",
            "5.7.g Search rules",
            "5.7.h SIP trunk integration with Cisco UCM"
          ],
        },
      ],
    },
  ];

  const CLHCTModules = [
    {
      title: "1.0 Suite and Devices Configuration",
      items: [
        "1.1 Configure SSO",
        "1.2 Configure directory synchronization",
        "1.3 Configure hybrid calendar service using cloud mail services",
        {
          subTitle:
            "1.4 Configure local gateways",
          items: [
            "1.4.a Certificate-based",
            "1.4.b Registration-based",
          ],
        },
        "1.5 Configure site survivability",
        "1.6 Configure Control Hub calling features such as hot desking or auto attendant",
      ],
    },
    {
      title: "2.0 Cloud Management",
      items: [
        {
          subTitle:
            "2.1 Troubleshoot cloud user management",
          items: [
            "2.1.a Control Hub directory connector",
            "2.1.b SCIM",
            "2.1.c RBAC",
          ],
        },
        "2.2 Diagnose network issues such as bandwidth and QoS when using Webex Suite and collaboration endpoints",
      ],
    },
    {
      title: "3.0 Suite and Devices Management",
      items: [
        "3.1 Troubleshoot Webex Calling",
        {
          subTitle: "3.2 Troubleshoot call routing in Webex Calling",
          items: [
            "3.2.a Operating modes",
            "3.2.b Locations",
            "3.2.c Numbers",
            "3.2.d Translation patterns",
            "3.2.e Trunks and route groups",
            "3.2.f Dial plans",
            "3.2.g Call permissions"
          ],
        },
        "3.3 Troubleshoot cloud meetings",
        "3.4 Troubleshoot cloud messages",
        "3.5 Troubleshoot endpoint registration to the cloud"
      ],
    },
    {
      title: "4.0 Suite and Device administration",
      items: [
        {
          subTitle: "4.1 Describe the administration functions in Webex",
          items: [
            "4.1.a User management, such as adding users, removing users, and modifying users",
            "4.1.b Organization management, such as setting up a domain, settings, security, and integrations",
            "4.1.c Site management, such as adding multiple sites, enabling features, common site settings",
          ],
        },
        "4.2 Describe AI features in cloud collaboration solutions",
        "4.3 Describe the Control Hub migration tool options from on-premises to cloud",
      ],
    },
    {
      title: "5.0 Hybrid and Migration to the Cloud",
      items: [
        {
          subTitle: "5.1 Configure hybrid and migration from on-premises to cloud",
          items: [
            "5.1.a Cloud Connected UC",
            "5.1.b Control Hub",
          ],
        },
        "5.2 Configure advance dial plans",
      ],
    },
    {
      title: "6.0 Security",
      items: [
        "6.1 Implement security such as administration, endpoints, meetings, and compliance for Webex",
        {
          subTitle: "6.2 Describe the Webex cloud security realm architecture",
          items: [
            "6.2.a Identity service",
            "6.2.b Key management service",
            "6.2.c Indexing service",
            "6.2.d Compliance service",
            "6.2.e Content server",
          ],
        },
        "6.3 Configure hybrid data security deployment models",
      ],
    },
    {
      title: "7.0 APIs and Programmability",
      items: [
        "6.1 Implement security such as administration, endpoints, meetings, and compliance for Webex",
        "7.1 Describe App Hub, Developer Portal, and Room OS Portal",
        "7.2 Describe macros on devices",
        "7.3 Construct Webex Messaging, Meeting, Calling, People, and Events APIs",
      ],
    },
  ];

  const tabData = {
    CLCOR: {
      label: "CCNP Collaboration Core (350-801)",
      examCode: "350-801",
      duration: "120 minutes",
      description:
        "Implementing and Operating Cisco Collaboration Core Technologies v2.0 (350-801 CLCOR) is a 120-minute exam aligned with the CCNP and CCIE Collaboration Certifications. It validates a candidate's understanding of core collaboration technologies, covering infrastructure and design, protocols, endpoints, Cisco IOS XE gateway and media resources, Call Control, QoS, and collaboration applications. The corresponding course prepares candidates for this certification exam. Exam topics serve as general guidelines and are subject to change without notice.",
      about:
        "This course prepares learners for the Cisco Collaboration Core Technologies (CLCOR 350-801) exam. It delivers comprehensive training through structured instruction and practical exercises focused on real-world collaboration environments. Learners develop hands-on skills in deploying and operating Cisco's on-premises, hybrid, and cloud collaboration solutions, including call control, voice gateways, Webex services, and QoS configuration.",
      learn: [
        "Collaboration Infrastructure and Solution Design",
        "On-Premises Call Control and Dial Plan Configuration",
        "Cloud and Hybrid Collaboration Services",
        "Voice Gateways, Media Resources, and QoS",
      ],
      modules: CLCORModules,
      downloadLabel: "Download the CLCOR Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/350-801-CLCOR-v2.0-new.pdf",
    },
    CLACC: {
      label: "CLACC (300-815)",
      examCode: "300-815",
      duration: "90 minutes",
      description:
        "The Implementing Cisco Advanced Call Control On-Premises (300-815 CLACC) v2.0 is a 90-minute examination designed to assess proficiency in advanced call control and mobility services. Candidates who successfully pass the exam receive the Cisco Certified Specialist – Collaboration Call Control On-Premises certification. It also meets the concentration exam requirement for the CCNP Collaboration certification.",
      about:
        "Get ready for the Implementing Cisco Advanced Call Control On-Premises (300-815 CLACC) v2.0 exam by reviewing the official exam topics. This resource provides an overview of the key areas you need to study for the Cisco Certified Network Professional (CCNP) Collaboration concentration exam, making it a useful guide to support your exam preparation.",
      learn: [
        "Signaling and media protocols",
        "CME/SRST gateway technologies",
        "Cisco Unified Board Element",
        "Call control and dial planning",
        "Cisco UCM Call Control",
        "Mobility",
      ],
      modules: CLACCModules,
      downloadLabel: "Download the CLACC Exam Topics Here",
      downloadUrl:
        "http://learningcontent.cisco.com/documents/marketing/exam-topics/300-815-CLACC-v2.0-new.pdf",
    },
    CLHCT: {
      label: "CLHCT (300-820)",
      examCode: "300-820",
      duration: "90 minutes",
      description:
        "The Implementing Cisco Collaboration Hybrid and Cloud Technologies (300-820 CLHCT) v2.0 is a 90-minute exam designed to assess your knowledge and proficiency in collaboration cloud technologies. Successfully passing the exam earns you the Cisco Certified Specialist – Collaboration Hybrid and Cloud certification and fulfills the concentration exam requirement for the CCNP Collaboration certification.",
      about:
        "Prepare for the Implementing Cisco Collaboration Hybrid and Cloud Technologies (300-820 CLHCT) v2.0 exam by reviewing the official exam topics. This resource highlights the key areas you should understand to successfully complete the Cisco Certified Network Professional (CCNP) Collaboration concentration exam, making it a valuable reference for your overall exam preparation.",
      learn: [
        "Suite and device configuration",
        "Cloud management",
        "Suite and devices management and administration",
        "Security",
        "APIs and programmabilityl",
      ],
      modules: CLHCTModules,
      downloadLabel: "Download the CLHCT Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-820-CLHCT-v2.0.pdf",
    },
  };

  const active = tabData[activeTab];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <TrainingHeroBanner
        bgImage={ccnaHero}
        category="CISCO"
        title="CCNP Collaboration"
        description="Implementing and Operating Cisco Collaboration Core Technologies (350-801 CLCOR) v2.0 is a 120-minute exam that validates a candidate's knowledge of core collaboration technologies, including infrastructure and design, protocols, endpoints, Cisco IOS XE gateway and media resources, Call Control, QoS, and collaboration applications. This page also covers the CLICA 300-810 concentration exam."
      />

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8" id="services">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== TAB BUTTONS ==================== */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(tabData).map(([key]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeTab === key
                    ? "bg-[#1775EE] text-white border-[#1775EE]"
                    : "bg-white text-[#1775EE] border-[#1775EE] hover:bg-[#EBF5FD]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* ==================== ACTIVE TAB HEADER ==================== */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1775EE]">
              {active.examCode}
            </p>
            <h2 className="text-2xl font-bold">{active.label}</h2>
            <p className="text-black max-w-3xl">{active.description}</p>
          </div>

          {/* About Section */}
          <section className="flex flex-col gap-y-3">
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p>{active.about}</p>
          </section>

          {/* What You Will Learn */}
          <section className="flex flex-col gap-y-5">
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {active.learn.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== COURSE CONTENT ==================== */}
          <section className="flex flex-col gap-y-5">
            {/* Course Content - Title */}
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>

            {/* Course Content - List */}
            <CourseModules modules={active.modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR: Contents/Information ==================== */}
        <aside className="aside_contents">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={ccnaBadge}
              alt="CCNP Collaboration Certification Badge"
              className="w-55 h-55 lg:w-100 lg:h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] ">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Collaboration Engineer",
              "Unified Communications Engineer",
              "VoIP Engineer",
              "Collaboration Solutions Architect",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] ">Target Learners</h5>
            {/* Target Learners - List */}
            {[
              "Collaboration Engineers",
              "UC Administrators",
              "Network Engineers",
              "Systems Engineers",
            ].map((item) => (
              <p key={item} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span>{item}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] ">Schedule</h5>
            {/* Schedule - List */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p>Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p>Duration:</p>
                <p>6 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p>Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span>Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-start gap-2">
                <span>Exam Duration:</span>
                <span>{active.duration}</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inclusions - Title */}
            <h5 className="text-[#1775EE] ">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p>Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p>Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p>Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p>Certificate of Completion</p>
            </div>

            <a
              href={active.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline mt-2"
            >
              {active.downloadLabel}
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        bgPosition="90%"
        description="Advance your collaboration career and prepare for the CCNP Collaboration exam."
      />
    </main>
  );
}