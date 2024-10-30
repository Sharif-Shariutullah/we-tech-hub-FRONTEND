import { Router } from '@angular/router';
import { newsPostModel } from './../../../../_model/newsPost.model';
import { Component, OnInit } from '@angular/core';
import { NewsPostService } from 'src/app/_service/NewsPost/news-post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss'],
})
export class NewslistComponent implements OnInit {
  constructor(private router: Router, private newsService: NewsPostService) {}

  newsObject: newsPostModel = {
    title: '',
    subtitle: '',
    details: '',
    img: '',

    createDate: '',
    createTime: '',
    lastUpdated: '',
  };

  ngOnInit(): void {
    this.getAllNews();
  }

  // data source which is array
  newsModelArray: newsPostModel[] = [];

  // table colomn names
  displayedColumns: string[] = [
    '#',
    'ID',
    'News Title',
    'Subtitle',
    'Details',
    'Image',
    'Edit',
    'Delete',
  ];

  newsData: any[] = [];

  getAllNews(): void {
    this.newsService.getAllNews().subscribe(
      (data) => {
        this.newsData = data;
        this.newsData.forEach((element) => {
          console.log('Processing element:', element);

          this.processImage(element);
        });
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
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

  deleteNews(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.newsService.deleteNews(id).subscribe(
          (response) => {
            console.log(response);
            this.getAllNews(); // Refresh the news list
            Swal.fire('Deleted!', 'The news item has been deleted.', 'success');
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the news item.',
              'error'
            );
          }
        );
      }
    });
  }

  // edit news
  editNews(id) {
    this.router.navigate(['/news-edit', id]);
  }
}
