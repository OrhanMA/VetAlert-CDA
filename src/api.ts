// api.ts

export async function fetchNextApi(endpoint: string, method: string = "GET") {
  /**
   * @params endpoint - l'endpoint à atteindre sur l'API
   * @params method - la méthode de la requête HTTP, 'GET' par défaut si aucun paramètre n'est donné lors de l'appel.
   * Ne pas mettre de / sur l'enpoint quand on call la fonction car il est déjà présent dans l'url.
   */
  const url = `http://localhost:3000/api/${endpoint}`;
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `HTTP error on fechNextApi function! Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error fetching the data in fetchNextApi");
  }
}

export async function countAnimals() {
  try {
    const response = await fetch("http://localhost:3000/api/animals/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}

export async function countVaccinations() {
  try {
    const response = await fetch("http://localhost:3000/api/vaccins/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}
