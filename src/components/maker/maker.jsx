import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';
import Grid from '../grid/grid';
import SearchHeader from '../search_header/search_header';
import VideoList from '../video_list/video_list';
import VideoDetail from '../video_detail/video_detail';

const Maker = ({ FileInput, authService, cardRepository, youtube }) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };
  const createOrUpdateCard = card => {
    setCards(cards => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = card => {
    setCards(cards => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const selectVideo = video => {
    setSelectedVideo(video);
  };
  const search = query => {
    setSelectedVideo(null);
    youtube.search(query).then(videos => setVideos(videos));
  };

  useEffect(() => {
    if(!userId){
      return;
    }
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    })
    return() => stopSync();
  },[userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, userId, history]);

  useEffect(() => {
    youtube.mostPopular().then(videos => setVideos(videos));
  }, []);

  return (
    <div className={styles.maker}>
      <SearchHeader onSearch={search} onLogout={onLogout} />
      <section className={styles.content}>
      {selectedVideo && (
      <div className={styles.detail}>
        <VideoDetail video={selectedVideo} />
      </div>
      )}
      <div className={styles.list}>
        <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
      </div>  
      </section>
    </div>
    // <section className={styles.maker}>
    //   <Header onLogout={onLogout} />
    //   <div className={styles.container}>
    //     <Editor
    //       FileInput={FileInput}
    //       cards={cards}
    //       addCard={createOrUpdateCard}
    //       updateCard={createOrUpdateCard}
    //       deleteCard={deleteCard}
    //     />
    //     <Preview cards={cards} />
    //     <Grid />
    //   </div>
    //   <Footer />
    // </section>
  );
};

export default Maker;
