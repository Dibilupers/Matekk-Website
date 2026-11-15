DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "Questions" WHERE id = 1317) THEN
    RAISE EXCEPTION 'Cannot add the CCNA after exhibit; question ID 1317 is missing';
  END IF;

  UPDATE "Questions"
  SET "afterExhibitImageUrl" = 'questions/ccna-after-exhibit-1317.png'
  WHERE id = 1317;
END $$;
