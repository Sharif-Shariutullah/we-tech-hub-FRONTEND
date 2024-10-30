import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalBpoModel } from 'src/app/_model/globalBpo.model';
import { GlobalBpoService } from 'src/app/_service/globalBpo/global-bpo.service';

@Component({
  selector: 'app-global-bpo-view',
  templateUrl: './global-bpo-view.component.html',
  styleUrls: ['./global-bpo-view.component.scss'],
})
export class GlobalBpoViewComponent implements OnInit {

  constructor(
    private bpoService: GlobalBpoService,
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

  globalBPOs: globalBpoModel[] = [];
  errorMessage: string | null = null; // To hold any error messages
  bpo: globalBpoModel | null = null;



  getAllGlobalBPOs() {
    this.bpoService.getAllGlobalBPOs().subscribe({
      next: (data) => {
        this.globalBPOs = data;
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
      this.getGlobalBPOById(+id); 
    }
  }

  getGlobalBPOById(id: number): void {
    this.bpoService.getGlobalBPOById(id).subscribe({
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
    this.globalBPOs.forEach((bpo) => {
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
