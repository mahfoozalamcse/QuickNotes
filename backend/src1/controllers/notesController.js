import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
   try {
      const notes =  await Note.find().sort({ createdAt: -1 });
      res.status(200).json(notes);

   } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: " Server Error" });

   }
};

export async function getNoteById(req, res) {
   try {
      const note = await Note.findById(req.params.id);
      if (!note) return res.status(404).json({ message: "Note not found"});
      res.status(200).json(note);

   } catch (error) {
       console.error("Error fetching by id notes:", error);
       res.status(500).json({ message: " Server Error" });
   }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully"});

    } catch (error) {
        console.error("Error creating notes:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export async function updateNote(req, res) {
   try {
      const noteId = req.params.id;
      const updatedNote = await Note.findByIdAndUpdate(noteId, req.body,
         {new: true}
      );
      if (!updatedNote) return res.status(404).json({ message: "Note not found"});

      res.status(200).json(updatedNote);


   } catch (error) {
       console.error("Error updates notes:", error);
       res.status(500).json({ message: "Server Error" });
   }
};

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found"});
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
       console.error("Error delete notes:", error);
       res.status(500).json({ message: "Server Error" });
  }
}
