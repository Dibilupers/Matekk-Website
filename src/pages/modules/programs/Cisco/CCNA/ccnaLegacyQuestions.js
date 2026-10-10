// Legacy CCNA 200-301 questions extracted from the supplied PDF.
export const CCNA_LEGACY_QUESTIONS = [
  {
    "legacyIndex": 1,
    "legacyNumber": 1,
    "prompt": "Which two statements about the purpose of the OSI model are accurate? (Choose two)",
    "options": [
      "Defines the network functions that occur at each layer",
      "Facilitates an understanding of how information travels throughout a network",
      "Changes in one layer do not impact other layer",
      "Ensures reliable data delivery through its layered approach"
    ],
    "answer": [
      0,
      1
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 2,
    "legacyNumber": 2,
    "prompt": "What is the default behavior of a Layer 2 switch when a frame with an unknown destination MAC address is\nreceived?",
    "options": [
      "The Layer 2 switch drops the received frame",
      "The Layer 2 switch floods packets to all ports except the receiving port in the given VLAN",
      "The Layer 2 switch sends a copy of a packet to CPU for destination MAC address learning",
      "The Layer 2 switch forwards the packet and adds the destination MAC address to Its MAC address table"
    ],
    "answer": 1,
    "explanation": "If the destination MAC address is not in the CAM table (unknown destination MAC address), the switch sends\nthe frame out all other ports that are in the same VLAN as the received frame. This is called flooding. It does\nnot flood the frame out the same port on which the frame was received."
  },
  {
    "legacyIndex": 3,
    "legacyNumber": 3,
    "prompt": "What is the destination MAC address of a broadcast frame?",
    "options": [
      "00:00:0c:07:ac:01",
      "ff:ff:ff:ff:ff:ff",
      "43:2e:08:00:00:0c",
      "00:00:0c:43:2e:08",
      "00:00:0crfHfrff"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 4,
    "legacyNumber": 4,
    "prompt": "Which action is taken by a switch port enabled for PoE power classification override?",
    "options": [
      "When a powered device begins drawing power from a PoE switch port a syslog message is generated",
      "As power usage on a PoE switch port is checked data flow to the connected device is temporarily paused",
      "If a switch determines that a device is using less than the minimum configured power it assumes the device has failed and disconnects",
      "If a monitored port exceeds the maximum administrative value for power, the port is shutdown and err- disabled"
    ],
    "answer": 3,
    "explanation": "PoE monitoring and policing compares the power consumption on ports with the administrative maximum\nvalue (either a configured maximum value or the port's default value). If the power consumption on a\nmonitored port exceeds the administrative maximum value, the following actions occur:\n\n+ A syslog message is issued.\n+ The monitored port is shut down and error-disabled.\n+ The allocated power is freed."
  },
  {
    "legacyIndex": 5,
    "legacyNumber": 5,
    "prompt": "In which way does a spine and-leaf architecture allow for scalability in a network when additional access\nports are required?",
    "options": [
      "A spine switch and a leaf switch can be added with redundant connections between them",
      "A spine switch can be added with at least 40 GB uplinks",
      "A leaf switch can be added with a single connection to a core spine switch",
      "A leaf switch can be added with connections to every spine switch"
    ],
    "answer": 3,
    "explanation": "Spine-leaf architecture is typically deployed as two layers: spines (such as an aggregation layer), and leaves\n(such as an access layer). Spine-leaf topologies provide high-bandwidth, low-latency, nonblocking server-to-\nserver connectivity.\n\nLeaf (access) switches are what provide devices access to the fabric (the network of spine and leaf switches)\nand are typically deployed at the top of the rack. Generally, devices connect to the leaf switches. Devices can\ninclude servers, Layer 4-7 services (firewalls and load balancers), and WAN or Internet routers. Leaf switches\ndo not connect to other leaf switches. In spine-and-leaf architecture, every leaf should connect to every\nspine in a full mesh.\n\nSpine (aggregation) switches are used to connect to all leaf switches and are typically deployed at the end or\nmiddle of the row. Spine switches do not connect to other spine switches."
  },
  {
    "legacyIndex": 6,
    "legacyNumber": 6,
    "prompt": "A frame that enters a switch fails the Frame Check Sequence. Which two interface counters are incremented?\n(Choose two)",
    "options": [
      "runts",
      "giants",
      "frame",
      "CRC",
      "input errors"
    ],
    "answer": [
      3,
      4
    ],
    "type": "multi",
    "explanation": "Whenever the physical transmission has problems, the receiving device might receive a frame whose bits\nhave changed values. These frames do not pass the error detection logic as implemented in the FCS field in\nthe Ethernet trailer. The receiving device discards the frame and counts it as some kind of input error. Cisco\nswitches list this error as a CRC error. Cyclic redundancy check (CRC) is a term related to how the FCS math\ndetects an error.\n\nThe \"input errors\" includes runts, giants, no buffer, CRC, frame, overrun, and ignored counts.\n\nThe output below show the interface counters with the \"show interface s0/0/0\" command:\n\n  Router#show interface s0/0/0\n  Serial0/0/0 is up, line protocol is up\n\n      Hardware is M4T\n      Description: Link to R2\n      Internet address is 10.1.1.1/30\n      MTU 1500 bytes, BW 1544 Kbit, DLY 20000 usec,\n\nreliability 255/255, txload 1/255, rxload 1/255\n\n--output omitted--\n\n5 minute output rate 0 bits/sec, 0 packets/sec\n\n268 packets input, 24889 bytes, 0 no buffer\n\nReceived 0 broadcasts, 0 runts, 0 giants, 0 throttles\n\n0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort\n\n251 packets output, 23498 bytes, 0 underruns\n\n0 output errors, 0 collisions, 0 interface resets\n\n0 output buffer failures, 0 output buffers swapped out\n\n0 carrier transitions  DCD=up DSR=up DTR=up RTS=up CTS=up"
  },
  {
    "legacyIndex": 7,
    "legacyNumber": 7,
    "prompt": "What are two reasons that cause late collisions to increment on an Ethernet interface? (Choose two)",
    "options": [
      "when the sending device waits 15 seconds before sending the frame again",
      "when the cable length limits are exceeded",
      "when one side of the connection is configured for half-duplex",
      "when Carrier Sense Multiple Access/Collision Detection is used",
      "when a collision occurs after the 32nd byte of a frame has been transmitted"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": "A late collision is defined as any collision that occurs after the first 512 bits (or 64th byte) of the frame have\nbeen transmitted. The usual possible causes are full-duplex/half-duplex mismatch, exceeded Ethernet cable\nlength limits, or defective hardware such as incorrect cabling, non-compliant number of hubs in the network,\nor a bad NIC.\n\nLate collisions should never occur in a properly designed Ethernet network. They usually occur when Ethernet\ncables are too long or when there are too many repeaters in the network."
  },
  {
    "legacyIndex": 8,
    "legacyNumber": 8,
    "prompt": "What is the function of a server?",
    "options": [
      "It transmits packets between hosts in the same broadcast domain",
      "It provides shared applications to end users",
      "It routes traffic between Layer 3 devices",
      "It creates security zones between trusted and untrusted networks"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 9,
    "legacyNumber": 9,
    "prompt": "What is a function of TFTP in network operations?",
    "options": [
      "transfers a configuration files from a server to a router on a congested link",
      "transfers IOS images from a server to a router for firmware upgrades",
      "transfers a backup configuration file from a server to a switch using a username and password",
      "transfers files between file systems on a router"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 10,
    "legacyNumber": 10,
    "prompt": "What are two functions of a server on a network? (Choose two)",
    "options": [
      "runs applications that send and retrieve data for workstations that make requests",
      "achieves redundancy by exclusively using virtual server clustering",
      "housed solely in a data center that is dedicated to a single client",
      "runs the same operating system in order to communicate with other servers",
      "handles requests from multiple workstations at the same time"
    ],
    "answer": [
      0,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 11,
    "legacyNumber": 11,
    "prompt": "What is the primary function of a Layer 3 device?",
    "options": [
      "to analyze traffic and drop unauthorized traffic from the Internet",
      "to transmit wireless traffic between hosts",
      "forward traffic within the same broadcast domain",
      "to pass traffic between different networks"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 12,
    "legacyNumber": 12,
    "prompt": "What is the same for both copper and fiber interfaces when using SFP modules?",
    "options": [
      "They support an inline optical attenuator to enhance signal strength",
      "They accommodate single-mode and multi-mode in a single module",
      "They offer reliable bandwidth up to 100 Mbps in half duplex mode",
      "They provide minimal interruption to services by being hot-swappable"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 13,
    "legacyNumber": 1,
    "prompt": "What is a characteristic of spine-and-leaf architecture?",
    "options": [
      "Each device is separated by the same number of hops",
      "It provides variable latency",
      "It provides greater predictability on STP blocked ports",
      "Each link between leaf switches allows for higher bandwidth"
    ],
    "answer": 0,
    "explanation": "Spine-leaf architecture is typically deployed as two layers: spines (such as an aggregation layer), and leaves\n(such as an access layer). Spine-leaf topologies provide high-bandwidth, low-latency (-> Answer B is not\ncorrect), nonblocking server-to-server connectivity.\n\nWith a spine-and-leaf architecture, no matter which leaf switch to which a server is connected, its traffic\nalways has to cross the same number of devices to get to another server (unless the other server is located\non the same leaf) (-> Answer A is correct) . This approach keeps latency at a predictable level because a\npayload only has to hop to a spine switch and another leaf switch to reach its destination."
  },
  {
    "legacyIndex": 14,
    "legacyNumber": 2,
    "prompt": "What are two descriptions of three-tier network topologies? (Choose two)",
    "options": [
      "The core and distribution layers perform the same functions",
      "The access layer manages routing between devices in different domains",
      "The network core is designed to maintain continuous connectivity when devices fail",
      "The core layer maintains wired connections for each host",
      "The distribution layer runs Layer 2 and Layer 3 technologies"
    ],
    "answer": [
      2,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 15,
    "legacyNumber": 3,
    "prompt": "What benefit does controller-based networking provide versus traditional networking?",
    "options": [
      "moves from a two-tier to a three-tier network architecture to provide maximum redundancy",
      "provides an added layer of security to protect from DDoS attacks",
      "allows configuration and monitoring of the network from one centralized port",
      "combines control and data plane functionality on a single device to minimize latency"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 16,
    "legacyNumber": 4,
    "prompt": "Which purpose does a northbound API serve in a controller-based networking architecture?",
    "options": [
      "communicates between the controller and the physical network hardware",
      "reports device errors to a controller",
      "generates statistics for network hardware and traffic",
      "facilitates communication between the controller and the applications"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 17,
    "legacyNumber": 5,
    "prompt": "What is the name of the layer in the Cisco borderless switched network design that is considered to be the\nbackbone used for high-speed connectivity and fault isolation?",
    "options": [
      "data link",
      "access",
      "core",
      "network",
      "network access"
    ],
    "answer": 2,
    "explanation": "The key layers are access, distribution, and core. The core layer is the network backbone that hierarchically\nconnects several layers of the network design, providing for connectivity between end devices, computing\nand data storage services located within the data center and other areas, and services within the network."
  },
  {
    "legacyIndex": 18,
    "legacyNumber": 6,
    "prompt": "A company needs to interconnect several branch offices across a metropolitan area. The network engineer is\nseeking a solution that provides high-speed converged traffic, including voice, video, and data on the same\nnetwork infrastructure. The company also wants easy integration to their existing LAN infrastructure in their\noffice locations. Which technology should be recommended?",
    "options": [
      "VSAT",
      "ISDN",
      "Frame Relay",
      "Ethernet WAN"
    ],
    "answer": 3,
    "explanation": "Ethernet WAN offer the ability of using Ethernet over long-distance links."
  },
  {
    "legacyIndex": 19,
    "legacyNumber": 7,
    "prompt": "Which two WAN architecture options help a business improve scalability and reliability for the network?\n(Choose two)",
    "options": [
      "dynamic routing",
      "static routing",
      "dual-homed branches",
      "single-homed branches",
      "asychronous routing"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": "Dual-homed branches (branches connects to two ISPs or one ISP with two connections) increases reliability\nfor the network.\nDynamic routing automatically use backup routes in the case of main routes fail which increases reliability.\nThe configuration is remain unchanged or change a little when we expand the network thus increasing the\nscalability.\nNote: A scalable network can expand quickly to support new users and applications without impacting the\nperformance of the service being delivered to existing users"
  },
  {
    "legacyIndex": 20,
    "legacyNumber": 8,
    "prompt": "Which WAN access technology is preferred for a small office / home office architecture?",
    "options": [
      "broadband cable access",
      "frame-relay packet switching",
      "dedicated point-to-point leased line",
      "Integrated Services Digital Network switching"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 21,
    "legacyNumber": 9,
    "prompt": "Which two functions are performed by the core layer in a three-tier architecture? (Choose two)",
    "options": [
      "Provide direct connectivity for end user devices",
      "Police traffic that is sent to the edge of the network",
      "Provide uninterrupted forwarding service",
      "Inspect packets for malicious activity",
      "Ensure timely data transfer between layers"
    ],
    "answer": [
      2,
      4
    ],
    "type": "multi",
    "explanation": "Considerations at the core layer include\n+ Providing high-speed switching (i.e., fast transport)\n+ Providing reliability and fault tolerance\n+ Scaling by using faster, and not more, equipment\n\n+ Avoiding CPU-intensive packet manipulation caused by security, inspection, quality of service (QoS)\nclassification, or other processes"
  },
  {
    "legacyIndex": 22,
    "legacyNumber": 10,
    "prompt": "Which function is performed by the collapsed core layer in a two-tier architecture?",
    "options": [
      "applying security policies",
      "marking interesting traffic for data polices",
      "enforcing routing policies",
      "attaching users to the edge of the network"
    ],
    "answer": 2,
    "explanation": "The three-tier hierarchical design maximizes performance, network availability, and the ability to scale the\nnetwork design.\nHowever, many small enterprise networks do not grow significantly larger over time. Therefore, a two-tier\nhierarchical design where the core and distribution layers are collapsed into one layer is often more practical.\nA \"collapsed core\" is when the distribution layer and core layer functions are implemented by a single device.\nThe primary motivation for the collapsed core design is reducing network cost, while maintaining most of the\nbenefits of the three-tier hierarchical model."
  },
  {
    "legacyIndex": 23,
    "legacyNumber": 1,
    "prompt": "Which statement identifies the functionality of virtual machines?",
    "options": [
      "Virtualized servers run most efficiently when they are physically connected to a switch that is separate from the hypervisor",
      "The hypervisor can virtualize physical components including CPU, memory, and storage",
      "Each hypervisor can support a single virtual machine and a single software switch",
      "The hypervisor communicates on Layer 3 without the need for additional resources"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 24,
    "legacyNumber": 2,
    "prompt": "An organization has decided to start using cloud-provided services. Which cloud service allows the\norganization to install its own operating system on a virtual machine?",
    "options": [
      "platform-as-a-service",
      "software-as-a-service",
      "network-as-a-service",
      "infrastructure-as-a-service"
    ],
    "answer": 3,
    "explanation": "Below are the 3 cloud supporting services cloud providers provide to customer:\n\n+ SaaS (Software as a Service): SaaS uses the web to deliver applications that are managed by a third-party\nvendor and whose interface is accessed on the clients' side. Most SaaS applications can be run directly from\na web browser without any downloads or installations required, although some require plugins.\n+ PaaS (Platform as a Service): are used for applications, and other development, while providing cloud\ncomponents to software. What developers gain with PaaS is a framework they can build upon to develop or\ncustomize applications. PaaS makes the development, testing, and deployment of applications quick, simple,\nand cost-effective. With this technology, enterprise operations, or a third-party provider, can manage OSes,\nvirtualization, servers, storage, networking, and the PaaS software itself. Developers, however, manage the\napplications.\n+ IaaS (Infrastructure as a Service): self-service models for accessing, monitoring, and managing remote\ndatacenter infrastructures, such as compute (virtualized or bare metal), storage, networking, and networking\nservices (e.g. firewalls). Instead of having to purchase hardware outright, users can purchase IaaS based on\nconsumption, similar to electricity or other utility billing.\n\n                                                                                   In general, IaaS\n\nprovides hardware so that an organization can install their own operating system."
  },
  {
    "legacyIndex": 25,
    "legacyNumber": 3,
    "prompt": "Anycompany has decided to reduce its environmental footprint by reducing energy costs, moving to a smaller\nfacility, and promoting telecommuting. What service or technology would support this requirement?",
    "options": [
      "Cisco ACI",
      "cloud services",
      "APIC-EM",
      "data center"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 26,
    "legacyNumber": 4,
    "prompt": "What are two fundamentals of virtualization? (Choose two)",
    "options": [
      "The environment must be configured with one hypervisor that serves solely as a network manager to monitor SNMP traffic",
      "It allows logical network devices to move traffic between virtual machines and the rest of the physical network",
      "It allows multiple operating systems and applications to run independently on one physical server",
      "It allows a physical router to directly connect NICs from each virtual machine into the network",
      "It requires that some servers, virtual machines and network gear reside on the Internet"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 27,
    "legacyNumber": 5,
    "prompt": "What role does a hypervisor provide for each virtual machine in server virtualization?",
    "options": [
      "control and distribution of physical resources",
      "software-as-a-service",
      "services as a hardware controller",
      "infrastructure-as-a-service"
    ],
    "answer": 0,
    "explanation": "Each virtual machine has its own set of virtual hardware (RAM, CPU, NIC) upon which an operating system\nand fully configured applications are loaded. The operating system sees a consistent, normalized set of\nhardware regardless of the actual physical hardware components."
  },
  {
    "legacyIndex": 29,
    "legacyNumber": 1,
    "prompt": "How can the Cisco Discovery Protocol be used?",
    "options": [
      "to allow a switch to discover the devices that are connected to its ports",
      "to determine the hardware platform of the device",
      "to determine the IP addresses of connected Cisco devices",
      "all of the above"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 30,
    "legacyNumber": 2,
    "prompt": "In a CDP environment, what happens when the CDP interface on an adjacent device is configured without an\nIP address?",
    "options": [
      "CDP operates normally, but it cannot provide any information for that neighbor.",
      "CDP operates normally, but it cannot provide IP address information for that neighbor.",
      "CDP uses the IP address of another interface for that neighbor.",
      "CDP becomes inoperable on that neighbor."
    ],
    "answer": 2,
    "explanation": "If a neighbor has no IP address on an interface enabled with Cisco Discovery Protocol, the IP address of\nanother interface will be updated as IP address for the non-IP address interface."
  },
  {
    "legacyIndex": 31,
    "legacyNumber": 3,
    "prompt": "Which command should you enter to configure an LLDP delay time of 5 seconds?",
    "options": [
      "lldp reinit 5",
      "lldp reinit 5000",
      "lldp holdtime 5",
      "lldp timer 5000"
    ],
    "answer": 0,
    "explanation": "+ lldp holdtime seconds: Specify the amount of time a receiving device should hold the information from\nyour device before discarding it\n+ lldp reinit delay: Specify the delay time in seconds for LLDP to initialize on an interface\n+ lldp timer rate: Set the sending frequency of LLDP updates in seconds"
  },
  {
    "legacyIndex": 32,
    "legacyNumber": 4,
    "prompt": "Which command is used to enable LLDP globally on a Cisco IOS ISR?",
    "options": [
      "lldp run",
      "lldp enable",
      "lldp transmit",
      "cdp run",
      "cdp enable"
    ],
    "answer": 0,
    "explanation": "Link Layer Discovery Protocol (LLDP) is a industry standard protocol that allows devices to advertise, and\ndiscover connected devices, and there capabilities (same as CDP of Cisco). To enable it on Cisco devices, we\nhave to use this command under global configuration mode:\nSw(config)# lldp run"
  },
  {
    "legacyIndex": 33,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. Which command provides this output?\n\nCapability Codes: k - Router, I - Trans Bridge, B - source Route bridge\n\nS - Switch, H - Host, I - IGMP, r - Repeater, P - Phone,\n\nD - Remote, C - CVTA, M - Two-port Mac Relay\n\nDevice ID Local Intrfce Holdtme Capability Platform Port ID\n\n10.1.1.2 Gig37/3      176  RI  CPT 600 Gig36/41\n\n10.1.1.2 Gig37/1      174  RI  CPT 600 Gig36/43\n\n10.1.1.2 Gig36/41     134  RI  CPT 600 Gig37/3\n\n10.1.1.2 Gig36/43     134  RI  CPT 600 Gig37/1\n\n10.1.1.2 Ten3/2       132  RI  CPT 600 Ten4/2\n\n10.1.1.2 Ten4/2       174  RI  CPT 600 Ten3/2",
    "options": [
      "show ip route",
      "show ip interface",
      "show interface",
      "show cdp neighbor"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 34,
    "legacyNumber": 6,
    "prompt": "Which command is used to specify the delay time in seconds for LLDP to initialize on any interface?",
    "options": [
      "lldp timer",
      "lldp holdtime",
      "lldp reinit",
      "lldp tlv-select"
    ],
    "answer": 2,
    "explanation": "+ lldp holdtime seconds: Specify the amount of time a receiving device should hold the information from\nyour device before discarding it\n+ lldp reinit delay: Specify the delay time in seconds for LLDP to initialize on an interface\n+ lldp timer rate: Set the sending frequency of LLDP updates in seconds"
  },
  {
    "legacyIndex": 35,
    "legacyNumber": 7,
    "prompt": "A network engineer must create a diagram of a multivendor network. Which command must be configured on\nthe Cisco devices so that the topology of the network can be mapped?",
    "options": [
      "Device(Config)#lldp run",
      "Device(Config)#cdp run",
      "Device(Config-if)#cdp enable",
      "Device(Config)#flow-sampler-map topology"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 36,
    "legacyNumber": 8,
    "prompt": "An engineer needs to configure LLDP to send the port description time length value (TLV). What command\nsequence must be implemented?",
    "options": [
      "switch#lldp port-description",
      "switch(config)#lldp port-description",
      "switch(config-line)#lldp port-description",
      "switch(config-if)#lldp port-description"
    ],
    "answer": 1,
    "explanation": "Use the switch(config)#lldp port-description option to specify the port description TLV messages."
  },
  {
    "legacyIndex": 37,
    "legacyNumber": 1,
    "prompt": "Which three statements about MAC addresses are correct? (Choose three)",
    "options": [
      "To communicate with other devices on a network, a network device must have a unique MAC address",
      "The MAC address is also referred to as the IP address",
      "The MAC address of a device must be configured in the Cisco IOS CLI by a user with administrative privileges",
      "A MAC address contains two main components, the first of which identifies the manufacturer of the hardware and the second of which uniquely identifies the hardware",
      "An example of a MAC address is 0A:26:B8:D6:65:90",
      "A MAC address contains two main components, the first of which identifies the network on which the host resides and the second of which uniquely identifies the host on the network"
    ],
    "answer": [
      0,
      3,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 38,
    "legacyNumber": 2,
    "prompt": "The SW1 interface g0/1 is in the down/down state. Which two configurations are valid reasons for the\ninterface conditions? (Choose two)",
    "options": [
      "There is a duplex mismatch",
      "There is a speed mismatch",
      "There is a protocol mismatch",
      "The interface is shut down",
      "The interface is error-disabled"
    ],
    "answer": [
      1,
      4
    ],
    "type": "multi",
    "explanation": "The down/down state indicates a Layer 1 problem -> \"Protocol mismatch\" answer is a Layer 2 problem so it\nis not correct.\n\nDuplex should be matched on both side but it is not a must -> Therefore \"duplex mismatch\" is not a correct\nanswer.\n\nThe most common Layer 1 problems are faulty or incorrect cabling or hardware failure but none of them is in\nthe answer choices.\n\nIf the port is error-disabled, we will see it in down/down state so this answer is correct.\n\n SW#sh int f1/0/1\n FastEthernet1/0/1 is down, line protocol is down (err-\n disabled)\n\nThere are only two answers left, which are \"speed mismatch\" and \"interface is shut down\". According to the\ntable below (from the old and retired ICND1 100-101 Official Cert Guide), speed mismatch is also a cause of\ndown/down state.\n\nNote:\n+ Speed must match between two ends. We tested speed mismatch on real device but we only received\n\"up/down\" state.\n+ If \"interface is shut down\" then we will see the \"administratively down/down\", not \"down/down\" state. But\nthe \"down/down\" state would be seen on the far end interface."
  },
  {
    "legacyIndex": 39,
    "legacyNumber": 3,
    "prompt": "What are two functions of a Layer 2 switch? (Choose two)",
    "options": [
      "makes forwarding decisions based on the MAC address of a packet",
      "selects the best route between networks on a WAN",
      "moves packets within a VLAN",
      "moves packets between different VLANs",
      "acts as a central point for association and authentication servers"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 40,
    "legacyNumber": 4,
    "prompt": "How does the dynamically-learned MAC address feature function?",
    "options": [
      "It requires a minimum number of secure MAC addresses to be filled dynamically",
      "Switches dynamically learn MAC addresses of each connecting CAM table",
      "The ports are restricted and learn up to a maximum of 10 dynamically-learned addresses",
      "The CAM table is empty until ingress traffic arrives at each port"
    ],
    "answer": 3,
    "explanation": "The MAC addresses in the CAM table are the source MAC addresses only. Therefore it only learns MAC\naddress from ingress traffic.\note: If you are not sure about Virtual Local Area Network (VLAN), please read our Virtual Local Area Network\nVLAN Tutorial.\n\n Quick summary about VLAN:\n Be default all access ports belong to VLAN 1. If we want to assign a new VLAN, we have to use the\n command \"switchport access vlan <vlan-id>\" under interface mode.\n VLAN Benefits:\n - Logically group devices by department/function, not location so it provides more efficient use of\n bandwidth\n - Separate broadcast domains, thus reducing their sizes and help mitigate broadcast storms\n - Provide additional security because it separates sensitive data traffic from other traffic\n The following commands are used to a create a VLAN (for example VLAN 10) and assign it to an\n interface (for example fa0/1) on a switch:\n Switch(config)#vlan 10 //Create VLAN 10 first\n Switch(config)#interface fa0/1\n Switch(config-if)#switchport access vlan 10 //assign Fa0/1 interface to VLAN 10\n To verify a VLAN or check which ports belong to which VLAN, use the \"show vlan\" command (or\n \"show vlan id <vlan-id>\" for a specific VLAN)\n DTP Trunking modes"
  },
  {
    "legacyIndex": 41,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. After the switch configuration the ping test fails between PC A and PC B. Based on the\noutput for switch 1, which error must be corrected?\n\n Switch 1                                          Switch 2\n Name: Gi0/1                                       Name: Gi0/1\n Switchport: Enabled                               Switchport: Enabled\n Administrative Mode: trunk                        Administrative Mode: trunk\n Operational Mode: trunk                           Operational Mode: trunk\n Administrative Trunking Encapsulation:            Administrative Trunking Encapsulation:\n dot1q                                             dot1q\n Operational Trunking Encapsulation: dot1q         Operational Trunking Encapsulation: dot1q\n Negotiation of Trunking: Off                      Negotiation of Trunking: Off\n Access Mode VLAN: 1 (default)                     Access Mode VLAN: 1 (default)\n Trunking Native Mode VLAN: 1 (default)            Trunking Native Mode VLAN: 99 (default)\n Administrative Native VLAN tagging:               Administrative Native VLAN tagging:\n enabled                                           enabled\n Voice VLAN: none                                  Voice VLAN: none\n <output omitted>                                  <output omitted>\n Trunking VLANs Enabled: 50-100                    Trunking VLANs Enabled: 50-100\n Pruning VLANs Enabled: 2-1001                     Pruning VLANs Enabled: 2-1001\n Capture Mode Disabled                             Capture Mode Disabled\n Capture VLANs Allowed: ALL                        Capture VLANs Allowed: ALL",
    "options": [
      "There is a native VLAN mismatch",
      "Access mode is configured on the switch ports.",
      "The PCs are in the incorrect VLAN",
      "All VLANs are not enabled on the trunk"
    ],
    "answer": 0,
    "explanation": "From the output we see the native VLAN of Switch1 on Gi0/1 interface is VLAN 1 while that of Switch2 is\nVLAN 99 so there would be a native VLAN mismatch."
  },
  {
    "legacyIndex": 42,
    "legacyNumber": 2,
    "prompt": "Two switches are connected and using Cisco Dynamic Trunking Protocol. SW1 is set to Dynamic Desirable.\nWhat is the result of this configuration?",
    "options": [
      "The link is in a downstate.",
      "The link is in an error disables stale",
      "The link is becomes an access port",
      "The link becomes a trunkport"
    ],
    "answer": 3,
    "explanation": "Maybe this question is missing the \"SW2 is set to Dynamic Auto\" part so we assume this part to find out the\nbest answer. Dynamic Desirable + Dynamic Desirable/Dynamic Auto/Trunk will form a trunk link."
  },
  {
    "legacyIndex": 43,
    "legacyNumber": 3,
    "prompt": "Refer to exhibit. Which action do the switches take on the trunk link?\n\ninterface FastEthernet0/1         interface FastEthernet0/1\nswitchport trunk encapsulation    switchport trunk encapsulation\ndot1q                             dot1q\nswitchport trunk native vlan 999  switchport trunk native vlan 99\nswitchport mode trunk             switchport mode trunk",
    "options": [
      "The trunk does not form and the ports go into an err-disabled status",
      "The trunk forms but the mismatched native VLANs are merged into a single broadcast domain",
      "The trunk does not form, but VLAN 99 and VLAN 999 are allowed to traverse the link",
      "The trunk forms but VLAN 99 and VLAN 999 are in a shutdown state"
    ],
    "answer": 1,
    "explanation": "The trunk still forms with mismatched native VLANs and the traffic can actually flow between mismatched\nswitches. But it is absolutely necessary that the native VLANs on both ends of a trunk link match; otherwise\na native VLAN mismatch occurs, causing the two VLANs to effectively merge. For example with the above\nconfiguration, SW1 would send untagged frames for VLAN 999. SW2 receives them but would think they are\nfor VLAN 99 so we can say these two VLANs are merged."
  },
  {
    "legacyIndex": 44,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. The network administrator wants VLAN 67 traffic to be untagged between Switch 1 and\nSwitch 2 while all other VLANs are to remain tagged. Which command accomplishes this task?",
    "options": [
      "switchport access vlan 67",
      "switchport trunk allowed vlan 67",
      "switchport private-vlan association host 67",
      "switchport trunk native vlan 67"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 45,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit.\n\nA frame from VLAN1 of switch S1 is sent to switch S2 where the frame received on VLAN2. What causes this\nbehavior?",
    "options": [
      "trunk mode mismatches",
      "VLANs that do not correspond to a unique IP subnet",
      "native vlan mismatches",
      "allowing only vlan 2 on the destination"
    ],
    "answer": 2,
    "explanation": "For 802.1q encapsulation, the native VLAN must matched at both side; otherwise the link will not work. In\nthis case the native VLAN of S1 is 1 while the native VLAN of S2 is 2. Therefore when a frame from VLAN 1 is\nsent from S1 to S2, it will be untagged before leaving S1. When S2 receives this untagged frame, it believes\nthis frame was sent from the native VLAN. But the native VLAN on S2 is VLAN 2, not VLAN 1. Therefore only\nhosts on VLAN2 of S2 will receive this frame."
  },
  {
    "legacyIndex": 46,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. Which action is expected from SW1 when the untagged frame is received on the\nGigabitEthernet0/1 interface?\n\n  SW1#show run int gig 0/1\n  interface GigabitEthernet0/1\n\n    switchport access vlan 11\n    switchport trunk allowed vlan 1-10\n    switchport trunk encapsulation dot1q\n\n    switchport trunk native vlan 5\n    switchport mode trunk\n    speed 1000\n    duplex full",
    "options": [
      "The frame is processed in VLAN 5",
      "The frame is processed in VLAN 11",
      "The frame is processed in VLAN 1",
      "The frame is dropped"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 47,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit.\n\n                                                                                         A network administrator is configuring an\nEtherChannel between SW1 and SW2. The SW1 configuration is shown. What is the correct configuration for\nSW2?",
    "options": [
      "interface FastEthernet 0/1 channel-group 1 mode active switchport trunk encapsulation dot1q switchport mode trunk ! interface FastEthernet 0/2 channel-group 1 mode active switchport trunk encapsulation dot1q switchport mode trunk",
      "interface FastEthernet 0/1 channel-group 2 mode auto switchport trunk encapsulation dot1q switchport mode trunk ! interface FastEthernet 0/2 channel-group 2 mode auto switchport trunk encapsulation dot1q switchport mode trunk",
      "interface FastEthernet 0/1 channel-group 1 mode desirable switchport trunk encapsulation dot1q switchport mode trunk ! interface FastEthernet 0/2 channel-group 1 mode desirable switchport trunk encapsulation dot1q switchport mode trunk",
      "interface FastEthernet 0/1 channel-group 1 mode passive switchport trunk encapsulation dot1q switchport mode trunk ! interface FastEthernet 0/2 channel-group 1 mode passive switchport trunk encapsulation dot1q switchport mode trunk"
    ],
    "answer": 2,
    "explanation": "From the configuration of SW1, we see it is using Port Aggregation Protocol (PAgP) with \"auto\" mode so the\nother end (SW2) must also runs PAgP with \"desirable\" mode to actively sending request to form an\nEtherchannel."
  },
  {
    "legacyIndex": 48,
    "legacyNumber": 8,
    "prompt": "What occurs to frames during the process of frame flooding?",
    "options": [
      "Frames are sent to all ports, including those that are assigned to other VLANs",
      "Frames are sent to every port on the switch that has a matching entry in MAC address table",
      "Frames are sent to every port on the switch in the same VLAN except from the originating port",
      "Frames are sent to every port on the switch in the same VLAN"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 49,
    "legacyNumber": 9,
    "prompt": "Refer to the exhibit. An administrator is tasked with configuring a voice VLAN. What is the expected outcome\nwhen a Cisco phone is connected to the GigabitEthernet 3/1/4 port on a switch?\n\n interface\n GigabitEthernet3/1/4\n switchport voice vlan 50\n !",
    "options": [
      "The phone and a workstation that is connected to the phone do not have VLAN connectivity.",
      "The phone sends and receives data in VLAN 50, but a workstation connected to the phone sends and receives data in VLAN 1.",
      "The phone sends and receives data in VLAN 50, but a workstation connected to the phone has no VLAN connected.",
      "The phone and a workstation that is connected to the phone send and receive data in VLAN 50."
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 50,
    "legacyNumber": 10,
    "prompt": "Refer to the exhibit. What commands are needed to add a subinterface to Ethernet0/0 on R1 to allow for\nVLAN 20, with IP address 10.20.20.1/24?\n\nR1             SW1:                              SW2:\ninterface      interface Ethernet0/0             interface Ethernet0/1\nEthernet0/0    switchport trunk encapsulation    switchport trunk encapsulation\nno ip address  dot1q                             dot1q\n               switchport mode trunk             switchport mode trunk\n               !                                 !\n               interface Ethernet0/1             interface Ethernet0/2\n               switchport trunk allowed vlan 10  switchport access vlan 20\n               switchport trunk encapsulation    switchport mode access\n               dot1q\n               switchport mode trunk",
    "options": [
      "R1 (config)#interface ethernet0/0 R1 (config)#encapsulation dot1q 20 R1(config)#ip address 10.20.20.1 255.255.255.0",
      "R1 (config)#interface ethernet0/0.20 R1 (config)#encapsulation dot1q 20 R1(config)#ip address 10.20.20.1 255.255.255.0",
      "R1 (config)#interface ethernet0/0.20 R1(config)#ip address 10.20.20.1 255.255.255.0",
      "R1 (config)#interface ethernet0/0 R1(config)#ip address 10.20.20.1 255.255.255.0"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 51,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. Which outcome is expected when PC_A sends data to PC_B?",
    "options": [
      "The source MAC address is changed",
      "The source and destination MAC addresses remain the same",
      "The destination MAC address is replaced with ffff.ffff.ffff",
      "The switch rewrites the source and destination MAC addresses with its own"
    ],
    "answer": 1,
    "explanation": "Layer 2 switches do not change MAC address so PC_A will put PC_B MAC address into its destination address\nbefore sending it to the switch. PC_B will receive the frames with the source and destination MAC address\nintact.\n\nNote: Only with routers, including layer-3 switches where the packets need to cross to other VLANs, will the\nframes be stripped and rewritten for the new network or VLAN."
  },
  {
    "legacyIndex": 52,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. A network administrator assumes a task to complete the connectivity between PC A and\nthe File Server. Switch A and Switch B have been partially configured with VLANs 10, 11, 12 and 13. What is\nthe next step in the configuration?",
    "options": [
      "Add PC A to the same subnet as the File Server allowing for intra-VLAN communication",
      "Add PC A to VLAN 10 and the File Server to VLAN 11 for VLAN segmentation",
      "Add a router on a stick between Switch A and Switch B allowing for inter-VLAN routing",
      "Add VLAN 13 to the trunk links on Switch A and Switch B for VLAN propagation"
    ],
    "answer": 3,
    "explanation": "In fact we only need to add (allow) VLAN 13 to the trunk link of Switch A. Switch B allows all VLANs by\ndefault so we don't need to do any further configuration."
  },
  {
    "legacyIndex": 53,
    "legacyNumber": 3,
    "prompt": "An engineer must establish a trunk link between two switches. The neighboring switch is set to trunk or\ndesirable mode. What action should be taken?",
    "options": [
      "configure switchport nonegotiate",
      "configure switchport mode dynamic desirable",
      "configure switchport mode dynamic auto",
      "configure switchport trunk dynamic desirable"
    ],
    "answer": 1,
    "explanation": "If the neighboring switch is set to trunk then we need to set our switch to desirable mode so that it can start\nthe negotiation. In fact answer C is also correct according to the table below:\n\nBut \"desirable\" mode is a safer answer so we should choose it."
  },
  {
    "legacyIndex": 54,
    "legacyNumber": 4,
    "prompt": "An engineer requires a switch interface to actively attempt to establish a trunk link with a neighbor switch.\nWhat command must be configured?",
    "options": [
      "switchport mode trunk",
      "switchport mode dynamic desirable",
      "switchport mode dynamic auto",
      "switchport nonegotiate"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 55,
    "legacyNumber": 5,
    "prompt": "An engineer must configure interswitch VLAN communication between a Cisco switch and a third-party\nswitch. Which action should be taken?",
    "options": [
      "configure IEEE 802.1p",
      "configure IEEE 802.1q",
      "configure ISL",
      "configure DSCP"
    ],
    "answer": 1,
    "explanation": "IEEE 802.1Q is the networking standard that supports virtual LANs (VLANs) on an Ethernet network. When a\nframe enters the VLAN-aware portion of the network (a trunk link, for example), a VLAN ID tag is added to\nrepresent the VLAN membership of that frame. The picture below shows how VLAN tag is added and removed\nwhile going through the network.\n\nNote: If you are not sure about STP or VTP, please read our Spanning Tree Protocol STP Tutorial, Rapid\nSpanning Tree Protocol RSTP Tutorial, STP Root Port Election Tutorial and VLAN Trunking Protocol VTP\nTutorial."
  },
  {
    "legacyIndex": 56,
    "legacyNumber": 1,
    "prompt": "How does STP prevent forwarding loops at OSI Layer 2?",
    "options": [
      "TTL",
      "MAC address forwarding",
      "Collision avoidance.",
      "Port blocking"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 57,
    "legacyNumber": 2,
    "prompt": "What is the primary effect of the spanning-tree portfast command?",
    "options": [
      "It enables BPDU messages",
      "It minimizes spanning-tree convergence time",
      "It immediately puts the port into the forwarding state when the switch is reloaded",
      "It immediately enables the port in the listening state"
    ],
    "answer": 1,
    "explanation": "The purpose of Port Fast is to minimize the time interfaces must wait for spanning-tree to converge, it is\neffective only when used on interfaces connected to end stations."
  },
  {
    "legacyIndex": 58,
    "legacyNumber": 3,
    "prompt": "Which result occurs when PortFast is enabled on an interface that is connected to another switch?",
    "options": [
      "Spanning tree may fail to detect a switching loop in the network that causes broadcast storms",
      "VTP is allowed to propagate VLAN configuration information from switch to switch automatically.",
      "Root port choice and spanning tree recalculation are accelerated when a switch link goes down",
      "After spanning tree converges PortFast shuts down any port that receives BPDUs."
    ],
    "answer": 0,
    "explanation": "Enabling the PortFast feature causes a switch or a trunk port to enter the STP forwarding-state immediately\nor upon a linkup event, thus bypassing the listening and learning states.\nNote: To enable portfast on a trunk port you need the trunk keyword \"spanning-tree portfast trunk\""
  },
  {
    "legacyIndex": 59,
    "legacyNumber": 4,
    "prompt": "Refer to exhibit. How does SW2 interact with other switches in this VTP domain?\n\n SW2\n vtp domain cisco\n vtp mode transparent\n vtp password test\n interface fastethernet0/1\n description connection to SW1\n switchport mode trunk\n switchport trunk encapsulation\n dot1q",
    "options": [
      "It processes VTP updates from any VTP clients on the network on its access ports",
      "It receives updates from all VTP servers and forwards all locally configured VLANs out all trunk ports",
      "It forwards only the VTP advertisements that it receives on its trunk ports",
      "It transmits and processes VTP updates from any VTP Clients on the network on its trunk ports"
    ],
    "answer": 2,
    "explanation": "The VTP mode of SW2 is transparent so it only forwards the VTP updates it receives to its trunk links without\nprocessing them."
  },
  {
    "legacyIndex": 60,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. What two conclusions should be made about this configuration? (Choose two)",
    "options": [
      "The designated port is FastEthernet 2/1",
      "This is a root bridge",
      "The spanning-tree mode is Rapid PVST+",
      "The spanning-tree mode is PVST+",
      "The root port is FastEthernet 2/1"
    ],
    "answer": [
      2,
      4
    ],
    "type": "multi",
    "explanation": "This bridge is not the root bridge because it does not have the statement \"This bridge is the root\". When the\nlocal switch is not the root bridge, the port it shows would be the root port to the root bridge. Therefore in\nthis case FastEthernet2/1 is the root port that is connected to the root bridge."
  },
  {
    "legacyIndex": 61,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. Which switch in this configuration will be elected as the root bridge?\n\nSW1: 0C:E0:38:00:36:75\nSW2: 0C:0E:15:22:05:97\nSW3: 0C:0E:15:1A:3C:9D\nSW4: 0C:E0:18:A1:B3:19",
    "options": [
      "SW1",
      "SW2",
      "SW3",
      "SW4"
    ],
    "answer": 2,
    "explanation": "As this question did not state about bridge priority so we can assume all of them are using the default\npriority. Therefore the switch with lowest MAC address wins the election."
  },
  {
    "legacyIndex": 62,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit. Which switch becomes the root bridge?",
    "options": [
      "S1",
      "S2",
      "S3",
      "S4"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 63,
    "legacyNumber": 8,
    "prompt": "Which state does the switch port move to when PortFast is enabled?",
    "options": [
      "learning",
      "forwarding",
      "blocking",
      "listening"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 64,
    "legacyNumber": 9,
    "prompt": "What criteria is used first during the root port selection process?",
    "options": [
      "lowest neighbor's port ID",
      "lowest path cost to the root bridge",
      "lowest neighbor's bridge ID",
      "local port ID"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 65,
    "legacyNumber": 10,
    "prompt": "Which configuration ensures that the switch is always the root for VLAN 750?",
    "options": [
      "Switch(config)#spanning-tree vlan 750 priority 0",
      "Switch(config)#spanning-tree vlan 750 priority 614440",
      "Switch(config)#spanning-tree vlan 750 priority 38003685",
      "Switch(config)#spanning-tree vlan 750 root primary"
    ],
    "answer": 0,
    "explanation": "The keyword here is \"always\" so we should set the priority to the lowest value which is 0. If we use the\n\"primary root\" keyword then our switch is only set to the lower value compared to other switches. And new\nswitch added in the future can be set to lower value than our switch to take over the root role."
  },
  {
    "legacyIndex": 66,
    "legacyNumber": 11,
    "prompt": "Which spanning-tree enhancement avoids the learning and listening states and immediately places ports in\nthe forwarding state?",
    "options": [
      "BPDUfilter",
      "BPDUguard",
      "Backbonefast",
      "PortFast"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 67,
    "legacyNumber": 12,
    "prompt": "Refer to the exhibit.\n\n Switch1: 0C.E0.38.57.24.22\n Switch2:\n 0C.0E.15.22.1A.61\n Switch3:\n 0C.0E.15.1D.3C.9A\n\n Switch4:\n 0C.E0.19.A1.4D.16\n\nAfter the election process what is the root bridge in the HQ LAN?",
    "options": [
      "Switch 1",
      "Switch 2",
      "Switch 3",
      "Switch 4"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 68,
    "legacyNumber": 13,
    "prompt": "When using Rapid PVST+, which command guarantees the switch is always the root bridge for VLAN 200?",
    "options": [
      "spanning-tree vlan 200 priority 38572422",
      "spanning-tree vlan 200 priority 614440",
      "spanning-tree vlan 200 priority 0",
      "spanning-tree vlan 200 root primary"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 69,
    "legacyNumber": 1,
    "prompt": "Which two statements about EtherChannel technology are true? (Choose two)",
    "options": [
      "EtherChannel provides increased bandwidth by bundling existing FastEthernet or Gigabit Ethernet interfaces into a single EtherChannel",
      "STP does not block EtherChannel links",
      "You can configure multiple EtherChannel links between two switches, using up to a limit of sixteen physical ports",
      "EtherChannel does not allow load sharing of traffic among the physical links within the EtherChannel",
      "EtherChannel allows redundancy in case one or more links in the EtherChannel fail"
    ],
    "answer": [
      0,
      4
    ],
    "type": "multi",
    "explanation": "In fact answer B is also correct as STP considers Etherchannel links as one physical link so this question\nshould have three correct answers. But answer B is not as obvious as the other two answers so we should\nchoose them.\nAnswer C is not correct as \"Commonly up to 16 links can be assigned to an EtherChannel, but only 8 can be\nactive at a time\"."
  },
  {
    "legacyIndex": 70,
    "legacyNumber": 2,
    "prompt": "Which mode must be used to configure EtherChannel between two switches without using a negotiation\nprotocol?",
    "options": [
      "on",
      "auto",
      "active",
      "desirable"
    ],
    "answer": 0,
    "explanation": "The Static Persistence (or \"on\" mode) bundles the links unconditionally and no negotiation protocol is used.\nIn this mode, neither PAgP nor LACP packets are sent or received."
  },
  {
    "legacyIndex": 71,
    "legacyNumber": 3,
    "prompt": "Refer to the exhibit. Based on the LACP neighbor status, in which mode is the SW1 port channel configured?",
    "options": [
      "passive",
      "mode on",
      "auto",
      "active"
    ],
    "answer": 3,
    "explanation": "From the neighbor status, we notice the \"Flags\" are SP. \"P\" here means the neighbor is in Passive mode. In\norder to create an Etherchannel interface, the (local) SW1 ports should be in Active mode. Moreover, the\n\"Port State\" in the exhibit is \"0x3c\" (which equals to \"00111100 in binary format). Bit 3 is \"1\" which means\nthe ports are synchronizing -> the ports are working so the local ports should be in Active mode."
  },
  {
    "legacyIndex": 72,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit.\n\nWhich two commands were used to create port channel 10? (Choose two)",
    "options": [
      "interface range g0/0-1 channel-group 10 mode active",
      "interface range g0/0-1 channel-group 10 mode desirable",
      "interface range g0/0-1 channel-group 10 mode passive",
      "interface range g0/0-1 channel-group 10 mode auto",
      "interface range g0/0-1 channel-group 10 mode on"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 74,
    "legacyNumber": 1,
    "prompt": "What is the difference regarding reliability and communication type between TCP and UDP?",
    "options": [
      "TCP is reliable and is a connection-oriented protocol UDP is not reliable and is a connectionless protocol",
      "TCP is not reliable and is a connection-oriented protocol; UDP is reliable and is a connectionless protocol",
      "TCP is not reliable and is a connectionless protocol; UDP is reliable and is a connection-oriented protocol",
      "TCP is reliable and is a connectionless protocol; UDP is not reliable and is a connection-oriented protocol"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 75,
    "legacyNumber": 2,
    "prompt": "How do TCP and UDP differ in the way they provide reliability for delivery of packets?",
    "options": [
      "TCP is a connectionless protocol that does not provide reliable delivery of data, UDP is a connection- oriented protocol that uses sequencing to provide reliable delivery",
      "TCP does not guarantee delivery or error checking to ensure that there is no corruption of data UDP provides message acknowledgement and retransmits data if lost",
      "TCP provides flow control to avoid overwhelming a receiver by sending too many packets at once, UDP sends packets to the receiver in a continuous stream without checking for sequencing",
      "TCP uses windowing to deliver packets reliably; UDP provides reliable message transfer between hosts by establishing a three-way handshake"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 76,
    "legacyNumber": 3,
    "prompt": "How do TCP and UDP differ in the way they guarantee packet delivery?",
    "options": [
      "TCP uses checksum, acknowledgement, and retransmissions, and UDP uses checksums only.",
      "TCP uses two-dimensional parity checks, checksums, and cyclic redundancy checks and UDP uses retransmissions only.",
      "TCP uses checksum, parity checks, and retransmissions, and UDP uses acknowledgements only.",
      "TCP uses retransmissions, acknowledgement and parity checks and UDP uses cyclic redundancy checks only."
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 77,
    "legacyNumber": 4,
    "prompt": "How do TCP and UDP differ in the way that they establish a connection between two endpoints?",
    "options": [
      "TCP uses synchronization packets, and UDP uses acknowledgment packets",
      "UDP uses SYN, SYN ACK and FIN bits in the frame header while TCP uses SYN, SYN ACK and ACK bits",
      "UDP provides reliable message transfer and TCP is a connectionless protocol",
      "TCP uses the three-way handshake and UDP does not guarantee message delivery"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 78,
    "legacyNumber": 1,
    "prompt": "An engineer must configure a /30 subnet between two routers. Which usable IP address and subnet mask\ncombination meets this criteria?",
    "options": [
      "interface e0/0 description to HQ-A371:10975 ip address 172.16.1.4 255.255.255.248",
      "interface e0/0 description to HQ-A371:10975 ip address 10.2.1.3 255.255.255.252",
      "interface e0/0 description to HQ-A371:10975 ip address 192.168.1.1 255.255.255.248",
      "interface e0/0 description to HQ-A371:10975 ip address 209.165.201.2 255.255.255.252"
    ],
    "answer": 3,
    "explanation": "A /30 subnet means subnet mask of 255.255.255.252. But 10.2.1.3 255.255.255.252 is a broadcast IP\naddress; only 209.165.201.2/30 is the usable IP address."
  },
  {
    "legacyIndex": 79,
    "legacyNumber": 2,
    "prompt": "Refer to exhibit. Which statement explains the configuration error message that is received?\n\n Router(config)#interface GigabitEthernet 1/0/1\n Router(config-if)#ip address 192.168.16.143\n 255.255.255.240\n Bad mask /28 for address 192.168.16.143",
    "options": [
      "It is a broadcast IP address",
      "The router does not support /28 mask",
      "It belongs to a private IP address range",
      "It is a network IP address"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 80,
    "legacyNumber": 3,
    "prompt": "Which network allows devices to communicate without the need to access the Internet?",
    "options": [
      "172.9.0.0/16",
      "172.28.0.0/16",
      "192.0.0.0/8",
      "209.165.201.0/24"
    ],
    "answer": 1,
    "explanation": "This question asks about the private ranges of IPv4 addresses. The private ranges of each class of IPv4 are\nlisted below:\nClass A private IP address ranges from 10.0.0.0 to 10.255.255.255\nClass B private IP address ranges from 172.16.0.0 to 172.31.255.255\nClass C private IP address ranges from 192.168.0.0 to 192.168.255.255\nOnly the network 172.28.0.0/16 belongs to the private IP address (of class B)."
  },
  {
    "legacyIndex": 81,
    "legacyNumber": 4,
    "prompt": "Which function does the range of private IPv4 addresses perform?",
    "options": [
      "allows multiple companies to each use the same addresses without conflicts",
      "provides a direct connection for hosts from outside of the enterprise network",
      "ensures that NAT is not required to reach the internet with private range addressing",
      "enables secure communications to the internet for all external hosts"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 82,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. An engineer must add a subnet for a new office that will add 20 users to the network.\nWhich IPv4 network and subnet mask combination does the engineer assign to minimize wasting addresses?",
    "options": [
      "10.10.225.48 255.255.255.240",
      "10.10.225.32 255.255.255.240",
      "10.10.225.48 255.255.255.224",
      "10.10.225.32 255.255.255.224"
    ],
    "answer": 3,
    "explanation": "We need a subnet with 20 users so we need 5 bits 0 in the subnet mask as 25 - 2 = 30 > 20. Therefore the\nsubnet mask should be /27 (with last octet is 1110 0000 in binary). The increment is 32 so the valid network\naddress is 10.10.225.32."
  },
  {
    "legacyIndex": 83,
    "legacyNumber": 6,
    "prompt": "A corporate office uses four floors in a building\n* Floor 1 has 24 users\n* Floor 2 has 29 users\n* Floor 3 has 28 users\n* Floor 4 has 22 users\n\nWhich subnet summarizes and gives the most efficient distribution of IP addresses for the router\nconfiguration?",
    "options": [
      "192.168.0.0/26 as summary and 192.168.0.0/29 for each floor",
      "192.168.0.0/24 as summary and 192.168.0.0/28 for each floor",
      "192.168.0.0/23 as summary and 192.168.0.0/25 for each floor",
      "192.168.0.0/25 as summary and 192.168.0.0/27 for each floor"
    ],
    "answer": 3,
    "explanation": "We see the maximum number of user per floor is 29 users (Floor 2) < 32 so the best subnet mask should be\n1110 0000 which allows 25 - 2 = 30 hosts per subnet."
  },
  {
    "legacyIndex": 84,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit. A network technician is asked to design a small network with redundancy. The exhibit\nrepresents this design, with all hosts configured in the same VLAN. What conclusions can be made about this\ndesign?",
    "options": [
      "The design will function as intended",
      "Spanning-tree will need to be used.",
      "The router will not accept the addressing scheme.",
      "The connection between switches should be a trunk.",
      "The router interfaces must be encapsulated with the 802.1Q protocol."
    ],
    "answer": 2,
    "explanation": "Each interface on a router must be in a different network. If two interfaces are in the same network, the\nrouter will not accept it and show error when the administrator assigns it."
  },
  {
    "legacyIndex": 86,
    "legacyNumber": 9,
    "prompt": "An office has 8 floors with approximately 30-40 users per floor. What command must be configured on the\nrouter Switched Virtual Interface to use address space efficiently?",
    "options": [
      "ip address 192.168.0.0 255.255.0.0",
      "ip address 192.168.0.0 255.255.254.0",
      "ip address 192.168.0.0 255.255.255.224",
      "ip address 192.168.0.0 255.255.255.128"
    ],
    "answer": 2,
    "explanation": "We cannot use the subnet mask of 255.255.254.0 (/23) because it is smaller than the default subnet mask of\nclass C (/24). If we use /23 subnet mask, in fact we are summarizing (supernet) it -> Answer B is not\ncorrect.\n\nWith the subnet mask of 255.255.255.128, we have 21 = 2 subnets only, not enough for 8 floors -> Answer\nD is not correct.\n\nWe need 40 users per subnet so our subnet must support at least 64 (=26) hosts (in fact 62 hosts). So the\nlast octet of subnet mask should be 1100 0000 (with 6 bits \"0\") = 192 -> The suitable subnet mask is\n255.255.255.192. But this subnet mask only provides 22 = 4 subnets, which is not enough for 8 floors.\n\nFor 8 floors we need 1110 0000 (23 = 8) for the last octet of subnet mask so the subnet mask should be\n255.255.255.224.\n\nBut with the subnet mask of 255.255.255.224, the host addresses per subnet is 25 - 2 = 30 so we cannot\nfulfill the host addresses for 40 users. We can only provide IPs for 30 users. This question said\n\"approximately 30-40 users per floor\" so \"30 users per floor\" is acceptable.\n\nWith \"192.168.0.0 255.255.255.224\" we have 8 subnets:\n+ First subnet: 192.168.0.0 to 192.168.0.31\n+ Second subnet: 192.168.0.32 to 192.168.0.63\n+ Third subnet: 192.168.0.64 to 192.168.0.95\n+ Fourth subnet: 192.168.0.96 to 192.168.0.127\n+ Fifth subnet: 192.168.0.128 to 192.168.0.159\n+ Sixth subnet: 192.168.0.160 to 192.168.0.191\n+ Seventh subnet: 192.168.0.192 to 192.168.0.223\n+ Eighth subnet: 192.168.0.224 to 192.168.0.255"
  },
  {
    "legacyIndex": 87,
    "legacyNumber": 1,
    "prompt": "Which statement about static and dynamic routes is true?",
    "options": [
      "Dynamic routes are manually configured by a network administrator, while static routes are automatically learned and adjusted by a routing protocol",
      "Static routes are manually configured by a network administrator, while dynamic routes are automatically learned and adjusted by a routing protocol",
      "Static routes tell the router how to forward packets to networks that are not directly connected, while dynamic routes tell the router how to forward packets to networks that are directly connected",
      "Dynamic routes tell the router how to forward packets to networks that are not directly connected, while static routes tell the router how to forward packets to networks that are directly connected"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 88,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. When PC 1 sends a packet to PC2, the packet has which source and destination IP\naddress when it arrives at interface Gi0/0 on router R2?",
    "options": [
      "source 192.168.10.10 and destination 10.10.2.2",
      "source 192.168.20.10 and destination 192.168.20.1",
      "source 192.168.10.10 and destination 192.168.20.10",
      "source 10.10.1.1 and destination 10.10.2.2"
    ],
    "answer": 2,
    "explanation": "The source and destination IP addresses of the packets are unchanged on all the way. Only source and\ndestination MAC addresses are changed."
  },
  {
    "legacyIndex": 89,
    "legacyNumber": 3,
    "prompt": "Which of the following dynamic routing protocols are Distance Vector routing protocols? (Choose two)",
    "options": [
      "IS-IS",
      "EIGRP",
      "OSPF",
      "BGP",
      "RIP"
    ],
    "answer": [
      1,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 90,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. With which metric was the route to host 172.16.0.202 learned?",
    "options": [
      "0",
      "110",
      "38443",
      "3184439"
    ],
    "answer": 2,
    "explanation": "Both the line \"O 172.16.0.128/25\" and \"S 172.16.0.0/24\" cover the host 172.16.0.202 but with the \"longest\n(prefix) match\" rule the router will choose the first route.\nNote: Network 172.16.0.192/29 does not cover host 172.16.0.202. For network 172.16.0.192/29:\nIncrement: 8\nNetwork address: 172.16.0.192\nBroadcast address: 172.16.0.199"
  },
  {
    "legacyIndex": 91,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. Which command would you use to configure a static route on Router 1 to network\n192.168.202.0/24 with a nondefault administrative distance?",
    "options": [
      "router1(config)#ip route 192.168.202.0 255.255.255.0 192.168.201.2 1",
      "router1(config)#ip route 192.168.202.0 255.255.255.0 192.168.201.2 5",
      "router1(config)#ip route 1 192.168.201.1 255.255.255.0 192.168.201.2",
      "router1(config)#ip route 5 192.168.202.0 255.255.255.0 192.168.201.2"
    ],
    "answer": 1,
    "explanation": "The default AD of static route is 1 so we need to configure another number for the static route."
  },
  {
    "legacyIndex": 92,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. Which type of route does R1 use to reach host 10.10.13.10/32?\n\n  R1#show ip route\n  Gateway of last resort is 10.10.10.18 to network 0.0.0.0\n  10.0.0.0/8 is variably subnetted, 4 subnets. 3 Masks\n  C 10.10.10.0/30 is directly connected. FastEthernet0/1\n  O 10.10.13.0/25 [110/4576] via 10.10.10.1, 02:53:11, FastEthernet0/1\n  C 10.10.10.16/30 is directly connected, FastEthernet0/24\n  0 10.10.13.144/28 [110/110] via 10.10.10.1, 03:51:21, FastEthernet0/1\n  B* 0.0.0.0/0 [20/0] via 10.10.10.18, 02:17:53",
    "options": [
      "floating static route",
      "host route",
      "default route",
      "network route"
    ],
    "answer": 3,
    "explanation": "From the output, we see R1 will use the entry \"O 10.10.13.0/25 [110/4576] via 10.10.10.1, ...\" to reach host\n10.10.13.10. This is a network route.\n\nNote: \"B* 0.0.0.0/0 ...\" is a default route."
  },
  {
    "legacyIndex": 93,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit. If configuring a static default route on the router with the ip route 0.0.0.0 0.0.0.0\n10.13.0.1 120 command, how does the router respond?\n\n  Gateway of last resort is 10.12.0.1 to network 0.0.0.0\n\nO*E2 0.0.0.0/0 [110/1] via 10.12.0.1, 00:00:01, GigabitEthernet0/0\n\n   10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks\n\nC  10.0.0.0/24 is directly connected, GigabitEthernet0/0\n\nL  10.0.0.2/32 is directly connected, GigabitEthernet0/0\n\nC  10.13.0.0/24 is directly connected, GigabitEthernet0/1\n\nL  10.13.0.2/32 is directly connected, GigabitEthernet0/1",
    "options": [
      "It ignores the new static route until the existing OSPF default route is removed",
      "It immediately replaces the existing OSPF route in the routing table with the newly configured static route",
      "It starts load-balancing traffic between the two default routes",
      "It starts sending traffic without a specific matching entry in the routing table to GigabitEthernet0/1"
    ],
    "answer": 0,
    "explanation": "Our new static default route has the Administrative Distance (AD) of 120, which is bigger than the AD of\nOSPF External route (O*E2) so it will not be pushed into the routing table until the current OSPF External\nroute is removed.\n\nFor your information, if you don't type the AD of 120 (using the command \"ip route 0.0.0.0 0.0.0.0\n10.13.0.1\") then the new static default route would replace the OSPF default route as the default AD of static\nroute is 1. You will see such line in the routing table:\n\nS* 0.0.0.0/0 [1/0] via 10.13.0.1"
  },
  {
    "legacyIndex": 94,
    "legacyNumber": 8,
    "prompt": "When a floating static route is configured, which action ensures that the backup route is used when the\nprimary route falls?",
    "options": [
      "The floating static route must have a higher administrative distance than the primary route so it is used as a backup",
      "The administrative distance must be higher on the primary route so that the backup route becomes secondary",
      "The floating static route must have a lower administrative distance than the primary route so it is used as a backup",
      "The default-information originate command must be configured for the route to be installed into the routing table"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 95,
    "legacyNumber": 9,
    "prompt": "Which attribute does a router use to select the best path when two or more different routes to the same\ndestination exist from two different routing protocols?",
    "options": [
      "dual algorithm",
      "metric",
      "administrative distance",
      "hop count"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 96,
    "legacyNumber": 10,
    "prompt": "Refer to the exhibit. Which route does R1 select for traffic that is destined to 192.168.16.2?\n\n  R1#show ip route\n  D 192.168.16.0/26 [90/2679326] via 192.168.1.1\n  R 192.168.16.0/24 [120/3] via 192.168.1.2\n  O 192.168.16.0/21 [110/2] via 192.168.1.3\n  i L1 192.168.16.0/27 [115/30] via 192.168.1.4",
    "options": [
      "192.168.16.0/21",
      "192.168.16.0/24",
      "192.168.16.0/26",
      "192.168.16.0/27"
    ],
    "answer": 3,
    "explanation": "The destination IP addresses match all four entries in the routing table but the 192.168.16.0/27 has the\nlongest prefix so it will be chosen. This is called the \"longest prefix match\" rule."
  },
  {
    "legacyIndex": 97,
    "legacyNumber": 11,
    "prompt": "Refer to the exhibit. Which prefix does Router 1 use for traffic to Host A?\n\n  Router1#show ip route\n  Gateway of last resort is 10.10.11.2 to network 0.0.0.0\n\n        209.165.200.0/27 is sudnetted, 1 subnets\n  B 209.165.200.224 [20/0] via 10.10.12.2, 03:03:03\n\n        209.165.201.0/27 is sudnetted, 1 subnets\n  B 209.165.201.0 [20/0] via 10.10.12.2, 03:03:03\n\n        209.165.202.0/27 is subnetted, 1 subnets\n  B 209.165.202.128 [20/0] via 10.10.12.2, 03:03:03\n\n        10.0.0.0/8 is variably subnetted, 8 subnets, 4 masks\n  C 10.10.10.0/28 is directly connected, GigabitEthernet0/0\n  C 10.10.11.0/30 is directly connected, FastEthernet2/0\n  C 10.10.12.0/30 is directly connected, GigabitEthernet0/1\n  O 10.10.13.0/25 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0\n  O 10.10.13.128/28 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0\n  O 10.10.13.144/28 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0\n  O 10.10.13.160/29 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0\n  O 10.10.13.208/29 [110/2] via 10.10.10.1, 00:00:03, GigabitEthernet0/0\n  S* 0.0.0.0/0 [1/0] via 10.10.11.2",
    "options": [
      "10.10.10.0/28",
      "10.10.13.0/25",
      "10.10.13.144/28",
      "10.10.13.208/29"
    ],
    "answer": 3,
    "explanation": "The prefix with \"longest prefix\" will be matched first, in this case is \"/29\"."
  },
  {
    "legacyIndex": 98,
    "legacyNumber": 12,
    "prompt": "Router A learns the same route from two different neighbors, one of the neighbor routers is an OSPF\nneighbor and the other is an EIGRP neighbor. What is the administrative distance of the route that will be\ninstalled in the routing table?",
    "options": [
      "20",
      "90",
      "110",
      "115"
    ],
    "answer": 1,
    "explanation": "The Administrative distance (AD) of EIGRP is 90 while the AD of OSPF is 110 so EIGRP route will be chosen\nto install into the routing table."
  },
  {
    "legacyIndex": 99,
    "legacyNumber": 13,
    "prompt": "Refer to the exhibit. How does router R1 handle traffic to 192.168.10.16?\n\n R1# show ip route\n D 192.168.10.0/24 [90/2679326] via\n 192.168.1.1\n R 192.168.10.0/27 [120/3] via 192.168.1.2\n O 192.168.10.0/28 [110/2] via 192.168.1.3\n i L1 192.168.10.0/13 [115/30] via 192.168.1.4",
    "options": [
      "It selects the IS-IS route because it has the shortest prefix inclusive of the destination address",
      "It selects the RIP route because it has the longest prefix: inclusive of the destination address",
      "It selects the OSPF route because it has the lowest cost",
      "It selects the EIGRP route because it has the lowest administrative distance"
    ],
    "answer": 1,
    "explanation": "Note: The \"O 192.168.10.0/28\" route ranges from 192.168.10.0 to 192.168.10.15 only so it does not include\ndestination 192.168.10.16 so OSPF route is not the correct answer."
  },
  {
    "legacyIndex": 100,
    "legacyNumber": 14,
    "prompt": "Refer to the exhibit. Which path is used by the router for Internet traffic?\n\nR1#show ip route\n\nGateway of last resort is 10.10.11.2 to network 0.0.0.0\n\n209.165.200.0/27 is subnetted, 1 subnets\n\nB   209.165.200.224 [20/0] via 10.10.12.2, 00:10:34\n\n    10.0.0.0/8 is variably subnetted, 4 subnets, 3 masks\n\nC   10.10.10.0/28 is directly connected, GigabitEthernet0/0\n\nC   10.10.11.0/30 is directly connected, FastEthernet2/0\n\nC   10.10.13.0/30 [110/2] via 10.10.10.1, 00:03:34, GigabitEthernet0/0\n\nC   10.10.12.0/30 is directly connected, GigabitEthernet0/1\n\nS*  0.0.0.0/0 [1/0] via 10.10.11.2\n\nSwitch1#show ip route\nGateway of last resort is not set\n\n   10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks\n\nC  10.10.10.0/28 is directly connected, FastEthernet0/1\n\nC  10.10.13.0/24 is directly connected, VLAN20",
    "options": [
      "209.165.200.0/27",
      "10.10.10.0/28",
      "0.0.0.0/0",
      "10.10.13.0/24"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 101,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. A router reserved these five routes from different routing information sources. Which\ntwo routes does the router install in its routing table? (Choose two)\n\n IBGP route 10.0.0.0/30\n RIP route 10.0.0.0/30\n OSPF route\n 10.0.0.0/16\n OSPF route\n 10.0.0.0/30\n EIGRP route\n 10.0.0.1/32",
    "options": [
      "RIP route 10.0.0.0/30",
      "iBGP route 10.0.0.0/30",
      "OSPF route 10.0.0.0/30",
      "EIGRP route 10.0.0.1/32",
      "OSPF route 10.0.0.0/16"
    ],
    "answer": [
      2,
      3
    ],
    "type": "multi",
    "explanation": "In the five above routes, there are only three different routes which are 10.0.0.0/30 and 10.0.0.0/16 and\n10.0.0.1/32. Since each of these routes has a different prefix length (subnet mask), they're considered\ndifferent destinations, and they will all be installed in the routing table.\n\nThe prefix 10.0.0.0/30 was learned from three different routing protocols IBGP, RIP and OSPF so the route\nwith lowest AD would be chosen. The AD of IBGP is 200 and the AD of RIP is 120 so for the prefix\n10.0.0.0/30, only the OSPF route has the lowest AD (110) and it would be chosen to install into the routing\ntable."
  },
  {
    "legacyIndex": 102,
    "legacyNumber": 2,
    "prompt": "A packet is destined for 10.10.1.22. Which static route does the router choose to forward the packet?",
    "options": [
      "ip route 10.10.1.0 255.255.255.240 10.10.255.1",
      "ip route 10.10.1.16 255.255.255.252 10.10.255.1",
      "ip route 10.10.1.20 255.255.255.252 10.10.255.1",
      "ip route 10.10.1.20 255.255.255.254 10.10.255.1"
    ],
    "answer": 2,
    "explanation": "The subnet 10.10.1.20/30 covers the destination 10.10.1.22 as this subnet ranges from 10.10.1.20 to\n10.10.1.23 so it is the correct answer."
  },
  {
    "legacyIndex": 103,
    "legacyNumber": 3,
    "prompt": "Refer to the exhibit. Router R1 Fa0/0 cannot ping router R3 Fa0/1. Which action must be taken in router R1\nto help resolve the configuration issue?\n\nR1#show ip route                     R2#show ip route\n<output omitted>                     <output omitted>\nGateway of last resort is not set    Gateway of last resort is not set\n\n10.0.0.0/24 is subnetted, 1 subnets  20.0.0.0/24 is subnetted, 1 subnets\nC 10.10.10.0 is directly connected,  C 20.20.20.0 is directly connected,\nFastEthernet0/0                      FastEthernet0/1\n                                     10.0.0.0/24 is subnetted, 1 subnets\n                                     C 10.10.10.0 is directly connected,\n                                     FastEthernet0/0\n\nR3#show ip route\n<output omitted>\nGateway of last resort is not set\n\n20.0.0.0/24 is subnetted, 1 subnets\nC 20.20.20.0 is directly connected,\nFastEthernet0/1\n10.0.0.0/24 is subnetted, 1 subnets\nS 10.10.10.0 [1/0] via 20.20.20.1",
    "options": [
      "set the default network as 20.20.20.0/24",
      "set the default gateway as 20.20.20.2",
      "configure a static route with Fa0/1 as the egress interface to reach the 20.20.20.0/24 network",
      "configure a static route with 10.10.10.2 as the next hop to reach the 20.20.20.0/24 network"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 104,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. Router R1 is running three different routing protocols. Which route characteristic is used\nby the router to forward the packet that it receives for destination IP 172.16.32.1?",
    "options": [
      "longest prefix",
      "metric",
      "cost",
      "administrative distance"
    ],
    "answer": 0,
    "explanation": "A router evaluates routes in the following order.\n1. Prefix Length - The longest-matching route is preferred first. Prefix length trumps all other route\nattributes.\n2. Administrative Distance - In the event there are multiple routes to a destination with the same prefix\nlength, the route learned by the protocol with the lowest administrative distance is preferred.\n3. Metric - In the event there are multiple routes learned by the same protocol with same prefix length, the\nroute with the lowest metric is preferred. (If two or more of these routes have equal metrics, load balancing\nacross them may occur.)"
  },
  {
    "legacyIndex": 105,
    "legacyNumber": 5,
    "prompt": "Router R1 must send all traffic without a matching routing-table entry to 192.168.1.1. Which configuration\naccomplishes this task?",
    "options": [
      "R1#config t R1(config)#ip routing R1(config)#ip route default-route 192.168.1.1",
      "R1#config t R1(config)#ip routing R1(config)#ip route 192.168.1.1 0.0.0.0 0.0.0.0",
      "R1#config t R1(config)#ip routing R1(config)#ip route 0.0.0.0 0.0.0.0 192.168.1.1",
      "R1#config t R1(config)#ip routing R1(config)#ip default-gateway 192.168.1.1"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 106,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. How does router R1 handle traffic to 192.168.12.16?\n\n EIGRP:\n 192.168.12.0/24\n RIP: 192.168.12.0/27\n OSPF:\n 192.168.12.0/26",
    "options": [
      "It selects the IS-IS route because it has the shortest prefix inclusive of the destination address",
      "It selects the EIGRP route because it has the lowest administrative distance",
      "It selects the OSPF route because it has the lowest cost",
      "It selects the RIP route because it has the longest prefix inclusive of the destination address"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 108,
    "legacyNumber": 8,
    "prompt": "What are two reasons for an engineer to configure a floating static route? (Choose two)",
    "options": [
      "to automatically route traffic on a secondary path when the primary path goes down",
      "to route traffic differently based on the source IP of the packet",
      "to enable fallback static routing when the dynamic routing protocol fails",
      "to support load balancing via static routing",
      "to control the return path of traffic that is sent from the router"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative\ndistance (AD) of another static route or dynamic routes. By default a static route has an AD of 1 then floating\nstatic route must have the AD greater than 1. Floating static route has a manually configured administrative\ndistance greater than that of the primary route and therefore would not be in the routing table until the\nprimary route fails."
  },
  {
    "legacyIndex": 109,
    "legacyNumber": 9,
    "prompt": "Refer to the exhibit. A packet is being sent across router R1 to host 172.16.3.14. To which destination does\nthe router send the packet?",
    "options": [
      "207.165.200.246 via Serial0/1/0",
      "207.165.200.254 via Serial0/0/0",
      "207.165.200.254 via Serial0/0/1",
      "207.165.200.250 via Serial0/0/0"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 110,
    "legacyNumber": 10,
    "prompt": "Refer to the exhibit. Which route type is configured to reach the internet?\n\n  R1#show ip route\n  Gateway of last resort is 10.10.10.18 to network 0.0.0.0\n  10.0.0.0/8 is variably subnetted, 4 subnets. 3 Masks\n  C 10.10.10.0/30 is directly connected. FastEthernet0/1\n  O 10.10.13.0/25 [110/4576] via 10.10.10.1, 02:53:11, FastEthernet0/1\n\n  C 10.10.10.16/30 is directly connected, FastEthernet0/24\n  0 10.10.13.144/28 [110/110] via 10.10.10.1, 03:51:21, FastEthernet0/1\n  B* 0.0.0.0/0 [20/0] via 10.10.10.18, 02:17:53",
    "options": [
      "host route",
      "default route",
      "floating static route",
      "network route"
    ],
    "answer": 1,
    "explanation": "R1 uses the last entry (B* 0.0.0.0/0 ...) to reach the Internet. The symbol * means this is a default route."
  },
  {
    "legacyIndex": 111,
    "legacyNumber": 11,
    "prompt": "Refer to the exhibit. Router R2 is configured with multiple routes to reach network 10.1.1.0/24 from router\nR1. What protocol is chosen by router R2 to reach the destination network 10.1.1.0/24?",
    "options": [
      "OSPF",
      "static",
      "EIGRP",
      "eBGP"
    ],
    "answer": 1,
    "explanation": "The static route has the Administrative Distance of 1 so it is preferred over other popular routing protocols."
  },
  {
    "legacyIndex": 112,
    "legacyNumber": 12,
    "prompt": "Refer to the exhibit.\n\nWhich command configures a floating static route to provide a backup to the primary link?",
    "options": [
      "ip route 0.0.0.0 0.0.0.0 209.165.202.131",
      "ip route 209.165.201.0 255.255.255.224 209.165.202.130",
      "ip route 0.0.0.0 0.0.0.0 209.165.200.224",
      "ip route 209.165.200.224 255.255.255.224 209.165.202.129 254"
    ],
    "answer": 3,
    "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative\ndistance (AD) of another static route or dynamic routes. By default a static route has an AD of 1 then floating\nstatic route must have the AD greater than 1. Floating static route has a manually configured administrative\ndistance greater than that of the primary route and therefore would not be in the routing table until the\nprimary route fails.\nIn this question, the floating static route to subnet 209.165.200.224/27 is manually assigned the AD of 254.\note: If you are not sure about OSPF, please read our OSPF Tutorial.\n\n Quick OSPF review\n - OSPF is a link-state routing protocol, which runs Dijkstra algorithm to calculate the shortest path.\n - Link-state routing protocol like OSPF has a common view of entire topology\n - OSPF only uses bandwidth to calculate metric.\n - Area 0 is called the backbone area\n In order to become OSPF neighbor, the following values must be matched on both routers:\n + Area ID\n + Authentication\n\n + Hello and Dead Intervals\n + Stub area Flag\n + MTU Size\n - Two options for OSPF authentication:\n + Plain text authentication\n + MD5 authentication\n - Hello packets of OSPF are multicast to 224.0.0.5\n - \"Broadcast\" is the default network type for an OSPF enabled Ethernet interface (while Point-to-\n Point is the default OSPF network type for Serial interface with HDLC and PPP encapsulation). By\n default, the timers on a broadcast network (Ethernet, point-to-point and point-to-multipoint) are 10\n seconds hello and 40 seconds dead. The timers on a non-broadcast network are 30 seconds hello 120\n seconds dead.\n OSPF uses the following criteria to select the router ID:\n 1. Manual configuration of the router ID (via the \"router-id x.x.x.x\" command under OSPF router\n configuration mode).\n 2. Highest IP address on a loopback interface.\n 3. Highest IP address on a non-loopback and active (no shutdown) interface.\n The formula to calculate OSPF cost is:\n Cost = 108 / Bandwidth"
  },
  {
    "legacyIndex": 114,
    "legacyNumber": 2,
    "prompt": "When OSPF learns multiple paths to a network, how does it select a route?",
    "options": [
      "It multiple the active K value by 256 to calculate the route with the lowest metric.",
      "For each existing interface, it adds the metric from the source router to the destination to calculate the route with the lowest bandwidth.",
      "It divides a reference bandwidth of 100 Mbps by the actual bandwidth of the existing interface to calculate the router with the lowest cost.",
      "It count the number of hops between the source router and the destination to determine the router with the lowest metric"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 115,
    "legacyNumber": 3,
    "prompt": "A user configured OSPF and advertised the Gigabit Ethernet interface in OSPF. By default, which type of OSPF\nnetwork does this interface belong to?",
    "options": [
      "point-to-multipoint",
      "point-to-point",
      "broadcast",
      "nonbroadcast"
    ],
    "answer": 2,
    "explanation": "The Broadcast network type is the default for an OSPF enabled ethernet interface (while Point-to-Point is the\ndefault OSPF network type for Serial interface with HDLC and PPP encapsulation)."
  },
  {
    "legacyIndex": 116,
    "legacyNumber": 4,
    "prompt": "You have configured a router with an OSPF router ID, but its IP address still reflects the physical interface.\nWhich action can you take to correct the problem in the least disruptive way?",
    "options": [
      "Reload the OSPF process",
      "Reload the router",
      "Save the router configuration",
      "Specify a loopback address"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 117,
    "legacyNumber": 5,
    "prompt": "An engineer configured an OSPF neighbor as a designated router. Which state verifies the designated router\nis in the proper mode?",
    "options": [
      "Exchange",
      "2-way",
      "Full",
      "Init"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 118,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. If OSPF is running on this network, how does Router 2 handle traffic from Site B to\n10.10.13.128/25 at Site A?\n\n  Router2#show ip route\n  Gateway of last resort is not set\n\n      10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks\n  C 10.10.10.8/30 is directly connected, FastEthernet0/2\n  C 10.10.10.12/30 is directly connected, FastEthernet0/1\n  O 10.10.13.0/25 [110/11] via 10.10.10.9, 00:00:02, FastEthernet0/2\n\n                                      [110/11] via 10.10.10.13, 00:00:02, FastEthernet0/1\n  C 10.10.10.4/30 is directly connected, FastEthernet0/2",
    "options": [
      "It sends packets out of interface Fa0/2 only",
      "It sends packets out of interface Fa0/1 only",
      "It is unreachable and discards the traffic",
      "It load-balances traffic out of Fa0/1 and Fa0/2"
    ],
    "answer": 2,
    "explanation": "Router2 does not have an entry for the subnet 10.10.13.128/25. It only has an entry for 10.10.13.0/25,\nwhich ranges from 10.10.13.0 to 10.10.13.127."
  },
  {
    "legacyIndex": 120,
    "legacyNumber": 8,
    "prompt": "Refer to the exhibit. What does router R1 use as its OSPF router-ID?",
    "options": [
      "10.10.1.10",
      "10.10.10.20",
      "172.16.15.10",
      "192.168.0.1"
    ],
    "answer": 2,
    "explanation": "OSPF uses the following criteria to select the router ID:\n1. Manual configuration of the router ID (via the \"router-id x.x.x.x\" command under OSPF router\nconfiguration mode).\n2. Highest IP address on a loopback interface.\n3. Highest IP address on a non-loopback and active (no shutdown) interface."
  },
  {
    "legacyIndex": 121,
    "legacyNumber": 9,
    "prompt": "Refer to the exhibit. The \"show ip ospf interface\" command has been executed on R1. How is OSPF\nconfigured?\n\n Designated Router (ID) 10.11.11.11, Interface address 10.10.10.1\n Backup Designated router (ID) 10.3.3.3, Interface address\n 10.10.10.3\n Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit\n 5\n oob-resync timeout 40\n Hello due in 00:00:08\n Supports Link-local Signaling (LLS)\n Cisco NSF helper support enabled\n IETF NSF helper support enabled\n Index 1/1/1, flood queue length 0\n Next 0x0(0)/0x0(0)/0x0(0)\n Last flood scan length is 1, maximum is 6\n Last flood scan time is 0 msec, maximum is 1 msec\n Neighbor Count is 3, Adjacent neighbor count is 3\n Adjacent with neighbor 10.1.1.4\n Adjacent with neighbor 10.2.2.2\n Adjacent with neighbor 10.3.3.3 (Backup Designated Router)\n Suppress hello for 0 neighbor(s)",
    "options": [
      "The interface is not participating in OSPF",
      "A point-to-point network type is configured",
      "The default Hello and Dead timers are in use",
      "There are six OSPF neighbors on this interface"
    ],
    "answer": 2,
    "explanation": "From the output we can see there are Designated Router & Backup Designated Router for this OSPF domain\nso this is a broadcast network (point-to-point and point-to-multipoint networks do not elect DR & BDR) ->\nAnswer B is not correct.\n\nBy default, the timers on a broadcast network (Ethernet, point-to-point and point-to-multipoint) are 10\nseconds hello and 40 seconds dead (therefore answer C is correct). The timers on a non-broadcast network\nare 30 seconds hello 120 seconds dead.\n\nFrom the line \"Neighbor Count is 3\", we learn there are four OSPF routers in this OSPF domain -> Answer D\nis not correct."
  },
  {
    "legacyIndex": 122,
    "legacyNumber": 10,
    "prompt": "R1 has learned route 192.168.12.0/24 via IS-IS, OSPF, RIP and Internal EIGRP. Under normal operating\nconditions, which routing protocol is installed in the routing table?",
    "options": [
      "IS-IS",
      "RIP",
      "Internal EIGRP",
      "OSPF"
    ],
    "answer": 2,
    "explanation": "With the same route (prefix), the router will choose the routing protocol with lowest Administrative Distance\n(AD) to install into the routing table. The AD of Internal EIGRP (90) is lowest so it would be chosen. The\ntable below lists the ADs of popular routing protocols.\n\nNote: The AD of IS-IS is 115. The \"EIGRP\" in the table above is \"Internal EIGRP\". The AD of \"External EIGRP\"\nis 170. An EIGRP external route is a route that was redistributed into EIGRP."
  },
  {
    "legacyIndex": 123,
    "legacyNumber": 11,
    "prompt": "Refer to the exhibit. The default-information originate command is configured under the R1 OSPF\nconfiguration. After testing, workstations on VLAN 20 at Site B cannot reach a DNS server on the Internet.\nWhich action corrects the configuration issue?\n\nR2#show run | b router ospf  R1#show run | b router ospf\nrouter ospf 1                router ospf 1\nrouter-id 2.2.2.2            router-id 1.1.1.1\n\nlog-adjacency-changes                           log-adjacency-changes\nauto-cost reference-bandwidth 10000             auto-cost reference-bandwidth 10000\nnetwork 10.10.10.1 0.0.0.0 area 0               network 10.10.10.2 0.0.0.0 area 0\nnetwork 10.10.13.1 0.0.0.0 area 0               default-information originate\n\n================================                ====================================\n====                                            ==\n\nR2#show ip route                                R1#show ip route\nGateway of last resort is not set               Gateway of last resort is not set\n10.0.0.0/8 is variably subnetted, 3 subnets, 3  10.0.0.0/8 is variably subnetted, 4 subnets, 3 masks\nmasks                                           C 10.10.10.0/30 is directly connected,\nC 10.10.10.0/30 is directly connected           FastEthernet0/1\nC 10.10.13.0/25 is directly connected, Vlan20   O 10.10.13.0/25 [110/5766] via\nC 10.10.13.144/28 is directly connected,        10.10.10.1,00:33:22\nVlan40                                          C 10.10.10.16/30 is directly connected,\n                                                FastEthernet0/24\n                                                O 10.10.13.144/28 [110/110] via 10.10.10.1,\n                                                01:33:33",
    "options": [
      "Add the default-information originate command on R2",
      "Add the always keyword to the default-information originate command on R1",
      "Configure the ip route 0.0.0.0 0.0.0.0 10.10.10.18 command on R1",
      "Configure the ip route 0.0.0.0 0.0.0.0 10.10.10.2 command on R2"
    ],
    "answer": 2,
    "explanation": "The default-information originate command advertises a default route into a normal area, provided the\nadvertising router already has a default route. But in the routing table of R1 we don't see such a default\nroute. Therefore we have to configure one.\n\nWe cannot only add the \"always\" keyword to the command \"default-information originate\" on R1 because R2\nstill does not know how to forward traffic received from R1."
  },
  {
    "legacyIndex": 124,
    "legacyNumber": 12,
    "prompt": "Refer to the exhibit. An engineer is bringing up a new circuit to the MPLS provider on the Gi0/1 interface of\nRouter1. The new circuit uses eBGP and learns the route to VLAN25 from the BGP path.\n\nRouter1#show ip route\n\nGateway of last resort is 10.10.11.2 to network 0.0.0.0\n\n   10.0.0.0/8 is variably subnetted, 8 subnets, 4 masks\n\nC  10.10.10.0/28 is directly connected, GigabitEthernet0/0\n\nC  10.10.11.0/30 is directly connected, FastEthernet2/0\n\nO  10.10.13.0/25 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nO  10.10.13.128/28 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nO  10.10.13.144/28 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nO  10.10.13.160/29 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nO  10.10.13.208/30 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nO  10.10.13.252/30 [110/2] via 10.10.10.1,00:00:32, GigabitEthernet0/0\n\nS* 0.0.0.0/0 [1/0] via 10.10.11.2\n\nWhat is the expected behavior for the traffic flow for route 10.10.13.0/25?",
    "options": [
      "Traffic to 10.10.13.0.25 is load balanced out of multiple interfaces",
      "Route 10.10.13.0/25 is updated in the routing table as being learned from interface Gi0/1",
      "Traffic to 10.10.13.0/25 is symmetrical",
      "Route 10.10.13.0/25 learned via the Gi0/0 interface remains in the routing table"
    ],
    "answer": 1,
    "explanation": "From the output we can deduce interface Gi0/0 on R1 is the interface connecting to Router2 so interface\nGi0/1 is the interface connecting to the new MPLS AS 1000.\n\nThe AD of eBGP (20) is smaller than that of OSPF (110) so the route to 10.10.13.0/25 will be updated as\nbeing learned from the new BGP path."
  },
  {
    "legacyIndex": 125,
    "legacyNumber": 13,
    "prompt": "Refer to the exhibit. To which device does Router1 send packets that are destined to host 10.10.13.165?\n\nRouter1#show ip route\n\nGateway of last resort is 10.10.11.2 to network 0.0.0.0\n\n   209.165.200.0/27 is subnetted, 1 subnets\n\nB  209.165.200.224 [20/0] via 10.10.12.2,03:32:14\n\n   209.165.201.0/27 is subnetted, 1 subnets\n\nB  209.165.201.0 [20/0] via 10.10.12.2,02:26:53\n\n   209.165.202.0/27 is subnetted, 1 subnets\n\nB  209.165.202.128 [20/0] via 10.10.12.2,02:46:03\n\n   10.0.0.0/8 is variably subneted, 10 subnets, 4 masks\n\nO  10.10.13.0/25 [110/2] via 10.10.10.1,00:00:04, GigabitEthernet0/0\n\nO  10.10.13.128/28 [110/2] via 10.10.10.5,00:00:12, GigabitEthernet0/1\n\nO  10.10.13.144/28 [110/2] via 10.10.10.9,00:01:57, GigabitEthernet0/2\n\nO  10.10.13.160/29 [110/2] via 10.10.10.5,00:00:12, GigabitEthernet0/1\n\nO  10.10.13.208/29 [110/2] via 10.10.10.13,00:01:57, GigabitEthernet0/3\n\nS* 0.0.0.0/0 [1/0] via 10.10.11.2",
    "options": [
      "Router2",
      "Router3",
      "Router4",
      "Router5"
    ],
    "answer": 1,
    "explanation": "The destination of 10.10.13.165 matches the entry \"O 10.10.13.160/29 [110/2]...\" because of the longest\nprefix length rule so the packet will be forwarded to 10.10.10.5, which is Router3."
  },
  {
    "legacyIndex": 126,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. Which configuration issue is preventing the OSPF neighbor relationship from being\nestablished between the two routers?\n\nR1#show running-config              R2#show running-config\nBuilding configuration...           Building configuration...\n!                                   !\ninterface GigabitEthernet1/0        interface GigabitEthernet2/0\nmtu 1600                            ip address 192.168.0.2\nip address 192.168.0.1              255.255.255.252\n255.255.255.252                     negotiation auto\nnegotiation auto                    !\n!                                   router ospf 1\nrouter ospf 1                       router-id 2.2.2.2\nrouter-id 1.1.1.1                   passive-interface default\npassive-interface default           no passive-interface\nno passive-interface                GigabitEthernet2/0\nGigabitEthernet1/0                  network 192.168.0.2 0.0.0.0 area 0\nnetwork 192.168.0.1 0.0.0.0 area 0  !\n!",
    "options": [
      "R2 is using the passive-interface default command",
      "R1 has an incorrect network command for interface Gi1/0",
      "R2 should have its network command in area 1",
      "R1 interface Gi1/0 has a larger MTU size"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 127,
    "legacyNumber": 2,
    "prompt": "Which two minimum parameters must be configured on an active interface to enable OSPFv2 to operate?\n(Choose two)",
    "options": [
      "OSPF area",
      "OSPF MD5 authentication key",
      "IPv6 address",
      "OSPF process ID",
      "OSPF stub flag"
    ],
    "answer": [
      0,
      3
    ],
    "type": "multi",
    "explanation": "To configure OSPFv2 under interface mode we must use the command \"ip ospf {process-id} area {area-id}\".\nFor example:\nR1(config-if)#ip ospf 1 area 2"
  },
  {
    "legacyIndex": 128,
    "legacyNumber": 3,
    "prompt": "Refer to the exhibit. Refer to the exhibit. After the configuration is applied, the two routers fail to establish an\nOSPF neighbor relationship. what is the reason for the problem?\n\nRouter1(config)#interface GigabitEthernet1/1          Router2(config)#interface GigabitEthernet1/1\nRouter1(config-if)#description ***Connection          Router2(config-if)#description ***Connection to\nto Router2***                                         Router1***\nRouter1(config-if)#ip address 10.10.10.1              Router2(config-if)#ip address 10.10.10.2\n255.255.255.252                                       255.255.255.252\nRouter1(config-if)#ip ospf hello-interval 5           Router2(config)#router ospf 1001\nRouter1(config)#router ospf 1000                      Router2(config-router)#router-id 2.2.2.2\nRouter1(config-router)#router-id 1.1.1.1              Router2(config-router)#network 10.10.10.0\nRouter1(config-router)#network 10.10.10.0             0.0.0.3 area 0\n0.0.0.3 area 0                                        Router2(config-router)#passive-interface default\n                                                      Router2(config-router)#no passive-interface\n                                                      GigabitEthernet1/1",
    "options": [
      "The OSPF router IDs are mismatched",
      "Router2 is using the default hello timer",
      "The network statement on Router1 is misconfigured",
      "The OSPF process IDs are mismatched"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 129,
    "legacyNumber": 4,
    "prompt": "Which step in the link-state routing process is described by a router sending Hello packets out all of the\nOSPF-enabled interfaces?",
    "options": [
      "electing the designated router",
      "establishing neighbor adjacencies",
      "injecting the default route",
      "exchanging link-state advertisements"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 130,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. If the switch reboots and all routers have to re-establish OSPF adjacencies, which\nrouters will become the new DR and BDR?",
    "options": [
      "Router R3 will become the DR and router R1 will become the BDR.",
      "Router R4 will become the DR and router R3 will become the BDR.",
      "Router R1 will become the DR and router R2 will become the BDR.",
      "Router R3 will become the DR and router R2 will become the BDR."
    ],
    "answer": 0,
    "explanation": "After the new election, R3 and R1 have highest priority (of 2) so they will be elected DR and BDR. R3 will be\nelected DR because its has higher router ID (of 3.3.3.3)."
  },
  {
    "legacyIndex": 131,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. What action establishes the OSPF neighbor relationship without forming an adjacency?",
    "options": [
      "modify priority",
      "modify process ID",
      "modify hello interval",
      "modify network type"
    ],
    "answer": 2,
    "explanation": "In this question, R1 & R2 will not establish OSPF neighbor relationship because the hello & dead intervals are\nnot the same.\nIf we modify the hello & dead intervals to the same values then R1 & R2 will become OSPF neighbors. But\nthey will establish OSPF adjacency too.\n\nAnswer B is not correct as the process ID is only locally significant.\n\nAnswer C is partially correct as we need to change both \"hello and dead\" interval, not \"hello\" interval only.\n\nAnswer A is a good answer because if we change both the priorities to 0 then they cannot elect DR/BDR so\nthe adjacency cannot be complete.\n\nAnswer D is a good answer too because if we change one of the network type to \"point to point\" then OSPF\nneighbor relationship can still come up but adjacency cannot (no routes are getting exchanged).\n\nBut two good answers are only correct after fixing the hello & dead intervals to the same value (so that OSPF\nneighbor relationship can come up) so answer C should be the best choice here.\n\nNote:\n\nNeighbors\nRouters that share a common segment become neighbors on that segment. Neighbors are elected via the\nHello protocol. Hello packets are sent periodically out of each interface using IP multicast (Appendix B).\nRouters become neighbors as soon as they see themselves listed in the neighbor's Hello packet.\nTwo routers will become neighbors if they agree on the following: Same Area ID, same authentication (if\nused), same hello & dead intervals, same subnet mask and same stub area flag.\nAdjacencies\nAdjacency is the next step after the neighboring process. Adjacent routers are routers that go beyond the\nsimple Hello exchange and proceed into the database exchange process.\nThe adjacency building process takes effect after multiple stages have been fulfilled. Routers that become\nadjacent will have the exact link-state database. The states an interface passes through before becoming\nadjacent to another router are: Down -> Attempt (optional) -> Init -> 2-Way -> Exstart -> Exchange ->\nLoading -> Full.\nAt Full state the adjacency is complete."
  },
  {
    "legacyIndex": 132,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit. What is the next hop address for traffic that is destined to host 10.0.1.5?",
    "options": [
      "Loopback 0",
      "10.0.1.4",
      "10.0.1.50",
      "10.0.1.3"
    ],
    "answer": 2,
    "explanation": "Traffic destined to host 10.0.1.5 will match the entry \"O 10.0.1.5/32 ...\" so the next-hop address will be\n10.0.1.50."
  },
  {
    "legacyIndex": 133,
    "legacyNumber": 8,
    "prompt": "An engineer must configure an OSPF neighbor relationship between router R1 and R3. The authentication\nconfiguration has been configured and the connecting interfaces are in the same 192.168.1.0/30 subnet.\nWhat are the next two steps to complete the configuration? (Choose two)",
    "options": [
      "configure the hello and dead timers to match on both sides",
      "configure the same process ID for the router OSPF process",
      "configure the same router ID on both routing processes",
      "configure the interfaces as OSPF active on both sides",
      "configure both interfaces with the same area ID"
    ],
    "answer": [
      3,
      4
    ],
    "type": "multi",
    "explanation": "We don't need to configure hello and dead timers for OSPF neighbor as OSPF can auto negotiate the network\ntype (with the same hello and dead timers on both sides). We just have to make sure both interfaces are\nrunning OSPF and they are in the same area ID.\nNote: If you are not sure about EIGRP, please read our EIGRP Tutorial."
  },
  {
    "legacyIndex": 134,
    "legacyNumber": 1,
    "prompt": "A router running EIGRP has learned the same route from two different paths. Which parameter does the\nrouter use to select the best path?",
    "options": [
      "cost",
      "administrative distance",
      "metric",
      "as-path"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 135,
    "legacyNumber": 2,
    "prompt": "Which two actions influence the EIGRP route selection process? (Choose two)",
    "options": [
      "The router calculates the reported distance by multiplying the delay on the exiting interface by 256",
      "The router calculates the best backup path to the destination route and assigns it as the feasible successor",
      "The router calculates the feasible distance of all paths to the destination route",
      "The advertised distance is calculated by a downstream neighbor to inform the local router of the bandwidth on the link",
      "The router must use the advertised distance as the metric for any given route"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": "The reported distance (or advertised distance) is the cost from the neighbor to the destination. It is\ncalculated from the router advertising the route to the network. For example in the topology below, suppose\nrouter A & B are exchanging their routing tables for the first time. Router B says \"Hey, the best metric (cost)\nfrom me to IOWA is 50 and the metric from you to IOWA is 90\" and advertises it to router A. Router A\nconsiders the first metric (50) as the Advertised distance. The second metric (90), which is from NEVADA to\nIOWA (through IDAHO), is called the Feasible distance.\n\nThe reported distance is calculated in the same way of calculating the metric. By default (K1 = 1, K2 = 0, K3\n= 1, K4 = 0, K5 = 0), the metric is calculated as follows:\n\n-> Answer A is not correct.\nFeasible successor is the backup route. To be a feasible successor, the route must have an Advertised\ndistance (AD) less than the Feasible distance (FD) of the current successor route -> Answer B is correct.\nFeasible distance (FD): The sum of the AD plus the cost between the local router and the next-hop router.\nThe router must calculate the FD of all paths to choose the best path to put into the routing table.\nNote: Although the new CCNA exam does not have EIGRP topic but you should learn the basic knowledge of\nthis routing protocol."
  },
  {
    "legacyIndex": 136,
    "legacyNumber": 3,
    "prompt": "By default, how does EIGRP determine the metric of a route for the routing table?",
    "options": [
      "It uses the bandwidth and delay values of the path to calculate the route metric",
      "It uses a default metric of 10 for all routes that are learned by the router",
      "It uses a reference Bandwidth and the actual bandwidth of the connected link to calculate the route metric",
      "It counts the number of hops between the receiving and destination routers and uses that value as the metric"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 137,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit.\n\nWhich route type does the routing protocol Code D represent in the output?",
    "options": [
      "internal BGP route",
      "/24 route of a locally configured IP",
      "statically assigned route",
      "route learned through EIGRP"
    ],
    "answer": 3,
    "explanation": "Code \"D\" represents for EIGRP. Code \"E\" could not be used for EIGRP as it was used for Exterior Gateway\nProtocol (EGP), which is BGP predecessor.\n\n\nNote: If you are not sure about NAT PAT, please read our Network Address Translation NAT Tutorial."
  },
  {
    "legacyIndex": 138,
    "legacyNumber": 1,
    "prompt": "Which statement about the nature of NAT overload is true?",
    "options": [
      "applies a one-to-many relationship to internal IP addresses",
      "applies a one-to-one relationship to internal IP addresses",
      "applies a many-to-many relationship to internal IP addresses",
      "can be configured only on Gigabit interface"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 139,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. An engineer configured NAT translations and has verified that the configuration is\ncorrect. Which IP address is the source IP?\n\nR1#show ip nat translations\n\nPro Inside global  Inside local Outside local  Outside global\n\ntcp 172.23.104.3:43268 10.4.4.4:43268 172.23.103.10:23 172.23.103.10:23\n\ntcp 172.23.104.4:45507 10.4.4.5:45507 172.23.103.10:80 172.23.103.10:80",
    "options": [
      "10.4.4.4",
      "10.4.4.5",
      "172.23.103.10",
      "172.23.104.4"
    ],
    "answer": 3,
    "explanation": "The source IP here can be the \"inside local\" (source IP before NATed) or \"inside global\" (source IP after\nNATed). Maybe this question wants to ask about source IP after NAT translation so answer D is the best\nchoice."
  },
  {
    "legacyIndex": 140,
    "legacyNumber": 3,
    "prompt": "Which keyword in a NAT configuration enables the use of one outside IP address for multiple inside hosts?",
    "options": [
      "source",
      "static",
      "pool",
      "overload"
    ],
    "answer": 3,
    "explanation": "By adding the keyword \"overload\" at the end of a NAT statement, NAT becomes PAT (Port Address\nTranslation). This is also a kind of dynamic NAT that maps multiple private IP addresses to a single public IP\naddress (many-to-one) by using different ports. Static NAT and Dynamic NAT both require a one-to-one\nmapping from the inside local to the inside global address. By using PAT, you can have thousands of users\nconnect to the Internet using only one real global IP address. PAT is the technology that helps us not run out\nof public IP address on the Internet. This is the most popular type of NAT.\nAn example of using \"overload\" keyword is shown below:\nR1(config)# ip nat inside source list 1 interface ethernet1 overload"
  },
  {
    "legacyIndex": 141,
    "legacyNumber": 4,
    "prompt": "Which type of address is the public IP address of a NAT device?",
    "options": [
      "outside global",
      "outside local",
      "inside global",
      "inside local",
      "outside public",
      "inside public"
    ],
    "answer": 2,
    "explanation": "NAT use four types of addresses:\n* Inside local address - The IP address assigned to a host on the inside network. The address is usually not\nan IP address assigned by the Internet Network Information Center (InterNIC) or service provider. This\n\naddress is likely to be an RFC 1918 private address.\n* Inside global address - A legitimate IP address assigned by the InterNIC or service provider that\nrepresents one or more inside local IP addresses to the outside world.\n* Outside local address - The IP address of an outside host as it is known to the hosts on the inside network.\n* Outside global address - The IP address assigned to a host on the outside network. The owner of the host\nassigns this address."
  },
  {
    "legacyIndex": 142,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. Router R1 is configured with static NAT. Addressing on the router and the web server are\ncorrectly configured, but there is no connectivity between the web server and users on the Internet. What is\na possible reason for this lack of connectivity?\n\n R1(config)# ip nat inside source static 192.168.11.254\n 209.165.200.1\n R1(config)#interface FastEthernet0/0\n R1(config-if)#ip nat inside\n R1(config-if)#interface Serial0/0/1\n R1(config-if)#ip nat outside",
    "options": [
      "The router NAT configuration has an incorrect inside local address",
      "The inside global address is incorrect",
      "The NAT configuration on interface S0/0/1 is incorrect.",
      "Interface Fa0/0 should be configured with the command ip nat outside"
    ],
    "answer": 0,
    "explanation": "The \"ip nat inside\" command was wrongly configured with inside local address of 192.168.11.254 while it\nshould be 192.168.11.11, which is the IP address of the web server."
  },
  {
    "legacyIndex": 143,
    "legacyNumber": 6,
    "prompt": "An engineer is configuring NAT to translate the source subnet of 10.10.0.0/24 to any one of three addresses:\n192.168.3.1, 192.168.3.2, or 192.168.3.3. Which configuration should be used?\n\n Option A:                                      Option B:\n enable                                         enable\n configure terminal                             configure terminal\n ip nat pool mypool 192.168.3.1 192.168.3.3     ip nat pool mypool 192.168.3.1 192.168.3.3\n prefix-length 30                               prefix-length 30\n route-map permit 10.10.0.0 255.255.255.0       access-list 1 permit 10.10.0.0 0.0.0.255\n ip nat outside destination list 1 pool mypool  ip nat outside destination list 1 pool mypool\n interface g1/1                                 interface g1/1\n ip nat inside                                  ip nat inside\n interface g1/2                                 interface g1/2\n ip nat outside                                 ip nat outside\n\n Option C:                                      Option D:\n enable                                         enable\n configure terminal                             configure terminal\n ip nat pool mypool 192.168.3.1 192.168.3.3     ip nat pool mypool 192.168.3.1 192.168.3.3\n prefix-length 30                               prefix-length 30\n access-list 1 permit 10.10.0.0 0.0.0.255       access-list 1 permit 10.10.0.0 0.0.0.254\n ip nat inside source list 1 pool mypool        ip nat inside source list 1 pool mypool\n interface g1/1                                 interface g1/1\n ip nat inside                                  ip nat inside\n interface g1/2                                 interface g1/2\n ip nat outside                                 ip nat outside",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": 2,
    "explanation": "The command \"ip nat inside source list 1 pool mypool\" (notice the keyword \"inside\", not \"outside\").\n\nThis command translates all source addresses that pass access list 1, which means a source address from\n10.10.0.0/24, into an address from the pool named mypool (the pool contains addresses from 192.168.3.1\nto 192.168.3.3).\n\n\n Quick review of NTP\n\n NTP uses the concept of a stratum to describe how many NTP hops away a machine is from an\n authoritative time source, usually a reference clock. A reference clock is a stratum 0 device that is\n assumed to be accurate and has little or no delay associated with it. Stratum 0 servers cannot be used\n on the network but they are directly connected to computers which then operate as stratum-1\n servers. A stratum 1 time server acts as a primary network time standard.\n\n A stratum 2 server is connected to the stratum 1 server; then a stratum 3 server is connected to the\n stratum 2 server and so on. A stratum 2 server gets its time via NTP packet requests from a stratum 1\n server. A stratum 3 server gets its time via NTP packet requests from a stratum-2 server... A stratum\n server may also peer with other stratum servers at the same level to provide more stable and robust\n time for all devices in the peer group (for example a stratum 2 server can peer with other stratum 2\n servers).\n\n - NTP is designed to synchronize the time on a network. NTP runs over the User Datagram Protocol\n (UDP), using port 123 as both the source and destination.\n - To configure a Cisco device as an Authoritative NTP Server, use the ntp master [stratum]\n command. An Authoritative NTP Server can distribute time even when it is not synchronized to an\n existing time server.\n - To configure the local device to use a remote NTP clock source, use the command ntp server <IP\n address>. For example: Router(config)#ntp server 192.168.1.1\n - The ntp authenticate command is used to enable the NTP authentication feature (NTP\n authentication is disabled by default).\n - The ntp trusted-key command specifies one or more keys that a time source must provide in its\n NTP packets in order for the device to synchronize to it. This command provides protection against\n accidentally synchronizing the device to a time source that is not trusted.\n - The ntp authentication-key defines the authentication keys. The device does not synchronize to a\n time source unless the source has one of these authentication keys and the key number is specified\n by the ntp trusted-key number command.\n - Two most popular commands to display time sources statistics: show ntp status and show ntp\n associations"
  },
  {
    "legacyIndex": 144,
    "legacyNumber": 1,
    "prompt": "Which command should you enter to configure a device as an NTP server?",
    "options": [
      "ntp server",
      "ntp peer",
      "ntp authenticate",
      "ntp master"
    ],
    "answer": 3,
    "explanation": "To configure a Cisco device as an Authoritative NTP Server, use the ntp master [stratum] command.\n\nTo configure a Cisco device as a NTP client, use the command ntp server <IP address>. For example:\nRouter(config)#ntp server 192.168.1.1. This command will instruct the router to query 192.168.1.1 for the\ntime."
  },
  {
    "legacyIndex": 145,
    "legacyNumber": 2,
    "prompt": "Which two pieces of information can you determine from the output of the show ntp status command?\n(Choose two)",
    "options": [
      "whether the NTP peer is statically configured",
      "the IP address of the peer to which the clock is synchronized",
      "the configured NTP servers",
      "whether the clock is synchronized",
      "the NTP version number of the peer"
    ],
    "answer": [
      1,
      3
    ],
    "type": "multi",
    "explanation": "Below is the output of the \"show ntp status\" command. From this output we learn that R1 has a stratum of\n10 and it is getting clock from 10.1.2.1.\n\n  R1#show ntp status\n  Clock is synchronized, stratum 10, reference is 10.1.2.1\n  nominal freq is 250.0000 Hz, actual freq is 249.9987 Hz, precision is 2**18\n  reference time is D5E492E9.98ACB4CF (13:00:25.596 CST Wed Sep 18 2013)\n  clock offset is 15.4356 msec, root delay is 52.17 msec\n  root dispersion is 67.61 msec, peer dispersion is 28.12 msec"
  },
  {
    "legacyIndex": 146,
    "legacyNumber": 3,
    "prompt": "Which two tasks must be performed to configure NTP to a trusted server in client mode on a single network\ndevice? (Choose two)",
    "options": [
      "Enable NTP authentication",
      "Verify the time zone",
      "Disable NTP broadcasts",
      "Specify the IP address of the NTP server",
      "Set the NTP server private key"
    ],
    "answer": [
      0,
      3
    ],
    "type": "multi",
    "explanation": "To configure authentication, perform this task in privileged mode:\n\nStep 1: Configure an authentication key pair for NTP and specify whether the key will be trusted or\nuntrusted.\nStep 2: Set the IP address of the NTP server and the public key.\nStep 3: Enable NTP client mode.\nStep 4: Enable NTP authentication.\nStep 5: Verify the NTP configuration."
  },
  {
    "legacyIndex": 147,
    "legacyNumber": 1,
    "prompt": "What will happen if you configure the logging trap debug command on a router?",
    "options": [
      "It causes the router to send messages with lower severity levels to the syslog server",
      "It causes the router to send all messages with the severity levels Warning, Error, Critical, and Emergency to the syslog server",
      "It causes the router to send all messages to the syslog server",
      "It causes the router to stop sending all messages to the syslog server"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 148,
    "legacyNumber": 2,
    "prompt": "If a notice-level messaging is sent to a syslog server, which event has occurred?",
    "options": [
      "A network device has restarted",
      "An ARP Inspection has failed",
      "A routing instance has flapped",
      "A debug operation is running"
    ],
    "answer": 2,
    "explanation": "Usually no action is required when a route flaps so it generates the notification syslog level message (level\n5)."
  },
  {
    "legacyIndex": 149,
    "legacyNumber": 3,
    "prompt": "What event has occurred if a router sends a notice level message to a syslog server?",
    "options": [
      "A TCP connection has been torn down",
      "An ICMP connection has been built",
      "An interface line has changed status",
      "A certificate has expired"
    ],
    "answer": 2,
    "explanation": "If you used to configure a Cisco device then maybe you saw this notice level message:\n\n %LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to\n down\n\nNumber 5 in the above message represents for the Notification Level (Normal, but significant, conditions\nexist).\nNote: If you are not sure about HSRP, please read our HSRP tutorial."
  },
  {
    "legacyIndex": 150,
    "legacyNumber": 1,
    "prompt": "Which command must you enter to guarantee that an HSRP router with higher priority becomes the HSRP\nprimary router after it is reloaded?",
    "options": [
      "standby 10 preempt",
      "standby 10 version 1",
      "standby 10 priority 150",
      "standby 10 version 2"
    ],
    "answer": 0,
    "explanation": "The \"preempt\" command enables the HSRP router with the highest priority to immediately become the active\nrouter."
  },
  {
    "legacyIndex": 151,
    "legacyNumber": 2,
    "prompt": "Which command should you enter to verify the priority of a router in an HSRP group?",
    "options": [
      "show hsrp",
      "show sessions",
      "show interfaces",
      "show standby"
    ],
    "answer": 3,
    "explanation": "Below is an example of the \"show standby\" command:\n\nWe can see the current HSRP priority of this device, which is 90 and the configured HSRP priority too (which\nis 90, too)."
  },
  {
    "legacyIndex": 152,
    "legacyNumber": 3,
    "prompt": "Which MAC address is recognized as a VRRP virtual address?",
    "options": [
      "0000.5E00.010a",
      "0005.3711.0975",
      "0000.0C07.AC99",
      "0007.C070.AB01"
    ],
    "answer": 0,
    "explanation": "With VRRP, the virtual router's MAC address is 0000.5E00.01xx , in which xx is the VRRP group"
  },
  {
    "legacyIndex": 153,
    "legacyNumber": 4,
    "prompt": "Which two outcomes are predictable behaviors for HSRP? (Choose two)",
    "options": [
      "The two routers share a virtual IP address that is used as the default gateway for devices on the LAN",
      "The two routers negotiate one router as the active router and the other as the standby router",
      "Each router has a different IP address both routers act as the default gateway on the LAN, and traffic is load balanced between them",
      "The two routers synchronize configurations to provide consistent packet forwarding",
      "The two routed share the same IP address, and default gateway traffic is load-balanced between them"
    ],
    "answer": [
      0,
      1
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 155,
    "legacyNumber": 6,
    "prompt": "What is the primary purpose of a First Hop Redundancy Protocol?",
    "options": [
      "It allows directly connected neighbors to share configuration information",
      "It allows a router to use bridge priorities to create multiple loop-free paths to a single destination",
      "It reduces routing failures by allowing Layer 3 load balancing between OSPF neighbors that have the same link metric",
      "It reduces routing failures by allowing more than one router to represent itself, as the default gateway of a network"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 156,
    "legacyNumber": 7,
    "prompt": "When the active router in an HSRP group fails, what router assumes the role and forwards packets?",
    "options": [
      "listening",
      "backup",
      "forwarding",
      "standby"
    ],
    "answer": 3,
    "explanation": "Standby router is backup when active router fails by monitoring periodic hellos sent by the active router\n(multicast to 224.0.0.2, UDP port 1985) to detect a failure of the active router.\nNote: If you are not sure about Access list, please read our Access List Tutorial."
  },
  {
    "legacyIndex": 157,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. A network engineer must block access for all computers on VLAN 20 to the web server\nvia HTTP. All other computers must be able to access the web server. Which configuration when applied to\nswitch A accomplishes this task?",
    "options": [
      "config t ip access-list extended wwwblock deny tcp any host 10.30.0.100 eq 80 int vlan 100 ip access-group wwwblock in",
      "config t ip access-list extended wwwblock deny tcp any host 10.30.0.100 eq 80 permit ip any any int vlan 20 ip access-group wwwblock in",
      "config t ip access-list extended wwwblock permit ip any any deny tcp any host 10.30.0.100 eq 80 int vlan 30 ip access-group wwwblock in",
      "config t ip access-list extended wwwblock deny tcp any host 10.30.0.100 eq 80 int vlan 20 ip access-group wwwblock in"
    ],
    "answer": 1,
    "explanation": "The \"deny tcp any host 10.30.0.100 eq 80\" command means \"block all (any) traffic from accessing web\nserver at 10.30.0.100 on port 80\". And since it is applied to VLAN 20 interface so only computers on VLAN 20\nare affected.\nIn summary, just notice that 10.30.0.100 here is the destination IP address, not source address.\nNote: The traffic flow from hosts in VLAN 20 to the Web Server is: host in VLAN 20 -> Interface VLAN 20 ->\nInterface VLAN 30 -> Web Server. If we place the ACL: host in VLAN 20 -> (ACL Inbound) Interface VLAN 20\n-> Interface VLAN 30 -> Web Server. Therefore the ACL can block traffic from VLAN 20."
  },
  {
    "legacyIndex": 158,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. An extended ACL has been configured and applied to router R2. The configuration failed\nto work as intended. Which two changes stop outbound traffic on TCP ports 25 and 80 to 10.0.20.0/26 from\nthe 10.0.10.0/26 subnet while still allowing all other traffic? (Choose two)\n\n R2#config t\n R2(config)#access-list 101 deny tcp 10.0.20.0 0.0.0.63 10.0.10.0 0.0.0.63 eq\n smtp\n R2(config)#access-list 101 deny tcp 10.0.20.0 0.0.0.63 10.0.10.0 0.0.0.63 eq\n www\n R2(config)#int gi0/2\n\n R2(config-if)#ip access-group 101 in",
    "options": [
      "Add a \"permit ip any any\" statement to the beginning of ACL 101 for allowed traffic",
      "Add a \"permit ip any any\" statement at the end of ACL 101 for allowed traffic",
      "The source and destination IPs must be swapped in ACL 101",
      "The ACL must be configured the Gi0/2 interface inbound on R1",
      "The ACL must be moved to the Gi0/1 interface outbound on R2"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 159,
    "legacyNumber": 3,
    "prompt": "While examining excessive traffic on the network, it is noted that all incoming packets on an interface appear\nto be allowed even though an IPv4 ACL is applied to the interface. Which two misconfigurations cause this\nbehavior? (Choose two)",
    "options": [
      "The packets fail to match any permit statement",
      "A matching permit statement is too high in the access list",
      "A matching permit statement is too broadly defined",
      "The ACL is empty",
      "A matching deny statement is too high in the access list"
    ],
    "answer": [
      1,
      3
    ],
    "type": "multi",
    "explanation": "If we have a matching permit statement too high in the access list then it will be matched first before we can\ndeny i -> Answer B is correct.\n\nThe statement that an ACL always has an implicit deny any at the bottom has one exception. And that\nexception is when the ACL is empty. If you use ip access-group to apply an ACL and that ACL has no\nstatements then all traffic is permitted -> Answer D is correct."
  },
  {
    "legacyIndex": 160,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. What configuration on R1 denies SSH access from PC-1 to any R1 interface and allows\nall other traffic?",
    "options": [
      "access-list 100 deny tcp host 172.16.1.33 any eq 22 access-list 100 permit ip any any interface GigabitEthernet0/0 ip access-group 100 in",
      "access-list 100 deny tcp host 172.16.1.33 any eq 22 access-list 100 permit ip any any",
      "line vty 0 15 access-class 100 in access-list 100 deny tcp host 172.16.1.33 any eq 23 access-list 100 permit ip any any interface GigabitEthernet0/0 ip access-group 100 in",
      "access-list 100 deny tcp host 172.16.1.33 any eq 23 access-list 100 permit ip any any line vty 0 15 access-class 100 in"
    ],
    "answer": 0,
    "explanation": "To deny SSH, we must block TCP port 22 and we need to apply the ACL to Gi0/0 interface (which connects to\nPC-1).\nNote: TCP port 23 is used for Telnet."
  },
  {
    "legacyIndex": 161,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. An administrator configures the following ACL in order to prevent devices on the\n192.168.1.0 subnet from accessing the server at 10.1.1.5:\n\n access-list 100 deny ip 192.168.1.0 0.0.0.255 host\n 10.1.1.5\n access-list 100 permit ip any any\n\nWhere should the administrator place this ACL for the most efficient use of network resources?",
    "options": [
      "inbound on router A Fa0/0",
      "outbound on router B Fa0/0",
      "outbound on router A Fa0/1",
      "inbound on router B Fa0/1"
    ],
    "answer": 0,
    "explanation": "By placing the ACL closest to the source, we can reduce unnecessary traffic passing between two routers and\nthe processing time of the router."
  },
  {
    "legacyIndex": 162,
    "legacyNumber": 6,
    "prompt": "Refer to the exhibit. Which two configurations would be used to create and apply a standard access list on\nR1, so that only the 10.0.70.0/25 network devices are allowed to access the internal database server?\n(Choose two)",
    "options": [
      "R1(config)# interface GigabitEthernet0/0 R1(config-if)# ip access-group 5 out",
      "R1(config)# access-list 5 permit 10.0.54.0 0.0.1.255",
      "R1(config)# interface Serial0/0/0 R1(config-if)# ip access-group 5 in",
      "R1(config)# access-list 5 permit 10.0.70.0 0.0.0.127",
      "R1(config)# access-list 5 permit any"
    ],
    "answer": [
      0,
      3
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 163,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit.\n\n  interface GigabitEthernet0/1\n    ip address 192.168.1.2 255.255.255.0\n    ip access-group 2699 in\n\n  !\n  access-list 2699 deny icmp any 10.10.1.0 0.0.0.255 echo\n  access-list 2699 deny ip any 10.20.1.0 0.0.0.255\n  access-list 2699 permit ip any 10.10.1.0 0.0.0.255\n  access-list 2699 permit tcp any 10.20.1.0 0.0.0.127 eq 22\nA network administrator must permit SSH access to remotely manage routers in a network. The operations\nteam resides on the 10.20.1.0/25 network. Which command will accomplish this task?",
    "options": [
      "access-list 2699 permit udp 10.20.1.0 0.0.0.255",
      "no access-list 2699 deny tcp any 10.20.1.0 0.0.0.127 eq 22",
      "access-list 2699 permit tcp any 10.20.1.0 0.0.0.255 eq 22",
      "no access-list 2699 deny ip any 10.20.1.0 0.0.0.255"
    ],
    "answer": 3,
    "explanation": "The operations team resides on 10.20.1.0/25 network which is a part of 10.20.1.0/24 network so we need to\nremove the \"deny\" statement of the 10.20.1.0/25 network to allow SSH.\nNote: the ACL is blocking the reply traffic so 10.20.1.0/25 should be the destination.\nIf you are not sure about AAA, please read our AAA TACACS+ and RADIUS Tutorial."
  },
  {
    "legacyIndex": 164,
    "legacyNumber": 1,
    "prompt": "AAA stands for authentication, authorization, and accounting.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 165,
    "legacyNumber": 2,
    "prompt": "Which effect does the aaa new-model configuration command have?",
    "options": [
      "It configures the device to connect to a RADIUS server for AAA.",
      "It configures a local user on the device.",
      "It associates to RADIUS server to an AAA group.",
      "It enables AAA services on the device."
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 166,
    "legacyNumber": 3,
    "prompt": "What is the primary difference between AAA authentication and authorization?",
    "options": [
      "Authentication verifies a username and password, and authorization handles the communication between the authentication agent and the user database",
      "Authentication identifies a user who is attempting to access a system, and authorization validates the users password",
      "Authentication identifies and verifies a user who is attempting to access a system, and authorization controls the tasks the user can perform",
      "Authentication controls the system processes a user can access and authorization logs the activities the user initiates"
    ],
    "answer": 2,
    "explanation": "AAA stands for Authentication, Authorization and Accounting.\n\n+ Authentication: Specify who you are (usually via login username & password)\n+ Authorization: Specify what actions you can do, what resource you can access\n+ Accounting: Monitor what you do, how long you do it (can be used for billing and auditing)\n\nAn example of AAA is shown below:\n\n+ Authentication: \"I am a normal user. My username/password is user_tom/learnforever\"\n+ Authorization: \"user_tom can access LearnCCNA server via HTTP and FTP\"\n+ Accounting: \"user_tom accessed LearnCCNA server for 2 hours\". This user only uses \"show\" commands."
  },
  {
    "legacyIndex": 167,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. Which password must an engineer use to enter the enable mode?\n\n Atlanta#config t\n Atlanta(config)#aaa new-model\n Atlanta(config)#aaa authentication login default local\n Atlanta(config)#line vty 0 4\n Atlanta(config-line)#login authentication default\n Atlanta(config-line)#exit\n Atlanta(config)#username ciscoadmin password\n adminadmin123\n Atlanta(config)#username ciscoadmin privilege 15\n Atlanta(config)#enable password cisco123\n Atlanta(config)#enable secret testing1234\n Atlanta(config)#end",
    "options": [
      "adminadmin123",
      "default",
      "testing1234",
      "cisco123"
    ],
    "answer": 2,
    "explanation": "If neither the enable password command nor the enable secret command is configured, and if there is a line\npassword configured for the console, the console line password serves as the enable password for all VTY\nsessions -> The \"enable secret\" will be used first if available, then \"enable password\" and line password."
  },
  {
    "legacyIndex": 168,
    "legacyNumber": 5,
    "prompt": "What is a difference between RADIUS and TACACS+?",
    "options": [
      "RADIUS is most appropriate for dial authentication, but TACACS+ can be used for multiple types of authentication",
      "TACACS+ encrypts only password information and RADIUS encrypts the entire payload",
      "TACACS+ separates authentication and authorization, and RADIUS merges them",
      "RADIUS logs all commands that are entered by the administrator, but TACACS+ logs only start, stop, and interim commands"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 169,
    "legacyNumber": 6,
    "prompt": "How do AAA operations compare regarding user identification, user services and access control?",
    "options": [
      "Authorization provides access control and authentication tracks user services",
      "Authentication identifies users and accounting tracks user services",
      "Accounting tracks user services, and authentication provides access control",
      "Authorization identifies users and authentication provides access control"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 170,
    "legacyNumber": 1,
    "prompt": "An email user has been lured into clicking a link in an email sent by their company's security organization.\nThe webpage that opens reports that it was safe but the link could have contained malicious code. Which\ntype of security program is in place?",
    "options": [
      "Physical access control",
      "Social engineering attack",
      "brute force attack",
      "user awareness"
    ],
    "answer": 3,
    "explanation": "This is a training program which simulates an attack, not a real attack (as it says \"The webpage that opens\nreports that it was safe\") so we believed it should be called a \"user awareness\" program. Therefore the best\nanswer here should be \"user awareness\". This is the definition of \"User awareness\" from CCNA 200-301\nOffical Cert Guide Book:\n\n\"User awareness: All users should be made aware of the need for data confidentiality to protect corporate\n\ninformation, as well as their own credentials and personal information. They should also be made aware of\npotential threats, schemes to mislead, and proper procedures to report security incidents. \"\n\nNote: Physical access control means infrastructure locations, such as network closets and data centers,\nshould remain securely locked."
  },
  {
    "legacyIndex": 171,
    "legacyNumber": 2,
    "prompt": "An engineer is asked to protect unused ports that are configured in the default VLAN on a switch. Which two\nsteps will fulfill the request? (Choose two)",
    "options": [
      "Configure the ports in an EtherChannel",
      "Administratively shut down the ports",
      "Configure the port type as access and place in VLAN 99",
      "Configure the ports as trunk ports",
      "Enable the Cisco Discovery Protocol"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 172,
    "legacyNumber": 3,
    "prompt": "Which configuration is needed to generate an RSA key for SSH on a router?",
    "options": [
      "Configure the version of SSH",
      "Configure VTY access",
      "Create a user with a password",
      "Assign a DNS domain name"
    ],
    "answer": 3,
    "explanation": "In order to generate an RSA key for SSH, we need to configure the hostname and a DNS domain name on\nthe router (a username and password is also required). Therefore in fact both answer C and answer D are\ncorrect."
  },
  {
    "legacyIndex": 173,
    "legacyNumber": 4,
    "prompt": "Which two conditions must be met before SSH can operate normally on a Cisco IOS switch? (Choose two)",
    "options": [
      "The switch must be running a k9 (crypto) IOS image",
      "The ip domain-name command must be configured on the switch",
      "IP routing must be enabled on the switch",
      "A console password must be configured on the switch",
      "Telnet must be disabled on the switch"
    ],
    "answer": [
      0,
      1
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 174,
    "legacyNumber": 5,
    "prompt": "When a site-to-site VPN is used, which protocol is responsible for the transport of user data?",
    "options": [
      "IKEv2",
      "IKEv1",
      "IPsec",
      "MD5"
    ],
    "answer": 2,
    "explanation": "A site-to-site VPN allows offices in multiple fixed locations to establish secure connections with each other\nover a public network such as the Internet. A site-to-site VPN means that two sites create a VPN tunnel by\nencrypting and sending data between two devices. One set of rules for creating a site-to-site VPN is defined\nby IPsec.\n\nIn the topology above, Remote Campus sites can connect to the Main Campus through site-to-site VPNs."
  },
  {
    "legacyIndex": 175,
    "legacyNumber": 6,
    "prompt": "Which set of action satisfy the requirement for multi-factor authentication?",
    "options": [
      "The user swipes a key fob, then clicks through an email link",
      "The user enters a user name and password, and then clicks a notification in an authentication app on a mobile device",
      "The user enters a PIN into an RSA token, and then enters the displayed RSA key on a login screen",
      "The user enters a user name and password and then re-enters the credentials on a second screen"
    ],
    "answer": 1,
    "explanation": "This is an example of how two-factor authentication (2FA) works:\n\n1. The user logs in to the website or service with their username and password.\n2. The password is validated by an authentication server and, if correct, the user becomes eligible for the\nsecond factor.\n3. The authentication server sends a unique code to the user's second-factor method (such as a smartphone\napp).\n4. The user confirms their identity by providing the additional authentication for their second-factor method."
  },
  {
    "legacyIndex": 176,
    "legacyNumber": 7,
    "prompt": "Which command prevents passwords from being stored in the configuration as plaintext on a router or\nswitch?",
    "options": [
      "enable secret",
      "service password-encryption",
      "username Cisco password encrypt",
      "enable password"
    ],
    "answer": 1,
    "explanation": "\"enable secret\" is the password that will be used to switch from User Exec mode to Priv Exec mode and it is\n\nalways encrypted. It does not \"prevent passwords from being stored in the configuration as plaintext\" so this\nanswer is not correct."
  },
  {
    "legacyIndex": 177,
    "legacyNumber": 8,
    "prompt": "Refer to the exhibit. An administrator configures four switches for local authentication using passwords that\nare stored in a cryptographic hash. The four switches must also support SSH access for administrators to\nmanage the network infrastructure. Which switch is configured correctly to meet these requirements?\n\n SW1(config-line)#line vty 0 15\n SW1(config-line)#no login local\n SW1(config-line)#password cisco\n\n SW2(config)#username admin1 password\n abcd1234\n SW2(config)#username admin2 password\n abcd1234\n SW2(config-line)#line vty 0 15\n SW2(config-line)#login local\n\n SW3(config)#username admin1 secret abcd1234\n SW3(config)#username admin2 secret abcd1234\n SW3(config-line)#line vty 0 15\n SW3(config-line)#login local\n\n SW4(config)#username admin1 password\n abcd1234\n SW4(config)#username admin2 password\n abcd1234\n SW4(config-line)#line console 0\n SW4(config-line)#login local",
    "options": [
      "SW1",
      "SW2",
      "SW3",
      "SW4"
    ],
    "answer": 2,
    "explanation": "The \"login local\" command instructs the device to use the username and password in its local database for\nauthentication. The secret is encrypted when it is stored on the local router."
  },
  {
    "legacyIndex": 178,
    "legacyNumber": 9,
    "prompt": "The service password-encryption command is entered on a router. What is the effect of this configuration?",
    "options": [
      "restricts unauthorized users from viewing clear-text passwords in the running configuration",
      "prevents network administrators from configuring clear-text passwords",
      "protects the VLAN database from unauthorized PC connections on the switch",
      "encrypts the password exchange when a VPN tunnel is established"
    ],
    "answer": 0,
    "explanation": "The service password-encryption command will encrypt all current and future passwords so any password\nexisted in the configuration will be encrypted.\nNote: With the \"service password-encryption\" command, administrators can still configure clear-text\npasswords but they will be encrypted in the configuration file. So we cannot say \"prevents network\nadministrators from configuring clear-text passwords\"."
  },
  {
    "legacyIndex": 179,
    "legacyNumber": 10,
    "prompt": "In which two ways does a password manager reduce the chance of a hacker stealing a user's password?\n(Choose two)",
    "options": [
      "It automatically provides a second authentication factor that is unknown to the original user",
      "It uses an internal firewall to protect the password repository from unauthorized access",
      "It protects against keystroke logging on a compromised device or web site",
      "It stores the password repository on the local workstation with built-in antivirus and anti-malware functionality",
      "It encourages users to create stronger passwords"
    ],
    "answer": [
      2,
      4
    ],
    "type": "multi",
    "explanation": "A password manager only helps you remember your chosen passwords without typing them by yourself. It\nautomatically fills into the password textbox for you so it does not provides a second authentication factor.\nAn example of second authentication factor is an one time password (OTP) sent to your phone after typing\nyour password and you have to type this OTP to authenticate.\nBy using a password manager, you are encouraged to create a complex password because you don't need to\nremember it."
  },
  {
    "legacyIndex": 180,
    "legacyNumber": 11,
    "prompt": "What are two purposes of launching a reconnaissance attack on a network? (Choose two)",
    "options": [
      "to prevent other users from accessing the system",
      "to escalate access privileges",
      "to gather information about the network and devices",
      "to scan for accessibility",
      "to retrieve and modify data"
    ],
    "answer": [
      2,
      3
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 181,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. An engineer booted a new switch and applied this configuration via the console port.\nWhich additional configuration must be applied to allow administrators to authenticate directly to enable\nprivilege mode via Telnet using local username and password?\n\n Switch(config)#hostname R1\n R1(config)#interface FastEthernet0/1\n R1(config-if)#no switchport\n R1(config-if)#ip address 10.100.20.42\n 255.255.255.0\n R1(config-if)#line vty 0 4\n R1(config-line)#login",
    "options": [
      "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234",
      "R1(config)#username admin R1(config-if)#line vty 0 4 R1(config-line)#password p@ss1234 R1(config-line)#transport input telnet",
      "R1(config)#username admin secret p@ss1234 R1(config-if)#line vty 0 4 R1(config-line)#login local R1(config)#enable secret p@ss1234",
      "R1(config)#username admin privilege 15 secret p@ss1234 R1(config-if)#line vty 0 4 R1(config-line)#login local"
    ],
    "answer": 3,
    "explanation": "With \"login local\" command, the router will use the local username and password for authentication. And we\nassigned the highest privilege level of 15 for this user so we are put into privilege mode automatically (R1#)."
  },
  {
    "legacyIndex": 182,
    "legacyNumber": 2,
    "prompt": "An organization secures its network with multi-factor authentication using an authenticator app on employee\nsmartphones. How is the application secured in the case of a user's smartphone being lost or stolen?",
    "options": [
      "The application requires an administrator password to reactivated after a configured interval.",
      "The application verifies that the user is in a specific location before it provides the second factor.",
      "The application requires the user to enter a PIN before it provides the second factor.",
      "The application challenges a user by requiring an administrator password to reactivate when the smartphone is rebooted."
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 183,
    "legacyNumber": 3,
    "prompt": "Which type of attack can be mitigated by dynamic ARP inspection?",
    "options": [
      "malware",
      "DDoS",
      "worm",
      "man-in-the-middle"
    ],
    "answer": 3,
    "explanation": "ARP attack (like ARP poisoning/spoofing, man-in-the-middle) is a type of attack in which a malicious actor\nsends falsified ARP messages over a local area network as ARP allows a gratuitous reply from a host even if\nan ARP request was not received. This results in the linking of an attacker's MAC address with the IP address\nof a legitimate computer or server on the network. This is an attack based on ARP which is at Layer 2.\nDynamic ARP inspection (DAI) is a security feature that validates ARP packets in a network which can be\nused to mitigate this type of attack."
  },
  {
    "legacyIndex": 184,
    "legacyNumber": 4,
    "prompt": "Which technology is used to improve web traffic performance by proxy caching?",
    "options": [
      "Firepower",
      "FireSIGHT",
      "ASA",
      "WSA"
    ],
    "answer": 3,
    "explanation": "The Web Security appliance (WSA) intercepts requests that are forwarded to it by clients or other devices\nover the network. Proxy caching is a setting in WSA that caches data to increase performance."
  },
  {
    "legacyIndex": 185,
    "legacyNumber": 5,
    "prompt": "Which device performs stateful inspection of traffic?",
    "options": [
      "access point",
      "switch",
      "wireless controller",
      "firewall"
    ],
    "answer": 3,
    "explanation": "In stateful inspection, the firewall not only inspects packets up through the application layer/layer7\ndetermining a packet's header information and data content, but also monitors and keeps track of the\nconnection's state. For all active connections traversing the firewall, the state information, which may include\nIP addresses and ports involved, the sequence numbers and acknowledgement numbers of the packets\ntraversing the connection, TCP packet flags, etc. is maintained in a state table."
  },
  {
    "legacyIndex": 186,
    "legacyNumber": 6,
    "prompt": "What are two recommendations for protecting network ports from being exploited when located in an office\nspace outside of an IT closet? (Choose two)",
    "options": [
      "shut down unused ports",
      "enable the PortFast feature on ports",
      "implement port-based authentication",
      "configure ports to a fixed speed",
      "configure static ARP entries"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 187,
    "legacyNumber": 7,
    "prompt": "What is a practice that protects a network from VLAN hopping attacks?",
    "options": [
      "Change native VLAN to an unused VLAN ID",
      "Enable dynamic ARP inspection",
      "Configure an ACL to prevent traffic from changing VLANs",
      "Implement port security on internet-facing VLANs"
    ],
    "answer": 0,
    "explanation": "VLAN Hopping: By altering the VLAN ID on packets encapsulated for trunking, an attacking device can send\nor receive packets on various VLANs, bypassing Layer 3 security measures. VLAN hopping can be\naccomplished by switch spoofing or double tagging. One of a popular type of VLAN Hopping is\nDouble-Tagging attack:\n\nIn this attack, the attacking computer generates frames with two 802.1Q tags. The first tag matches the\nnative VLAN of the trunk port (VLAN 10 in this case), and the second matches the VLAN of a host it wants to\nattack (VLAN 20).\nWhen the packet from the attacker reaches Switch A, Switch A only sees the first VLAN 10 and it matches\nwith its native VLAN 10 so this VLAN tag is removed. Switch A forwards the frame out all links with the same\nnative VLAN 10. Switch B receives the frame with an tag of VLAN 20 so it removes this tag and forwards out\nto the Victim computer.\nNote: This attack only works if the trunk (between two switches) has the same native VLAN as the attacker.\nIn other words, this attack is only successful if the attacker belongs to the native VLAN of the trunk link.\nAnother important point is, this attack is strictly one way as it is impossible to encapsulate the return packet.\nTo mitigate this type of attack, we can use VLAN access control lists (VACLs, which applies to all traffic within\na VLAN. We can use VACL to drop attacker traffic to specific victims/servers); or implement Private VLANs; or\nkeep the native VLAN of all trunk ports different from user VLANs."
  },
  {
    "legacyIndex": 188,
    "legacyNumber": 8,
    "prompt": "Which technology can prevent client devices from arbitrarily connecting to the network without state\nremediation?",
    "options": [
      "MAC Authentication Bypass",
      "IP Source Guard",
      "802.1x",
      "802.11n"
    ],
    "answer": 2,
    "explanation": "The IEEE 802.1x standard defines a client-server-based access control and authentication protocol that\nprevents unauthorized clients from connecting to a LAN through publicly accessible ports unless they are\nproperly authenticated. The authentication server authenticates each client connected to a switch port before\nmaking available any services offered by the switch or the LAN. Until the client is authenticated, 802.1x\naccess control allows only Extensible Authentication Protocol over LAN (EAPOL), Cisco Discovery Protocol\n(CDP), and Spanning Tree Protocol (STP) traffic through the port to which the client is connected. After\nauthentication is successful, normal traffic can pass through the port.\nestion 1\nRefer to the exhibit. What is the effect of this configuration?\n\n  ip arp inspection vlan 2\n  interface fastethernet 0/1\n\n    switchport mode access\n    switchport access vlan 2\n\nA. All ARP packets are dropped by the switch\nB. Egress traffic is passed only if the destination is a DHCP server.\nC. All ingress and egress traffic is dropped because the interface is untrusted\nD. The switch discard all ingress ARP traffic with invalid MAC-to-IP address bindings\n\nAnswer: D\nExplanation\nDynamic ARP inspection is an ingress security feature; it does not perform any egress checking."
  },
  {
    "legacyIndex": 189,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. What is the effect of this configuration?\n\n  ip arp inspection vlan 2\n  interface fastethernet 0/1\n\n    switchport mode access\n    switchport access vlan 2",
    "options": [
      "The switch port interface trust state becomes untrusted",
      "The switch port remains administratively down until the interface is connected to another switch",
      "Dynamic ARP inspection is disabled because the ARP ACL is missing",
      "The switch port remains down until it is configured to trust or untrust incoming packets"
    ],
    "answer": 0,
    "explanation": "Dynamic ARP inspection (DAI) is a security feature that validates ARP packets in a network. It intercepts,\nlogs, and discards ARP packets with invalid IP-to-MAC address bindings. This capability protects the network\nfrom certain man-in-the-middle attacks. After enabling DAI, all ports become untrusted ports.\nNote: If you are not sure about IPv6, please read our IPv6 tutorial."
  },
  {
    "legacyIndex": 190,
    "legacyNumber": 1,
    "prompt": "Which command is used to configure an IPv6 static default route?",
    "options": [
      "ipv6 route ::/0 interface next-hop",
      "ipv6 route default interface next-hop",
      "ipv6 route 0.0.0.0/0 interface next-hop",
      "ip route 0.0.0.0/0 interface next-hop"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 191,
    "legacyNumber": 2,
    "prompt": "Which command verifies whether any IPv6 ACLs are configured on a router?",
    "options": [
      "show ipv6 interface",
      "show access-list",
      "show ipv6 access-list",
      "show ipv6 route"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 192,
    "legacyNumber": 3,
    "prompt": "Refer to the exhibit. The New York router is configured with static routes pointing to the Atlanta and\nWashington sites. Which two tasks must be performed so that the Serial0/0/0 interfaces on the Atlanta and\nWashington routers can reach one another? (Choose two)\n\nConfigured interfaces:\n\nAtlanta:                New York:            Washington:\nS0/0/0: 2012::1/126     S0/0/0: 2012::2/126  S0/0/0: 2023::3/126\nLoopback1:              S0/0/1: 2023::2/126  Loopback3:\n2000::1/128             Loopback2:2000::2/1  2000::3/128\n                        28",
    "options": [
      "Configure the ipv6 route 2012::/126 2023::1 command on the Washington router",
      "Configure the ipv6 route 2023::/126 2012::1 command on the Atlanta router",
      "Configure the ipv6 route 2012::/126 s0/0/0 command on the Atlanta router",
      "Configure the ipv6 route 2023::/126 2012::2 command on the Atlanta router",
      "Configure the ipv6 route 2012::/126 2023:2 command on the Washington router"
    ],
    "answer": [
      3,
      4
    ],
    "type": "multi",
    "explanation": "The short syntax of static IPv6 route is:\n\nipv6 route <destination-IPv6-address> {next-hop-IPv6-address | exit-interface}"
  },
  {
    "legacyIndex": 193,
    "legacyNumber": 4,
    "prompt": "Refer to exhibit. An engineer is configuring the New York router to reach the Lo1 interface of the Atlanta\nrouter using interface S0/0/0 as the primary path. Which two commands must be configured on the New\nYork router so that it can reach the Lo1 interface of the Atlanta router via Washington when the link between\nNew York and Atlanta goes down? (Choose two)\n\nConfigured interfaces:\n\nAtlanta:             New York:            Washington:\nS0/0/0: 2012::1/126  S0/0/0: 2012::2/126  S0/0/0: 2023::3/126\nS0/0/1: 2013::1/126  S0/0/1: 2023::2/126  S0/0/1: 2013::3/126\nLoopback1:           Loopback2:2000::2/1  Loopback3:\n2000::1/128          28                   2000::3/128",
    "options": [
      "ipv6 route 2000::1/128 2012::1",
      "ipv6 route 2000::1/128 2012::1 5",
      "ipv6 route 2000::1/128 2012::2",
      "ipv6 route 2000::1/128 2023::2 5",
      "ipv6 route 2000::1/128 2023::3 5"
    ],
    "answer": [
      0,
      4
    ],
    "type": "multi",
    "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative\ndistance (AD) of another static route or dynamic routes. By default a static route has an AD of 1 then floating\nstatic route must have the AD greater than 1. Floating static route has a manually configured administrative\ndistance greater than that of the primary route and therefore would not be in the routing table until the\nprimary route fails."
  },
  {
    "legacyIndex": 194,
    "legacyNumber": 5,
    "prompt": "Which IPv6 address type provides communication between subnets and cannot route on the Internet?",
    "options": [
      "global unicast",
      "unique local",
      "link-local",
      "multicast"
    ],
    "answer": 1,
    "explanation": "A IPv6 Unique Local Address is an IPv6 address in the block FC00::/7. It is the approximate IPv6 counterpart\nof the IPv4 private address. It is not routable on the global Internet.\n\nNote: In the past, Site-local addresses (FEC0::/10) are equivalent to private IP addresses in IPv4 but now\nthey are deprecated.\n\nLink-local addresses only used for communications within the local subnet. It is usually created dynamically\nusing a link-local prefix of FE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address)."
  },
  {
    "legacyIndex": 195,
    "legacyNumber": 6,
    "prompt": "Which command automatically generates an IPv6 address from a specified IPv6 prefix and MAC address of an\ninterface?",
    "options": [
      "ipv6 address dhcp",
      "ipv6 address 2001:068:5:112::64 eui-64",
      "ipv6 address autoconfig",
      "ipv6 address 2001:068:5:112:2/64 link-local"
    ],
    "answer": 2,
    "explanation": "The \"ipv6 address autoconfig\" command causes the device to perform IPv6 stateless address auto-\nconfiguration to discover prefixes on the link and then to add the EUI-64 based addresses to the interface.\nAddresses are configured depending on the prefixes received in Router Advertisement (RA) messages. The\ndevice will listen for RA messages which are transmitted periodically from the router (DHCP Server). This RA\nmessage allows a host to create a global IPv6 address from:\n+ Its interface identifier (EUI-64 address)\n+ Link Prefix (obtained via RA)\nNote: Global address is the combination of Link Prefix and EUI-64 address\nAlthough answer B seems to be correct but it is missing the prefix-length /64:"
  },
  {
    "legacyIndex": 196,
    "legacyNumber": 7,
    "prompt": "Which IPv6 address block sends packets to a group address rather than a single address?\nOR\nWhich IPv6 address block forwards packets to a multicast address rather than a unicast address?",
    "options": [
      "2000::/3",
      "FC00::/7",
      "FE80::/10",
      "FF00::/12"
    ],
    "answer": 3,
    "explanation": "Well-known multicast addresses have the prefix ff00::/12.\nFE80::/10 range is used for link-local addresses. Link-local addresses only used for communications within\nthe local subnetwork (automatic address configuration, neighbor discovery, router discovery, and by many\nrouting protocols). It is only valid on the current subnet. It is usually created dynamically using a link-local\nprefix of FE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address)."
  },
  {
    "legacyIndex": 197,
    "legacyNumber": 8,
    "prompt": "When configuring IPv6 on an interface, which two IPv6 multicast groups are joined? (Choose two)",
    "options": [
      "2000::/3",
      "2002::5",
      "FC00::/7",
      "FF02::1",
      "FF02::2"
    ],
    "answer": [
      3,
      4
    ],
    "type": "multi",
    "explanation": "When an interface is configured with IPv6 address, it automatically joins the all nodes (FF02::1) and\nsolicited-node (FF02::1:FFxx:xxxx) multicast groups. The all-node group is used to communicate with all\ninterfaces on the local link, and the solicited-nodes multicast group is required for link-layer address\nresolution. Routers also join a third multicast group, the all-routers group (FF02::2)."
  },
  {
    "legacyIndex": 198,
    "legacyNumber": 9,
    "prompt": "Which action must be taken to assign a global unicast IPv6 address on an interface that is derived from the\nMAC address of that interface?",
    "options": [
      "configure a stateful DHCPv6 server on the network",
      "enable SLAAC on an interface",
      "disable the EUI-64 bit process",
      "explicitly assign a link-local address"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 199,
    "legacyNumber": 10,
    "prompt": "What is the expected outcome when an EUI-64 address is generated?",
    "options": [
      "The seventh bit of the original MAC address of the interface is inverted",
      "The interface ID is configured as a random 64-bit value",
      "The characters FE80 are inserted at the beginning of the MAC address of the interface",
      "The MAC address of the interface is used as the interface ID without modification"
    ],
    "answer": 0,
    "explanation": "The IPv6 EUI-64 format address is obtained through the 48-bit MAC address. The MAC address is first\nseparated into two 24-bits, with one being OUI (Organizationally Unique Identifier) and the other being NIC\nspecific. The 16-bit 0xFFFE is then inserted between these two 24-bits to for the 64-bit EUI address. IEEE\nhas chosen FFFE as a reserved value which can only appear in EUI-64 generated from the an EUI-48 MAC\naddress -> Answer C and answer D are not correct.\n\nLet's take an example of the MAC address of C601.420F.0007. This MAC address is divided into two 24-bit\nparts, which are \"C60142\" (OUI) and \"0F0007\" (NIC). Then \"FFFE\" is inserted in the middle. Therefore we\nhave the address: C601.42FF.FE0F.0007.\n\nThen, according to the RFC 3513 we need to invert the Universal/Local bit (\"U/L\" bit) in the 7th position of\nthe first octet. The \"u\" bit is set to 1 to indicate Universal, and it is set to zero (0) to indicate local scope. In\nthis case we don't need to set this bit to 1 because it is already 1 (C6 = 11000110).\n\nTherefore with the subnet of 2001:DB8:0:1::/64, the full IPv6 address is\n2001:DB8:0:1:C601:42FF:FE0F:7/64"
  },
  {
    "legacyIndex": 200,
    "legacyNumber": 11,
    "prompt": "Which type of IPv6 address is publicly routable in the same way as IPv4 public addresses?",
    "options": [
      "multicast",
      "unique local",
      "link-local",
      "global unicast"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 201,
    "legacyNumber": 12,
    "prompt": "Refer to exhibit. The loopback1 interface of the Atlanta router must reach the loopback3 interface of the\nWashington router. Which two static host routes must be configured on the NEW York router? (Choose two)\n\nConfigured interfaces:\n\nAtlanta:                New York:            Washington:\nS0/0/0: 2012::1/126     S0/0/0: 2012::2/126  S0/0/0: 2023::3/126\nLoopback1:              S0/0/1: 2023::2/126  Loopback3:\n2000::1/128             Loopback2:2000::2/1  2000::3/128\n                        28",
    "options": [
      "ipv6 route 2000::1/128 2012::1",
      "ipv6 route 2000::3/128 2023::3",
      "ipv6 route 2000::3/128 s0/0/0",
      "ipv6 route 2000::1/128 2012::2",
      "ipv6 route 2000::1/128 s0/0/1"
    ],
    "answer": [
      0,
      1
    ],
    "type": "multi",
    "explanation": "The short syntax of static IPv6 route is:\n\nipv6 route <destination-IPv6-address> {next-hop-IPv6-address | exit-interface}\n\nTherefore if we use the destination-IPv6-address, we have to specify the IPv6 address of the remote (next-\nhop) router, not the local IPv6 address. If we use the exit-interface, we have to use the local exit-interface,\nnot remote interface.\n\nIn this question, we have to suppose that all IPv6 addresses of Atlanta ends with .1 and Washington ends\nwith .3\n\nPlease notice that this question asks about the command used on NEW York router so answer A is used to\nreach Atlanta router while answer B is used to reach Washington router."
  },
  {
    "legacyIndex": 202,
    "legacyNumber": 13,
    "prompt": "Which IPv6 address block forwards packets to a multicast address rather than a unicast address?",
    "options": [
      "FE80::/10",
      "FC00::/7",
      "2000::/3",
      "FF00::/12"
    ],
    "answer": 3,
    "explanation": "Well-known multicast addresses have the prefix ff00::/12."
  },
  {
    "legacyIndex": 203,
    "legacyNumber": 14,
    "prompt": "Refer to the exhibit. An engineer configured the New York router with static routes that point to the Atlanta\nand Washington sites. Which command must be configured on the Atlanta and Washington routers so that\nboth sites are able to reach the loopback2 interface on the New York router?\n\nConfigured router IPv6 interfaces:\n\nAtlanta:                    New York:            Washington:\nS0/0/0: 2012::1/126         S0/0/0: 2012::2/126  S0/0/0: 2023::3/126\nLoopback1:                  S0/0/1: 2023::2/126  Loopback3:\n2000::1/128                 Loopback2:2000::2/1  2000::3/128\n                            28",
    "options": [
      "ip route 0.0.0.0.0.0.0.0 Serial 0/0/0",
      "ipv6 route 0/0 Serial 0/0/0",
      "ipv6 route ::/0 Serial 0/0/0",
      "ipv6 route ::/0 Serial 0/0/1",
      "ipv6 route ::/0 2000::2"
    ],
    "answer": 2,
    "explanation": "The short syntax of static IPv6 route is:\nipv6 route <destination-IPv6-address> {next-hop-IPv6-address | exit-interface}\n\nTherefore we must configure exit interfaces on Atlanta and Washington routers (their S0/0/0 interfaces) or\nthe next hop IPv6 addresses (which are the IPv6 addresses of S0/0/0 - 2012::2 for Atlanta side and S0/0/1\n2023::2 for Washington side).\n\nNote: In an access list, 0.0.0.0/0 is \"all possible IPv4 addresses\" while ::/0 is the IPv6 equivalent of that.\n\nuestion 1\nWhat are two roles of Domain Name Services (DNS)? (Choose two)\nA. enables applications to identify resources by name instead of IP address\nB. allows a single host name to be shared across more than one IP address\nC. improves security by protecting IP addresses under Fully Qualified Domain Names (FQDNs)\nD. builds a flat structure of DNS names for more efficient IP operations\nE. encrypts network traffic as it travels across a WAN by default\n\nAnswer: A B\n\nExplanation\n\nAn example of DNS is described below:\n\nWhen you attempt to go to a domain name such as 9tut.com, your browser will instruct your computer to do\na DNS lookup on that domain name. This DNS lookup will query a DNS resolver (for example Google at\n8.8.8.8). Once the resolver responds, the computer will usually choose the first IP in the response and use\nthat for the connection. In the case of multiple IP addresses, the DNS server will respond with multiple IP\naddresses and the first IP will usually be used for the request. Due to how most DNS resolvers work, the\norder of IP addresses usually changes for each request."
  },
  {
    "legacyIndex": 204,
    "legacyNumber": 2,
    "prompt": "Which command must be present in a Cisco Device configuration to enable the device to resolve an FQDN?",
    "options": [
      "ip host",
      "ip name-server",
      "ip domain-lookup",
      "ip domain-name"
    ],
    "answer": 2,
    "explanation": "FQDN stands for Fully Qualified Domain Name. The FQDN represents the absolute address of the internet\npresence. \"Fully qualified\" refers to the unique identification that guarantees that all of the domain levels are\nspecified. The FQDN contains the host name and domain, including the top level domain, and can be uniquely\nassigned to an IP address. For example:\n\nR1.9tut.com.\n\nThe command \"ip domain-lookup\" enables DNS-based host name-to-address translation. This command is\nenabled by default."
  },
  {
    "legacyIndex": 206,
    "legacyNumber": 4,
    "prompt": "How does a router behave when configured with the default DNS lookup settings, and a URL is entered on\nthe CLI?",
    "options": [
      "prompts the user to specify the desired IP address.",
      "initiates a ping request to the URL.",
      "continuously attempts to resolve the URL until the command is cancelled.",
      "attempts to query a DNS server on the network."
    ],
    "answer": 3,
    "explanation": "By default, domain lookup function is enabled on the router so it treats every unrecognized command as a\nhostname, attempts to make a telnet connection to that which, in turn, attempts to resolve a hostname to IP\naddress by querying the DNS server.\nHere is a typical sample.\nR1#xyz\nTranslating \"xyz\"...domain server (255.255.255.255)\nTranslating \"xyz\"...domain server (255.255.255.255) (255.255.255.255)\nTranslating \"xyz\"...domain server (255.255.255.255)\n% Unknown command or computer name, or unable to find computer address\n\nNote: In order to save some time we can disable DNS lookup by the \"no ip domain lookup\" global command.\n\n QoS quick summary\n\n Quality of Service (QoS) allows you to define what is the treatment a specific packet will have during congestion.\n packets to drop, which should be stored and sent later, and which must be sent immediately.\n\n 1. Network factors:\n + Bandwidth: the speed of the link (or the capacity available on the link), usually measured in bits per second (bp\n + Delay (or latency): how long a packet takes to get from the sender to the receiver. The more the delay, the slowe\n usually measured in milliseconds (ms)\n + Jitter: A measure of the variation in delay between packets. For example, one packet need 50ms to reach B from\n takes 40ms then the jitter is 10ms\n + Loss: When packets travels to the destination, some of them may get lost.\n\n 2. QoS Markings:\n + IP Precedence: The first three bits of the IP ToS field (8 traffic classes)\n + Differentiated Service Code Point (DSCP): The first six bits of the IP ToS are used to provide granular classific\n\n 3. QoS Models:\n + Best Effort: No QoS policies applied\n + Differentiated Services (DiffServ): Packets are classified and marked individually; policy decisions are made in\n in a path.\n + Integrated Services (IntServ): Resource Reservation Protocol (RSVP) is used to reserve bandwidth\n\n 4. QoS terms:\n\n+ Classification: This involves categorizing network traffic into different groups based on specific criteria like IP\napplication type.\n+ Marking: allows you to mark (set or change) a value (attribute) for the traffic belonging to a specific class\n+ Queuing: entails holding packets in a queue and scheduling their transmission based on priority.\n+ Policing: is used to control the rate of traffic flowing across an interface. During a bandwidth exceed (crossed th\nrate), the excess traffic is generally dropped or remarked. The result of traffic policing is an output rate that appear\nand troughs. Traffic policing can be applied to inbound and outbound interfaces. Unlike traffic shaping, QoS polici\nqueuing. Policing is configured in bytes.\n+ Congestion: occurs when network bandwidth is insufficient to accommodate all traffic.\n+ Shaping: retains excess packets in a queue and then schedules the excess for later transmission over increments\nreaches the maximum configured rate, additional packets are queued instead of being dropped to proceed later. Tra\nonly on outbound interfaces as buffering and queuing happens only on outbound interfaces. Shaping is configured\nThe primary reasons you would use traffic shaping are to control access to available bandwidth, to ensure that traff\nestablished for it, and to regulate the flow of traffic in order to avoid congestion that can occur when the sent traffi\nof its remote, target interface.\n\n+ Tail drop: When the queue is full, the packet is dropped. This is the default behavior.\n5. Congestion Management (types of queuing): uses the marking on each packet to determine which queue to pl\nFirst-in, first-out (FIFO): FIFO entails no concept of priority or classes of traffic. With FIFO, transmission of pac\nin the order the packets arrive, which means no QoS.\nCustom Queuing (CQ): provide specific traffic guaranteed bandwidth at a potential congestion point, assuring the\navailable bandwidth and leaving the remaining bandwidth to other traffic.\nWeighted fair queueing (WFQ): allocates bandwidths to flows based on the weight. In addition, to allocate bandw\nschedules packets in bits (not bytes). This prevents long packets from preempting bandwidths of short packets and\nwhen both short and long packets wait to be forwarded.\nClass-based weighted fair queueing (CBWFQ) extends the standard WFQ functionality to provide support for us\nFor CBWFQ, you define traffic classes based on match criteria including protocols, access control lists (ACLs), an\nsatisfying the match criteria for a class constitute the traffic for that class. A queue is reserved for each class, and tr\n\n directed to the queue for that class.\n Once a class has been defined according to its match criteria, you can assign it characteristics. To characterize a cla\n weight, and maximum packet limit. The bandwidth assigned to a class is the guaranteed bandwidth delivered to the\n\n Low latency queueing (LLQ) or also known as Priority Queuing (PQ): brings strict priority queuing (PQ) to CB\n delay-sensitive packets such as voice to be sent before packets in other queues. LLQ reduces jitter in voice convers\n This type of queuing places traffic into one of four queues. Each queue has a different level of priority, and higher-\n emptied before packets are emptied from lower-priority queues. This behavior can \"starve out\" lower- priority traf\n\n The Resource Reservation Protocol (RSVP) protocol allows applications to reserve bandwidth for their data flow\n behalf of an application data flow, to request a specific amount of bandwidth from the network. RSVP is also used\n bandwidth reservation requests."
  },
  {
    "legacyIndex": 207,
    "legacyNumber": 1,
    "prompt": "Which feature or protocol determines whether the QoS on the network is sufficient to support IP services?",
    "options": [
      "LLDP",
      "CDP",
      "IP SLA",
      "EEM"
    ],
    "answer": 2,
    "explanation": "IP SLA allows an IT professional to collect information about network performance in real time. Therefore it\nhelps determine whether the QoS on the network is sufficient for IP services or not.\n\nCisco IOS Embedded Event Manager (EEM) is a powerful and flexible subsystem that provides real-time\nnetwork event detection and onboard automation. It gives you the ability to adapt the behavior of your\nnetwork devices to align with your business needs."
  },
  {
    "legacyIndex": 209,
    "legacyNumber": 3,
    "prompt": "Which two QoS tools can provide congestion management? (Choose two)",
    "options": [
      "CBWFQ",
      "FRTS",
      "CAR",
      "PQ",
      "PBR"
    ],
    "answer": [
      0,
      3
    ],
    "type": "multi",
    "explanation": "This module discusses the types of queueing and queueing-related features (such as bandwidth\nmanagement) which constitute the congestion management QoS features:\nClass-based WFQ (CBWFQ): extends the standard WFQ functionality to provide support for user-defined\ntraffic classes. For CBWFQ, you define traffic classes based on match criteria including protocols, access\ncontrol lists (ACLs), and input interfaces. Packets satisfying the match criteria for a class constitute the traffic\nfor that class.\nPriority queueing (PQ): With PQ, packets belonging to one priority class of traffic are sent before all lower\npriority traffic to ensure timely delivery of those packets."
  },
  {
    "legacyIndex": 210,
    "legacyNumber": 4,
    "prompt": "Which option is the main function of congestion management?",
    "options": [
      "discarding excess traffic",
      "queuing traffic based on priority",
      "classifying traffic",
      "providing long-term storage of buffered data"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 211,
    "legacyNumber": 5,
    "prompt": "What does traffic shaping do to reduce congestion in a network?",
    "options": [
      "buffers and queues packets",
      "buffers without queuing packets",
      "queues without buffering packets",
      "drops packets"
    ],
    "answer": 0,
    "explanation": "The following diagram illustrates the key difference between traffic policing and traffic shaping. Traffic\npolicing propagates bursts. When the traffic rate reaches the configured maximum rate (or committed\ninformation rate), excess traffic is dropped (or remarked). The result is an output rate that appears as a saw-\n\ntooth with crests and troughs. In contrast to policing, traffic shaping retains excess packets in a queue and\nthen schedules the excess for later transmission over increments of time. The result of traffic shaping is a\nsmoothed packet output rate.\n\nNote: Committed information rate (CIR): The minimum guaranteed data transfer rate agreed to by the\nrouting device."
  },
  {
    "legacyIndex": 212,
    "legacyNumber": 6,
    "prompt": "Which feature can you implement to reserve bandwidth for VoIP calls across the call path?",
    "options": [
      "round robin",
      "CBWFQ",
      "PQ",
      "RSVP"
    ],
    "answer": 3,
    "explanation": "The Resource Reservation Protocol (RSVP) protocol allows applications to reserve bandwidth for their data\nflows. It is used by a host, on the behalf of an application data flow, to request a specific amount of\nbandwidth from the network. RSVP is also used by the routers to forward bandwidth reservation requests."
  },
  {
    "legacyIndex": 213,
    "legacyNumber": 7,
    "prompt": "What is the purpose of traffic shaping?",
    "options": [
      "be a marking mechanism that identifies different flows",
      "to limit the bandwidth that a flow can use",
      "to provide fair queuing for buffered flows",
      "to mitigate delays over slow links"
    ],
    "answer": 1,
    "explanation": "The primary reasons you would use traffic shaping are to control access to available bandwidth, to ensure\nthat traffic conforms to the policies established for it, and to regulate the flow of traffic in order to avoid\ncongestion that can occur when the sent traffic exceeds the access speed of its remote, target interface."
  },
  {
    "legacyIndex": 214,
    "legacyNumber": 1,
    "prompt": "A network administrator enabled port security on a switch interface connected to a printer. What is the next\nconfiguration action in order to allow the port to learn the MAC address of the printer and insert it into the\ntable automatically?",
    "options": [
      "implement auto MAC address learning",
      "implement static MAC addressing.",
      "enable sticky MAC addressing",
      "enable dynamic MAC address learning"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 215,
    "legacyNumber": 2,
    "prompt": "Refer to the exhibit. Which port security violation mode is configured on interface Fa0/1?\n\n %PM-4-ERR_DISABLE: psecure-violation error detected on Fa0/1, putting Fa0/1 in err-disable\n state\n %PORT_SECURITY-2-PSECURE_VIOLATION: Security violation occurred, caused by MAC\n address 00AA.1AB9.D22F on port FastEthernet0/1\n %LINKPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down\n %LINK-3-UPDOWN: Interface FastEthernet0/1, changed state to down",
    "options": [
      "protect",
      "shutdown VLAN",
      "shutdown",
      "restrict"
    ],
    "answer": 2,
    "explanation": "After the port security violation occurs, the Fa0/1 interface was shutdown so the port security is using\n\"shutdown\" mode."
  },
  {
    "legacyIndex": 216,
    "legacyNumber": 3,
    "prompt": "A port security violation has occurred on a switch port due to the maximum MAC address count being\nexceeded. Which command must be configured to increment the security-violation count and forward an\nSNMP trap?",
    "options": [
      "switchport port-security violation access",
      "switchport port-security violation restrict",
      "switchport port-security violation protect",
      "switchport port-security violation shutdown"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 217,
    "legacyNumber": 1,
    "prompt": "An engineer must configure a WLAN using the strongest encryption type for WPA2-PSK. Which cipher fulfills\nthe configuration requirement?",
    "options": [
      "WEP",
      "RC4",
      "AES",
      "TKIP"
    ],
    "answer": 2,
    "explanation": "Many routers provide WPA2-PSK (TKIP), WPA2-PSK (AES), and WPA2-PSK (TKIP/AES) as options. TKIP is\nactually an older encryption protocol introduced with WPA to replace the very-insecure WEP encryption at the\ntime. TKIP is actually quite similar to WEP encryption. TKIP is no longer considered secure, and is now\ndeprecated. In other words, you shouldn't be using it.\nAES is a more secure encryption protocol introduced with WPA2 and it is currently the strongest encryption\ntype for WPA2-PSK."
  },
  {
    "legacyIndex": 218,
    "legacyNumber": 2,
    "prompt": "Which unified access point mode continues to serve wireless clients after losing connectivity to the Cisco\nWireless LAN Controller?",
    "options": [
      "sniffer",
      "mesh",
      "flex connect",
      "local"
    ],
    "answer": 2,
    "explanation": "In previous releases, whenever a FlexConnect access point disassociates from a controller, it moves to the\nstandalone mode. The clients that are centrally switched are disassociated. However, the FlexConnect access\npoint continues to serve locally switched clients. When the FlexConnect access point rejoins the controller (or\na standby controller), all clients are disconnected and are authenticated again. This functionality has been\nenhanced and the connection between the clients and the FlexConnect access points are maintained intact\nand the clients experience seamless connectivity. When both the access point and the controller have the\nsame configuration, the connection between the clients and APs is maintained."
  },
  {
    "legacyIndex": 219,
    "legacyNumber": 3,
    "prompt": "Which QoS Profile is selected in the GUI when configuring a voice over WLAN deployment?",
    "options": [
      "Bronze",
      "Platinum",
      "Silver",
      "Gold"
    ],
    "answer": 1,
    "explanation": "Cisco Unified Wireless Network solution WLANs support four levels of QoS: Platinum/Voice, Gold/Video,\nSilver/Best Effort (default), and Bronze/Background."
  },
  {
    "legacyIndex": 220,
    "legacyNumber": 4,
    "prompt": "What is a design element when deploying an 802.11b wireless infrastructure?",
    "options": [
      "disabling TPC so that access points can negotiate signal levels with their attached wireless devices.",
      "setting the maximum data rate to 54 Mbps on the Cisco Wireless LAN Controller",
      "allocating non overlapping channels to access points that are in close physical proximity to one another",
      "configuring access points to provide clients with a maximum of 5 Mbps"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 221,
    "legacyNumber": 5,
    "prompt": "Which statement about Link Aggregation when implemented on a Cisco Wireless LAN Controller is true?",
    "options": [
      "To pass client traffic two or more ports must be configured",
      "The EtherChannel must be configured in \"mode active\"",
      "When enabled the WLC bandwidth drops to 500 Mbps",
      "One functional physical port is needed to pass client traffic"
    ],
    "answer": 3,
    "explanation": "Link aggregation (LAG) is a partial implementation of the 802.3ad port aggregation standard. It bundles all\nof the controller's distribution system ports into a single 802.3ad port channel.\nRestriction for Link aggregation:\n+ LAG requires the EtherChannel to be configured for `mode on' on both the controller and the Catalyst\nswitch -> Answer B is not correct.\n+ If the recommended load-balancing method cannot be configured on the Catalyst switch, then configure\nthe LAG connection as a single member link or disable LAG on the controller -> Answer A is not correct while\nanswer D is correct."
  },
  {
    "legacyIndex": 222,
    "legacyNumber": 6,
    "prompt": "Which mode allows access points to be managed by Cisco Wireless LAN Controllers?",
    "options": [
      "autonomous",
      "lightweight",
      "bridge",
      "mobility express"
    ],
    "answer": 1,
    "explanation": "A Lightweight Access Point (LAP) is an AP that is designed to be connected to a wireless LAN (WLAN)\ncontroller (WLC). APs are \"lightweight,\" which means that they cannot act independently of a wireless LAN\n\ncontroller (WLC). The WLC manages the AP configurations and firmware. The APs are \"zero touch\" deployed,\nand individual configuration of APs is not necessary."
  },
  {
    "legacyIndex": 223,
    "legacyNumber": 7,
    "prompt": "Which type of wireless encryption is used for WPA2 in pre-shared key mode?",
    "options": [
      "TKIP with RC4",
      "RC4",
      "AES-128",
      "AES-256"
    ],
    "answer": 2,
    "explanation": "WPA 2 implements the National Institute of Standards and Technology (NIST)-recommended Advanced\nEncryption Standard (AES) encryption algorithm with the use of Counter Mode with Cipher Block Chaining\nMessage Authentication Code Protocol (CCMP). AES Counter Mode is a block cipher that encrypts 128-bit\nblocks of data at a time with a 128-bit encryption key."
  },
  {
    "legacyIndex": 224,
    "legacyNumber": 8,
    "prompt": "Which two values or settings must be entered when configuring a new WLAN in the Cisco Wireless LAN\nController GUI? (Choose two)",
    "options": [
      "management interface settings",
      "QoS settings",
      "ip address of one or more access points",
      "SSID",
      "Profile name"
    ],
    "answer": [
      3,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 225,
    "legacyNumber": 9,
    "prompt": "Which feature on the Cisco Wireless LAN Controller when enabled restricts management access from specific\nnetworks?",
    "options": [
      "CPU ACL",
      "TACACS",
      "Flex ACL",
      "RADIUS"
    ],
    "answer": 0,
    "explanation": "Whenever you want to control which devices can talk to the main CPU, a CPU ACL is used.\nNote: CPU ACLs only filter traffic towards the CPU, and not any traffic exiting or generated by the CPU."
  },
  {
    "legacyIndex": 226,
    "legacyNumber": 10,
    "prompt": "Which 802.11 frame type is association response?",
    "options": [
      "management",
      "protected frame",
      "control",
      "action"
    ],
    "answer": 0,
    "explanation": "There are three main types of 802.11 frames: the Data Frame, the Management Frame and the Control\nFrame. Association Response belongs to Management Frame. Association response is sent in response to an\nassociation request."
  },
  {
    "legacyIndex": 227,
    "legacyNumber": 11,
    "prompt": "When configuring a WLAN with WPA2 PSK in the Cisco Wireless LAN Controller GUI, which two formats are\navailable to select? (Choose two)",
    "options": [
      "ASCII",
      "base64",
      "binary",
      "decimal",
      "hexadecimal"
    ],
    "answer": [
      0,
      4
    ],
    "type": "multi",
    "explanation": "When configuring a WLAN with WPA2 Preshared Key (PSK), we can choose the encryption key format as\neither ASCII or HEX."
  },
  {
    "legacyIndex": 228,
    "legacyNumber": 12,
    "prompt": "What is a benefit of using a Cisco Wireless LAN Controller?",
    "options": [
      "Central AP management requires more complex configurations",
      "Unique SSIDs cannot use the same authentication method",
      "It supports autonomous and lightweight APs",
      "It eliminates the need to configure each access point individually"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 229,
    "legacyNumber": 13,
    "prompt": "Several new coverage cells are required to improve the Wi-Fi network of an organization. Which two standard\ndesigns are recommended? (Choose two)",
    "options": [
      "5GHz provides increased network capacity with up to 23 nonoverlapping channels,",
      "5GHz channel selection requires an autonomous access point.",
      "Cells that overlap one another are configured to use nonoverlapping channels.",
      "Adjacent cells with overlapping channels use a repeater access point.",
      "For maximum throughput, the WLC is configured to dynamically set adjacent access points to the same channel."
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": "The 802.11 standard defines 23 20MHz wide channels in the 5 GHz spectrum. Each channel is spaced 20MHz\napart and separated into three Unlicensed National Information Infrastructure (UNII) bands."
  },
  {
    "legacyIndex": 230,
    "legacyNumber": 1,
    "prompt": "How does CAPWAP communicate between an access point in local mode and a WLC?",
    "options": [
      "The access point must directly connect to the WLC using a copper cable",
      "The access point must not be connected to the wired network, as it would create a loop",
      "The access point must be connected to the same switch as the WLC",
      "The access point has the ability to link to any switch in the network, assuming connectivity to the WLC"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 231,
    "legacyNumber": 2,
    "prompt": "Which WPA3 enhancement protects against hackers viewing traffic on the Wi-Fi network?",
    "options": [
      "TKIP encryption",
      "AES encryption",
      "Scrambled encryption key",
      "SAE encryption"
    ],
    "answer": 3,
    "explanation": "Wi-Fi Protected Access version 3 (WPA3) is a new Wi-Fi Alliance's (WFA) security standard for personal and\nenterprise networks. It aims to improve overall Wi-Fi security by using modern security algorithms and\nstronger cipher suites. WPA3 has two parts:\n+ WPA3-Personal: Uses simultaneous authentication of equals (SAE) instead of pre-shared key (PSK),\nproviding users with stronger security protections against attacks such as offline dictionary attacks, key\nrecovery, and message forging.\n+ WPA3-Enterprise: Offers stronger authentication and link-layer encryption methods, and an optional 192-\nbit security mode for sensitive security environments."
  },
  {
    "legacyIndex": 232,
    "legacyNumber": 3,
    "prompt": "What is a difference between local AP mode and FlexConnet AP mode?",
    "options": [
      "Local AP mode creates two CAPWAP tunnels per AP to the WLC",
      "FlexConnect AP mode fails to function if me AP loses connectivity with the WLC",
      "FlexConnect AP mode bridges the traffic from the AP to the WLC when local switching is configured",
      "Local AP mode causes the AP to behave as if it were an autonomous AP"
    ],
    "answer": 0,
    "explanation": "In Central Switched (Local) mode, an AP creates two CAPWAP tunnels to the Wireless Controller. One tunnel\nis used for forwarding data traffic and the other is used for forwarding the management traffic."
  },
  {
    "legacyIndex": 233,
    "legacyNumber": 4,
    "prompt": "When a WPA2-PSK WLAN is configured in the Wireless LAN Controller, what is the minimum number of\ncharacters that is required for the passphrase?",
    "options": [
      "6",
      "8",
      "12",
      "18"
    ],
    "answer": 1,
    "explanation": "WPA/WPA2 preshared keys must contain 8 to 63 ASCII text characters or 64 hexadecimal characters."
  },
  {
    "legacyIndex": 234,
    "legacyNumber": 5,
    "prompt": "Using direct sequence spread spectrum, which three 2.4-GHz channels are used to limit collisions?",
    "options": [
      "1,5,10",
      "1,2,3",
      "1,6,11",
      "5,6,7"
    ],
    "answer": 2,
    "explanation": "In the 2.4 GHz band, 1, 6, and 11 are the only non-overlapping channels."
  },
  {
    "legacyIndex": 235,
    "legacyNumber": 6,
    "prompt": "A wireless administrator has configured a WLAN; however, the clients need access to a less congested 5-GHz\nnetwork for their voice quality. What action must be taken to meet the requirement?",
    "options": [
      "enable AAA override",
      "enable RX-SOP",
      "enable DTIM",
      "enable Band Select"
    ],
    "answer": 3,
    "explanation": "Band Select or Band Direction is a new feature that encourages dual band clients to connect to 5 G-Hz\nnetworks. Band select is disabled by default. The Band Select function provides a better wireless experience\nfor users."
  },
  {
    "legacyIndex": 236,
    "legacyNumber": 7,
    "prompt": "What is a function of Wireless LAN Controller?",
    "options": [
      "send LWAPP packets to access points",
      "use SSIDs to distinguish between wireless clients",
      "register with a single access point that controls traffic between wired and wireless endpoints",
      "monitor activity on wireless and wired LANs"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 237,
    "legacyNumber": 8,
    "prompt": "Which protocol prompts the Wireless LAN Controller to generate its own local web administration SSL\ncertificate for GUI access?",
    "options": [
      "HTTP",
      "HTTPS",
      "TACACS+",
      "RADIUS"
    ],
    "answer": 1,
    "explanation": "When you enable HTTPS, the controller generates its own local web administration SSL certificate and\nautomatically applies it to the GUI."
  },
  {
    "legacyIndex": 238,
    "legacyNumber": 9,
    "prompt": "What is a recommended approach to avoid co-channel congestion while installing access points that use the\n2.4 GHz frequency?",
    "options": [
      "different nonoverlapping channels",
      "one nonoverlapping channel",
      "one overlapping channel",
      "different overlapping channels"
    ],
    "answer": 0,
    "explanation": "In the 2.4 GHz band, 1, 6, and 11 are the only non-overlapping channels so they should be chosen while\ninstalling APs."
  },
  {
    "legacyIndex": 240,
    "legacyNumber": 2,
    "prompt": "Which API is used in controller-based architectures to interact with edge devices?",
    "options": [
      "overlay",
      "northbound",
      "underlay",
      "southbound"
    ],
    "answer": 3,
    "explanation": "The Southbound API is used to communicate with network devices."
  },
  {
    "legacyIndex": 241,
    "legacyNumber": 3,
    "prompt": "What are two characteristics of a controller-based network? (Choose two)",
    "options": [
      "The administrator can make configuration updates from the CLI",
      "It uses northbound and southbound APIs to communicate between architectural layers",
      "It moves the control plane to a central point",
      "It decentralizes the control plane, which allows each device to make its own forwarding decisions",
      "It uses Telnet to report system issues."
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 242,
    "legacyNumber": 4,
    "prompt": "What are two southbound APIs? (Choose two)",
    "options": [
      "Thrift",
      "NETCONF",
      "Open Flow",
      "DSC",
      "CORBA"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": "OpenFlow is a well-known southbound API. OpenFlow defines the way the SDN Controller should interact with\nthe forwarding plane to make adjustments to the network, so it can better adapt to changing business\nrequirements.\nThe Network Configuration Protocol (NetConf) uses Extensible Markup Language (XML) to install, manipulate\nand delete configuration to network devices.\nOther southbound APIs are:\n+ onePK: a Cisco proprietary SBI to inspect or modify the network element configuration without hardware\nupgrades.\n+ OpFlex: an open-standard, distributed control system. It send \"summary policy\" to network elements."
  },
  {
    "legacyIndex": 243,
    "legacyNumber": 5,
    "prompt": "Which statement correctly compares traditional networks and controller-based networks?",
    "options": [
      "Only traditional networks offer a centralized control plane",
      "Only traditional networks natively support centralized management",
      "Traditional and controller-based networks abstract policies from device configurations",
      "Only controller-based networks decouple the control plane and the data plane"
    ],
    "answer": 3,
    "explanation": "Most traditional devices use a distributed architecture, in which each control plane is resided in a networking\ndevice. Therefore they need to communicate with each other via messages to work correctly.\nIn contrast to distributed architecture, centralized (or controller-based) architectures centralizes the control\nof networking devices into one device, called SDN controller -> Answer D is correct."
  },
  {
    "legacyIndex": 244,
    "legacyNumber": 6,
    "prompt": "What software defined architecture plane assists network devices with making packet forwarding decisions by\nproviding Layer 2 reachability and Layer 3 routing information?",
    "options": [
      "data plane",
      "control plane",
      "policy plane",
      "management plane"
    ],
    "answer": 1,
    "explanation": "Control Plane Function\nIn its simplest form, the control plane provides layer-2 MAC reachability and layer-3 routing information to\nnetwork devices that require this information to make packet forwarding decisions. In the case of firewalls,\nthe control plane would include stateful flow information for inspection. Control plane functionality can\nimplemented as follows:\n\n+ Distributed - Conventional routers and switches operate using distributed protocols for control, i.e. where\neach device makes its own decisions about what to do, and communicate relevant information to other\ndevices for input into their decision making process. For example, the Spanning Tree Protocol (STP), Fabric\nPath, and routing protocols such as IS-IS and BGP provide distributed control of packet forwarding\nfunctionality to networking devices.\n\n+ Centralized - In this case, a centralized controller provides the necessary information for a network\nelement to make a decision. For example, these controller(s) instruct networking devices on where to\nforward packets by explicitly programming their MAC and FIBs."
  },
  {
    "legacyIndex": 245,
    "legacyNumber": 7,
    "prompt": "What are two benefits of controller-based networking compared to traditional networking? (Choose two)",
    "options": [
      "controller-based increases network bandwidth usage, while traditional lightens the load on the network.",
      "controller-based reduces network configuration complexity, while traditional increases the potential for errors",
      "controller-based inflates software costs, while traditional decreases individual licensing costs",
      "controller-based allows for fewer network failure, while traditional increases failure rates",
      "controller-based provides centralization of key IT functions, while traditional requires distributes management function"
    ],
    "answer": [
      1,
      4
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 246,
    "legacyNumber": 8,
    "prompt": "In software defined architectures, which plane is distributed and responsible for traffic forwarding?",
    "options": [
      "management plane",
      "control plane",
      "data plane",
      "policy plane"
    ],
    "answer": 2,
    "explanation": "The Open Networking Foundation identifies three main parts of the Software-defined networking (SDN):\nApplication layer; Control layer and Infrastructure layer. SDN separates a router's control plane from the data\n(forwarding) plane. The control plane makes routing decisions. The data plane forwards data (packets)\nthrough the router. With SDN routing, decisions are made remotely instead of on each individual router.\n\nDNA Center Quick Summary\nSoftware-Defined Access (SDA) uses the software-defined architectural model, with a controller\nand various APIs. At the center sits the Digital Network Architecture (DNA) Center controller.\n\nDNA Center is the controller for SDA networks. DNA Center uses REST APIs on Northbound\ninterface. On Southbound interface, DNA Center uses various protocols like RESTCONF,\nNETCONF etc.\nThe southbound side of the controller contains the fabric, underlay, and overlay:\nOverlay: The mechanisms to create VXLAN tunnels between SDA switches, which are then used to\ntransport traffic from one fabric endpoint to another over the fabric.\n\nUnderlay: The network of devices and connections (cables and wireless) to provide IP connectivity\nto all nodes in the fabric, with a goal to support the dynamic discovery of all SDA devices and\nendpoints as a part of the process to create overlay VXLAN tunnels.\n\nThe relationship between Overlay and Underlay is shown below:\n\nFabric: The combination of overlay and underlay, which together provide all features to deliver data\nacross the network with the desired features and attributes"
  },
  {
    "legacyIndex": 247,
    "legacyNumber": 1,
    "prompt": "Which two capacities of Cisco DNA Center make it more extensible as compared to traditional campus device\nmanagement? (Choose two)",
    "options": [
      "adapters that support all families of Cisco IOS software",
      "SDKs that support interaction with third-party network equipment",
      "customized versions for small, medium, and large enterprises",
      "REST APIs that allow for external applications to interact natively",
      "modular design that is upgradable as needed"
    ],
    "answer": [
      1,
      3
    ],
    "type": "multi",
    "explanation": "Cisco DNA Center offers 360-degree extensibility through four distinct types of platform capabilities:\n\n+ Intent-based APIs leverage the controller and enable business and IT applications to deliver intent to the\nnetwork and to reap network analytics and insights for IT and business innovation.\n+ Process adapters, built on integration APIs, allow integration with other IT and network systems to\nstreamline IT operations and processes.\n+ Domain adapters, built on integration APIs, allow integration with other infrastructure domains such as\ndata center, WAN, and security to deliver a consistent intent-based infrastructure across the entire IT\nenvironment.\n+ SDKs allow management to be extended to third-party vendor's network devices to offer support for\ndiverse environments."
  },
  {
    "legacyIndex": 248,
    "legacyNumber": 2,
    "prompt": "What makes Cisco DNA Center different from traditional network management applications and their\nmanagement of networks?",
    "options": [
      "It only supports auto-discovery of network elements in a green field deployment.",
      "It modular design allows someone to implement different versions to meet the specific needs of an organization",
      "It abstracts policy from the actual device configuration",
      "It does not support high availability of management functions when operating in cluster mode"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 249,
    "legacyNumber": 3,
    "prompt": "How does Cisco DNA Center gather data from the network?",
    "options": [
      "Network devices use different services like SNMP, syslog, and streaming telemetry to send data to the controller",
      "Devices establish an iPsec tunnel to exchange data with the controller",
      "Devices use the call-home protocol to periodically send data to the controller",
      "The Cisco CU Analyzer tool gathers data from each licensed network device and streams it to the controller"
    ],
    "answer": 0,
    "explanation": "Cisco DNA Center is a software solution that resides on the Cisco DNA Center appliance. The solution\nreceives data in the form of streaming telemetry from every device (switch, router, access point, and wireless\naccess controller) on the network. This data provides Cisco DNA Center with the real-time information it\nneeds for the many functions it performs."
  },
  {
    "legacyIndex": 250,
    "legacyNumber": 4,
    "prompt": "How do traditional campus device management and Cisco DNA Center device management differ in regards\nto deployment?",
    "options": [
      "Cisco DNA Center device management can deploy a network more quickly than traditional campus device management",
      "Traditional campus device management allows a network to scale more quickly than with Cisco DNA Center device management",
      "Cisco DNA Center device management can be implemented at a lower cost than most traditional campus device management options",
      "Traditional campus device management schemes can typically deploy patches and updates more quickly than Cisco DNA Center device management"
    ],
    "answer": 0,
    "explanation": "With Intent-based APIs, the administrator configures the intent or outcome desired of a set of security\npolices. The DNA Center then communicates with the devices to determine exactly the required configuration\nto achieve that intent. Then the complete configuration is sent down to the devices -> This helps reduce time\nto deploy a network compare to the traditional networks."
  },
  {
    "legacyIndex": 251,
    "legacyNumber": 5,
    "prompt": "What is an advantage of Cisco DNA Center versus traditional campus device management?",
    "options": [
      "It supports numerous extensibility options including cross-domain adapters and third-party SDKs",
      "It supports high availability for management functions when operating in cluster mode",
      "It enables easy autodiscovery of network elements m a brownfield deployment",
      "It is designed primarily to provide network assurance"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 252,
    "legacyNumber": 1,
    "prompt": "Drag drop the descriptions from the left on to the correct configuration-management technologies on the\nright.",
    "type": "match",
    "items": [
      "uses SSH for remote device communication",
      "uses YAML for fundamental configuration elements",
      "uses Ruby for fundamental configuration elements",
      "uses TCP port 10002 for configuration push jobs",
      "fundamental configuration elements are stored in a manifest",
      "uses TCP 8140 for communication"
    ],
    "choices": [
      "Ansible",
      "Chef",
      "Puppet"
    ],
    "answer": [
      0,
      0,
      1,
      1,
      2,
      2
    ],
    "explanation": "The focus of Ansible is to be streamlined and fast, and to require no node agent installation. Thus, Ansible\nperforms all functions over SSH. Ansible is built on Python, in contrast to the Ruby foundation of Puppet and\nChef.\nTCP port 10002 is the command port. It may be configured in the Chef Push Jobs configuration file . This port\nallows Chef Push Jobs clients to communicate with the Chef Push Jobs server.\n\nPuppet is an open-source configuration management solution, which is built with Ruby and offers custom\nDomain Specific Language (DSL) and Embedded Ruby (ERB) templates to create custom Puppet language\nfiles, offering a declarative-paradigm programming approach.\nA Puppet piece of code is called a manifest, and is a file with .pp extension."
  },
  {
    "legacyIndex": 253,
    "legacyNumber": 2,
    "prompt": "Drag and drop the description of file-transfer protocols from the left onto the correct protocols on the right.",
    "type": "match",
    "items": [
      "uses TCP",
      "uses ports 20 and 21",
      "provides reliability when loading an IOS image upon boot up",
      "does not require user authentication",
      "uses UDP",
      "uses port 69"
    ],
    "choices": [
      "FTP",
      "TFTP"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 254,
    "legacyNumber": 3,
    "prompt": "Drag and drop the WLAN components from the left onto the correct descriptions on the right.",
    "type": "match",
    "items": [
      "device that manages access points",
      "device that provides Wi-Fi devices with a connection to a wired network",
      "used for out of band management of a WLC",
      "used to support mobility management of the WLC",
      "applied to the WLAN for wireless client communication"
    ],
    "choices": [
      "wireless LAN controller",
      "access point",
      "service port",
      "virtual interface",
      "dynamic interface"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "The service port can be used management purposes, primarily for out-of-band management. However, AP\nmanagement traffic is not possible across the service port. In most cases, the service port is used as a \"last\nresort\" means of accessing the controller GUI for management purposes. For example, in the case where the\nsystem distribution ports on the controller are down or their communication to the wired network is\notherwise degraded.\n\nA dynamic interface with the Dynamic AP Management option enabled is used as the tunnel source for\npackets from the controller to the access point and as the destination for CAPWAP packets from the access\npoint to the controller.\n\nThe virtual interface is used to support mobility management, Dynamic Host Configuration Protocol (DHCP)\nrelay, and embedded Layer 3 security such as guest web authentication. It also maintains the DNS gateway\nhost name used by Layer 3 security and mobility managers to verify the source of certificates when Layer 3\nweb authorization is enabled."
  },
  {
    "legacyIndex": 255,
    "legacyNumber": 4,
    "prompt": "Drag and drop the functions from the left onto the correct network components on the right.",
    "type": "match",
    "items": [
      "holds the TCP/IP settings to be distributed to the clients",
      "assigns a default gateway to a client",
      "assigns IP addresses to enabled clients",
      "resolves web URLs to IP addresses",
      "stores a list of IP addresses mapped to names"
    ],
    "choices": [
      "DHCP Server",
      "DNS Server"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 256,
    "legacyNumber": 5,
    "prompt": "Drag and drop the networking parameters from the left on to the correct values on the right.",
    "type": "match",
    "items": [
      "SMTP",
      "SSH",
      "FTP",
      "SNMP",
      "TFTP",
      "VoIP"
    ],
    "choices": [
      "Connection Oriented",
      "Connectionless"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": "SSH uses TCP port 22 while SNMP uses UDP port 161 and 162."
  },
  {
    "legacyIndex": 257,
    "legacyNumber": 6,
    "prompt": "Drag the OSPF parameters to the correct places on the right.",
    "type": "match",
    "items": [
      "IP address",
      "router ID",
      "area ID",
      "timers",
      "netmask"
    ],
    "choices": [
      "must be unique",
      "must match"
    ],
    "answer": [
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 258,
    "legacyNumber": 7,
    "prompt": "Drag and drop the AAA functions from the left onto the correct AAA services on the right.",
    "type": "match",
    "items": [
      "identifies the user",
      "verifies the password associated with a user",
      "restricts the services that are available to a user",
      "controls the actions that a user can perform",
      "records user activities",
      "provides analytical information for the network administrator"
    ],
    "choices": [
      "Authentication",
      "Authorization",
      "Accounting"
    ],
    "answer": [
      0,
      0,
      1,
      1,
      2,
      2
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 259,
    "legacyNumber": 8,
    "prompt": "Drag and drop the application protocols from the left onto the suitable transport protocols on the right.",
    "type": "match",
    "items": [
      "SMTP",
      "FTP",
      "SSH",
      "SNMP",
      "DHCP",
      "TFTP"
    ],
    "choices": [
      "TCP",
      "UDP"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 260,
    "legacyNumber": 9,
    "prompt": "Drag and drop the IPv4 network subnets from the left onto the correct usable host ranges on the right.",
    "type": "match",
    "items": [
      "172.28.228.144/18",
      "172.28.228.144/21",
      "172.28.228.144/23",
      "172.28.228.144/25",
      "172.28.228.144/29"
    ],
    "choices": [
      "172.28.192.1 - 172.28.255.254",
      "172.28.224.1 - 172.28.231.254",
      "172.28.228.1 - 172.28.229.254",
      "172.28.228.129 - 172.28.228.254",
      "172.28.228.145 - 172.28.228.150"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "This subnet question requires us to grasp how to subnet very well. To quickly find out the subnet range, we\nhave to find out the increment and the network address of each subnet. Let's take an example with the\nsubnet 172.28.228.144/18:\nFrom the /18 (= 1100 0000 in the 3rd octet), we find out the increment is 64. Therefore the network address\nof this subnet must be the greatest multiple of the increment but not greater than the value in the 3rd octet\n(228). We can find out the 3rd octet of the network address is 192 (because 192 = 64 * 3 and 192 < 228)\n-> The network address is 172.28.192.0. So the first usable host should be 172.28.192.1 and it matches\nwith the 5th answer on the right. In this case we don't need to calculate the broadcast address because we\nfound the correct answer.\nLet's take another example with subnet 172.28.228.144/23 -> The increment is 2 (as /23 = 1111 1110 in\n3rd octet) -> The 3rd octet of the network address is 228 (because 228 is the multiply of 2 and equal to the\n3rd octet) -> The network address is 172.28.228.0 -> The first usable host is 172.28.228.1. It is not\nnecessary but if we want to find out the broadcast address of this subnet, we can find out the next network\naddress, which is 172.28.(228 + the increment number).0 or 172.28.230.0 then reduce 1 bit ->\n172.28.229.255 is the broadcast address of our subnet. Therefore the last usable host is 172.28.229.254.\nIf you are still unclear about how to do subnetting quickly, please read part 3 of our \"Subnetting Tutorial -\nSubnetting Made Easy\" at https://www.9tut.com/subnetting-tutorial/3"
  },
  {
    "legacyIndex": 261,
    "legacyNumber": 10,
    "prompt": "Drag and drop the Cisco Wireless LAN Controller security settings from the left onto the correct security\nmechanism categories on the right.",
    "type": "match",
    "items": [
      "WPA+WPA2",
      "802.1X",
      "web policy",
      "Passthrough"
    ],
    "choices": [
      "Layer 2 Security Mechanism",
      "Layer 3 Security Mechanisms (for WLAN)"
    ],
    "answer": [
      0,
      0,
      1,
      1
    ],
    "explanation": "Layer 2 Security Mechanism includes WPA+WPA2, 802.1X, Static WEP, CKIP while Layer 3 Security\nMechanisms (for WLAN) includes IPSec, VPN Pass-Through, Web Passthrough ..."
  },
  {
    "legacyIndex": 262,
    "legacyNumber": 11,
    "prompt": "Drag and Drop the benefits of a Cisco Wireless LAN Controller from the left onto the correct examples on the\nright",
    "type": "match",
    "items": [
      "Dynamic RF Feature",
      "Easy Deployment Process",
      "Optimized user performance",
      "Easy upgrade process"
    ],
    "choices": [
      "Access points auto adjust signal strength",
      "Controller provides centralized management of users and VLANs",
      "Controller uses loadbalancing to maximize throughput",
      "Controller image auto deployed to access Points"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 263,
    "legacyNumber": 12,
    "prompt": "Drag and drop the threat-mitigation techniques from the left onto the types of threat or attack they mitigate\non the right.",
    "type": "match",
    "items": [
      "802.1q double tagging",
      "ARP spoofing",
      "unwanted superior BPDUs",
      "unwanted BPDUs on PortFast-enabled interfaces"
    ],
    "choices": [
      "Configure a VLAN access control list",
      "Configure the dynamic ARP inspection feature",
      "Configure the root guard feature",
      "Configure the BPDU guard feature"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "Double-Tagging attack:\n\nIn this attack, the attacking computer generates frames with two 802.1Q tags. The first tag matches the\nnative VLAN of the trunk port (VLAN 10 in this case), and the second matches the VLAN of a host it wants to\nattack (VLAN 20).\nWhen the packet from the attacker reaches Switch A, Switch A only sees the first VLAN 10 and it matches\nwith its native VLAN 10 so this VLAN tag is removed. Switch A forwards the frame out all links with the same\nnative VLAN 10. Switch B receives the frame with an tag of VLAN 20 so it removes this tag and forwards out\nto the Victim computer.\nNote: This attack only works if the trunk (between two switches) has the same native VLAN as the attacker.\nTo mitigate this type of attack, you can use VLAN access control lists (VACLs, which applies to all traffic\nwithin a VLAN. We can use VACL to drop attacker traffic to specific victims/servers) or implement Private\nVLANs.\nARP attack (like ARP poisoning/spoofing) is a type of attack in which a malicious actor sends falsified ARP\nmessages over a local area network as ARP allows a gratuitous reply from a host even if an ARP request was\nnot received. This results in the linking of an attacker's MAC address with the IP address of a legitimate\ncomputer or server on the network. This is an attack based on ARP which is at Layer 2. Dynamic ARP\ninspection (DAI) is a security feature that validates ARP packets in a network which can be used to mitigate\nthis type of attack."
  },
  {
    "legacyIndex": 264,
    "legacyNumber": 13,
    "prompt": "Refer to the exhibit.\n\n  [root#HostTime=]#ip route\n  default via 192.168.1.193 dev eth1 proto static\n  192.168.1.0/26 dev sth1 proto kernel scope link src 192.168.1.200 metric 1\n\n  [root#HostTime=]#ip addr show eth1\n  eth1:mtu 1500 qdisc pfifo_fast qlan 1000\n\n    link/ether 00:0C:22:83:79:A3 brd ff:ff:ff:ff:ff:ff\n    inet 192.168.1.200/26 hrd 192.168.1.255 scope global eth1\n    inet6 fe80::20c::29ff:fe89:79b3/64 scope link\n    valid_lft forever preferred_lft forever\n\nDrag and drop the networking parameters from the left onto the correct values on the right.",
    "type": "match",
    "items": [
      "00:0C:22",
      "00:0C:22:83:79:A3",
      "192.168.1.193",
      "192.168.1.200",
      "255.255.255.192"
    ],
    "choices": [
      "NIC vendor OUI",
      "NIC MAC address",
      "default gateway",
      "host IP address",
      "subnet mask"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "The \"ip route\" and \"ip addr show eth1\" are Linux commands.\n+ \"ip route\": display the routing table\n+ \"ip addr show eth1\": get depth information (only on eth1 interface) about your network interfaces like IP\nAddress, MAC Address information"
  },
  {
    "legacyIndex": 265,
    "legacyNumber": 14,
    "prompt": "Drag and drop the descriptions of IP protocol transmissions from the left onto the correct IP traffic types on\nthe right.",
    "type": "match",
    "items": [
      "Sends Transmission in Sequence",
      "Uses a lower transmission rate to ensure reliability",
      "Transmits packet as stream",
      "Transmits packets individually",
      "Uses higher transmission rate to support latency-sensitive apps",
      "Transmissions include an 8-byte header"
    ],
    "choices": [
      "TCP",
      "UDP"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": "UDP is a simpler message-based connectionless protocol. In connectionless protocols, there is no effort made\nto setup a dedicated end-to-end connection.\n\n...\n\nDatagrams - Packets are sent individually and are guaranteed to be whole if they arrive. Packets have\ndefinite bounds and no split or merge into data streams may exist.\n\nAccording to https://community.cisco.com/t5/networking-documents/udp/ta-p/3114870\n\nTCP is connection-oriented and UDP is connectionless. This means that before sending TCP packets, a\nconnection is established between the server and the client. This process of setting up a connection is called\nTCP handshaking. The stream of packets is then sent over this connection -> TCP transmits packet as\nstream."
  },
  {
    "legacyIndex": 266,
    "legacyNumber": 1,
    "prompt": "Refer to the exhibit. Drag and drop the routing table components on the left onto the corresponding letter\nfrom the exhibit on the right. Not all options are used.",
    "type": "match",
    "items": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "choices": [
      "route source",
      "administrative distance",
      "metric",
      "timestamp",
      "outbound interface"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 267,
    "legacyNumber": 2,
    "prompt": "Drag and drop each broadcast IP address on the left to the Broadcast Address column on the right. Not all\noptions are used.",
    "type": "match",
    "items": [
      "10.63.255.255/10",
      "172.16.255.39/29",
      "172.20.255.255/16",
      "192.168.255.127/25"
    ],
    "choices": [
      "Broadcast Address",
      "Not a Broadcast Address"
    ],
    "answer": [
      0,
      0,
      0,
      0
    ],
    "explanation": "Each listed address is the final address in its subnet: 10.63.255.255/10, 172.16.255.39/29, 172.20.255.255/16, and 192.168.255.127/25."
  },
  {
    "legacyIndex": 268,
    "legacyNumber": 3,
    "prompt": "An interface has been configured with the access list that is shown below.\n\n access-list 107 deny tcp 207.16.12.0 0.0.3.255 any eq\n http\n access-list 107 permit ip any any\n\nOn the basis of that access list, drag each information packet on the left to the appropriate category on the\nright.",
    "type": "match",
    "items": [
      "source IP",
      "destination application",
      "source IP",
      "destination port",
      "source IP",
      "destination port",
      "source IP",
      "destination port",
      "source IP",
      "destination application"
    ],
    "choices": [
      "207.16.32.14,",
      "http",
      "207.16.15.9,",
      "23",
      "207.16.16.14,",
      "53",
      "207.16.14.7,",
      "80",
      "207.16.13.14,"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      1
    ],
    "explanation": "From the ACL:\n\naccess-list 107 deny tcp 207.16.12.0.0.0.3.255 any eq http\naccess-list 107 permit ip any any\nWe can deduce it block all source hosts in 207.16.12.0/22 range (which ranges from 207.16.12.0 to\n207.16.15.255) via HTTP (port 80) while permit any other hosts."
  },
  {
    "legacyIndex": 269,
    "legacyNumber": 4,
    "prompt": "Order the DHCP message types as they would occur between a DHCP client and a DHCP server.",
    "type": "match",
    "items": [
      "First",
      "Second",
      "Third",
      "Fourth"
    ],
    "choices": [
      "DHCPDISCOVER",
      "DHCPOFFER",
      "DHCPREQUEST",
      "DHCPACK"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "There are four messages sent between the DHCP Client and DHCP Server: DHCPDISCOVER, DHCPOFFER,\nDHCPREQUEST and DHCPACKNOWLEDGEMENT. This process is often abbreviated as DORA (for Discover,\nOffer, Request, Acknowledgement)."
  },
  {
    "legacyIndex": 270,
    "legacyNumber": 5,
    "prompt": "Drag each route source from the left to the numbers on the right. Beginning with the lowest and ending with\nthe highest administrative distance.",
    "type": "match",
    "items": [
      "1",
      "2",
      "3",
      "4"
    ],
    "choices": [
      "connected",
      "static",
      "EBGP",
      "EIGRP"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "1: connected (AD = 0)\n2: static (AD = 1)\n3: EBGP (AD = 20)\n4: EIGRP (AD = 90)\n5 :OSPF (AD = 110)\n6: RIP (AD = 120)"
  },
  {
    "legacyIndex": 271,
    "legacyNumber": 6,
    "prompt": "Drag and drop to the characteristics of networking from the left onto the correct networking types on the\nright.",
    "type": "match",
    "items": [
      "focused on network",
      "user input is a policy",
      "uses allow list security model",
      "focused on devices",
      "user input is a configuration",
      "uses block list security model"
    ],
    "choices": [
      "Controller-Based Networking",
      "Traditional Networking"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    "explanation": "Traditional Networking uses block list model because all traffic is allowed to pass through initially until we\nconfigure an ACL, prefix-list... This model is more lenient, because if no application knowledge exists, the\ndefault network configuration will let everything through. From a security perspective, it is very dangerous\nthough - every time you allow a protocol that the application does not need, you are unnecessarily\nincreasing your attack surface, and therefore compromising the overall application security.\nIn Controller-Based Networking, everything is denied by default until we explicitly allow them by a white\n(allow) list."
  },
  {
    "legacyIndex": 272,
    "legacyNumber": 7,
    "prompt": "Drag and drop the attack-mitigation techniques from the left onto the types of attack that they mitigate on\nthe right.",
    "type": "match",
    "items": [
      "802.1q double-tagging VLAN-hopping attack",
      "MAC flooding attack",
      "man-in-the-middle spoofing attack",
      "switch-spoofing VLAN-hopping attack"
    ],
    "choices": [
      "configure the native VLAN with a nondefault VLAN ID",
      "configure 802.1x authenticate",
      "configure DHCP snooping",
      "disable DTP"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "VLAN Hopping: By altering the VLAN ID on packets encapsulated for trunking, an attacking device can send\nor receive packets on various VLANs, bypassing Layer 3 security measures. VLAN hopping can be\naccomplished by switch spoofing or double tagging.\na. Switch spoofing:\n\nThe attacker can connect an unauthorized Cisco switch to a Company switch port. The unauthorized switch\ncan send DTP frames and form a trunk with the Company Switch. If the attacker can establish a trunk link to\nthe Company switch, it receives traffic to all VLANs through the trunk because all VLANs are allowed on a\ntrunk by default.\n(Instead of using a Cisco Switch, the attacker can use a software to create and send DTP frames).\nTo mitigate this type of attack, we can disable DTP.\nb. Double-Tagging attack:\n\nIn this attack, the attacking computer generates frames with two 802.1Q tags. The first tag matches the\nnative VLAN of the trunk port (VLAN 10 in this case), and the second matches the VLAN of a host it wants to\nattack (VLAN 20).\nWhen the packet from the attacker reaches Switch A, Switch A only sees the first VLAN 10 and it matches\nwith its native VLAN 10 so this VLAN tag is removed. Switch A forwards the frame out all links with the same\nnative VLAN 10. Switch B receives the frame with an tag of VLAN 20 so it removes this tag and forwards out\nto the Victim computer.\nNote: This attack only works if the trunk (between two switches) has the same native VLAN as the attacker.\nTo mitigate this type of attack, we can use VLAN access control lists (VACLs, which applies to all traffic within\na VLAN. We can use VACL to drop attacker traffic to specific victims/servers) or implement Private VLANs."
  },
  {
    "legacyIndex": 273,
    "legacyNumber": 8,
    "prompt": "Match the functions to the corresponding layers. (Not all options are used)",
    "type": "match",
    "items": [
      "provides network access to the user",
      "represents the network edge",
      "implements network access policy",
      "establishes Layer 3 routing boundaries",
      "provides high-speed backbone connectivity",
      "functions as an aggregator for all the campus blocks"
    ],
    "choices": [
      "Access layer",
      "Distribution layer",
      "Core layer"
    ],
    "answer": [
      0,
      0,
      1,
      1,
      2,
      2
    ],
    "explanation": "A typical enterprise hierarchical LAN campus network design includes the following three layers:\n+ Access layer: Provides workgroup/user access to the network\n+ Distribution layer: Provides policy-based connectivity and controls the boundary between the access and\ncore layers\n+ Core layer: Provides fast transport between distribution switches within the enterprise campus"
  },
  {
    "legacyIndex": 274,
    "legacyNumber": 9,
    "prompt": "Drag the descriptions of device management from the left onto the types of device management on the right.",
    "type": "match",
    "items": [
      "monitors the cloud for software updates",
      "uses CLI templates to apply a consistent configuration to multiple devices at an individual location",
      "uses NetFlow to analyze potential security threats throughout the network and take appropriate action on"
    ],
    "choices": [
      "Cisco DNA Center Device Management"
    ],
    "answer": [
      0,
      0,
      0
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 275,
    "legacyNumber": 10,
    "prompt": "An engineer is tasked with verifying network configuration parameters on a client workstation to report back\nto the team lead. Drag and drop the node identifiers from the left onto the network parameters on the right.",
    "type": "match",
    "items": [
      "broadcast address",
      "default gateway",
      "host IP address",
      "MAC address",
      "last assignable IP address in the subnet"
    ],
    "choices": [
      "192.168.1.255",
      "192.168.1.1",
      "192.168.1.20",
      "B8-76-3F-7C-57-DF",
      "192.168.1.254"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "In the output above, three lines under \"Link-local IPv6 Address\" line have been blacked out so we have to\nfigure out what they are. They are the IP address of the Wireless card and the Default gateway of this\ncomputer."
  },
  {
    "legacyIndex": 276,
    "legacyNumber": 1,
    "prompt": "Drag the IPv6 DNS record types from the left onto the description on the right.",
    "type": "match",
    "items": [
      "correlates a domain with its authoritative name servers",
      "associates the domain serial number with its owner",
      "aliases one name to another",
      "supports reverse name lookups",
      "correlates a host name with an IP address"
    ],
    "choices": [
      "NS",
      "SOA",
      "CNAME",
      "PTR",
      "AAAA"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "An AAAA record maps a domain name to the IP address (Version 6) of the computer hosting the domain. An\nAAAA record is used to find the IP address of a computer connected to the internet from a name. The AAAA\nrecord is conceptually similar to the A record, but it allows you to specify the IPv6 address of the server,\nrather than the IPv4. An example of AAAA is the `www' of 9tut.com is pointed to\n2001:0db8:aaaa:bbbb:cccc:dddd:eeee:ffff.\nNS (name server) looks like a website URL, but instead of linking to a website, they link to the domain\nnames authoritative nameservers. An example of a NS is `ns1.9tut.com'.\nThe Canonical Name record (CNAME) tells anyone visiting that subdomain to use the same DNS records as\nanother domain / subdomain. If you are already using an A or AAAA record for a subdomain you wouldn't\nuse a CNAME. CNAME records must always point to another domain / subdomain, never directly to an IP\naddress. For example, we can configure the CNAME of www.9tut.com points to 9tut.com so that they use the\nsame IP address.\nAs opposed to forward DNS resolution (A and AAAA DNS records), the Reverse-lookup Pointer (PTR) record is\nused to look up domain names based on an IP address.\n\nAn SOA record or start of authority record specifies the DNS server providing authoritative information about\nan Internet domain, the email of the domain administrator, the domain serial number, and several timers\nrelating to refreshing the zone.\n\nAn example of a SOA record is shown below.\n\n  ; name TTL class rr Nameserver email-address\n  mydomain.com. 14400 IN SOA ns.mynameserver.com. root.ns.mynameserver.com. (\n  2004123001 ; Serial number\n  86000 ; Refresh rate in seconds\n  7200 ; Update Retry in seconds\n  3600000 ; Expiry in seconds\n  600 ; minimum in seconds )\n\nname - mydomain.com is the main name in this zone.\n\nTTL - 14400 - TTL defines the duration in seconds that the record may be cached by client side programs. If\nit is set as 0, it indicates that the record should not be cached. The range is defined to be between 0 to\n2147483647 (close to 68 years !) .\n\nClass - IN - The class shows the type of record. IN equates to Internet. Other options are all historic. So as\nlong as your DNS is on the Internet or Intranet, you must use IN.\n\nNameserver - ns.nameserver.com. - The nameserver is the server which holds the zone files. It can be\neither an external server in which case, the entire domain name must be specified followed by a dot. In case\nit is defined in this zone file, then it can be written as \"ns\" .\nEmail address - root.ns.nameserver.com. - This is the email of the domain name administrator. Now, this is\nreally confusing, because people expect an @ to be in an email address. However in this case, email is sent\nto root@ns.nameserver.com, but written as root.ns.nameserver.com . And yes, remember to put the dot\nbehind the domain name.\n\nSerial number - 2004123001 - This is a sort of a revision numbering system to show the changes made to\nthe DNS Zone. This number has to increment , whenever any change is made to the Zone file. The standard\nconvention is to use the date of update YYYYMMDDnn, where nn is a revision number in case more than one\nupdates are done in a day. So if the first update done today would be 2005301200 and second update would\nbe 2005301201.\n\nRefresh - 86000 - This is time(in seconds) when the slave DNS server will refresh from the master. This\nvalue represents how often a secondary will poll the primary server to see if the serial number for the zone\nhas increased (so it knows to request a new copy of the data for the zone). It can be written as \"23h88M\"\nindicating 23 hours and 88 minutes. If you have a regular Internet server, you can keep it between 6 to 24\nhours.\n\nRetry - 7200 - Now assume that a slave tried to contact the master server and failed to contact it because it\nwas down. The Retry value (time in seconds) will tell it when to get back. This value is not very important\nand can be a fraction of the refresh value.\n\nExpiry - 3600000 - This is the time (in seconds) that a slave server will keep a cached zone file as valid, if it\ncan't contact the primary server. If this value were set to say 2 weeks ( in seconds), what it means is that a\nslave would still be able to give out domain information from its cached zone file for 2 weeks, without anyone\nknowing the difference. The recommended value is between 2 to 4 weeks.\n\nMinimum - 600 - This is the default time(in seconds) that the slave servers should cache the Zone file. This\nis the most important time field in the SOA Record. If your DNS information keeps changing, keep it down to\na day or less. Otherwise if your DNS record doesn't change regularly, step it up between 1 to 5 days. The\n\nbenefit of keeping this value high, is that your website speeds increase drastically as a result of reduced\nlookups. Caching servers around the globe would cache your records and this improves site performance."
  },
  {
    "legacyIndex": 277,
    "legacyNumber": 2,
    "prompt": "Drag and drop the SNMP components from the left onto the descriptions on the right.",
    "type": "match",
    "items": [
      "unsolicited message",
      "responds to status requests and requests for information about a device",
      "collection of variables that can be monitored",
      "resides on an NMS"
    ],
    "choices": [
      "SNMP trap",
      "SNMP agent",
      "MIB",
      "SNMP manager"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "SNMP consists of 3 items:\n+ SNMP Manager (sometimes called Network Management System - NMS): a software runs on the device of\nthe network administrator (in most case, a computer) to monitor the network.\n+ SNMP Agent: a software runs on network devices that we want to monitor (router, switch, server...)\n+ Management Information Base (MIB): is the collection of managed objects. This components makes sure\nthat the data exchange between the manager and the agent remains structured. In other words, MIB\ncontains a set of questions that the SNMP Manager can ask the Agent (and the Agent can understand them).\nMIB is commonly shared between the Agent and Manager."
  },
  {
    "legacyIndex": 278,
    "legacyNumber": 3,
    "prompt": "Refer to the exhibit.\n\nAn engineer is required to verify that the network parameters are valid for the users wireless LAN\nconnectivity on a /24 subnet. Drag and drop the values from the left onto the network parameters on the\nright. Not all values are used.",
    "type": "match",
    "items": [
      "host IP address",
      "broadcast address",
      "network address",
      "default gateway",
      "MAC address",
      "last assignable IP address in the subnet"
    ],
    "choices": [
      "192.168.1.20",
      "192.168.1.255",
      "192.168.1.0",
      "192.168.1.1",
      "B8-76-3F-7C-57-DF",
      "192.168.1.254"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "explanation": "Note: The \"Wireless LAN adapter Local Area Connection *6\" is not physical LAN connection. Those are just\nVirtual drivers (simulated network adapters) that are installed by Windows for something like Hyper-V. Real,\nphysical NICs get numbered \"Ethernet ###\" (or \"Wireless ###\", etc.)"
  },
  {
    "legacyIndex": 279,
    "legacyNumber": 4,
    "prompt": "An engineer is tasked to configure a switch with port security to ensure devices that forward unicasts,\nmulticasts, and broadcasts are unable to flood the port. The port must be configured to permit only two\nrandom MAC addresses at a time. Drag and drop the required configuration commands from the left onto the\nsequence on the right. (Not all commands are used)",
    "type": "match",
    "items": [
      "1",
      "2",
      "3",
      "4"
    ],
    "choices": [
      "switchport mode access",
      "switchport port-security",
      "switchport port-security maximum 2",
      "switchport port-security violation shutdown"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explanation": "This question says \"permit only two random MAC addresses at a time\" so we cannot use the \"switchport port-\nsecurity mac-address sticky\" command as the switch will only learn and save the first two MAC addresses\nforever. Although the command \"switchport port-security violation shutdown\" is unnecessary because it is the\ndefault state of port-security but it is not wrong to reuse it.\n\nNote:\n\nThe full syntax of the second command is:\n\nswitchport port-security mac-address sticky [MAC]\n\nIf we don't specify the MAC address (like in this question) then the switch will dynamically learn the attached\nMAC Address and place it into your running-configuration."
  },
  {
    "legacyIndex": 280,
    "legacyNumber": 5,
    "prompt": "Drag the characteristics of network architectures from the left onto the type of architecture on the right.",
    "type": "match",
    "items": [
      "Most appropriate for small network designs",
      "Single device handles the core and distribution layer",
      "More cost-effective than other options",
      "Separate devices handle the core and distribution layer",
      "Enhances network availability"
    ],
    "choices": [
      "Collapsed Core",
      "Three-Tier"
    ],
    "answer": [
      0,
      0,
      0,
      1,
      1
    ],
    "explanation": "The three-tier hierarchical design maximizes performance, network availability, and the ability to scale the\nnetwork design.\nHowever, many small enterprise networks do not grow significantly larger over time. Therefore, a two-tier\nhierarchical design where the core and distribution layers are collapsed into one layer is often more practical.\nA \"collapsed core\" is when the distribution layer and core layer functions are implemented by a single device.\nThe primary motivation for the collapsed core design is reducing network cost, while maintaining most of the\nbenefits of the three-tier hierarchical model."
  },
  {
    "legacyIndex": 281,
    "legacyNumber": 6,
    "prompt": "Drag and drop the QoS congestion management terms from the left onto the description on the right.",
    "type": "match",
    "items": [
      "services a specified number of bytes in one queue before continuing to the next queue",
      "provides guaranteed bandwidth to a specified class of traffic",
      "places packets into one of four priority-based queues",
      "provides minimum guaranteed bandwidth to one or more flows",
      "uses store-and-forward queuing"
    ],
    "choices": [
      "CQ",
      "CBWFQ",
      "PQ",
      "WFQ",
      "FIFO"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "First-in, first-out (FIFO): FIFO entails no concept of priority or classes of traffic. With FIFO, transmission of\npackets out the interface occurs in the order the packets arrive, which means no QoS\nPriority Queuing (PQ): This type of queuing places traffic into one of four queues. Each queue has a different\nlevel of priority, and higher-priority queues must be emptied before packets are emptied from lower-priority\nqueues. This behavior can \"starve out\" lower- priority traffic.\nCustom Queuing (CQ): provide specific traffic guaranteed bandwidth at a potential congestion point, assuring\nthe traffic a fixed portion of available bandwidth and leaving the remaining bandwidth to other traffic.\nWeighted fair queueing (WFQ): offers dynamic, fair queuing that divides bandwidth across queues of traffic\nbased on weights. In standard WFQ, packets are classified into flows according to one of four criteria: the\nsource Internet Protocol address (IP address), the destination IP address, the source Transmission Control\nProtocol (TCP) or User Datagram Protocol (UDP) port, or the destination TCP or UDP port.\nClass-based weighted fair queueing (CBWFQ) extends the standard WFQ functionality to provide support for\nuser-defined traffic classes. For CBWFQ, you define traffic classes based on match criteria including protocols,\naccess control lists (ACLs), and input interfaces. Packets satisfying the match criteria for a class constitute\nthe traffic for that class. A queue is reserved for each class, and traffic belonging to a class is directed to the\nqueue for that class.\nOnce a class has been defined according to its match criteria, you can assign it characteristics. To\ncharacterize a class, you assign it bandwidth, weight, and maximum packet limit. The bandwidth assigned to\na class is the guaranteed bandwidth delivered to the class during congestion."
  },
  {
    "legacyIndex": 282,
    "legacyNumber": 7,
    "prompt": "Refer to the exhibit.\n\nAn engineer is configuring the router to provide static NAT for the webserver. Drag and drop the configuration\ncommands from the left onto the letters that correspond to its position in the configuration on the right.",
    "type": "match",
    "items": [
      "position A",
      "position B",
      "position C",
      "position D",
      "position E",
      "position F"
    ],
    "choices": [
      "ip address 172.16.1.1 255.255.255.0",
      "ip nat inside",
      "ip address 45.83.2.214 255.255.255.240",
      "ip nat outside",
      "ip nat inside source static tcp 172.16.1.2 80 45.83.2.214 80 extendable",
      "ip nat inside source list 1 interface s0 overload"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 283,
    "legacyNumber": 8,
    "prompt": "Drag and drop the DHCP snooping terms from the left onto the descriptions on the right.",
    "type": "match",
    "items": [
      "list of hosts on the network that are unknown to the administrative domain",
      "unknown DHCP server within an administrative domain",
      "network component that propagates IP addresses to hosts on the network",
      "default state of all interfaces",
      "internal device under the control of the network administrator"
    ],
    "choices": [
      "snooping binding database",
      "spurious DHCP server",
      "DHCP server",
      "untrusted",
      "trusted"
    ],
    "answer": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": ""
  },
  {
    "legacyIndex": 284,
    "legacyNumber": 1,
    "prompt": "Which type of VPN uses a hub-and-spoke configuration to establish a full mesh topology?",
    "options": [
      "GRE over IPsec",
      "dynamic multipoint VPN",
      "MPLS VPN",
      "IPsec virtual tunnel interface"
    ],
    "answer": 1,
    "explanation": "Dynamic Multipoint VPN (DMVPN) is a solution of Cisco. DMVPN provides the following advantages:\n+ Provides full meshed connectivity with simple Hub-and-Spoke topology. The spokes can communicate\nbetween each other without going through Hub\n+ Only one static public IP address is required on Hub. Spokes can use dynamic (unknown) public IP\naddresses\n+ The configuration is simple even in large network. No additional configuration is required on Hub when new\nSpokes are added."
  },
  {
    "legacyIndex": 285,
    "legacyNumber": 2,
    "prompt": "What mechanism carries multicast traffic between remote sites and supports encryption?",
    "options": [
      "ISATAP",
      "GRE over IPsec",
      "IPsec over ISATAP",
      "GRE"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 286,
    "legacyNumber": 3,
    "prompt": "What is a function of a remote access VPN?",
    "options": [
      "used cryptographic tunneling to protect the privacy of data for multiple users simultaneously",
      "allows the users to access company internal network resources through a secure tunnel",
      "used exclusively when a user is connected to a company's internal network",
      "establishes a secure tunnel between two branch sites"
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 287,
    "legacyNumber": 1,
    "prompt": "Which Cisco IOS command will indicate that interface GigabitEthernet 0/0 is configured via DHCP?",
    "options": [
      "show ip interface GigabitEthernet 0/0 dhcp",
      "show interface GigabitEthernet 0/0",
      "show ip interface dhcp",
      "show ip interface GigabitEthernet 0/0",
      "show ip interface GigabitEthernet 0/0 brief"
    ],
    "answer": 3,
    "explanation": ""
  },
  {
    "legacyIndex": 288,
    "legacyNumber": 2,
    "prompt": "Which command enables a router to become a DHCP client?",
    "options": [
      "ip address dhcp",
      "ip helper-address",
      "ip dhcp pool",
      "ip dhcp client"
    ],
    "answer": 0,
    "explanation": "If we want to get an IP address from the DHCP server on a Cisco device, we can use the command \"ip\naddress dhcp\".\nNote: The command \"ip helper-address\" enables a router to become a DHCP Relay Agent."
  },
  {
    "legacyIndex": 289,
    "legacyNumber": 3,
    "prompt": "What are two roles of the Dynamic Host Configuration Protocol (DHCP)? (Choose two)",
    "options": [
      "The DHCP server offers the ability to exclude specific IP addresses from a pool of IP addresses",
      "The DHCP client can request up to four DNS server addresses",
      "The DHCP server assigns IP addresses without requiring the client to renew them",
      "The DHCP server leases client IP addresses dynamically",
      "The DHCP client maintains a pool of IP addresses it can assign"
    ],
    "answer": [
      0,
      3
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 290,
    "legacyNumber": 4,
    "prompt": "Refer to the exhibit. An engineer deploys a topology in which R1 obtains its IP configuration from DHCP. If\nthe switch and DHCP server configurations are complete and correct. Which two sets of commands must be\nconfigured on R1 and R2 to complete the task? (Choose two)",
    "options": [
      "R1 (config)# interface fa0/0 R1 (config-if)# ip helper-address 198.51.100.100",
      "R2(config)# interface gi0/0 R2(config-if)# ip helper-address 198.51.100.100",
      "R1 (config)# interface fa0/0 R1 (config-if)# ip address dhcp R1 (config-if)# no shutdown",
      "R2(config)# interface gi0/0 R2(config-if)# ip address dhcp",
      "R1 (config)# interface fa0/0 R1 (config-if)# ip helper-address 192.0.2.2"
    ],
    "answer": [
      1,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 291,
    "legacyNumber": 5,
    "prompt": "Refer to the exhibit. If the network environment is operating normally, which type of device must be\nconnected to interface FastEthernet 0/1?\n\n ip arp inspection vlan 2-\n 10\n interface fastethernet 0/1\n ip arp inspection trust",
    "options": [
      "DHCP client",
      "access point",
      "router",
      "PC"
    ],
    "answer": 2,
    "explanation": "To configure DHCP snooping feature, at least three steps must be done:\n\nSequence and Description                          Command\n1. Configure global DHCP snooping                 Switch(config)# ip dhcp snooping\n2. Configure trusted ports (as least on 1         Switch(config-if)# ip dhcp snooping trust\n\nport).\nBy default, all ports are untrusted\n\n3. Configure DHCP snooping for the   Switch(config)# ip dhcp snooping vlan {VLAN-ID |\nselected VLANs                       VLAN range}\n\nNote: To configure DHCP snooping with Dynamic ARP Inspection we need to add the command \"ip arp\ninspection vlan vlan-id\" in global configuration mode and \"ip arp inspection trust\" in interface mode.\n\nIn a normal network environment, we should trust interfaces that are connected to routers, not end points."
  },
  {
    "legacyIndex": 292,
    "legacyNumber": 6,
    "prompt": "Which type of information resides on a DHCP server?",
    "options": [
      "a list of the available IP addresses in a pool",
      "a list of public IP addresses and their corresponding names",
      "usernames and passwords for the end users in a domain",
      "a list of statically assigned MAC addresses"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 293,
    "legacyNumber": 7,
    "prompt": "What is a DHCP client?",
    "options": [
      "a host that is configured to request an IP address automatically",
      "a router that statically assigns IP addresses to hosts",
      "a server that dynamically assigns IP addresses to hosts",
      "a workstation that requests a domain name associated with its IP address"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 294,
    "legacyNumber": 8,
    "prompt": "Where does the configuration reside when a helper address is configured to support DHCP?",
    "options": [
      "on the switch trunk interface.",
      "on the router closest to the client.",
      "on the router closest to the server.",
      "on every router along the path."
    ],
    "answer": 1,
    "explanation": ""
  },
  {
    "legacyIndex": 295,
    "legacyNumber": 9,
    "prompt": "When implementing a router as a DHCP server, which two features must be configured? (Choose two)",
    "options": [
      "relay agent information",
      "database agent",
      "address pool",
      "smart-relay",
      "manual bindings"
    ],
    "answer": [
      2,
      4
    ],
    "type": "multi",
    "explanation": "The following example shows how to configure a DHCP Server on a Cisco router:\n\nConfiguration              Description\n\nRouter(config)#ip dhcp     Create a DHCP Pool named CLIENTS\npool CLIENTS\n\nRouter(dhcp-               Specifies the subnet and mask of the DHCP address pool\nconfig)#network\n10.1.1.0 /24\n\nRouter(dhcp-               Set the default gateway of the DHCP Clients\nconfig)#default-router\n10.1.1.1\n\nRouter(dhcp-config)#dns-   Configure a Domain Name Server (DNS)\nserver 10.1.1.1\n\nRouter(dhcp-               Configure a domain-name\nconfig)#domain-name\n9tut.com\n\nRouter(dhcp-config)#lease  Duration of the lease (the time during which a client computer can\n0 12                       use an assigned IP address). The syntax is \"lease {days[hours]\n                           [minutes] | infinite}\". In this case the lease is 12 hours. The default is\n                           a one-day lease.\n                           Before the lease expires, the client typically needs to renew its\n                           address lease assignment with the server\n\nRouter(dhcp-config)#exit\n\nRouter(config)# ip dhcp    The IP range that a DHCP Server should not assign to DHCP Clients.\nexcluded-address 10.1.1.1  Notice this command is configured under global configuration mode\n10.1.1.10\n\nManual bindings are IP addresses that have been manually mapped to the MAC addresses of hosts that are\nfound in the DHCP database.\n\nAll DHCP clients send a client identifier (DHCP option 61) in the DHCP packet. To configure manual bindings,\nyou must enter the client-identifier DHCP pool configuration command with the appropriate hexadecimal\nvalues identifying the DHCP client. For example:\n\n ip dhcp pool SERVER\n host 172.16.200.100\n 255.255.255.0\n client-identifier\n 01aa.bbcc.0003.00\n default-router 172.16.200.1\n !\n\nTherefore two requirements for DHCP binding is the IP address and the hardware address (MAC address) of\n\nthe client. Notice that in the above example \"aabb.cc00.0300\" is the MAC address of the client while prefix\n\n\"01\" represents the Ethernet media type.\n\nNote: In fact, this question should ask \"When implementing a router as a DHCP server, which one of these\nfeatures must be configured?\". Because we only need to configure either an \"address pool\" or \"manual\nbinding\"."
  },
  {
    "legacyIndex": 296,
    "legacyNumber": 10,
    "prompt": "Which command must you enter to configure a DHCP relay?",
    "options": [
      "ip helper-address",
      "ip address dhcp",
      "ip dhcp relay",
      "ip dhcp pool"
    ],
    "answer": 0,
    "explanation": "If the DHCP Server is not on the same subnet with the DHCP Client, we need to configure the router on the\nDHCP client side to act as a DHCP Relay Agent so that it can forward DHCP messages between the DHCP\nClient & DHCP Server. To make a router a DHCP Relay Agent, simply put the \"ip helper-address <IP-address-\nof-DHCP-Server>\" command under the interface that receives the DHCP messages from the DHCP Client.\n\nAs we know, router does not forward broadcast packets (it drops them instead) so DHCP messages like\nDHCPDISCOVER message will be dropped. But with the \"ip helper-address ...\" command, the router will\naccept that broadcast message and cover it into a unicast packet and forward it to the DHCP Server. The\ndestination IP address of the unicast packet is taken from the \"ip helper-address ...\" command."
  },
  {
    "legacyIndex": 297,
    "legacyNumber": 11,
    "prompt": "Where does a switch maintain DHCP snooping information?",
    "options": [
      "in the CAM table",
      "in the VLAN database",
      "in the DHCP binding database",
      "in the MAC address table"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 298,
    "legacyNumber": 1,
    "prompt": "Which output displays a JSON data representation?",
    "options": [
      "{ \"response\",{ \"taskId\",{}; \"url\",\"string\" }; \"version\", \"string\" }",
      "{ \"response\":{ \"taskId\",{}; \"url\",\"string\" }; \"version\"; \"string\" }",
      "{ \"response\"- { \"taskId\"- {}; \"url\"-\"string\" }, \"version\"-\"string\" }",
      "{ \"response\":{ \"taskId\":{}, \"url\":\"string\" }, \"version\": \"string\" }"
    ],
    "answer": 3,
    "explanation": "JSON data is written as name/value pairs.\nA name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value:\n\"name\":\"Mark\"\n\nJSON can use arrays. Array values must be of type string, number, object, array, boolean or null.. For\nexample:\n{\n\"name\":\"John\",\n\"age\":30,\n\"cars\":[ \"Ford\", \"BMW\", \"Fiat\" ]\n}\n\nJSON can have empty object like \"taskId\":{}"
  },
  {
    "legacyIndex": 299,
    "legacyNumber": 2,
    "prompt": "Which option best describes an API?",
    "options": [
      "communication often uses either Java scripting, Python, XML, or simple HTTP",
      "an architectural style (versus a protocol) for designing applications",
      "a stateless client-server model",
      "request a certain type of data by specifying the URL path that models the data"
    ],
    "answer": 2,
    "explanation": ""
  },
  {
    "legacyIndex": 300,
    "legacyNumber": 3,
    "prompt": "Which option about JSON is true?",
    "options": [
      "uses predefined tags or angle brackets (<>) to delimit markup text",
      "used to describe structured data that includes arrays",
      "used for storing information",
      "similar to HTML, it is more verbose than XML"
    ],
    "answer": 1,
    "explanation": "JSON data is written as name/value pairs.\nA name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value:\n\"name\":\"Mark\"\n\nJSON can use arrays. Array values must be of type string, number, object, array, boolean or null.. For\nexample:\n{\n\"name\":\"John\",\n\"age\":30,\n\"cars\":[ \"Ford\", \"BMW\", \"Fiat\" ]\n}"
  },
  {
    "legacyIndex": 301,
    "legacyNumber": 4,
    "prompt": "Which of the following is the JSON encoding of a dictionary or hash?",
    "options": [
      "{\"key\": \"value\"}",
      "[\"key\", \"value\"]",
      "{\"key\", \"value\"}",
      "(\"key\": \"value\")"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 302,
    "legacyNumber": 5,
    "prompt": "Which two encoding methods are supported by REST APIs? (Choose two)",
    "options": [
      "YAML",
      "JSON",
      "EBCDIC",
      "SGML",
      "XML"
    ],
    "answer": [
      1,
      4
    ],
    "type": "multi",
    "explanation": "The Application Policy Infrastructure Controller (APIC) REST API is a programmatic interface that uses REST\narchitecture. The API accepts and returns HTTP (not enabled by default) or HTTPS messages that contain\nJavaScript Object Notation (JSON) or Extensible Markup Language (XML) documents."
  },
  {
    "legacyIndex": 303,
    "legacyNumber": 6,
    "prompt": "What are two benefits of network automation? (Choose two)",
    "options": [
      "reduced operational costs",
      "reduced hardware footprint",
      "faster changes with more reliable results",
      "fewer network failures",
      "increased network security"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": ""
  },
  {
    "legacyIndex": 304,
    "legacyNumber": 7,
    "prompt": "Which type of API would be used to allow authorized salespeople of an organization access to internal sales\ndata from their mobile devices?",
    "options": [
      "partner",
      "open",
      "public",
      "private"
    ],
    "answer": 3,
    "explanation": "There are three types of API:\n+ Open APIs (Public APIs) - These APIs are publicly available and can be used with no restrictions. Because\nthese APIs are public, many API providers require the user to get a free key, or token, prior to using the API.\nThis is to help control the number of API requests they receive and process.\n+ Internal (Private APIs) - These are APIs that are used by an organization or company to access data and\nservices for internal use only. An example of an internal API is allowing authorized salespeople access to\ninternal sales data on their mobile devices.\n+ Partner APIs - These are APIs that are used between a company and its business partners or contractors\nto facilitate business between them. The business partner must have a license or other form of permission to\nuse the API. A travel service using an airline's API is an example of a partner API."
  },
  {
    "legacyIndex": 305,
    "legacyNumber": 8,
    "prompt": "What is a characteristic of the REST API?",
    "options": [
      "evolved into what became SOAP",
      "used for exchanging XML structured information over HTTP or SMTP",
      "considered slow, complex, and rigid",
      "most widely used API for web services"
    ],
    "answer": 3,
    "explanation": "REST API is an API that works on top of the HTTP protocol. It defines a set of functions developers can use to\nperform requests and receive responses via\nHTTP protocol such as GET and POST. REST APIs are the most popular API used for web services nowadays."
  },
  {
    "legacyIndex": 306,
    "legacyNumber": 9,
    "prompt": "Refer to the exhibit.\n\n  cisco_ospf_vrf {\"R1 default\":\n\n      ensure => 'present',\n      auto_cost => '100',\n  }\nWhich type of configuration is represented in the output?",
    "options": [
      "Puppet",
      "JSON",
      "Chef",
      "Ansible"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 307,
    "legacyNumber": 10,
    "prompt": "Which CRUD operation modifies an existing table or view?",
    "options": [
      "read",
      "replace",
      "create",
      "update"
    ],
    "answer": 3,
    "explanation": "CRUD is short for CREATE, READ, UPDATE and DELETE operations. Only UPDATE operation modifies an\nexisting table or view."
  },
  {
    "legacyIndex": 309,
    "legacyNumber": 1,
    "prompt": "Which command can you enter to allow Telnet to be supported in addition to SSH?",
    "options": [
      "transport input telnet ssh",
      "transport input telnet",
      "no transport input telnet",
      "privilege level 15"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 310,
    "legacyNumber": 2,
    "prompt": "A network engineer must back up 20 network router configurations globally within a customer environment.\nWhich protocol allows the engineer to perform this function using the copy function?",
    "options": [
      "COP",
      "SNMP",
      "SMTP",
      "ARP"
    ],
    "answer": 1,
    "explanation": "SNMP is an application-layer protocol that provides a message format for communication between SNMP\nmanagers and agents. SNMP provides a standardized framework and a common language used for the\nmonitoring and management of devices in a network.\nThe SNMP framework has three parts:\n+ An SNMP manager\n+ An SNMP agent\n+ A Management Information Base (MIB)\nThe Management Information Base (MIB) is a virtual information storage area for network management\ninformation, which consists of collections of managed objects.\nWith SNMP, the network administrator can send commands to multiple routers to do the backup."
  },
  {
    "legacyIndex": 311,
    "legacyNumber": 3,
    "prompt": "A Cisco IP phone receive untagged data traffic from an attached PC. Which action is taken by the phone?",
    "options": [
      "It allows the traffic to pass through unchanged",
      "It drops the traffic",
      "It tags the traffic with the default VLAN",
      "It tags the traffic with the native VLAN"
    ],
    "answer": 0,
    "explanation": "Untagged traffic from the device attached to the Cisco IP Phone passes through the phone unchanged,\nregardless of the trust state of the access port on the phone."
  },
  {
    "legacyIndex": 312,
    "legacyNumber": 4,
    "prompt": "Which function does an SNMP agent perform?",
    "options": [
      "It sends information about MIB variables in response to requests from the NMS",
      "It coordinates user authentication between a network device and a TACACS+ or RADIUS server",
      "It requests information from remote network nodes about catastrophic system events.",
      "It manages routing between Layer 3 devices in a network"
    ],
    "answer": 0,
    "explanation": ""
  },
  {
    "legacyIndex": 313,
    "legacyNumber": 5,
    "prompt": "What are two differences between optical-fiber cabling and copper cabling? (Choose two)",
    "options": [
      "Light is transmitted through the core of the fiber",
      "A BNC connector is used for fiber connections",
      "The glass core component is encased in a cladding",
      "Fiber connects to physical interfaces using RJ-45 connections",
      "The data can pass through the cladding"
    ],
    "answer": [
      0,
      2
    ],
    "type": "multi",
    "explanation": "The two main elements of an optical fiber are its core and cladding. The \"core\", or the axial part of the optical\nfiber made of silica glass, is the light transmission area of the fiber. It may sometimes be treated with a\n\"doping\" element to change its refractive index and therefore the velocity of light down the fiber.\nThe \"cladding\" is the layer completely surrounding the core."
  },
  {
    "legacyIndex": 314,
    "legacyNumber": 6,
    "prompt": "A device detects two stations transmitting frames at the same time. This condition occurs after the first 64\nbytes of the frame is received interface counter increments?",
    "options": [
      "collision",
      "runt",
      "CRC",
      "late collision"
    ],
    "answer": 3,
    "explanation": "A late collision is defined as any collision that occurs after the first 512 bits (or 64th byte) of the frame have\nbeen transmitted. The usual possible causes are full-duplex/half-duplex mismatch, exceeded Ethernet cable\nlength limits, or defective hardware such as incorrect cabling, non-compliant number of hubs in the network,\nor a bad NIC.\nLate collisions should never occur in a properly designed Ethernet network. They usually occur when Ethernet\ncables are too long or when there are too many repeaters in the network."
  },
  {
    "legacyIndex": 315,
    "legacyNumber": 7,
    "prompt": "Which technology must be implemented to configure network device monitoring with the highest security?",
    "options": [
      "SNMPv3",
      "IP SLA",
      "NetFlow",
      "syslog"
    ],
    "answer": 0,
    "explanation": "SNMPv3--The most up-to-date protocol focuses on security. SNMPv3 defines a security model, user-based\nsecurity model (USM), and a view-based access control model (VACM). SNMPv3 USM provides data integrity,\ndata origin authentication, message replay protection, and protection against disclosure of the message\npayload."
  },
  {
    "legacyIndex": 316,
    "legacyNumber": 8,
    "prompt": "A network analyst is tasked with configuring the date and time on a router using EXEC mode. The date must\nbe set to January 1,2020 and the time must be set to 12:00 am. Which command should be used?",
    "options": [
      "clock summer-time date",
      "clock set",
      "clock timezone",
      "clock summer-time recurring"
    ],
    "answer": 1,
    "explanation": "In this example, the clock time is set to 12:00 am with the clock date of January 1,2020.\nR1#clock set 12:00:00 jan 1 2020"
  }
];
