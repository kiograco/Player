import { Player as PlayerModel } from '~/models/Player';
import { html } from '~/utils';
import { Player } from './Player';
import { ListAlbum } from './ListAlbum';
import albums from '../mocks/albums.json'
import './App.css';

export function App() {
  const player = new PlayerModel()
  albums.map((album: AlbumData) => player.playlist.addAlbum(album));
  const coletania = player.playlist.albums;

  return html`
    <div class="App">
    ${ListAlbum(coletania)}
    ${Player(player)}
    </div>
  `;      
};
