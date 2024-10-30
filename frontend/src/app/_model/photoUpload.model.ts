export interface photoUploadModel{

 
    id: number;
  title: string;
  subtitle: string;
  postDate: string; 
  details: string;
  images: ImageGallery[];
  thumbnailImage: string; 
} 

interface ImageGallery {
    img: string; 
    caption: string;
  }