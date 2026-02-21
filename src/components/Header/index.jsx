import { useState, useRef, useEffect } from "react";
import { MobileMenu } from "../MobileMenu";

import styles from "./Header.module.scss";

export const Header = ({ searchValue = "", onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.searchFullWidth} ${isSearchOpen ? styles.searchFullWidthOpen : ""}`}
      >
        <input
          ref={searchInputRef}
          type="search"
          className={styles.searchInput}
          placeholder="Search posts..."
          aria-label="Search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <button
          type="button"
          className={styles.searchClose}
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close search"
        >
          ✕
        </button>
      </div>
      <div className={`${styles.container} ${isSearchOpen ? styles.containerHidden : ""}`}>
        <button
          className={styles.burger}
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
        <img className={styles.logo} src={`${import.meta.env.BASE_URL}Logo.png`} alt="Logo" />
        <button
          className={styles.searchButton}
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
        >
          <img
            className={styles.searchIcon}
            src={`${import.meta.env.BASE_URL}icons/search-icon.svg`}
            alt=""
          />
        </button>
      </div>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};