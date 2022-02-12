export class Album implements AlbumType {
  public artist: string;
  public cover: string;
  public tracks: TrackData[];
  public title: string;

  constructor(value: AlbumData) {
    this.artist = value.artist;
    this.cover = value.cover;
    this.tracks = value.tracks;
    this.title = value.title;
  };

  public isFirstTrack(index: number): boolean {
    return index === 0 ? true : false;
  };
  public isLastTrack(index: number): boolean {
    return this.tracks.length - 1 === index ? true : false;
  };
  public getUrlFromIndex(index: number): string | null {
    return this.tracks[index] ? this.tracks[index].url : null;
  };
  public lastTrackIndex(): number {
    return this.tracks.length - 1
  }
};