"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

type Props = {
  tags: string[];
};

export default function TagsMenu({ tags }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={
                  tag === "All notes"
                    ? "/notes/filter/all"
                    : `/notes/filter/${tag}`
                }
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
