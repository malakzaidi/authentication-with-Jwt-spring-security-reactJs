/**
 * API Service for making authenticated requests with JWT token
 */

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || "http://localhost:8080";
};

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Make an authenticated API request
 * Automatically includes JWT token in Authorization header
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const token = getAuthToken();
  const url = `${baseUrl}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof options.headers === "object" && options.headers !== null) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      message: errorData.message || `HTTP ${response.status}`,
      status: response.status,
    } as ApiError;
  }

  return response.json();
}

/**
 * GET request
 */
export function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export function apiPost<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export function apiPut<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "DELETE" });
}

/**
 * PATCH request
 */
export function apiPatch<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}
