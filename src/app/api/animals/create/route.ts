import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

// ... (import statements)

export async function POST(request: Request): Promise<Response> {
  const { userId: authUserId } = auth();

  if (!authUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { userId: requestUserId, ...animalData } = await request.json();

    // Check if user_id from the request is the same as the authenticated user's userId
    if (authUserId !== requestUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // If user_id is the same, proceed with inserting the animal
    const insertQuery =
      "INSERT INTO animals (name, age, race, owner_name, owner_phone, owner_email, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    await pool.query(insertQuery, [
      animalData.name,
      animalData.age,
      animalData.race,
      animalData.owner_name,
      animalData.owner_phone,
      animalData.owner_email,
      authUserId,
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("An error occurred while creating the animal:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while creating the animal",
        error_message: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
