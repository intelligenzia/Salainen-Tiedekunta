// Web route for /teachers; renders the tab screen with the same loader.
import Screen, { loader as tabLoader } from '../(tabs)/teachers-tab';

export async function loader() {
  return tabLoader();
}

export default Screen;
