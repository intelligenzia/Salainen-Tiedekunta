// Web route for /majors; renders the tab screen with the same loader.
import Screen, { loader as tabLoader } from '../(tabs)/majors-tab';

export async function loader() {
  return tabLoader();
}

export default Screen;
