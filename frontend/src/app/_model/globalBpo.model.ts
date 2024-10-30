export interface globalBpoModel{

    id: number;
    title: string;
    subtitle: string;
    postDate: string;
    details: string;
    images: ImageGB[];
    thumbnailImage: string;  

} 


interface ImageGB {
    img: string; 
    caption: string;
  }
  