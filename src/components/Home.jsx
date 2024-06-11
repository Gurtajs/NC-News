import Article from "./Articles";
import Topics from "./Topics";
import SortArticles from "./SortAllArticles";
import PostArticle from "./PostArticle";

function Home({ articles, setArticles, loading }) {
  if (loading) {
    return (
      <>
        <h2 className="pl-20">
          The articles are loading, thank you for your patience!
        </h2>
      </>
    );
  }

  return (
    <section>
      <div className="ml-0 md:ml-20">
        <SortArticles articles={articles} setArticles={setArticles} />
        <Topics />
        <PostArticle articles={articles} setArticles={setArticles} />
      </div>
      <div className="flex justify-center ">
      <Article articles={articles} setArticles={setArticles} />
      </div>
    </section>
  );
}

export default Home;
