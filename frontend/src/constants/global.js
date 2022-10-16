/*
    GLOBAL CONSTANTS
*/

export const SERVER_SITE_URL = process.env.NODE_ENV === "development"
    ? (process.env.DOMAIN || "http://localhost:8000")
    : "";

export const API_URL = `${SERVER_SITE_URL}/api`;

export const itemsRequestUrl = `${API_URL}/items/`;