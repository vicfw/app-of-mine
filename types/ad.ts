export interface AdsType {
  isApproved: boolean;
  isPopular: boolean;
  _id: string;
  title: string;
  category: string;
  phone: string;
  description: string;
  images: { img: string }[];
  city: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
}
