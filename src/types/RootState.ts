import { CacheState } from '@/types/Cache';
import { WishlistState } from '@/types/WishlistState';

export interface RootState {
    wishlist: WishlistState;
    cache: CacheState;
}