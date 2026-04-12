import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a Django media image URL into a server-resized thumbnail URL,
 * or generates a `srcset` string when multiple widths are provided.
 *
 * Single width → returns URL string for use in [src]:
 *   post.image | imageThumb:800
 *
 * Array of widths → returns a srcset string for use in [srcset]:
 *   post.image | imageThumb:[400, 800]
 */
@Pipe({
  name: 'imageThumb',
  standalone: true,
})
export class ImageThumbPipe implements PipeTransform {
  private static readonly MEDIA_PREFIX = '/media/';

  transform(imageUrl: string | null | undefined, widths: number | number[]): string {
    if (!imageUrl) return '';
    const idx = imageUrl.indexOf(ImageThumbPipe.MEDIA_PREFIX);
    if (idx === -1) return imageUrl;
    const path = imageUrl.substring(idx + ImageThumbPipe.MEDIA_PREFIX.length);

    if (Array.isArray(widths)) {
      return widths.map((w) => `/api/thumb/${w}/${path} ${w}w`).join(', ');
    }
    return `/api/thumb/${widths}/${path}`;
  }
}
