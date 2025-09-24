import axios from "axios";
import { Note, CreateNoteDTO } from "../types/note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});
export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
  sortBy?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag, sortBy } = params;

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
      ...(sortBy ? { sortBy } : {}),
    },
  });

  return data;
}

export async function createNote(note: CreateNoteDTO): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
