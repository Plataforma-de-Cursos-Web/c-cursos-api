export interface CourseResponseDto {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  status: 'draft' | 'published' | 'archived';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalModules: number;
  totalMaterials: number;
  totalDuration: number;
  modules?: any[];
}