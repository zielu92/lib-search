import { Book } from '@/types/Book';

export interface CacheState {
    cache: { [key: string]: Book[] };
  }
  