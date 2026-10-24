// Decides whether an answer choice is router/switch commands (shown in a terminal-style box)
// or an ordinary sentence (shown as normal text). A line break alone doesn't make it code:
// many sentences were split over two lines when they were copied from the PDFs.

// Lines that start like an IOS / WLC / PC command, or like routing-table output.
// Words that are also ordinary English ("configure", "enable", "router", "password") only count
// when they're written the way the command is actually typed.
const COMMAND_LINE = /^\s*(?:[\w.-]+(?:\s?\([\w-]+\))?[>#]|ipconfig\b|ifconfig\b|netstat\b|default-router\b|dns-server\b|interface\b|vtp\s|ip\s|ipv6\s|no\s|switchport\b|router\s+(?:ospf|eigrp|rip|bgp|isis)\b|network\s|access-list\b|line\s|vlan\s|username\s+\S|enable(?:\s+(?:secret|password)\b.*)?\s*$|crypto\b|channel-group\b|ntp\s|spanning-tree\b|hostname\b|encapsulation\b|transport\b|login\b|service\b|aaa\b|snmp-server\b|logging\b|standby\b|vrrp\b|description\b|shutdown\b|exit\b|end\b|configure(?:\s+terminal)?\s*$|config\b|permit\b|deny\b|cdp\b|lldp\b|show\b|copy\b|ping\b|traceroute\b|debug\b|passive-interface\b|default-information\b|redistribute\b|neighbor\s+(?:\d{1,3}\.){3}\d{1,3}\s+(?:remote-as|peer-group|activate|shutdown|next-hop-self|route-map|update-source|send-community|description|password)\b|password\s+\S|exec-timeout\b|banner\b|clock\b|duplex\b|speed\b|mtu\b|bandwidth\b|!|Gateway of last resort\b|[CSORDBLI*]{1,2}(?:\s+(?:E[12]|EX|IA|N[12]))?\s*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d+\s*\[)/;

// A device name on its own line ("R1", "SW2", "Router3"): a label above a config, not a command itself
export const DEVICE_LABEL = /^\s*(?:R|SW|Router|Switch)\d+\s*$/;

// JSON-style lines: braces/brackets, or "key": / "value",
const DATA_LINE = /^[{}[\]]|^["“][^"”]+["”]\s*[:,]/;

/** True when the text reads as device commands, output or data rather than a sentence. */
export function looksLikeCode(text) {
	const lines = String(text ?? "").split("\n").map((line) => line.trim()).filter(Boolean);
	if (!lines.length) return false;
	if (/^[{[]/.test(lines[0]) || lines.filter((line) => DATA_LINE.test(line)).length >= 2) return true;
	// A command prompt anywhere (R1#, SW1(config-if)#) is a sure sign
	if (lines.some((line) => /(?:^|\s)[\w.-]+(?:\([\w-]+\))?#\S/.test(line))) return true;
	// Device-name labels don't count either way; a bare "SW1" answer is just a name
	const body = lines.filter((line) => !DEVICE_LABEL.test(line));
	const commandLines = body.filter((line) => COMMAND_LINE.test(line)).length;
	return commandLines > 0 && commandLines >= body.length / 2;
}

/** For an ordinary sentence that was split over several lines, join the pieces back into one line. */
export function tidySentence(text) {
	const lines = String(text ?? "").split("\n").map((line) => line.trim()).filter(Boolean);
	return lines.reduce((joined, line, index) => {
		if (index === 0) return line;
		const previous = lines[index - 1];
		// Join only a sentence that was cut off: the next piece starts in lower case,
		// or the previous line was a long, unfinished sentence. Short separate lines keep their breaks.
		const continues = /^[a-z(]/.test(line) ||
			(previous.length > 55 && !/[.:;?!]$/.test(previous) && !/^[A-Z][\w /-]{0,40}:\s/.test(line));
		return continues ? `${joined} ${line}` : `${joined}\n${line}`;
	}, "");
}
