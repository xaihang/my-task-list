CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200) NOT NULL,
    "is_complete" BOOLEAN DEFAULT FALSE);

INSERT INTO "tasks" ("name", "is_complete")
VALUES 
('buy oat milk', false),
('grind coffee bean', false),
('get starbucks', false);

SELECT * FROM "tasks";
