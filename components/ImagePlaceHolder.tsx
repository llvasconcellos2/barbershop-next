'use client';

import React from 'react';

interface ImagePlaceholderProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  width?: number;
  height?: number;
  background?: string;
  color?: string;
  text?: string;
}

export default function ImagePlaceholder({
  width = 100,
  height = 100,
  background = '#dddddd',
  color = '#6a6a6a',
  text = 'Placeholder',
  ...props
}: ImagePlaceholderProps) {
  const [src, setSrc] = React.useState<undefined | string>(undefined);

  React.useEffect(() => {
    // create a canvas element
    const image = document.createElement('canvas');

    // set canvas size
    image.width = Number(width);
    image.height = Number(height);

    // create a 2d context
    const ctx = image.getContext('2d');

    // draw placeholder
    if (ctx) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${width / 10}px Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
    }

    // set canvas as image src
    setSrc(image.toDataURL());

    return () => {
      image.remove();
    };
  }, [width, height, background, color, text]);

  return <img src={src} width={width} height={height} alt={text} {...props} />;
}
