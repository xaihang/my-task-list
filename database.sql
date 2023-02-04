CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "is_complete" BOOLEAN DEFAULT FALSE,
    "name" VARCHAR(200) NOT NULL
);

INSERT INTO "tasks" ("is_complete", "name")
VALUES 
(false, 'buy oat milk'),
(false, 'get qtips'),
(false, 'make hmong peppers');

SELECT * FROM "tasks";