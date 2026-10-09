import { useId, useMemo, useState } from "react";

const MAX_SUGGESTIONS = 8;

// Best matches first: the place name starts with what was typed, then any word in the
// place name does, then the province does (so "San" lists San Mateo before Pasig, San Juan...).
function rankPlaces(places, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  for (const place of places) {
    const lower = place.toLowerCase();
    const [name] = lower.split(", ");
    let rank = -1;
    if (name.startsWith(q)) rank = 0;
    else if (name.split(/[\s-]+/).some((word) => word.startsWith(q))) rank = 1;
    else if (lower.startsWith(q) || lower.split(", ")[1]?.startsWith(q)) rank = 2;
    if (rank >= 0) results.push([rank, place]);
  }
  return results
    .sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]))
    .slice(0, MAX_SUGGESTIONS)
    .map(([, place]) => place);
}

// Bolds the part of the suggestion that matches what was typed
function Highlight({ text, query }) {
  const at = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (!query.trim() || at < 0) return text;
  const end = at + query.trim().length;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-slate-900">{text.slice(at, end)}</strong>
      {text.slice(end)}
    </>
  );
}

/**
 * Text box that suggests Philippine cities, municipalities and provinces as you type.
 * Anything can still be typed, so a place missing from the list never blocks anyone.
 */
export default function PlaceAutocomplete({ value, onChange, className, placeholder }) {
  const listId = useId();
  const [places, setPlaces] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const suggestions = useMemo(() => (places ? rankPlaces(places, value) : []), [places, value]);
  const showList = open && suggestions.length > 0 && suggestions[0].toLowerCase() !== value.trim().toLowerCase();

  // The list (~45 KB) only loads the first time someone clicks into the box
  const loadPlaces = () => {
    if (places) return;
    import("../data/philippinePlaces").then((module) => setPlaces(module.PH_PLACES));
  };

  const choose = (place) => {
    onChange(place);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e) => {
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => {
          loadPlaces();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        className={className}
      />
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((place, index) => (
            <li
              key={place}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              // mousedown (not click) so the choice lands before the box loses focus
              onMouseDown={(e) => {
                e.preventDefault();
                choose(place);
              }}
              onMouseEnter={() => setActive(index)}
              className={`cursor-pointer px-3.5 py-2 text-sm text-slate-600 ${index === active ? "bg-[#eef6ff] text-slate-900" : ""}`}
            >
              <Highlight text={place} query={value} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
