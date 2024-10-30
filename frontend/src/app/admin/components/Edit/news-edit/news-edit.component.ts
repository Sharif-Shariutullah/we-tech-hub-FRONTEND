import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { newsPostModel } from 'src/app/_model/newsPost.model';
import { NewsPostService } from 'src/app/_service/NewsPost/news-post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss'],
})
export class NewsEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private newsService: NewsPostService,
    private route: ActivatedRoute
  ) {}

  newsForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isModalOpen: boolean = false;
  id: number;

  model: newsPostModel;
  imageUrl: string | ArrayBuffer; // This will hold the base64 image URL

  //--------------  Backend -------------

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
      title: [''],
      subtitle: [''],
      details: [''],
    });

    this.id = this.route.snapshot.params['id'];
    this.getNewsById(this.id);
  }

  getNewsById(id: number): void {
    this.newsService.getNewsById(id).subscribe(
      (newsData: any) => {
        console.log('News Data:', newsData); // Log the entire newsData
        this.newsForm.patchValue({
          title: newsData.title,
          subtitle: newsData.subtitle,
          details: newsData.details,
        });

        if (newsData.byteImg) {
          this.imagePreview = this.convertToBase64(newsData.byteImg);
        } else {
          console.log('Image data is null');
        }
      },
      (error) => {
        console.error('Error fetching news by ID:', error);
      }
    );
  }

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

  convertToBase64(imageBytes: string): string {
    return `data:image/jpeg;base64,${imageBytes}`;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }







  UpdateNews(): void {
    if (this.newsForm.valid) {
      const formData: FormData = new FormData();
  
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      
      if (this.newsForm.get('title')?.dirty) {
        formData.append('title', this.newsForm.get('title').value);
      }
      if (this.newsForm.get('subtitle')?.dirty) {
        formData.append('subtitle', this.newsForm.get('subtitle').value);
      }
      if (this.newsForm.get('details')?.dirty) {
        formData.append('details', this.newsForm.get('details').value);
      }
  
      this.newsService.updateNews(this.id, formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Update',
            text: 'News Updated Successfully',
            showConfirmButton: false,
            timer: 2500,
          });
  
          this.newsForm.reset();
          this.selectedFile = null;
  
          this.router.navigateByUrl('newsList');
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
