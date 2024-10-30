import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { globalBpoModel } from 'src/app/_model/globalBpo.model';
import { GlobalBpoService } from 'src/app/_service/globalBpo/global-bpo.service';
import { PracticeService } from 'src/app/Practice/service/practice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-global-bpo-post',
  templateUrl: './global-bpo-post.component.html',
  styleUrls: ['./global-bpo-post.component.scss']
})
export class GlobalBpoPostComponent {


  constructor(
    private bpoService: GlobalBpoService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.imageFormArray = this.fb.array([]);
    this.postForm = this.fb.group({
      title: [''],
      subtitle: [''],
      postDate: [''],
      details: [''],
      images: this.imageFormArray, // Handle multiple images with captions
      thumbnailImage: [''], // Add thumbnail image control

    });
  }


// ---------------------------------------------------------------Frontend --------------------------------------------------------------- 

  postForm: FormGroup;
  imageFormArray: FormArray;
  selectedFiles: File[] = [];
  imagePreviews: string[] = []; // For storing image previews
  thumbnailFile: File | null = null; // For storing the selected thumbnail image
  thumbnailPreview: string | null = null; // For storing the thumbnail preview




  // Add image group
  addImage() {
    const imageGroup = this.fb.group({
      caption: [''],
      previewUrl: [''] // Store preview URL here
    });
    this.imageFormArray.push(imageGroup); // Add new image and caption field
  }




  // Handle file selection for thumbnail
  handleThumbnailSelection(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.thumbnailFile = file;

      // Generate thumbnail preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }











  // File selection with preview (called on file input or drop)
  handleFileSelection(file: File, index: number) {
    this.selectedFiles[index] = file;

    // Generate image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageFormArray.at(index).patchValue({
        previewUrl: e.target.result // Update preview URL
      });
    };
    reader.readAsDataURL(file); // Read the image file
  }

  // Handle file input change event
  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.handleFileSelection(file, index);
    }
  }

  // Handle drag-and-drop event
  onFileDrop(event: any, index: number) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      this.handleFileSelection(file, index);
    }
  }

  // Prevent default behavior on drag over to allow dropping
  onDragOver(event: any) {
    event.preventDefault();
  }

  // Remove image and caption
  removeImage(index: number) {
    this.imageFormArray.removeAt(index); // Remove from form
    this.selectedFiles.splice(index, 1); // Remove from selected files
  }




// ---------------------------------------------------------------Backend --------------------------------------------------------------- 





  // Submit form data
  submitPost() {
    const formData = new FormData();
    
    // Append form data fields
    formData.append('title', this.postForm.get('title').value);
    formData.append('subtitle', this.postForm.get('subtitle').value);
    formData.append('postDate', this.postForm.get('postDate').value);
    formData.append('details', this.postForm.get('details').value);
    
    // Captions array
    const captions = this.imageFormArray.value.map((image) => image.caption);
    
    // Append captions
    captions.forEach((caption, index) => {
        console.log(`Appending caption ${index + 1}:`, caption); // Debugging caption
        formData.append(`captions`, caption);
    });

    // Append images
    this.selectedFiles.forEach((file, index) => {
        console.log(`Appending image ${index + 1}:`, file.name); // Debugging file name
        formData.append('images', file);
    });




    if (this.thumbnailFile) {
      formData.append('thumbnailImage', this.thumbnailFile); // Add thumbnail image
    }




    // Check the final formData keys and values (for debugging)
    formData.forEach((value, key) => {
        console.log(`Key: ${key}, Value:`, value);
    });

    // Send data to the backend
    this.bpoService.createGlobalBPO(formData).subscribe(
        (response) => {
          console.log('Post created successfully:', response);

          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'GlobalBPO Created Successfully',
            showConfirmButton: false,
            timer: 2500,
          });

          this.router.navigateByUrl('global-bpo-list');
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
          });

          console.error('Error uploading GlobalBPO:', error);
        }
      );
}

}









