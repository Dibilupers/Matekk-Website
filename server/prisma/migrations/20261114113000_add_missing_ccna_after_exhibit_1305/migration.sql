DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "Questions" WHERE id = 1305) THEN
    RAISE EXCEPTION 'Cannot add the CCNA after exhibit; question ID 1305 is missing';
  END IF;

  UPDATE "Questions"
  SET "afterExhibitImageUrl" = 'questions/ccna-after-exhibit-1305.png',
      "afterExhibitNeedsCheck" = FALSE,
      "afterExhibitCheckNote" = NULL
  WHERE id = 1305;
END $$;
