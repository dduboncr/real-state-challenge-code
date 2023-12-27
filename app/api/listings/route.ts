export async function GET() {
  const response = await fetch(
    'https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json',
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('An error occurred while fetching data.');
  }

  const data = await response.json();

  return Response.json(data);
}
