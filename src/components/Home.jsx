import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../api";
import Article from "./Article"

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data);
	  setLoading(false)
    });
  }, []);


  if (loading) {
	return <><h2>Loading...</h2></>
	}

  return (
		<section>
			<h1 className="pt-10 text-3xl">Available articles</h1>
			<Article articles={articles}/>
		</section>


	)
}

export default Home;
