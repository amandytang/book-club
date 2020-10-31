export type Review = {
  bookTitle: string,
  isbn: string,
  contents: string,
  id: number,
};

export type NewReview = Omit<Review, 'id'>;
// equivalent to: export type NewReview = {
//   bookTitle: string,
//   isbn: string,
//   contents: string,
// };

export type UpdatedReview = Partial<Review>;