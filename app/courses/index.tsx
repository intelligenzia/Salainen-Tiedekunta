// Web route for /courses; renders the tab screen with the same loader.
import Screen, { loader as tabLoader } from '../(tabs)/courses-tab';

export async function loader() {
  return tabLoader();
}

export default Screen;
