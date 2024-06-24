import Article from "./Articles";
import Topics from "./Topics";
import SortArticles from "./SortAllArticles";
import PostArticle from "./PostArticle";
import loader from "../assets/loading.gif"

function Home({ articles, setArticles, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <h2>
          The articles are loading, thank you for your patience!
        </h2>
        <img src={loader} alt="loader" width={100} height={100}/>
      </div>
    );
  }

  return (
    <section>
      <div>
        <SortArticles articles={articles} setArticles={setArticles} />
        <Topics />
        <PostArticle articles={articles} setArticles={setArticles} />
      </div>
      <div>
      <Article articles={articles} setArticles={setArticles} />
      </div>
    </section>
  );
}

export default Home;
