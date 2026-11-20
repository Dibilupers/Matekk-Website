import exhibitImageMap from "../assets/ccna-exhibit-image-map.json";

const LEGACY_EXHIBIT_IMAGES = import.meta.glob(
  "../assets/ccna-offline-exams-images/ccna-exhibit-*.png",
  { eager: true, import: "default", query: "?url" },
);

const IMAGE_BY_LEGACY_INDEX = new Map(
  Object.entries(LEGACY_EXHIBIT_IMAGES).flatMap(([path, image]) => {
    const match = path.match(/ccna-exhibit-(\d+)\.png$/);
    return match ? [[Number(match[1]), image]] : [];
  }),
);

const LEGACY_INDEX_BY_BANK_ID = new Map(
  exhibitImageMap.flatMap(({ legacy_question_index, after_exhibit_question_id }) =>
    Number.isSafeInteger(after_exhibit_question_id)
      ? [[after_exhibit_question_id, legacy_question_index]]
      : [],
  ),
);

export function getCcnaExhibitImageByLegacyIndex(legacyIndex) {
  return IMAGE_BY_LEGACY_INDEX.get(legacyIndex) ?? null;
}

export function getCcnaExhibitImageByBankId(bankId) {
  const legacyIndex = LEGACY_INDEX_BY_BANK_ID.get(bankId);
  return legacyIndex === undefined ? null : getCcnaExhibitImageByLegacyIndex(legacyIndex);
}
