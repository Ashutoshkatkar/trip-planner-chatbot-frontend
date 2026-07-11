const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Calls POST /travel with { thread_id, query } and returns the parsed JSON.
 * Matches the FastAPI operation `travel_planner_api_travel_post`.
 */
export async function planTrip({ threadId, query, signal }) {
  const response = await fetch(`${BASE_URL}/travel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      thread_id: threadId,
      query: query,
    }),
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Request failed (${response.status}): ${text || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Lightweight reachability check against the API root, used to drive
 * the "Online" / "Offline" status pill. Never throws.
 */
export async function pingServer() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${BASE_URL}/`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok || res.status === 404; // server up, route may just not exist
  } catch {
    return false;
  }
}

export function makeThreadId() {
  const rand = [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `user_${rand}`;
}

export { BASE_URL };
