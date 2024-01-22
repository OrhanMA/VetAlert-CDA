import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request): Promise<Response> {
  const { userId: authUserId } = auth();

  if (!authUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { userId: requestUserId, animal_id } = await request.json();

    // Check if user_id from the request is the same as the authenticated user's userId
    if (authUserId !== requestUserId) {
      return new Response("Unauthorized", {
        status: 401,
      });
      // return Response.status(401).json({ error: "Unauthorized" });
    }

    // If user_id is the same, proceed with deleting the animal
    const deleteQuery =
      "DELETE FROM animals WHERE animal_id = ? AND user_id = ?";

    await pool.query(deleteQuery, [animal_id, authUserId]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("An error occurred while deleting the animal:", error);
    return new Response("An error occure while deleting the animal", {
      status: 500,
    });
    // return Response.status(500).json({
    //   error: "An error occurred while deleting the animal",
    //   error_message: error,
    // });
  }
}
