import prisma from "@/lib/prisma";

async function getReviews() {
  const reviews = await prisma.review.findMany();
  return reviews;
}

export default async function Home() {
  const reviews = await getReviews();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="border-b py-4">
            <h2 className="text-xl font-semibold">Store ID: {review.store_id}</h2>
            <p className="text-gray-600">Employee ID: {review.employee_id}</p>
            <p className="mt-2">Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
