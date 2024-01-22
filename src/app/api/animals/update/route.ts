import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request): Promise<Response> {
  const { userId: authUserId } = auth();

  if (!authUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const {
      userId: requestUserId,
      animal_id,
      ...animalData
    } = await request.json();

    // Check if user_id from the request is the same as the authenticated user's userId
    if (authUserId !== requestUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // If user_id is the same, proceed with updating the animal
    const updateQuery =
      "UPDATE animals SET name = ?, age = ?, race = ?, owner_name = ?, owner_phone = ?, owner_email = ? WHERE animal_id = ? AND user_id = ?";

    await pool.query(updateQuery, [
      animalData.name,
      animalData.age,
      animalData.race,
      animalData.owner_name,
      animalData.owner_phone,
      animalData.owner_email,
      animal_id,
      authUserId,
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("An error occurred while updating the animal:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while updating the animal",
        error_message: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
