import { pool } from "@/app/database/mysql-config";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const vaccination_id = params.id;

  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const queryPromise = () => {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT * FROM vaccinations WHERE vaccination_id = ? AND user_id = ?`,
          [vaccination_id, userId],
          function (error: any, results: any, fields: any) {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
    };
    const data = await queryPromise();
    return Response.json({
      data: data,
    });
  } catch (error: any) {
    console.error("error connecting: " + error.stack);
    return Response.json({
      error: "An error occurred while fetching data",
      error_message: error,
    });
  }
}
