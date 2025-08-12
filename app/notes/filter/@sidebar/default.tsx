import css from "./SidebarNotes.module.css";
import { tags } from "@/components/Header/Header";
import Link from "next/link";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={
              tag === "All notes" ? "/notes/filter/all" : `/notes/filter/${tag}`
            }
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
