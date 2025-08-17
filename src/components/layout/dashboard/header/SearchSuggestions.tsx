import React from "react";
import { SearchItem } from "@/hooks/useSearch";
import styles from "./SearchSuggestions.module.scss";

interface SearchSuggestionsProps {
  results: SearchItem[];
  onSelect: (route: string) => void;
  visible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  results,
  onSelect,
  visible,
}) => {
  if (!visible || results.length === 0) {
    return null;
  }

  return (
    <div className={styles.suggestionsContainer}>
      <div className={styles.suggestionsHeader}>
        <span>Search results ({results.length})</span>
      </div>
      <div className={styles.suggestionsList}>
        {results.map((item, index) => (
          <div
            key={item.key}
            className={styles.suggestionItem}
            onClick={() => onSelect(item.route)}
          >
            <div className={styles.suggestionTitle}>{item.title}</div>
            <div className={styles.suggestionDescription}>
              {item.description}
            </div>
            <div className={styles.suggestionKeywords}>
              {item.keywords.slice(0, 3).map((keyword, idx) => (
                <span key={idx} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
