import { User as FirebaseUser } from "firebase/auth";
import { Dispatch } from "react";

export interface Location {
  id: number;
  name: string;
  type: string;
  url: string;
  dimension: string;
  residents: string[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  lastItem?: boolean;
  location: Location;
  episode: string[];
}

export interface CharacterBoxProps {
  character: Character;
  lastItem: boolean;
}

export interface State {
  data: string | null;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export type UserAction =
  | { type: "SET_USER"; payload: FirebaseUser }
  | { type: "CLEAR_USER" }
  | { type: "SET_LOADING" };

export interface UserState {
  user: FirebaseUser | null;
  loading: boolean;
}

export interface UserContextProps {
  userState: UserState;
  dispatch: Dispatch<UserAction>;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface EntityWrapperProps {
  target: string;
}
