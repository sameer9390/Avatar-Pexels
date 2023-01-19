import React, { useState } from "react";
import { API_KEY } from "../../key";
import styled from "styled-components";

export default function MainContainer() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(true);

  const getPhotos = async (type) => {
    let url = `https://api.pexels.com/v1/search?query=${query}=query&per_page=48`;
    if (data?.next_page && type === "next") {
      url = data.next_page;
    }

    if (data.prev_page && type === "back") {
      url = data.prev_page;
    }
    await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
        setIsLoading(false);
        setPhotos(res.photos);
      });
  };

  // useEffect(() => {
  //   getPhotos();
  // });
  const search = () => {
    getPhotos();
  };

  const onKeyClick = (e) => {
    if (e.keyCode === 13) {
      getPhotos();
    }
  };
  const onLoad = () => {
    setIsSearching(false);
  };

  return (
    <>
      <Container>
        <ForSearch>
          <Input
            className="inputSearch"
            onKeyDown={onKeyClick}
            placeholder="Search Image"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Button onClick={search}>SEARCH</Button>
        </ForSearch>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "100px",
              fontSize: "20px",
              fontWeight: "700",
              lineHeight: "17px",
              color: "green",
            }}
          >
            <div>Search Image According To You</div>
          </div>
        ) : (
          <AllSearchImage>
            {photos?.map((item, index) => {
              return (
                <Div key={index}>
                  <Img
                    onLoad={onLoad}
                    src={item?.src.medium}
                    alt="all set"
                  ></Img>
                  {isSearching && (
                    <div
                      style={{
                        background: "gray",
                        width: "95%",
                        height: "95%",
                        position: "absolute",
                        margin: "5px",
                        borderRadius: " 10px",
                        top: "0px",
                        left: "0px",
                      }}
                    />
                  )}
                </Div>
              );
            })}
          </AllSearchImage>
        )}
      </Container>
      <div
        style={{
          width: "100%",
          height: "7vh",
          position: "fixed",
          bottom: "0px",
          left: "0px",
        }}
      >
        <div>
          <Button disabled={data?.page === 1} onClick={() => getPhotos("back")}>
            Prev
          </Button>
          <Button onClick={() => getPhotos("next")}>NEXT</Button>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const ForSearch = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AllSearchImage = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const Div = styled.div`
  max-width: 20%;
  flex-basis: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  position: relative;
  padding:10px;
  @media (max-width: 768px) {
  max-width: 50%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  margin: 5px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 60%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid green;
  padding-left: 10px;
  font-size: 18px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid green;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
`;
