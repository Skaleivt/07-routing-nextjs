import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteSearchResponse } from "@/lib/api";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const paramsQuery = await params;
  const [tag] = paramsQuery.slug || [];
  const page = 1;

  const initialData: NoteSearchResponse = await fetchNotes({
    tag,
    searchQuery: "",
    page,
  });

  return <NotesClient initialData={initialData} tag={tag} />;
}
