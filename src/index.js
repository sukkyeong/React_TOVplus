import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';
import Youtube from './service/youtube';

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
const FileInput = memo(props => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App 
     authService={authService} 
     FileInput={FileInput} 
     cardRepository={cardRepository}
     youtube={youtube} />
  </React.StrictMode>,
  document.getElementById('root')
);

