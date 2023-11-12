import React, { forwardRef, useEffect, useState, Ref, MouseEvent } from "react";

interface IProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: (event: MouseEvent<HTMLImageElement>) => void;
  setLiked?: (liked: boolean) => void;
  onLikeFunc?: () => void;
}

const PostImage = forwardRef<HTMLImageElement, IProps>(
  ({ src, alt, onClick, setLiked, onLikeFunc, ...props }: IProps, ref: Ref<HTMLImageElement>) => {
    const [lastClickTime, setLastClickTime] = useState(0);

    const handleLikeClick = (event: MouseEvent<HTMLImageElement>) => {
      const clickTime = new Date().getTime();
      const timeSinceLastClick = clickTime - lastClickTime;

      if (timeSinceLastClick < 300) {
        if (onLikeFunc) {
          onLikeFunc();
        }
      }
      
      setLastClickTime(clickTime);

      if (onClick) {
        onClick(event);
      }
    };

    return <img src={src} alt={alt} onClick={handleLikeClick} {...props} ref={ref} />;
  }
);

export default PostImage;
