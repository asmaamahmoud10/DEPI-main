import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  noteForm 
 
 

  //profileData
  adressData
  constructor(private builder:FormBuilder,private noteservice:NoteService,private router: Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    

    this.initForm();
  }
  initForm() {
    this.noteForm = this.builder.group({
      title: ['', [Validators.required]],   
      content: ['', [Validators.required]],
      category: ['', [Validators.required]], 
      priority: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      
    });
  }
  errorMessage = '';
  isLoading = false;



  onSubmit() {
    if (this.noteForm.valid) {
      this.isLoading = true;
     // console.log(this.noteForm);
      //console.log(this.profileData.value);
      this.noteservice.ctreateNotes(this.noteForm.value).subscribe((res)=>{
        this.isLoading = false;
        console.log('Response',res);
        this.showSuccess();
        //this.noteForm.reset();///remove the form data
        //navigate to notes page
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },(err)=>{
        this.isLoading = false;
        //errors from backend handling on status code 401,403
        this.errorMessage = "Something went wrong. Please try again later.";
        console.log('Error',err.error.errors);//error from backend 
        
        //navigate to login page and remove token from local storage////////////
      }

    );

    }
   
  }


  showSuccess() {
    this.toastr.success('success', 'Created Successfully');
  }



  updatenotes() {
    this.noteForm.patchValue({
      title: 'John',
      content: 'Doe',
      category: 'Doe',
      priority: 'Doe',
      tags: 'Doe',
    });
  }
  // Method to confirm before updating or saving
 // Method to confirm before updating or saving
confirmAction(action: string) {
  const confirmation = window.confirm(`Are you sure you want to ${action}?`);
  if (confirmation) {
    if (action === 'save') {
      this.onSubmit();
    } else if (action === 'update') { 
      this.updatenotes();
    } else if (action === 'cancel') {
      this.noteForm.reset();
    }
  }
}


  get valid(){
    return this.noteForm.controls;
  }

}
