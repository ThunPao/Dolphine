const UPSTASH_URL = "http://127.0.0.1:3005";

export function boo(){
    console.log("BOO!");
}
export async function readdata(path: string) {
  console.log('UPSTASH_URL', UPSTASH_URL);
  const url = new URL(path, UPSTASH_URL);
  const response = await fetch(url.href, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      // Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch data');
  }
}