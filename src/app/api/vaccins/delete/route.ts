import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request): Promise<Response> {
  const { userId: authUserId } = auth();

  if (!authUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { userId: requestUserId, vaccination_id } = await request.json();

    // Check if user_id from the request is the same as the authenticated user's userId
    if (authUserId !== requestUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // If user_id is the same, proceed with deleting the vaccination
    const deleteQuery =
      "DELETE FROM vaccinations WHERE vaccination_id = ? AND user_id = ?";

    await pool.query(deleteQuery, [vaccination_id, authUserId]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("An error occurred while deleting the vaccination:", error);
    return new Response("An error occurred while deleting the vaccination", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
