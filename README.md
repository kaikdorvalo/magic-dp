#CardController API - Documentation

##Endpoints
#1. POST /cards/commander
- Request Body:
  - CreateDeckDto: Contains the information needed to create the deck, such as the commanderName and landsAmount.
- Authentication: Required.
Example Request Body:
{
  "commanderName": "Drizzt Do'Urden",
  "landsAmount": 36
}

#2. GET /cards/decks/
- Path Parameter:
  - id: The ID of the deck.
- Authentication: Required.

  
#3. GET /cards/decks/exports/
- Path Parameter:
  - id: The ID of the deck.
- Authentication: Required.

#4 POST /cards/validate
- Request Body:
  - JSON object containing the deck data to be validated.
- Authentication: Required.

#5. GET /cards/decks/get/all
- Retrieves all decks belonging to the authenticated user. Results are cached for efficiency.
  - Authentication: Required.
 
#6. GET /cards/decks/get/getall
- Retrieves all decks in the system. This endpoint is restricted to users with the ADMIN role.
  - Authentication: Required.
  - Role: ADMIN.
