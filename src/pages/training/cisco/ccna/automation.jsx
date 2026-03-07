// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TrainingTemplateFooter from "../../../../components/section/TrainingTemplateFooter";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import ccnaBadge from "../../../../assets/CCNAAutomation.png"; // Course badge image
import ccnaHero from "../../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../../assets/Meal.svg";
import ReviewIcon from "../../../../assets/Review.svg";
import InstitutionalIcon from "../../../../assets/InsitutionalAccount.svg";
import WorkstationIcon from "../../../../assets/Workstation.svg";
import MedalIcon from "../../../../assets/Medal.svg";

// ==================== COMPONENT NAME - CHANGE FOR EACH COURSE ====================
export default function CCNAAutomation() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // ==================== COURSE MODULES - UPDATE CONTENT FOR EACH COURSE ====================
  const courseModules = [
    {
      title: "1.0 Network Fundamentals",
      items: [
        {
          subTitle: "1.1 Explain the role and function of network components",
          items: [
            "1.1.a Routers",
            "1.1.b Layer 2 and Layer 3 switches",
            "1.1.c Next-generation firewalls and IPS",
            "1.1.d Access points",
            "1.1.e Controllers (Cisco DNA Center and WLC)",
            "1.1.f Endpoints",
            "1.1.g Servers",
            "1.1.h PoE",
          ],
        },
        {
          subTitle:
            "1.2 Describe characteristics of network topology architectures",
          items: [
            "1.2.a Two-tier",
            "1.2.b Three-tier",
            "1.2.c Spine-leaf",
            "1.2.d WAN",
            "1.2.e Small office/home office (SOHO)",
            "1.2.f On-premises and cloud",
          ],
        },
        {
          subTitle: "1.3 Compare physical interface and cabling types",
          items: [
            "1.3.a Single-mode fiber, multimode fiber, copper",
            "1.3.b Connections (Ethernet shared media and point-to-point)",
          ],
        },
        "1.4 Identify interface and cable issues (collisions, errors, mismatch duplex, and/or speed)",
        "1.5 Compare TCP to UDP",
        "1.6 Configure and verify IPv4 addressing and subnetting",
        "1.7 Describe private IPv4 addressing",
        "1.8 Configure and verify IPv6 addressing and prefix",
        {
          subTitle: "1.9 Describe IPv6 address types",
          items: [
            "1.9.a Unicast (global, unique local, and link local)",
            "1.9.b Anycast",
            "1.9.c Multicast",
            "1.9.d Modified EUI 64",
          ],
        },
        "1.10 Verify IP parameters for Client OS (Windows, Mac OS, Linux)",
        {
          subTitle: "1.11 Describe wireless principles",
          items: [
            "1.11.a Nonoverlapping Wi-Fi channels",
            "1.11.b SSID",
            "1.11.c RF",
            "1.11.d Encryption",
          ],
        },
        "1.12 Explain virtualization fundamentals (server virtualization, containers, and VRFs)",
        {
          subTitle: "1.13 Describe switching concepts",
          items: [
            "1.13.a MAC learning and aging",
            "1.13.b Frame switching",
            "1.13.c Frame flooding",
            "1.13.d MAC address table",
          ],
        },
      ],
    },
    {
      title: "2.0 Understanding and Using APIs",
      items: [
        "2.1 Construct a REST API request to accomplish a task given API documentation",
        "2.2 Describe common usage patterns related to webhooks",
        "2.3 Describe the constraints when consuming APIs",
        "2.4 Explain common HTTP response codes associated with REST APIs",
        "2.5 Troubleshoot a problem given the HTTP response code, request and API documentation",
        "2.6 Interpret the parts of an HTTP response (response code, headers, body)",
        "2.7 Utilize common API authentication mechanisms: basic, custom token, and API keys",
        "2.8 Compare common API styles (REST, RPC, synchronous, and asynchronous)",
        "2.9 Construct a Python script that calls a REST API using the requests library",
      ],
    },
    {
      title: "3.0 Cisco Platforms and Development",
      items: [
        "3.1 Construct a Python script that uses a Cisco SDK given SDK documentation",
        "3.2 Describe the capabilities of Cisco network management platforms and APIs (Meraki, Cisco Catalyst Center, ACI, Cisco Catalyst SD-WAN, and NSO)",
        "3.3 Describe the capabilities of Cisco compute management platforms and APIs (UCS Manager and Intersight)",
        "3.4 Describe the capabilities of Cisco collaboration platforms and APIs (Webex, Webex devices, Cisco Unified Communication Manager including AXL and UDS interfaces)",
        "3.5 Describe the capabilities of Cisco security platforms and APIs (XDR, Firepower, Secure Connect, Secure Endpoint, ISE, and Secure Malware Analytics)",
        "3.6 Describe the device level APIs and dynamic interfaces for IOS XE and NX-OS",
        "3.8 Apply concepts of model driven programmability (YANG, RESTCONF, and NETCONF) in a Cisco environment",
        {
          subTitle:
            "3.9 Construct code to perform a specific operation based on a set of requirements and given API reference documentation such as these:",
          items: [
            "3.9.a Obtain a list of network devices by using Meraki, Cisco Catalyst Center, ACI, Cisco Catalyst SD-WAN, or NSO",
            "3.9.b Manage spaces, participants, and messages in Webex",
            "3.9.c Obtain a list of clients / hosts seen on a network using Meraki or Cisco Catalyst Center",
          ],
        },
      ],
    },
    {
      title: "4.0 Application Deployment and Security",
      items: [
        "4.1 Describe the benefits of edge computing",
        "4.2 Describe the attributes of different application deployment models (private cloud, public cloud, hybrid cloud, and edge)",
        {
          subTitle:
            "4.3 Describe the attributes of these application deployment types",
          items: [
            "4.3.a Virtual machines",
            "4.3.b Bare metal",
            "4.3.c Containers",
          ],
        },
        "4.4 Describe components for a CI/CD pipeline in application deployments",
        "4.5 Construct a Python unit test",
        "4.6 Interpret contents of a Dockerfile",
        "4.7 Utilize Docker images in local developer environment",
        "4.8 Describe application security issues related to secret protection, encryption (storage and transport), and data handling",
        "4.9 Explain how firewall, DNS, load balancers, and reverse proxy in application deployment",
        "4.10 Describe top OWASP threats (such as XSS, SQL injections, and CSRF)",
        "4.11 Utilize Bash commands (file management, directory navigation, and environmental variables)",
        "4.12 Describe the principles of DevOps practices",
      ],
    },
    {
      title: "5.0 Infrastructure and Automation",
      items: [
        "5.1 Describe the value of model driven programmability for infrastructure automation",
        "5.2 Compare controller-level to device-level management",
        "5.3 Describe the use and roles of network simulation and test tools (such as Cisco Modeling Labs and pyATS)",
        "5.4 Describe the components and benefits of CI/CD pipeline in infrastructure automation",
        "5.5 Describe principles of infrastructure as code",
        "5.7 Identify the workflow being automated by a Python script that uses Cisco APIs including ACI, Meraki, Cisco Catalyst Center, and RESTCONF",
        "5.8 Interpret the workflow being automated by an Ansible playbook (management packages, user management related to services, basic service configuration, and start/stop)",
        "5.9 Interpret the workflow being automated by a bash script (such as file management, app install, user management, directory navigation)",
        "5.10 Interpret the results of a RESTCONF or NETCONF query",
        "5.11 Interpret basic YANG models",
        "5.12 Interpret a unified diff",
        "5.13 Describe the principles and benefits of a code review process",
        "5.14 Interpret a sequence diagram that includes API calls",
      ],
    },
    {
      title: "6.0 Automation and Programmability",
      items: [
        "6.1 Describe the purpose and usage of MAC addresses and VLANs",
        "6.2 Describe the purpose and usage of IP addresses, routes, subnet mask / prefix, and gateways",
        "6.3 Describe the function of common networking components (such as switches, routers, firewalls, and load balancers)",
        "6.4 Interpret a basic network topology diagram with elements such as switches, routers, firewalls, load balancers, and port values",
        "6.5 Describe the function of management, data, and control planes in a network device",
        "6.6 Describe the functionality of these IP Services: DHCP, DNS, NAT, SNMP, NTP",
        "6.7 Recognize common protocol port values (such as, SSH, Telnet, HTTP, HTTPS, and NETCONF)",
        "6.8 Diagnose application connectivity issues (NAT problem, Transport Port blocked, proxy, and VPN)",
        "6.9 Explain the impacts of network constraints on applications",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <section className="relative pl-8 py-18 rounded-2xl shadow-lg flex flex-col gap-3 overflow-hidden min-h-62.5">

        {/* ==================== HERO BANNER - Image ====================*/}
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ccnaHero})`,
          }}
        />
        {/* Hero Background Image Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#cbddf5] via-[#cbddf5ce] to-transparent"></div>

        {/* ==================== HERO BANNER - Text Content ====================*/}
        <div className="relative z-10 flex flex-col gap-3 pl-1 sm:pl-8">
          {/* Course Category */}
          <h6 className="w-fit px-4 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            Cisco
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div>
            {/* Course title */}
            <h1 className="text-[#1775EE] font-bold">CCNA AUTOMATION</h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              Automating Networks Using Cisco Platforms (200-901 CCNAUTO) v1.1 is
              a 120-minute exam that assesses a candidate's knowledge of software
              development basics, API, application security, and network
              automation using Cisco platforms.
            </p>
          </div>

          {/* ====== Hero Button ====== */}
          <div className="flex flex-row sm:flex-row gap-2.5 mt-1">
            {/* Enroll Now Button - When clicked, opens a modal */}
            <Button
              title="Enroll Now"
              type="none"
              buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all transition ease-in-out duration-300 shadow-lg hover:bg-white hover:text-[#1775EE] hover:shadow-xl px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />

            {/* Learn More Button - When clicked will scroll down to proceed on the other sections of the page */}
            <Button
              title="Learn More"
              type="none"
              buttonCustomStyle="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-white hover:border-white hover:text-blue-600 transition ease-in-out transition-all duration-300 px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>
      </section>

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== ABOUT SECTION ==================== */}
          <section className="flex flex-col gap-y-3">
            {/* About Section - Title */}
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            {/* About Section - Description */}
            {/* CHANGE: Course description paragraphs */}
            <p>
              This course is designed to help learners prepare for the updated
              CCNA 200-901 certification exam through instructor-led training
              that combines guided discussions and interactive activities. It
              covers essential topics such as network automation fundamentals,
              Python programming principles, and basic DevOps concepts with
              hands-on labs and real-world scenarios to build practical skills
              and exam confidence.
            </p>
            <p>
              The program also emphasizes troubleshooting techniques and best
              practices to help participants apply their knowledge effectively
              in real-world networking environments.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Network Automation Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>API Integration Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Python Programming Basics</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>API Integration Concepts</p>
              </div>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Infrastructure as Code Principles</span>
              </p>
            </div>
          </section>

          {/* ==================== COURSE CONTENT ==================== */}
          <section className="flex flex-col gap-y-5">
            {/* Course Content - Title */}
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>

            {/* Course Content - List */}
            <div className="flex flex-col gap-3">
              {courseModules.map((module, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-gray-200"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-300 cursor-pointer ${openSection === index
                      ? "bg-[#1775EE] text-white font-semibold"
                      : "bg-[#EBF5FD] hover:bg-blue-50 font-normal"
                      }`}
                  >
                    <span className="text-left">
                      {module.title}
                    </span>
                    {openSection === index ? (
                      <ChevronUp className="w-5 h-5 shrink-0 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-300" />
                    )}
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === index && module.items.length > 0
                      ? "max-h-500 opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    <ul className="flex flex-col gap-2 px-6 py-4 bg-[#EFF6FF]">
                      {module.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-700">
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <div>
                              <p className="font-medium">{item.subTitle}</p>
                              <ul className="ml-4 mt-1 flex flex-col gap-1">
                                {item.items.map((subItem, subIndex) => (
                                  <li key={subIndex} className="text-sm">
                                    {subItem}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR: Contents/Information ==================== */}
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={ccnaBadge}
              alt="CCNA Automation Certification Badge"
              className="w-100 h-100 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Network Automation Technician",
              "Junior DevNet Associate",
              "IT Automation Specialist",
              "NOC Automation Analyst",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] font-bold">Target Learners</h5>
            {/* Target Learners - List */}
            {[
              "Beginners",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] font-bold">Schedule</h5>
            {/* Schedule - List */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p className="font-bold">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE] font-bold">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p className="text-sm">Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={InstitutionalIcon} alt="Institutional Account" className="w-4 h-4" />
              </span>
              <p className="text-sm">Institutional Accounts</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={WorkstationIcon} alt="Workstation" className="w-4 h-4" />
              </span>
              <p className="text-sm">Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a
              href="#"
              className="text-sm font-medium underline mt-2"
            >
              Download the CCNA Exam Basics here
            </a>
          </div>
        </aside>
      </div>


      {/* ==================== CALL TO ACTION BANNER - UPDATE TEXT AND IMAGE ====================*/}
      <TrainingTemplateFooter />
    </main>
  );
}