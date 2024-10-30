import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { photoUploadModel } from 'src/app/_model/photoUpload.model';
import { PhotoUploadService } from 'src/app/_service/photoUpload/photo-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss']
})
export class GalleryEditComponent implements OnInit {
  
  gBPO: photoUploadModel;
  id: number;
  postForm: FormGroup;
  imageFormArray: FormArray;
  selectedFiles: File[] = [];
  imagePreviews: string[] = []; // For storing image previews
  thumbnailFile: File | null = null; // For storing the selected thumbnail image
  thumbnailPreview: string | null = null; // For storing the thumbnail preview

  constructor(
    private bpoService: PhotoUploadService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // Fetch the data for the Global BPO by ID
    this.getGalleryById(this.id);
  }

  getGalleryById(id: number): void {
    this.bpoService.getGalleryById(id).subscribe({
      next: (data) => {
        this.gBPO = data;
        this.handleImageData();
        this.populateForm(data); // Populate the form with the fetched data
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  // Populate the form fields with the fetched data
  private populateForm(data: photoUploadModel): void {
    this.postForm.patchValue({
      title: data.title,
      subtitle: data.subtitle,
      postDate: data.postDate,
      details: data.details,
    });

    // Populate image form array with captions
    data.images?.forEach((image) => {
      this.imageFormArray.push(
        this.fb.group({
          caption: [image.caption],
          previewUrl: ['data:image/jpeg;base64,' + image.img], // Set preview URL for images
        })
      );
    });

    // Set the thumbnail image preview
    if (data.thumbnailImage) {
      this.thumbnailPreview = 'data:image/jpeg;base64,' + data.thumbnailImage;
    }
  }

  // ---------------------------------------------------------------Frontend ---------------------------------------------------------------

  // Add image group
  addImage() {
    const imageGroup = this.fb.group({
      caption: [''],
      previewUrl: [''], // Store preview URL here
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
        previewUrl: e.target.result, // Update preview URL
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

 
  UpdatePost() {
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
      formData.append(`captions`, caption);
    });

    // Append images
    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    // Append thumbnail image if available
    if (this.thumbnailFile) {
      formData.append('thumbnailImage', this.thumbnailFile);
    }

    // Call the update method from the service
    this.bpoService.updateGallery(this.id, formData).subscribe(
      (response) => {
        console.log('Post updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Gallery Updated Successfully',
          showConfirmButton: false,
          timer: 2500,
        });

        this.router.navigateByUrl('gallery-list');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
        console.error('Error updating Gallery:', error);
      }
    );
  }

  // fetching data

  gallery: photoUploadModel[] = [];
  errorMessage: string | null = null; // To hold any error messages
  bpo: photoUploadModel | null = null;

  private handleImageData() {
    if (this.bpo && this.bpo.images) {
      this.bpo.images.forEach((image) => {
        image.img = 'data:image/jpeg;base64,' + image.img; // Ensure correct data URI scheme
      });
    }

    // Process thumbnail image
    if (this.bpo && this.bpo.thumbnailImage) {
      this.bpo.thumbnailImage =
        'data:image/jpeg;base64,' + this.bpo.thumbnailImage; // Convert to base64
    }
  }

  getAllGallery() {
    this.bpoService.getAllGallery().subscribe({
      next: (data) => {
        this.gallery = data;
        this.handleImageData(); // Call to handle image data conversion
      },
      error: (error) => {
        this.errorMessage = error; // Capture error for display
      },
    });
  }
}
