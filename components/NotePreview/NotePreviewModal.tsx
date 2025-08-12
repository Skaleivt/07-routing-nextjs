"use client";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import css from "./NotePreview.module.css";

type NotePreview = {
  title: string;
  content: string;
  createdAt: string;
  tag: string;
};

type NotePreviewProps = {
  data: NotePreview;
};

export default function NotePreviewModal({ data }: NotePreviewProps) {
  const { title, content, createdAt, tag } = data;
  const router = useRouter();

  const close = () => router.back();

  return createPortal(
    <div className={css.container}>
      <div className={css.header}>
        <p className={css.tag}>{tag}</p>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
      </div>
      <div className={css.item}>
        <h2 className={css.header}>{title}</h2>
        <p className={css.content}>{content}</p>

        <p className={css.data}>{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>,
    document.body
  );
}
