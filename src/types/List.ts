import { IContent } from "./Content";

export interface IList {
  id: number;
  title: string;
  description: string;
  creation_date: string;
  creator_id: number;
  likes: number;
  privacy: any;
  type: string;
  content: IContent[];
}
