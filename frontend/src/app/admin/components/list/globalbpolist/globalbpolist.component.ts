import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalBpoModel } from 'src/app/_model/globalBpo.model';
import { GlobalBpoService } from 'src/app/_service/globalBpo/global-bpo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-globalbpolist',
  templateUrl: './globalbpolist.component.html',
  styleUrls: ['./globalbpolist.component.scss'],
})
export class GlobalbpolistComponent implements OnInit {

  
  constructor(private bpoService: GlobalBpoService,
    private router: Router
  ) {}

  // --------------------------frontend -------------------

  isModalOpen = false;
  currentImage: string;

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

  ngOnInit(): void {
    this.getAllGlobalBPOs();
  }

  getAllGlobalBPOs() {
    this.bpoService.getAllGlobalBPOs().subscribe({
      next: (data) => {
        this.globalBPOs = data;
        this.handleImageData(); // Call to handle image data conversion
      },
      error: (error) => {
        this.errorMessage = error; // Capture error for display
      },
    });
  }


  private handleImageData() {
    this.globalBPOs.forEach((bpo) => {
      // Convert thumbnail image to base64
      if (bpo.thumbnailImage) {
        bpo.thumbnailImage = 'data:image/jpeg;base64,' + bpo.thumbnailImage;
      }

      // Handle other images similarly
      bpo.images.forEach((image) => {
        image.img = 'data:image/jpeg;base64,' + image.img;
      });
    });
  }

  // Helper function to convert Uint8Array to base64
  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary); // Convert binary string to base64
  }




  deleteButton(id: number): void {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirmed, proceed with the deletion
        this.bpoService.deleteGlobalBPO(id).subscribe(
          (response) => {
            console.log(response);
            this.getAllGlobalBPOs(); // Refresh the list after deletion
            Swal.fire(
              'Deleted!',
              'Your Global BPO has been deleted.',
              'success'
            );
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting Global BPO:', error);
            Swal.fire(
              'Error!',
              'There was an issue deleting the Global BPO.',
              'error'
            );
          }
        );
      } else {
        // User canceled the deletion
        Swal.fire(
          'Cancelled',
          'Your Global BPO is safe :)',
          'error'
        );
      }
    });
  }
  



  editButton(id) {
    this.router.navigate(['/global-bpo-edit', id]);
    }
    
}
