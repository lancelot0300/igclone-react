import { forwardRef } from "react";

interface IProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}


const Image = forwardRef<HTMLImageElement, IProps>(({src, alt, ...props}, ref,) => {
  return <img src={src} alt={alt} { ...props} ref={ref}/>
});

export default Image;
