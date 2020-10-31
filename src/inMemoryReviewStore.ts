import ReviewStore from './ReviewStore';
import { NewReview, Review, UpdatedReview } from "./review";

type ReviewIDGenerator = () => number;

/**
 * this is a closure that encapsulates each instance of when you call makeReviewIDGGenerator. The call to the makeReviewIDGGenerator function closes over the nextID local variable so something else can't reach in and change the variable. The concept is similar to making something private within a class (closures predate private) so things outside the class can't access it but it's exposed through a method on the class
 */
function makeReviewIDGenerator() : ReviewIDGenerator {
  let nextID = 1;
  
  return (): number => {
    const id = nextID;
    nextID++;

    return id;
  }
}
export default class InMemoryReviewStore implements ReviewStore {
  private readonly state = new Map<Review['id'], Review>(); // I want to be able to look up a map by id
  private readonly getNextId = makeReviewIDGenerator(); // readonly makes getNextId externally immutable - so we can't make getNextId point at something else
  // private means whatever you've made private can't be accessed outside of the class

  get(id: Review['id']): Promise<Review | undefined> {
    const review = this.state.get(id);
    return Promise.resolve(review);
  }
  list(): Promise<Review[]> {
    const allReviews = [...this.state.values()];
    return Promise.resolve(allReviews);
  };
  create(newReview: NewReview): Promise<Review> {
    const id = this.getNextId();
    const review = {...newReview, id};
    this.state.set(id, review);
    return Promise.resolve(review);
  };
  update(id: Review['id'], updatedReview: UpdatedReview): Promise<Review> {
    const review = this.state.get(id);
    if (review === undefined) { // after excluding this type, TS knows the only remaining type for review is Review. This is called type narrowing
      throw new Error(`There is no review for id {id}`);
    }
    
    const reviewAfterUpdate = Object.assign({}, review, updatedReview, {id}); // note order, the leftmost gets written into {} first
    // we explicitly add {id} last just in case there has been some sort of issue with the id in review or if say fraudulently someone associates an id with updatedReview. This could be avoided if we were validating inputs in index.ts
    this.state.set(id, reviewAfterUpdate); // because we used Object.assign to create a whole new object, we need to set it 
    return Promise.resolve(reviewAfterUpdate);
  };
  delete(id: Review['id']): Promise<void> {
    this.state.delete(id);
    return Promise.resolve();
  };
}