import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  @ViewChild('countYears') countYears!: ElementRef;
  @ViewChild('countClients') countClients!: ElementRef;
  @ViewChild('countTeam') countTeam!: ElementRef;
  @ViewChild('logosSlide') logosSlide!: ElementRef;
  
  private targetCounts = {
    years: 20,
    clients: 150,
    team: 200
  };
  
  private currentCounts = {
    years: 0,
    clients: 0,
    team: 0
  };

  // Delay between increments (milliseconds)
  private incrementDelay = 20;


  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.startCounting.bind(this));
    this.startCounting(); 
  }
  
  private isElementInViewport(element: ElementRef): boolean {
    const rect = element.nativeElement.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  private startCounting(): void {
    if (this.isElementInViewport(this.countYears) || 
        this.isElementInViewport(this.countClients) || 
        this.isElementInViewport(this.countTeam)) {
      this.updateCount('years', this.countYears);
      this.updateCount('clients', this.countClients);
      this.updateCount('team', this.countTeam);
      window.removeEventListener('scroll', this.startCounting.bind(this));
    }
  }

  private updateCount(key: 'years' | 'clients' | 'team', element: ElementRef): void {
    if (this.currentCounts[key] < this.targetCounts[key]) {
      this.currentCounts[key]++;
      this.renderer.setProperty(element.nativeElement, 'textContent', `${this.currentCounts[key]}+`);

      // Use setTimeout to slow down the increment speed
      setTimeout(() => {
        this.updateCount(key, element);
      }, this.incrementDelay);
    }
  }



  // Image and text animation data
  imagesAndText: { image: string; text: string }[] = [
    { image: 'assets/photo/offer/call.png', text: 'Call Center Services' },
    { image: 'assets/photo/offer/call-2.png', text: 'Digital Marketing' },
    { image: 'assets/photo/offer/call-3.png', text: 'Skills Development' },
    { image: 'assets/photo/offer/call-4.png', text: 'Creative Design' },
    { image: 'assets/photo/offer/call-5.png', text: 'Back-Office Services' },
    { image: 'assets/photo/offer/call-7.png', text: 'Software Development' },
    { image: 'assets/photo/offer/call-8.png', text: 'Finance and Accounting' },
  ];


  currentImageAndText = this.imagesAndText[0];
  i: number = 0;
  typed: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.startAnimationCycle();
    const clonedSlide = this.logosSlide.nativeElement.cloneNode(true);
    this.renderer.appendChild(this.logosSlide.nativeElement.parentNode, clonedSlide);
    
  }

  // Synchronize both image and text animation
  startAnimationCycle(): void {
    this.updateTypedText(); // Initialize the first text typing animation
    setInterval(() => {
      this.i = (this.i + 1) % this.imagesAndText.length;
      this.fadeOutTextAndImage(() => {
        this.currentImageAndText = this.imagesAndText[this.i];
        this.updateTypedText(); // Update and animate text with typing effect
      });
    }, 4000); // Change every 4 seconds
  }

  // Smooth fade out and fade in for both text and image changes
  fadeOutTextAndImage(callback: Function): void {
    const textElement = document.getElementById('typed-text');
    const imageElement = document.getElementById('slideImg');

    if (textElement && imageElement) {
      // Add fade-out class to both text and image
      this.renderer.addClass(textElement, 'fade-out');
      this.renderer.addClass(imageElement, 'fade-out');

      setTimeout(() => {
        callback(); // Update text and image after fade out
        this.renderer.removeClass(textElement, 'fade-out');
        this.renderer.addClass(textElement, 'fade-in');
        
        this.renderer.removeClass(imageElement, 'fade-out');
        this.renderer.addClass(imageElement, 'fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
          this.renderer.removeClass(textElement, 'fade-in');
          this.renderer.removeClass(imageElement, 'fade-in');
        }, 500); // 500ms for fade-in duration
      }, 500); // Wait for fade out to complete (500ms)
    }
  }

  // Reinitialize Typed.js for typing animation when text changes
  updateTypedText(): void {
    if (this.typed) {
      this.typed.destroy(); // Destroy previous instance before creating a new one
    }

    const options = {
      strings: [this.currentImageAndText.text],
      typeSpeed: 60,
      backSpeed: 20,
      showCursor: false,
    };

    this.typed = new Typed('#typed-text', options);
  }




  testimonials = [
    {
      image: 'assets/photo/team/image-person-0.png',
      comment: 'This company provides excellent service, highly recommended!',
      name: 'Dr. Abdul Karim',
      designation: 'CEO, Air Deal',
      star: 5
    },
    {
      image: 'assets/photo/team/image-person-1.png',
      comment: 'Great experience, the team is very professional and reliable.',
      name: 'Reazaul Haque',
      designation: 'Marketing Director, Magic Digital Media',
      star: 4.5
    },
    {
      image: 'assets/photo/team/image-person-2.png',
      comment: 'Outstanding results, very happy with the outcome of our project.',
      name: 'Shusmita Rahman',
      designation: 'Project Manager, STech Ltd',
      star: 4.5
    }
  ];

  createStarArray(starCount: number): string[] {
    const fullStars = Math.floor(starCount);  // Number of full stars
    const hasHalfStar = starCount % 1 !== 0;  // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);  // Remaining empty stars

    return [
      ...Array(fullStars).fill('full'),  // Full stars
      ...(hasHalfStar ? ['half'] : []),  // Half star (if any)
      ...Array(emptyStars).fill('empty')  // Empty stars
    ];
  }
  currentIndex = 0;
  currentTestimonial = this.testimonials[this.currentIndex];

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.currentTestimonial = this.testimonials[this.currentIndex];
  }

  prevTestimonial() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.currentTestimonial = this.testimonials[this.currentIndex];
  }

}
