import { FileHandle } from './file_handle.model';

export interface newsPostModel {
  title: string;
  subtitle: string;
  details: string;
  img: any;
  processedImg?: string; 
  
  createDate: string;
  createTime: string;  
  lastUpdated: string; 
}


