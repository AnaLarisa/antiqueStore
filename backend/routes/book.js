const Book = require("../models/Book");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();

//GET ALL BOOKS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qGenre = req.query.genre;
    try {
        let books;

        if (qNew) {
            //returns the newest book added to the db (...?new=true)
            books = await Book.find().sort({ createdAt: -1 }).limit(1);
        } else if (qGenre) {
            //returns the book in the db that corresponds to the genre requested (e.g.: ...?genre=Fiction)
            books = await Book.find({
                genre: {
                    $in: [qGenre],
                },
            });
        } else {
            books = await Book.find();
        }

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE
router.post("/addBook", verifyTokenAndAdmin, async (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        desc: req.body.desc,
        price: req.body.price,
        genre: req.body.genre,
        img: "test"
    });
    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
        console.log("book added");
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/edit/:id", verifyTokenAndAdmin, async (req, res) => {
    //console.log(JSON.stringify(req.body));
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.body._id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.body.book._id);
        res.status(200).json("Book has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET BOOK
router.get("/find/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
