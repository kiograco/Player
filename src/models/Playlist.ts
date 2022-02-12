import { Album } from "./Album";

export class Playlist implements PlaylistType {
  
  public albums: AlbumType[] = [];
  
  
  
  addAlbum(data: AlbumData) {
    return this.albums.push(new Album(data));
  };
  isFirstAlbum(index: number): boolean {
    return index === 0 ? true : false;
  };
  isLastAlbum(index: number): boolean {
    return this.albums.length - 1 === index ? true : false;
  };
  lastAlbumIndex(): number {
    return this.albums.length - 1
  }
};