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

  const CLICAModules = [
    {
      title: "1.0 Single Sign-On (SSO) for Collaboration Applications",
      items: [
        {
          subTitle:
            "1.1 Describe these types of SSO as they relate to Collaboration",
          items: [
            "1.1.a Integrated Windows AD",
            "1.1.b Kerberos",
            "1.1.c Two-factor authentication (2FA)",
            "1.1.d Third-party IdP",
          ],
        },
        "1.2 Describe the SAML SSO login process flow in the context of Cisco Collaboration solutions",
        {
          subTitle: "1.3 Describe these components of SAML 2.0 and later",
          items: [
            "1.3.a Assertion",
            "1.3.b Protocol",
            "1.3.c Binding",
            "1.3.d Profiles",
          ],
        },
        "1.4 Describe SAML SSO configuration",
        "1.5 Describe OAuth 2.0",
      ],
    },
    {
      title: "2.0 Cisco Unified IM and Presence and Cloud Messaging",
      items: [
        {
          subTitle: "2.1 Configure Cisco Unified IM and Presence on-premises",
          items: [
            "2.1.a High availability",
            "2.1.b Calendar integration",
            "2.1.c Apple Push Notification Service",
            "2.1.d Persistent chat",
            "2.1.e Federation configuration (XMPP and SIP)",
            "2.1.f Centralized Cisco Unified IM and Presence",
            "2.1.g Hybrid Message Service",
          ],
        },
        {
          subTitle:
            "2.2 Troubleshoot Cisco Unified IM and Presence on-premises",
          items: [
            "2.2.a XMPP",
            "2.2.b High availability",
            "2.2.c Calendar integration",
            "2.2.d Apple Push Notification Service",
            "2.2.e Persistent chat",
            "2.2.f Federation configuration (XMPP and SIP)",
            "2.2.g Message Archiver Service",
            "2.2.h Third-party compliance server integration",
          ],
        },
      ],
    },
    {
      title: "3.0 Cisco Unity Connection",
      items: [
        {
          subTitle: "3.1 Configure these in Cisco Unity Connection",
          items: [
            "3.1.a Call handlers",
            "3.1.b Voicemail transfers and greetings",
            "3.1.c Routing rules",
            "3.1.d Distribution lists",
            "3.1.e LDAP integration",
          ],
        },
        {
          subTitle: "3.2 Troubleshoot these in Cisco Unity Connection",
          items: [
            "3.2.a Call handlers",
            "3.2.b Voicemail transfers and greetings",
            "3.2.c Auto Attendant",
            "3.2.d Routing rules",
            "3.2.e MWI",
          ],
        },
        "3.3 Implement toll fraud prevention",
        "3.4 Troubleshoot Cisco Unity Connection integration options with Cisco UCM",
        "3.5 Describe digital networking in multicluster deployments in Cisco Unity Connection",
      ],
    },
    {
      title: "4.0 Application Clients",
      items: [
        "4.1 Configure DNS for service discovery",
        "4.2 Troubleshoot service discovery",
        "4.3 Troubleshoot Cisco Jabber and Webex App phone control",
        "4.4 Troubleshoot Cisco Jabber and Webex App voicemail integration",
        "4.5 Troubleshoot certificate validation",
        "4.6 Describe the Cisco Unified Attendant Console Advanced integration",
        {
          subTitle: "4.7 Troubleshoot Webex App functions",
          items: [
            "4.7.a Login process",
            "4.7.b Call signaling",
            "4.7.c Voice/video quality",
            "4.7.d Voicemail",
            "4.7.e Proximity",
          ],
        },
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
    CLICA: {
      label: "CLICA (300-810)",
      examCode: "300-810",
      duration: "90 minutes",
      description:
        "Implementing Cisco Collaboration Applications v1.2 (300-810 CLICA) is a 90-minute exam associated with the CCNP Collaboration Certification. It assesses a candidate's knowledge of collaboration applications, including single sign-on, Cisco Unified IM and Presence, Cisco Unity Connection, Cisco Unity Express, and application clients. The corresponding course is designed to help candidates prepare for this exam. Topics are general guidelines and may be updated at any time without notice.",
      about:
        "This course is focused on providing learners with the skills needed to configure and troubleshoot Cisco collaboration applications in enterprise environments. Training covers SSO frameworks, instant messaging and presence services, voicemail systems, and application clients. Learners gain practical experience with Cisco Unified IM and Presence, Unity Connection, and the Webex App across on-premises and hybrid deployments.",
      learn: [
        "Single Sign-On (SSO) and Identity Federation for Collaboration",
        "Cisco Unified IM, Presence, and Cloud Messaging",
        "Cisco Unity Connection Configuration and Troubleshooting",
        "Application Clients and Service Discovery",
      ],
      modules: CLICAModules,
      downloadLabel: "Download the CLICA Exam Topics Here",
      downloadUrl:
        "https://learningcontent.cisco.com/documents/marketing/exam-topics/300-810-CLICA-v1.2.pdf",
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