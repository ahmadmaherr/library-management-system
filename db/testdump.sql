-- Inserting authors 
INSERT INTO Author (name, createdAt, updatedAt)
VALUES
  ('John Doe', NOW(), NOW()),
  ('Jane Smith', NOW(), NOW()),
  ('Bob Johnson', NOW(), NOW());

-- Inserting books with the same author names
INSERT INTO Book (title, ISBN, availableQuantity, createdAt, updatedAt, AuthorId)
VALUES
  ('Introduction to Programming', '123-456-7890123', 100, NOW(), NOW(), 1), -- AuthorId 1 corresponds to 'John Doe'
  ('Web Development Basics', '234-567-8901234', 75, NOW(), NOW(), 2),      -- AuthorId 2 corresponds to 'Jane Smith'
  ('Data Science Essentials', '345-678-9012345', 50, NOW(), NOW(), 3);     -- AuthorId 3 corresponds to 'Bob Johnson'

  -- Inserting borrowers
INSERT INTO Borrower (name, password, email, registrationDate, createdAt, updatedAt)
VALUES
  ('Alice Johnson', '$2a$08$3ieH1FMeDfssMBOp/Gg8TufKv8TRpVEI4k4DEoAJEDvNLE0ik/mkC', 'alice@email.com', '2023-01-01', NOW(), NOW()),
  ('Bob Smith', '$2a$08$WZOU1U4gIbVuQeUzTGKpZuKqBvSkkJ1g5DAtW8mPUL92OPFj.a4z6', 'bob@email.com', '2023-02-15', NOW(), NOW()),
  ('Charlie Brown', '$2a$08$Lxjhe.nGLzxqs19rANe1k.E2bQw0.znAbP/FJHzV3xYBDNnW2Mzw6', 'charlie@email.com', '2023-03-20', NOW(), NOW());
-- Add more rows as needed
