function ErrorPage({ errorMessage }) {
  return <>{errorMessage ? <h1>{errorMessage}</h1> : <h1>URL not found</h1>}</>;
}

export default ErrorPage;
