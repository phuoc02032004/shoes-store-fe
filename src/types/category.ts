export interface Category {
    _id: string;
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    slug?: string;
  }