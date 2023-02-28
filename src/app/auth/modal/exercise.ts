export interface Exercise {
  id: string;
  name: string;
  image: string;
  difficulty: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;

}
