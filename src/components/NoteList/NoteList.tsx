import React from "react";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation((id: string) => deleteNote(id), {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id ?? n._id} className={css.listItem}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(n.id ?? n._id!)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
