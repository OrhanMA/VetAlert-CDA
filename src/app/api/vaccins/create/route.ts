import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

// ... (import statements)

export async function POST(request: Request): Promise<Response> {
  const { userId: authUserId } = auth();

  if (!authUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { userId: requestUserId, ...vaccinationData } = await request.json();

    // Check if user_id from the request is the same as the authenticated user's userId
    if (authUserId !== requestUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate vaccination data
    if (
      !vaccinationData.vaccin_name ||
      vaccinationData.vaccin_name.length > 50
    ) {
      return new Response(JSON.stringify({ error: "Invalid vaccin_name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const insertQuery =
      "INSERT INTO vaccinations (vaccin_name, animal_id, user_id, vaccination_date) VALUES (?, ?, ?, ?)";

    await pool.query(insertQuery, [
      vaccinationData.vaccin_name,
      vaccinationData.animal_id,
      authUserId,
      vaccinationData.vaccination_date,
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("An error occurred while creating the vaccination:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while creating the vaccination",
        error_message: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
