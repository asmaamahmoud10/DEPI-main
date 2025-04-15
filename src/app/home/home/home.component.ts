import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/notes/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  noteToDelete: any = null;

viewNote(note: any) {
  console.log("Viewing note", note);
}

editNote(note: any) {
  console.log("Editing note", note);
}

confirmDelete(note: any) {
  this.noteToDelete = note;
}

cancelDelete() {
  this.noteToDelete = null;
}

deleteNote(note: any) {
  this.noteService.deleteNote(note.id).subscribe({
    next: () => {
      this.notes = this.notes.filter(n => n.id !== note.id);
      this.noteToDelete = null;
    },
    error: (err) => {
      console.error('Error deleting note:', err);
      alert('There is an error.');
    }
  });
}


}