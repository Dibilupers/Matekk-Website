import Button from "../../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CCNAAutomation() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

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
    <div className="flex flex-col py-10 h-full mx-[2.063rem] lg:mx-[7.438rem] scroll-mt-18">
      {/* Hero Banner with Background Image */}
      <div className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col gap-2.5 overflow-hidden min-h-[250px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/ccna-automation-bg.jpg')",
          }}
        />

        {/* Gradient overlay - C2DDFF at left 70%, transparent at 67%, CDE3FF at right 70% */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(194, 221, 255, 0.7), rgba(255, 255, 255, 0) 67%, rgba(205, 227, 255, 0.7))",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 pl-8">
          <h6 className="w-fit text-sm text-[#1775EE] bg-white border border-[#EBF5FD] rounded-full py-[0.40vh] px-4 inline-flex text-center shadow-[0_0_3px_rgba(0,0,0,0.25)]">
            CISCO
          </h6>
          <h1 className="text-[#1775EE] font-bold text-3xl lg:text-4xl">
            CCNA AUTOMATION
          </h1>
          <p className="lg:w-[30vw] xl:w-[35vw] text-gray-900">
            Automating Networks Using Cisco Platforms (200-901 CCNAUTO) v1.1 is
            a 120-minute exam that assesses a candidate's knowledge of software
            development basics, API, application security, and network
            automation using Cisco platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
            <Button
              title="Enroll Now"
              type="none"
              buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
            <Button
              title="Learn More"
              type="none"
              buttonCustomStyle="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-7.5 lg:mt-10">
        {/* LEFT: Main Content */}
        <div className="flex flex-col gap-y-8 flex-1">
          {/* About */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-2xl font-bold">
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This course is designed to help learners prepare for the updated
              CCNA 200-901 certification exam through instructor-led training
              that combines guided discussions and interactive activities. It
              covers essential topics such as network automation fundamentals,
              Python programming principles, and basic DevOps concepts with
              hands-on labs and real-world scenarios to build practical skills
              and exam confidence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The program also emphasizes troubleshooting techniques and best
              practices to help participants apply their knowledge effectively
              in real-world networking environments.
            </p>
          </div>

          {/* What You Will Learn */}
          <div className="flex flex-col gap-y-5">
            <h3 className="text-2xl font-bold">
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Network Automation Fundamentals</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>API Integration Concepts</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Python Programming Basics</span>
              </p>
              <p className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <span>Infrastructure as Code Principles</span>
              </p>
            </div>
          </div>

          {/* Course Content */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-2xl font-bold">
              Course <span className="text-[#1775EE]">Content</span>
            </h3>
            <div className="flex flex-col gap-3">
              {courseModules.map((module, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-gray-200"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-[#1775EE] text-white hover:bg-blue-700 transition-colors"
                  >
                    <span className="font-semibold text-left">
                      {module.title}
                    </span>
                    {openSection === index ? (
                      <ChevronUp className="w-5 h-5 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" />
                    )}
                  </button>
                  {openSection === index && module.items.length > 0 && (
                    <div className="px-6 py-4 bg-[#F5F9FF]">
                      <ul className="flex flex-col gap-2">
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="flex flex-col gap-6 lg:w-72 xl:w-80 shrink-0">
          {/* Cert Badge */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-[#1775EE]">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-600">CISCO</p>
                  <p className="text-xs font-semibold text-gray-600">
                    CERTIFIED
                  </p>
                  <p className="text-2xl font-bold text-[#1775EE] mt-1">CCNA</p>
                  <p className="text-xs text-gray-500 mt-1">200-301</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Opportunities */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5 className="text-[#1775EE] font-bold text-lg">
              Job Opportunities
            </h5>
            {[
              "Network Automation Technician",
              "Junior DevNet Associate",
              "IT Automation Specialist",
              "NOC Automation Analyst",
            ].map((job) => (
              <p key={job} className="flex items-start gap-2.5">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* Target Learners */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5 className="text-[#1775EE] font-bold text-lg">
              Target Learners
            </h5>
            <p className="flex items-start gap-2.5">
              <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
              <span className="text-sm">Beginners</span>
            </p>
          </div>

          {/* Schedule */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5 className="text-[#1775EE] font-bold text-lg">Schedule</h5>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-3">
                <span className="font-bold">Modality:</span>
                <span>Face to Face/Online</span>
              </div>
              <div className="flex justify-start gap-3">
                <span className="font-bold">Duration:</span>
                <span>7 Days</span>
              </div>
              <div className="flex justify-start gap-3">
                <span className="font-bold">Days:</span>
                <span>Monday-Sunday</span>
              </div>
              <div className="flex justify-start gap-3">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
            <h5 className="text-[#1775EE] font-bold text-lg">Inclusions</h5>
            {[
              "Lunch & snacks (onsite)",
              "Reviewers & exercises",
              "Institutional Accounts",
              "Workstation per student",
              "Certificate of Completion",
            ].map((item, index) => (
              <p key={index} className="flex items-start gap-2.5">
                <span className="text-[#1775EE] shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-sm">{item}</span>
              </p>
            ))}
            <a
              href="#"
              className="text-[#1775EE] text-sm font-medium underline mt-2"
            >
              Download the CCNA Exam Basics here
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="relative p-8 lg:pr-12 rounded-2xl shadow-lg flex flex-col items-center gap-2.5 overflow-hidden mt-10 min-h-[300px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/cta-background.jpg')" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(194, 221, 255, 0.7), rgba(255, 255, 255, 0) 67%, rgba(205, 227, 255, 0.7))",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2.5 mt-7.5 lg:mt-[5vh]">
          <h1 className="text-3xl lg:text-4xl font-bold text-center">
            Start Learning <span className="text-[#1775EE]">Today</span>
          </h1>
          <p className="lg:w-[30vw] xl:w-[35vw] text-center text-gray-900">
            Build essential networking knowledge and prepare for the CCNA
            200-901 v1.1 exam through instructor-led, hands-on training.
          </p>
          <Button
            title="Enroll Now"
            type="none"
            buttonCustomStyle="bg-[#1775EE] text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-4 mt-4"
            btnFunc={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
