import React from "react";
import axios from "axios";

function PodcastsSearch() {
  const [keyword, setKeyword] = React.useState("a");
  const [podcasts, setPodcasts] = React.useState([]);

  const searchPodcasts = async () => {
    try {
      const { data } = await axios.get(
        `https://itunes.apple.com/search?term=${keyword}&entity=podcast`
      );
      if (data) return setPodcasts(data.results);
    } catch (error) {
      console.log(`Error occured: ${error.message}`);
    }
    return null;
  };

  React.useEffect(() => {
    searchPodcasts();
  }, [keyword]);

  return (
    <div className="flex h-screen w-full flex-col items-center gap-12">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {podcasts &&
        podcasts.map((podcast) => (
          <div key={podcast.collectionID}>
            <img src={podcast.artworkUrl60} alt={podcast.collectionName} />
            <h1>{podcast.collectionName}</h1>
            <p>{podcast.artistName}</p>
          </div>
        ))}
    </div>
  );
}

export default PodcastsSearch;
