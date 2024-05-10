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
      <h1 className="mt-5">View by topic:</h1>
      <div className="flex gap-10">
        {topics.map((topic) => {
          return (
            <div
              className="border-2 border-black rounded-md p-2"
              key={topic.slug}
            >
              <Link to={`/article/topic/${topic.slug}`}>
                <p className="font-bold">
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                </p>
                <p>{topic.description}</p>
              </Link>
            </div>
          );
        })}
        {/* <Link to={`/article/${topic}`}><button className="border-2 border-black rounded-md">{topic}</button></Link>
        <button className="border-2 border-black rounded-md">Coding</button>
        <button className="border-2 border-black rounded-md">Football</button> */}
      </div>
    </>
  );
}

export default Topics;
