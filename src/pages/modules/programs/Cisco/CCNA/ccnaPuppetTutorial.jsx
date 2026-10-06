import CcnaLessonImage from "./ccnaLessonImage";
import puppetWorkflow from "../../../../../assets/puppet-1-how-puppet-works.png";
import puppetComponents from "../../../../../assets/puppet-2-master-and-client-components.png";
import puppetRemember from "../../../../../assets/puppet-4-remember.png";

const imageBase = "https://www.9tut.com/images/ccna_self_study/Ansible_Puppet_Chef";

export default function CcnaPuppetTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>Besides Ansible and Chef, Puppet is another automation tool in CCNA certification so in this tutorial we will learn about it.</p>
			<p>Puppet is built on server-client architecture which comprises a master (centralized server) and some/many nodes (clients). In each node, a Puppet Agent is installed to communicate with the Puppet Master. Puppet Master is the place where all Puppet codes are written and stored. These codes dictate the instructions for performing various tasks for the client. If the Clients need something, they simply request them.</p>
			<p>Puppet is based on a Pull deployment model, where the nodes check in regularly after every 1800 seconds with the Master to see if anything needs to be updated in the agent. If anything needs to be updated the agent pulls the necessary Puppet codes from the Master and performs required actions.</p>
			<CcnaLessonImage src={puppetWorkflow} alt="Puppet pull model workflow" />

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Puppet Master Components</h2>
			<h3 className="text-lg font-bold text-[#071126] sm:text-xl"><strong>Manifests</strong></h3>
			<p>Manifest is the most important component in a Puppet Master so we will mention about it first. Manifest is just the file where the all Puppet scripts for configuring Puppet clients are written (in Ruby code). Manifest filenames use “.pp” (means Puppet policy) extension.</p>
			<p>Based on the Facts received from Factor, Master compiles manifests into catalogs (which will be discussed later), then sends them to the client.</p>

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl"><strong>Module</strong></h3>
			<p>Module also plays an important part in a Puppet Master. Module is a collection of manifests and other related data files organized in a predefined way to facilitate sharing and reusing. Modules tie manifests, templates, and files into a single unit.</p>
			<p>Module = Manifests + Data (Templates, Files)Modules have a specific directory path which is usually “/etc/puppet/manifests/”. They are useful for organizing our Puppet code, because they allow to split code into multiple manifests. It is considered best practice to use modules to organize all of our Puppet manifests.</p>
			<CcnaLessonImage src={puppetComponents} alt="Puppet Master and client components" />
			<CcnaLessonImage src={`${imageBase}/Puppet_Master.jpg`} alt="Puppet Master components" />

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl"><strong>Templates</strong></h3>
			<p>Templates are typically used to set up configuration files, allowing for the use of variables and other features intended to make these files more versatile and reusable.</p>

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl"><strong>Catalogs</strong></h3>
			<p>The entire configuration and manifest files that are written in Puppet are changed into a compiled format. This compiled format is known as a catalog, which can be applied to the target node. All the desired states of client resources are described in the catalog.</p>
			<p>Catalog = Facts + ManifestsOther components of Puppet Master are: Resource (a basic unit of system configuration modeling), Class (like class in programming languages, to organize the code in a better way. Puppet class is a collection of various resources that are grouped into a single unit)</p>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Puppet Client Components</h2>
			<h3 className="text-lg font-bold text-[#071126] sm:text-xl"><strong>Agent</strong></h3>
			<p>Agent is the program installed on each client to apply the configuration catalogs that it pulls from the Puppet Master to the client.</p>

			<h3 className="pt-2 text-lg font-bold text-[#071126] sm:text-xl"><strong>Factor (or Facter)</strong></h3>
			<p>The factor collects <em>facts</em>, which are important information about the node and sends them to the Puppet Master. Facts are the key-value data pair which represents puppet client states such as IP address, operating system, network interface, uptime and whether the client machine is virtual or not…</p>
			<p>Based on the facts received, Puppet Master compiles manifests into catalogs, then sends them to the client. On the client side, Agents execute any required changes and send reports back to the Master. If a system fails, the Master has a record of all system changes for a rollback to a previous working state.</p>
			<p>All of the above components of Puppet Master and Client can be summarized in the figure below:</p>
			<CcnaLessonImage src={`${imageBase}/Puppet_operation.jpg`} alt="Puppet operation between Agent and Master" />
			<ol className="list-decimal space-y-3 pl-6">
				<li>Puppet Agent sends data about its state to the Puppet Master (includes the hostname, kernel details, IP address, file name details…)</li>
				<li>Puppet Master does analysis on the data, and if any change is needed (such as package installation, upgrades or removals, file system creation, user creation or deletion, server reboot, IP configuration changes…), it sends the required changes to the client via Catalog. For example, after analysis, Master decides to send a new software version to the Agent and asks it to install.</li>
				<li>The Agent installs the required update for the Node and reply back to the Master that it has upgraded the software successfully.</li>
			</ol>

			<h2 className="pt-2 text-xl font-bold text-[#071126] sm:text-2xl">Puppet code</h2>
			<p>An example of the manifest <em>vlan.pp</em> which is for creating and enabling VLAN 10 with its name configured to ‘9tut’:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`class cnos::vlan {
  cnos_vlan { '10':
    ensure      => 'present',
    vlan_id     => 10,
    admin_state => 'up',
    vlan_name   => '9tut',
  }
}`}</code></pre>
			<p>In order to apply this manifest on the Puppet Master, we can use “puppet apply ” command:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`$ puppet apply vlan.pp
Notice: Compiled catalog for puppetmaster.9tut in environment production in 0.03 seconds
Notice: Finished catalog run in 0.03 seconds`}</code></pre>

			<p>In summary, please remember the following important facts about Puppet:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>Use “pull” model</li>
				<li>Use TCP port 8140 to reach Puppet Master</li>
				<li>Use Ruby for device configuration</li>
				<li>Files needed for operation: Manifest, Templates…</li>
				<li>Puppet Master only works on Linux/Unix and Puppet Agents also works on Windows.</li>
			</ul>
			<CcnaLessonImage src={puppetRemember} alt="Puppet key facts" />
			<p>We also made a comparison list of Ansible, Puppet and Chef automation tool here:</p>
			<CcnaLessonImage src={`${imageBase}/Ansible_Puppet_Chef_compare.jpg`} alt="Comparison of Ansible, Puppet and Chef" />
		</div>
	);
}