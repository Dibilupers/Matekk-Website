import CcnaLessonImage from "./ccnaLessonImage";
import agentlessImage from "../../../../assets/ansible-1-agentless-by-design.png";
import createsImage from "../../../../assets/ansible-2-what-ansible-creates.png";
import commandsImage from "../../../../assets/ansible-3-example-show-commands.png";
import rememberImage from "../../../../assets/ansible-4-remember.png";

export default function CcnaAnsibleTutorial() {
	return (
		<div className="mt-7 space-y-6 leading-7 sm:space-y-8">
			<p>There are several automation tools available to make configuration management easier: Ansible, Chef, Puppet… The goal of these tools is to reduce the complexity and time to configure and maintain networks (especially big ones with hundreds of devices). In this tutorial we will learn some basic knowledge of Ansible in the scope of CCNA level.</p>
			<h2 className="text-xl font-bold text-[#071126] sm:text-2xl">Agentless by Design</h2>
			<p>Ansible uses an agentless architecture to manage network devices. Agentless means that the managed device does not need any code (agent) to be installed on it. Therefore Ansible uses SSH (NETCONF over SSH in particular) to “push” changes and extract information to managed devices.</p>
			<CcnaLessonImage src={agentlessImage} alt="Ansible agentless design" />

			<p>Once Ansible is installed, it creates several text files:</p>
			<ul className="list-disc space-y-3 pl-6">
				<li><strong>Playbooks</strong>: These files provide actions and logic about what Ansible should do. Ansible playbooks are files that contain tasks to configure hosts. Ansible playbooks are written in YAML format. Inside Playbooks, we have:
					<ul className="mt-2 list-[circle] space-y-2 pl-6">
						<li><strong>Modules</strong> (also referred to as “task plugins” or “library plugins”) are discrete units of code that can be used from the command line or in a playbook task. Ansible executes each module, usually on the remote managed node, and collects return values.</li>
						<li><strong>Tasks</strong>: Tasks are Ansible’s smallest unit of work. They are a series of actions on the target hosts, using modules to provide functionalities.</li>
					</ul>
				</li>
				<li>A task defines an action that needs to be performed, while a module executes the action on a managed host.</li>
				<li><strong>Inventory</strong>: a file contains a list of the hosts (usually their IP addresses, ports) which you want to configure or manage. Hosts in an inventory can be divided into smaller groups for easier management and configuration. Each group can run different tasks. An example of a task is to ping all hosts in group [routers].</li>
				<li><strong>Templates</strong>: Using Jinja2 language, the templates represent a device’s configuration but with variables.</li>
				<li><strong>Variables</strong>: Using YAML, a file can list variables that Ansible will substitute into templates.</li>
			</ul>
			<CcnaLessonImage src="https://www.9tut.com/images/ccna_self_study/Ansible_Puppet_Chef/Ansible_workflow.jpg" alt="Ansible workflow" />
			<CcnaLessonImage src={createsImage} alt="What Ansible creates" />

			<p>Templates and variables are optional so they are not discussed here to keep this tutorial simple. An inventory and playbook are enough to run our first Ansible program! (in fact, only a playbook is enough to run). For example if we have an inventory named “hosts” (without file extension) and a playbook named “int_lo0.yml” (to configure loopback 0 interface for each host) in “playbooks” directory then we can run them via this command:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`$ ansible-playbook -i hosts playbooks/int_lo0.yml`}</code></pre>

			<p>Another example of the “hosts” inventory and “command_ios.yml” playbook is shown below:</p>
			<div className="grid gap-4 lg:grid-cols-2">
				<div><h3 className="font-bold">“hosts” Inventory</h3><pre className="mt-2 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`[ios_devices]
R1 ansible_host=192.168.1.10
R2 ansible_host=192.168.1.11

[ios_devices:vars]
username=9tut
password=mySecretPassword!`}</code></pre></div>
				<div><h3 className="font-bold">“command_ios.yml” Playbook</h3><pre className="mt-2 overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`---
- name: IOS Show Commands
hosts: "ios_devices"
gather_facts: false
connection: local

vars:
	cli:
		host: "{{ ansible_host }}"
		username: "{{ username }}"
		password: "{{ password }}"
		transport: cli

tasks:
	- name: ios show commands
		ios_command:
			commands:
				- show version | i IOS
				- show run | i hostname
			provider: "{{ cli }}"

		register: output

		- name: show output of IOS
			debug:
				var: output`}</code></pre></div>
			</div>
			<CcnaLessonImage src={commandsImage} alt="Example Ansible show commands and output" />
			<p>The above playbook would display “show version” and “show run” output when we run it with command:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-sm leading-6 text-[#e7efff]"><code>{`$ansible-playbook -i hosts command_ios.yml`}</code></pre>
			<p>And the result is shown below:</p>
			<pre className="overflow-x-auto rounded-xl bg-[#101b31] p-4 text-xs leading-5 text-[#e7efff] sm:text-sm"><code>{`PLAY [IOS Show Commands] *******
TASK [ios show commands] ******************************************************
ok: [ios-r1]
ok: [ios-r2]

TASK [show output of IOS]
***************************
ok: [ios-r1] => {
    "output": {
        "changed": false,
        "stdout": [
             "Cisco IOS Software, IOSv Software (VIOS-ADVENTERPRISEK9-M), Version 15.6(3)M2, RELEASE SOFTWARE (fc2)\nROM: Bootstrap program is IOSv\\nCisco IOSv (revision 1.0) with with 460033K/62464K bytes o£ memory.",
               "hostname iosv-1"
        ],
        "stdoutlines": [
               [
                    "Cisco IOS Software, IOSv Software (VIOS-ADVENTERPRISEK9-M), Version 15.6(3)M2, RELEASE SOPTWARE (fc2)",
                    "ROM: Bootstrap program is IOSv", "Cisco IOSv (revision 1.0) with 460033K/62464K bytes of memory."
               ],
               [
                    "hostname iosv-1"
               ]
        ],
        "warnings": []
    }
}
ok: [ios-r2] => {
    "output": {
         "changed": false,
         "stdout": [
             "Cisco IOS Software, IOSv Software (VIOS-ADVENTERPRISEK9-M), Version 15.6(3)M2, RELEASE SOFTWARE (fc2)\\nROM: Bootstrap program is IOSv\\nCisco IOSv (revision 1.0) with with 460033K/62464K bytes of memory.",
             "hostname iosv-2"
         ],
         "stdout_lines": [
             [
                  "Cisco IOS Software, IOSv Software (VIOS-ADVENTERPRISEK9-M), Version 15.6(3)M2, RELEASE SOFTWARE (fc2)",
                  "ROM: Bootstrap program is IOSv", "Cisco IOSv (revision 1.0) with with 460033K/62464K bytes of memory."
             ],
             [
                  "hostname iosv-2"
             ]
         ],
         "warnings": []
     }
}

PLAY RECAP ********************************************************************
ios-r1 : ok=2 changed=0 unreachable=0 failed=0
ios-r2 : ok=2 changed=0 unreachable=0 failed=0`}</code></pre>
			<CcnaLessonImage src={rememberImage} alt="Ansible key facts" />
			<p>In summary, please remember the following important facts about Ansible:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>Use “push” model (push configuration from a centralized server to end devices)</li>
				<li>Use SSH (TCP port 22) for remote communication</li>
				<li>Use YAML for device configuration</li>
				<li>Files needed for operation: Playbook, Inventory…</li>
				<li>Ansible requires a Linux-based system to run. Though it can run under the Windows Subsystem for Linux but it should not be used for production systems</li>
			</ul>
			<p>We also made a comparison list of Ansible, Puppet and Chef automation tool here:</p>
			<CcnaLessonImage src="https://www.9tut.com/images/ccna_self_study/Ansible_Puppet_Chef/Ansible_Puppet_Chef_compare.jpg" alt="Comparison of Ansible, Puppet and Chef" />
		</div>
	);
}
