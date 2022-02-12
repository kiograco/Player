import { Playlist } from "./Playlist";
export class Player implements PlayerType {
  get album(): AlbumType | null {
    return this.playlist.albums[this.albumIndex]
  }

  readonly playlist: PlaylistType = new Playlist

  get trackUrl(): string | null {
    if(!this.album || !this.album.tracks.length)
      return null

    let albumTrack = this.album.tracks[this.trackIndex]
    return albumTrack ? albumTrack.url : null
  }
  
  _playing: boolean = false
  _albumIndex: number = 0
  _trackIndex: number = 0

  get playing(): boolean {
    return this._playing
  }

  set playing(state: boolean) {
    this._playing = state
  }

  get albumIndex(): number {
    return this._albumIndex
  }

  get trackIndex(): number {
    return this._trackIndex
  }

  set albumIndex(index: number){
    this._albumIndex = (index > this.playlist.albums.length) ? 0 : index;
  }

  set trackIndex(index: number) {
    this._trackIndex = (index > this.albumLastTrackIndex) ? 0 : index
  }
  private get albumLastTrackIndex(): number {
    return this.album ? this.album.lastTrackIndex(): 0;
  }
  play(): void {
    if (this.album && !this.playing) {
      this.playing = true
    };
  };
  pause(): void {
    this.playing = false;
  };
  nextTrack(): void {
    if (!this.album?.isLastTrack(this.trackIndex))
      this.trackIndex = this.trackIndex + 1
    else {
      if (!this.playlist?.isLastAlbum(this.albumIndex)) {
        this.albumIndex = this.albumIndex + 1
        this.trackIndex = 0
      } else
        this.albumIndex = this.trackIndex = 0
    }
  };
  prevTrack(): void {
    if(!this.album?.isFirstTrack(this.trackIndex)) 
      this.trackIndex = this.trackIndex - 1
    else {
      this.albumIndex = (this.playlist?.isFirstAlbum(this.albumIndex)) 
        ? this.playlist.lastAlbumIndex() : this.albumIndex - 1

      this.trackIndex = this.album?.lastTrackIndex()
    }
  }
}
