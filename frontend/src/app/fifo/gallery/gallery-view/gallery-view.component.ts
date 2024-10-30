import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { photoUploadModel } from 'src/app/_model/photoUpload.model';
import { PhotoUploadService } from 'src/app/_service/photoUpload/photo-upload.service';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit {

  constructor(
    private bpoService: PhotoUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // --------------------------frontend -------------------
  //  bpo: any;

  // Method to share on Facebook
  shareOnFacebook() {
    const url = window.location.href; // Current page URL
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, '_blank');
  }

  // Method to share on LinkedIn
  shareOnLinkedIn() {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(this.bpo.title)}&summary=${encodeURIComponent(
      this.bpo.subtitle
    )}&source=LinkedIn`;
    window.open(linkedInUrl, '_blank');
  }

  // Method to share on Twitter
  shareOnTwitter() {
    const url = window.location.href;
    const text = `${this.bpo.title} - ${this.bpo.subtitle}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  }

  // Method to print the page
  printPage() {
    window.print();
  }

  isModalOpen = false;
  currentImage: string = '';

  // Method to open the modal with the clicked image
  openModal(imageSrc: string): void {
    this.currentImage = imageSrc;
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.currentImage = '';
  }

  // --------------------------Backend -------------------

  Gallery: photoUploadModel[] = [];
  errorMessage: string | null = null; // To hold any error messages
  bpo: photoUploadModel | null = null;



  getAllGallery() {
    this.bpoService.getAllGallery().subscribe({
      next: (data) => {
        this.Gallery = data;
        this.handleImageData(); // Call to handle image data conversion
        this.handleImageDataThumbnail();

      },
      error: (error) => {
        this.errorMessage = error; // Capture error for display
      },
    });

    
  }




  // ------------------------------------------------------new--------------------

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getGalleryById(+id); 
    }
  }

  getGalleryById(id: number): void {
    this.bpoService.getGalleryById(id).subscribe({
      next: (data) => {
        this.bpo = data;
        this.handleImageData(); 

      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }



  processImage(element: any): void {
    if (element.byteImg) {
      const base64Image = `data:image/jpeg;base64,${element.byteImg}`;
      element.img = base64Image;
      console.log('Image processed for element:', element.id);
    } else {
      console.warn('No image data found for element:', element);
      element.img = null;
    }
  }



  
  private handleImageDataThumbnail() {
    this.Gallery.forEach((bpo) => {
      if (bpo.thumbnailImage && !bpo.thumbnailImage.startsWith('data:image')) {
        bpo.thumbnailImage = 'data:image/jpeg;base64,' + bpo.thumbnailImage;
      }
    });
  }
  


  private handleImageData() {
    if (this.bpo && this.bpo.images) {
      this.bpo.images.forEach((image) => {
        image.img = 'data:image/jpeg;base64,' + image.img; // Ensure correct data URI scheme
      });
    }

  // Process thumbnail image
  if (this.bpo && this.bpo.thumbnailImage) {
    this.bpo.thumbnailImage = 'data:image/jpeg;base64,' + this.bpo.thumbnailImage; // Convert to base64
  } 

  }
}
