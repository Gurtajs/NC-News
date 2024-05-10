import { useEffect } from "react";
import { useState } from "react";
import { sortArticles } from "../../api";
import { Link, useNavigate } from "react-router-dom";

function SortArticles({ setArticles }) {
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrderBy, setSelectedOrderby] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    sortArticles(selectedSortBy, selectedOrderBy).then((data) => {
      setArticles(data);
    });
		const newParams = new URLSearchParams();
    newParams.set("sortby", selectedSortBy);
		newParams.set("orderby", selectedOrderBy);
    navigate(`?${newParams.toString()}`);
  }, [selectedSortBy, selectedOrderBy]);

  return (
    <div className="flex">
      <label htmlFor="sortby">
        Sort By:
        <select
          id="sortby"
          name="sortby"
          value={selectedSortBy}
          onChange={(e) => setSelectedSortBy(e.target.value)}
        >
         <option value="created_at">Date</option>
         <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
      </label>

      <label htmlFor="orderby">
        Order By:
        <select
          id="orderby"
          name="orderby"
          value={selectedOrderBy}
          onChange={(e) => setSelectedOrderby(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}

export default SortArticles;
