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
  this.notes = this.notes.filter(n => n !== note);
  this.noteToDelete = null;
}

}