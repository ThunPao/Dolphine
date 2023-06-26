// const UPSTASH_URL = import.meta.env.UPSTASH_REDIS_REST_URL || Deno.env.get("UPSTASH_REDIS_REST_URL");
// const UPSTASH_TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN || Deno.env.get("UPSTASH_REDIS_REST_TOKEN");
const UPSTASH_URL = "http://127.0.0.1:3005";


export async function readUpstash(path: string) {
    console.log('UPSTASH_URL', UPSTASH_URL);
    const url = new URL(path, UPSTASH_URL);
    return await fetch(url.href, {
      headers: {
        // Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
    }).then(res => res.json()).then(data => data.result)
  }
  
  export async function postUpstash(command: ReadonlyArray<string | number>) {
    return await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
      body: JSON.stringify(command),
    }).then(res => res.json())
  }

  
async function buyitem(command: ReadonlyArray<string | number>) {
    return await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
      body: JSON.stringify(command),
    }).then(res => res.json())
  }
  //https://github.com/RoyalIcing/astro-crud/blob/main/src/services/upstash.ts
  //https://github.com/RoyalIcing/astro-crud/blob/main/src/pages/counter.astro