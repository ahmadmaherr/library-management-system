import { Author, Book, Borrower, Borrow } from "./src/data/models/index.js";


export default async function insertDummyData(){
    const insertDummyBorrows = async () => {
        try {

            const migrationExecuted = await Borrow.findOne();


            if(!migrationExecuted){
                const insertedBorrows = await Borrow.bulkCreate(
                    [
                        {
                        borrowerId: 1, 
                        bookId: 1,   
                        borrowDate: '2023-04-01',
                        returnDate: '2023-05-01',
                        },
                        {
                        borrowerId: 2,
                        bookId: 2,
                        borrowDate: '2023-04-02',
                        returnDate: '2023-05-02',
                        },
                        {
                        borrowerId: 3,
                        bookId: 3,
                        borrowDate: '2023-04-03',
                        returnDate: '2023-05-03',
                        },
                    ]
                );
            
                console.log('Dummy Borrows inserted:', insertedBorrows.map(borrow => borrow.get({ plain: true })));
            }
        } catch (error) {
        console.error('Error inserting dummy borrows:', error);
        }
    };
    
    insertDummyBorrows();

    const insertAuthors = async () => {
    try {

        const migrationExecuted = await Author.findOne();

        if(!migrationExecuted){
            const authors = await Author.bulkCreate([
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Bob Johnson' },
            ]);

            console.log('Authors inserted:', authors.map(author => author.get({ plain: true })));

        }

    } catch (error) {
        console.error('Error inserting authors:', error);
    }
    };

    const insertBooks = async () => {
    try {
        const migrationExecuted = await Book.findOne();

        if(!migrationExecuted){
            const books = await Book.bulkCreate([
            {
                title: 'Introduction to Programming',
                ISBN: '123-456-7890123',
                availableQuantity: 100,
                AuthorId: 1,
            },
            {
                title: 'Web Development Basics',
                ISBN: '234-567-8901234',
                availableQuantity: 75,
                AuthorId: 2,
            },
            {
                title: 'Data Science Essentials',
                ISBN: '345-678-9012345',
                availableQuantity: 50,
                AuthorId: 3,
            },
            ]);

            console.log('Books inserted:', books.map(book => book.get({ plain: true })));

        }

    } catch (error) {
        console.error('Error inserting books:', error);
    }
    };

    const insertBorrowers = async () => {
    try {
        const migrationExecuted = await Borrower.findOne();

        if(!migrationExecuted){
            const borrowers = await Borrower.bulkCreate([
            {
                name: 'Alice Johnson',
                password: '$2a$08$3ieH1FMeDfssMBOp/Gg8TufKv8TRpVEI4k4DEoAJEDvNLE0ik/mkC',
                email: 'alice@email.com',
                registrationDate: '2023-01-01',
            },
            {
                name: 'Bob Smith',
                password: '$2a$08$WZOU1U4gIbVuQeUzTGKpZuKqBvSkkJ1g5DAtW8mPUL92OPFj.a4z6',
                email: 'bob@email.com',
                registrationDate: '2023-02-15',
            },
            {
                name: 'Charlie Brown',
                password: '$2a$08$Lxjhe.nGLzxqs19rANe1k.E2bQw0.znAbP/FJHzV3xYBDNnW2Mzw6',
                email: 'charlie@email.com',
                registrationDate: '2023-03-20',
            },
            ]);
           
            console.log('Borrowers inserted:', borrowers.map(borrower => borrower.get({ plain: true })));
        }

    } catch (error) {
        console.error('Error inserting borrowers:', error);
    }
    };

    insertAuthors();
    insertBooks();
    insertBorrowers();
    insertDummyBorrows();
}