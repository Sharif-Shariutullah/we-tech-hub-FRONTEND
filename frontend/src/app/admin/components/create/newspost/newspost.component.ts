import { SafeUrl } from '@angular/platform-browser';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewsPostService } from 'src/app/_service/NewsPost/news-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newspost',
  templateUrl: './newspost.component.html',
  styleUrls: ['./newspost.component.scss'],
})
export class NewspostComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private newsService: NewsPostService
  ) {
    this.newsForm = this.fb.group({
      title: [''],
      subtitle: [''],
      details: [''],
      // description: this.fb.array([]),
      // other form controls...
    });
  }

  newsForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isModalOpen: boolean = false;
  
  isDragOver = false;











  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create an image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      details: ['', [Validators.required]],
    });
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }





  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.selectedFile = file;
        this.createImagePreview(this.selectedFile);
      }
    }
  }

  private createImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }






  //--------------  Backend -------------


  addNews(): void {
    if (this.newsForm.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('title', this.newsForm.get('title').value);
      formData.append('subtitle', this.newsForm.get('subtitle').value);
      formData.append('details', this.newsForm.get('details').value);
  
  
      this.newsService.addNews(formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'News Created Successfully',
            showConfirmButton: false,
            timer: 2500,
          });
  
          this.newsForm.reset();
          this.selectedFile = null;
          location.reload();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    } else {
      this.newsForm.markAllAsTouched();
    }
  }
  
  

  
  
}