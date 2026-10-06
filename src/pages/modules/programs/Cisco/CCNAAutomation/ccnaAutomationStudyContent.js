export const CCNA_AUTOMATION_STUDY_CONTENT = {
	"1.0": {
		intro: "Network programmability uses software, data models, and APIs to make network operations consistent and repeatable. The CCNA tutorial lessons in this module introduce the controller model, configuration tools, structured data, AI concepts, and REST APIs.",
		sections: [
			{
				title: "Controllers, planes, and interfaces",
				body: "Traditional devices make forwarding decisions locally. In software-defined networking, a controller coordinates policy and communicates with devices through southbound interfaces, while applications and operators use northbound APIs. The data plane still forwards packets; automation changes how configuration and policy are delivered.",
				points: ["Use the controller to coordinate intent across devices, not as a replacement for packet forwarding.", "Treat APIs as explicit contracts between an application, controller, and network device."],
				example: "A controller can apply the same approved access policy to a group of switches and report which devices accepted the change.",
			},
			{
				title: "Configuration tools and structured data",
				body: "Puppet, Chef, and Ansible describe repeatable configuration tasks in different ways. JSON represents objects and arrays, while YAML is commonly used for readable configuration and playbooks. A script or tool should parse these formats into structured values rather than rely on fragile text matching.",
				points: ["Compare a tool's execution model and device support before selecting it.", "Validate data structure and required fields before applying a configuration."],
				example: "An Ansible playbook can read YAML variables, connect to managed devices, apply a task, and report whether state changed.",
			},
			{
				title: "APIs and responsible automation",
				body: "REST APIs use HTTP requests to read or change resources. A useful workflow checks documentation, authenticates safely, sends a request, validates the response, and reports failures. Predictive AI estimates likely outcomes from data; generative AI creates new content, so outputs must be reviewed before being used in operational work.",
				points: ["Check status codes and response data instead of assuming a request succeeded.", "Keep credentials protected and review generated or automated changes before deployment."],
				example: "A script can query an API for device inventory, validate that the response contains device IDs, and stop with a clear error if the service rejects the request.",
			},
		],
	},
	"2.0": {
		intro: "Software development and design turn automation ideas into code that can be tested, understood, reused, and maintained. Network automation scripts often process structured data and coordinate changes across multiple devices, so clear design and a recoverable change history are essential.",
		sections: [
			{
				title: "Data formats and parsing",
				body: "XML represents nested data with tagged elements, JSON uses objects and arrays, and YAML uses indentation for readable mappings and lists. Parsing converts these documents into program data structures. Validate required keys, expected types, and nested values before using parsed data to build a device configuration.",
				points: ["Use a format supported by the API or tool you are integrating.", "Treat external input as untrusted; handle malformed or missing fields explicitly."],
				example: "A JSON inventory object such as {\"device\":\"edge-1\",\"enabled\":true} becomes a dictionary whose fields can be checked before a script connects.",
			},
			{
				title: "Testing, methods, classes, and patterns",
				body: "Test-driven development starts with a test that describes expected behavior, then implements the smallest change that makes it pass. Functions isolate operations; classes group related state and behavior; modules divide a larger project into focused files. MVC separates data, interface, and control responsibilities, while Observer lets interested components react to state changes.",
				points: ["Test normal, boundary, and failure cases, including unreachable devices and invalid responses.", "Prefer small focused functions over copying similar device logic throughout a script."],
				example: "A unit test can mock an API response and verify that a parser extracts the management address without contacting a live network.",
			},
			{
				title: "Development methods and Git",
				body: "Agile delivers work in short feedback cycles, Lean reduces waste and improves flow, and Waterfall plans work in sequential phases. Git records snapshots of project changes. Clone obtains a repository, add stages changes, commit records them, push and pull exchange work, branches isolate tasks, merge combines histories, and diff displays changes.",
				points: ["Choose a workflow that fits the team's delivery and review needs.", "Review a diff before committing or merging so unintended configuration or secrets are not included."],
				example: "Make a feature branch, change a parser, run its tests, inspect the diff, commit the work, then open it for review before merging.",
			},
		],
	},
	"3.0": {
		intro: "An API exposes operations through documented endpoints or methods. To automate safely, translate a requirement into a request, supply the correct identity and data, interpret the response, and account for service constraints such as pagination, rate limits, and asynchronous jobs.",
		sections: [
			{
				title: "Constructing and troubleshooting REST requests",
				body: "A REST request combines an HTTP method, URL, headers, authentication, and sometimes a body. GET commonly reads, POST creates or starts an operation, PUT replaces, PATCH partially updates, and DELETE removes. Status codes describe the outcome: 2xx success, 3xx redirection, 4xx request or authorization problems, and 5xx server failures.",
				points: ["Compare the actual method, URL, headers, and payload against the API documentation.", "Inspect response headers and body for error details, pagination links, and request identifiers."],
				example: "A 401 points first to authentication; a 403 suggests the identity lacks permission; a 429 means the client should respect the service's rate limit.",
			},
			{
				title: "Webhooks, constraints, and API styles",
				body: "Polling repeatedly asks a service for updates; a webhook sends an event to a registered receiver when something changes. APIs may impose rate limits, payload-size limits, pagination, version requirements, and timeouts. Synchronous calls return a result in the same interaction; asynchronous calls return a job or receipt that must be checked later. REST is resource-oriented; RPC focuses on invoking operations.",
				points: ["Make webhook receivers authenticate, validate, and safely handle duplicate events.", "Use pagination and backoff rather than requesting unbounded data or retrying rapidly."],
				example: "After submitting a long-running change, an API may return a job ID. Poll the documented job endpoint until it reports completion or failure.",
			},
			{
				title: "Authentication and Python requests",
				body: "Basic authentication encodes a username and password and must be protected by TLS. Custom tokens and API keys identify a client but still require secure storage, rotation, and least privilege. In Python, requests can send headers and JSON, set a timeout, check the status, and parse the body. Never silently treat a failed response as a successful change.",
				points: ["Load secrets from an approved secret store or environment injection, not source code.", "Set timeouts and explicitly handle authentication, connection, parsing, and server errors."],
				example: "A script should call raise_for_status or inspect the status, then validate the expected JSON fields before reporting success.",
			},
		],
	},
	"4.0": {
		intro: "Cisco platforms expose network, compute, collaboration, and security capabilities through APIs and SDKs. The exact resource model varies by platform, so automation should begin with a requirement, select the matching platform, and use its documented authentication and API workflow.",
		sections: [
			{
				title: "Cisco network, compute, and collaboration platforms",
				body: "Meraki and Catalyst Center provide network management and client/device data; ACI manages application-centric data-center policy; Catalyst SD-WAN manages WAN fabric; NSO models and orchestrates services. UCS Manager and Intersight manage compute infrastructure. Webex, Webex devices, and Unified CM expose collaboration capabilities, including AXL and UDS interfaces.",
				points: ["Map the requested operation to the platform that owns that resource.", "Check platform roles, API version, permissions, and supported operations before coding."],
				example: "To list clients visible on a Meraki network, use the documented organization/network context and paginate through the endpoint's results.",
			},
			{
				title: "Security platforms and device interfaces",
				body: "Cisco security products expose events, policy, endpoint, identity, and threat-analysis data through their own APIs. IOS XE and NX-OS can also expose device-level programmable interfaces. Model-driven interfaces use YANG to describe data; NETCONF and RESTCONF provide mechanisms to read or change modeled configuration and operational state.",
				points: ["Request only the data needed and apply least-privilege access to API identities.", "Distinguish controller-level operations from direct device-level changes to avoid conflicting sources of truth."],
				example: "A workflow can query a security platform for an alert, retrieve related endpoint context, and produce a report without automatically changing enforcement policy.",
			},
			{
				title: "Build an SDK/API workflow from requirements",
				body: "A reliable script identifies inputs and expected output, authenticates, calls the SDK or endpoint, handles pagination and errors, transforms data, and verifies the result. Keep platform-specific calls separate from business logic so a change in endpoint details does not spread through the entire application.",
				points: ["Read SDK examples and API schemas; do not guess parameter names or response shapes.", "Test with a small, read-only request before enabling any operation that changes resources."],
				example: "For a device inventory, define the required fields, fetch pages, normalize IDs and names, reject incomplete records, then report totals and any API errors.",
			},
		],
	},
	"5.0": {
		intro: "Application deployment is the process of building, packaging, configuring, and operating software. The placement and packaging model affects latency, scaling, reliability, and security; delivery pipelines and security controls help make releases predictable.",
		sections: [
			{
				title: "Edge, cloud, virtual machines, and containers",
				body: "Edge computing places processing near users, devices, or data sources to reduce latency and backhaul. Private cloud is dedicated to one organization, public cloud uses a provider's shared platform, and hybrid cloud combines environments. Bare metal runs directly on hardware, virtual machines include a guest operating system, and containers package an application with its dependencies while sharing a host kernel.",
				points: ["Choose placement based on latency, connectivity, data location, and operational constraints.", "Do not treat containers as identical to virtual machines; their isolation and packaging models differ."],
				example: "A local analytics service may run at the edge when it must continue working during a WAN outage, while centralized reporting runs in a cloud service.",
			},
			{
				title: "CI/CD, tests, and Docker",
				body: "A CI/CD pipeline typically checks out source, installs dependencies, runs lint and tests, builds an artifact or image, scans it, and deploys through controlled environments. A Dockerfile describes how to build an image; the image is an immutable package used to create containers. Unit tests isolate a small piece of code and check its behavior.",
				points: ["Use reproducible builds and test the same artifact that will be deployed.", "Review Dockerfile base images, copied files, exposed ports, and runtime user."],
				example: "A pipeline can reject a change when a unit test fails, build the image only after tests pass, and require approval before production deployment.",
			},
			{
				title: "Application security and operations",
				body: "Secrets must not be committed to source or embedded in images. Protect data in transit with authenticated encryption and protect stored data according to its sensitivity. Firewalls restrict flows; DNS resolves names; load balancers distribute traffic; reverse proxies provide an application-facing intermediary. OWASP risks include injection, cross-site scripting, and cross-site request forgery. DevOps joins development and operations through shared responsibility and feedback.",
				points: ["Validate input and use parameterized database operations to reduce injection risk.", "Use secure cookie and request protections against XSS and CSRF, and review access controls."],
				example: "A reverse proxy can terminate TLS and route requests to application containers, while the firewall only permits the proxy to reach the service port.",
			},
		],
	},
	"6.0": {
		intro: "Infrastructure automation applies planned and repeatable changes to networks. Model-driven data, APIs, configuration tools, test environments, version control, and review combine to reduce manual repetition while keeping operators in control of the change.",
		sections: [
			{
				title: "Models, controllers, and testing environments",
				body: "Model-driven programmability represents configuration and state as structured data defined by a schema such as YANG. A controller manages a broader network view; device-level management addresses an individual device. Cisco Modeling Labs can simulate network topologies, while pyATS supports structured network testing and validation.",
				points: ["Use the schema to understand valid paths, types, and constraints before changing data.", "Test the effect on representative topologies before production deployment."],
				example: "A pre-change test can capture interface and route state, apply a lab change, then compare expected and observed state.",
			},
			{
				title: "Infrastructure as code and pipelines",
				body: "Infrastructure as code stores desired infrastructure state and procedures in version-controlled files. CI/CD can lint and validate changes, run tests, produce a diff, and gate deployment on review. Python may call Cisco APIs; Ansible expresses tasks and target inventory; Bash handles operating-system workflows. Each tool has a different role and failure mode.",
				points: ["Make changes idempotent where possible so repeated runs converge on the desired state.", "Separate validation from deployment and require appropriate approval for high-impact changes."],
				example: "A pipeline can parse a network change file, validate required fields, run pyATS checks in a lab, and display a unified diff to a reviewer.",
			},
			{
				title: "Read outputs, diffs, and API sequences",
				body: "NETCONF and RESTCONF responses contain modeled data that should be interpreted against the YANG schema. A unified diff marks removed lines with a minus and added lines with a plus, helping reviewers see the exact change. A sequence diagram shows actors, messages, and ordering, which helps locate timeouts or unexpected dependencies in API workflows.",
				points: ["Check response status and data paths rather than relying on a successful transport connection alone.", "Review both additions and removals in a diff; a small deletion can have a large operational effect."],
				example: "A sequence diagram may show a script authenticating, requesting a token, fetching device data, submitting a change, then polling the job result.",
			},
		],
	},
	"7.0": {
		intro: "Network fundamentals let an automation engineer reason about what a script is changing and diagnose why an application cannot communicate. Addressing, VLANs, routing, common devices, service protocols, and network planes form the operational context for automated workflows.",
		sections: [
			{
				title: "Layer 2 and Layer 3 addressing",
				body: "A MAC address identifies a Layer 2 interface on a local segment, and switches learn source MAC addresses to forward frames. VLANs divide a switched network into broadcast domains. IP addresses identify Layer 3 interfaces; a subnet mask or prefix determines which addresses are local, while a route and gateway guide traffic to remote networks.",
				points: ["Check the VLAN and MAC learning when a host cannot reach its local gateway.", "Check prefix, route, and default gateway when a host can reach local devices but not remote networks."],
				example: "A host with address 192.0.2.20/24 treats 192.0.2.1 as local, but sends traffic for another subnet to its configured gateway.",
			},
			{
				title: "Devices, topology, and network planes",
				body: "Switches forward frames, routers forward packets between networks, firewalls enforce traffic policy, and load balancers distribute application requests. A topology diagram describes links, interfaces, and paths. The control plane computes decisions, the data plane forwards traffic, and the management plane provides administrative access and monitoring.",
				points: ["Trace each hop and identify the interface, device role, and policy boundary.", "Use plane separation to distinguish a forwarding problem from a control or management problem."],
				example: "If a route exists but packets are dropped at a firewall, the routing control plane may be healthy while the security policy blocks the data plane flow.",
			},
			{
				title: "Services, ports, and connectivity troubleshooting",
				body: "DHCP assigns network configuration, DNS maps names to addresses, NAT translates addresses, SNMP supports monitoring, and NTP synchronizes time. Common ports include SSH 22, Telnet 23, HTTP 80, HTTPS 443, and NETCONF over SSH 830. Troubleshoot from name resolution and addressing through route, policy, transport port, proxy, VPN, and application response.",
				points: ["Correlate port and protocol with the actual service rather than guessing from a symptom.", "Account for NAT translation, proxy policy, VPN routes, and firewall rules along the path."],
				example: "For a failed HTTPS request, resolve DNS, test reachability to the destination, confirm TCP/443 is permitted, check proxy/VPN settings, and inspect the TLS or application error.",
			},
		],
	},
};
