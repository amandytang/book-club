import { NewReview, Review, UpdatedReview } from "./review";

export default interface ReviewStore {
  get(id: Review['id']): Promise<Review | undefined>; // id could also be number, and resolves to that when using the lookup <Review['id']. The lookup makes it clearer what value you are actually expecting
  list(): Promise<Review[]>;
  create(newReview: NewReview): Promise<Review>;
  update(id: Review['id'], updatedReview: UpdatedReview): Promise<Review>;
  delete(id: Review['id']): Promise<void>;
};
