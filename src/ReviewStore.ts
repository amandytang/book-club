import { NewReview, Review, UpdatedReview } from "./review";

export default interface ReviewStore {
  get(id: number): Promise<Review | undefined>;
  list(): Promise<Review[]>;
  create(newReview: NewReview): Promise<Review>;
  update(updatedReview: UpdatedReview): Promise<Review>;
  delete(id: number): Promise<void>;
};
