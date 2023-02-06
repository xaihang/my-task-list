CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200) NOT NULL,
    "is_complete" BOOLEAN DEFAULT FALSE);

-- POST 
INSERT INTO "tasks" ("name", "is_complete")
VALUES 
('buy oat milk', false),
('grind coffee bean', false),
('get starbucks', false);

-- GET and organized by id
SELECT * FROM "tasks" ORDER BY "id";

-- DELETE
DELETE FROM tasks WHERE id = $1;

-- PUT update 
UPDATE tasks SET is_complete = $1 WHERE id = $2;

