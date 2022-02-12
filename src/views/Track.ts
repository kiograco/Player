import { html} from '~/utils';
import './Track.css';

export function Track(tracks:TrackData[]) {
  return tracks.map((track: TrackData, index: number) => (
            html`<div class="tracks">
                    <p>${(index + 1) + ".  " + track.title}</p>
                </div>`
        )).join('');   
};