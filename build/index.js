// src/models/Album.ts
var Album = class {
  constructor(value) {
    this.artist = value.artist;
    this.cover = value.cover;
    this.tracks = value.tracks;
    this.title = value.title;
  }
  isFirstTrack(index) {
    return index === 0 ? true : false;
  }
  isLastTrack(index) {
    return this.tracks.length - 1 === index ? true : false;
  }
  getUrlFromIndex(index) {
    return this.tracks[index] ? this.tracks[index].url : null;
  }
  lastTrackIndex() {
    return this.tracks.length - 1;
  }
};

// src/models/Playlist.ts
var Playlist = class {
  constructor() {
    this.albums = [];
  }
  addAlbum(data) {
    return this.albums.push(new Album(data));
  }
  isFirstAlbum(index) {
    return index === 0 ? true : false;
  }
  isLastAlbum(index) {
    return this.albums.length - 1 === index ? true : false;
  }
  lastAlbumIndex() {
    return this.albums.length - 1;
  }
};

// src/models/Player.ts
var Player = class {
  constructor() {
    this.playlist = new Playlist();
    this._playing = false;
    this._albumIndex = 0;
    this._trackIndex = 0;
  }
  get album() {
    return this.playlist.albums[this.albumIndex];
  }
  get trackUrl() {
    if (!this.album || !this.album.tracks.length)
      return null;
    let albumTrack = this.album.tracks[this.trackIndex];
    return albumTrack ? albumTrack.url : null;
  }
  get playing() {
    return this._playing;
  }
  set playing(state) {
    this._playing = state;
  }
  get albumIndex() {
    return this._albumIndex;
  }
  get trackIndex() {
    return this._trackIndex;
  }
  set albumIndex(index) {
    this._albumIndex = index > this.playlist.albums.length ? 0 : index;
  }
  set trackIndex(index) {
    this._trackIndex = index > this.albumLastTrackIndex ? 0 : index;
  }
  get albumLastTrackIndex() {
    return this.album ? this.album.lastTrackIndex() : 0;
  }
  play() {
    if (this.album && !this.playing) {
      this.playing = true;
    }
    ;
  }
  pause() {
    this.playing = false;
  }
  nextTrack() {
    var _a, _b;
    if (!((_a = this.album) == null ? void 0 : _a.isLastTrack(this.trackIndex)))
      this.trackIndex = this.trackIndex + 1;
    else {
      if (!((_b = this.playlist) == null ? void 0 : _b.isLastAlbum(this.albumIndex))) {
        this.albumIndex = this.albumIndex + 1;
        this.trackIndex = 0;
      } else
        this.albumIndex = this.trackIndex = 0;
    }
  }
  prevTrack() {
    var _a, _b, _c;
    if (!((_a = this.album) == null ? void 0 : _a.isFirstTrack(this.trackIndex)))
      this.trackIndex = this.trackIndex - 1;
    else {
      this.albumIndex = ((_b = this.playlist) == null ? void 0 : _b.isFirstAlbum(this.albumIndex)) ? this.playlist.lastAlbumIndex() : this.albumIndex - 1;
      this.trackIndex = (_c = this.album) == null ? void 0 : _c.lastTrackIndex();
    }
  }
};

// src/utils/html.ts
var html = String.raw;

// src/utils/mounted.ts
var mounted = function(callback) {
  setTimeout(callback, 10);
};

// src/views/Player.ts
function Player2(player) {
  mounted(function() {
    const buttonPlay = document.querySelector(".play");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const audio = document.querySelector("#audio");
    buttonPlay == null ? void 0 : buttonPlay.addEventListener("click", function() {
      const playPause = document.querySelector("#playPause");
      if (player._playing) {
        audio == null ? void 0 : audio.pause();
        player.pause();
        playPause == null ? void 0 : playPause.setAttribute("src", "/img/play.svg");
      } else {
        audio == null ? void 0 : audio.play();
        player.play();
        playPause == null ? void 0 : playPause.setAttribute("src", "/img/pause.svg");
      }
    });
    next == null ? void 0 : next.addEventListener("click", function() {
      player.nextTrack();
      audio == null ? void 0 : audio.setAttribute("src", `${player.trackUrl}`);
      audio == null ? void 0 : audio.play();
      player.play();
    });
    prev == null ? void 0 : prev.addEventListener("click", function() {
      player.prevTrack();
      audio == null ? void 0 : audio.setAttribute("src", `${player.trackUrl}`);
      audio == null ? void 0 : audio.play();
      player.play();
    });
  });
  return html`
    <div class="header">
      <button class="buttonControl prev">
        <img src="/img/prev.svg"/>
      </button>
      <button class="buttonControl play">
        <img id="playPause" src="/img/play.svg"/>
        <audio id="audio"> <source src="${player.trackUrl}" type="audio/mp3"></audio>
      </button>
      <button class="buttonControl next">
        <img src="/img/next.svg"  />
      </button>
    </div>
`;
}

// src/views/Track.ts
function Track(tracks) {
  return tracks.map((track, index) => html`<div class="tracks">
                    <p>${index + 1 + ".  " + track.title}</p>
                </div>`).join("");
}

// src/views/ListAlbum.ts
function ListAlbum(coletania) {
  return coletania.map((album) => html`
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
        </div>`).join("");
}

// src/mocks/albums.json
var albums_default = [
  {
    title: "Symphony Collection",
    artist: "Ludwig van Beethoven",
    cover: "/img/beethoven.png",
    tracks: [
      {
        title: "Moolight Sonata",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_moonlight_sonata.mp3"
      },
      {
        title: "F\xFCr Elise",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_fur_elise-para-elise.mp3"
      },
      {
        title: "Sinfonia No. 5",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/03-01-Symphony-No.-5-in-C-minor-Op.-67-1.-Allegro-Con-Brio.mp3"
      }
    ]
  },
  {
    title: "Preludes Collection",
    artist: "Fr\xE9d\xE9ric Chopin",
    cover: "/img/chopin.png",
    tracks: [
      {
        title: "Nocturne in E flat major Op. 9",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/1-Nocturne-in-E-flat-major-Op.-9-No.-2.mp3"
      },
      {
        title: "Minute Waltz",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/10-Minute-Waltz.mp3"
      },
      {
        title: "Grande valse brillante in E flat major",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/5-Grande-valse-brillante-in-E-flat-major.mp3"
      }
    ]
  }
];

// src/views/App.ts
function App() {
  const player = new Player();
  albums_default.map((album) => player.playlist.addAlbum(album));
  const coletania = player.playlist.albums;
  return html`
    <div class="App">
    ${ListAlbum(coletania)}
    ${Player2(player)}
    </div>
  `;
}

// src/index.ts
var root = document.querySelector("#root");
root.innerHTML = App();
