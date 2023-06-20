import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import FormField from "../components/FormField";
import "./Home.css";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2>{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section>
      <div className="home-content">
        <h1>The Community Showcase</h1>
        <p>
          Browse through a collection of imaginative and stunning AI generated
          images
        </p>
      </div>

      <div className="form-content">
        <FormField
          LabelName="Search posts"
          type="text"
          name="text"
          placeholder="Search Post"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2>
                Showing results for <span>{searchText}</span>
              </h2>
            )}
            <div className="card-section">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
