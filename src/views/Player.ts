import { html, mounted } from '~/utils';
import './Player.css';

export function Player(player: PlayerType) {
  mounted(function () {
    const buttonPlay = document.querySelector('.play');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev')
    const audio = document.querySelector<HTMLAudioElement>("#audio");

    buttonPlay?.addEventListener('click', function () {
      const playPause = document.querySelector("#playPause")
      if (player._playing) {
        audio?.pause();
        player.pause();
        playPause?.setAttribute("src", "/img/play.svg");
      } else {
        audio?.play();
        player.play();
        playPause?.setAttribute("src", "/img/pause.svg");
      }
    });

    next?.addEventListener('click', function () {
      player.nextTrack();
      audio?.setAttribute("src", `${player.trackUrl}`)
      audio?.play();
      player.play();
    });

    prev?.addEventListener('click', function () {
      player.prevTrack();
      audio?.setAttribute("src", `${player.trackUrl}`)
      audio?.play();
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
