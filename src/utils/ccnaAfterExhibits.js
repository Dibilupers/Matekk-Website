import afterExhibits from "../assets/ccna-after-exhibits.json";

const AFTER_EXHIBIT_IMAGES = import.meta.glob(
  "../assets/ccna-after-exhibits/ccna-after-exhibit-*.png",
  { eager: true, import: "default", query: "?url" },
);

const AFTER_EXHIBIT_IMAGE_BY_ID = new Map(
  Object.entries(AFTER_EXHIBIT_IMAGES).flatMap(([path, image]) => {
    const match = path.match(/ccna-after-exhibit-(\d+)\.png$/);
    return match ? [[Number(match[1]), image]] : [];
  }),
);

export const CCNA_AFTER_EXHIBITS = afterExhibits;

export function getBundledCcnaAfterExhibitImage(questionId) {
  return AFTER_EXHIBIT_IMAGE_BY_ID.get(questionId) ?? null;
}
