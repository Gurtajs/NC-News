import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../../api";


function Topics() {
  const [topics, setTopics] = useState([]);
  

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    })
  }, []);

  
  return (
    <>
      <h1 className="mt-7 pb-3">View articles by topic:</h1>
      <div className="flex gap-10">
        {topics.map((topic) => {
          return (
            <div
              className="border-2 border-black rounded-md p-2 mr-2 mb-7"
              key={topic.slug}
            >
              <Link to={`/articles/topic/${topic.slug}`}>
                <p className="font-bold">
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                </p>
                <p>{topic.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Topics;
