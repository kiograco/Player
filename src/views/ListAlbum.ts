import { html } from '~/utils';
import { Track } from './Track';
import './ListAlbum.css';

export function ListAlbum(coletania: AlbumData[]) {
    return coletania.map((album: AlbumData) => (html`
        <div class="container" >
            <div class="wrapper">
                <img class="cover" src="${album.cover}"/>
                <div class="info">
                    <p class="title">${album.title}</p>
                    <p class="artist">${album.artist}</p>
                </div>
            </div>
            <div>
                ${Track(album.tracks)}
            </div>
        </div>`
    )).join('');
};