import { execute } from "./labEngine";

export function applyWorksheetCommands(lab, groups, answers, startingState) {
	let state = startingState;
	const failedSlots = [];
	let slotNumber = 0;

	for (const group of groups) {
		for (const slot of group.slots) {
			slotNumber += 1;
			const command = answers[slotNumber - 1]?.trim() ?? "";
			if (!command) {
				failedSlots.push(slotNumber);
				continue;
			}

			for (const device of slot.devices) {
				const preparedState = structuredClone(state);
				const consoleState = preparedState.consoles[device];
				consoleState.mode = slot.context;
				if (slot.iface) {
					consoleState.iface = slot.iface;
					consoleState.ifaces = null;
				} else if (slot.context === "config" || slot.context === "config-vlan" || slot.context === "priv") {
					consoleState.iface = null;
					consoleState.ifaces = null;
				}
				if (slot.vlan !== undefined) consoleState.vlan = slot.vlan;
				else if (slot.context !== "config-vlan") consoleState.vlan = null;
				const result = execute(lab, preparedState, device, command);
				state = result.state;
				if (result.out.some((line) => /% Invalid input|% Incomplete command/.test(line))) {
					failedSlots.push(slotNumber);
				}
			}
		}
	}

	return { state, failedSlots: [...new Set(failedSlots)] };
}
