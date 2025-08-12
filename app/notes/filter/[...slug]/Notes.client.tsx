"use client";

import css from "./Notes.client.module.css";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ToastContainer } from "react-toastify";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import { showErrorToast } from "@/components/ShowErrorToast/ShowErrorToast";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import CreateModal from "@/components/Modal/CreateModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteSearchResponse } from "@/lib/api";

type NoteClientProps = {
  initialData: NoteSearchResponse;
  tag: string;
  currentPage: number;
};

export default function NotesClient({
  initialData,
  tag,
  currentPage: initialPage,
}: NoteClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const updateSearchQuery = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };
  const queryTag = tag === "all" ? undefined : tag;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", tag, searchQuery, currentPage],
    queryFn: () =>
      fetchNotes({
        tag: queryTag,
        searchQuery: searchQuery,
        page: currentPage,
      }),
    placeholderData: keepPreviousData,
    initialData: initialData,
  });

  const totalPages = data?.totalPages || 0;

  const noNotesToastShown = useRef(false);

  useEffect(() => {
    if (!isLoading && data && data.notes.length === 0) {
      if (!noNotesToastShown.current) {
        showErrorToast("No notes found for your request.");
        noNotesToastShown.current = true;
      }
    } else {
      noNotesToastShown.current = false;
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleInputChange} value={inputValue} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setModalOpen(true)} className={css.button}>
          Create note +
        </button>
        {isModalOpen && (
          <CreateModal onClose={() => setModalOpen(false)}>
            <NoteForm onCancel={() => setModalOpen(false)} />
          </CreateModal>
        )}
      </header>
      {isSuccess && <NoteList notes={data.notes} />}
      <ToastContainer />
    </div>
  );
}
