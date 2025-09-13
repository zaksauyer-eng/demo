// src/lib/api.ts
// Centralized API utility for Ocean Eyes Connect frontend to connect to Argus backend

export const ARGUS_API_BASE_URL = "http://localhost:5000"; // Change if Argus backend runs on a different port

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${ARGUS_API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}
