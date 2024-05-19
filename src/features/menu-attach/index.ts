import { IconFile, IconLoc, IconMedia } from 'images';
import { Menu } from 'ui';

export class MenuAttach extends Menu {
  constructor() {
    super({
      position: { left: 20, bottom: 4 },
      itemsProps: [
        {
          label: 'Photo or Video',
          icon: IconMedia,
          onClick: () => {},
        },
        {
          label: 'File',
          icon: IconFile,
          onClick: () => {},
        },
        {
          label: 'Location',
          icon: IconLoc,
          onClick: () => {},
        },
      ],
    });
  }
}
