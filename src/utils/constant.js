export const LOGO_URL = "";

export const DEFAULT_USER_AVATAR = "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"

export const USER_AVATAR = "https://lh3.googleusercontent.com/a/ACg8ocKM62JLiHG-bdQDetA0PI08AIbLIKfpIBj0rd4sOJGd3WE-y_wF=s96-c";


export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};