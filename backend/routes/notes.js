const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

const fetchUser = require('../middleware/fetchUser');
const { body,validationResult } = require('express-validator');


// ROUTE 1 : Get all the notes of a particular User
router.get('/getNotes', fetchUser , async (req, res) => {
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    } catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
})


// ROUTE 2 : Add a new Note Using POST
router.post('/addnotes', fetchUser, [
    body('title','Enter a Valid Title').isLength({ min : 3 }),
    body('description',"Enter a valid Note").isLength({ min : 5 })
    ], async (req, res) => {
    
    try {
        const {title, description, tag} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({ errors : errors.array() })
        }
    
        const note = new Note({
            title,
            description,
            tag,
            user : req.user.id
        });
    
        const savedNote = await note.save();
        
        res.json(savedNote)
    } 
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
   
})

// ROUTE 2 : Update Notes

router.put('/update/:id', fetchUser, async (req,res) => {

    try {
        const {title, description, tag} = req.body;
    
    //  create a newNote object
        const newNote = {};
        if(title) {newNote.title = title}
        if(description) {newNote.description = description}
        if(tag) {newNote.tag = tag}
    
    //  Find the Note to be updated
        let note = await Note.findById(req.params.id)
        if(!note){res.status(404).send("Note not found")}
    
        if(note.user.toString() != req.user.id){
            res.status(401).send("Unathorized")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new : true})
        res.json(note)
        
    } 
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }

})



// ROUTE 3 : Delete Notes
router.delete('/delete/:id', fetchUser, async (req,res) => {
    try {
        const {title, description, tag} = req.body;
    
    //  create a newNote object
        const newNote = {};
        if(title) {newNote.title = title}
        if(description) {newNote.description = description}
        if(tag) {newNote.tag = tag}
    
    //  Find the Note to be updated
        let note = await Note.findById(req.params.id)
        if(!note){res.status(404).send("Note not found")}
    
        if(note.user.toString() != req.user.id){
            res.status(401).send("Unathorized")
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({status:"Successfully deleted",note})
        
    } 
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }

})


module.exports = router;