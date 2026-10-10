// Legacy CCNA 200-301 questions from the user-provided, licensed PDF source.
// Kept separate from current module questions so this older exam set stays clearly identified.
export const CCNA_LEGACY_200_301_QUESTIONS = [
  {
    "prompt": "Which two statements about the purpose of the OSI model are accurate? (Choose two)",
    "options": [
      "Defines the network functions that occur at each layer",
      "Facilitates an understanding of how information travels throughout a network",
      "Changes in one layer do not impact other layer",
      "Ensures reliable data delivery through its layered approach"
    ],
    "type": "multi",
    "answer": [
      0,
      1
    ]
  },
  {
    "prompt": "What is the default behavior of a Layer 2 switch when a frame with an unknown destination MAC address is received?",
    "options": [
      "The Layer 2 switch drops the received frame",
      "The Layer 2 switch floods packets to all ports except the receiving port in the given VLAN",
      "The Layer 2 switch sends a copy of a packet to CPU for destination MAC address learning",
      "The Layer 2 switch forwards the packet and adds the destination MAC address to Its MAC address table"
    ],
    "answer": 1,
    "explanation": "If the destination MAC address is not in the CAM table (unknown destination MAC address), the switch sends the frame out all other ports that are in the same VLAN as the received frame. This is called flooding. It does not flood the frame out the same port on which the frame was received."
  },
  {
    "prompt": "What is the destination MAC address of a broadcast frame?",
    "options": [
      "00:00:0c:07:ac:01",
      "ff:ff:ff:ff:ff:ff",
      "43:2e:08:00:00:0c",
      "00:00:0c:43:2e:08",
      "00:00:0crfHfrff"
    ],
    "answer": 1
  },
  {
    "prompt": "Which action is taken by a switch port enabled for PoE power classification override?",
    "options": [
      "When a powered device begins drawing power from a PoE switch port a syslog message is generated",
      "As power usage on a PoE switch port is checked data flow to the connected device is temporarily paused",
      "If a switch determines that a device is using less than the minimum configured power it assumes the\ndevice has failed and disconnects",
      "If a monitored port exceeds the maximum administrative value for power, the port is shutdown and err-\ndisabled"
    ],
    "answer": 3,
    "explanation": "PoE monitoring and policing compares the power consumption on ports with the administrative maximum value (either a configured maximum value or the port’s default value). If the power consumption on a monitored port exceeds the administrative maximum value, the following actions occur: + A syslog message is issued. + The monitored port is shut down and error-disabled. + The allocated power is freed."
  },
  {
    "prompt": "In which way does a spine and-leaf architecture allow for scalability in a network when additional access ports are required?",
    "options": [
      "A spine switch and a leaf switch can be added with redundant connections between them",
      "A spine switch can be added with at least 40 GB uplinks",
      "A leaf switch can be added with a single connection to a core spine switch",
      "A leaf switch can be added with connections to every spine switch"
    ],
    "answer": 3,
    "explanation": "Spine-leaf architecture is typically deployed as two layers: spines (such as an aggregation layer), and leaves (such as an access layer). Spine-leaf topologies provide high-bandwidth, low-latency, nonblocking server-to- server connectivity. Leaf (access) switches are what provide devices access to the fabric (the network of spine and leaf switches) and are typically deployed at the top of the rack. Generally, devices connect to the leaf switches. Devices can include servers, Layer 4-7 services (firewalls and load balancers), and WAN or Internet routers. Leaf switches do not connect to other leaf switches. In spine-and-leaf architecture, every leaf should connect to every spine in a full mesh. Spine (aggregation) switches are used to connect to all leaf switches and are typically deployed at the end or middle of the row. Spine switches do not connect to other spine switches."
  },
  {
    "prompt": "A frame that enters a switch fails the Frame Check Sequence. Which two interface counters are incremented? (Choose two)",
    "options": [
      "runts",
      "giants",
      "frame",
      "CRC",
      "input errors"
    ],
    "type": "multi",
    "answer": [
      3,
      4
    ],
    "explanation": "Whenever the physical transmission has problems, the receiving device might receive a frame whose bits have changed values. These frames do not pass the error detection logic as implemented in the FCS field in the Ethernet trailer. The receiving device discards the frame and counts it as some kind of input error. Cisco switches list this error as a CRC error. Cyclic redundancy check (CRC) is a term related to how the FCS math detects an error. The “input errors” includes runts, giants, no buffer, CRC, frame, overrun, and ignored counts. The output below show the interface counters with the “show interface s0/0/0” command: Router#show interface s0/0/0 Serial0/0/0 is up, line protocol is up Hardware is M4T Description: Link to R2 Internet address is 10.1.1.1/30 MTU 1500 bytes, BW 1544 Kbit, DLY 20000 usec, reliability 255/255, txload 1/255, rxload 1/255 --output omitted-- 5 minute output rate 0 bits/sec, 0 packets/sec 268 packets input, 24889 bytes, 0 no buffer Received 0 broadcasts, 0 runts, 0 giants, 0 throttles 0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort 251 packets output, 23498 bytes, 0 underruns 0 output errors, 0 collisions, 0 interface resets 0 output buffer failures, 0 output buffers swapped out 0 carrier transitions DCD=up DSR=up DTR=up RTS=up CTS=up"
  },
  {
    "prompt": "What are two reasons that cause late collisions to increment on an Ethernet interface? (Choose two)",
    "options": [
      "when the sending device waits 15 seconds before sending the frame again",
      "when the cable length limits are exceeded",
      "when one side of the connection is configured for half-duplex",
      "when Carrier Sense Multiple Access/Collision Detection is used",
      "when a collision occurs after the 32nd byte of a frame has been transmitted"
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ],
    "explanation": "A late collision is defined as any collision that occurs after the first 512 bits (or 64th byte) of the frame have been transmitted. The usual possible causes are full-duplex/half-duplex mismatch, exceeded Ethernet cable length limits, or defective hardware such as incorrect cabling, non-compliant number of hubs in the network, or a bad NIC. Late collisions should never occur in a properly designed Ethernet network. They usually occur when Ethernet cables are too long or when there are too many repeaters in the network."
  },
  {
    "prompt": "What is the function of a server?",
    "options": [
      "It transmits packets between hosts in the same broadcast domain",
      "It provides shared applications to end users",
      "It routes traffic between Layer 3 devices",
      "It creates security zones between trusted and untrusted networks"
    ],
    "answer": 1
  },
  {
    "prompt": "What is a function of TFTP in network operations?",
    "options": [
      "transfers a configuration files from a server to a router on a congested link",
      "transfers IOS images from a server to a router for firmware upgrades",
      "transfers a backup configuration file from a server to a switch using a username and password",
      "transfers files between file systems on a router"
    ],
    "answer": 1
  },
  {
    "prompt": "What are two functions of a server on a network? (Choose two)",
    "options": [
      "runs applications that send and retrieve data for workstations that make requests",
      "achieves redundancy by exclusively using virtual server clustering",
      "housed solely in a data center that is dedicated to a single client",
      "runs the same operating system in order to communicate with other servers",
      "handles requests from multiple workstations at the same time"
    ],
    "type": "multi",
    "answer": [
      0,
      4
    ]
  },
  {
    "prompt": "What is the primary function of a Layer 3 device?",
    "options": [
      "to analyze traffic and drop unauthorized traffic from the Internet",
      "to transmit wireless traffic between hosts",
      "forward traffic within the same broadcast domain",
      "to pass traffic between different networks"
    ],
    "answer": 3
  },
  {
    "prompt": "What is the same for both copper and fiber interfaces when using SFP modules?",
    "options": [
      "They support an inline optical attenuator to enhance signal strength",
      "They accommodate single-mode and multi-mode in a single module",
      "They offer reliable bandwidth up to 100 Mbps in half duplex mode",
      "They provide minimal interruption to services by being hot-swappable"
    ],
    "answer": 3
  },
  {
    "prompt": "What is a characteristic of spine-and-leaf architecture?",
    "options": [
      "Each device is separated by the same number of hops",
      "It provides variable latency",
      "It provides greater predictability on STP blocked ports",
      "Each link between leaf switches allows for higher bandwidth"
    ],
    "answer": 0,
    "explanation": "Spine-leaf architecture is typically deployed as two layers: spines (such as an aggregation layer), and leaves (such as an access layer). Spine-leaf topologies provide high-bandwidth, low-latency (-> Answer B is not correct), nonblocking server-to-server connectivity. With a spine-and-leaf architecture, no matter which leaf switch to which a server is connected, its traffic always has to cross the same number of devices to get to another server (unless the other server is located on the same leaf) (-> Answer A is correct) . This approach keeps latency at a predictable level because a payload only has to hop to a spine switch and another leaf switch to reach its destination."
  },
  {
    "prompt": "What are two descriptions of three-tier network topologies? (Choose two)",
    "options": [
      "The core and distribution layers perform the same functions",
      "The access layer manages routing between devices in different domains",
      "The network core is designed to maintain continuous connectivity when devices fail",
      "The core layer maintains wired connections for each host",
      "The distribution layer runs Layer 2 and Layer 3 technologies"
    ],
    "type": "multi",
    "answer": [
      2,
      4
    ]
  },
  {
    "prompt": "What benefit does controller-based networking provide versus traditional networking?",
    "options": [
      "moves from a two-tier to a three-tier network architecture to provide maximum redundancy",
      "provides an added layer of security to protect from DDoS attacks",
      "allows configuration and monitoring of the network from one centralized port",
      "combines control and data plane functionality on a single device to minimize latency"
    ],
    "answer": 2
  },
  {
    "prompt": "Which purpose does a northbound API serve in a controller-based networking architecture?",
    "options": [
      "communicates between the controller and the physical network hardware",
      "reports device errors to a controller",
      "generates statistics for network hardware and traffic",
      "facilitates communication between the controller and the applications"
    ],
    "answer": 3
  },
  {
    "prompt": "What is the name of the layer in the Cisco borderless switched network design that is considered to be the backbone used for high-speed connectivity and fault isolation?",
    "options": [
      "data link",
      "access",
      "core",
      "network",
      "network access"
    ],
    "answer": 2,
    "explanation": "The key layers are access, distribution, and core. The core layer is the network backbone that hierarchically connects several layers of the network design, providing for connectivity between end devices, computing and data storage services located within the data center and other areas, and services within the network."
  },
  {
    "prompt": "A company needs to interconnect several branch offices across a metropolitan area. The network engineer is seeking a solution that provides high-speed converged traffic, including voice, video, and data on the same network infrastructure. The company also wants easy integration to their existing LAN infrastructure in their office locations. Which technology should be recommended?",
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
    "prompt": "Which two WAN architecture options help a business improve scalability and reliability for the network? (Choose two)",
    "options": [
      "dynamic routing",
      "static routing",
      "dual-homed branches",
      "single-homed branches",
      "asychronous routing"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ],
    "explanation": "Dual-homed branches (branches connects to two ISPs or one ISP with two connections) increases reliability for the network. Dynamic routing automatically use backup routes in the case of main routes fail which increases reliability. The configuration is remain unchanged or change a little when we expand the network thus increasing the scalability. Note: A scalable network can expand quickly to support new users and applications without impacting the performance of the service being delivered to existing users"
  },
  {
    "prompt": "Which WAN access technology is preferred for a small office / home office architecture?",
    "options": [
      "broadband cable access",
      "frame-relay packet switching",
      "dedicated point-to-point leased line",
      "Integrated Services Digital Network switching"
    ],
    "answer": 0
  },
  {
    "prompt": "Which two functions are performed by the core layer in a three-tier architecture? (Choose two)",
    "options": [
      "Provide direct connectivity for end user devices",
      "Police traffic that is sent to the edge of the network",
      "Provide uninterrupted forwarding service",
      "Inspect packets for malicious activity",
      "Ensure timely data transfer between layers"
    ],
    "type": "multi",
    "answer": [
      2,
      4
    ],
    "explanation": "Considerations at the core layer include + Providing high-speed switching (i.e., fast transport) + Providing reliability and fault tolerance + Scaling by using faster, and not more, equipment + Avoiding CPU-intensive packet manipulation caused by security, inspection, quality of service (QoS) classification, or other processes"
  },
  {
    "prompt": "Which function is performed by the collapsed core layer in a two-tier architecture?",
    "options": [
      "applying security policies",
      "marking interesting traffic for data polices",
      "enforcing routing policies",
      "attaching users to the edge of the network"
    ],
    "answer": 2,
    "explanation": "The three-tier hierarchical design maximizes performance, network availability, and the ability to scale the network design. However, many small enterprise networks do not grow significantly larger over time. Therefore, a two-tier hierarchical design where the core and distribution layers are collapsed into one layer is often more practical. A “collapsed core” is when the distribution layer and core layer functions are implemented by a single device . The primary motivation for the collapsed core design is reducing network cost, while maintaining most of the benefits of the three-tier hierarchical model."
  },
  {
    "prompt": "Which statement identifies the functionality of virtual machines?",
    "options": [
      "Virtualized servers run most efficiently when they are physically connected to a switch that is separate\nfrom the hypervisor",
      "The hypervisor can virtualize physical components including CPU, memory, and storage",
      "Each hypervisor can support a single virtual machine and a single software switch",
      "The hypervisor communicates on Layer 3 without the need for additional resources"
    ],
    "answer": 1
  },
  {
    "prompt": "An organization has decided to start using cloud-provided services. Which cloud service allows the organization to install its own operating system on a virtual machine?",
    "options": [
      "platform-as-a-service",
      "software-as-a-service",
      "network-as-a-service",
      "infrastructure-as-a-service"
    ],
    "answer": 3,
    "explanation": "Below are the 3 cloud supporting services cloud providers provide to customer: + SaaS (Software as a Service): SaaS uses the web to deliver applications that are managed by a third-party vendor and whose interface is accessed on the clients’ side. Most SaaS applications can be run directly from a web browser without any downloads or installations required, although some require plugins. + PaaS (Platform as a Service): are used for applications, and other development, while providing cloud components to software. What developers gain with PaaS is a framework they can build upon to develop or customize applications. PaaS makes the development, testing, and deployment of applications quick, simple, and cost-effective. With this technology, enterprise operations, or a third-party provider, can manage OSes, virtualization, servers, storage, networking, and the PaaS software itself. Developers, however, manage the applications. + IaaS (Infrastructure as a Service): self-service models for accessing, monitoring, and managing remote datacenter infrastructures, such as compute (virtualized or bare metal), storage, networking, and networking services (e.g. firewalls). Instead of having to purchase hardware outright, users can purchase IaaS based on consumption, similar to electricity or other utility billing. In general, IaaS provides hardware so that an organization can install their own operating system."
  },
  {
    "prompt": "Anycompany has decided to reduce its environmental footprint by reducing energy costs, moving to a smaller facility, and promoting telecommuting. What service or technology would support this requirement?",
    "options": [
      "Cisco ACI",
      "cloud services",
      "APIC-EM",
      "data center"
    ],
    "answer": 1
  },
  {
    "prompt": "What are two fundamentals of virtualization? (Choose two)",
    "options": [
      "The environment must be configured with one hypervisor that serves solely as a network manager to\nmonitor SNMP traffic",
      "It allows logical network devices to move traffic between virtual machines and the rest of the physical\nnetwork",
      "It allows multiple operating systems and applications to run independently on one physical server",
      "It allows a physical router to directly connect NICs from each virtual machine into the network",
      "It requires that some servers, virtual machines and network gear reside on the Internet"
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ]
  },
  {
    "prompt": "What role does a hypervisor provide for each virtual machine in server virtualization?",
    "options": [
      "control and distribution of physical resources",
      "software-as-a-service",
      "services as a hardware controller",
      "infrastructure-as-a-service"
    ],
    "answer": 0,
    "explanation": "Each virtual machine has its own set of virtual hardware (RAM, CPU, NIC) upon which an operating system and fully configured applications are loaded. The operating system sees a consistent, normalized set of hardware regardless of the actual physical hardware components."
  },
  {
    "prompt": "A manager asks a network engineer to advise which cloud service models are used so employees do not have to waste their time installing, managing, and updating software which is only used occasionally. Which cloud service model does the engineer recommend?",
    "options": [
      "infrastructure-as-a-service",
      "software-as-a-service",
      "platform-as-a-service",
      "business process as service to support different types of service"
    ],
    "answer": 1,
    "explanation": "Software-as-a-service (SaaS) helps save a lot of time to install OS, softwares for running a business. CDP Quick Summary Cisco Discovery Protocol (CDP) is a Layer 2 protocol that runs on Cisco devices and enables networking applications to learn about directly connected devices nearby. The information contained in Cisco Discovery Protocol advertisements varies based on the type of device and the installed version of the operating system. Some of the information that Cisco Discovery Protocol can learn includes: + Cisco IOS version running on Cisco devices + Hardware platform of devices + IP addresses of interfaces on devices + Locally connected devices advertising Cisco Discovery Protocol + Interfaces active on Cisco devices, including encapsulation type + Hostname + Duplex setting + VLAN Trunking Protocol (VTP) domain + Native VLAN"
  },
  {
    "prompt": "How can the Cisco Discovery Protocol be used?",
    "options": [
      "to allow a switch to discover the devices that are connected to its ports",
      "to determine the hardware platform of the device",
      "to determine the IP addresses of connected Cisco devices",
      "all of the above"
    ],
    "answer": 3
  },
  {
    "prompt": "In a CDP environment, what happens when the CDP interface on an adjacent device is configured without an IP address?",
    "options": [
      "CDP operates normally, but it cannot provide any information for that neighbor.",
      "CDP operates normally, but it cannot provide IP address information for that neighbor.",
      "CDP uses the IP address of another interface for that neighbor.",
      "CDP becomes inoperable on that neighbor."
    ],
    "answer": 2,
    "explanation": "If a neighbor has no IP address on an interface enabled with Cisco Discovery Protocol, the IP address of another interface will be updated as IP address for the non-IP address interface."
  },
  {
    "prompt": "Which command should you enter to configure an LLDP delay time of 5 seconds?",
    "options": [
      "lldp reinit 5",
      "lldp reinit 5000",
      "lldp holdtime 5",
      "lldp timer 5000"
    ],
    "answer": 0,
    "explanation": "+ lldp holdtime seconds : Specify the amount of time a receiving device should hold the information from your device before discarding it + lldp reinit delay : Specify the delay time in seconds for LLDP to initialize on an interface + lldp timer rate : Set the sending frequency of LLDP updates in seconds"
  },
  {
    "prompt": "Which command is used to enable LLDP globally on a Cisco IOS ISR?",
    "options": [
      "lldp run",
      "lldp enable",
      "lldp transmit",
      "cdp run",
      "cdp enable"
    ],
    "answer": 0,
    "explanation": "Link Layer Discovery Protocol (LLDP) is a industry standard protocol that allows devices to advertise, and discover connected devices, and there capabilities (same as CDP of Cisco). To enable it on Cisco devices, we have to use this command under global configuration mode: Sw(config)# lldp run"
  },
  {
    "prompt": "Which command is used to specify the delay time in seconds for LLDP to initialize on any interface?",
    "options": [
      "lldp timer",
      "lldp holdtime",
      "lldp reinit",
      "lldp tlv-select"
    ],
    "answer": 2,
    "explanation": "+ lldp holdtime seconds : Specify the amount of time a receiving device should hold the information from your device before discarding it + lldp reinit delay : Specify the delay time in seconds for LLDP to initialize on an interface + lldp timer rate : Set the sending frequency of LLDP updates in seconds"
  },
  {
    "prompt": "A network engineer must create a diagram of a multivendor network. Which command must be configured on the Cisco devices so that the topology of the network can be mapped?",
    "options": [
      "Device(Config)#lldp run",
      "Device(Config)#cdp run",
      "Device(Config-if)#cdp enable",
      "Device(Config)#flow-sampler-map topology"
    ],
    "answer": 0
  },
  {
    "prompt": "An engineer needs to configure LLDP to send the port description time length value (TLV). What command sequence must be implemented?",
    "options": [
      "switch#lldp port-description",
      "switch(config)#lldp port-description",
      "switch(config-line)#lldp port-description",
      "switch(config-if)#lldp port-description"
    ],
    "answer": 1,
    "explanation": "Use the switch(config)# lldp port-description option to specify the port description TLV messages."
  },
  {
    "prompt": "Which three statements about MAC addresses are correct? (Choose three)",
    "options": [
      "To communicate with other devices on a network, a network device must have a unique MAC address",
      "The MAC address is also referred to as the IP address",
      "The MAC address of a device must be configured in the Cisco IOS CLI by a user with administrative\nprivileges",
      "A MAC address contains two main components, the first of which identifies the manufacturer of the\nhardware and the second of which uniquely identifies the hardware",
      "An example of a MAC address is 0A:26:B8:D6:65:90",
      "A MAC address contains two main components, the first of which identifies the network on which the host\nresides and the second of which uniquely identifies the host on the network"
    ],
    "type": "multi",
    "answer": [
      0,
      3,
      4
    ]
  },
  {
    "prompt": "The SW1 interface g0/1 is in the down/down state. Which two configurations are valid reasons for the interface conditions? (Choose two)",
    "options": [
      "There is a duplex mismatch",
      "There is a speed mismatch",
      "There is a protocol mismatch",
      "The interface is shut down",
      "The interface is error-disabled"
    ],
    "type": "multi",
    "answer": [
      1,
      4
    ],
    "explanation": "The down/down state indicates a Layer 1 problem -> “Protocol mismatch” answer is a Layer 2 problem so it is not correct. Duplex should be matched on both side but it is not a must -> Therefore “duplex mismatch” is not a correct answer. The most common Layer 1 problems are faulty or incorrect cabling or hardware failure but none of them is in the answer choices. If the port is error-disabled, we will see it in down/down state so this answer is correct. SW#sh int f1/0/1 FastEthernet1/0/1 is down, line protocol is down (err- disabled) There are only two answers left, which are “speed mismatch” and “interface is shut down”. According to the table below (from the old and retired ICND1 100-101 Official Cert Guide), speed mismatch is also a cause of down/down state. Note: + Speed must match between two ends. We tested speed mismatch on real device but we only received “up/down” state. + If “interface is shut down” then we will see the “administratively down/down”, not “down/down” state. But the “down/down” state would be seen on the far end interface."
  },
  {
    "prompt": "What are two functions of a Layer 2 switch? (Choose two)",
    "options": [
      "makes forwarding decisions based on the MAC address of a packet",
      "selects the best route between networks on a WAN",
      "moves packets within a VLAN",
      "moves packets between different VLANs",
      "acts as a central point for association and authentication servers"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ]
  },
  {
    "prompt": "How does the dynamically-learned MAC address feature function?",
    "options": [
      "It requires a minimum number of secure MAC addresses to be filled dynamically",
      "Switches dynamically learn MAC addresses of each connecting CAM table",
      "The ports are restricted and learn up to a maximum of 10 dynamically-learned addresses",
      "The CAM table is empty until ingress traffic arrives at each port"
    ],
    "answer": 3,
    "explanation": "The MAC addresses in the CAM table are the source MAC addresses only. Therefore it only learns MAC address from ingress traffic. ote: If you are not sure about Virtual Local Area Network (VLAN), please read our Virtual Local Area Network VLAN Tutorial . Quick summary about VLAN: Be default all access ports belong to VLAN 1. If we want to assign a new VLAN, we have to use the command “switchport access vlan <vlan-id>” under interface mode. VLAN Benefits: – Logically group devices by department/function, not location so it provides more efficient use of bandwidth – Separate broadcast domains, thus reducing their sizes and help mitigate broadcast storms – Provide additional security because it separates sensitive data traffic from other traffic The following commands are used to a create a VLAN (for example VLAN 10) and assign it to an interface (for example fa0/1) on a switch: Switch(config)#vlan 10 //Create VLAN 10 first Switch(config)#interface fa0/1 Switch(config-if)#switchport access vlan 10 //assign Fa0/1 interface to VLAN 10 To verify a VLAN or check which ports belong to which VLAN, use the “show vlan” command (or “show vlan id <vlan-id>” for a specific VLAN) DTP Trunking modes"
  },
  {
    "prompt": "Two switches are connected and using Cisco Dynamic Trunking Protocol. SW1 is set to Dynamic Desirable. What is the result of this configuration?",
    "options": [
      "The link is in a downstate.",
      "The link is in an error disables stale",
      "The link is becomes an access port",
      "The link becomes a trunkport"
    ],
    "answer": 3,
    "explanation": "Maybe this question is missing the “SW2 is set to Dynamic Auto” part so we assume this part to find out the best answer. Dynamic Desirable + Dynamic Desirable/Dynamic Auto/Trunk will form a trunk link."
  },
  {
    "prompt": "Refer to exhibit. Which action do the switches take on the trunk link? interface FastEthernet0/1 interface FastEthernet0/1 switchport trunk encapsulation switchport trunk encapsulation dot1q dot1q switchport trunk native vlan 999 switchport trunk native vlan 99 switchport mode trunk switchport mode trunk",
    "options": [
      "The trunk does not form and the ports go into an err-disabled status",
      "The trunk forms but the mismatched native VLANs are merged into a single broadcast domain",
      "The trunk does not form, but VLAN 99 and VLAN 999 are allowed to traverse the link",
      "The trunk forms but VLAN 99 and VLAN 999 are in a shutdown state"
    ],
    "answer": 1,
    "explanation": "The trunk still forms with mismatched native VLANs and the traffic can actually flow between mismatched switches. But it is absolutely necessary that the native VLANs on both ends of a trunk link match; otherwise a native VLAN mismatch occurs, causing the two VLANs to effectively merge. For example with the above configuration, SW1 would send untagged frames for VLAN 999. SW2 receives them but would think they are for VLAN 99 so we can say these two VLANs are merged."
  },
  {
    "prompt": "What occurs to frames during the process of frame flooding?",
    "options": [
      "Frames are sent to all ports, including those that are assigned to other VLANs",
      "Frames are sent to every port on the switch that has a matching entry in MAC address table",
      "Frames are sent to every port on the switch in the same VLAN except from the originating port",
      "Frames are sent to every port on the switch in the same VLAN"
    ],
    "answer": 2
  },
  {
    "prompt": "An engineer must establish a trunk link between two switches. The neighboring switch is set to trunk or desirable mode. What action should be taken?",
    "options": [
      "configure switchport nonegotiate",
      "configure switchport mode dynamic desirable",
      "configure switchport mode dynamic auto",
      "configure switchport trunk dynamic desirable"
    ],
    "answer": 1,
    "explanation": "If the neighboring switch is set to trunk then we need to set our switch to desirable mode so that it can start the negotiation. In fact answer C is also correct according to the table below: But “desirable” mode is a safer answer so we should choose it."
  },
  {
    "prompt": "An engineer requires a switch interface to actively attempt to establish a trunk link with a neighbor switch. What command must be configured?",
    "options": [
      "switchport mode trunk",
      "switchport mode dynamic desirable",
      "switchport mode dynamic auto",
      "switchport nonegotiate"
    ],
    "answer": 1
  },
  {
    "prompt": "An engineer must configure interswitch VLAN communication between a Cisco switch and a third-party switch. Which action should be taken?",
    "options": [
      "configure IEEE 802.1p",
      "configure IEEE 802.1q",
      "configure ISL",
      "configure DSCP"
    ],
    "answer": 1,
    "explanation": "IEEE 802.1Q is the networking standard that supports virtual LANs (VLANs) on an Ethernet network. When a frame enters the VLAN-aware portion of the network (a trunk link, for example), a VLAN ID tag is added to represent the VLAN membership of that frame. The picture below shows how VLAN tag is added and removed while going through the network. Note: If you are not sure about STP or VTP, please read our Spanning Tree Protocol STP Tutorial , Rapid Spanning Tree Protocol RSTP Tutorial , STP Root Port Election Tutorial and VLAN Trunking Protocol VTP Tutorial ."
  },
  {
    "prompt": "How does STP prevent forwarding loops at OSI Layer 2?",
    "options": [
      "TTL",
      "MAC address forwarding",
      "Collision avoidance.",
      "Port blocking"
    ],
    "answer": 3
  },
  {
    "prompt": "What is the primary effect of the spanning-tree portfast command?",
    "options": [
      "It enables BPDU messages",
      "It minimizes spanning-tree convergence time",
      "It immediately puts the port into the forwarding state when the switch is reloaded",
      "It immediately enables the port in the listening state"
    ],
    "answer": 1,
    "explanation": "The purpose of Port Fast is to minimize the time interfaces must wait for spanning-tree to converge, it is effective only when used on interfaces connected to end stations."
  },
  {
    "prompt": "Which result occurs when PortFast is enabled on an interface that is connected to another switch?",
    "options": [
      "Spanning tree may fail to detect a switching loop in the network that causes broadcast storms",
      "VTP is allowed to propagate VLAN configuration information from switch to switch automatically.",
      "Root port choice and spanning tree recalculation are accelerated when a switch link goes down",
      "After spanning tree converges PortFast shuts down any port that receives BPDUs."
    ],
    "answer": 0,
    "explanation": "Enabling the PortFast feature causes a switch or a trunk port to enter the STP forwarding-state immediately or upon a linkup event, thus bypassing the listening and learning states. Note: To enable portfast on a trunk port you need the trunk keyword “spanning-tree portfast trunk “"
  },
  {
    "prompt": "Refer to exhibit. How does SW2 interact with other switches in this VTP domain? SW2 vtp domain cisco vtp mode transparent vtp password test interface fastethernet0/1 description connection to SW1 switchport mode trunk switchport trunk encapsulation dot1q",
    "options": [
      "It processes VTP updates from any VTP clients on the network on its access ports",
      "It receives updates from all VTP servers and forwards all locally configured VLANs out all trunk ports",
      "It forwards only the VTP advertisements that it receives on its trunk ports",
      "It transmits and processes VTP updates from any VTP Clients on the network on its trunk ports"
    ],
    "answer": 2,
    "explanation": "The VTP mode of SW2 is transparent so it only forwards the VTP updates it receives to its trunk links without processing them."
  },
  {
    "prompt": "Which state does the switch port move to when PortFast is enabled?",
    "options": [
      "learning",
      "forwarding",
      "blocking",
      "listening"
    ],
    "answer": 1
  },
  {
    "prompt": "What criteria is used first during the root port selection process?",
    "options": [
      "lowest neighbor’s port ID",
      "lowest path cost to the root bridge",
      "lowest neighbor’s bridge ID",
      "local port ID"
    ],
    "answer": 1
  },
  {
    "prompt": "Which configuration ensures that the switch is always the root for VLAN 750?",
    "options": [
      "Switch(config)#spanning-tree vlan 750 priority 0",
      "Switch(config)#spanning-tree vlan 750 priority 614440",
      "Switch(config)#spanning-tree vlan 750 priority 38003685",
      "Switch(config)#spanning-tree vlan 750 root primary"
    ],
    "answer": 0,
    "explanation": "The keyword here is “always” so we should set the priority to the lowest value which is 0. If we use the “primary root” keyword then our switch is only set to the lower value compared to other switches. And new switch added in the future can be set to lower value than our switch to take over the root role."
  },
  {
    "prompt": "Which spanning-tree enhancement avoids the learning and listening states and immediately places ports in the forwarding state?",
    "options": [
      "BPDUfilter",
      "BPDUguard",
      "Backbonefast",
      "PortFast"
    ],
    "answer": 3
  },
  {
    "prompt": "When using Rapid PVST+, which command guarantees the switch is always the root bridge for VLAN 200?",
    "options": [
      "spanning-tree vlan 200 priority 38572422",
      "spanning-tree vlan 200 priority 614440",
      "spanning-tree vlan 200 priority 0",
      "spanning-tree vlan 200 root primary"
    ],
    "answer": 2
  },
  {
    "prompt": "Which two statements about EtherChannel technology are true? (Choose two)",
    "options": [
      "EtherChannel provides increased bandwidth by bundling existing FastEthernet or Gigabit Ethernet\ninterfaces into a single EtherChannel",
      "STP does not block EtherChannel links",
      "You can configure multiple EtherChannel links between two switches, using up to a limit of sixteen physical\nports",
      "EtherChannel does not allow load sharing of traffic among the physical links within the EtherChannel",
      "EtherChannel allows redundancy in case one or more links in the EtherChannel fail"
    ],
    "type": "multi",
    "answer": [
      0,
      4
    ],
    "explanation": "In fact answer B is also correct as STP considers Etherchannel links as one physical link so this question should have three correct answers. But answer B is not as obvious as the other two answers so we should choose them. Answer C is not correct as “Commonly up to 16 links can be assigned to an EtherChannel, but only 8 can be active at a time”."
  },
  {
    "prompt": "Which mode must be used to configure EtherChannel between two switches without using a negotiation protocol?",
    "options": [
      "on",
      "auto",
      "active",
      "desirable"
    ],
    "answer": 0,
    "explanation": "The Static Persistence (or “on” mode) bundles the links unconditionally and no negotiation protocol is used. In this mode, neither PAgP nor LACP packets are sent or received."
  },
  {
    "prompt": "Which two command sequences must you configure on a switch to establish a Layer 3 EtherChannel with an open-standard protocol? (Choose two)",
    "options": [
      "interface GigabitEthernet0/0/1\nchannel-group 10 mode active",
      "interface GigabitEthernet0/0/1\nchannel-group 10 mode auto",
      "interface GigabitEthernet0/0/1\nchannel-group 10 mode on",
      "interface port-channel 10\nno switchport\nip address 172.16.0.1 255.255.255.0",
      "interface port-channel 10\nswitchport\nswitchport mode trunk"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ],
    "explanation": "In order to configure a Layer 3 EtherChannel, we must use the “no switchport” command and set the IP address on the (logical) port-channel interface. For open-standard EtherChannel protocol we must use LACP with “passive” & “active” mode. Note: If you are not sure about TCP & UDP, please read our TCP and UDP Tutorial ."
  },
  {
    "prompt": "What is the difference regarding reliability and communication type between TCP and UDP?",
    "options": [
      "TCP is reliable and is a connection-oriented protocol UDP is not reliable and is a connectionless protocol",
      "TCP is not reliable and is a connection-oriented protocol; UDP is reliable and is a connectionless protocol",
      "TCP is not reliable and is a connectionless protocol; UDP is reliable and is a connection-oriented protocol",
      "TCP is reliable and is a connectionless protocol; UDP is not reliable and is a connection-oriented protocol"
    ],
    "answer": 0
  },
  {
    "prompt": "How do TCP and UDP differ in the way they provide reliability for delivery of packets?",
    "options": [
      "TCP is a connectionless protocol that does not provide reliable delivery of data, UDP is a connection-\noriented protocol that uses sequencing to provide reliable delivery",
      "TCP does not guarantee delivery or error checking to ensure that there is no corruption of data UDP\nprovides message acknowledgement and retransmits data if lost",
      "TCP provides flow control to avoid overwhelming a receiver by sending too many packets at once, UDP\nsends packets to the receiver in a continuous stream without checking for sequencing",
      "TCP uses windowing to deliver packets reliably; UDP provides reliable message transfer between hosts by\nestablishing a three-way handshake"
    ],
    "answer": 2
  },
  {
    "prompt": "How do TCP and UDP differ in the way they guarantee packet delivery?",
    "options": [
      "TCP uses checksum, acknowledgement, and retransmissions, and UDP uses checksums only.",
      "TCP uses two-dimensional parity checks, checksums, and cyclic redundancy checks and UDP uses\nretransmissions only.",
      "TCP uses checksum, parity checks, and retransmissions, and UDP uses acknowledgements only.",
      "TCP uses retransmissions, acknowledgement and parity checks and UDP uses cyclic redundancy checks\nonly."
    ],
    "answer": 0
  },
  {
    "prompt": "How do TCP and UDP differ in the way that they establish a connection between two endpoints?",
    "options": [
      "TCP uses synchronization packets, and UDP uses acknowledgment packets",
      "UDP uses SYN, SYN ACK and FIN bits in the frame header while TCP uses SYN, SYN ACK and ACK bits",
      "UDP provides reliable message transfer and TCP is a connectionless protocol",
      "TCP uses the three-way handshake and UDP does not guarantee message delivery"
    ],
    "answer": 3
  },
  {
    "prompt": "An engineer must configure a /30 subnet between two routers. Which usable IP address and subnet mask combination meets this criteria?",
    "options": [
      "interface e0/0\ndescription to HQ-A371:10975\nip address 172.16.1.4 255.255.255.248",
      "interface e0/0\ndescription to HQ-A371:10975\nip address 10.2.1.3 255.255.255.252",
      "interface e0/0\ndescription to HQ-A371:10975\nip address 192.168.1.1 255.255.255.248",
      "interface e0/0\ndescription to HQ-A371:10975\nip address 209.165.201.2 255.255.255.252"
    ],
    "answer": 3,
    "explanation": "A /30 subnet means subnet mask of 255.255.255.252. But 10.2.1.3 255.255.255.252 is a broadcast IP address; only 209.165.201.2/30 is the usable IP address."
  },
  {
    "prompt": "Refer to exhibit. Which statement explains the configuration error message that is received? Router(config)#interface GigabitEthernet 1/0/1 Router(config-if)#ip address 192.168.16.143 255.255.255.240 Bad mask /28 for address 192.168.16.143",
    "options": [
      "It is a broadcast IP address",
      "The router does not support /28 mask",
      "It belongs to a private IP address range",
      "It is a network IP address"
    ],
    "answer": 0
  },
  {
    "prompt": "Which network allows devices to communicate without the need to access the Internet?",
    "options": [
      "172.9.0.0/16",
      "172.28.0.0/16",
      "192.0.0.0/8",
      "209.165.201.0/24"
    ],
    "answer": 1,
    "explanation": "This question asks about the private ranges of IPv4 addresses. The private ranges of each class of IPv4 are listed below: Class A private IP address ranges from 10.0.0.0 to 10.255.255.255 Class B private IP address ranges from 172.16.0.0 to 172.31.255.255 Class C private IP address ranges from 192.168.0.0 to 192.168.255.255 Only the network 172.28.0.0/16 belongs to the private IP address (of class B)."
  },
  {
    "prompt": "Which function does the range of private IPv4 addresses perform?",
    "options": [
      "allows multiple companies to each use the same addresses without conflicts",
      "provides a direct connection for hosts from outside of the enterprise network",
      "ensures that NAT is not required to reach the internet with private range addressing",
      "enables secure communications to the internet for all external hosts"
    ],
    "answer": 0
  },
  {
    "prompt": "A corporate office uses four floors in a building * Floor 1 has 24 users * Floor 2 has 29 users * Floor 3 has 28 users * Floor 4 has 22 users Which subnet summarizes and gives the most efficient distribution of IP addresses for the router configuration?",
    "options": [
      "192.168.0.0/26 as summary and 192.168.0.0/29 for each floor",
      "192.168.0.0/24 as summary and 192.168.0.0/28 for each floor",
      "192.168.0.0/23 as summary and 192.168.0.0/25 for each floor",
      "192.168.0.0/25 as summary and 192.168.0.0/27 for each floor"
    ],
    "answer": 3,
    "explanation": "We see the maximum number of user per floor is 29 users (Floor 2) < 32 so the best subnet mask should be 5 111 0 0000 which allows 2 – 2 = 30 hosts per subnet."
  },
  {
    "prompt": "Which goal is achieved by the implementation of private IPv4 addressing on a network?",
    "options": [
      "provides a reduction in size of the forwarding table on network routers",
      "provides an added level of protection against Internet exposure",
      "allows communication across the Internet to other private networks",
      "allows servers and workstations to communicate across public network boundaries"
    ],
    "answer": 1
  },
  {
    "prompt": "An office has 8 floors with approximately 30-40 users per floor. What command must be configured on the router Switched Virtual Interface to use address space efficiently?",
    "options": [
      "ip address 192.168.0.0 255.255.0.0",
      "ip address 192.168.0.0 255.255.254.0",
      "ip address 192.168.0.0 255.255.255.224",
      "ip address 192.168.0.0 255.255.255.128"
    ],
    "answer": 2,
    "explanation": "We cannot use the subnet mask of 255.255.254.0 (/23) because it is smaller than the default subnet mask of class C (/24). If we use /23 subnet mask, in fact we are summarizing (supernet) it -> Answer B is not correct. 1 With the subnet mask of 255.255.255.128, we have 2 = 2 subnets only, not enough for 8 floors -> Answer D is not correct. 6 We need 40 users per subnet so our subnet must support at least 64 (=2 ) hosts (in fact 62 hosts). So the last octet of subnet mask should be 1100 0000 (with 6 bits “0”) = 192 -> The suitable subnet mask is 2 255.255.255.192. But this subnet mask only provides 2 = 4 subnets, which is not enough for 8 floors. 3 For 8 floors we need 1110 0000 (2 = 8) for the last octet of subnet mask so the subnet mask should be 255.255.255.224. 5 But with the subnet mask of 255.255.255.224, the host addresses per subnet is 2 – 2 = 30 so we cannot fulfill the host addresses for 40 users. We can only provide IPs for 30 users. This question said “approximately 30-40 users per floor” so “30 users per floor” is acceptable. With “192.168.0.0 255.255.255.224” we have 8 subnets: + First subnet: 192.168.0.0 to 192.168.0.31 + Second subnet: 192.168.0.32 to 192.168.0.63 + Third subnet: 192.168.0.64 to 192.168.0.95 + Fourth subnet: 192.168.0.96 to 192.168.0.127 + Fifth subnet: 192.168.0.128 to 192.168.0.159 + Sixth subnet: 192.168.0.160 to 192.168.0.191 + Seventh subnet: 192.168.0.192 to 192.168.0.223 + Eighth subnet: 192.168.0.224 to 192.168.0.255"
  },
  {
    "prompt": "Which statement about static and dynamic routes is true?",
    "options": [
      "Dynamic routes are manually configured by a network administrator, while static routes are automatically\nlearned and adjusted by a routing protocol",
      "Static routes are manually configured by a network administrator, while dynamic routes are automatically\nlearned and adjusted by a routing protocol",
      "Static routes tell the router how to forward packets to networks that are not directly connected, while\ndynamic routes tell the router how to forward packets to networks that are directly connected",
      "Dynamic routes tell the router how to forward packets to networks that are not directly connected, while\nstatic routes tell the router how to forward packets to networks that are directly connected"
    ],
    "answer": 1
  },
  {
    "prompt": "Which of the following dynamic routing protocols are Distance Vector routing protocols? (Choose two)",
    "options": [
      "IS-IS",
      "EIGRP",
      "OSPF",
      "BGP",
      "RIP"
    ],
    "type": "multi",
    "answer": [
      1,
      4
    ]
  },
  {
    "prompt": "When a floating static route is configured, which action ensures that the backup route is used when the primary route falls?",
    "options": [
      "The floating static route must have a higher administrative distance than the primary route so it is used as\na backup",
      "The administrative distance must be higher on the primary route so that the backup route becomes\nsecondary",
      "The floating static route must have a lower administrative distance than the primary route so it is used as\na backup",
      "The default-information originate command must be configured for the route to be installed into the\nrouting table"
    ],
    "answer": 0
  },
  {
    "prompt": "Which attribute does a router use to select the best path when two or more different routes to the same destination exist from two different routing protocols?",
    "options": [
      "dual algorithm",
      "metric",
      "administrative distance",
      "hop count"
    ],
    "answer": 2
  },
  {
    "prompt": "Router A learns the same route from two different neighbors, one of the neighbor routers is an OSPF neighbor and the other is an EIGRP neighbor. What is the administrative distance of the route that will be installed in the routing table?",
    "options": [
      "20",
      "90",
      "110",
      "115"
    ],
    "answer": 1,
    "explanation": "The Administrative distance (AD) of EIGRP is 90 while the AD of OSPF is 110 so EIGRP route will be chosen to install into the routing table."
  },
  {
    "prompt": "A packet is destined for 10.10.1.22. Which static route does the router choose to forward the packet?",
    "options": [
      "ip route 10.10.1.0 255.255.255.240 10.10.255.1",
      "ip route 10.10.1.16 255.255.255.252 10.10.255.1",
      "ip route 10.10.1.20 255.255.255.252 10.10.255.1",
      "ip route 10.10.1.20 255.255.255.254 10.10.255.1"
    ],
    "answer": 2,
    "explanation": "The subnet 10.10.1.20/30 covers the destination 10.10.1.22 as this subnet ranges from 10.10.1.20 to 10.10.1.23 so it is the correct answer."
  },
  {
    "prompt": "Router R1 must send all traffic without a matching routing-table entry to 192.168.1.1. Which configuration accomplishes this task? A. R1#config t R1(config)#ip routing R1(config)#ip route default-route 192.168.1.1 B. R1#config t R1(config)#ip routing R1(config)#ip route 192.168.1.1 0.0.0.0 0.0.0.0 C. R1#config t R1(config)#ip routing R1(config)#ip route 0.0.0.0 0.0.0.0 192.168.1.1 D. R1#config t R1(config)#ip routing R1(config)#ip default-gateway 192.168.1.1 Answer: C",
    "options": [
      "R1#config t\nR1(config)#ip routing\nR1(config)#ip route default-route 192.168.1.1",
      "R1#config t\nR1(config)#ip routing\nR1(config)#ip route 192.168.1.1 0.0.0.0 0.0.0.0",
      "R1#config t\nR1(config)#ip routing\nR1(config)#ip route 0.0.0.0 0.0.0.0 192.168.1.1",
      "R1#config t\nR1(config)#ip routing\nR1(config)#ip default-gateway 192.168.1.1"
    ],
    "answer": 2
  },
  {
    "prompt": "R1 has learned route 10.10.10.0/24 via numerous routing protocols. Which route is installed?",
    "options": [
      "route with the lowest cost",
      "route with the next hop that has the highest IP",
      "route with the shortest prefix length",
      "route with the lowest administrative distance"
    ],
    "answer": 3
  },
  {
    "prompt": "What are two reasons for an engineer to configure a floating static route? (Choose two)",
    "options": [
      "to automatically route traffic on a secondary path when the primary path goes down",
      "to route traffic differently based on the source IP of the packet",
      "to enable fallback static routing when the dynamic routing protocol fails",
      "to support load balancing via static routing",
      "to control the return path of traffic that is sent from the router"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ],
    "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative distance (AD) of another static route or dynamic routes. By default a static route has an AD of 1 then floating static route must have the AD greater than 1. Floating static route has a manually configured administrative distance greater than that of the primary route and therefore would not be in the routing table until the primary route fails."
  },
  {
    "prompt": "What is the purpose of the show ip ospf interface command?",
    "options": [
      "displaying OSPF-related interface information",
      "displaying general information about OSPF routing processes",
      "displaying OSPF neighbor information on a per-interface basis",
      "displaying OSPF neighbor information on a per-interface-type basis"
    ],
    "answer": 0
  },
  {
    "prompt": "When OSPF learns multiple paths to a network, how does it select a route?",
    "options": [
      "It multiple the active K value by 256 to calculate the route with the lowest metric.",
      "For each existing interface, it adds the metric from the source router to the destination to calculate the\nroute with the lowest bandwidth.",
      "It divides a reference bandwidth of 100 Mbps by the actual bandwidth of the existing interface to calculate\nthe router with the lowest cost.",
      "It count the number of hops between the source router and the destination to determine the router with\nthe lowest metric"
    ],
    "answer": 2
  },
  {
    "prompt": "A user configured OSPF and advertised the Gigabit Ethernet interface in OSPF. By default, which type of OSPF network does this interface belong to?",
    "options": [
      "point-to-multipoint",
      "point-to-point",
      "broadcast",
      "nonbroadcast"
    ],
    "answer": 2,
    "explanation": "The Broadcast network type is the default for an OSPF enabled ethernet interface (while Point-to-Point is the default OSPF network type for Serial interface with HDLC and PPP encapsulation)."
  },
  {
    "prompt": "You have configured a router with an OSPF router ID, but its IP address still reflects the physical interface. Which action can you take to correct the problem in the least disruptive way?",
    "options": [
      "Reload the OSPF process",
      "Reload the router",
      "Save the router configuration",
      "Specify a loopback address"
    ],
    "answer": 0
  },
  {
    "prompt": "An engineer configured an OSPF neighbor as a designated router. Which state verifies the designated router is in the proper mode?",
    "options": [
      "Exchange",
      "2-way",
      "Full",
      "Init"
    ],
    "answer": 2
  },
  {
    "prompt": "A user configured OSPF in a single area between two routers. A serial interface connecting R1 and R2 is running encapsulation PPP. By default which OSPF network type is seen on this interface when the user types show ip ospf interface on R1 or R2?",
    "options": [
      "point-to-multipoint",
      "broadcast",
      "point-to-point",
      "non-broadcast"
    ],
    "answer": 2,
    "explanation": "The default OSPF network type for HDLC and PPP on Serial link is point-to-point (while the default OSPF network type for Ethernet link is Broadcast)."
  },
  {
    "prompt": "R1 has learned route 192.168.12.0/24 via IS-IS, OSPF, RIP and Internal EIGRP. Under normal operating conditions, which routing protocol is installed in the routing table?",
    "options": [
      "IS-IS",
      "RIP",
      "Internal EIGRP",
      "OSPF"
    ],
    "answer": 2,
    "explanation": "With the same route (prefix), the router will choose the routing protocol with lowest Administrative Distance (AD) to install into the routing table. The AD of Internal EIGRP (90) is lowest so it would be chosen. The table below lists the ADs of popular routing protocols. Note: The AD of IS-IS is 115. The “EIGRP” in the table above is “Internal EIGRP”. The AD of “External EIGRP” is 170. An EIGRP external route is a route that was redistributed into EIGRP."
  },
  {
    "prompt": "Which two minimum parameters must be configured on an active interface to enable OSPFv2 to operate? (Choose two)",
    "options": [
      "OSPF area",
      "OSPF MD5 authentication key",
      "IPv6 address",
      "OSPF process ID",
      "OSPF stub flag"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ],
    "explanation": "To configure OSPFv2 under interface mode we must use the command “ip ospf {process-id} area {area-id}”. For example: R1(config-if)#ip ospf 1 area 2"
  },
  {
    "prompt": "Which step in the link-state routing process is described by a router sending Hello packets out all of the OSPF-enabled interfaces?",
    "options": [
      "electing the designated router",
      "establishing neighbor adjacencies",
      "injecting the default route",
      "exchanging link-state advertisements"
    ],
    "answer": 1
  },
  {
    "prompt": "An engineer must configure an OSPF neighbor relationship between router R1 and R3. The authentication configuration has been configured and the connecting interfaces are in the same 192.168.1.0/30 subnet. What are the next two steps to complete the configuration? (Choose two)",
    "options": [
      "configure the hello and dead timers to match on both sides",
      "configure the same process ID for the router OSPF process",
      "configure the same router ID on both routing processes",
      "configure the interfaces as OSPF active on both sides",
      "configure both interfaces with the same area ID"
    ],
    "type": "multi",
    "answer": [
      3,
      4
    ],
    "explanation": "We don’t need to configure hello and dead timers for OSPF neighbor as OSPF can auto negotiate the network type (with the same hello and dead timers on both sides). We just have to make sure both interfaces are running OSPF and they are in the same area ID. Note: If you are not sure about EIGRP, please read our EIGRP Tutorial ."
  },
  {
    "prompt": "A router running EIGRP has learned the same route from two different paths. Which parameter does the router use to select the best path?",
    "options": [
      "cost",
      "administrative distance",
      "metric",
      "as-path"
    ],
    "answer": 2
  },
  {
    "prompt": "Which two actions influence the EIGRP route selection process? (Choose two)",
    "options": [
      "The router calculates the reported distance by multiplying the delay on the exiting interface by 256",
      "The router calculates the best backup path to the destination route and assigns it as the feasible successor",
      "The router calculates the feasible distance of all paths to the destination route",
      "The advertised distance is calculated by a downstream neighbor to inform the local router of the\nbandwidth on the link",
      "The router must use the advertised distance as the metric for any given route"
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ],
    "explanation": "The reported distance (or advertised distance) is the cost from the neighbor to the destination. It is calculated from the router advertising the route to the network. For example in the topology below, suppose router A & B are exchanging their routing tables for the first time. Router B says “Hey, the best metric (cost) from me to IOWA is 50 and the metric from you to IOWA is 90” and advertises it to router A. Router A considers the first metric (50) as the Advertised distance. The second metric (90), which is from NEVADA to IOWA (through IDAHO), is called the Feasible distance. The reported distance is calculated in the same way of calculating the metric. By default (K1 = 1, K2 = 0, K3 = 1, K4 = 0, K5 = 0), the metric is calculated as follows: -> Answer A is not correct. Feasible successor is the backup route. To be a feasible successor, the route must have an Advertised distance (AD) less than the Feasible distance (FD) of the current successor route -> Answer B is correct. Feasible distance (FD): The sum of the AD plus the cost between the local router and the next-hop router. The router must calculate the FD of all paths to choose the best path to put into the routing table. Note: Although the new CCNA exam does not have EIGRP topic but you should learn the basic knowledge of this routing protocol."
  },
  {
    "prompt": "By default, how does EIGRP determine the metric of a route for the routing table?",
    "options": [
      "It uses the bandwidth and delay values of the path to calculate the route metric",
      "It uses a default metric of 10 for all routes that are learned by the router",
      "It uses a reference Bandwidth and the actual bandwidth of the connected link to calculate the route metric",
      "It counts the number of hops between the receiving and destination routers and uses that value as the\nmetric"
    ],
    "answer": 0
  },
  {
    "prompt": "Which statement about the nature of NAT overload is true?",
    "options": [
      "applies a one-to-many relationship to internal IP addresses",
      "applies a one-to-one relationship to internal IP addresses",
      "applies a many-to-many relationship to internal IP addresses",
      "can be configured only on Gigabit interface"
    ],
    "answer": 0
  },
  {
    "prompt": "Which keyword in a NAT configuration enables the use of one outside IP address for multiple inside hosts?",
    "options": [
      "source",
      "static",
      "pool",
      "overload"
    ],
    "answer": 3,
    "explanation": "By adding the keyword “overload” at the end of a NAT statement, NAT becomes PAT (Port Address Translation). This is also a kind of dynamic NAT that maps multiple private IP addresses to a single public IP address (many-to-one) by using different ports. Static NAT and Dynamic NAT both require a one-to-one mapping from the inside local to the inside global address. By using PAT, you can have thousands of users connect to the Internet using only one real global IP address. PAT is the technology that helps us not run out of public IP address on the Internet. This is the most popular type of NAT. An example of using “overload” keyword is shown below: R1(config)# ip nat inside source list 1 interface ethernet1 overload"
  },
  {
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
    "explanation": "NAT use four types of addresses: * Inside local address – The IP address assigned to a host on the inside network. The address is usually not an IP address assigned by the Internet Network Information Center (InterNIC) or service provider. This address is likely to be an RFC 1918 private address. * Inside global address – A legitimate IP address assigned by the InterNIC or service provider that represents one or more inside local IP addresses to the outside world. * Outside local address – The IP address of an outside host as it is known to the hosts on the inside network. * Outside global address – The IP address assigned to a host on the outside network. The owner of the host assigns this address."
  },
  {
    "prompt": "An engineer is configuring NAT to translate the source subnet of 10.10.0.0/24 to any one of three addresses: 192.168.3.1, 192.168.3.2, or 192.168.3.3. Which configuration should be used? Option A: Option B: enable enable configure terminal configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 prefix-length 30 route-map permit 10.10.0.0 255.255.255.0 access-list 1 permit 10.10.0.0 0.0.0.255 ip nat outside destination list 1 pool mypool ip nat outside destination list 1 pool mypool interface g1/1 interface g1/1 ip nat inside ip nat inside interface g1/2 interface g1/2 ip nat outside ip nat outside Option D: Option C: enable enable configure terminal configure terminal ip nat pool mypool 192.168.3.1 192.168.3.3 ip nat pool mypool 192.168.3.1 192.168.3.3 prefix-length 30 prefix-length 30 access-list 1 permit 10.10.0.0 0.0.0.254 access-list 1 permit 10.10.0.0 0.0.0.255 ip nat inside source list 1 pool mypool ip nat inside source list 1 pool mypool interface g1/1 interface g1/1 ip nat inside ip nat inside interface g1/2 interface g1/2 ip nat outside ip nat outside",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": 2,
    "explanation": "The command “ip nat inside source list 1 pool mypool” (notice the keyword “inside”, not “outside”). This command translates all source addresses that pass access list 1, which means a source address from 10.10.0.0/24, into an address from the pool named mypool (the pool contains addresses from 192.168.3.1 to 192.168.3.3). Quick review of NTP NTP uses the concept of a stratum to describe how many NTP hops away a machine is from an authoritative time source, usually a reference clock. A reference clock is a stratum 0 device that is assumed to be accurate and has little or no delay associated with it. Stratum 0 servers cannot be used on the network but they are directly connected to computers which then operate as stratum-1 servers. A stratum 1 time server acts as a primary network time standard. A stratum 2 server is connected to the stratum 1 server; then a stratum 3 server is connected to the stratum 2 server and so on. A stratum 2 server gets its time via NTP packet requests from a stratum 1 server. A stratum 3 server gets its time via NTP packet requests from a stratum-2 server… A stratum server may also peer with other stratum servers at the same level to provide more stable and robust time for all devices in the peer group (for example a stratum 2 server can peer with other stratum 2 servers). – NTP is designed to synchronize the time on a network. NTP runs over the User Datagram Protocol (UDP), using port 123 as both the source and destination. – To configure a Cisco device as an Authoritative NTP Server, use the ntp master [ stratum ] command. An Authoritative NTP Server can distribute time even when it is not synchronized to an existing time server. – To configure the local device to use a remote NTP clock source, use the command ntp server < IP address >. For example: Router(config)#ntp server 192.168.1.1 – The ntp authenticate command is used to enable the NTP authentication feature (NTP authentication is disabled by default). – The ntp trusted-key command specifies one or more keys that a time source must provide in its NTP packets in order for the device to synchronize to it. This command provides protection against accidentally synchronizing the device to a time source that is not trusted. – The ntp authentication-key defines the authentication keys. The device does not synchronize to a time source unless the source has one of these authentication keys and the key number is specified by the ntp trusted-key number command. – Two most popular commands to display time sources statistics: show ntp status and show ntp associations"
  },
  {
    "prompt": "Which command should you enter to configure a device as an NTP server?",
    "options": [
      "ntp server",
      "ntp peer",
      "ntp authenticate",
      "ntp master"
    ],
    "answer": 3,
    "explanation": "To configure a Cisco device as an Authoritative NTP Server, use the ntp master [ stratum ] command. To configure a Cisco device as a NTP client, use the command ntp server < IP address >. For example: Router(config)#ntp server 192.168.1.1. This command will instruct the router to query 192.168.1.1 for the time."
  },
  {
    "prompt": "Which two pieces of information can you determine from the output of the show ntp status command? (Choose two)",
    "options": [
      "whether the NTP peer is statically configured",
      "the IP address of the peer to which the clock is synchronized",
      "the configured NTP servers",
      "whether the clock is synchronized",
      "the NTP version number of the peer"
    ],
    "type": "multi",
    "answer": [
      1,
      3
    ],
    "explanation": "Below is the output of the “show ntp status” command. From this output we learn that R1 has a stratum of 10 and it is getting clock from 10.1.2.1. R1#show ntp status Clock is synchronized, stratum 10, reference is 10.1.2.1 nominal freq is 250.0000 Hz, actual freq is 249.9987 Hz, precision is 2**18 reference time is D5E492E9.98ACB4CF (13:00:25.596 CST Wed Sep 18 2013) clock offset is 15.4356 msec, root delay is 52.17 msec root dispersion is 67.61 msec, peer dispersion is 28.12 msec"
  },
  {
    "prompt": "Which two tasks must be performed to configure NTP to a trusted server in client mode on a single network device? (Choose two)",
    "options": [
      "Enable NTP authentication",
      "Verify the time zone",
      "Disable NTP broadcasts",
      "Specify the IP address of the NTP server",
      "Set the NTP server private key"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ],
    "explanation": "To configure authentication, perform this task in privileged mode: Step 1: Configure an authentication key pair for NTP and specify whether the key will be trusted or untrusted. Step 2: Set the IP address of the NTP server and the public key. Step 3: Enable NTP client mode. Step 4: Enable NTP authentication. Step 5: Verify the NTP configuration."
  },
  {
    "prompt": "What will happen if you configure the logging trap debug command on a router?",
    "options": [
      "It causes the router to send messages with lower severity levels to the syslog server",
      "It causes the router to send all messages with the severity levels Warning, Error, Critical, and Emergency\nto the syslog server",
      "It causes the router to send all messages to the syslog server",
      "It causes the router to stop sending all messages to the syslog server"
    ],
    "answer": 2
  },
  {
    "prompt": "If a notice-level messaging is sent to a syslog server, which event has occurred?",
    "options": [
      "A network device has restarted",
      "An ARP Inspection has failed",
      "A routing instance has flapped",
      "A debug operation is running"
    ],
    "answer": 2,
    "explanation": "Usually no action is required when a route flaps so it generates the notification syslog level message (level 5)."
  },
  {
    "prompt": "What event has occurred if a router sends a notice level message to a syslog server?",
    "options": [
      "A TCP connection has been torn down",
      "An ICMP connection has been built",
      "An interface line has changed status",
      "A certificate has expired"
    ],
    "answer": 2,
    "explanation": "If you used to configure a Cisco device then maybe you saw this notice level message: %LINEPROTO- 5 -UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down Number 5 in the above message represents for the Notification Level (Normal, but significant, conditions exist). Note: If you are not sure about HSRP, please read our HSRP tutorial ."
  },
  {
    "prompt": "Which command must you enter to guarantee that an HSRP router with higher priority becomes the HSRP primary router after it is reloaded?",
    "options": [
      "standby 10 preempt",
      "standby 10 version 1",
      "standby 10 priority 150",
      "standby 10 version 2"
    ],
    "answer": 0,
    "explanation": "The “preempt” command enables the HSRP router with the highest priority to immediately become the active router."
  },
  {
    "prompt": "Which command should you enter to verify the priority of a router in an HSRP group?",
    "options": [
      "show hsrp",
      "show sessions",
      "show interfaces",
      "show standby"
    ],
    "answer": 3,
    "explanation": "Below is an example of the “show standby” command: We can see the current HSRP priority of this device, which is 90 and the configured HSRP priority too (which is 90, too)."
  },
  {
    "prompt": "Which MAC address is recognized as a VRRP virtual address?",
    "options": [
      "0000.5E00.010a",
      "0005.3711.0975",
      "0000.0C07.AC99",
      "0007.C070.AB01"
    ],
    "answer": 0,
    "explanation": "With VRRP, the virtual router’s MAC address is 0000.5E00.01xx , in which xx is the VRRP group"
  },
  {
    "prompt": "Which two outcomes are predictable behaviors for HSRP? (Choose two)",
    "options": [
      "The two routers share a virtual IP address that is used as the default gateway for devices on the LAN",
      "The two routers negotiate one router as the active router and the other as the standby router",
      "Each router has a different IP address both routers act as the default gateway on the LAN, and traffic is\nload balanced between them",
      "The two routers synchronize configurations to provide consistent packet forwarding",
      "The two routed share the same IP address, and default gateway traffic is load-balanced between them"
    ],
    "type": "multi",
    "answer": [
      0,
      1
    ]
  },
  {
    "prompt": "How does HSRP provide first hop redundancy?",
    "options": [
      "It load-balances traffic by assigning the same metric value to more than one route to the same destination\nin the IP routing table",
      "It load-balances Layer 2 traffic along the path by flooding traffic out all interfaces configured with the\nsame VLAN",
      "It forwards multiple packets to the same destination over different routed links and data path",
      "It uses a shared virtual MAC and a virtual IP address to a group of routers that serve as the default\ngateway for hosts on a LAN"
    ],
    "answer": 3
  },
  {
    "prompt": "What is the primary purpose of a First Hop Redundancy Protocol?",
    "options": [
      "It allows directly connected neighbors to share configuration information",
      "It allows a router to use bridge priorities to create multiple loop-free paths to a single destination",
      "It reduces routing failures by allowing Layer 3 load balancing between OSPF neighbors that have the same\nlink metric",
      "It reduces routing failures by allowing more than one router to represent itself, as the default gateway of a\nnetwork"
    ],
    "answer": 3
  },
  {
    "prompt": "When the active router in an HSRP group fails, what router assumes the role and forwards packets?",
    "options": [
      "listening",
      "backup",
      "forwarding",
      "standby"
    ],
    "answer": 3,
    "explanation": "Standby router is backup when active router fails by monitoring periodic hellos sent by the active router (multicast to 224.0.0.2, UDP port 1985) to detect a failure of the active router. Note: If you are not sure about Access list, please read our Access List Tutorial ."
  },
  {
    "prompt": "While examining excessive traffic on the network, it is noted that all incoming packets on an interface appear to be allowed even though an IPv4 ACL is applied to the interface. Which two misconfigurations cause this behavior? (Choose two)",
    "options": [
      "The packets fail to match any permit statement",
      "A matching permit statement is too high in the access list",
      "A matching permit statement is too broadly defined",
      "The ACL is empty",
      "A matching deny statement is too high in the access list"
    ],
    "type": "multi",
    "answer": [
      1,
      3
    ],
    "explanation": "If we have a matching permit statement too high in the access list then it will be matched first before we can deny i -> Answer B is correct. The statement that an ACL always has an implicit deny any at the bottom has one exception. And that exception is when the ACL is empty . If you use ip access-group to apply an ACL and that ACL has no statements then all traffic is permitted -> Answer D is correct."
  },
  {
    "prompt": "AAA stands for authentication, authorization, and accounting.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1
  },
  {
    "prompt": "Which effect does the aaa new-model configuration command have?",
    "options": [
      "It configures the device to connect to a RADIUS server for AAA.",
      "It configures a local user on the device.",
      "It associates to RADIUS server to an AAA group.",
      "It enables AAA services on the device."
    ],
    "answer": 3
  },
  {
    "prompt": "What is the primary difference between AAA authentication and authorization?",
    "options": [
      "Authentication verifies a username and password, and authorization handles the communication between\nthe authentication agent and the user database",
      "Authentication identifies a user who is attempting to access a system, and authorization validates the\nusers password",
      "Authentication identifies and verifies a user who is attempting to access a system, and authorization\ncontrols the tasks the user can perform",
      "Authentication controls the system processes a user can access and authorization logs the activities the\nuser initiates"
    ],
    "answer": 2,
    "explanation": "AAA stands for Authentication, Authorization and Accounting. + Authentication: Specify who you are (usually via login username & password) + Authorization : Specify what actions you can do, what resource you can access + Accounting : Monitor what you do, how long you do it (can be used for billing and auditing) An example of AAA is shown below: + Authentication: “I am a normal user. My username/password is user_tom/learnforever “ + Authorization : “ user_tom can access LearnCCNA server via HTTP and FTP “ + Accounting : “ user_tom accessed LearnCCNA server for 2 hours “. This user only uses “show” commands."
  },
  {
    "prompt": "What is a difference between RADIUS and TACACS+?",
    "options": [
      "RADIUS is most appropriate for dial authentication, but TACACS+ can be used for multiple types of\nauthentication",
      "TACACS+ encrypts only password information and RADIUS encrypts the entire payload",
      "TACACS+ separates authentication and authorization, and RADIUS merges them",
      "RADIUS logs all commands that are entered by the administrator, but TACACS+ logs only start, stop, and\ninterim commands"
    ],
    "answer": 2
  },
  {
    "prompt": "How do AAA operations compare regarding user identification, user services and access control?",
    "options": [
      "Authorization provides access control and authentication tracks user services",
      "Authentication identifies users and accounting tracks user services",
      "Accounting tracks user services, and authentication provides access control",
      "Authorization identifies users and authentication provides access control"
    ],
    "answer": 1
  },
  {
    "prompt": "An email user has been lured into clicking a link in an email sent by their company’s security organization. The webpage that opens reports that it was safe but the link could have contained malicious code. Which type of security program is in place?",
    "options": [
      "Physical access control",
      "Social engineering attack",
      "brute force attack",
      "user awareness"
    ],
    "answer": 3,
    "explanation": "This is a training program which simulates an attack, not a real attack (as it says “The webpage that opens reports that it was safe”) so we believed it should be called a “user awareness” program. Therefore the best answer here should be “user awareness”. This is the definition of “User awareness” from CCNA 200-301 Offical Cert Guide Book: “ User awareness: All users should be made aware of the need for data confidentiality to protect corporate information, as well as their own credentials and personal information. They should also be made aware of potential threats, schemes to mislead, and proper procedures to report security incidents. “ Note: Physical access control means infrastructure locations, such as network closets and data centers, should remain securely locked."
  },
  {
    "prompt": "An engineer is asked to protect unused ports that are configured in the default VLAN on a switch. Which two steps will fulfill the request? (Choose two)",
    "options": [
      "Configure the ports in an EtherChannel",
      "Administratively shut down the ports",
      "Configure the port type as access and place in VLAN 99",
      "Configure the ports as trunk ports",
      "Enable the Cisco Discovery Protocol"
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ]
  },
  {
    "prompt": "Which configuration is needed to generate an RSA key for SSH on a router?",
    "options": [
      "Configure the version of SSH",
      "Configure VTY access",
      "Create a user with a password",
      "Assign a DNS domain name"
    ],
    "answer": 3,
    "explanation": "In order to generate an RSA key for SSH, we need to configure the hostname and a DNS domain name on the router (a username and password is also required). Therefore in fact both answer C and answer D are correct."
  },
  {
    "prompt": "Which two conditions must be met before SSH can operate normally on a Cisco IOS switch? (Choose two)",
    "options": [
      "The switch must be running a k9 (crypto) IOS image",
      "The ip domain-name command must be configured on the switch",
      "IP routing must be enabled on the switch",
      "A console password must be configured on the switch",
      "Telnet must be disabled on the switch"
    ],
    "type": "multi",
    "answer": [
      0,
      1
    ]
  },
  {
    "prompt": "When a site-to-site VPN is used, which protocol is responsible for the transport of user data?",
    "options": [
      "IKEv2",
      "IKEv1",
      "IPsec",
      "MD5"
    ],
    "answer": 2,
    "explanation": "A site-to-site VPN allows offices in multiple fixed locations to establish secure connections with each other over a public network such as the Internet. A site-to-site VPN means that two sites create a VPN tunnel by encrypting and sending data between two devices. One set of rules for creating a site-to-site VPN is defined by IPsec. In the topology above, Remote Campus sites can connect to the Main Campus through site-to-site VPNs."
  },
  {
    "prompt": "Which set of action satisfy the requirement for multi-factor authentication?",
    "options": [
      "The user swipes a key fob, then clicks through an email link",
      "The user enters a user name and password, and then clicks a notification in an authentication app on a\nmobile device",
      "The user enters a PIN into an RSA token, and then enters the displayed RSA key on a login screen",
      "The user enters a user name and password and then re-enters the credentials on a second screen"
    ],
    "answer": 1,
    "explanation": "This is an example of how two-factor authentication (2FA) works: 1. The user logs in to the website or service with their username and password. 2. The password is validated by an authentication server and, if correct, the user becomes eligible for the second factor. 3. The authentication server sends a unique code to the user’s second-factor method (such as a smartphone app). 4. The user confirms their identity by providing the additional authentication for their second-factor method."
  },
  {
    "prompt": "Which command prevents passwords from being stored in the configuration as plaintext on a router or switch?",
    "options": [
      "enable secret",
      "service password-encryption",
      "username Cisco password encrypt",
      "enable password"
    ],
    "answer": 1,
    "explanation": "“ enable secret” is the password that will be used to switch from User Exec mode to Priv Exec mode and it is always encrypted. It does not “prevent passwords from being stored in the configuration as plaintext” so this answer is not correct."
  },
  {
    "prompt": "The service password-encryption command is entered on a router. What is the effect of this configuration?",
    "options": [
      "restricts unauthorized users from viewing clear-text passwords in the running configuration",
      "prevents network administrators from configuring clear-text passwords",
      "protects the VLAN database from unauthorized PC connections on the switch",
      "encrypts the password exchange when a VPN tunnel is established"
    ],
    "answer": 0,
    "explanation": "The service password-encryption command will encrypt all current and future passwords so any password existed in the configuration will be encrypted. Note: With the “service password-encryption” command, administrators can still configure clear-text passwords but they will be encrypted in the configuration file. So we cannot say “prevents network administrators from configuring clear-text passwords”."
  },
  {
    "prompt": "In which two ways does a password manager reduce the chance of a hacker stealing a user’s password? (Choose two)",
    "options": [
      "It automatically provides a second authentication factor that is unknown to the original user",
      "It uses an internal firewall to protect the password repository from unauthorized access",
      "It protects against keystroke logging on a compromised device or web site",
      "It stores the password repository on the local workstation with built-in antivirus and anti-malware\nfunctionality",
      "It encourages users to create stronger passwords"
    ],
    "type": "multi",
    "answer": [
      2,
      4
    ],
    "explanation": "A password manager only helps you remember your chosen passwords without typing them by yourself. It automatically fills into the password textbox for you so it does not provides a second authentication factor. An example of second authentication factor is an one time password (OTP) sent to your phone after typing your password and you have to type this OTP to authenticate. By using a password manager, you are encouraged to create a complex password because you don’t need to remember it."
  },
  {
    "prompt": "What are two purposes of launching a reconnaissance attack on a network? (Choose two)",
    "options": [
      "to prevent other users from accessing the system",
      "to escalate access privileges",
      "to gather information about the network and devices",
      "to scan for accessibility",
      "to retrieve and modify data"
    ],
    "type": "multi",
    "answer": [
      2,
      3
    ]
  },
  {
    "prompt": "An organization secures its network with multi-factor authentication using an authenticator app on employee smartphones. How is the application secured in the case of a user’s smartphone being lost or stolen?",
    "options": [
      "The application requires an administrator password to reactivated after a configured interval.",
      "The application verifies that the user is in a specific location before it provides the second factor.",
      "The application requires the user to enter a PIN before it provides the second factor.",
      "The application challenges a user by requiring an administrator password to reactivate when the\nsmartphone is rebooted."
    ],
    "answer": 2
  },
  {
    "prompt": "Which type of attack can be mitigated by dynamic ARP inspection?",
    "options": [
      "malware",
      "DDoS",
      "worm",
      "man-in-the-middle"
    ],
    "answer": 3,
    "explanation": "ARP attack (like ARP poisoning/spoofing, man-in-the-middle) is a type of attack in which a malicious actor sends falsified ARP messages over a local area network as ARP allows a gratuitous reply from a host even if an ARP request was not received. This results in the linking of an attacker’s MAC address with the IP address of a legitimate computer or server on the network. This is an attack based on ARP which is at Layer 2. Dynamic ARP inspection (DAI) is a security feature that validates ARP packets in a network which can be used to mitigate this type of attack."
  },
  {
    "prompt": "Which technology is used to improve web traffic performance by proxy caching?",
    "options": [
      "Firepower",
      "FireSIGHT",
      "ASA",
      "WSA"
    ],
    "answer": 3,
    "explanation": "The Web Security appliance (WSA) intercepts requests that are forwarded to it by clients or other devices over the network. Proxy caching is a setting in WSA that caches data to increase performance."
  },
  {
    "prompt": "Which device performs stateful inspection of traffic?",
    "options": [
      "access point",
      "switch",
      "wireless controller",
      "firewall"
    ],
    "answer": 3,
    "explanation": "In stateful inspection, the firewall not only inspects packets up through the application layer/layer7 determining a packet’s header information and data content, but also monitors and keeps track of the connection’s state. For all active connections traversing the firewall, the state information, which may include IP addresses and ports involved, the sequence numbers and acknowledgement numbers of the packets traversing the connection, TCP packet flags, etc. is maintained in a state table."
  },
  {
    "prompt": "What are two recommendations for protecting network ports from being exploited when located in an office space outside of an IT closet? (Choose two)",
    "options": [
      "shut down unused ports",
      "enable the PortFast feature on ports",
      "implement port-based authentication",
      "configure ports to a fixed speed",
      "configure static ARP entries"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ]
  },
  {
    "prompt": "What is a practice that protects a network from VLAN hopping attacks?",
    "options": [
      "Change native VLAN to an unused VLAN ID",
      "Enable dynamic ARP inspection",
      "Configure an ACL to prevent traffic from changing VLANs",
      "Implement port security on internet-facing VLANs"
    ],
    "answer": 0,
    "explanation": "VLAN Hopping : By altering the VLAN ID on packets encapsulated for trunking, an attacking device can send or receive packets on various VLANs, bypassing Layer 3 security measures. VLAN hopping can be accomplished by switch spoofing or double tagging. One of a popular type of VLAN Hopping is Double-Tagging attack: In this attack, the attacking computer generates frames with two 802.1Q tags. The first tag matches the native VLAN of the trunk port (VLAN 10 in this case), and the second matches the VLAN of a host it wants to attack (VLAN 20). When the packet from the attacker reaches Switch A, Switch A only sees the first VLAN 10 and it matches with its native VLAN 10 so this VLAN tag is removed. Switch A forwards the frame out all links with the same native VLAN 10. Switch B receives the frame with an tag of VLAN 20 so it removes this tag and forwards out to the Victim computer. Note: This attack only works if the trunk (between two switches) has the same native VLAN as the attacker. In other words, this attack is only successful if the attacker belongs to the native VLAN of the trunk link. Another important point is, this attack is strictly one way as it is impossible to encapsulate the return packet. To mitigate this type of attack, we can use VLAN access control lists (VACLs, which applies to all traffic within a VLAN. We can use VACL to drop attacker traffic to specific victims/servers); or implement Private VLANs; or keep the native VLAN of all trunk ports different from user VLANs."
  },
  {
    "prompt": "Which technology can prevent client devices from arbitrarily connecting to the network without state remediation?",
    "options": [
      "MAC Authentication Bypass",
      "IP Source Guard",
      "802.1x",
      "802.11n"
    ],
    "answer": 3,
    "explanation": "The IEEE 802.1x standard defines a client-server-based access control and authentication protocol that prevents unauthorized clients from connecting to a LAN through publicly accessible ports unless they are properly authenticated. The authentication server authenticates each client connected to a switch port before making available any services offered by the switch or the LAN. Until the client is authenticated, 802.1x access control allows only Extensible Authentication Protocol over LAN (EAPOL), Cisco Discovery Protocol (CDP), and Spanning Tree Protocol (STP) traffic through the port to which the client is connected. After authentication is successful, normal traffic can pass through the port. estion 1 Refer to the exhibit. What is the effect of this configuration? ip arp inspection vlan 2 interface fastethernet 0/1 switchport mode access switchport access vlan 2 A. All ARP packets are dropped by the switch B. Egress traffic is passed only if the destination is a DHCP server. C. All ingress and egress traffic is dropped because the interface is untrusted D. The switch discard all ingress ARP traffic with invalid MAC-to-IP address bindings Dynamic ARP inspection is an ingress security feature; it does not perform any egress checking."
  },
  {
    "prompt": "Which command is used to configure an IPv6 static default route?",
    "options": [
      "ipv6 route ::/0 interface next-hop",
      "ipv6 route default interface next-hop",
      "ipv6 route 0.0.0.0/0 interface next-hop",
      "ip route 0.0.0.0/0 interface next-hop"
    ],
    "answer": 0
  },
  {
    "prompt": "Which command verifies whether any IPv6 ACLs are configured on a router?",
    "options": [
      "show ipv6 interface",
      "show access-list",
      "show ipv6 access-list",
      "show ipv6 route"
    ],
    "answer": 2
  },
  {
    "prompt": "Refer to exhibit. An engineer is configuring the New York router to reach the Lo1 interface of the Atlanta router using interface S0/0/0 as the primary path. Which two commands must be configured on the New York router so that it can reach the Lo1 interface of the Atlanta router via Washington when the link between New York and Atlanta goes down? (Choose two)\n\nConfigured interfaces:\n\nAtlanta:\n  S0/0/0: 2012::1/126\n  S0/0/1: 2013::1/126\n  Loopback1: 2000::1/128\n\nNew York:\n  S0/0/0: 2012::2/126\n  S0/0/1: 2023::2/126\n  Loopback2: 2000::2/128\n\nWashington:\n  S0/0/0: 2023::3/126\n  S0/0/1: 2013::3/126\n  Loopback3: 2000::3/128",
    "options": [
      "ipv6 route 2000::1/128 2012::1",
      "ipv6 route 2000::1/128 2012::1 5",
      "ipv6 route 2000::1/128 2012::2",
      "ipv6 route 2000::1/128 2023::2 5",
      "ipv6 route 2000::1/128 2023::3 5"
    ],
    "type": "multi",
    "answer": [
      0,
      4
    ],
    "explanation": "Floating static routes are static routes that have an administrative distance greater than the administrative distance (AD) of another static route or dynamic routes. By default a static route has an AD of 1 then floating static route must have the AD greater than 1. Floating static route has a manually configured administrative distance greater than that of the primary route and therefore would not be in the routing table until the primary route fails."
  },
  {
    "prompt": "Which IPv6 address type provides communication between subnets and cannot route on the Internet?",
    "options": [
      "global unicast",
      "unique local",
      "link-local",
      "multicast"
    ],
    "answer": 1,
    "explanation": "A IPv6 Unique Local Address is an IPv6 address in the block FC00::/7. It is the approximate IPv6 counterpart of the IPv4 private address. It is not routable on the global Internet. Note: In the past, Site-local addresses (FEC0::/10) are equivalent to private IP addresses in IPv4 but now they are deprecated. Link-local addresses only used for communications within the local subnet. It is usually created dynamically using a link-local prefix of FE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address)."
  },
  {
    "prompt": "Which command automatically generates an IPv6 address from a specified IPv6 prefix and MAC address of an interface?",
    "options": [
      "ipv6 address dhcp",
      "ipv6 address 2001:068:5:112::64 eui-64",
      "ipv6 address autoconfig",
      "ipv6 address 2001:068:5:112:2/64 link-local"
    ],
    "answer": 2,
    "explanation": "The “ipv6 address autoconfig” command causes the device to perform IPv6 stateless address auto- configuration to discover prefixes on the link and then to add the EUI-64 based addresses to the interface. Addresses are configured depending on the prefixes received in Router Advertisement (RA) messages. The device will listen for RA messages which are transmitted periodically from the router (DHCP Server). This RA message allows a host to create a global IPv6 address from: + Its interface identifier (EUI-64 address) + Link Prefix (obtained via RA) Note: Global address is the combination of Link Prefix and EUI-64 address Although answer B seems to be correct but it is missing the prefix-length /64:"
  },
  {
    "prompt": "Which IPv6 address block sends packets to a group address rather than a single address? OR Which IPv6 address block forwards packets to a multicast address rather than a unicast address?",
    "options": [
      "2000::/3",
      "FC00::/7",
      "FE80::/10",
      "FF00::/12"
    ],
    "answer": 3,
    "explanation": "Well-known multicast addresses have the prefix ff00::/12. FE80::/10 range is used for link-local addresses. Link-local addresses only used for communications within the local subnetwork (automatic address configuration, neighbor discovery, router discovery, and by many routing protocols). It is only valid on the current subnet. It is usually created dynamically using a link-local prefix of FE80::/10 and a 64-bit interface identifier (based on 48-bit MAC address)."
  },
  {
    "prompt": "When configuring IPv6 on an interface, which two IPv6 multicast groups are joined? (Choose two)",
    "options": [
      "2000::/3",
      "2002::5",
      "FC00::/7",
      "FF02::1",
      "FF02::2"
    ],
    "type": "multi",
    "answer": [
      3,
      4
    ],
    "explanation": "When an interface is configured with IPv6 address, it automatically joins the all nodes (FF02::1) and solicited-node (FF02::1:FFxx:xxxx) multicast groups. The all-node group is used to communicate with all interfaces on the local link, and the solicited-nodes multicast group is required for link-layer address resolution. Routers also join a third multicast group, the all-routers group (FF02::2)."
  },
  {
    "prompt": "Which action must be taken to assign a global unicast IPv6 address on an interface that is derived from the MAC address of that interface?",
    "options": [
      "configure a stateful DHCPv6 server on the network",
      "enable SLAAC on an interface",
      "disable the EUI-64 bit process",
      "explicitly assign a link-local address"
    ],
    "answer": 1
  },
  {
    "prompt": "What is the expected outcome when an EUI-64 address is generated?",
    "options": [
      "The seventh bit of the original MAC address of the interface is inverted",
      "The interface ID is configured as a random 64-bit value",
      "The characters FE80 are inserted at the beginning of the MAC address of the interface",
      "The MAC address of the interface is used as the interface ID without modification"
    ],
    "answer": 0,
    "explanation": "The IPv6 EUI-64 format address is obtained through the 48-bit MAC address. The MAC address is first separated into two 24-bits, with one being OUI (Organizationally Unique Identifier) and the other being NIC specific. The 16-bit 0xFFFE is then inserted between these two 24-bits to for the 64-bit EUI address. IEEE has chosen FFFE as a reserved value which can only appear in EUI-64 generated from the an EUI-48 MAC address -> Answer C and answer D are not correct. Let’s take an example of the MAC address of C601.420F.0007. This MAC address is divided into two 24-bit parts, which are “C60142” (OUI) and “0F0007” (NIC). Then “FFFE” is inserted in the middle. Therefore we have the address: C601.42FF.FE0F.0007. Then, according to the RFC 3513 we need to invert the Universal/Local bit (“U/L” bit) in the 7th position of the first octet. The “u” bit is set to 1 to indicate Universal, and it is set to zero (0) to indicate local scope. In this case we don’t need to set this bit to 1 because it is already 1 (C6 = 110001 1 0). Therefore with the subnet of 2001:DB8:0:1::/64, the full IPv6 address is 2001:DB8:0:1:C601:42FF:FE0F:7/64"
  },
  {
    "prompt": "Which type of IPv6 address is publicly routable in the same way as IPv4 public addresses?",
    "options": [
      "multicast",
      "unique local",
      "link-local",
      "global unicast"
    ],
    "answer": 3
  },
  {
    "prompt": "Refer to exhibit. The loopback1 interface of the Atlanta router must reach the loopback3 interface of the Washington router. Which two static host routes must be configured on the NEW York router? (Choose two)\n\nConfigured interfaces:\n\nAtlanta:\n  S0/0/0: 2012::1/126\n  S0/0/1: 2013::1/126\n  Loopback1: 2000::1/128\n\nNew York:\n  S0/0/0: 2012::2/126\n  S0/0/1: 2023::2/126\n  Loopback2: 2000::2/128\n\nWashington:\n  S0/0/0: 2023::3/126\n  S0/0/1: 2013::3/126\n  Loopback3: 2000::3/128",
    "options": [
      "ipv6 route 2000::1/128 2012::1",
      "ipv6 route 2000::3/128 2023::3",
      "ipv6 route 2000::3/128 s0/0/0",
      "ipv6 route 2000::1/128 2012::2",
      "ipv6 route 2000::1/128 s0/0/1"
    ],
    "type": "multi",
    "answer": [
      0,
      1
    ],
    "explanation": "The short syntax of static IPv6 route is: ipv6 route <destination-IPv6-address> {next-hop-IPv6-address | exit-interface} Therefore if we use the destination-IPv6-address, we have to specify the IPv6 address of the remote (next- hop) router, not the local IPv6 address. If we use the exit-interface, we have to use the local exit-interface, not remote interface. In this question, we have to suppose that all IPv6 addresses of Atlanta ends with .1 and Washington ends with .3 Please notice that this question asks about the command used on NEW York router so answer A is used to reach Atlanta router while answer B is used to reach Washington router."
  },
  {
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
    "prompt": "Which command must be present in a Cisco Device configuration to enable the device to resolve an FQDN?",
    "options": [
      "ip host",
      "ip name-server",
      "ip domain-lookup",
      "ip domain-name"
    ],
    "answer": 2,
    "explanation": "FQDN stands for Fully Qualified Domain Name. The FQDN represents the absolute address of the internet presence. “Fully qualified” refers to the unique identification that guarantees that all of the domain levels are specified. The FQDN contains the host name and domain, including the top level domain, and can be uniquely assigned to an IP address. For example: R1.9tut.com. The command “ip domain-lookup” enables DNS-based host name-to-address translation. This command is enabled by default."
  },
  {
    "prompt": "What facilitates a Telnet connection between devices by entering the device name?",
    "options": [
      "SNMP",
      "DNS lookup",
      "syslog",
      "NTP"
    ],
    "answer": 1,
    "explanation": "Your router can be configured to use DNS lookups if we wish to use the ping or traceroute commands with a host name rather than an IP address. For example: R1(config)#ip domain-lookup R1(config)#ip name-server 10.10.10.1 Then we can Telnet or ping to it: Router# ping www.cisco.com Translating \"www.cisco.com\"...domain server (10.10.10.1) [OK] Type escape sequence to abort. Sending 5, 100-byte ICMP Echos to 198.133.219.25, timeout is 2 seconds: !!!!!"
  },
  {
    "prompt": "How does a router behave when configured with the default DNS lookup settings, and a URL is entered on the CLI?",
    "options": [
      "prompts the user to specify the desired IP address.",
      "initiates a ping request to the URL.",
      "continuously attempts to resolve the URL until the command is cancelled.",
      "attempts to query a DNS server on the network."
    ],
    "answer": 3,
    "explanation": "By default, domain lookup function is enabled on the router so it treats every unrecognized command as a hostname, attempts to make a telnet connection to that which, in turn, attempts to resolve a hostname to IP address by querying the DNS server. Here is a typical sample. R1#xyz Translating “xyz”…domain server (255.255.255.255) Translating “xyz”…domain server (255.255.255.255) (255.255.255.255) Translating “xyz”…domain server (255.255.255.255) % Unknown command or computer name, or unable to find computer address Note: In order to save some time we can disable DNS lookup by the “no ip domain lookup” global command. QoS quick summary Quality of Service (QoS) allows you to define what is the treatment a specific packet will have during congestion. You can define which packets to drop, which should be stored and sent later, and which must be sent immediately. 1. Network factors: + Bandwidth : the speed of the link (or the capacity available on the link), usually measured in bits per second (bps) + Delay (or latency ): how long a packet takes to get from the sender to the receiver. The more the delay, the slower the network. Delay is usually measured in milliseconds (ms) + Jitter : A measure of the variation in delay between packets. For example, one packet need 50ms to reach B from A while another packet takes 40ms then the jitter is 10ms + Loss : When packets travels to the destination, some of them may get lost. 2. QoS Markings: + IP Precedence : The first three bits of the IP ToS field (8 traffic classes) + Differentiated Service Code Point (DSCP): The first six bits of the IP ToS are used to provide granular classification 3. QoS Models: + Best Effort : No QoS policies applied + Differentiated Services (DiffServ): Packets are classified and marked individually; policy decisions are made independently by each node in a path. + Integrated Services (IntServ): Resource Reservation Protocol (RSVP) is used to reserve bandwidth 4. QoS terms: + Classification : This involves categorizing network traffic into different groups based on specific criteria like IP address, protocol, port, or application type. + Marking : allows you to mark (set or change) a value (attribute) for the traffic belonging to a specific class + Queuing : entails holding packets in a queue and scheduling their transmission based on priority. + Policing : is used to control the rate of traffic flowing across an interface. During a bandwidth exceed (crossed the maximum configured rate), the excess traffic is generally dropped or remarked. The result of traffic policing is an output rate that appears as a saw-tooth with crests and troughs. Traffic policing can be applied to inbound and outbound interfaces. Unlike traffic shaping, QoS policing avoids delays due to queuing. Policing is configured in bytes. + Congestion : occurs when network bandwidth is insufficient to accommodate all traffic. + Shaping : retains excess packets in a queue and then schedules the excess for later transmission over increments of time. When traffic reaches the maximum configured rate, additional packets are queued instead of being dropped to proceed later. Traffic shaping is applicable only on outbound interfaces as buffering and queuing happens only on outbound interfaces. Shaping is configured in bits per second. The primary reasons you would use traffic shaping are to control access to available bandwidth, to ensure that traffic conforms to the policies established for it, and to regulate the flow of traffic in order to avoid congestion that can occur when the sent traffic exceeds the access speed of its remote, target interface. + Tail drop: When the queue is full, the packet is dropped. This is the default behavior. 5. Congestion Management (types of queuing): uses the marking on each packet to determine which queue to place packets in First-in, first-out (FIFO): FIFO entails no concept of priority or classes of traffic. With FIFO, transmission of packets out the interface occurs in the order the packets arrive, which means no QoS. Custom Queuing (CQ): provide specific traffic guaranteed bandwidth at a potential congestion point, assuring the traffic a fixed portion of available bandwidth and leaving the remaining bandwidth to other traffic. Weighted fair queueing (WFQ): allocates bandwidths to flows based on the weight. In addition, to allocate bandwidths fairly to flows, WFQ schedules packets in bits (not bytes). This prevents long packets from preempting bandwidths of short packets and reduces the delay and jitter when both short and long packets wait to be forwarded. Class-based weighted fair queueing (CBWFQ) extends the standard WFQ functionality to provide support for user-defined traffic classes. For CBWFQ, you define traffic classes based on match criteria including protocols, access control lists (ACLs), and input interfaces. Packets satisfying the match criteria for a class constitute the traffic for that class. A queue is reserved for each class, and traffic belonging to a class is directed to the queue for that class. Once a class has been defined according to its match criteria, you can assign it characteristics. To characterize a class, you assign it bandwidth, weight, and maximum packet limit. The bandwidth assigned to a class is the guaranteed bandwidth delivered to the class during congestion. Low latency queueing (LLQ) or also known as Priority Queuing (PQ): brings strict priority queuing (PQ) to CBWFQ. Strict PQ allows delay-sensitive packets such as voice to be sent before packets in other queues. LLQ reduces jitter in voice conversations. This type of queuing places traffic into one of four queues. Each queue has a different level of priority, and higher-priority queues must be emptied before packets are emptied from lower-priority queues. This behavior can “starve out” lower- priority traffic. The Resource Reservation Protocol (RSVP) protocol allows applications to reserve bandwidth for their data flows. It is used by a host, on the behalf of an application data flow, to request a specific amount of bandwidth from the network. RSVP is also used by the routers to forward bandwidth reservation requests."
  },
  {
    "prompt": "Which feature or protocol determines whether the QoS on the network is sufficient to support IP services?",
    "options": [
      "LLDP",
      "CDP",
      "IP SLA",
      "EEM"
    ],
    "answer": 2,
    "explanation": "IP SLA allows an IT professional to collect information about network performance in real time. Therefore it helps determine whether the QoS on the network is sufficient for IP services or not. Cisco IOS Embedded Event Manager (EEM) is a powerful and flexible subsystem that provides real-time network event detection and onboard automation. It gives you the ability to adapt the behavior of your network devices to align with your business needs."
  },
  {
    "prompt": "Which two actions are performed by the Weighted Random Early Detection mechanism? (Choose two)",
    "options": [
      "It drops lower-priority packets before it drops higher-priority packets",
      "It can identify different flows with a high level of granularity",
      "It guarantees the delivery of high-priority packets",
      "It can mitigate congestion by preventing the queue from filling up",
      "It supports protocol discovery"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ],
    "explanation": "Weighted Random Early Detection (WRED) is just a congestion avoidance mechanism. WRED drops packets selectively based on IP precedence. Edge routers assign IP precedences to packets as they enter the network. When a packet arrives, the following events occur: 1. The average queue size is calculated. 2. If the average is less than the minimum queue threshold, the arriving packet is queued. 3. If the average is between the minimum queue threshold for that type of traffic and the maximum threshold for the interface, the packet is either dropped or queued, depending on the packet drop probability for that type of traffic. 4. If the average queue size is greater than the maximum threshold, the packet is dropped. WRED reduces the chances of tail drop (when the queue is full, the packet is dropped) by selectively dropping packets when the output interface begins to show signs of congestion (thus it can mitigate congestion by preventing the queue from filling up). By dropping some packets early rather than waiting until the queue is full, WRED avoids dropping large numbers of packets at once and minimizes the chances of global synchronization. Thus, WRED allows the transmission line to be used fully at all times. WRED generally drops packets selectively based on IP precedence. Packets with a higher IP precedence are less likely to be dropped than packets with a lower precedence. Thus, the higher the priority of a packet, the higher the probability that the packet will be delivered (-> answer A is correct)."
  },
  {
    "prompt": "Which two QoS tools can provide congestion management? (Choose two)",
    "options": [
      "CBWFQ",
      "FRTS",
      "CAR",
      "PQ",
      "PBR"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ],
    "explanation": "This module discusses the types of queueing and queueing-related features (such as bandwidth management) which constitute the congestion management QoS features: Class-based WFQ (CBWFQ): extends the standard WFQ functionality to provide support for user-defined traffic classes. For CBWFQ, you define traffic classes based on match criteria including protocols, access control lists (ACLs), and input interfaces. Packets satisfying the match criteria for a class constitute the traffic for that class. Priority queueing (PQ): With PQ, packets belonging to one priority class of traffic are sent before all lower priority traffic to ensure timely delivery of those packets."
  },
  {
    "prompt": "Which option is the main function of congestion management?",
    "options": [
      "discarding excess traffic",
      "queuing traffic based on priority",
      "classifying traffic",
      "providing long-term storage of buffered data"
    ],
    "answer": 1
  },
  {
    "prompt": "What does traffic shaping do to reduce congestion in a network?",
    "options": [
      "buffers and queues packets",
      "buffers without queuing packets",
      "queues without buffering packets",
      "drops packets"
    ],
    "answer": 0,
    "explanation": "The following diagram illustrates the key difference between traffic policing and traffic shaping. Traffic policing propagates bursts. When the traffic rate reaches the configured maximum rate (or committed information rate), excess traffic is dropped (or remarked). The result is an output rate that appears as a saw- tooth with crests and troughs. In contrast to policing, traffic shaping retains excess packets in a queue and then schedules the excess for later transmission over increments of time. The result of traffic shaping is a smoothed packet output rate. Note: Committed information rate (CIR): The minimum guaranteed data transfer rate agreed to by the routing device."
  },
  {
    "prompt": "Which feature can you implement to reserve bandwidth for VoIP calls across the call path?",
    "options": [
      "round robin",
      "CBWFQ",
      "PQ",
      "RSVP"
    ],
    "answer": 3,
    "explanation": "The Resource Reservation Protocol (RSVP) protocol allows applications to reserve bandwidth for their data flows. It is used by a host, on the behalf of an application data flow, to request a specific amount of bandwidth from the network. RSVP is also used by the routers to forward bandwidth reservation requests."
  },
  {
    "prompt": "What is the purpose of traffic shaping?",
    "options": [
      "be a marking mechanism that identifies different flows",
      "to limit the bandwidth that a flow can use",
      "to provide fair queuing for buffered flows",
      "to mitigate delays over slow links"
    ],
    "answer": 1,
    "explanation": "The primary reasons you would use traffic shaping are to control access to available bandwidth , to ensure that traffic conforms to the policies established for it, and to regulate the flow of traffic in order to avoid congestion that can occur when the sent traffic exceeds the access speed of its remote, target interface."
  },
  {
    "prompt": "A network administrator enabled port security on a switch interface connected to a printer. What is the next configuration action in order to allow the port to learn the MAC address of the printer and insert it into the table automatically?",
    "options": [
      "implement auto MAC address learning",
      "implement static MAC addressing.",
      "enable sticky MAC addressing",
      "enable dynamic MAC address learning"
    ],
    "answer": 2
  },
  {
    "prompt": "A port security violation has occurred on a switch port due to the maximum MAC address count being exceeded. Which command must be configured to increment the security-violation count and forward an SNMP trap?",
    "options": [
      "switchport port-security violation access",
      "switchport port-security violation restrict",
      "switchport port-security violation protect",
      "switchport port-security violation shutdown"
    ],
    "answer": 1
  },
  {
    "prompt": "An engineer must configure a WLAN using the strongest encryption type for WPA2-PSK. Which cipher fulfills the configuration requirement?",
    "options": [
      "WEP",
      "RC4",
      "AES",
      "TKIP"
    ],
    "answer": 2,
    "explanation": "Many routers provide WPA2-PSK (TKIP), WPA2-PSK (AES), and WPA2-PSK (TKIP/AES) as options. TKIP is actually an older encryption protocol introduced with WPA to replace the very-insecure WEP encryption at the time. TKIP is actually quite similar to WEP encryption. TKIP is no longer considered secure, and is now deprecated. In other words, you shouldn’t be using it. AES is a more secure encryption protocol introduced with WPA2 and it is currently the strongest encryption type for WPA2-PSK."
  },
  {
    "prompt": "Which unified access point mode continues to serve wireless clients after losing connectivity to the Cisco Wireless LAN Controller?",
    "options": [
      "sniffer",
      "mesh",
      "flex connect",
      "local"
    ],
    "answer": 2,
    "explanation": "In previous releases, whenever a FlexConnect access point disassociates from a controller, it moves to the standalone mode. The clients that are centrally switched are disassociated. However, the FlexConnect access point continues to serve locally switched clients. When the FlexConnect access point rejoins the controller (or a standby controller), all clients are disconnected and are authenticated again. This functionality has been enhanced and the connection between the clients and the FlexConnect access points are maintained intact and the clients experience seamless connectivity. When both the access point and the controller have the same configuration, the connection between the clients and APs is maintained."
  },
  {
    "prompt": "Which QoS Profile is selected in the GUI when configuring a voice over WLAN deployment?",
    "options": [
      "Bronze",
      "Platinum",
      "Silver",
      "Gold"
    ],
    "answer": 1,
    "explanation": "Cisco Unified Wireless Network solution WLANs support four levels of QoS: Platinum/Voice, Gold/Video, Silver/Best Effort (default), and Bronze/Background."
  },
  {
    "prompt": "What is a design element when deploying an 802.11b wireless infrastructure?",
    "options": [
      "disabling TPC so that access points can negotiate signal levels with their attached wireless devices.",
      "setting the maximum data rate to 54 Mbps on the Cisco Wireless LAN Controller",
      "allocating non overlapping channels to access points that are in close physical proximity to one another",
      "configuring access points to provide clients with a maximum of 5 Mbps"
    ],
    "answer": 2
  },
  {
    "prompt": "Which statement about Link Aggregation when implemented on a Cisco Wireless LAN Controller is true?",
    "options": [
      "To pass client traffic two or more ports must be configured",
      "The EtherChannel must be configured in “mode active”",
      "When enabled the WLC bandwidth drops to 500 Mbps",
      "One functional physical port is needed to pass client traffic"
    ],
    "answer": 3,
    "explanation": "Link aggregation (LAG) is a partial implementation of the 802.3ad port aggregation standard. It bundles all of the controller’s distribution system ports into a single 802.3ad port channel. Restriction for Link aggregation: + LAG requires the EtherChannel to be configured for ‘mode on’ on both the controller and the Catalyst switch -> Answer B is not correct. + If the recommended load-balancing method cannot be configured on the Catalyst switch, then configure the LAG connection as a single member link or disable LAG on the controller -> Answer A is not correct while answer D is correct."
  },
  {
    "prompt": "Which mode allows access points to be managed by Cisco Wireless LAN Controllers?",
    "options": [
      "autonomous",
      "lightweight",
      "bridge",
      "mobility express"
    ],
    "answer": 1,
    "explanation": "A Lightweight Access Point (LAP) is an AP that is designed to be connected to a wireless LAN (WLAN) controller (WLC). APs are “lightweight,” which means that they cannot act independently of a wireless LAN controller (WLC). The WLC manages the AP configurations and firmware. The APs are “zero touch” deployed, and individual configuration of APs is not necessary."
  },
  {
    "prompt": "Which type of wireless encryption is used for WPA2 in pre-shared key mode?",
    "options": [
      "TKIP with RC4",
      "RC4",
      "AES-128",
      "AES-256"
    ],
    "answer": 2,
    "explanation": "WPA 2 implements the National Institute of Standards and Technology (NIST)-recommended Advanced Encryption Standard (AES) encryption algorithm with the use of Counter Mode with Cipher Block Chaining Message Authentication Code Protocol (CCMP). AES Counter Mode is a block cipher that encrypts 128-bit blocks of data at a time with a 128-bit encryption key."
  },
  {
    "prompt": "Which two values or settings must be entered when configuring a new WLAN in the Cisco Wireless LAN Controller GUI? (Choose two)",
    "options": [
      "management interface settings",
      "QoS settings",
      "ip address of one or more access points",
      "SSID",
      "Profile name"
    ],
    "type": "multi",
    "answer": [
      3,
      4
    ]
  },
  {
    "prompt": "Which feature on the Cisco Wireless LAN Controller when enabled restricts management access from specific networks?",
    "options": [
      "CPU ACL",
      "TACACS",
      "Flex ACL",
      "RADIUS"
    ],
    "answer": 0,
    "explanation": "Whenever you want to control which devices can talk to the main CPU, a CPU ACL is used. Note: CPU ACLs only filter traffic towards the CPU, and not any traffic exiting or generated by the CPU."
  },
  {
    "prompt": "Which 802.11 frame type is association response?",
    "options": [
      "management",
      "protected frame",
      "control",
      "action"
    ],
    "answer": 0,
    "explanation": "There are three main types of 802.11 frames: the Data Frame, the Management Frame and the Control Frame. Association Response belongs to Management Frame. Association response is sent in response to an association request."
  },
  {
    "prompt": "When configuring a WLAN with WPA2 PSK in the Cisco Wireless LAN Controller GUI, which two formats are available to select? (Choose two)",
    "options": [
      "ASCII",
      "base64",
      "binary",
      "decimal",
      "hexadecimal"
    ],
    "type": "multi",
    "answer": [
      0,
      4
    ],
    "explanation": "When configuring a WLAN with WPA2 Preshared Key (PSK), we can choose the encryption key format as either ASCII or HEX."
  },
  {
    "prompt": "What is a benefit of using a Cisco Wireless LAN Controller?",
    "options": [
      "Central AP management requires more complex configurations",
      "Unique SSIDs cannot use the same authentication method",
      "It supports autonomous and lightweight APs",
      "It eliminates the need to configure each access point individually"
    ],
    "answer": 3
  },
  {
    "prompt": "Several new coverage cells are required to improve the Wi-Fi network of an organization. Which two standard designs are recommended? (Choose two)",
    "options": [
      "5GHz provides increased network capacity with up to 23 nonoverlapping channels,",
      "5GHz channel selection requires an autonomous access point.",
      "Cells that overlap one another are configured to use nonoverlapping channels.",
      "Adjacent cells with overlapping channels use a repeater access point.",
      "For maximum throughput, the WLC is configured to dynamically set adjacent access points to the same\nchannel."
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ],
    "explanation": "The 802.11 standard defines 23 20MHz wide channels in the 5 GHz spectrum. Each channel is spaced 20MHz apart and separated into three Unlicensed National Information Infrastructure (UNII) bands."
  },
  {
    "prompt": "How does CAPWAP communicate between an access point in local mode and a WLC?",
    "options": [
      "The access point must directly connect to the WLC using a copper cable",
      "The access point must not be connected to the wired network, as it would create a loop",
      "The access point must be connected to the same switch as the WLC",
      "The access point has the ability to link to any switch in the network, assuming connectivity to the WLC"
    ],
    "answer": 3
  },
  {
    "prompt": "Which WPA3 enhancement protects against hackers viewing traffic on the Wi-Fi network?",
    "options": [
      "TKIP encryption",
      "AES encryption",
      "Scrambled encryption key",
      "SAE encryption"
    ],
    "answer": 3,
    "explanation": "Wi-Fi Protected Access version 3 (WPA3) is a new Wi-Fi Alliance’s (WFA) security standard for personal and enterprise networks. It aims to improve overall Wi-Fi security by using modern security algorithms and stronger cipher suites. WPA3 has two parts: + WPA3-Personal : Uses simultaneous authentication of equals (SAE) instead of pre-shared key (PSK), providing users with stronger security protections against attacks such as offline dictionary attacks, key recovery, and message forging. + WPA3-Enterprise : Offers stronger authentication and link-layer encryption methods, and an optional 192- bit security mode for sensitive security environments."
  },
  {
    "prompt": "What is a difference between local AP mode and FlexConnet AP mode?",
    "options": [
      "Local AP mode creates two CAPWAP tunnels per AP to the WLC",
      "FlexConnect AP mode fails to function if me AP loses connectivity with the WLC",
      "FlexConnect AP mode bridges the traffic from the AP to the WLC when local switching is configured",
      "Local AP mode causes the AP to behave as if it were an autonomous AP"
    ],
    "answer": 0,
    "explanation": "In Central Switched (Local) mode, an AP creates two CAPWAP tunnels to the Wireless Controller. One tunnel is used for forwarding data traffic and the other is used for forwarding the management traffic."
  },
  {
    "prompt": "When a WPA2-PSK WLAN is configured in the Wireless LAN Controller, what is the minimum number of characters that is required for the passphrase?",
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
    "prompt": "A wireless administrator has configured a WLAN; however, the clients need access to a less congested 5-GHz network for their voice quality. What action must be taken to meet the requirement?",
    "options": [
      "enable AAA override",
      "enable RX-SOP",
      "enable DTIM",
      "enable Band Select"
    ],
    "answer": 3,
    "explanation": "Band Select or Band Direction is a new feature that encourages dual band clients to connect to 5 G-Hz networks. Band select is disabled by default. The Band Select function provides a better wireless experience for users."
  },
  {
    "prompt": "What is a function of Wireless LAN Controller?",
    "options": [
      "send LWAPP packets to access points",
      "use SSIDs to distinguish between wireless clients",
      "register with a single access point that controls traffic between wired and wireless endpoints",
      "monitor activity on wireless and wired LANs"
    ],
    "answer": 0
  },
  {
    "prompt": "Which protocol prompts the Wireless LAN Controller to generate its own local web administration SSL certificate for GUI access?",
    "options": [
      "HTTP",
      "HTTPS",
      "TACACS+",
      "RADIUS"
    ],
    "answer": 1,
    "explanation": "When you enable HTTPS, the controller generates its own local web administration SSL certificate and automatically applies it to the GUI."
  },
  {
    "prompt": "What is a recommended approach to avoid co-channel congestion while installing access points that use the 2.4 GHz frequency?",
    "options": [
      "different nonoverlapping channels",
      "one nonoverlapping channel",
      "one overlapping channel",
      "different overlapping channels"
    ],
    "answer": 0,
    "explanation": "In the 2.4 GHz band, 1, 6, and 11 are the only non-overlapping channels so they should be chosen while installing APs. emium Member : You can test your knowledge with these questions first via this link (via HTML). SDN Quick Summary Everything that networking devices do can be categorized into three planes: Data Plane, Control Plane and Management Plane. + Data Plane : responsible for the switching of packets through the router. In short, it includes any action after receiving data (processing, encapsulating/decapsulating, matching destination MAC & IP addresses, forwarding, QoS, filtering with access-list) + Control Plane : responsible for maintaining sessions and exchanging protocol information with other network devices. It consists of dynamic IP routing protocols (OSPF, EIGRP, BGP…), the RIB, routing updates, in addition to other protocols such as STP, ARP, ICMP, PIM, IGMP, LACP… + Management Plane : is used to manage a device through its connection to the network. Examples of protocols processed in the management plane include Simple Network Management Protocol (SNMP), Telnet, File Transfer Protocol (FTP), Secure FTP, and Secure Shell (SSH). These management protocols are used for monitoring and for command-line interface (CLI) access Most traditional devices use a distributed architecture, in which each control plane is resided in a networking device. Therefore they need to communicate with each other via messages to work correctly. In contrast to distributed architecture, centralized (or controller-based) architectures centralizes the control of networking devices into one device, called SDN controller . Software-Defined Networking (SDN) is an approach to networking that centralizes the control plane into an application called a controller. As we took the control planes off networking devices but not data planes so we need a way to communicate with them. So we put a southbound interface (SBI) at the bottom of SDN controller for this task. An SBI communicates with the devices via an application programming interface (API). Now, in turn, the networking administrators and SDN applications want to control the controller! So the controller need a northbound interface (NBI) to communicate with us. The NBI applications included various network services, including network virtualization, dynamic virtual network provisioning, firewall monitoring, user identity management and access policy control. – REST (Representational State Transfer) describes a type of API that allows applications to sit on different hosts, using HTTP messages to transfer data over the API. Three SDN controllers which are mentioned in CCNA: + OpenDaylight Controller: an OpenFlow-based SDN + Cisco Application Centric Infrastructure (ACI) + Cisco APIC Enterprise Module (APIC-EM) SDN northbound APIs are usually RESTful APIs used to communicate between the SDN Controller and the services and applications running over the network. Another northbound API is Simple Object Access Protocol (SOAP). OpenFlow and NETCONF are Southbound APIs used for most SDN implementations. Another Southbound API is OpFlex, which is an open-standard, distributed control system. It send “summary policy” to network elements."
  },
  {
    "prompt": "Which statement about the Cisco ACI fabric is most accurate?",
    "options": [
      "The APIC is able to enforce security by inserting itself into the data path.",
      "The fabric header carries the EPG from the egress to the ingress leaf switch.",
      "An APIC is a cluster of at least three APIC controllers, providing a single point of management without a\nsingle point of failure.",
      "The spine switch rewrites the EPG from ingress to egress when it performs the forwarding proxy function"
    ],
    "answer": 2
  },
  {
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
    "prompt": "What are two characteristics of a controller-based network? (Choose two)",
    "options": [
      "The administrator can make configuration updates from the CLI",
      "It uses northbound and southbound APIs to communicate between architectural layers",
      "It moves the control plane to a central point",
      "It decentralizes the control plane, which allows each device to make its own forwarding decisions",
      "It uses Telnet to report system issues."
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ]
  },
  {
    "prompt": "What are two southbound APIs? (Choose two)",
    "options": [
      "Thrift",
      "NETCONF",
      "Open Flow",
      "DSC",
      "CORBA"
    ],
    "type": "multi",
    "answer": [
      1,
      2
    ],
    "explanation": "OpenFlow is a well-known southbound API. OpenFlow defines the way the SDN Controller should interact with the forwarding plane to make adjustments to the network, so it can better adapt to changing business requirements. The Network Configuration Protocol (NetConf) uses Extensible Markup Language (XML) to install, manipulate and delete configuration to network devices. Other southbound APIs are: + onePK: a Cisco proprietary SBI to inspect or modify the network element configuration without hardware upgrades. + OpFlex: an open-standard, distributed control system. It send “summary policy” to network elements."
  },
  {
    "prompt": "Which statement correctly compares traditional networks and controller-based networks?",
    "options": [
      "Only traditional networks offer a centralized control plane",
      "Only traditional networks natively support centralized management",
      "Traditional and controller-based networks abstract policies from device configurations",
      "Only controller-based networks decouple the control plane and the data plane"
    ],
    "answer": 3,
    "explanation": "Most traditional devices use a distributed architecture, in which each control plane is resided in a networking device. Therefore they need to communicate with each other via messages to work correctly. In contrast to distributed architecture, centralized (or controller-based) architectures centralizes the control of networking devices into one device, called SDN controller -> Answer D is correct."
  },
  {
    "prompt": "What software defined architecture plane assists network devices with making packet forwarding decisions by providing Layer 2 reachability and Layer 3 routing information?",
    "options": [
      "data plane",
      "control plane",
      "policy plane",
      "management plane"
    ],
    "answer": 1,
    "explanation": "Control Plane Function In its simplest form, the control plane provides layer-2 MAC reachability and layer-3 routing information to network devices that require this information to make packet forwarding decisions. In the case of firewalls, the control plane would include stateful flow information for inspection. Control plane functionality can implemented as follows: + Distributed – Conventional routers and switches operate using distributed protocols for control, i.e. where each device makes its own decisions about what to do, and communicate relevant information to other devices for input into their decision making process. For example, the Spanning Tree Protocol (STP), Fabric Path, and routing protocols such as IS-IS and BGP provide distributed control of packet forwarding functionality to networking devices. + Centralized – In this case, a centralized controller provides the necessary information for a network element to make a decision. For example, these controller(s) instruct networking devices on where to forward packets by explicitly programming their MAC and FIBs."
  },
  {
    "prompt": "What are two benefits of controller-based networking compared to traditional networking? (Choose two)",
    "options": [
      "controller-based increases network bandwidth usage, while traditional lightens the load on the network.",
      "controller-based reduces network configuration complexity, while traditional increases the potential for\nerrors",
      "controller-based inflates software costs, while traditional decreases individual licensing costs",
      "controller-based allows for fewer network failure, while traditional increases failure rates",
      "controller-based provides centralization of key IT functions, while traditional requires distributes\nmanagement function"
    ],
    "type": "multi",
    "answer": [
      1,
      4
    ]
  },
  {
    "prompt": "In software defined architectures, which plane is distributed and responsible for traffic forwarding?",
    "options": [
      "management plane",
      "control plane",
      "data plane",
      "policy plane",
      "The Cisco CU Analyzer tool gathers data from each licensed network device and streams it to the\ncontroller"
    ],
    "answer": 0,
    "explanation": "The Open Networking Foundation identifies three main parts of the Software-defined networking (SDN): Application layer; Control layer and Infrastructure layer. SDN separates a router’s control plane from the data (forwarding) plane. The control plane makes routing decisions. The data plane forwards data (packets) through the router. With SDN routing, decisions are made remotely instead of on each individual router. DNA Center Quick Summary Software-Defined Access (SDA) uses the software-defined architectural model, with a controller and various APIs. At the center sits the Digital Network Architecture (DNA) Center controller. DNA Center is the controller for SDA networks. DNA Center uses REST APIs on Northbound interface. On Southbound interface, DNA Center uses various protocols like RESTCONF, NETCONF etc. The southbound side of the controller contains the fabric, underlay, and overlay: Overlay : The mechanisms to create VXLAN tunnels between SDA switches, which are then used to transport traffic from one fabric endpoint to another over the fabric. Underlay : The network of devices and connections (cables and wireless) to provide IP connectivity to all nodes in the fabric, with a goal to support the dynamic discovery of all SDA devices and endpoints as a part of the process to create overlay VXLAN tunnels. The relationship between Overlay and Underlay is shown below: Fabric : The combination of overlay and underlay, which together provide all features to deliver data across the network with the desired features and attributes Cisco DNA Center is a software solution that resides on the Cisco DNA Center appliance. The solution receives data in the form of streaming telemetry from every device (switch, router, access point, and wireless access controller) on the network. This data provides Cisco DNA Center with the real-time information it needs for the many functions it performs."
  },
  {
    "prompt": "How do traditional campus device management and Cisco DNA Center device management differ in regards to deployment?",
    "options": [
      "Cisco DNA Center device management can deploy a network more quickly than traditional campus device\nmanagement",
      "Traditional campus device management allows a network to scale more quickly than with Cisco DNA\nCenter device management",
      "Cisco DNA Center device management can be implemented at a lower cost than most traditional campus\ndevice management options",
      "Traditional campus device management schemes can typically deploy patches and updates more quickly\nthan Cisco DNA Center device management"
    ],
    "answer": 0,
    "explanation": "With Intent-based APIs, the administrator configures the intent or outcome desired of a set of security polices. The DNA Center then communicates with the devices to determine exactly the required configuration to achieve that intent. Then the complete configuration is sent down to the devices -> This helps reduce time to deploy a network compare to the traditional networks."
  },
  {
    "prompt": "What is an advantage of Cisco DNA Center versus traditional campus device management?",
    "options": [
      "It supports numerous extensibility options including cross-domain adapters and third-party SDKs",
      "It supports high availability for management functions when operating in cluster mode",
      "It enables easy autodiscovery of network elements m a brownfield deployment",
      "It is designed primarily to provide network assurance"
    ],
    "answer": 0
  },
  {
    "prompt": "Which type of VPN uses a hub-and-spoke configuration to establish a full mesh topology?",
    "options": [
      "GRE over IPsec",
      "dynamic multipoint VPN",
      "MPLS VPN",
      "IPsec virtual tunnel interface"
    ],
    "answer": 1,
    "explanation": "Dynamic Multipoint VPN (DMVPN) is a solution of Cisco. DMVPN provides the following advantages: + Provides full meshed connectivity with simple Hub-and-Spoke topology. The spokes can communicate between each other without going through Hub + Only one static public IP address is required on Hub. Spokes can use dynamic (unknown) public IP addresses + The configuration is simple even in large network. No additional configuration is required on Hub when new Spokes are added."
  },
  {
    "prompt": "What mechanism carries multicast traffic between remote sites and supports encryption?",
    "options": [
      "ISATAP",
      "GRE over IPsec",
      "IPsec over ISATAP",
      "GRE"
    ],
    "answer": 1
  },
  {
    "prompt": "What is a function of a remote access VPN?",
    "options": [
      "used cryptographic tunneling to protect the privacy of data for multiple users simultaneously",
      "allows the users to access company internal network resources through a secure tunnel",
      "used exclusively when a user is connected to a company’s internal network",
      "establishes a secure tunnel between two branch sites"
    ],
    "answer": 1
  },
  {
    "prompt": "Which Cisco IOS command will indicate that interface GigabitEthernet 0/0 is configured via DHCP?",
    "options": [
      "show ip interface GigabitEthernet 0/0 dhcp",
      "show interface GigabitEthernet 0/0",
      "show ip interface dhcp",
      "show ip interface GigabitEthernet 0/0",
      "show ip interface GigabitEthernet 0/0 brief"
    ],
    "answer": 3
  },
  {
    "prompt": "Which command enables a router to become a DHCP client?",
    "options": [
      "ip address dhcp",
      "ip helper-address",
      "ip dhcp pool",
      "ip dhcp client"
    ],
    "answer": 0,
    "explanation": "If we want to get an IP address from the DHCP server on a Cisco device, we can use the command “ip address dhcp”. Note: The command “ip helper-address” enables a router to become a DHCP Relay Agent."
  },
  {
    "prompt": "What are two roles of the Dynamic Host Configuration Protocol (DHCP)? (Choose two)",
    "options": [
      "The DHCP server offers the ability to exclude specific IP addresses from a pool of IP addresses",
      "The DHCP client can request up to four DNS server addresses",
      "The DHCP server assigns IP addresses without requiring the client to renew them",
      "The DHCP server leases client IP addresses dynamically",
      "The DHCP client maintains a pool of IP addresses it can assign"
    ],
    "type": "multi",
    "answer": [
      0,
      3
    ]
  },
  {
    "prompt": "Which type of information resides on a DHCP server?",
    "options": [
      "a list of the available IP addresses in a pool",
      "a list of public IP addresses and their corresponding names",
      "usernames and passwords for the end users in a domain",
      "a list of statically assigned MAC addresses"
    ],
    "answer": 0
  },
  {
    "prompt": "What is a DHCP client?",
    "options": [
      "a host that is configured to request an IP address automatically",
      "a router that statically assigns IP addresses to hosts",
      "a server that dynamically assigns IP addresses to hosts",
      "a workstation that requests a domain name associated with its IP address"
    ],
    "answer": 0
  },
  {
    "prompt": "Where does the configuration reside when a helper address is configured to support DHCP?",
    "options": [
      "on the switch trunk interface.",
      "on the router closest to the client.",
      "on the router closest to the server.",
      "on every router along the path."
    ],
    "answer": 1
  },
  {
    "prompt": "When implementing a router as a DHCP server, which two features must be configured? (Choose two)",
    "options": [
      "relay agent information",
      "database agent",
      "address pool",
      "smart-relay",
      "manual bindings"
    ],
    "type": "multi",
    "answer": [
      2,
      4
    ],
    "explanation": "The following example shows how to configure a DHCP Server on a Cisco router: Configuration Description Router(config)#ip dhcp Create a DHCP Pool named CLIENTS pool CLIENTS Router(dhcp- config)#network Specifies the subnet and mask of the DHCP address pool 10.1.1.0 /24 Router(dhcp- config)#default-router Set the default gateway of the DHCP Clients 10.1.1.1 Router(dhcp-config)#dns- Configure a Domain Name Server (DNS) server 10.1.1.1 Router(dhcp- config)#domain-name Configure a domain-name 9tut.com Duration of the lease (the time during which a client computer can use an assigned IP address). The syntax is “ lease {days[hours] Router(dhcp-config)#lease [minutes] | infinite}”. In this case the lease is 12 hours. The default is 0 12 a one-day lease. Before the lease expires, the client typically needs to renew its address lease assignment with the server Router(dhcp-config)#exit Router(config)# ip dhcp The IP range that a DHCP Server should not assign to DHCP Clients. excluded-address 10.1.1.1 Notice this command is configured under global configuration mode 10.1.1.10 Manual bindings are IP addresses that have been manually mapped to the MAC addresses of hosts that are found in the DHCP database. All DHCP clients send a client identifier (DHCP option 61) in the DHCP packet. To configure manual bindings, you must enter the client-identifier DHCP pool configuration command with the appropriate hexadecimal values identifying the DHCP client. For example: ip dhcp pool SERVER host 172.16.200.100 255.255.255.0 client-identifier 01aa.bbcc.0003.00 default-router 172.16.200.1 ! Therefore two requirements for DHCP binding is the IP address and the hardware address (MAC address) of the client. Notice that in the above example “aabb.cc00.0300” is the MAC address of the client while prefix “01” represents the Ethernet media type. Note: In fact, this question should ask “When implementing a router as a DHCP server, which one of these features must be configured?”. Because we only need to configure either an “address pool” or “manual binding”."
  },
  {
    "prompt": "Which command must you enter to configure a DHCP relay?",
    "options": [
      "ip helper-address",
      "ip address dhcp",
      "ip dhcp relay",
      "ip dhcp pool"
    ],
    "answer": 0,
    "explanation": "If the DHCP Server is not on the same subnet with the DHCP Client, we need to configure the router on the DHCP client side to act as a DHCP Relay Agent so that it can forward DHCP messages between the DHCP Client & DHCP Server. To make a router a DHCP Relay Agent, simply put the “ip helper-address < IP-address- of-DHCP-Server >” command under the interface that receives the DHCP messages from the DHCP Client. As we know, router does not forward broadcast packets (it drops them instead) so DHCP messages like DHCPDISCOVER message will be dropped. But with the “ip helper-address …” command, the router will accept that broadcast message and cover it into a unicast packet and forward it to the DHCP Server. The destination IP address of the unicast packet is taken from the “ip helper-address …” command."
  },
  {
    "prompt": "Where does a switch maintain DHCP snooping information?",
    "options": [
      "in the CAM table",
      "in the VLAN database",
      "in the DHCP binding database",
      "in the MAC address table"
    ],
    "answer": 2
  },
  {
    "prompt": "Which output displays a JSON data representation? A. { “response”,{ “taskId”,{}; “url”,”string” }; “version”, “string” } B. { “response”:{ “taskId”,{}; “url”,”string” }; “version”; “string” } C. { “response”- { “taskId”- {}; “url”-“string” }, “version”-“string” } D. { “response”:{ “taskId”:{}, “url”:”string” }, “version”: “string” } Answer: D Explanation JSON data is written as name/value pairs. A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value: “name”:”Mark” JSON can use arrays. Array values must be of type string, number, object, array, boolean or null.. For example: { “name”:”John”, “age”:30, “cars”:[ “Ford”, “BMW”, “Fiat” ] } JSON can have empty object like “taskId”:{}",
    "options": [
      "{\n“response”,{\n“taskId”,{};\n“url”,”string”\n};\n“version”, “string”\n}",
      "{\n“response”:{\n“taskId”,{};\n“url”,”string”\n};\n“version”; “string”\n}",
      "{\n“response”- {\n“taskId”- {};\n“url”-“string”\n},\n“version”-“string”\n}",
      "{\n“response”:{\n“taskId”:{},\n“url”:”string”\n},\n“version”: “string”\n}"
    ],
    "answer": 3,
    "explanation": "JSON data is written as name/value pairs. A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value: “name”:”Mark” JSON can use arrays. Array values must be of type string, number, object, array, boolean or null.. For example: { “name”:”John”, “age”:30, “cars”:[ “Ford”, “BMW”, “Fiat” ] } JSON can have empty object like “taskId”:{}"
  },
  {
    "prompt": "Which option best describes an API?",
    "options": [
      "communication often uses either Java scripting, Python, XML, or simple HTTP",
      "an architectural style (versus a protocol) for designing applications",
      "a stateless client-server model",
      "request a certain type of data by specifying the URL path that models the data"
    ],
    "answer": 2
  },
  {
    "prompt": "Which option about JSON is true?",
    "options": [
      "uses predefined tags or angle brackets (<>) to delimit markup text",
      "used to describe structured data that includes arrays",
      "used for storing information",
      "similar to HTML, it is more verbose than XML"
    ],
    "answer": 1,
    "explanation": "JSON data is written as name/value pairs. A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value: “name”:”Mark” JSON can use arrays. Array values must be of type string, number, object, array, boolean or null.. For example: { “name”:”John”, “age”:30, “cars”:[ “Ford”, “BMW”, “Fiat” ] }"
  },
  {
    "prompt": "Which of the following is the JSON encoding of a dictionary or hash?",
    "options": [
      "{“key”: “value”}",
      "[“key”, “value”]",
      "{“key”, “value”}",
      "(“key”: “value”)"
    ],
    "answer": 0
  },
  {
    "prompt": "Which two encoding methods are supported by REST APIs? (Choose two)",
    "options": [
      "YAML",
      "JSON",
      "EBCDIC",
      "SGML",
      "XML"
    ],
    "type": "multi",
    "answer": [
      1,
      4
    ],
    "explanation": "The Application Policy Infrastructure Controller (APIC) REST API is a programmatic interface that uses REST architecture. The API accepts and returns HTTP (not enabled by default) or HTTPS messages that contain JavaScript Object Notation (JSON) or Extensible Markup Language (XML) documents."
  },
  {
    "prompt": "What are two benefits of network automation? (Choose two)",
    "options": [
      "reduced operational costs",
      "reduced hardware footprint",
      "faster changes with more reliable results",
      "fewer network failures",
      "increased network security"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ]
  },
  {
    "prompt": "Which type of API would be used to allow authorized salespeople of an organization access to internal sales data from their mobile devices?",
    "options": [
      "partner",
      "open",
      "public",
      "private"
    ],
    "answer": 3,
    "explanation": "There are three types of API: + Open APIs (Public APIs) – These APIs are publicly available and can be used with no restrictions. Because these APIs are public, many API providers require the user to get a free key, or token, prior to using the API. This is to help control the number of API requests they receive and process. + Internal (Private APIs) – These are APIs that are used by an organization or company to access data and services for internal use only. An example of an internal API is allowing authorized salespeople access to internal sales data on their mobile devices. + Partner APIs – These are APIs that are used between a company and its business partners or contractors to facilitate business between them. The business partner must have a license or other form of permission to use the API. A travel service using an airline’s API is an example of a partner API."
  },
  {
    "prompt": "What is a characteristic of the REST API?",
    "options": [
      "evolved into what became SOAP",
      "used for exchanging XML structured information over HTTP or SMTP",
      "considered slow, complex, and rigid",
      "most widely used API for web services"
    ],
    "answer": 3,
    "explanation": "REST API is an API that works on top of the HTTP protocol. It defines a set of functions developers can use to perform requests and receive responses via HTTP protocol such as GET and POST. REST APIs are the most popular API used for web services nowadays."
  },
  {
    "prompt": "Which CRUD operation modifies an existing table or view?",
    "options": [
      "read",
      "replace",
      "create",
      "update"
    ],
    "answer": 3,
    "explanation": "CRUD is short for CREATE, READ, UPDATE and DELETE operations. Only UPDATE operation modifies an existing table or view."
  },
  {
    "prompt": "Which configuration management mechanism uses TCP port 22 by default when communicating with managed nodes?",
    "options": [
      "Ansible",
      "Python",
      "Puppet",
      "Chef"
    ],
    "answer": 0,
    "explanation": "TCP port 22 is SSH, which is used by Ansible when communicating with the managed nodes. Quick Summary Login vs Login Local command We usually see the “login” or “login local” command under line VTY or line console but what are they different? Remember this rule of thumb: + “login”: 1 word, requires 1 piece of information (requires password only) + “login local”: 2 words, requires 2 pieces of information (requires both username and password) With “login” command, we have to configure a password on the local router (with the “password …” command) or we will get the warning: “% Login disbled on line …, until ‘password’ is set”. With “login local” command, we have to configure both username and password with the command “username { username } secret { password }” or the command “username { username } password { password }”. But if we forget to configure username and password, no warning message is shown."
  },
  {
    "prompt": "Which command can you enter to allow Telnet to be supported in addition to SSH?",
    "options": [
      "transport input telnet ssh",
      "transport input telnet",
      "no transport input telnet",
      "privilege level 15"
    ],
    "answer": 0
  },
  {
    "prompt": "A network engineer must back up 20 network router configurations globally within a customer environment. Which protocol allows the engineer to perform this function using the copy function?",
    "options": [
      "COP",
      "SNMP",
      "SMTP",
      "ARP"
    ],
    "answer": 1,
    "explanation": "SNMP is an application-layer protocol that provides a message format for communication between SNMP managers and agents. SNMP provides a standardized framework and a common language used for the monitoring and management of devices in a network. The SNMP framework has three parts: + An SNMP manager + An SNMP agent + A Management Information Base (MIB) The Management Information Base (MIB) is a virtual information storage area for network management information, which consists of collections of managed objects. With SNMP, the network administrator can send commands to multiple routers to do the backup."
  },
  {
    "prompt": "A Cisco IP phone receive untagged data traffic from an attached PC. Which action is taken by the phone?",
    "options": [
      "It allows the traffic to pass through unchanged",
      "It drops the traffic",
      "It tags the traffic with the default VLAN",
      "It tags the traffic with the native VLAN"
    ],
    "answer": 0,
    "explanation": "Untagged traffic from the device attached to the Cisco IP Phone passes through the phone unchanged, regardless of the trust state of the access port on the phone."
  },
  {
    "prompt": "Which function does an SNMP agent perform?",
    "options": [
      "It sends information about MIB variables in response to requests from the NMS",
      "It coordinates user authentication between a network device and a TACACS+ or RADIUS server",
      "It requests information from remote network nodes about catastrophic system events.",
      "It manages routing between Layer 3 devices in a network"
    ],
    "answer": 0
  },
  {
    "prompt": "What are two differences between optical-fiber cabling and copper cabling? (Choose two)",
    "options": [
      "Light is transmitted through the core of the fiber",
      "A BNC connector is used for fiber connections",
      "The glass core component is encased in a cladding",
      "Fiber connects to physical interfaces using RJ-45 connections",
      "The data can pass through the cladding"
    ],
    "type": "multi",
    "answer": [
      0,
      2
    ],
    "explanation": "The two main elements of an optical fiber are its core and cladding. The “core”, or the axial part of the optical fiber made of silica glass, is the light transmission area of the fiber. It may sometimes be treated with a “doping” element to change its refractive index and therefore the velocity of light down the fiber. The “cladding” is the layer completely surrounding the core."
  },
  {
    "prompt": "A device detects two stations transmitting frames at the same time. This condition occurs after the first 64 bytes of the frame is received interface counter increments?",
    "options": [
      "collision",
      "runt",
      "CRC",
      "late collision"
    ],
    "answer": 3,
    "explanation": "A late collision is defined as any collision that occurs after the first 512 bits (or 64th byte) of the frame have been transmitted. The usual possible causes are full-duplex/half-duplex mismatch, exceeded Ethernet cable length limits, or defective hardware such as incorrect cabling, non-compliant number of hubs in the network, or a bad NIC. Late collisions should never occur in a properly designed Ethernet network. They usually occur when Ethernet cables are too long or when there are too many repeaters in the network."
  },
  {
    "prompt": "Which technology must be implemented to configure network device monitoring with the highest security?",
    "options": [
      "SNMPv3",
      "IP SLA",
      "NetFlow",
      "syslog"
    ],
    "answer": 0,
    "explanation": "SNMPv3—The most up-to-date protocol focuses on security. SNMPv3 defines a security model, user-based security model (USM), and a view-based access control model (VACM). SNMPv3 USM provides data integrity, data origin authentication, message replay protection, and protection against disclosure of the message payload."
  },
  {
    "prompt": "A network analyst is tasked with configuring the date and time on a router using EXEC mode. The date must be set to January 1,2020 and the time must be set to 12:00 am. Which command should be used?",
    "options": [
      "clock summer-time date",
      "clock set",
      "clock timezone",
      "clock summer-time recurring"
    ],
    "answer": 1,
    "explanation": "In this example, the clock time is set to 12:00 am with the clock date of January 1,2020. R1#clock set 12:00:00 jan 1 2020"
  }
];
