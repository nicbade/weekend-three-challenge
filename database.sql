CREATE TABLE tasks (
    id serial PRIMARY KEY,
    task VARCHAR(80) NOT NULL,
    due VARCHAR(20) NOT NULL,
    completed VARCHAR(20)
);

INSERT INTO tasks (task, due, completed)
VALUES ('Walk Chloe', 'March 3', 'not complete');

SELECT * From tasks;

DROP TABLE tasks;

UPDATE tasks SET completed = 'complete' WHERE id = 1;