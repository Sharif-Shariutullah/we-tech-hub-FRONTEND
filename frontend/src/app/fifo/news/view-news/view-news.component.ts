import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newsPostModel } from 'src/app/_model/newsPost.model';
import { NewsPostService } from 'src/app/_service/NewsPost/news-post.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss'],
})
export class ViewNewsComponent implements OnInit {
  navigateToFullNewsPage() {
    this.router.navigate(['/news']);
  }

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsPostService,
    private router: Router
  ) {}

  isHorizontalImage: boolean = false;

  loadNewsData() {
    const img = new Image();
    img.src = this.newsModelArray.img;
    img.onload = () => {
      this.isHorizontalImage = img.width > img.height; // Set to true if horizontal
    };
  }

  // ---------------------------------------backend-------------------------

  newsModelArray: newsPostModel = {
    title: '',
    subtitle: '',
    details: '',
    img: '',
    createDate: '',
    createTime: '',
    lastUpdated: '',
  };

  ngOnInit() {
    this.loadNewsData(); // frontend

    this.getAllNews(); // Call this method to fetch all news items

    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch news details by ID
    this.newsService.getNewsById(id).subscribe(
      (response: newsPostModel) => {
        this.newsModelArray = response;

        // Use dynamic field access to handle byteImg
        const byteImg = (response as any).byteImg;
        if (byteImg) {
          this.newsModelArray.img = `data:image/jpeg;base64,${byteImg}`;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading news details:', error);
      }
    );
  }

  newsData: any[] = [];

  processImage(): void {
    if (
      this.newsModelArray.img &&
      typeof this.newsModelArray.img !== 'string'
    ) {
      // Assuming the img is in a binary format, convert it to base64
      const binaryImage = this.newsModelArray.img;
      const base64Image = `data:image/jpeg;base64,${binaryImage}`;
      this.newsModelArray.processedImg = base64Image;
    } else {
      // If img is already a base64 string, directly use it
      this.newsModelArray.processedImg = this.newsModelArray.img;
    }
  }

  getAllNews(): void {
    this.newsService.getAllNews().subscribe(
      (data) => {
        this.newsData = data;
        this.newsData.forEach((element) => {
          console.log('Processing element:', element);

          this.processImage();
        });
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  getNewsById(id: number) {
    this.newsService.getNewsById(id).subscribe(
      (response: newsPostModel) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching News details:', error);
      }
    );
  }

  // Inside your ViewNewsComponent class
  getNewsByTitleId(id: number) {
    // Fetch the news details based on the ID and update the current news details
    this.newsService.getNewsById(id).subscribe(
      (response: newsPostModel) => {
        this.newsModelArray = response; // Update the news details

        // Check if the image is horizontal or vertical
        const img = new Image();
        img.src = this.newsModelArray.img;
        img.onload = () => {
          this.isHorizontalImage = img.width > img.height;
        };

        // Handle byteImg if present
        const byteImg = (response as any).byteImg;
        if (byteImg) {
          this.newsModelArray.img = `data:image/jpeg;base64,${byteImg}`;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching news details:', error);
      }
    );
  }
}
